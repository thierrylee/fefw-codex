// Unpack a Claude Design standalone export (bundled HTML) into:
//   markup.html  the dc template, asset ids replaced with readable paths
//   logic.js     the template's logic script
//   codex.json   the app data
//   fonts/*.woff2
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const [, , exportPath, outDir] = process.argv
const src = fs.readFileSync(exportPath, 'utf8')
const block = (kind) => {
  const m = src.match(new RegExp(`<script type="__bundler/${kind}">([\\s\\S]*?)</script>`))
  return m ? JSON.parse(m[1]) : null
}
const manifest = block('manifest')
let template = block('template')
const ext = Object.fromEntries((block('ext_resources') || []).map((e) => [e.uuid, e.id]))
const payload = (uuid) => {
  const e = manifest[uuid]
  const b = Buffer.from(e.data, 'base64')
  return e.compressed ? zlib.gunzipSync(b) : b
}

// Name each font after the first @font-face rule that uses it.
const names = {}
for (const m of template.matchAll(/\/\* ([\w-]+) \*\/\s*@font-face\s*{([\s\S]*?)}/g)) {
  const [, subset, body] = m
  const fam = body.match(/font-family:\s*'([^']+)'/)[1].toLowerCase().replace(/ /g, '-')
  const weight = body.match(/font-weight:\s*(\d+)/)[1]
  const uuid = body.match(/url\("([0-9a-f-]{36})"\)/)[1]
  names[uuid] ??= `fonts/${fam}-${weight}-${subset}.woff2`
}

const paths = {}
for (const [uuid, e] of Object.entries(manifest)) {
  const rid = ext[uuid]
  if (rid === 'dataJson') paths[uuid] = 'codex.json'
  else if (rid?.startsWith('http')) paths[uuid] = 'vendor/' + rid.split('/').pop()
  else if (names[uuid]) paths[uuid] = names[uuid]
  else if (e.mime === 'text/javascript') paths[uuid] = 'support.js'
  else throw new Error(`unmapped asset ${uuid} (${e.mime})`)
}
for (const [uuid, rel] of Object.entries(paths)) {
  if (rel.startsWith('vendor/') || rel === 'support.js') continue
  const out = path.join(outDir, rel)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  let data = payload(uuid)
  if (rel.endsWith('.json')) data = JSON.stringify(JSON.parse(data), null, 1) + '\n'
  fs.writeFileSync(out, data)
}
for (const [uuid, rel] of Object.entries(paths)) template = template.replaceAll(uuid, rel)

const m = template.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)
fs.writeFileSync(path.join(outDir, 'logic.js'), m[1])
fs.writeFileSync(path.join(outDir, 'markup.html'), template.slice(0, m.index))
console.log('unpacked', Object.keys(paths).length, 'assets')
