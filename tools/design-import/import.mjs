// Turn a Claude Design export into a generated source tree:
//   node tools/design-import/import.mjs <export.html> <outDir>
// <outDir>/src mirrors repository/src (views, logic, styles); <outDir>/raw holds the unpacked export.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const [, , exportPath, outDir] = process.argv
if (!exportPath || !outDir) throw new Error('usage: import.mjs <export.html> <outDir>')
const raw = path.join(outDir, 'raw')
const src = path.join(outDir, 'src')
fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(path.join(src, 'codex'), { recursive: true })
const run = (script, ...args) => execFileSync('node', [path.join(here, script), ...args], { stdio: 'inherit' })
run('unpack.mjs', exportPath, raw)
run('convert.mjs', path.join(raw, 'markup.html'), src)
fs.rmSync(path.join(src, 'styles/global.css.part'))
run('port.mjs', path.join(raw, 'logic.js'), path.join(src, 'codex'))
run('anyfy.mjs', path.join(src, 'codex/Codex.tsx'), path.join(src, 'codex/constants.ts'))
console.log('generated', src)
