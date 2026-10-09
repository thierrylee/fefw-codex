export const S = ['HP', 'Str', 'Mag', 'Spd', 'Dex', 'Def', 'Res', 'Lck', 'Cha']
export const ROUTES = ['All', 'Cai', 'Dietrich', 'Theodora', 'Leda']
export const PN = ['Prologue', 'Part I', 'Part II', 'Part III']
export const RO = ['P', 'I', 'II', 'III']
export const PC = ['oklch(0.8 0.08 165)', 'oklch(0.8 0.11 75)', 'oklch(0.74 0.12 30)', 'oklch(0.74 0.11 300)']
export const TIERS = ['Base', 'Beginner', 'Specialty', 'Advanced', 'Master', 'Divine']
export const TC = Object.fromEntries(
  TIERS.map((g?: any, i?: any) => [g, 'oklch(0.76 0.1 ' + ([250, 185, 150, 85, 40, 330] as any)[i] + ')']),
)
export const TL: Record<string, any> = {
  'Flame Lord': 'Lord',
  Main: 'Protagonist',
  Playable: 'Ally',
  Unit: 'Unit',
  'Guest ally': 'Guest ally',
  Guest: 'Guest',
}
export const CC = ['oklch(0.8 0.11 75)', 'oklch(0.74 0.1 185)', 'oklch(0.74 0.11 330)', 'oklch(0.78 0.12 150)']
export const THEMES: Record<string, any> = {
  Emerald: {
    bg: 'oklch(0.2 0.045 165)',
    panel: 'oklch(0.245 0.05 165)',
    panel2: 'oklch(0.3 0.055 165)',
    line: 'oklch(0.42 0.06 110 / .55)',
    tx: 'oklch(0.95 0.02 90)',
    mu: 'oklch(0.78 0.035 120)',
    ac: 'oklch(0.82 0.12 85)',
    r: '10px',
    glow: 'inset 0 0 0 1px oklch(0.82 0.12 85 / .18), 0 12px 40px -18px oklch(0.1 0.04 165)',
  },
  Nocturne: {
    bg: 'oklch(0.15 0.015 265)',
    panel: 'oklch(0.19 0.02 265)',
    panel2: 'oklch(0.24 0.025 265)',
    line: 'oklch(0.28 0.025 265)',
    tx: 'oklch(0.95 0.01 265)',
    mu: 'oklch(0.72 0.02 265)',
    ac: 'oklch(0.8 0.11 75)',
    r: '10px',
    glow: '0 0 0 1px oklch(0.8 0.11 75 / .25), 0 18px 60px -20px oklch(0.8 0.11 75 / .35)',
  },
  Ink: {
    bg: 'oklch(0.12 0 0)',
    panel: 'oklch(0.12 0 0)',
    panel2: 'oklch(0.2 0 0)',
    line: 'oklch(0.34 0 0)',
    tx: 'oklch(0.97 0 0)',
    mu: 'oklch(0.72 0 0)',
    ac: 'oklch(0.82 0.13 75)',
    r: '10px',
    glow: 'none',
  },
  Gilt: {
    bg: 'oklch(0.18 0.025 85)',
    panel: 'oklch(0.225 0.03 85)',
    panel2: 'oklch(0.28 0.035 85)',
    line: 'oklch(0.42 0.05 85 / .55)',
    tx: 'oklch(0.95 0.02 90)',
    mu: 'oklch(0.78 0.04 90)',
    ac: 'oklch(0.8 0.12 85)',
    r: '10px',
    glow: 'inset 0 0 0 1px oklch(0.8 0.12 85 / .2), 0 12px 40px -18px oklch(0.1 0.03 85)',
  },
  Rose: {
    bg: 'oklch(0.2 0.035 5)',
    panel: 'oklch(0.245 0.04 5)',
    panel2: 'oklch(0.3 0.045 5)',
    line: 'oklch(0.45 0.06 5 / .55)',
    tx: 'oklch(0.96 0.015 10)',
    mu: 'oklch(0.8 0.04 5)',
    ac: 'oklch(0.82 0.12 85)',
    r: '10px',
    glow: 'inset 0 0 0 1px oklch(0.82 0.12 85 / .2), 0 12px 40px -18px oklch(0.1 0.04 5)',
  },
  Amethyst: {
    bg: 'oklch(0.19 0.04 305)',
    panel: 'oklch(0.235 0.045 305)',
    panel2: 'oklch(0.29 0.05 305)',
    line: 'oklch(0.42 0.055 305 / .55)',
    tx: 'oklch(0.95 0.015 300)',
    mu: 'oklch(0.78 0.03 300)',
    ac: 'oklch(0.82 0.12 85)',
    r: '10px',
    glow: 'inset 0 0 0 1px oklch(0.82 0.12 85 / .18), 0 12px 40px -18px oklch(0.1 0.04 305)',
  },
  Ocean: {
    bg: 'oklch(0.19 0.04 230)',
    panel: 'oklch(0.235 0.045 230)',
    panel2: 'oklch(0.29 0.05 230)',
    line: 'oklch(0.42 0.055 230 / .55)',
    tx: 'oklch(0.95 0.015 220)',
    mu: 'oklch(0.78 0.03 220)',
    ac: 'oklch(0.83 0.1 75)',
    r: '10px',
    glow: 'inset 0 0 0 1px oklch(0.83 0.1 75 / .18), 0 12px 40px -18px oklch(0.1 0.04 230)',
  },
  Crimson: {
    bg: 'oklch(0.19 0.035 20)',
    panel: 'oklch(0.235 0.04 20)',
    panel2: 'oklch(0.29 0.045 20)',
    line: 'oklch(0.42 0.05 20 / .55)',
    tx: 'oklch(0.95 0.015 60)',
    mu: 'oklch(0.78 0.03 30)',
    ac: 'oklch(0.82 0.1 80)',
    r: '10px',
    glow: 'inset 0 0 0 1px oklch(0.82 0.1 80 / .18), 0 12px 40px -18px oklch(0.1 0.04 20)',
  },
}
export const sum = (a?: any) => a.reduce((x?: any, y?: any) => x + y, 0)

export const MSP: Record<string, any> = {
  'Ornius Rider': ['Ornius'],
  'Armored Ornius Rider': ['Ornius'],
  Caladrius: ['Ornius'],
  'Wing Soldier': ['Pegasus', 'Bau'],
  'Celestial Trooper': ['Pegasus'],
  Dragoon: ['Bau'],
  'Bau Lord': ['Bau'],
  'Elephant Rider': [],
}
export const mountSp = (k?: any) => (!k ? [] : k.sp || [])
export const mountAt = (m?: any) => (m ? { st: m.st, g: m.g } : { st: S.map(() => 0), g: S.map(() => 0) })
export const MT = (m?: any) => {
  if (!m) return ''
  const n = ['HP', 'Str', 'Mag', 'Spd', 'Dex', 'Def', 'Res', 'Lck', 'Cha']
  const p = m.s.map((v?: any, i?: any) => (v ? n[i] + (v > 0 ? ' +' : ' ') + v : '')).filter(Boolean)
  if (m.mov) p.push('Mov ' + (m.mov > 0 ? '+' : '') + m.mov)
  if (m.bld) p.push('Bld ' + (m.bld > 0 ? '+' : '') + m.bld)
  return p.join(' · ') + (m.tg && m.tg !== 'self' ? ' (' + m.tg + ')' : '') + (m.cd ? ' · conditional' : '')
}
export const SLUG = (n?: any) =>
  String(n)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
