// The design looks images up in window.__resources (id -> URL) and, since the 20261106 export,
// with window.__rim(path) ('img/<folder>/<name>.png' -> URL, falling back to the .webp/.png twin).
// Both only exist inside the design export, so rebuild them from the manifest written by
// tools/design-import (ids are '<folder>_<name>', files live in public/img/<folder>/<name>.<ext>).
import manifest from './imgManifest.json'

declare global {
  interface Window {
    __resources?: Record<string, string>
    __rim: (p: string) => string
  }
}

const base = import.meta.env.BASE_URL
window.__resources = Object.fromEntries(Object.entries(manifest).map(([id, p]) => [id, base + p]))

const paths = new Set<string>(Object.values(manifest))
window.__rim = (p: string) => {
  const hit = [p, p.replace(/\.png$/, '.webp'), p.replace(/\.webp$/, '.png')].find((q) => paths.has(q))
  return base + (hit || p)
}
