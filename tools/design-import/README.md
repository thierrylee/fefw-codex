# design-import

Converts a Claude Design export of the Weave Codex (the bundled standalone
`.html`) into this repo's source layout, so design changes can be brought in
**incrementally**: generate code for the previous and the new export, diff the
two, and apply only that diff to `src/`.

Never copy a generated tree over `src/` wholesale. `src/` has hand edits
(type fixes, new code) that a regeneration would erase.

## Setup

```bash
npm --prefix tools/design-import install
```

## Import a new export

Exports are archived in `../archive/design-exports/` (project root), named
`FEFWCodex-YYYYMMDD-HH-MM.html`. The newest one already applied is the baseline.

```bash
# 1. generate both versions (paths relative to repository/)
node tools/design-import/import.mjs ../archive/design-exports/<baseline>.html /tmp/gen-old
node tools/design-import/import.mjs ../archive/design-exports/<new>.html      /tmp/gen-new

# 2. see what the design changed, in TSX terms
diff -ru /tmp/gen-old/src /tmp/gen-new/src
diff -u  /tmp/gen-old/raw/codex.json /tmp/gen-new/raw/codex.json   # data changes

# 3. apply that diff to src/ by hand (or `patch -p…`), then
npm run build
```

New screens show up as new files in `src/view/screens/`; their logic shows up
as additions to `renderVals()` in `src/codex/Codex.tsx`. Prefer moving a new
screen's logic into its own function or component rather than growing
`renderVals()`.

The new export then becomes the baseline (currently `FEFWCodex-20261009-21-33.html`). The 20261009 exports ship no `codex.json`, so `public/database/codex.json` is kept as is.

## Check the result against the design

The export runs on its own over HTTP, so serve it next to the dev server:

```bash
python3 -m http.server 8766 --directory ../archive/design-exports   # http://localhost:8766/<new>.html
npm run dev                                                         # http://localhost:5173/fefw-codex/
```

Run `compare-probe.js` in both tabs (same viewport, same `localStorage`) and
compare the fingerprints screen by screen.

## What each step does

| script        | in → out |
| ------------- | -------- |
| `unpack.mjs`  | export `.html` → `raw/markup.html`, `raw/logic.js`, `raw/codex.json`, `raw/fonts/` |
| `convert.mjs` | dc template (`sc-if`, `sc-for`, `{{ }}`) → `view/AppView.tsx`, `view/screens/*.tsx`, `styles/{fonts,pseudo}.css` — one screen per `<section data-screen-label>` |
| `port.mjs`    | logic script → `codex/Codex.tsx` (React class) + `codex/constants.ts` |
| `anyfy.mjs`   | codemod: annotates untyped params / loose objects as `any` so strict TS compiles |

`convert.mjs` mirrors the dc-runtime's template semantics (null-safe paths,
`?? ""` string joins, `style-hover` → `:hover` classes with `!important`), so the
generated views render identically to the design.

`import.mjs` runs the four steps in order. `compare-probe.js` is the
browser-side check described above.
