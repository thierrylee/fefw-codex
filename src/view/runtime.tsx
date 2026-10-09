import { isValidElement, type CSSProperties, type ReactNode } from 'react'

/** The flat view model `Codex.renderVals()` builds for the templates. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VM = Record<string, any>

/** List for a `.map()` in a template; anything that isn't an array renders nothing. */
export const L = (x: unknown): unknown[] => (Array.isArray(x) ? x : [])

/** Interpolated text: null/undefined/booleans render nothing, elements pass through. */
export function T(x: unknown): ReactNode {
  if (x == null || typeof x === 'boolean') return null
  if (isValidElement(x) || Array.isArray(x)) return x
  return <span>{String(x)}</span>
}

/** Interpolated attribute/style value. */
export const str = (x: unknown): string => (x == null ? '' : String(x))

const cssCache = new Map<string, CSSProperties>()

/** Inline style given as a CSS declaration string. */
export function css(x: unknown): CSSProperties | undefined {
  if (x == null || typeof x === 'object') return (x ?? undefined) as CSSProperties | undefined
  const text = String(x)
  let o = cssCache.get(text)
  if (!o) {
    const out: Record<string, string> = {}
    for (const decl of text.split(';')) {
      const i = decl.indexOf(':')
      if (i < 0) continue
      const prop = decl.slice(0, i).trim()
      out[prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = decl.slice(i + 1).trim()
    }
    cssCache.set(text, (o = out as CSSProperties))
  }
  return o
}
