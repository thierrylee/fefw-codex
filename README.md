# Weave Codex

Companion codex for _Fire Emblem: Fortune's Weave_ — characters, unit builder,
compare, charts, classes, abilities, combat arts and items.

Vite + React + TypeScript, deployed to GitHub Pages at
`https://<user>.github.io/fefw-codex/`.

## Credits & AI disclosure

Most of the code in this project was generated with AI assistance (GitHub Copilot / Claude)
and reviewed, directed and tested by Thierry LEE.

- Concept, scope, feature design, and QA: Thierry LEE
- Code, UI, and tooling: largely AI-generated under Thierry LEE's direction
- Game data: in-game collected, Game8, Serenes Forest, FextraLife, FortunesWeave.co.uk, Fortune's Weave Learnset List (community Google Sheet), Reddit; the data may contain errors.

Unofficial fan project. _Fire Emblem: Fortune's Weave_ and all related assets, names, and
data belong to their respective owners (Intelligent Systems / Nintendo / Koei Tecmo).
Not affiliated with or endorsed by them.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173/fefw-codex/
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/ locally
```

## Layout

- `src/codex/Codex.tsx` — app state and logic; `renderVals()` builds the flat
  view model the views render.
- `src/codex/constants.ts` — stats, routes, themes and other lookup tables.
- `src/view/AppView.tsx` — app shell (sidebar / tabs, breadcrumbs, picker, tooltip).
- `src/view/screens/*` — one component per screen.
- `src/view/runtime.tsx` — small helpers the views use (`L`, `T`, `str`, `css`).
- `src/styles/` — fonts, global styles and `:hover` / `:focus` classes.
- `public/database/codex.json` — game data, fetched at startup.

User data (builds, progress, settings) lives in the browser's `localStorage`
under `weave-codex`.

## Install & offline (PWA)

The site is an installable PWA: the service worker precaches the whole app,
`codex.json` included, so after one visit it runs fully offline.

- Android (Chrome): menu → **Install app**.
- iPhone (Safari only): Share → **Add to Home Screen**. The installed app has
  its own storage, separate from Safari's.

Updates: when a new version is deployed, an installed copy notices it on its
next check while online (on launch, when brought back to the foreground, and
hourly) and shows **"A new version is available — Reload / Later"**. Nothing
changes until you tap Reload; saved builds and progress are kept. Offline, the
current version keeps working as is.

Config is in `vite.config.ts` (`VitePWA`), the prompt in `src/UpdatePrompt.tsx`,
icons in `public/icons/`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
In the GitHub repo, set **Settings → Pages → Source** to **GitHub Actions** once.
The base path is set in `vite.config.ts` (`base: '/fefw-codex/'`) — change it
if the repo is renamed or served from a custom domain (`'/'`).
