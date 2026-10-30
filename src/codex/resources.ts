// The design looks images up in window.__resources (id -> URL), which only exists
// inside the bundled export. Rebuild it from the manifest written by tools/design-import
// (ids are '<folder>_<name>', files live in public/img/<folder>/<name>.<ext>).
import manifest from './imgManifest.json'

declare global {
  interface Window {
    __resources?: Record<string, string>
  }
}

const base = import.meta.env.BASE_URL
window.__resources = Object.fromEntries(Object.entries(manifest).map(([id, p]) => [id, base + p]))
