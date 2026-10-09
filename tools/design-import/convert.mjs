// One-off migration: Claude Design dc template -> React TSX view components.
// Mirrors dc-runtime semantics (expr.ts / compile.ts) so output renders identically.
import fs from 'node:fs'
import path from 'node:path'
import { parseFragment } from 'parse5'
import prettier from 'prettier'

const [, , markupPath, outDir] = process.argv
const src = fs.readFileSync(markupPath, 'utf8')
const inner = src.slice(src.indexOf('<x-dc>') + 6, src.lastIndexOf('</x-dc>'))
const helmet = inner.match(/<helmet>([\s\S]*?)<\/helmet>/)[1]
const body = inner.replace(/<helmet>[\s\S]*?<\/helmet>/, '')

// ---------- styles from <helmet> ----------
const styles = [...helmet.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1])
fs.mkdirSync(path.join(outDir, 'styles'), { recursive: true })
fs.writeFileSync(
  path.join(outDir, 'styles/fonts.css'),
  styles[0].replace(/url\("fonts\//g, 'url("../assets/fonts/').trim() + '\n',
)
fs.writeFileSync(path.join(outDir, 'styles/global.css.part'), styles.slice(1).join('\n'))

// ---------- expressions ----------
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*/
function wrapsWhole(e) {
  let d = 0
  for (let i = 0; i < e.length - 1; i++) {
    if (e[i] === '(') d++
    else if (e[i] === ')') { d--; if (d === 0) return false }
  }
  return true
}
function topEq(e) {
  let d = 0
  for (let i = 0; i < e.length; i++) {
    const c = e[i]
    if (c === '[' || c === '(') d++
    else if (c === ']' || c === ')') d--
    else if (d === 0 && (c === '=' || c === '!') && e[i + 1] === '=') {
      if (i > 0 && (e[i - 1] === '=' || e[i - 1] === '!')) continue
      if (!e.slice(0, i).trim()) continue
      return { i, op: e[i + 2] === '=' ? c + '==' : c + '=' }
    }
  }
  return null
}
function expr(raw, scope) {
  const e = String(raw).trim()
  if (!e) return 'undefined'
  if (e[0] === '(' && e.at(-1) === ')' && wrapsWhole(e)) return expr(e.slice(1, -1), scope)
  const q = topEq(e)
  if (q) return `(${expr(e.slice(0, q.i), scope)} ${q.op} ${expr(e.slice(q.i + q.op.length), scope)})`
  if (e[0] === '!') return `!${expr(e.slice(1), scope)}`
  if (['true', 'false', 'null', 'undefined'].includes(e)) return e
  if (/^-?\d+(\.\d+)?$/.test(e)) return e
  if (e.length >= 2 && (e[0] === '"' || e[0] === "'") && e.at(-1) === e[0]) return JSON.stringify(e.slice(1, -1))
  const head = e.match(IDENT)
  if (!head) throw new Error('bad expr ' + e)
  let out = scope.has(head[0]) ? head[0] : `v.${head[0]}`
  let i = head[0].length
  while (i < e.length) {
    if (e[i] === '.') {
      const m = e.slice(i + 1).match(IDENT) || e.slice(i + 1).match(/^\d+/)
      if (!m) throw new Error('bad path ' + e)
      out += /^\d/.test(m[0]) ? `?.[${m[0]}]` : `?.${m[0]}`
      i += 1 + m[0].length
    } else if (e[i] === '[') {
      let d = 1, j = i + 1
      for (; j < e.length && d > 0; j++) {
        if (e[j] === '[') d++
        else if (e[j] === ']' && --d === 0) break
      }
      out += `?.[${expr(e.slice(i + 1, j), scope)}]`
      i = j + 1
    } else throw new Error('bad path ' + e)
  }
  return out
}
const WHOLE = /^\s*\{\{([\s\S]+?)\}\}\s*$/
const parts = (s) => s.split(/\{\{([\s\S]+?)\}\}/g)
// String-valued attribute: whole {{x}} keeps the raw value; mixed joins with `?? ""`.
function attrExpr(raw, scope) {
  const w = raw.match(WHOLE)
  if (w) return { dyn: true, js: expr(w[1], scope) }
  if (!raw.includes('{{')) return { dyn: false, js: JSON.stringify(raw) }
  const p = parts(raw)
  return {
    dyn: true,
    js: '`' + p.map((s, i) => (i & 1 ? '${str(' + expr(s, scope) + ')}' : s.replace(/[`\\$]/g, '\\$&'))).join('') + '`',
  }
}

// ---------- styles ----------
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
function styleExpr(raw, scope) {
  const w = raw.match(WHOLE)
  if (w) return `css(${expr(w[1], scope)})`
  // Split on ";" outside {{ }} — interpolated values never contain declarations.
  const decls = []
  let cur = '', depth = 0
  for (let i = 0; i < raw.length; i++) {
    if (raw.startsWith('{{', i)) depth++
    if (raw.startsWith('}}', i)) depth--
    if (raw[i] === ';' && depth === 0) { decls.push(cur); cur = '' } else cur += raw[i]
  }
  decls.push(cur)
  const props = new Map()
  let dyn = false
  for (const d of decls) {
    const i = d.indexOf(':')
    if (i < 0) continue
    const p = d.slice(0, i).trim()
    if (p.includes('{{')) return `css(${attrExpr(raw, scope).js})`
    const key = p.startsWith('--') ? JSON.stringify(p) : /^[a-zA-Z]+$/.test(camel(p)) ? camel(p) : JSON.stringify(camel(p))
    const val = d.slice(i + 1).trim()
    const w2 = val.match(WHOLE)
    const a = w2 ? { dyn: true, js: 'str(' + expr(w2[1], scope) + ')' } : attrExpr(val, scope)
    dyn ||= a.dyn || key.startsWith('"--')
    // Later declarations win, as in a style attribute.
    props.set(key, a.js)
  }
  const obj = `{ ${[...props].map(([k, js]) => `${k}: ${js}`).join(', ')} }`
  return dyn ? `${obj} as CSSProperties` : obj
}

// ---------- pseudo classes (style-hover / style-focus) ----------
const pseudo = new Map()
function importantify(css) {
  return css
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => (/!important\s*$/.test(d) ? d : d + ' !important'))
    .join(';')
}
function pseudoClass(kind, css) {
  const k = kind + '|' + css
  if (!pseudo.has(k)) pseudo.set(k, { cls: `${kind === 'hover' ? 'hv' : kind}-${pseudo.size}`, kind, css })
  return pseudo.get(k).cls
}

// ---------- elements ----------
const ATTR_MAP = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', autocomplete: 'autoComplete',
  spellcheck: 'spellCheck', maxlength: 'maxLength', 'stroke-width': 'strokeWidth',
  'stroke-linejoin': 'strokeLinejoin', 'stroke-linecap': 'strokeLinecap',
  'fill-opacity': 'fillOpacity', 'fill-rule': 'fillRule', readonly: 'readOnly',
}
const NUM_ATTRS = new Set(['rows', 'cols', 'maxLength', 'tabIndex', 'size'])
const RAW = /^sc-raw-(.+)$/
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])
const esc = (t) => t.replace(/[{}<>]/g, (c) => `{${JSON.stringify(c)}}`)

const screens = []
function screenName(label) {
  const base = label.includes('{{') ? 'Catalog' : label.replace(/[^A-Za-z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')).replace(/^./, (c) => c.toUpperCase())
  return base + 'Screen'
}

function text(node, scope) {
  const t = node.value
  if (!t.includes('{{')) {
    if (!t.trim() && !t.includes(' ')) return ''
    return t.trim() === t && !/\s\s/.test(t) ? esc(t) : `{${JSON.stringify(t)}}`
  }
  return parts(t)
    .map((p, i) => (i & 1 ? `{T(${expr(p, scope)})}` : p ? (p.trim() === p ? esc(p) : `{${JSON.stringify(p)}}`) : ''))
    .join('')
}

function children(node, scope) {
  return (node.childNodes || []).map((c) => walk(c, scope)).join('')
}

function walk(node, scope) {
  if (node.nodeName === '#text') return text(node, scope)
  if (node.nodeName === '#comment') return ''
  const tag = node.tagName
  const attr = Object.fromEntries((node.attrs || []).map((a) => [a.name, a.value]))
  if (tag === 'sc-if') return `{${attrExpr(attr.value || '', scope).js} ? <>${children(node, scope)}</> : null}`
  if (tag === 'sc-for') {
    const as = attr.as || 'item'
    const inner = new Set(scope)
    inner.add(as)
    inner.add('$index')
    return `{L(${attrExpr(attr.list || '', scope).js}).map((${as}: any, $index: number) => <Fragment key={$index}>${children(node, inner)}</Fragment>)}`
  }
  if (tag === 'section' && attr['data-screen-label'] && scope.size === 0) {
    const name = screenName(attr['data-screen-label'])
    screens.push({ name, jsx: element(node, tag, attr, scope) })
    return `<${name} v={v} />`
  }
  return element(node, tag, attr, scope)
}

function element(node, tag, attr, scope) {
  const real = (tag.match(RAW) || [])[1] || tag
  const props = []
  const classes = []
  for (const [name, value] of Object.entries(attr)) {
    if (name.startsWith('style-')) { classes.push(pseudoClass(name.slice(6), value)); continue }
    let key = name.startsWith('sc-camel-') ? camel(name.slice(9)) : ATTR_MAP[name] || name
    if (key === 'style') { props.push(`style={${styleExpr(value, scope)}}`); continue }
    const a = attrExpr(value, scope)
    if ((key === 'value' || key === 'checked') && a.dyn) {
      props.push(`${key}={${key === 'checked' ? `${a.js} ?? false` : `${a.js} ?? ""`}}`)
      continue
    }
    if (NUM_ATTRS.has(key) && /^\d+$/.test(value)) { props.push(`${key}={${value}}`); continue }
    props.push(a.dyn || key.startsWith('on') || key === 'ref' ? `${key}={${a.js}}` : `${key}=${JSON.stringify(value)}`)
  }
  if (classes.length) props.push(`className="${classes.join(' ')}"`)
  const open = `<${real}${props.length ? ' ' + props.join(' ') : ''}`
  if (VOID.has(real)) return open + ' />'
  return `${open}>${children(node, scope)}</${real}>`
}

const frag = parseFragment(body)
let root = children(frag, new Set())

// ---------- emit ----------
async function emit(file, name, jsx, extraImports = '') {
  const code = `export function ${name}({ v }: { v: VM }) {\n  return (<>${jsx}</>)\n}\n`
  const used = ['L', 'T', 'css', 'str'].filter((id) => new RegExp(`\\b${id}\\(`).test(code))
  const head =
    (code.includes('<Fragment') ? `import { Fragment } from 'react'\n` : '') +
    (code.includes('as CSSProperties') ? `import type { CSSProperties } from 'react'\n` : '') +
    `import { ${[...used, 'type VM'].join(', ')} } from '../runtime'\n` +
    extraImports
  const full = head + '\n' + code
  try {
    fs.writeFileSync(file, await prettier.format(full, { parser: 'typescript', semi: false, singleQuote: true, printWidth: 120 }))
  } catch (e) {
    fs.writeFileSync(file + '.broken', full)
    throw e
  }
}

fs.mkdirSync(path.join(outDir, 'view/screens'), { recursive: true })
for (const sc of screens) await emit(path.join(outDir, 'view/screens', sc.name + '.tsx'), sc.name, sc.jsx)
const imports = screens.map((sc) => `import { ${sc.name} } from './screens/${sc.name}'`).join('\n') + '\n'
await emit(path.join(outDir, 'view/AppView.tsx'), 'AppView', root, imports)
for (const f of [path.join(outDir, 'view/AppView.tsx')]) fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace("from '../runtime'", "from './runtime'"))

const pcss = [...pseudo.values()]
  .map((p) => `.${p.cls}:${p.kind} { ${importantify(p.css)} }`)
  .join('\n')
fs.writeFileSync(path.join(outDir, 'styles/pseudo.css'), '/* :hover / :focus styles from the design template. */\n' + pcss + '\n')
console.log('screens:', screens.map((s) => s.name).join(', '), '| pseudo classes:', pseudo.size)
