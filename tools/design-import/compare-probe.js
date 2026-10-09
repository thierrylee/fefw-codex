// Paste into the console (or a browser automation tool) on both the design
// export and the dev server, with the same viewport and localStorage, then
// compare the outputs: equal fingerprints mean identical text, element count,
// layout geometry and computed colors per screen.
//
// Same progress on both sides first (then reload):
//   localStorage.setItem('weave-codex', JSON.stringify({ part: 3, route: 'All' }))
//   localStorage.setItem('weave-codex-picked', '1')
await (async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  const h = (s) => { let x = 5381; for (let i = 0; i < s.length; i++) x = (x * 33 + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36) }
  const snap = (root) => {
    const els = root.querySelectorAll('*')
    let geo = ''
    els.forEach((e) => { const r = e.getBoundingClientRect(); geo += [e.tagName, Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)].join(',') + ';' })
    const cs = [...els].slice(0, 400).map((e) => { const c = getComputedStyle(e); return c.color + c.backgroundColor + c.fontFamily + c.fontSize + c.borderTopColor }).join('|')
    return [h(root.innerText), root.innerText.length, els.length, h(geo), h(cs)].join(' ')
  }
  const nav = (l) => [...document.querySelectorAll('nav button')].find((b) => b.innerText.trim() === l)
  const out = { vw: innerWidth + 'x' + innerHeight }
  // Add new screens' nav labels here.
  for (const l of ['Characters', 'Unit builder', 'Compare', 'Charts', 'Classes', 'Abilities', 'Combat Arts', 'Items', 'Settings']) {
    const b = nav(l)
    if (!b) { out[l] = 'missing'; continue }
    b.click(); await sleep(500)
    out[l] = snap(document.querySelector('main'))
  }
  // A character profile and a tooltip.
  nav('Characters').click(); await sleep(400)
  const card = [...document.querySelectorAll('main *')].find((e) => e.innerText?.trim().startsWith('Dietrich') && getComputedStyle(e).cursor === 'pointer')
  card?.click(); await sleep(600)
  out.profile = snap(document.querySelector('main'))
  document.querySelector('main [data-tip]')?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); await sleep(400)
  out.tooltip = h(document.body.innerText)
  return out
})()
