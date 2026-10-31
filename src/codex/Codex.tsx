import { Component, createRef } from 'react'
import { AppView } from '../view/AppView'
import { S, ROUTES, PN, RO, PC, TIERS, TC, TL, CC, THEMES, sum, MSP, mountSp, mountAt, MT, SLUG } from './constants'
import { DEFAULT_PROPS, type CodexProps } from './props'

export class Codex extends Component<CodexProps, any> {
  static defaultProps = DEFAULT_PROPS
  // Instance fields the logic assigns ad hoc (drag tracking, history, caches).
  declare AB: any
  declare IMG: any
  declare SK: any
  declare am: any
  declare cDrag: any
  declare cOver: any
  declare ck: any
  declare closeSheet: any
  declare cpT: any
  declare dragId: any
  declare hDrag: any
  declare hOver: any
  declare hc: any
  declare hcur: any
  declare idx: any
  declare idxD: any
  declare key: any
  declare ly: any
  declare md: any
  declare mxDone: any
  declare od: any
  declare overId: any
  declare pk: any
  declare rHov: any
  declare rScr: any
  declare rT: any
  declare ready: any
  declare ro: any
  declare rootNav: any
  declare rz: any
  declare seen: any
  declare setState: any
  declare sh: any
  declare sk: any
  declare skip: any
  declare spyKeys: any
  declare spyT: any
  state: any = {
    d: null,
    screen: 'roster',
    part: 0,
    picked: true,
    route: 'All',
    sel: 'Dietrich',
    q: '',
    type: 'All',
    calc: { c: 'Dietrich', k: 'Swordmaster', m: 'None', lv: 20 },
    builds: null,
    cmp: [],
    gtab: 'Mounts',
    gq: '',
    hsort: -1,
    narrow: false,
  }
  rootRef = createRef<HTMLDivElement>()
  jumpTo(k?: any) {
    const find = () => [...document.querySelectorAll('[data-jump="' + k + '"]')].find((e?: any) => e.offsetParent)
    const el0 = find()
    if (!el0) return
    let p = el0.parentElement
    while (
      p &&
      p !== document.body &&
      !(p.scrollHeight > p.clientHeight + 2 && /(auto|scroll)/.test(getComputedStyle(p).overflowY))
    )
      p = p.parentElement
    const sc = p && p !== document.body ? p : null
    const calc = () => {
      const el = find()
      if (!el) return null
      const sr = sc ? sc.getBoundingClientRect().top + sc.clientTop : 0
      let off = 16
      document.querySelectorAll('header,div,nav').forEach((h?: any) => {
        if (h.contains(el)) return
        const cs = getComputedStyle(h)
        if (cs.position !== 'sticky' && cs.position !== 'fixed') return
        const b = h.getBoundingClientRect()
        if (b.top <= sr + 2 && b.bottom > sr && b.bottom - sr < 220 && b.width > 200)
          off = Math.max(off, b.bottom - sr + 10)
      })
      return el.getBoundingClientRect().top - sr - off
    }
    const go = (b?: any) => {
      const dy = calc()
      if (dy == null) return
      if (b === 'smooth' || Math.abs(dy) > 4) (sc || window).scrollBy({ top: dy, behavior: b })
    }
    go('smooth')
    setTimeout(() => go('auto'), 550)
    setTimeout(() => go('auto'), 1100)
  }
  stt = () => {
    const r = this.rootRef.current
    const y = Math.max(window.scrollY || 0, r && r.scrollHeight > r.clientHeight + 2 ? r.scrollTop : 0)
    const on = y > 300
    if (on !== !!this.state.topShow) this.setState({ topShow: on })
  }
  esc = (e?: any) => {
    if (e.key !== 'Escape') return
    const ov = [...document.querySelectorAll('div')].filter(
      (x?: any) => x.style.position === 'fixed' && x.style.inset && x.style.display === 'grid' && x.style.zIndex,
    )
    if (ov.length) {
      ov.sort((a?: any, b?: any) => b.style.zIndex - a.style.zIndex)
      ov[0].click()
      return
    }
    if (this.state.pk) this.setState({ pk: null, pq: '', pf: 'All', tip: null })
  }
  componentDidMount() {
    this.hc = () => {
      if (this.ready && this.state.d && location.hash !== this.enc(this.state)) this.dec(this.state.d)
    }
    this.am = (e?: any) => {
      if (e.button !== 1) return
      const el = this.pk0(e.target)
      if (!el) return
      e.preventDefault()
      e.stopPropagation()
      this.peek(el)
    }
    this.md = (e?: any) => {
      if (e.button === 1 && this.pk0(e.target)) e.preventDefault()
    }
    this.ck = (e?: any) => {
      if (e.button !== 0 || !(e.ctrlKey || e.metaKey)) return
      const el = this.pk0(e.target)
      if (!el) return
      e.preventDefault()
      e.stopPropagation()
      this.peek(el)
    }
    window.addEventListener('hashchange', this.hc)
    document.addEventListener('auxclick', this.am, true)
    document.addEventListener('mousedown', this.md, true)
    document.addEventListener('click', this.ck, true)
    {
      const os = this.setState.bind(this)
      this.setState = (p?: any, cb?: any) => {
        if (this.pk) {
          const b: Record<string, any> = { ...this.state, ...this.pk }
          const v = typeof p === 'function' ? p(b) : p
          if (v) Object.assign(this.pk, v)
          return
        }
        os(p, cb)
      }
    }
    window.addEventListener('keydown', this.esc)
    window.addEventListener('scroll', this.stt, true)
    try {
      const raw = localStorage.getItem('weave-codex')
      const s = JSON.parse(raw || '{}')
      s.kopen = false
      this.setState(s)
      this.setState({ picked: !!raw && localStorage.getItem('weave-codex-picked') === '1' })
    } catch (e: any) {}
    fetch(import.meta.env.BASE_URL + 'database/codex.json')
      .then((r?: any) => r.json())
      .then((d?: any) => {
        this.dec(d)
        this.ready = true
        this.setState((st?: any) => ({
          d,
          builds: st.builds || [],
          cmp: st.cmp || [],
        }))
      })
    this.closeSheet = () => {
      const k = this.sk
      if (!k) return
      this.sk = null
      const fin = () => {
        if (k === 'k') {
          if (history.state && history.state.kopen) history.back()
          else this.save({ kopen: false })
        } else if (k[0] === 'p') this.setState({ ppv: '' })
        else this.setState((s?: any) => ({ cd: s.cd ? { ...s.cd, pv: '' } : s.cd }))
      }
      const el = document.querySelector('[data-sheet]')
      if (el && el.animate && getComputedStyle(el).position === 'fixed') {
        const a = el.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(100%)' }], {
          duration: 220,
          easing: 'cubic-bezier(.4,0,1,1)',
          fill: 'forwards',
        })
        a.onfinish = fin
      } else fin()
    }
    this.ly = new Map<any, any>()
    this.sh = (e?: any) => {
      if (!this.sk) return
      const t = e.target
      if (t && t.closest && t.closest('[data-sheet]')) return
      const y =
        t === document || t === document.documentElement || t === document.body
          ? (document.scrollingElement || document.documentElement).scrollTop
          : t.scrollTop
      const p = this.ly.get(t)
      this.ly.set(t, y)
      if (p == null) return
      if (y - p > 6 && y > 20) {
        const k = this.sk
        this.sk = null
        if (k[0] === 'p') this.setState({ ppv: '' })
        else this.setState((s?: any) => ({ cd: s.cd ? { ...s.cd, pv: '' } : s.cd }))
      }
    }
    document.addEventListener('scroll', this.sh, true)
    window.addEventListener('popstate', this.pop)
    document.addEventListener('pointerdown', this.pd)
    document.addEventListener('scroll', this.sc, true)
    document.addEventListener('touchmove', this.sc, true)
    document.addEventListener('wheel', this.sc, true)
    if (window.ResizeObserver && this.rootRef.current) {
      this.ro = new ResizeObserver((e?: any) => {
        const n = e[0].contentRect.width < 760
        if (n !== this.state.narrow) this.setState({ narrow: n })
      })
      this.ro.observe(this.rootRef.current)
    }
  }
  enc = (s?: any) => {
    const e = encodeURIComponent
    return (
      '#/' +
      (s.screen === 'profile'
        ? 'profile/' + e(s.sel || '')
        : s.screen === 'classes' && s.ksel
          ? 'classes/' + e(s.ksel)
          : s.screen === 'calc' && s.calc && s.calc.c
            ? 'calc/' + e(s.calc.c)
            : s.screen)
    )
  }
  dec = (d?: any) => {
    const p = location.hash.replace(/^#\/?/, '').split('/')
    const sc = p[0],
      v = p[1] ? decodeURIComponent(p[1]) : ''
    if (
      ![
        'roster',
        'profile',
        'calc',
        'compare',
        'charts',
        'match',
        'classes',
        'abilities',
        'arts',
        'items',
        'settings',
      ].includes(sc)
    )
      return
    const o: Record<string, any> = { screen: sc, tip: null }
    if (sc === 'profile') {
      if (!v || !d.chars.some((c?: any) => c.n === v)) return
      o.sel = v
      o.ptab = 'info'
    }
    if (sc === 'classes' && v) {
      o.ksel = v
      o.kopen = !!this.ready
    }
    if (sc === 'calc' && v) {
      const ch = d.chars.find((c?: any) => c.n === v)
      if (ch && (!this.state.calc || this.state.calc.c !== v)) o.calc = { c: v, k: ch.cls, m: 'None', lv: 20 }
    }
    this.rootNav = false
    this.setState(o)
  }
  pk0 = (t?: any) => {
    for (let e = t; e && e.nodeType === 1 && e !== document.body; e = e.parentElement) {
      if (e.tagName === 'A' && e.href) return null
      const c = getComputedStyle(e).cursor
      if (c === 'pointer' && !e.disabled) return e
    }
    return null
  }
  peek = (el?: any) => {
    this.pk = {}
    try {
      el.click()
    } finally {
      var P = this.pk
      this.pk = null
    }
    const m: Record<string, any> = { ...this.state, ...P }
    const U = this.enc(m)
    if (U !== this.enc(this.state) && m.screen && m.screen !== 'overview')
      window.open(location.href.split('#')[0] + U, '_blank')
  }
  tierFor = (d?: any, lv?: any) => {
    const tl: any = {}
    d.classes.forEach((k?: any) => {
      if (k.lv !== '' && !isNaN(+k.lv)) tl[k.tier] = Math.min(tl[k.tier] ?? 999, +k.lv)
    })
    let r = 'Base'
    ;['Beginner', 'Specialty', 'Advanced', 'Master'].forEach((t?: any) => {
      if (tl[t] != null && tl[t] <= lv) r = t
    })
    return this.state.part < 3 && r === 'Master' ? 'Advanced' : r
  }
  hk = (s?: any) =>
    s.screen +
    '|' +
    (s.screen === 'profile' ? JSON.stringify(s.sel ?? null) : '') +
    (s.screen === 'classes' && s.kopen && s.narrow ? '|open' : '')
  lbl(s?: any) {
    return s.screen === 'profile'
      ? s.sel || 'Character'
      : ({
          roster: 'Characters',
          calc: 'Unit builder',
          compare: 'Compare builds',
          charts: 'Charts',
          match: 'Meal pairing',
          classes: 'Classes',
          abilities: 'Abilities',
          arts: 'Combat Arts',
          items: 'Items',
          settings: 'Settings',
        } as any)[s.screen] || 'Codex'
  }
  componentDidUpdate() {
    const s = this.state
    if (this.rScr !== s.screen) {
      this.rScr = s.screen
      setTimeout(() => this.railPing(), 0)
    }
    {
      const sn = this.seen || (this.seen = new WeakSet())
      document.querySelectorAll('[data-sheet]').forEach((el?: any) => {
        if (sn.has(el)) return
        sn.add(el)
        if (s.narrow && el.animate && getComputedStyle(el).position === 'fixed')
          el.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], {
            duration: 280,
            easing: 'cubic-bezier(.2,.8,.2,1)',
          })
      })
    }
    {
      const n = !!s.narrow,
        dp = (s.pk ? 1 : 0) + (s.pk && n && s.ppv ? 1 : 0) + (s.cd ? 1 : 0) + (s.cd && n && s.cd.pv ? 1 : 0),
        od = this.od || 0
      if (dp > od) {
        for (let i = od; i < dp; i++) history.pushState(history.state, '')
        this.od = dp
      } else if (dp < od) {
        this.od = dp
        const hs = history.state
        if (hs && hs.screen && this.hk(hs) === this.hk(s)) {
          this.skip = (this.skip || 0) + 1
          history.go(dp - od)
        }
      }
    }
    if (this.ready && s.screen === 'match') {
      const M: any = s.mx || {},
        dn = !!(M.meal && M.c1 && M.c2 && M.c3)
      if (this.mxDone === undefined) this.mxDone = dn
      else if (dn && !this.mxDone) {
        this.mxDone = true
        setTimeout(() => this.jumpTo('mx-grid'), 200)
      } else if (!dn) this.mxDone = false
    }
    if (this.spyKeys && !this.spyT)
      this.spyT = requestAnimationFrame(() => {
        this.spyT = 0
        this.spyUpd()
      })
    if (!this.ready || !s.screen || s.screen === 'overview') return
    const k = this.hk(s)
    const U = this.enc(s)
    if (this.hcur === k) {
      if (location.hash !== U) history.replaceState(history.state, '', U)
      return
    }
    const e: Record<string, any> = { screen: s.screen, sel: s.sel, l: this.lbl(s) }
    if (s.screen === 'classes' && s.kopen && s.narrow) {
      e.kopen = true
      e.ksel = s.ksel
    }
    let tr: any
    if (this.hcur === undefined) {
      tr = [e]
      history.replaceState({ ...e, trail: tr }, '', U)
    } else {
      const pt = s.trail || []
      const di = pt.findIndex((x?: any) => this.hk(x) === k)
      tr = this.rootNav ? [e] : di >= 0 ? [...pt.slice(0, di), e] : [...pt, e].slice(-6)
      this.rootNav = false
      history.pushState({ ...e, trail: tr }, '', U)
    }
    this.hcur = k
    this.setState({ trail: tr })
  }
  pop = (e?: any) => {
    if (this.skip > 0) {
      this.skip--
      return
    }
    if (this.od > 0) {
      const s = this.state,
        n = !!s.narrow
      this.od--
      if (s.cd && n && s.cd.pv) this.setState({ cd: { ...s.cd, pv: '' } })
      else if (s.pk && n && s.ppv) this.setState({ ppv: '', tip: null })
      else if (s.cd) this.setState({ cd: null, tip: null })
      else if (s.pk) this.setState({ pk: null, pq: '', pf: 'All', tip: null })
      return
    }
    const h = e.state
    if (!h || !h.screen) return
    this.hcur = this.hk(h)
    this.setState({
      screen: h.screen,
      sel: h.sel,
      ...(h.screen === 'classes' ? { kopen: !!h.kopen, ...(h.kopen && h.ksel ? { ksel: h.ksel } : {}) } : {}),
      trail: h.trail || [{ screen: h.screen, sel: h.sel, l: this.lbl(h) }],
      tip: null,
    })
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.sh, true)
    window.removeEventListener('keydown', this.esc)
    window.removeEventListener('scroll', this.stt, true)
    window.removeEventListener('popstate', this.pop)
    window.removeEventListener('hashchange', this.hc)
    document.removeEventListener('auxclick', this.am, true)
    document.removeEventListener('mousedown', this.md, true)
    document.removeEventListener('click', this.ck, true)
    this.ro && this.ro.disconnect()
    document.removeEventListener('pointerdown', this.pd)
    document.removeEventListener('scroll', this.sc, true)
    document.removeEventListener('touchmove', this.sc, true)
    document.removeEventListener('wheel', this.sc, true)
  }
  rg = (items?: any, kf?: any) => {
    const s = this.state,
      rows = (s.jscr === s.screen ? s.jgrp || '' : '')
        .split('|')
        .filter(Boolean)
        .map((g?: any) => g.split(',')),
      out: any = [],
      used = new Set<any>()
    items.forEach((it?: any) => {
      if (used.has(kf(it))) return
      const row = rows.find((r?: any) => r.includes(kf(it)))
      const mem = row ? items.filter((x?: any) => row.includes(kf(x))) : [it]
      mem.forEach((x?: any) => used.add(kf(x)))
      out.push(mem)
    })
    return out
  }
  railPing = () => {
    if (this.state.railOff) this.setState({ railOff: false })
    clearTimeout(this.rT)
    this.rT = setTimeout(() => {
      if (!this.rHov) this.setState({ railOff: true })
    }, 3500)
  }
  sc = (e?: any) => {
    this.railPing()
    if (this.state.tip || this.state.nt) this.setState({ tip: null, nt: null })
    this.spyUpd()
  }
  spyUpd = () => {
    const s = this.state
    if (!this.spyKeys || !this.spyKeys.length) return
    const E = this.spyKeys
      .map((k?: any) => {
        const el = [...document.querySelectorAll('[data-jump="' + k + '"]')].find((e?: any) => e.offsetParent)
        if (!el) return null
        const b = el.getBoundingClientRect()
        return { k, t: b.top, l: b.left }
      })
      .filter(Boolean)
    if (!E.length) return
    const ord = [...E].sort((p?: any, q?: any) => (Math.abs(p.t - q.t) < 4 ? p.l - q.l : p.t - q.t)).map((x?: any) => x.k)
    const ab = E.filter((x?: any) => x.t <= 140)
    const a = (
      ab.length
        ? ab.reduce((m?: any, x?: any) => (Math.abs(x.t - m.t) <= 4 ? (x.l < m.l ? x : m) : x.t > m.t ? x : m))
        : ord[0] && E.find((x?: any) => x.k === ord[0])
    ).k
    let a2 = a
    if (s.screen === 'calc' && !s.narrow && a === 'b-setup') {
      const cs = E.find((x?: any) => x.k === 'b-class'),
        su = E.find((x?: any) => x.k === 'b-setup')
      if (cs && su && Math.abs(cs.t - su.t) < 40) a2 = 'b-class'
    }
    const oj = ord.join('|')
    const gr: any = []
    ord.forEach((k?: any) => {
      const e = E.find((x?: any) => x.k === k),
        g = gr[gr.length - 1]
      if (g && Math.abs(g.t - e.t) <= 4) g.ks.push(k)
      else gr.push({ t: e.t, ks: [k] })
    })
    const gs = gr.map((g?: any) => g.ks.join(',')).join('|')
    if (a2 !== s.spy || oj !== s.jord || gs !== s.jgrp || s.jscr !== s.screen)
      this.setState({ spy: a2, jord: oj, jgrp: gs, jscr: s.screen })
  }
  pd = (e?: any) => {
    if (this.state.tip && !(e.target.closest && e.target.closest('[data-tip]'))) this.setState({ tip: null })
  }
  mGroups(m?: any) {
    if (!m || !m.pa) return []
    const by: any = {},
      ord: any = []
    m.pa.forEach((a?: any) => {
      const k = a.n.replace(/\+$/, '')
      if (!by[k]) {
        by[k] = []
        ord.push(k)
      }
      by[k].push(a)
    })
    return ord.map((k?: any) => ({
      lbl: k,
      items: by[k]
        .slice()
        .sort((x?: any, y?: any) => (x.n.endsWith('+') ? 1 : 0) - (y.n.endsWith('+') ? 1 : 0))
        .map((a?: any) => a.n),
      bl: Object.fromEntries(by[k].map((a?: any) => [a.n, a.bl || 1])),
    }))
  }
  index(d?: any) {
    if (this.idx && this.idxD === d) return this.idx
    const key = (v?: any) =>
      v
        .replace(/\s*\(.*?\)\s*/g, '')
        .trim()
        .toLowerCase()
    const idx: any = {}
    const RK = ['D', 'C', 'B', 'A', 'S', '?']
    d.chars.forEach((c?: any) =>
      c.ls.forEach((l?: any) =>
        l.r.forEach((v?: any, i?: any) => {
          if (!v || v === '?') return
          const k = key(v)
          const e = idx[k] || (idx[k] = { n: v.replace(/\s*\(.*?\)\s*/g, '').trim(), cats: new Set<any>(), learners: [] })
          e.cats.add(l.c)
          e.learners.push({ c: c.n, part: c.part, routes: c.routes, rank: RK[i] })
        }),
      ),
    )
    d.arts.forEach((a?: any) =>
      a.n.split(/\s*\/\s*/).forEach((n?: any) => {
        const e = idx[n.toLowerCase()] || (idx[n.toLowerCase()] = { n, cats: new Set<any>([a.c]), learners: [] })
        e.eff = a.e || e.eff
        e.kind = a.k
        if (a.s) e.s = a.s
      }),
    )
    d.classes.forEach((k?: any) =>
      k.ab.forEach((a?: any) => {
        const n = a.n.toLowerCase()
        const e = idx[n] || (idx[n] = { n: a.n, cats: new Set<any>(), learners: [] })
        if (!e.eff) e.eff = a.e
        ;(e.cls = e.cls || []).push(k.n + (a.t ? ' (' + a.t.toLowerCase() + ')' : ''))
      }),
    )
    d.chars.forEach((c?: any) => {
      const add = (n?: any, e?: any, m?: any, t?: any) => {
        const k = n.toLowerCase()
        if (!n || (idx[k] && !idx[k].pers)) return
        const x =
          idx[k] || (idx[k] = { n, cats: new Set<any>(['Personal ability']), learners: [], pers: true, eff: e, holders: '' })
        x.holders = (x.holders ? x.holders + ', ' : '') + c.n + (t ? ' (' + t + ')' : '')
      }
      if (c.pa) {
        const i = c.pa.indexOf(': ')
        if (i > 0) add(c.pa.slice(0, i), c.pa.slice(i + 2))
      }
      ;(c.lab || []).forEach((a?: any) => add(a.n, a.e, 0, a.lv ? 'Lv ' + a.lv : ''))
    })
    Object.entries(d.univE || {}).forEach(([n, e]: any) => {
      idx[n.toLowerCase()] = { n, cats: new Set<any>(['Universal']), learners: [], eff: e, univ: true }
    })
    d.paired.forEach((p?: any) => {
      idx[p.n.toLowerCase()] = { n: p.n, cats: new Set<any>(['Paired ability']), learners: [], eff: p.e, mounts: p.m }
    })
    d.bloodmarks.forEach((b?: any) => {
      idx[b.n.toLowerCase()] = { n: b.n, cats: new Set<any>(['Bloodmark']), learners: [], eff: b.e, trig: b.t, holders: b.c }
    })
    this.idx = idx
    this.idxD = d
    this.key = key
    return idx
  }
  tipFor(raw?: any) {
    const st = this.state,
      d = st.d,
      P = st.part,
      R = st.route
    const idx = this.index(d)
    const e = idx[this.key(raw)]
    const note = (raw.match(/\((.*?)\)/) || [])[1] || ''
    const cats = e ? [...e.cats] : []
    const lkv = d.lk && d.lk[this.key(raw)]
    const kind = lkv
      ? d.lkl['learnables.kind.' + lkv[0]]
      : e && e.kind
        ? e.kind
        : cats.some((c?: any) => /reason|faith|magic/i.test(c))
          ? 'Spell'
          : cats.some((c?: any) => /infantry|cavalry|armou?r|fly|flier|heavy/i.test(c))
            ? 'Ability'
            : cats.includes('Universal')
              ? 'Universal ability'
              : cats.includes('Bloodmark')
                ? 'Bloodmark'
                : cats.includes('Personal ability')
                  ? 'Personal ability'
                  : cats.includes('Paired ability')
                    ? 'Mount ability'
                    : e && e.cls && !cats.length
                      ? 'Class ability'
                      : 'Combat art'
    const sub = [
      kind,
      ...cats.filter(
        (c?: any) => c !== 'Bloodmark' && c !== 'Paired ability' && c !== 'Personal ability' && c !== 'Universal',
      ),
    ].join(' · ')
    let who = '',
      whoLbl = '',
      whoGroups: any = []
    if (e && e.learners.length) {
      const vis = e.learners.filter(
        (l?: any) => l.part <= P && !(l.part === 0 && P === 1) && (R === 'All' || l.part >= 3 || l.routes.includes(R)),
      )
      const hid = e.learners.length - vis.length
      const RK = ['D', 'C', 'B', 'A', 'S', '?']
      const gm: any = {}
      vis.forEach((l?: any) => (gm[l.rank] = gm[l.rank] || []).push(l.c))
      const ro = (k?: any) => {
        const i = RK.indexOf(k)
        return i < 0 ? 99 : i
      }
      whoGroups = Object.keys(gm)
        .sort((a?: any, b?: any) => ro(a) - ro(b))
        .map((k?: any) => ({ rank: k, names: gm[k].join(', ') }))
      who = hid ? '+' + hid + ' sealed' : vis.length ? ' ' : ''
      whoLbl = 'Learned by · rank'
    } else if (e && e.mounts) {
      who = e.mounts
      whoLbl = 'Granted by mounts'
    } else if (e && e.holders) {
      who = e.holders
        .split(/,\s*/)
        .map((n?: any) => {
          const c = d.chars.find((x?: any) => x.n === n)
          return c && c.part > P ? '(sealed)' : n
        })
        .join(', ')
      whoLbl = 'Held by'
    } else if (e && e.cls) {
      who = e.cls.join(', ')
      whoLbl = 'From class'
    }
    const noteT = [note && 'Note: ' + note, e && e.trig && 'Trigger ' + e.trig + '%'].filter(Boolean).join(' · ')
    const sx = e && e.s,
      pf = (v?: any) => (sx && sx.b && v > 0 ? '+' + v : String(v))
    let stats = sx
      ? [
          ['Might', sx.mt != null && pf(sx.mt)],
          ['Hit', sx.hit != null && pf(sx.hit)],
          ['Crit', sx.crt != null && pf(sx.crt)],
          ['Range', sx.rn],
          ['Weight', sx.wt],
          ['Uses', sx.us],
          ['Durability', sx.dc != null && '-' + sx.dc],
        ]
          .filter(([l, v]: any) => v !== false && v != null && v !== '')
          .map(([l, v]: any) => ({ l, v }))
      : []
    const z0 = (v?: any) => +String(v).replace(/^\+/, '') === 0
    if (stats.every((x?: any) => x.l === 'Range' || z0(x.v))) stats = stats.filter((x?: any) => x.l === 'Range')
    return {
      stats,
      hasStats: stats.length > 0,
      statNote: '',
      t: e ? e.n : raw,
      sub,
      body: e && e.eff ? e.eff : 'Effect not recorded in the workbook yet.',
      bodyCol: e && e.eff ? 'var(--tx, #eee)' : 'var(--mu, #aaa)',
      note: noteT,
      who,
      whoLbl,
      whoGroups,
      hasGroups: whoGroups.length > 0,
    }
  }
  lsAll(c?: any) {
    const U = this.state.d.univ || []
    const A: any = c.af || { p: [], w: [] }
    return (c.ls || []).map((l?: any) => {
      const ap = A.p.includes(l.c),
        aw = A.w.includes(l.c),
        af = ap ? '▲' : aw ? '▼' : '',
        aft = ap ? l.c + ' +1 EXP' : aw ? l.c + ' -1 EXP' : '',
        afc = ap ? 'oklch(0.78 0.1 150)' : 'oklch(0.72 0.1 25)'
      const u = U.find((x?: any) => x.c === l.c)
      const afEnter = (ev?: any) => {
          if (!aft) return
          const r = ev.currentTarget.getBoundingClientRect()
          this.setState({
            afTip: { t: aft, x: Math.max(12, Math.min(r.left, window.innerWidth - 260)) + 'px', y: r.top - 6 + 'px' },
          })
        },
        afLeave = () => this.setState({ afTip: null })
      const IC = ({
        Sword: 'skills/sword',
        Lance: 'skills/spear',
        Axe: 'skills/axe',
        Bow: 'skills/bow',
        Brawl: 'skills/gauntlets',
        Reason: 'skills/black_magic',
        Faith: 'skills/white_magic',
        Authority: 'skills/authority',
        Infantry: 'skills/infantry',
        Cavalry: 'skills/riding',
        Armor: 'skills/heavy_armor',
        Flying: 'skills/flying',
      } as any)[l.c]
      const ic: Record<string, any> = { hasIc: !!IC, bgi: IC ? 'url(img/' + IC + '.png) center/cover no-repeat' : 'none' }
      return u
        ? {
            ...l,
            ...ic,
            af,
            aft,
            afc,
            afEnter,
            afLeave,
            r: l.r.map((v?: any, i?: any) => (i < 5 && u.r[i] ? [v && v !== '?' ? v : '', u.r[i]].filter(Boolean).join(', ') : v)),
          }
        : { ...l, ...ic, af, aft, afc, afEnter, afLeave }
    })
  }
  lsLines(v?: any, t?: any) {
    const st = this.state
    if (!v)
      return [{ v: '—', col: t.line, enter: () => {}, leave: () => {}, cur: 'default', ul: 'transparent', on: false }]
    return v
      .split(/,\s*(?![^()]*\))/)
      .map((s?: any, i?: any) => ({ s, i, p: /\([A-S]?[+-]\)\s*$/.test(s) ? 1 : 0 }))
      .sort((x?: any, y?: any) => x.p - y.p || x.i - y.i)
      .map((o?: any) => o.s)
      .map((s?: any) => {
        const has = s !== '?'
        const h = has ? this.hov(s) : { enter: () => {}, leave: () => {} }
        const pm = s.match(/\s*\(([A-S]?[+-])\)\s*$/)
        return {
          v: pm ? s.replace(pm[0], '') : s,
          plus: pm ? pm[1] : '',
          hasPlus: !!pm,
          col: t.tx,
          enter: h.enter,
          leave: h.leave,
          cur: has ? 'help' : 'default',
          ul: has ? t.mu : 'transparent',
          on: !!(st.tip && st.tip.raw === s),
        }
      })
  }
  hov(raw?: any, fn?: any) {
    return {
      enter: (ev?: any) => {
        const r = ev.currentTarget.getBoundingClientRect()
        const W = window.innerWidth,
          H = window.innerHeight
        const dl = ev.currentTarget.closest('[data-cdlg]')
        if (W >= 760 && dl) {
          const p = dl.getBoundingClientRect()
          const lx = W - p.right >= 320 ? p.right + 12 : p.left >= 320 ? p.left - 312 : null
          if (lx != null) {
            this.setState({
              tip: {
                ...(fn ? fn(raw) : this.tipFor(raw)),
                x: lx + 'px',
                y: Math.max(12, Math.min(r.top, H - 340)) + 'px',
                tf: 'none',
                raw: raw,
              },
            })
            return
          }
        }
        const x = Math.max(12, Math.min(r.left, W - 312))
        const below = r.bottom + 300 < H
        this.setState({
          tip: {
            ...(fn ? fn(raw) : this.tipFor(raw)),
            x: x + 'px',
            y: (below ? r.bottom + 8 : r.top - 8) + 'px',
            tf: below ? 'none' : 'translateY(-100%)',
            raw,
          },
        })
      },
      leave: () => {
        if (window.matchMedia && window.matchMedia('(hover:hover)').matches) this.setState({ tip: null })
      },
    }
  }
  skillTip(n?: any) {
    const d = this.state.d,
      M: Record<string, any> = { Spear: 'Lance', Brawling: 'Brawl', 'Black Magic': 'Reason', 'White Magic': 'Faith' },
      c = M[n] || n,
      u = (d.univ || []).find((x?: any) => x.c === c)
    const rk = ['D', 'C', 'B', 'A', 'S']
    return {
      t: n,
      hasIc: true,
      bgi: this.SK(n),
      sub: 'Skill',
      body: '',
      bodyCol: 'var(--mu, #aaa)',
      stats: [],
      hasStats: false,
      statNote: '',
      note: '',
      who: '',
      whoLbl: '',
      whoGroups: [],
      hasGroups: false,
    }
  }
  hovI(n?: any) {
    return {
      enter: (ev?: any) => {
        const r = ev.currentTarget.getBoundingClientRect()
        const W = window.innerWidth,
          H = window.innerHeight
        const dl = ev.currentTarget.closest('[data-cdlg]')
        if (W >= 760 && dl) {
          const p = dl.getBoundingClientRect()
          const lx = W - p.right >= 320 ? p.right + 12 : p.left >= 320 ? p.left - 312 : null
          if (lx != null) {
            this.setState({
              tip: {
                ...this.itemTip(n),
                x: lx + 'px',
                y: Math.max(12, Math.min(r.top, H - 340)) + 'px',
                tf: 'none',
                raw: n,
              },
            })
            return
          }
        }
        const x = Math.max(12, Math.min(r.left, W - 312))
        const below = r.bottom + 300 < H
        this.setState({
          tip: {
            ...this.itemTip(n),
            x: x + 'px',
            y: (below ? r.bottom + 8 : r.top - 8) + 'px',
            tf: below ? 'none' : 'translateY(-100%)',
            raw: n,
          },
        })
      },
      leave: () => {
        if (window.matchMedia && window.matchMedia('(hover:hover)').matches) this.setState({ tip: null })
      },
    }
  }
  itemTip(n?: any) {
    const d = this.state.d,
      x = (d.items || []).find((y?: any) => y.n === n)
    if (!x)
      return {
        t: n,
        sub: 'Item',
        body: 'Not found.',
        bodyCol: 'var(--mu, #aaa)',
        stats: [],
        hasStats: false,
        statNote: '',
        note: '',
        who: '',
        whoLbl: '',
        whoGroups: [],
        hasGroups: false,
      }
    const mm = x.m,
      SN = ['HP', 'Str', 'Mag', 'Spd', 'Dex', 'Def', 'Res', 'Lck', 'Cha']
    const modS = mm
      ? [
          ...mm.s.map((v?: any, i?: any) => (v ? [SN[i], (v > 0 ? '+' : '') + v] : null)),
          mm.mov ? ['Mov', (mm.mov > 0 ? '+' : '') + mm.mov] : null,
          mm.bld ? ['Bld', (mm.bld > 0 ? '+' : '') + mm.bld] : null,
        ].filter(Boolean)
      : []
    const stats = [
      ['Might', x.mt],
      ['Hit', x.hit],
      ['Crit', x.crt],
      ['Range', x.r1 != null ? (x.r2 && x.r2 !== x.r1 ? x.r1 + '–' + x.r2 : String(x.r1)) : null],
      ['Weight', x.wt],
      ['Uses', x.us],
    ]
      .filter(([l, v]: any) => v != null && v !== '')
      .map(([l, v]: any) => ({ l, v }))
    const w = x.w ? (d.chars.find((c?: any) => c.n.toLowerCase().replace(/[^a-z0-9]+/g, '_') === x.w) || {}).n || x.w : ''
    return {
      stats,
      hasStats: stats.length > 0,
      statNote: x.rk ? 'Rank ' + x.rk + (x.rk2 ? ' + ' + x.cat2 + ' ' + x.rk2 : '') : '',
      t: x.n,
      sub:
        [
          x.t === 'tome' ? 'Spell' : x.t === 'accessory' ? 'Accessory' : x.t === 'shield' ? 'Shield' : 'Weapon',
          x.cat !== (x.t === 'accessory' ? 'Accessory' : '') && x.cat !== 'tome' ? x.cat : '',
        ]
          .filter(Boolean)
          .join(' · ') + (x.rel ? ' · Relic' : ''),
      body: x.e || 'No effect recorded in the workbook yet.',
      bodyCol: x.e ? 'var(--tx, #eee)' : 'var(--mu, #aaa)',
      note: '',
      who: w,
      whoLbl: w ? 'Wielder' : '',
      whoGroups: [],
      hasGroups: false,
    }
  }
  hovC(n?: any) {
    return {
      enter: (ev?: any) => {
        const r = ev.currentTarget.getBoundingClientRect()
        const W = window.innerWidth,
          H = window.innerHeight
        const dl = ev.currentTarget.closest('[data-cdlg]')
        if (W >= 760 && dl) {
          const p = dl.getBoundingClientRect()
          const left = W - p.right >= 320 ? p.right + 12 : p.left >= 320 ? p.left - 312 : null
          if (left != null) {
            this.setState({
              tip: {
                ...this.classTip(n),
                x: left + 'px',
                y: Math.max(12, Math.min(r.top, H - 340)) + 'px',
                tf: 'none',
                raw: n,
              },
            })
            return
          }
        }
        const x = Math.max(12, Math.min(r.right + 8 > W - 312 ? r.left : r.right + 8, W - 312))
        const below = r.bottom + 300 < H
        this.setState({
          tip: {
            ...this.classTip(n),
            x: x + 'px',
            y: (below ? r.top : r.bottom) + 'px',
            tf: below ? 'none' : 'translateY(-100%)',
            raw: n,
          },
        })
      },
      leave: () => {
        this.setState({ tip: null })
      },
    }
  }
  classTip(n?: any) {
    const d = this.state.d,
      k = d.classes.find((y?: any) => y.n === n)
    if (!k)
      return {
        t: n,
        sub: 'Class',
        body: 'Not found.',
        bodyCol: 'var(--mu, #aaa)',
        stats: [],
        hasStats: false,
        statNote: '',
        note: '',
        who: '',
        whoLbl: '',
        whoGroups: [],
        hasGroups: false,
      }
    const SN = ['HP', 'Str', 'Mag', 'Spd', 'Dex', 'Def', 'Res', 'Lck', 'Cha']
    const stats = (k.g || []).map((v?: any, i?: any) => ({ l: SN[i], v: (v > 0 ? '+' : '') + v + '%' }))
    const st0 = this.state,
      P0 = st0.part,
      R0 = st0.route
    const ok0 = new Set<any>([
      ...(st0.cleared || []),
      ...(st0.cleared2 || []),
      ...(P0 >= 1 && P0 <= 2 && R0 !== 'All' ? [R0] : []),
    ])
    const lock = !!(k.un && k.un.length && P0 >= 1 && !k.un.some((u?: any) => ok0.has(u.r)))
    const gc = (v?: any) => (v > 0 ? 'var(--tx, #eee)' : v < 0 ? 'oklch(0.74 0.12 30)' : 'var(--mu, oklch(0.78 0.035 120))')
    const cell = (v?: any, i?: any) => ({ s: SN[i], v: (v > 0 ? '+' : '') + v, col: gc(v) })
    const gsum = (k.g || []).reduce((a?: any, b?: any) => a + b, 0)
    const raise = (() => {
      try {
        const cd = st0.cd
        if (!cd || !st0.calc || !st0.calc.c) return ''
        const B = this.buildCalc(d, st0.calc)
        if (!B || !B.ss) return ''
        const ss0 = B.ss
        const stg = B.stages,
          si = cd.w === 'st' ? cd.i : cd.w === 'cur' ? stg.length - 1 : -1
        if (si < 1 || !stg[si]) return ''
        const out: any = []
        SN.forEach((nm?: any, i?: any) => {
          let cur = ss0.s[i],
            cum = 0,
            ap = 0
          for (let sj = 0; sj < si; sj++) {
            const x = stg[sj]
            if (sj > 0) {
              const u = Math.floor(cum / 100)
              cur += u - ap + (x.k.mods[i] || 0) - (stg[sj - 1].k.mods[i] || 0)
              ap = u
              const mn = (x.k.mn && x.k.mn[i]) || 0,
                rw = cur - (x.k.mods[i] || 0)
              if (rw < mn) cur += mn - rw
            }
            const mg = x.mo ? x.mo.g[i] : 0
            for (let j = x.pre; j < x.n; j++) {
              const L = x.from + 1 + j
              cum += Math.max(0, B.c.g[i] + (L >= 6 ? x.k.g[i] : 0) + mg)
            }
          }
          const u = Math.floor(cum / 100)
          cur += u - ap + (k.mods[i] || 0) - (stg[si - 1].k.mods[i] || 0)
          const mn = (k.mn && k.mn[i]) || 0,
            rw = cur - (k.mods[i] || 0)
          out.push(rw < mn ? mn - rw : 0)
        })
        return out.some((v?: any) => v > 0) ? out : null
      } catch (e: any) {
        return null
      }
    })()
    return {
      stats: [],
      hasStats: false,
      hasGrids: true,
      grids: [
        { lbl: 'Growth modifier · Σ ' + gsum + '%', cells: (k.g || []).map(cell) },
        { lbl: 'Stat modifier', cells: (k.mods || []).map(cell) },
        ...((k.mn || []).some((v?: any) => v > 0)
          ? [
              {
                lbl: 'Minimum stats',
                cells: k.mn.map((v?: any, i?: any) => ({
                  s: SN[i],
                  v: v || '–',
                  col: v ? 'var(--tx, oklch(0.94 0.008 80))' : 'var(--mu, oklch(0.78 0.035 120))',
                })),
              },
            ]
          : []),
        ...(raise
          ? [
              {
                lbl: 'Raised by min stats',
                cells: raise.map((v?: any, i?: any) => ({
                  s: SN[i],
                  v: v ? '+' + v : '–',
                  col: v ? 'var(--ac, oklch(0.82 0.12 85))' : 'var(--mu, oklch(0.78 0.035 120))',
                })),
              },
            ]
          : []),
      ],
      statNote: '',
      t: k.n,
      hasIc: !!this.IMG,
      bgi: this.IMG ? 'url(' + this.IMG('classes', k.n) + ') center/cover no-repeat' : '',
      skIcons: (k.comp || '')
        .split(/,\s*/)
        .filter((n?: any) => n && !(d.skillMove || []).includes(n))
        .map((n?: any) => ({ n, bgi: this.SK(n), ...this.hov(n, (x?: any) => this.skillTip(x)) }))
        .filter((x?: any) => x.bgi),
      hasSk: !!(k.comp || '').split(/,\s*/).filter((n?: any) => n && !(d.skillMove || []).includes(n) && this.SK(n)).length,
      sub: [k.tier, k.type].filter(Boolean).join(' · ') + (k.lv ? ' · Lv ' + k.lv : ''),
      body: lock ? 'Locked · needs to complete ' + [...new Set<any>(k.un.map((u?: any) => u.r))].join(' / ') + ' path' : '',
      bodyCol: lock ? 'oklch(0.74 0.12 30)' : 'var(--mu, #aaa)',
      note: k.mov ? 'Mov ' + k.mov : '',
      who: (k.ab || []).length ? ' ' : '',
      whoLbl: 'Class abilities',
      abs: (k.ab || []).map((a?: any) => ({
        n: a.n,
        e: a.e,
        tag: a.t === 'Master ability' ? 'Master' : 'Class',
        bgi: this.AB ? this.AB(a.n) : '',
        dashed: a.t === 'Master ability' ? 'dashed' : 'solid',
      })),
      whoGroups: (k.ab || []).map((a?: any) => ({
        rank: a.t === 'Master ability' ? 'Master' : 'Class',
        names: a.n + ': ' + a.e,
        bgi: this.AB ? this.AB(a.n) : '',
      })),
      hasGroups: (k.ab || []).length > 0,
    }
  }
  hd(ids?: any, id?: any, onMove?: any) {
    const me = this,
      ok = ids.includes(id),
      ci = ids.indexOf(this.hDrag),
      oi = ids.indexOf(this.hOver),
      on = ok && this.hDrag != null && this.hOver === id && ci >= 0 && oi !== ci
    return {
      drg: ok ? 'true' : 'false',
      cur: ok ? 'grab' : 'default',
      dim: this.hDrag === id ? 0.4 : 1,
      sh: on ? (ci > oi ? '-5px 0 0 0 ' : '5px 0 0 0 ') + 'var(--ac, oklch(0.82 0.12 85))' : 'none',
      dStart: (e?: any) => {
        if (!ok) return
        e.stopPropagation()
        me.hDrag = id
        if (me.state.tip) me.setState({ tip: null })
        e.dataTransfer.effectAllowed = 'move'
        try {
          e.dataTransfer.setData('text/plain', String(id))
        } catch (x: any) {}
      },
      dOver: (e?: any) => {
        if (ok && me.hDrag != null && ids.includes(me.hDrag)) {
          e.preventDefault()
          e.stopPropagation()
          if (me.hOver !== id) {
            me.hOver = id
            me.forceUpdate()
          }
        }
      },
      dDrop: (e?: any) => {
        if (me.hDrag == null) return
        e.preventDefault()
        e.stopPropagation()
        const from = me.hDrag
        me.hDrag = null
        me.hOver = null
        if (!ok || from == null || from === id || !ids.includes(from)) {
          me.forceUpdate()
          return
        }
        const ord = ids.filter((x?: any) => x !== from)
        ord.splice(ids.indexOf(id), 0, from)
        if (onMove) {
          onMove(ord)
          return
        }
        const bs = me.state.builds || []
        const by = Object.fromEntries(bs.map((x?: any) => [x.id, x]))
        const ordR = ord.filter((q?: any) => by[q])
        const slots = bs.map((x?: any, j?: any) => (ordR.includes(x.id) ? j : -1)).filter((j?: any) => j >= 0)
        const nb = bs.slice()
        ordR.forEach((q?: any, k?: any) => {
          nb[slots[k]] = by[q]
        })
        me.save({ builds: nb })
      },
      dEnd: (e?: any) => {
        if (e && e.stopPropagation) e.stopPropagation()
        me.hDrag = null
        me.hOver = null
        me.forceUpdate()
      },
    }
  }
  save(p?: any) {
    this.setState(p, () => {
      const {
        drafts: _dr,
        bsel,
        cview,
        cchars,
        bhide,
        screen,
        part,
        route,
        sel,
        calc,
        builds,
        cmp,
        gtab,
        ptab,
        cleared,
        cleared2,
        recruited,
        pOrd,
        pW,
        pCols,
        cdOrd,
        sbCollapsed,
        starred,
        cOrd,
        bases,
        cTord,
        tWide,
        bWide,
        rWide,
        cW,
        bVert,
        pcTord,
        pcbWideS,
        pctWideS,
        pcbVert,
        bOnly,
        lastB,
        theme,
        hand,
        bdec,
        rview,
      } = this.state
      try {
        localStorage.setItem(
          'weave-codex',
          JSON.stringify({
            drafts: this.state.drafts,
            bsel,
            cview,
            cchars,
            bhide,
            screen,
            part,
            route,
            sel,
            calc,
            builds,
            cmp,
            gtab,
            ptab,
            cleared,
            cleared2,
            recruited,
            pOrd,
            pW,
            pCols,
            cdOrd,
            sbCollapsed,
            starred,
            cOrd,
            bases,
            cTord,
            tWide,
            bWide,
            rWide,
            cW,
            bVert,
            pcTord,
            pcbWideS,
            pctWideS,
            pcbVert,
            bOnly,
            lastB,
            theme,
            hand,
            bdec,
            rview,
          }),
        )
      } catch (e: any) {}
    })
  }
  codeMake(d?: any) {
    const r = this.parseTxt(d, this.state.codeV || '', this.state.builds || [])
    if (r.add.length) {
      this.save({ builds: [...(this.state.builds || []), ...r.add] })
      this.setState({ codeV: '', codeM: 'Created ' + r.add.length + ' build' + (r.add.length > 1 ? 's' : '') + '.' })
    } else
      this.setState({
        codeM: r.dup
          ? 'You already have that build.'
          : r.bad.length
            ? "Couldn't read that code."
            : 'Paste a code first.',
      })
  }
  copyText(v?: any) {
    const fb = () => {
      try {
        const a = document.createElement('textarea')
        a.value = v
        a.setAttribute('readonly', '')
        a.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
        document.body.appendChild(a)
        a.focus()
        a.select()
        const ok = document.execCommand('copy')
        a.remove()
        return ok
      } catch (e: any) {
        return false
      }
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(v).then(
          () => true,
          () => fb(),
        )
    } catch (e: any) {}
    return Promise.resolve(fb())
  }
  nk(d?: any, b?: any) {
    const B = this.buildCalc(d, b)
    return B
      ? JSON.stringify([
          b.c,
          B.m ? B.m.n : 'None',
          B.stages.map((x?: any) => [x.k.n, x.lv]),
          B.rl,
          B.canRec ? B.kr.n : '',
          b.ab || [],
          b.ca || [],
          b.ms || '',
        ])
      : JSON.stringify(b)
  }
  fmtAll(d?: any, bs?: any) {
    const slug = SLUG
    return bs
      .map((b?: any) => {
        const B = this.buildCalc(d, b)
        if (!B) return null
        return (
          slug(b.c) +
          (B.canRec ? ' (R' + B.rl + ' ' + (B.kr.code || B.kr.n) + ')' : '') +
          (B.m ? ' @' + slug(B.m.n) : '') +
          ': ' +
          B.stages.map((s?: any) => (s.k.code || s.k.n) + s.lv).join(' ') +
          ((b.ab || []).length ? ' | ab: ' + b.ab.map((n?: any) => ((d.ac || {}).ab || {})[n] || n).join('; ') : '') +
          ((b.ca || []).length ? ' | ca: ' + b.ca.map((n?: any) => ((d.ac || {}).ca || {})[n] || n).join('; ') : '') +
          ((b.it || []).length
            ? ' | it: ' +
              b.it
                .map((n?: any) => {
                  const x = (d.items || []).find((y?: any) => y.n === n)
                  return (x && x.code) || n
                })
                .join('; ')
            : '') +
          (b.ms && B.m && (B.m.pa || []).some((a?: any) => a.n === b.ms)
            ? ' | ms: ' + (((d.ac || {}).ms || {})[b.ms] || b.ms)
            : '') +
          (B.stages.length > 1 && B.stages.slice(0, -1).some((s?: any) => s.mo)
            ? ' | sm: ' +
              B.stages
                .slice(0, -1)
                .map((s?: any) => (s.mo ? slug(s.mo.n) : '-'))
                .join('; ')
            : '') +
          (b.name ? ' | nm: ' + String(b.name).replace(/[|\r\n]+/g, ' ') : '') +
          (b.star ? ' | star' : '')
        )
      })
      .filter(Boolean)
      .join('\n')
  }
  parseTxt(d?: any, txt?: any, cur?: any) {
    const slug = SLUG
    const sk2 = (x?: any) => this.nk(d, x)
    const seen = new Set<any>(cur.map(sk2))
    let id = Date.now(),
      dup = 0
    const bad: any = [],
      add: any = []
    const L = (s?: any) => s.trim().toLowerCase()
    txt
      .split(/\r?\n/)
      .map((s?: any) => s.trim())
      .filter(Boolean)
      .forEach((line?: any) => {
        const m = line.match(/^(.+?)(?:\s*\(R(\d+)\s+([^)]+)\))?(?:\s*@([^:]+?))?\s*:\s*(.+)$/i)
        if (!m) {
          bad.push(line.slice(0, 24))
          return
        }
        const ch = d.chars.find((x?: any) => slug(x.n) === slug(m[1]) && x.g)
        if (!ch) {
          bad.push(m[1].trim())
          return
        }
        const stages: any = []
        let ok = true
        const segs = m[5].split('|')
        for (const t of segs[0].matchAll(/([A-Za-z][^\d,]*?)\s*(\d+)/g)) {
          const nm = L(t[1]),
            k = d.classes.find((x?: any) => L(x.code || '') === nm) || d.classes.find((x?: any) => L(x.n) === nm)
          if (!k) {
            ok = false
            break
          }
          stages.push({ k: k.n, lv: Math.min(99, +t[2]) })
        }
        if (!ok || !stages.length) {
          bad.push(ch.n)
          return
        }
        const rl = m[2] ? Math.max(1, +m[2]) : 1
        const rkc =
          m[3] && (d.classes.find((x?: any) => L(x.code || '') === L(m[3])) || d.classes.find((x?: any) => L(x.n) === L(m[3])))
        const mt = m[4] && d.mounts.find((x?: any) => slug(x.n) === slug(m[4]))
        const last = stages[stages.length - 1]
        const b: Record<string, any> = { id: id++, c: ch.n, k: last.k, m: mt ? mt.n : 'None', lv: last.lv, stages }
        const nmAll = new Map<any, any>()
        d.arts.forEach((a?: any) => nmAll.set(L(a.n), a.n))
        d.classes.forEach((k?: any) => (k.ab || []).forEach((a?: any) => nmAll.set(L(a.n), a.n)))
        Object.keys(d.univE || {}).forEach((n?: any) => nmAll.set(L(n), n))
        ;['ab', 'ca'].forEach((k?: any) => Object.entries((d.ac || {})[k] || {}).forEach(([n, cd]: any) => nmAll.set(L(cd), n)))
        segs.slice(1).forEach((sg?: any) => {
          if (/^\s*star\s*$/i.test(sg)) {
            b.star = true
            return
          }
          const q = sg.match(/^\s*(ab|ca|it|ms|nm|sm)\s*:\s*(.*)$/i)
          if (!q) return
          const qk = q[1].toLowerCase()
          if (qk === 'sm') {
            q[2].split(';').forEach((v?: any, i?: any) => {
              const mo = d.mounts.find((x?: any) => slug(x.n) === slug(v.trim()))
              if (mo && i < stages.length - 1) stages[i].m = mo.n
            })
            return
          }
          if (qk === 'nm') {
            const v = q[2].trim()
            if (v) b.name = v
            return
          }
          if (qk === 'ms') {
            const v = q[2].trim()
            const e = Object.entries((d.ac || {}).ms || {}).find(([n, c]: any) => L(c) === L(v) || L(n) === L(v))
            if (e && mt && (mt.pa || []).some((a?: any) => a.n === e[0])) b.ms = e[0]
            return
          }
          if (q[1].toLowerCase() === 'it') {
            const im = new Map<any, any>()
            ;(d.items || []).forEach((x?: any) => {
              im.set(L(x.n), x.n)
              if (x.code) im.set(L(x.code), x.n)
            })
            const ar = q[2]
              .split(';')
              .map((s?: any) => im.get(L(s)))
              .filter(Boolean)
              .filter((n?: any, i?: any, a?: any) => a.indexOf(n) === i)
              .slice(0, d.islot || 5)
            if (ar.length) b.it = ar
            return
          }
          const key = q[1].toLowerCase()
          const lim = key === 'ab' ? 5 : 12
          const arr = q[2]
            .split(';')
            .map((s?: any) => nmAll.get(L(s)))
            .filter(Boolean)
            .filter((n?: any, i?: any, a?: any) => a.indexOf(n) === i)
            .slice(0, lim)
          if (arr.length) b[key] = arr
        })
        if (m[2]) {
          b.rl = rl
          b.rk = rkc ? rkc.n : stages[0].k
        }
        if (seen.has(sk2(b))) {
          dup++
          return
        }
        seen.add(sk2(b))
        add.push(b)
      })
    return { add, dup, bad }
  }
  abBonus(d?: any, calc?: any, B?: any, lv?: any, cName?: any) {
    const AB9 = Array(9).fill(0),
      ABS: any = []
    let AMOV = 0
    {
      const seen = new Set<any>(),
        SN = ['HP', 'Str', 'Mag', 'Spd', 'Dex', 'Def', 'Res', 'Lck', 'Cha']
      const add = (n?: any, m?: any, mv?: any) => {
        if (!m || seen.has(n)) return
        const p = m.s.map((v?: any, i?: any) => (v ? SN[i] + ' ' + (v > 0 ? '+' : '') + v : '')).filter(Boolean)
        if (!p.length && !(mv && m.mov)) return
        seen.add(n)
        m.s.forEach((v?: any, i?: any) => {
          AB9[i] += v
        })
        if (mv) AMOV += m.mov || 0
        if (p.length) ABS.push(n + ' (' + p.join(', ') + ')')
      }
      const chr0 = d.chars.find((x?: any) => x.n === cName),
        kc = B && B.stages && B.stages.length ? B.stages[B.stages.length - 1].k : null
      if (chr0 && chr0.pm) {
        const pa = (chr0.pa || '').split(': ')[0]
        add(pa || 'Personal ability', chr0.pm, true)
      }
      ;((chr0 && chr0.lab) || []).forEach((a?: any) => {
        if (a.m && (a.lv == null || lv >= a.lv)) add(a.n, a.m)
      })
      ;(calc.ab || []).forEach((n?: any) => {
        const ca = (kc ? kc.ab || [] : []).find((a?: any) => a.n === n)
        add(n, (d.amod || {})[n] || (ca && ca.m), true)
      })
      {
        const WM: Record<string, any> = { Brawl: 'Brawling', Lance: 'Spear' }
        const canUse = (x?: any, k?: any) =>
          x.cat === 'Accessory' || !!(k && (k.w || '').split(/,\s*/).includes(WM[x.cat] || x.cat))
        let wd = false
        ;(calc.it || []).forEach((n?: any) => {
          const x = (d.items || []).find((y?: any) => y.n === n)
          if (!x) return
          if (x.cat !== 'Accessory') {
            if (wd || !canUse(x, kc)) return
            wd = true
          }
          if (x.m) add(n, x.m, true)
        })
      }
      if (calc.ms && B && B.m && (B.m.pa || []).some((a?: any) => a.n === calc.ms)) {
        const pp = (d.paired || []).find((y?: any) => y.n === calc.ms)
        if (pp && pp.m2) add(calc.ms, pp.m2, true)
      }
    }
    const LM: Record<string, any> = { mov: 0 }
    {
      const T: Record<string, any> = { 'Armored Move': 1, 'Armored Move+': 2 }
      let bv = 0
      ;(calc.ab || []).forEach((n?: any) => {
        if (T[n] > bv) bv = T[n]
      })
      LM.mov = bv
    }
    const km = B && B.k && B.k.mov
    return { AB9, ABS, AMOV, mov: km && !isNaN(+km) ? +km + LM.mov + AMOV : km || null, movB: LM.mov + AMOV }
  }
  startStats(c?: any, d?: any, P?: any, kP?: any, k0?: any) {
    const es = c.es
    if (!es) return null
    const mod = kP.mods
    const row = es[P]
    if (row) {
      const bs = row[1]
      return {
        s: row[0].map((v?: any, i?: any) => v + (mod[i] || 0)),
        note:
          bs === 'observed'
            ? 'observed reading'
            : bs === 'observed_partial'
              ? 'observed reading (some stats estimated)'
              : bs === 'estimated_no_class'
                ? 'estimated, class growth unknown (less reliable)'
                : 'estimated',
        auto: bs === 'observed' || bs === 'observed_partial' ? 0 : 1,
      }
    }
    const l1 = es[1]
    if (!l1) return null
    let q = 0
    for (let L = 6; L <= P; L++) q++
    return {
      s: l1[0].map((v?: any, i?: any) => v + (mod[i] || 0) + Math.floor((0.82 * (c.g[i] * (P - 1) + kP.g[i] * q)) / 100)),
      note: 'estimated from Lv 1 (beyond Lv 23, less reliable)',
      auto: 1,
    }
  }
  buildCalc(d?: any, b?: any) {
    const c = d.chars.find((x?: any) => x.n === b.c && x.g)
    if (!c) return null
    const k0 = d.classes.find((x?: any) => x.n === c.cls) || d.classes.find((x?: any) => x.n === 'Commoner') || d.classes[0]
    const canRec = c.type !== 'Main' && c.type !== 'Flame Lord'
    const rl = canRec ? Math.max(1, b.rl || 1) : 1
    const kr = (canRec && b.rk && d.classes.find((x?: any) => x.n === b.rk)) || k0
    const raw = b.stages && b.stages.length ? b.stages : [{ k: k0.n, lv: b.lv || 1 }]
    let prev = 1
    const stages = raw.map((x?: any, i?: any) => {
      const k = i === 0 ? kr : d.classes.find((y?: any) => y.n === x.k) || k0
      const lv = Math.max(prev, i === 0 ? rl : 0, Math.min(99, x.lv || prev))
      const from = prev
      prev = lv
      return { k, from, lv, n: lv - from, pre: Math.max(0, Math.min(lv, rl) - from) }
    })
    const k = stages[stages.length - 1].k,
      lvl = prev
    const sp = mountSp(k)
    stages.forEach((x?: any, i?: any) => {
      const nm = i === stages.length - 1 ? b.m : (raw[i].m ?? b.m)
      x.mo = d.mounts.find((y?: any) => y.n === nm && mountSp(x.k).includes(y.sp)) || null
    })
    const m = stages[stages.length - 1].mo
    const MA = mountAt(m),
      mult = 1,
      SS = this.startStats(c, d, rl, stages[0].k, k0)
    const rows = S.map((s?: any, i?: any) => {
      const a = c.g[i],
        bb = k.g[i],
        mm = MA.g[i],
        t = a + bb + mm
      let acc = 0
      stages.forEach((x?: any) => {
        const mg = x.mo ? x.mo.g[i] : 0
        for (let j = x.pre; j < x.n; j++) {
          const L = x.from + 1 + j
          acc += Math.max(0, a + (L >= 6 ? x.k.g[i] : 0) + mg)
        }
      })
      const up = Math.floor(acc / 100)
      let gu = 0,
        dist = [1]
      stages.forEach((x?: any) => {
        const mg = x.mo ? x.mo.g[i] : 0
        for (let j = x.pre; j < x.n; j++) {
          const L = x.from + 1 + j,
            p = Math.max(0, a + (L >= 6 ? x.k.g[i] : 0) + mg),
            g = Math.floor(p / 100),
            f = (p % 100) / 100
          gu += g
          if (f > 0) {
            const nd = new Array(dist.length + 1).fill(0)
            dist.forEach((v?: any, q?: any) => {
              nd[q] += v * (1 - f)
              nd[q + 1] += v * f
            })
            dist = nd
          }
        }
      })
      const qt = (P?: any) => {
        let c = 0
        for (let q = 0; q < dist.length; q++) {
          c += dist[q]
          if (c >= P - 1e-9) return gu + q
        }
        return gu + dist.length - 1
      }
      let lo = qt(0.1),
        hi = qt(0.9)
      let ex = 0
      if (SS) {
        let cur = SS.s[i],
          cum = 0,
          ap = 0
        stages.forEach((x?: any, si?: any) => {
          if (si > 0) {
            const u = Math.floor(cum / 100)
            cur += u - ap + (x.k.mods[i] || 0) - (stages[si - 1].k.mods[i] || 0)
            ap = u
            const mn = (x.k.mn && x.k.mn[i]) || 0
            const rw = cur - (x.k.mods[i] || 0)
            if (rw < mn) {
              ex += mn - rw
              cur += mn - rw
            }
          }
          const mg = x.mo ? x.mo.g[i] : 0
          for (let j = x.pre; j < x.n; j++) {
            const L = x.from + 1 + j
            cum += Math.max(0, a + (L >= 6 ? x.k.g[i] : 0) + mg)
          }
        })
      }
      const bv = SS ? SS.s[i] + (k.mods[i] || 0) - (stages[0].k.mods[i] || 0) + MA.st[i] + ex : null
      if (SS) {
        let D = new Map<number, number>([[SS.s[i], 1]])
        stages.forEach((x?: any, si?: any) => {
          if (si > 0) {
            const fl = ((x.k.mn && x.k.mn[i]) || 0) + (stages[0].k.mods[i] || 0)
            const N = new Map<number, number>()
            D.forEach((p?: any, v?: any) => {
              const w = Math.max(v, fl)
              N.set(w, (N.get(w) || 0) + p)
            })
            D = N
          }
          const mg = x.mo ? x.mo.g[i] : 0
          for (let j = x.pre; j < x.n; j++) {
            const L = x.from + 1 + j,
              p = Math.max(0, a + (L >= 6 ? x.k.g[i] : 0) + mg),
              g = Math.floor(p / 100),
              f = (p % 100) / 100
            const N = new Map<number, number>()
            D.forEach((q?: any, v?: any) => {
              N.set(v + g, (N.get(v + g) || 0) + q * (1 - f))
              if (f > 0) N.set(v + g + 1, (N.get(v + g + 1) || 0) + q * f)
            })
            D = N
          }
        })
        const E = [...D].sort((x, y) => x[0] - y[0])
        const qv = (P?: any) => {
          let c = 0
          for (const [v, p] of E) {
            c += p
            if (c >= P - 1e-9) return v
          }
          return E[E.length - 1][0]
        }
        const off = (k.mods[i] || 0) - (stages[0].k.mods[i] || 0) + MA.st[i]
        lo = Math.min(qv(0.1) + off - (bv as number), up)
        hi = Math.max(qv(0.9) + off - (bv as number), up)
      }
      return {
        s,
        ex,
        a,
        b: bb,
        m: mm,
        cf: k.mods[i] || 0,
        mst: MA.st[i],
        t,
        bv,
        up,
        acc,
        lo,
        hi,
        fin: bv == null ? null : bv + up,
      }
    })
    return {
      c,
      k,
      k0,
      kr,
      m,
      sp,
      stages,
      ss: SS,
      canRec,
      rl,
      lv: lvl,
      mult,
      rows,
      ta: sum(c.g),
      tb: sum(k.g),
      tm: sum(rows.map((r?: any) => r.m)),
      tt: sum(rows.map((r?: any) => r.t)),
    }
  }
  imgErr = (e?: any) => {
    const im = e.target,
      s = im.getAttribute('src') || '',
      m = s.match(/^(.*)\.(png|webp)$/)
    let i = +(im.dataset.q || 0)
    im.dataset.q = i + 1
    if (m && i < 3) {
      const b = m[1],
        b2 = b.replace(/_s(_|$)/, 's$1')
      im.src = ([b + '.' + (m[2] === 'png' ? 'webp' : 'png'), b2 + '.png', b2 + '.webp'] as any)[i]
    } else {
      im.style.display = 'none'
      if (im.dataset.h && im.parentNode) im.parentNode.style.display = 'none'
    }
  }

  renderVals() {
    this.sk = null
    const SK = (n?: any) => {
      const f = ({
        Sword: 'sword',
        Lance: 'spear',
        Spear: 'spear',
        Axe: 'axe',
        Bow: 'bow',
        Brawl: 'gauntlets',
        Brawling: 'gauntlets',
        Reason: 'black_magic',
        'Black Magic': 'black_magic',
        Faith: 'white_magic',
        'White Magic': 'white_magic',
        Authority: 'authority',
        Infantry: 'infantry',
        Cavalry: 'riding',
        Riding: 'riding',
        Armor: 'heavy_armor',
        'Heavy Armor': 'heavy_armor',
        Flying: 'flying',
      } as any)[n]
      return f ? 'url(' + IMG('skills', f) + ') center/cover no-repeat' : ''
    }
    const SKo = (n?: any, col?: any) => {
      const b = SK(n)
      return { n, col, bgi: b, ic: !!b, noIc: !b, ...this.hov(n, (x?: any) => this.skillTip(x)) }
    }
    const AB = (n?: any) => 'url(' + IMG('abilities', n) + ') center/cover no-repeat'
    const IMG = (k?: any, n?: any) => {
      if (!n) return ''
      let f: any
      if (k === 'arts') {
        const c = String(n).toLowerCase()
        f = /sword/.test(c)
          ? 'sword'
          : /lance|spear/.test(c)
            ? 'spear'
            : /axe/.test(c)
              ? 'axe'
              : /bow/.test(c)
                ? 'bow'
                : /brawl|fist|gaunt/.test(c)
                  ? 'gauntlet'
                  : 'utility'
      } else
        f = String(n)
          .toLowerCase()
          .replace(/\([^)]*\)/g, '')
          .replace(/\s*\+(\d+)/, '_plus$1')
          .replace(/\+/g, '_plus')
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '')
      return 'img/' + (k === 'arts' ? 'combatarts' : k) + '/' + f + '.png'
    }
    this.IMG = IMG
    this.AB = AB
    this.SK = SK
    const st = this.state,
      d = st.d,
      pr = this.props
    const thn = THEMES[st.theme] ? st.theme : THEMES[pr.theme] ? pr.theme : 'Emerald'
    const t = THEMES[thn]
    const phone = (pr.device ?? 'Responsive') === 'Phone'
    const narrow = phone || st.narrow
    const lh = narrow && st.hand === 'left'
    const navTop = st.navTop != null ? !!st.navTop : (pr.navStyle ?? 'Sidebar') === 'Top tabs'
    const hideLocked = (pr.lockStyle ?? 'Blur teaser') === 'Hide'
    const view = pr.calcView ?? 'Stacked bars'
    const MS: string = 'Badge'
    const mfx = (n?: any, avg?: any) => {
      const o: Record<string, any> = {
        enter: () => {},
        leave: () => {},
        mnt: '',
        hasMnt: false,
        badge: '',
        hasBadge: false,
        bg: 'transparent',
        bar: 'transparent',
      }
      if (!n) return o
      if (MS === 'Note line') {
        o.mnt = 'incl. +' + n + ' mount'
        o.hasMnt = true
      } else if (MS === 'Badge') {
        o.badge = '+' + n
        o.hasBadge = true
        const enter = (ev?: any) => {
          const r = ev.currentTarget.getBoundingClientRect()
          const W = window.innerWidth
          const x = Math.max(12, Math.min(r.left, W - 312))
          const below = r.bottom + 160 < window.innerHeight
          this.setState({
            tip: {
              t: '+' + n + ' from mount',
              sub: 'Mount bonus',
              body: 'Shown stats already include this value',
              bodyCol: 'var(--tx, #eee)',
              note: '',
              who: '',
              whoLbl: '',
              whoGroups: [],
              hasGroups: false,
              x: x + 'px',
              y: (below ? r.bottom + 8 : r.top - 8) + 'px',
              tf: below ? 'none' : 'translateY(-100%)',
              raw: null,
            },
          })
        }
        o.enter = enter
        o.leave = () => {
          if (window.matchMedia && window.matchMedia('(hover:hover)').matches) this.setState({ tip: null })
        }
      } else if (MS === 'Split') {
        o.mnt = avg - n + ' base + ' + n + ' mount'
        o.hasMnt = true
      } else {
        o.bg = 'oklch(0.74 0.1 300 / .14)'
        o.bar = 'oklch(0.74 0.1 300)'
      }
      return o
    }
    const tipH = (t?: any, sub?: any) => ({
      enter: (ev?: any) => {
        const r = ev.currentTarget.getBoundingClientRect()
        const x = Math.max(12, Math.min(r.left, window.innerWidth - 312))
        const below = r.bottom + 160 < window.innerHeight
        this.setState({
          tip: {
            t,
            sub,
            body: '',
            bodyCol: 'var(--tx, #eee)',
            note: '',
            who: '',
            whoLbl: '',
            whoGroups: [],
            hasGroups: false,
            x: x + 'px',
            y: (below ? r.bottom + 8 : r.top - 8) + 'px',
            tf: below ? 'none' : 'translateY(-100%)',
            raw: null,
          },
        })
      },
      leave: () => {
        if (window.matchMedia && window.matchMedia('(hover:hover)').matches) this.setState({ tip: null })
      },
    })
    const scr = st.screen === 'profile' ? 'roster' : st.screen
    if (st.screen === 'overview') setTimeout(() => this.setState({ screen: 'roster' }), 0)
    const NAV: any = [
      ['roster', 'Characters', 'Chars'],
      ['calc', 'Unit builder', 'Builder'],
      ['compare', 'Compare', 'Compare'],
      ['charts', 'Charts', 'Charts'],
      ['match', 'Meal pairing', 'Meal'],
      ['classes', 'Classes', 'Classes'],
      ['abilities', 'Abilities', 'Abilities'],
      ['arts', 'Combat Arts', 'Arts'],
      ['items', 'Items', 'Items'],
      ['settings', 'Settings', 'Settings'],
    ]
    const sbC = !!st.sbCollapsed
    const IC: Record<string, any> = {
      roster:
        'M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.2a3.5 3.5 0 0 1 0 6.6',
      calc: 'M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM8 7h8M8 12h2M14 12h2M8 16h2M14 16h2',
      compare: 'M4 7h12M12 3l4 4-4 4M20 17H8M12 13l-4 4 4 4',
      charts: 'M4 20V10M10 20V4M16 20v-7M3 20h18',
      match: 'M7 3v7M5 3v5a2 2 0 0 0 4 0V3M7 10v11M17 21V3c-2.5 1.5-3 5-3 8h3',
      abilities: 'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z',
      arts: 'M14 4l6 6-9 9H5v-6zM12 6l6 6M4 20l3-3',
      items: 'M6 8h12l-1 12H7zM9 8V6a3 3 0 0 1 6 0v2',
      classes: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z',
      settings: 'M4 7h10M18 7h2M4 17h2M10 17h10M16 5v4M8 15v4',
    }
    const nav = NAV.map(([id, l, sh]: any) => ({
      tipOn: (e?: any) => {
        if (!sbC) return
        const r = e.currentTarget.getBoundingClientRect()
        this.setState({ nt: { l, x: r.right + 10, y: r.top + r.height / 2 } })
      },
      icon: IC[id],
      label: l,
      short: sh,
      sbLabel: sbC
        ? ({
            roster: 'Chr',
            calc: 'Build',
            compare: 'Cmp',
            charts: 'Chrt',
            match: 'Meal',
            classes: 'Cls',
            abilities: 'Abl',
            arts: 'Art',
            items: 'Itm',
            settings: 'Set',
          } as any)[id]
        : l,
      bg: scr === id ? t.panel2 : 'transparent',
      fg: scr === id ? t.tx : t.mu,
      bar: scr === id ? t.ac : 'transparent',
      go: () => {
        this.rootNav = true
        const cur = this.state.screen === 'profile' ? 'profile' : this.state.screen
        if (cur === id) {
          const e: Record<string, any> = { screen: id, sel: this.state.sel, l: this.lbl({ screen: id }) }
          history.pushState({ ...e, trail: [e] }, '')
          this.rootNav = false
          this.setState({ trail: [e], kopen: false })
        } else this.save(id === 'classes' ? { screen: id, kopen: false } : { screen: id })
        const r = this.rootRef.current
        if (r && phone) r.scrollTop = 0
        else window.scrollTo(0, 0)
      },
    }))
    const P = st.part,
      R = st.route
    const steps = [0, 1, 2, 3].map((n?: any) => ({
      roman: RO[n],
      label: PN[n],
      hasLine: n > 0,
      line: n <= P ? PC[n] : t.line,
      ring: n <= P ? PC[n] : t.line,
      bs: n <= P ? 'solid' : 'dashed',
      chip: n === P ? t.panel2 : 'transparent',
      fill: n <= P ? PC[n] : 'transparent',
      txt: n <= P ? 'oklch(0.18 0.01 60)' : t.mu,
      lbl: n <= P ? t.tx : t.mu,
      state: n < P ? 'Cleared' : n === P ? (narrow ? 'Now' : 'In progress') : 'Sealed',
      click: () => {
        const CL0 = st.cleared || []
        const add = n >= 3 && P <= 2 && R !== 'All' && !CL0.includes(R)
        this.save({ part: n, ...(add ? { cleared: [...CL0, R] } : {}) })
      },
    }))
    const tn = (n?: any, label?: any, roman?: any, active?: any, reached?: any, click?: any) => ({
      label,
      roman,
      click,
      ring: reached ? PC[n] : t.line,
      bs: reached ? 'solid' : 'dashed',
      chip: active ? t.panel2 : 'transparent',
      fill: reached ? PC[n] : 'transparent',
      txt: reached ? 'oklch(0.18 0.01 60)' : t.mu,
      lbl: reached ? t.tx : t.mu,
      state: active ? 'In progress' : reached ? 'Cleared' : 'Sealed',
    })
    const tPro = tn(0, 'Prologue', 'P', P === 0, true, () => this.save({ part: 0 }))
    const nB = (st.builds || []).length,
      nS = (st.starred || []).length + (st.builds || []).filter((b?: any) => b.star).length,
      nR = (st.recruited || []).length
    const ZP0: Record<string, any> = { recruited: [] },
      ZP1: Record<string, any> = { starred: [], builds: (st.builds || []).map((b?: any) => (b.star ? { ...b, star: false } : b)) },
      ZP2: Record<string, any> = { builds: [], cmp: [], bhide: [], bsel: null },
      ZP3: Record<string, any> = { part: 0, route: 'All', cleared: [], cleared2: [] },
      ZP4: Record<string, any> = {
        drafts: {},
        calc: { c: 'Dietrich', k: 'Swordmaster', m: 'None', lv: 20 },
        bname: null,
        bnameC: null,
        sbCollapsed: false,
        rf: 'all',
      }
    const CLR = [
      { k: 'rec', label: 'Recruits', body: 'Unmarks all ' + nR + ' recruited characters.', p: ZP0 },
      {
        k: 'fav',
        label: 'Favorites',
        body: 'Removes stars from characters and builds (' + nS + ' starred). Builds themselves are kept.',
        p: ZP1,
      },
      {
        k: 'bld',
        label: 'Builds',
        body: 'Permanently deletes all ' + nB + ' saved builds and clears the comparison selection.',
        p: ZP2,
      },
      {
        k: 'prog',
        label: 'Story progress',
        body: 'Resets your part and route and unmarks all cleared routes.',
        p: ZP3,
      },
      {
        k: 'all',
        label: 'Everything',
        body:
          'Permanently deletes recruits, favorites, ' +
          nB +
          ' builds, story progress, unit builder drafts and layout preferences. This cannot be undone.',
        p: { ...ZP0, ...ZP1, ...ZP2, ...ZP3, ...ZP4 },
      },
    ]
    const clrX = CLR.find((y?: any) => y.k === st.clr)
    const CL = st.cleared || []
    const cmode = pr.clearStyle ?? 'Checkbox'
    const CL2 = st.cleared2 || []
    const togCl = (r?: any) => {
      if (R === r && P === 2) return
      const on = CL.includes(r)
      this.save(
        on ? { cleared: CL.filter((x?: any) => x !== r), cleared2: CL2.filter((x?: any) => x !== r) } : { cleared: [...CL, r] },
      )
    }
    const togCl2 = (r?: any) => {
      const on = CL2.includes(r)
      this.save(
        on
          ? { cleared2: CL2.filter((x?: any) => x !== r) }
          : { cleared2: [...CL2, r], cleared: CL.includes(r) ? CL : [...CL, r] },
      )
    }
    const tRoutes = ['Cai', 'Dietrich', 'Theodora', 'Leda'].map((r?: any) => {
      const cur = R === r && (P === 1 || P === 2),
        done = CL.includes(r) || (R === r && P === 2),
        lit = cur || done
      const done2 = CL2.includes(r),
        c2 = R === r && P === 2,
        lit2 = c2 || done2
      const p2: Record<string, any> = {
        toggle: () => togCl2(r),
        chkTip: done2 ? 'Unmark cleared' : 'Mark cleared',
        chkBg: done2 ? PC[2] : 'transparent',
        chkFg: done2 ? 'oklch(0.18 0.01 60)' : t.mu,
        chkBd: done2 ? PC[2] : t.line,
        label: 'Part II · ' + r,
        roman: done2 ? '✓' : 'II',
        click: () => this.save({ part: 2, route: r, ...(CL.includes(r) ? {} : { cleared: [...CL, r] }) }),
        ring: lit2 ? PC[2] : t.line,
        bs: lit2 ? 'solid' : 'dashed',
        chip: c2 ? t.panel2 : 'transparent',
        fill: lit2 ? PC[2] : 'transparent',
        txt: lit2 ? 'oklch(0.18 0.01 60)' : t.mu,
        lbl: lit2 ? t.tx : t.mu,
        state: done2
          ? c2
            ? 'Cleared · current'
            : 'Cleared'
          : c2
            ? 'In progress'
            : P >= 3
              ? 'Not cleared'
              : 'Not taken',
      }
      const click =
        cmode === 'Tap to cycle'
          ? () => {
              if (R === r && P === 1) togCl(r)
              else this.save({ part: 1, route: r })
            }
          : () => this.save({ part: 1, route: r })
      return {
        p2,
        label: 'Part I · ' + r,
        roman: done ? '✓' : 'I',
        click,
        ring: lit ? PC[1] : t.line,
        bs: lit ? 'solid' : 'dashed',
        chip: cur && P === 1 ? t.panel2 : 'transparent',
        fill: lit ? PC[1] : 'transparent',
        txt: lit ? 'oklch(0.18 0.01 60)' : t.mu,
        lbl: lit ? t.tx : t.mu,
        state: done
          ? cur
            ? 'Cleared · current'
            : 'Cleared'
          : cur
            ? P === 1
              ? 'In progress'
              : 'Passed'
            : P >= 3
              ? 'Not cleared'
              : 'Not taken',
        showChk: cmode === 'Checkbox',
        chkBg: done ? PC[1] : 'transparent',
        chkFg: done ? 'oklch(0.18 0.01 60)' : t.mu,
        chkBd: done ? PC[1] : t.line,
        chkTip: done ? 'Unmark cleared' : 'Mark cleared',
        toggle: () => togCl(r),
      }
    })
    const tClChips = ['Cai', 'Dietrich', 'Theodora', 'Leda'].map((r?: any) => {
      const on = CL.includes(r) || (R === r && P === 2)
      return {
        r,
        bg: on ? PC[1] : 'transparent',
        fg: on ? 'oklch(0.18 0.01 60)' : t.mu,
        bd: on ? PC[1] : t.line,
        mark: on ? '✓ ' : '',
        click: () => togCl(r),
      }
    })
    const tHint =
      cmode === 'Tap to cycle'
        ? 'Tap a route to make it current · tap it again to mark cleared · tap a cleared route to reset'
        : cmode === 'Checkbox'
          ? 'Tap a route to make it current · use ✓ to mark routes you’ve already cleared'
          : 'Tap a route to make it current · mark other cleared routes below'
    const tShowChips = cmode === 'Cleared chips'
    const tSkip = P >= 3 && !CL.length
    const tAll: any = {}
    const toLater = (n?: any) => () => {
      const ok = P >= 1 && P <= 2 && R !== 'All'
      this.save({
        part: n,
        ...(ok && !CL.includes(R) ? { cleared: [...CL, R] } : {}),
        ...(ok && P === 2 && !CL2.includes(R) ? { cleared2: [...CL2, R] } : {}),
      })
    }
    const tP3 = tn(3, 'Part III', 'III', P === 3, P >= 3, toLater(3))
    const tc: Record<string, any> = {
      l0: P >= 1 ? PC[1] : t.line,
      l1: P >= 2 ? PC[2] : t.line,
      l2: P >= 3 && CL.length ? PC[3] : t.line,
      l3: P >= 3 ? PC[3] : t.line,
    }
    const routes = ROUTES.map((r?: any) => ({
      r,
      bg: st.route === r ? t.ac : 'transparent',
      fg: st.route === r ? 'oklch(0.18 0.01 60)' : t.mu,
      click: () => this.save({ route: r }),
    }))
    const base: Record<string, any> = {
      t,
      imgErr: this.imgErr,
      rootRef: this.rootRef,
      headOn: narrow || navTop,
      progLabel:
        PN[P] +
        (P === 0
          ? ''
          : P <= 2
            ? R === 'All'
              ? ' · All routes'
              : ' · ' + R
            : (() => {
                const c = st.cleared || []
                return c.length ? ' · cleared ' + (c.length >= 4 ? 'all' : c.join(', ')) : ' · no Part I route cleared'
              })()),
      nav,
      steps,
      routes,
      tPro,
      tRoutes,
      tCols: narrow ? 'minmax(0,1fr)' : 'repeat(2,minmax(0,1fr))',
      tLine: narrow ? 'none' : 'block',
      tPr: cmode === 'Checkbox' ? '48px' : '14px',
      tAll,
      tClChips,
      tHint,
      tShowChips,
      tSkip,
      clearedN: CL.length ? ' · +' + CL.length + ' cleared' : '',
      tP3,
      tc,
      narrow,
      wideHead: !narrow,
      partRoman: RO[P],
      partColor: PC[P],
      routeShort: R === 'All' ? 'All routes' : R,
      isSettings: st.screen === 'settings',
      goSettings: () => this.save({ screen: 'settings' }),
      sidebar: !narrow && !navTop,
      topTabs: !narrow && navTop,
      showBrandInHead: navTop && !narrow,
      gridCols: !narrow && !navTop ? (sbC ? '72px' : '248px') + ' minmax(0,1fr)' : 'minmax(0,1fr)',
      navTipOff: () => this.setState({ nt: null }),
      navTip: sbC && st.nt ? st.nt : null,
      hasNavTip: !!(sbC && st.nt),
      sbOpen: !sbC,
      sbJust: sbC ? 'center' : 'flex-start',
      sbNavFs: sbC ? '12px' : '14px',
      sbPad: sbC ? '20px 8px' : '28px 18px',
      sbHeadPad: sbC ? '0' : '0 0 0 10px',
      sbHeadJust: sbC ? 'center' : 'space-between',
      sbIcon: sbC ? '»' : '«',
      sbTip: sbC ? 'Expand sidebar' : 'Collapse sidebar',
      sbToggle: () => this.save({ sbCollapsed: !sbC }),
      headPad: narrow ? '14px 16px' : '16px 32px',
      bodyPad: narrow ? '14px 16px 20px' : '28px 32px',
      bottomSpacer: narrow ? '34vh' : '48vh',
      outerPad: phone ? '32px 16px' : '0',
      appMaxW: phone ? '390px' : 'none',
      appH: phone ? '844px' : 'auto',
      appMinH: phone ? '0' : '100dvh',
      appGridMin: phone ? '100%' : '100dvh',
      appOverflow: phone ? 'auto' : 'visible',
      appRadius: phone ? '40px' : '0',
      appBorder: phone ? '8px solid #26241f' : '0',
      loading: !d,
      heroSpan: narrow ? 1 : 2,
      calcCols: narrow ? 'minmax(0,1fr)' : '300px minmax(0,1fr)',
    }
    if (!d) return base
    const clSet = st.cleared || []
    const onR = (c?: any) => {
      if (c.part < 1 || c.part > 2 || P === 0) return true
      if (P <= 2) return R === 'All' || c.routes.includes(R)
      return true
    }
    const gone = (c?: any) => !!c.pro && (P === 1 || P === 2)
    const clSet2 = st.cleared2 || []
    const rlock = (c?: any) =>
      P >= 3 &&
      (c.part === 1 || c.part === 2) &&
      c.routes.length &&
      !c.routes.some((r?: any) => (c.part === 1 ? clSet : clSet2).includes(r))
    const uOk = new Set<any>([
      ...(st.cleared || []),
      ...(st.cleared2 || []),
      ...(P >= 1 && P <= 2 && R !== 'All' ? [R] : []),
    ])
    const uLock = (k?: any) => !!(k && k.un && k.un.length && P >= 1 && !k.un.some((u?: any) => uOk.has(u.r)))
    const uNeed = (k?: any) => [...new Set<any>(k.un.map((u?: any) => u.r))].join(' / ')
    const uW = (k?: any) => {
      const lk = uLock(k)
      return {
        warn: lk,
        warnTxt: lk ? 'Locked · needs to complete ' + uNeed(k) + ' path' : '',
        enter: (ev?: any) => {
          const r = ev.currentTarget.getBoundingClientRect()
          const W = window.innerWidth,
            H = window.innerHeight
          const x = Math.max(12, Math.min(r.left, W - 312))
          const below = r.bottom + 260 < H
          this.setState({
            tip: {
              t: k.n,
              sub: 'Unlock requirements',
              body: 'Needs to complete ' + uNeed(k) + ' path.',
              bodyCol: 'oklch(0.74 0.12 30)',
              stats: [],
              hasStats: false,
              statNote: '',
              note: '',
              whoLbl: 'Complete any one',
              who: 'Quests',
              hasGroups: true,
              whoGroups: k.un.map((u?: any) => ({ rank: u.r + ' · ' + (u.ch ? 'Ch ' + u.ch : 'Ren ' + u.ren), names: u.d })),
              x: x + 'px',
              y: (below ? r.bottom + 8 : r.top - 8) + 'px',
              tf: below ? 'none' : 'translateY(-100%)',
            },
          })
        },
        leave: () => this.setState({ tip: null }),
        reqs: lk
          ? k.un.map((u?: any) => ({ t: u.r + "'s route · " + (u.ch ? 'Chapter ' + u.ch : 'Renown ' + u.ren), d: u.d }))
          : [],
      }
    }
    const avail = d.chars.filter((c?: any) => onR(c) && c.part <= P && !gone(c))
    const sealed = d.chars.filter((c?: any) => onR(c) && c.part > P)
    const tot = (c?: any) => (c.g ? sum(c.g) : 0)
    const init = (n?: any) =>
      n
        .split(' ')
        .map((w?: any) => w[0])
        .join('')
        .slice(0, 2)
    const open = (n?: any) => () => {
      this.save({ screen: 'profile', sel: n, ptab: 'info' })
      window.scrollTo(0, 0)
      const r = this.rootRef.current
      if (r) r.scrollTop = 0
    }
    const reqRec = (c?: any) => {
      const ok = c.rec.filter((r?: any) => r.ok !== 'No')
      const pool = R === 'All' || P >= 3 ? ok : ok.filter((r?: any) => r.route === R || r.route === 'All' || r.part >= 3)
      const list = pool.length ? pool : ok
      const ren = (r?: any) => parseInt(r.ren) || 0,
        ch = (r?: any) => parseInt(r.ch) || (r.ch === 'End of part' ? 99 : 50)
      return (
        list
          .slice()
          .sort(
            (x?: any, y?: any) =>
              x.part - y.part || ch(x) - ch(y) || ren(x) - ren(y) || (parseInt(x.sup) || 0) - (parseInt(y.sup) || 0),
          )[0] || null
      )
    }
    const reqKey = (c?: any) => {
      const r = reqRec(c)
      if (!r) return [c.part, 0, 0, 0]
      return [c.part, parseInt(r.ch) || (r.ch === 'End of part' ? 99 : 0), parseInt(r.ren) || 0, parseInt(r.sup) || 0]
    }
    const REC = st.recruited || []
    const RK = REC.map((x?: any) => (x.includes('@') ? x : x + '@All'))
    const keysOf = (n?: any) => RK.filter((x?: any) => x.split('@')[0] === n)
    const rt = (c?: any) => c.part === 1 || c.part === 2
    const recKey = (c?: any) => (rt(c) && P <= 2 ? c.n + '@' + R : rt(c) ? null : c.n + '@*')
    const autoRec = (c?: any) =>
      c.type === 'Unit' &&
      P >= 1 &&
      (c.rec || []).some(
        (r?: any) =>
          r.m === 'Automatic' &&
          String(r.ch) === '1' &&
          r.part === 1 &&
          (P <= 2 ? R !== 'All' && r.route === R : clSet.includes(r.route)),
      )
    const isRec = (c?: any) => {
      if (rlock(c)) return false
      if (c.type !== 'Unit' || autoRec(c)) return true
      const ks = keysOf(c.n)
      if (!rt(c)) return ks.length > 0
      if (P <= 2) return R === 'All' ? ks.length > 0 : ks.includes(c.n + '@' + R)
      return ks.length > 0
    }
    const togRec = (n?: any) => (e?: any) => {
      e && e.stopPropagation && e.stopPropagation()
      const c = d.chars.find((x?: any) => x.n === n)
      const k = recKey(c)
      let nx: any
      if (k && !(rt(c) && R === 'All')) {
        nx = isRec(c) ? RK.filter((x?: any) => x !== k) : [...RK, k]
      } else {
        nx = isRec(c) ? RK.filter((x?: any) => x.split('@')[0] !== n) : [...RK, n + '@' + ((st.cleared || [])[0] || 'All')]
      }
      this.save({ recruited: nx })
    }
    const card = (c?: any) => ({
      ...(() => {
        const r = isRec(c),
          fixed = c.type !== 'Unit' || rlock(c) || autoRec(c)
        return {
          recToggle: fixed
            ? (e?: any) => {
                e && e.stopPropagation && e.stopPropagation()
              }
            : togRec(c.n),
          recFixed: fixed,
          ...(() => {
            const h = rlock(c)
              ? ['Route locked', 'Clear this route first to recruit.']
              : fixed
                ? ['Always recruited', autoRec(c) ? 'Joins automatically in Chapter 1.' : 'Joins automatically.']
                : r
                  ? ['Recruited', 'Click to mark as not recruited.']
                  : ['Not recruited', 'Click to recruit.']
            const x = tipH(h[0], h[1])
            return { recEnter: x.enter, recLeave: x.leave }
          })(),
          recTip: rlock(c)
            ? 'Route not cleared · can’t recruit'
            : fixed
              ? 'Recruited · always available'
              : r
                ? 'Recruited · click to unrecruit'
                : 'Not recruited · click to recruit',
          recCur: fixed ? 'default' : 'pointer',
          recOp: fixed ? 0.5 : 1,
          recBs: rlock(c) ? 'dashed' : fixed ? 'dotted' : 'solid',
          recIcon: rlock(c) ? '✕' : '✓',
          recBd: r ? t.ac : t.line,
          recBg: r ? t.ac : t.bg,
          recFg: r ? 'oklch(0.18 0.01 60)' : t.mu,
          cardBd: r ? 'oklch(0.82 0.12 85 / .55)' : t.line,
        }
      })(),
      ...(() => {
        const on = (st.starred || []).includes(c.n)
        return {
          star: on ? '★' : '☆',
          starCol: on ? t.ac : t.mu,
          starTip: on ? 'Unstar' : 'Star character',
          toggleStar: (e?: any) => {
            e && e.stopPropagation && e.stopPropagation()
            const s = st.starred || []
            this.save({ starred: on ? s.filter((x?: any) => x !== c.n) : [...s, c.n] })
          },
        }
      })(),
      renTxt: (() => {
        const r = reqRec(c)
        if (!r) return ''
        const n = parseInt(r.ren)
        const C = r.ch && r.ch !== 'End of part' ? 'Chapter ' + r.ch : '',
          N = n ? 'Renown ' + n : ''
        return [...(st.sort !== 'ch' ? [N, C] : [C, N]), r.sup ? 'Support ' + r.sup : ''].filter(Boolean)
      })(),
      rsTxt: (() => {
        const r = reqRec(c)
        if (!r) return ''
        const n = parseInt(r.ren)
        return [n ? 'Renown ' + n : '', r.sup ? 'Support ' + r.sup : ''].filter(Boolean)
      })(),
      n: c.n,
      img: IMG('characters', c.n),
      init: init(c.n),
      cls: c.cls || '—',
      fac: c.fac || '—',
      facShow: !!c.fac && !/^(none|—|-)$/i.test(c.fac),
      type: TL[c.type] || c.type,
      tot: c.g ? tot(c) + '%' : '—',
      partLbl: PN[c.part],
      pcol: PC[c.part],
      locked: c.part > P,
      unl: c.part <= P && !gone(c),
      gone: gone(c),
      open: open(c.n),
    })
    const routeLabel = R === 'All' ? 'All routes' : R + "'s route"
    // unit builder
    const calcChars = avail.filter((c?: any) => c.g)
    const inPCalc = false
    const onlyCur = !!st.bOnly
    const cName = inPCalc ? st.sel : calcChars.find((c?: any) => c.n === st.calc.c) ? st.calc.c : (calcChars[0] || {}).n
    const cGd = (d.chars.find((x?: any) => x.n === cName) || {}).gd
    const gOk = (k?: any) => (P >= 3 || !['Master', 'Divine'].includes(k.tier)) && (!k.rg || !cGd || k.rg === cGd)
    const pristine = (n?: any) => {
      const ch = d.chars.find((x?: any) => x.n === n)
      return { c: n, k: ch ? ch.cls : '', m: 'None', lv: 1, stages: null, rl: 1 }
    }
    const goCalcFor = (n?: any) => {
      window.scrollTo(0, 0)
      const r = this.rootRef.current
      if (r) r.scrollTop = 0
      const dr: Record<string, any> = { ...(st.drafts || {}) }
      const pc = st.calc
      if (pc && pc.c && pc.c !== n) dr[pc.c] = { calc: pc, bname: st.bnameC === pc.c ? st.bname : null }
      const lb: Record<string, any> = { ...(st.lastB || {}) }
      if (pc && pc.c && pc.bid) lb[pc.c] = pc.bid
      const nx = dr[n]
      delete dr[n]
      const mine = builds.filter((x?: any) => x.c === n)
      const sb = nx ? null : mine.find((x?: any) => x.id === lb[n]) || mine[0]
      const nc = nx
        ? nx.calc
        : sb
          ? {
              c: sb.c,
              k: sb.k,
              m: sb.m,
              lv: sb.lv,
              stages: sb.stages || null,
              rl: sb.rl || 1,
              rk: sb.rk,
              ab: sb.ab || [],
              ca: sb.ca || [],
              it: sb.it || [],
              ms: sb.ms || '',
              bid: sb.id,
            }
          : pristine(n)
      this.setState({ bname: nx ? nx.bname : sb && sb.name != null ? sb.name : null, bnameC: n })
      this.save({ screen: 'calc', calc: nc, drafts: dr, lastB: lb })
    }
    const touched = (c?: any, bn?: any) =>
      !!c &&
      (bn != null ||
        (c.m && c.m !== 'None') ||
        (c.stages && c.stages.length > 1) ||
        c.lv > 1 ||
        c.rl > 1 ||
        (c.ab && c.ab.length > 0) ||
        (c.ca && c.ca.length > 0))
    const drafts: any = st.drafts || {}
    const calc: Record<string, any> = { ...(st.calc.c === cName ? st.calc : drafts[cName] ? drafts[cName].calc : pristine(cName)), c: cName }
    const B = this.buildCalc(d, calc)
    if (B) {
      calc.k = B.k.n
      calc.m = B.m ? B.m.n : 'None'
      calc.lv = B.lv
      calc.stages = B.stages.map((x?: any, i?: any) =>
        i < B.stages.length - 1 ? { k: x.k.n, lv: x.lv, m: x.mo ? x.mo.n : 'None' } : { k: x.k.n, lv: x.lv },
      )
      calc.rl = B.rl
      calc.rk = B.kr.n === B.k0.n ? undefined : B.kr.n
    }
    const SC = 120,
      pc = (v?: any) => (Math.max(0, v) / SC) * 100 + '%'
    const lv = calc.lv,
      gain = lv - 1
    const { AB9, ABS, AMOV } = this.abBonus(d, calc, B, lv, cName)
    const calcRows = B
      ? B.rows.map((r?: any, ri?: any) => ({
          chips: [
            ['Growth', r.t + '%', 'var(--tx, #eee)'],
            ['Mount', r.mst ? '+' + r.mst : '—', 'oklch(0.74 0.1 300)'],
            ['Bonus', AB9[ri] ? (AB9[ri] > 0 ? '+' : '') + AB9[ri] : '—', 'oklch(0.78 0.12 150)'],
            ['Min', r.ex ? '+' + r.ex : '—', 'var(--ac, oklch(0.8 0.11 75))'],
          ]
            .filter((x?: any) => x[1] !== '—')
            .map(([l, v, c]: any) => ({ l, v, c })),
          mn: r.ex ? '+' + r.ex : '—',
          cf: r.cf ? (r.cf > 0 ? '+' : '') + r.cf : '—',
          abD: AB9[ri] ? (AB9[ri] > 0 ? '+' : '') + AB9[ri] : '—',
          s: r.s,
          mst: r.mst ? '+' + r.mst : '—',
          rng: r.bv == null ? '+' + r.lo + '–' + r.hi : r.bv + r.lo + '–' + (r.bv + r.hi),
          a: r.a,
          b: r.b,
          m: r.m,
          t: r.t,
          bs: (r.b > 0 ? '+' : '') + r.b,
          ms: r.m ? '+' + r.m : '0',
          neg: Math.min(Math.max(0, r.a), -Math.min(0, r.b) - Math.min(0, r.m)),
          wa: pc(Math.max(0, r.a) - Math.min(Math.max(0, r.a), -Math.min(0, r.b) - Math.min(0, r.m))),
          wn: pc(Math.min(Math.max(0, r.a), -Math.min(0, r.b) - Math.min(0, r.m))),
          nL: r.b < 0 || r.m < 0 ? '−' + (-Math.min(0, r.b) - Math.min(0, r.m)) : '',
          wb: pc(r.b),
          wm: pc(r.m),
          aL: r.a > 0 ? r.a : '',
          bL: r.b > 0 ? r.b : '',
          mL: r.m > 0 ? r.m : '',
          hundred: (100 / SC) * 100 + '%',
          hMini: Math.min(100, (r.t / SC) * 100) + '%',
          baseV: r.bv == null ? '—' : r.bv,
          proj: r.bv == null ? '+' + r.up : r.fin + AB9[ri],
          lo: r.bv == null ? '+' + r.lo : r.bv + r.lo + AB9[ri],
          hi: r.bv == null ? '+' + r.hi : r.bv + r.hi + AB9[ri],
        }))
      : []
    const stashPrev = () => {
      const dr: Record<string, any> = { ...drafts }
      const pc = st.calc
      if (pc && pc.c && pc.c !== cName) {
        if (touched(pc, st.bnameC === pc.c ? st.bname : null))
          dr[pc.c] = { calc: pc, bname: st.bnameC === pc.c ? st.bname : null }
        else delete dr[pc.c]
      }
      return dr
    }
    const setCalc = (p?: any) => {
      const fz =
        !p.stages && calc.stages && B && calc.stages.length > 1
          ? {
              stages: calc.stages.map((x?: any, i?: any) =>
                i < calc.stages.length - 1 && x.m === undefined && B.stages[i]
                  ? { ...x, m: B.stages[i].mo ? B.stages[i].mo.n : 'None' }
                  : x,
              ),
            }
          : {}
      this.save({ calc: { ...calc, ...fz, ...p }, drafts: stashPrev() })
    }
    const setRlc = (v?: any) => {
      const rl = Math.max(1, Math.min(99, v || 1))
      const p: Record<string, any> = { rl }
      if (B) {
        const O = ['Base', 'Beginner', 'Specialty', 'Advanced', 'Master'],
          TH = [0, 5, 20, 35, 45]
        let al = 0
        TH.forEach((t?: any, i?: any) => {
          if (rl >= t) al = i
        })
        const cur = O.indexOf(B.kr.tier)
        const c = (B.c.rd || [])
          .map((x?: any) => d.classes.find((k?: any) => k.n === x.cls))
          .filter((k?: any) => k && O.indexOf(k.tier) > cur && O.indexOf(k.tier) <= al)
          .sort((a?: any, b?: any) => O.indexOf(b.tier) - O.indexOf(a.tier))[0]
        if (c) p.rk = c.n
        else if (cur > al) {
          const b = (B.c.rd || [])
            .map((x?: any) => d.classes.find((k?: any) => k.n === x.cls))
            .filter((k?: any) => k && O.indexOf(k.tier) <= al)
            .sort((a?: any, b?: any) => O.indexOf(b.tier) - O.indexOf(a.tier))[0]
          const f = b || d.classes.find((k?: any) => k.n === B.c.cls)
          if (f) p.rk = f.n
        }
      }
      setCalc(p)
    }
    const builds = st.builds || []
    const sk = (x?: any) => {
      const q = this.buildCalc(d, x)
      return q
        ? JSON.stringify([
            q.stages.map((s?: any, i?: any) => [s.k.n, s.lv, i < q.stages.length - 1 && s.mo ? s.mo.n : '']),
            q.rl,
            q.canRec ? q.kr.n : '',
            x.ab || [],
            x.ca || [],
            x.it || [],
            x.ms || '',
          ])
        : JSON.stringify(x)
    }
    const exb = builds.find((b?: any) => b.c === calc.c && b.m === calc.m && sk(b) === sk(calc))
    const exists = !!exb
    const lb = !exb && calc.bid ? builds.find((x?: any) => x.id === calc.bid && x.c === calc.c) : null
    const msCur = B && B.m && B.m.pa && B.m.pa.some((a?: any) => a.n === calc.ms) ? calc.ms : ''
    const mkNew = () => {
      const id = Date.now()
      const nb = [
        ...builds,
        {
          id,
          c: calc.c,
          k: calc.k,
          m: calc.m,
          lv,
          stages: calc.stages,
          rl: calc.rl || 1,
          rk: calc.rk,
          ab: calc.ab || [],
          ca: calc.ca || [],
          it: calc.it || [],
          ms: msCur,
          name: finalName,
        },
      ]
      const cmp = [...st.cmp, id].slice(-4)
      this.setState({ bname: null })
      this.save({
        builds: nb,
        cmp,
        calc: { ...calc, bid: id },
        ...(st.cchars && !st.cchars.includes(calc.c) ? { cchars: [...st.cchars, calc.c] } : {}),
      })
    }
    const dnm = (x?: any) => x.stages.map((s?: any) => (s.k.code || s.k.n) + s.lv).join('')
    const defName = B ? dnm(B) : ''
    const lk0 = calc.bid ? builds.find((x?: any) => x.id === calc.bid && x.c === calc.c) : null
    const bnameVal =
      st.bname == null || st.bnameC !== calc.c ? (lk0 && lk0.name != null ? lk0.name : defName) : st.bname
    const finalName = bnameVal.trim() || defName
    const nameSame = exb && (exb.name == null ? dnm(this.buildCalc(d, exb) || B) : exb.name) === finalName
    const bF = (b?: any) =>
      (!onlyCur || b.c === cName) &&
      (!st.bRec || ((c?: any) => !!c && isRec(c) && c.part <= P && !gone(c))(d.chars.find((x?: any) => x.n === b.c))) &&
      (!st.bStar || !!b.star)
    const buildV = builds
      .map((b?: any) => {
        const x = this.buildCalc(d, b)
        b = {
          ...b,
          abTxt: [...(b.ab || []), ...(b.ca || []), ...(b.it || []), ...(b.ms ? ['Mount: ' + b.ms] : [])].join(' · '),
          abShow: (b.ab || []).length || (b.ca || []).length || (b.it || []).length || b.ms ? 'block' : 'none',
        }
        const ch = d.chars.find((c?: any) => c.n === b.c)
        const lk = ch && (ch.part > P || !onR(ch) || (ch.pro && (P === 1 || P === 2)))
        return { ...b, x, lk, dn: dnm(x), nm: b.name == null ? dnm(x) : b.name, nmShow: b.name || dnm(x) }
      })
      .filter((b?: any) => b.x)
    const abAll = (() => {
      const m: any = {}
      d.classes.forEach((k?: any) =>
        (k.ab || []).forEach((a?: any) => {
          if (!m[a.n]) m[a.n] = a.e
        }),
      )
      d.arts.forEach((a?: any) => {
        if ((a.k === 'Ability' || (a.k === 'Authority Art' && a.kd === 'passive')) && !m[a.n]) m[a.n] = a.e
      })
      return m
    })()
    const caAll: any = {}
    d.arts.forEach((a?: any) => {
      if (a.k === 'Combat Art') caAll[a.n] = a
      else if (a.k === 'Authority Art' && a.kd !== 'passive') caAll[a.n] = { ...a, c: 'Authority' }
    })
    const kk = (v?: any) =>
      v
        .replace(/\s*\(.*?\)\s*/g, '')
        .trim()
        .toLowerCase()
    const chr = d.chars.find((x?: any) => x.n === calc.c)
    const lset = new Set<any>()
    ;((chr && chr.ls) || []).forEach((l?: any) =>
      l.r.forEach((v?: any) => {
        if (v && v !== '?') lset.add(kk(v))
      }),
    )
    const inLs = (n?: any) => n.split(/\s*\/\s*/).some((p?: any) => lset.has(p.toLowerCase()))
    const lsCats = new Set<any>(((chr && chr.ls) || []).filter((l?: any) => l.r.some((v?: any) => v && v !== '?')).map((l?: any) => l.c))
    const WC = ['Sword', 'Lance', 'Axe', 'Bow', 'Brawl', 'Reason', 'Faith']
    const uwc = (n?: any) =>
      /^Axe/i.test(n)
        ? 'Axe'
        : /^Black/i.test(n)
          ? 'Reason'
          : /^Bow/i.test(n)
            ? 'Bow'
            : /^Fist/i.test(n)
              ? 'Brawl'
              : /^Spear/i.test(n)
                ? 'Lance'
                : /^Sword/i.test(n)
                  ? 'Sword'
                  : /^White/i.test(n)
                    ? 'Faith'
                    : ''
    const abPool = new Set<any>()
    const MV = ['Infantry', 'Cavalry', 'Armor', 'Flying']
    d.arts.forEach((a?: any) => {
      if (a.k === 'Ability' && (inLs(a.n) || (WC.includes(a.c) && lsCats.has(a.c)))) abPool.add(a.n)
      if (a.k === 'Authority Art' && !abAll[a.n]) abAll[a.n] = a.e || ''
    })
    Object.keys(d.univE || {}).forEach((n?: any) => {
      abAll[n] = abAll[n] || d.univE[n]
      if (inLs(n) || lsCats.has(uwc(n))) abPool.add(n)
    })
    if (chr) {
      if (chr.pa) {
        const i = chr.pa.indexOf(': ')
        if (i > 0) {
          const n = chr.pa.slice(0, i)
          abAll[n] = abAll[n] || chr.pa.slice(i + 2)
        }
      }
      ;(chr.lab || []).forEach((a?: any) => {
        abAll[a.n] = abAll[a.n] || a.e
        abPool.add(a.n)
      })
    }
    const caPool = Object.keys(caAll).filter(inLs)
    const stCls = (B && B.stages ? B.stages : []).map((s?: any) => s.k)
    const stAb = new Set<any>()
    stCls.forEach((k?: any) =>
      (k.ab || [])
        .filter((a?: any) => a.t === 'Master ability')
        .forEach((a?: any) => {
          abAll[a.n] = abAll[a.n] || a.e
          abPool.add(a.n)
          stAb.add(a.n)
        }),
    )
    const caCur = calc.ca || []
    const abCur = calc.ab || []
    const curCls = B && B.stages && B.stages.length ? B.stages[B.stages.length - 1].k : null
    const caBonus = [...(curCls ? (curCls.ab || []).map((a?: any) => a.n) : []), ...abCur].reduce((s?: any, n?: any) => {
      const m = /^Combat Arts \+(\d+)/i.exec(n)
      return s + (m ? +m[1] : 0)
    }, 0)
    const caMax = 3 + caBonus
    const abMax = 5
    const paRow = (() => {
      const p = chr && chr.pa
      const i = p ? p.indexOf(': ') : -1
      if (i <= 0) return []
      const n = p.slice(0, i)
      return [{ n, bgi: AB(n), e: p.slice(i + 2), t: 'Personal', ...this.hov(n) }]
    })()
    const exG = new Map<any, any>()
    ;(d.excl || []).forEach((g?: any) =>
      g.m.forEach((x?: any) => {
        if (!exG.has(x.n)) exG.set(x.n, [])
        exG.get(x.n).push(g)
      }),
    )
    const heldEx = new Set<any>([...abCur, ...paRow.map((a?: any) => a.n), ...(curCls ? (curCls.ab || []).map((a?: any) => a.n) : [])])
    const exBlock = (n?: any) => {
      for (const g of exG.get(n) || []) for (const x of g.m) if (x.n !== n && heldEx.has(x.n)) return x.n
      return ''
    }
    const abVals: Record<string, any> = {
      abSel: abCur.map((n?: any) => {
        const wk = d.classes
          .filter((k?: any) => (k.ab || []).some((x?: any) => x.t === 'Master ability' && x.n === n))
          .map((k?: any) => k.n)
        const wOff = wk.length > 0 && !stAb.has(n)
        return {
          bgi: AB(n),
          wn: wOff ? '⚠ Requires ' + wk.join(' / ') : '',
          wd: wOff ? 'block' : 'none',
          n,
          e: abAll[n] || '',
          ...this.hov(n),
          ...this.hd(
            abCur.map((x?: any) => 'ab:' + x),
            'ab:' + n,
            (o?: any) => setCalc({ ab: o.map((x?: any) => x.slice(3)) }),
          ),
          open: () => {
            this.setState({ pk: 'ab', pq: '', pf: 'All', ppv: n })
            setTimeout(() => {
              const el = [...document.querySelectorAll('[data-pkn]')].find((x?: any) => x.getAttribute('data-pkn') === n)
              if (el) {
                const p = el.parentElement!
                p.scrollTop += el.getBoundingClientRect().top - p.getBoundingClientRect().top - 8
                el.animate([{ background: 'oklch(0.8 0.11 75 / .35)' }, { background: 'transparent' }], {
                  duration: 1200,
                })
              }
            }, 60)
          },
          rm: (e?: any) => {
            e && e.stopPropagation && e.stopPropagation()
            setCalc({ ab: abCur.filter((x?: any) => x !== n) })
          },
        }
      }),
      abCount: abCur.length + '/' + abMax,
      abHas: abCur.length > 0,
      abFull: abCur.length >= abMax,
      abOpts: [...abPool]
        .filter((n?: any) => !abCur.includes(n) && !exBlock(n))
        .sort()
        .map((n?: any) => ({ n, e: abAll[n] || '' })),
      abPick: (e?: any) => {
        const v = (e.target.value || '').trim().toLowerCase()
        if (!v) return
        const m = [...abPool].find((n?: any) => n.toLowerCase() === v)
        if (m && !abCur.includes(m) && !exBlock(m) && abCur.length < abMax) {
          e.target.value = ''
          setCalc({ ab: [...abCur, m] })
        }
      },
      abClear: () => setCalc({ ab: [] }),
      clsName: curCls ? curCls.n : '',
      clsGroups: (() => {
        const cl = (curCls ? curCls.ab || [] : []).map((a?: any) => ({
          n: a.n,
          bgi: AB(a.n),
          e: a.e,
          t: a.t === 'Master ability' ? 'Master' : 'Class',
          ...this.hov(a.n),
        }))
        const A: Record<string, any> = {
          act: true,
          bs: 'solid',
          bd: t.line,
          bg: 'transparent',
          lc: 'var(--mu, oklch(0.7 0.01 70))',
          nc: 'var(--tx, #eee)',
          nw: 600,
        }
        const M: Record<string, any> = {
          act: false,
          bs: 'dashed',
          bd: t.line,
          bg: 'transparent',
          lc: 'var(--mu, oklch(0.7 0.01 70))',
          nc: 'inherit',
          nw: 600,
        }
        return [
          { ...A, lbl: (chr ? chr.n : 'Character') + ' · personal', items: paRow },
          { ...A, lbl: (curCls ? curCls.n : 'Class') + ' · always active', items: cl.filter((a?: any) => a.t === 'Class') },
          {
            ...M,
            lbl: (curCls ? curCls.n : 'Class') + ' · unlocked on mastery',
            items: cl.filter((a?: any) => a.t === 'Master'),
          },
        ].filter((g?: any) => g.items.length)
      })(),
      clsAb: [
        ...paRow,
        ...(curCls
          ? (curCls.ab || []).map((a?: any) => ({
              n: a.n,
              bgi: AB(a.n),
              e: a.e,
              t: a.t === 'Master ability' ? 'Master' : 'Class',
              ...this.hov(a.n),
            }))
          : []),
      ],
      clsHas: paRow.length > 0 || !!(curCls && (curCls.ab || []).length),
      mntName: B && B.m && B.m.n !== 'None' ? B.m.n : '',
      mntAbHas: !!(B && B.m && B.m.n !== 'None' && B.m.ab),
      mntNoOn: !msCur,
      mntNoBd: !msCur ? 'oklch(0.74 0.1 300)' : t.line,
      mntNoBg: !msCur ? 'oklch(0.74 0.1 300 / .2)' : 'transparent',
      mntNoPick: () => setCalc({ ms: '' }),
      mntGroups: this.mGroups(B && B.m && B.m.n !== 'None' ? B.m : null).map((g?: any) => ({
        lbl: g.lbl,
        items: g.items.map((n?: any) => {
          const on = msCur === n
          return {
            n,
            on,
            bgi: AB(n),
            tag: 'Bond ' + g.bl[n],
            bd: on ? 'oklch(0.74 0.1 300)' : t.line,
            bg: on ? 'oklch(0.74 0.1 300 / .2)' : 'transparent',
            ...this.hov(n),
            pick: () => setCalc({ ms: on ? '' : n }),
          }
        }),
      })),
      clsNone: !(paRow.length || (curCls && (curCls.ab || []).length)),
      caSel: caCur.map((n?: any) => {
        const a = caAll[n]
        return {
          n,
          bgi: 'url(' + IMG('arts', a && a.c) + ') center/cover no-repeat',
          stDisp: 'none',
          ...this.hov(n),
          ...this.hd(
            caCur.map((x?: any) => 'ca:' + x),
            'ca:' + n,
            (o?: any) => setCalc({ ca: o.map((x?: any) => x.slice(3)) }),
          ),
          open: () => {
            this.setState({ pk: 'ca', pq: '', pf: 'All', ppv: n })
            setTimeout(() => {
              const el = [...document.querySelectorAll('[data-pkn]')].find((x?: any) => x.getAttribute('data-pkn') === n)
              if (el) {
                const p = el.parentElement!
                p.scrollTop += el.getBoundingClientRect().top - p.getBoundingClientRect().top - 8
                el.animate([{ background: 'oklch(0.8 0.11 75 / .35)' }, { background: 'transparent' }], {
                  duration: 1200,
                })
              }
            }, 60)
          },
          c: a ? a.c : '',
          e: a ? a.e : '',
          st: '',
          rm: (e?: any) => {
            e && e.stopPropagation && e.stopPropagation()
            setCalc({ ca: caCur.filter((x?: any) => x !== n) })
          },
        }
      }),
      caCount: caCur.length + '/' + caMax + (caBonus ? ' (+' + caBonus + ')' : ''),
      caHas: caCur.length > 0,
      caFull: caCur.length >= caMax,
      caOpts: caPool
        .filter((n?: any) => !caCur.includes(n))
        .sort()
        .map((n?: any) => ({ n, l: caAll[n].c })),
      caPick: (e?: any) => {
        const v = (e.target.value || '').trim().toLowerCase()
        if (!v) return
        const m = caPool.find((n?: any) => n.toLowerCase() === v)
        if (m && !caCur.includes(m) && caCur.length < caMax) {
          e.target.value = ''
          setCalc({ ca: [...caCur, m] })
        }
      },
      caClear: () => setCalc({ ca: [] }),
    }
    const LM: Record<string, any> = { mov: 0, res: 0, bld: 0, chips: [] }
    {
      const T: Record<string, any> = {
        'Armored Move': ['Mov', 1],
        'Armored Move+': ['Mov', 2],
        'Resistant Armor': ['Res', 5],
        'Build +5': ['Bld', 5],
        'Build +10': ['Bld', 10],
      }
      const best: any = {}
      abCur.forEach((n?: any) => {
        const t = T[n]
        if (t && (!best[t[0]] || best[t[0]][1] < t[1])) best[t[0]] = [n, t[1]]
      })
      Object.entries(best).forEach(([k, [n, v]]: any) => {
        LM[k.toLowerCase()] = v
        LM.chips.push({
          l: n + ' +' + v + ' ' + k,
          tip: n + ': Grants ' + k + ' +' + v + ' (applied from your selected abilities)',
          col: 'oklch(0.78 0.12 150)',
        })
      })
    }
    const itCur = calc.it || [],
      itMax = d.islot || 5,
      meId = String(calc.c || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
    const itMap = new Map<any, any>((d.items || []).map((x?: any) => [x.n, x]))
    const itPool = (d.items || []).filter((x?: any) => !x.bi && (!x.w || x.w === meId))
    const itSt = (x?: any) =>
      x
        ? [
            x.mt != null ? 'Mt ' + x.mt : '',
            x.hit != null ? 'Hit ' + x.hit : '',
            x.crt != null ? 'Crt ' + x.crt : '',
            x.r1 != null ? 'Rng ' + (x.r2 && x.r2 !== x.r1 ? x.r1 + '–' + x.r2 : x.r1) : '',
            x.wt != null ? 'Wt ' + x.wt : '',
            x.us != null ? 'Use ' + x.us : '',
          ]
            .filter((v?: any) => v !== '' && v != null)
            .join(' · ')
        : ''
    const itVals: Record<string, any> = {
      caGr: (() => {
        const seen = new Set<any>(caCur),
          o: any = []
        const sx = (a?: any) =>
          a && a.s
            ? [
                a.s.mt != null ? 'Mt ' + a.s.mt : '',
                a.s.hit ? 'Hit ' + a.s.hit : '',
                a.s.crt ? 'Crt ' + a.s.crt : '',
                a.s.rn ? 'Rng ' + a.s.rn : '',
                a.s.dc ? 'Dur ' + a.s.dc : '',
              ]
                .filter(Boolean)
                .join(' · ')
            : ''
        itCur.forEach((n?: any) => {
          const x = itMap.get(n)
          if (x && x.ga && !seen.has(x.ga)) {
            seen.add(x.ga)
            const a: any = caAll[x.ga] || (d.arts || []).find((y?: any) => y.n === x.ga) || {}
            o.push({
              n: x.ga,
              bgi: 'url(' + IMG('arts', a.c || '') + ') center/cover no-repeat',
              c: a.c || '',
              e: a.e || '',
              st: '',
              stDisp: 'none',
              from: x.n,
              ...this.hov(x.ga),
            })
          }
        })
        return o
      })(),
      itSel: (() => {
        const WM: Record<string, any> = { Brawl: 'Brawling', Lance: 'Spear' }
        const canUse = (x?: any, k?: any) =>
          x.cat === 'Accessory' || !!(k && (k.w || '').split(/,\s*/).includes(WM[x.cat] || x.cat))
        let wd = false
        return itCur.map((n?: any) => {
          const x: any = itMap.get(n) || {}
          const cu = canUse(x, curCls)
          const eq = x.cat === 'Accessory' || (cu && !wd && (wd = true))
          return {
            n,
            eq: eq ? 'Equipped' : cu ? 'Unequipped' : "Class can't use",
            eqCol: eq ? 'oklch(0.78 0.12 150)' : 'var(--mu, oklch(0.7 0.01 70))',
            eqDim: cu ? 1 : 0.55,
            ...this.hd(
              itCur.map((y?: any) => 'it:' + y),
              'it:' + n,
              (o?: any) => setCalc({ it: o.map((y?: any) => y.slice(3)) }),
            ),
            c: x.cat || '',
            e: x.e || '',
            ...(() => {
              const b = x.cat && x.cat !== 'Accessory' ? this.SK(x.cat) : ''
              const h = this.hov(x.cat, (q?: any) => this.skillTip(q))
              return {
                skBgi: b || 'none',
                skD: b ? 'block' : 'none',
                skEnter: h.enter,
                skLeave: h.leave,
                skClick: (e?: any) => {
                  e.stopPropagation()
                  h.enter(e)
                },
              }
            })(),
            ...this.hovI(n),
            st: '',
            stDisp: 'none',
            open: () => {
              const bx = x.bi ? (d.items || []).find((y?: any) => y.id === x.bi) || x : x
              this.setState({ pk: 'it', pq: '', pf: 'All', ppv: bx.n, prf: { ...(st.prf || {}), [bx.n]: x.rl || 0 } })
              setTimeout(() => {
                const el = [...document.querySelectorAll('[data-pkn]')].find((y?: any) => y.getAttribute('data-pkn') === bx.n)
                if (el) {
                  const p = el.parentElement!
                  p.scrollTop += el.getBoundingClientRect().top - p.getBoundingClientRect().top - 8
                  el.animate([{ background: 'oklch(0.8 0.11 75 / .35)' }, { background: 'transparent' }], {
                    duration: 1200,
                  })
                }
              }, 60)
            },
            rm: (e?: any) => {
              e && e.stopPropagation && e.stopPropagation()
              setCalc({ it: itCur.filter((y?: any) => y !== n) })
            },
          }
        })
      })(),
      itCount: itCur.length + '/' + itMax,
      itHas: itCur.length > 0,
      itFull: itCur.length >= itMax,
      itCanAdd: itCur.length < itMax,
      openIt: () => this.setState({ pk: 'it', pq: '', pf: 'All' }),
      itClear: () => setCalc({ it: [] }),
    }
    const pk = st.pk,
      pq = (st.pq || '').trim().toLowerCase(),
      pfv = st.pf || 'All'
    const abMeta: any = {}
    d.arts.forEach((a?: any) => {
      if (a.k === 'Ability') abMeta[a.n] = a.c
      if (a.k === 'Authority Art' && a.kd === 'passive') abMeta[a.n] = 'Authority'
    })
    const clsAbSet = new Set<any>()
    d.classes.forEach((k?: any) => (k.ab || []).forEach((a?: any) => clsAbSet.add(a.n)))
    d.arts.forEach((a?: any) => {
      if (a.k === 'Ability' && !abMeta[a.n] && clsAbSet.has(a.n)) abMeta[a.n] = 'Class'
    })
    stAb.forEach((n?: any) => {
      if (abMeta[n] !== 'Personal') abMeta[n] = 'Class'
    })
    const uw = (n?: any) =>
      /^Axe/i.test(n)
        ? 'Axe'
        : /^Black/i.test(n)
          ? 'Reason'
          : /^Bow/i.test(n)
            ? 'Bow'
            : /^Fist/i.test(n)
              ? 'Brawl'
              : /^Spear/i.test(n)
                ? 'Lance'
                : /^Sword/i.test(n)
                  ? 'Sword'
                  : /^White/i.test(n)
                    ? 'Faith'
                    : ''
    Object.keys(d.univE || {}).forEach((n?: any) => {
      abMeta[n] = uw(n) || 'Other'
    })
    if (chr) {
      if (chr.pa) {
        const i = chr.pa.indexOf(': ')
        if (i > 0) abMeta[chr.pa.slice(0, i)] = 'Personal'
      }
      ;(chr.lab || []).forEach((a?: any) => (abMeta[a.n] = 'Personal'))
    }
    const csStat = (a?: any) => ''
    const bnMap: any = {}
    const bnOf = (c?: any) =>
      bnMap[c] || bnMap[({ 'Black Magic': 'Reason', 'Dark Magic': 'Reason', 'White Magic': 'Faith' } as any)[c]]
    {
      const NM: Record<string, any> = {
        Spear: 'Lance',
        Brawling: 'Brawl',
        Riding: 'Cavalry',
        Armour: 'Armor',
        'Heavy Armor': 'Armor',
        Flier: 'Flying',
      }
      String((curCls && curCls.bonus) || '')
        .split(',')
        .forEach((s?: any) => {
          const m = /^\s*(.+?)\s*\+(\d+)\s*$/.exec(s)
          if (m) bnMap[NM[m[1]] || m[1]] = +m[2]
        })
    }
    const clsOf: any = {},
      clsEf: any = {},
      clsPlain = new Set<any>(),
      clsMst = new Set<any>()
    d.classes.forEach((k?: any) =>
      (k.ab || []).forEach((a?: any) => {
        ;(a.t === 'Master ability' ? clsMst : clsPlain).add(a.n)
      }),
    )
    clsMst.forEach((n?: any) => clsPlain.delete(n))
    d.classes.forEach((k?: any) =>
      (k.ab || []).forEach((a?: any) => {
        ;(clsOf[a.n] = clsOf[a.n] || []).push(k.n)
        if (a.e && !clsEf[a.n]) clsEf[a.n] = a.e
      }),
    )
    const isCa = pk === 'ca',
      isIt = pk === 'it',
      pCur = isIt ? itCur : isCa ? caCur : abCur,
      pMax = isIt ? itMax : isCa ? caMax : abMax
    const pAll = !pk
      ? []
      : isIt
        ? (() => {
            const vmap: any = {}
            ;(d.items || []).forEach((v?: any) => {
              if (v.bi) (vmap[v.bi] = vmap[v.bi] || []).push(v)
            })
            return (d.items || [])
              .filter((x?: any) => !x.bi)
              .map((x?: any) => ({ ...x, vs: (vmap[x.id] || []).slice().sort((a?: any, b?: any) => a.rl - b.rl) }))
          })()
            .map((x?: any) => {
              const wc = ({ 'Black Magic': 'Reason', 'Dark Magic': 'Reason', 'White Magic': 'Faith' } as any)[x.cat] || x.cat
              const off = (!!x.w && x.w !== meId) || (WC.includes(wc) && !lsCats.has(wc))
              const why = x.w && x.w !== meId ? 'Restricted to another character' : 'No ' + wc + ' proficiency'
              return {
                n: x.n,
                cat: x.cat,
                catL: x.cat + (x.rk ? ' · ' + x.rk : '') + (x.rk2 ? ' + ' + x.cat2 + ' ' + x.rk2 : ''),
                e: x.e || '',
                st: off ? '⚠ ' + why : '',
                off,
                vs: x.vs,
                rk: x.rk,
              }
            })
            .sort((a?: any, b?: any) => {
              const so = (d.skillOrder || []).map((v?: any) => v.replace('Spear', 'Lance').replace('Brawling', 'Brawl')),
                si = (c?: any) => {
                  const i = so.indexOf(c)
                  return i < 0 ? 999 : i
                },
                RO: string = 'EDCBAS',
                ri = (r?: any) => {
                  const i = RO.indexOf(r)
                  return i < 0 ? 99 : i
                }
              return (
                (a.off ? 1 : 0) - (b.off ? 1 : 0) ||
                si(a.cat) - si(b.cat) ||
                ri(a.rk) - ri(b.rk) ||
                a.n.localeCompare(b.n)
              )
            })
        : (isCa
            ? caPool.map((n?: any) => ({ n, cat: caAll[n].c, e: caAll[n].e || '', st: csStat(caAll[n]) }))
            : [...new Set<any>([...abPool, ...clsAbSet])]
                .filter((n?: any) => abMeta[n] === 'Personal' || !clsPlain.has(n))
                .map((n?: any) => {
                  const off = clsAbSet.has(n) && !stAb.has(n) && abMeta[n] !== 'Personal'
                  return {
                    n,
                    cat: abMeta[n] || (clsAbSet.has(n) ? 'Class' : 'Other'),
                    e: abAll[n] || clsEf[n] || '',
                    st: off ? '⚠ Not in current class route · ' + clsOf[n].join(', ') : '',
                    off,
                    hl: false,
                  }
                })
          ).sort((a?: any, b?: any) => (a.off ? 1 : 0) - (b.off ? 1 : 0) || a.n.localeCompare(b.n))
    const have = new Set<any>(pAll.map((x?: any) => x.cat))
    const mkRow = (l?: any) => l.filter((c?: any) => c === 'All' || have.has(c))
    const pRowsDef = isIt
      ? [['All', 'Sword', 'Lance', 'Axe', 'Bow', 'Brawl', 'Reason', 'Faith', 'Shield', 'Accessory']]
      : isCa
        ? [['All', ...[...have].sort()]]
        : [
            ['All', 'Personal', 'Class'],
            ['Sword', 'Lance', 'Axe', 'Bow', 'Brawl', 'Reason', 'Faith'],
            ['Infantry', 'Armor', 'Cavalry', 'Flying', 'Authority'],
          ]
    const pChipRows = [
      {
        chips: pRowsDef
          .map(mkRow)
          .flat()
          .map((c?: any, i?: any) => ({ c, i, ic: !!SK(c) }))
          .sort((p?: any, q?: any) => {
            if (!isIt && (p.ic || q.ic)) {
              if (p.ic !== q.ic) return p.ic ? 1 : -1
              const NM: Record<string, any> = {
                  Lance: 'Spear',
                  Brawl: 'Brawling',
                  Reason: 'Black Magic',
                  Faith: 'White Magic',
                  Armor: 'Heavy Armor',
                  Cavalry: 'Riding',
                },
                o = d.skillOrder || [],
                ix = (n?: any) => {
                  const k = o.indexOf(NM[n] || n)
                  return k < 0 ? 99 : k
                }
              return ix(p.c) - ix(q.c) || p.i - q.i
            }
            return p.i - q.i
          })
          .map((x?: any) => x.c)
          .map((c?: any) => ({
            l: c,
            bgi: SK(c),
            ic: !!SK(c),
            noIc: !SK(c),
            op: pfv === 'All' || c === pfv ? 1 : 0.5,
            bg:
              c === pfv ? 'var(--panel2, oklch(0.25 0.012 60))' : bnOf(c) ? 'oklch(0.8 0.11 75 / .12)' : 'transparent',
            fg: c === pfv ? 'var(--tx, #eee)' : 'var(--mu, oklch(0.78 0.035 120))',
            on: c === pfv,
            go: () => this.setState({ pf: c }),
            ...(SK(c) ? this.hov(c, (x?: any) => this.skillTip(x)) : {}),
          })),
      },
    ].filter((r?: any) => r.chips.length)
    const pRows = pAll
      .filter(
        (x?: any) =>
          (pfv === 'All' || x.cat === pfv) && (!pq || x.n.toLowerCase().includes(pq) || x.e.toLowerCase().includes(pq)),
      )
      .map((x?: any) => {
        const on =
            isIt && x.vs && x.vs.length
              ? [x.n, ...x.vs.map((v?: any) => v.n)].some((n?: any) => pCur.includes(n))
              : pCur.includes(x.n),
          blk = !isCa && !isIt && !on ? exBlock(x.n) : '',
          full = !on && (pCur.length >= pMax || !!blk)
        if (blk) x = { ...x, st: 'Conflicts with ' + blk + ' — same ability line' }
        return {
          ...x,
          bgi: isIt
            ? (x.cat && x.cat !== 'Accessory' && this.SK(x.cat)) || 'none'
            : isCa
              ? 'url(' + IMG('arts', x.c || x.cat) + ') center/cover no-repeat'
              : AB(x.n),
          icD: isIt ? (x.cat && x.cat !== 'Accessory' && this.SK(x.cat) ? 'block' : 'none') : 'block',
          ...(isIt ? this.hovI(x.n) : this.hov(x.n)),
          catL: x.catL || x.cat,
          on,
          full,
          blk,
          pv: () => this.setState({ ppv: x.n }),
          mark: on ? '✓' : '+',
          bd: on || x.n === (st.ppv || '') ? 'var(--ac, oklch(0.8 0.11 75))' : 'var(--line, oklch(0.29 0.012 60))',
          op: full ? 0.45 : x.off ? 0.7 : 1,
          rbg:
            x.n === (st.ppv || '')
              ? 'oklch(0.8 0.11 75 / .12)'
              : bnOf(x.cat)
                ? 'oklch(0.8 0.11 75 / .1)'
                : 'var(--panel2, oklch(0.25 0.012 60))',
          cur: 'pointer',
          stDisp: x.st ? 'block' : 'none',
          eDisp: x.e ? 'block' : 'none',
          go: () => {
            if (on)
              setCalc(
                isIt
                  ? { it: itCur.filter((y?: any) => y !== x.n) }
                  : isCa
                    ? { ca: caCur.filter((y?: any) => y !== x.n) }
                    : { ab: abCur.filter((y?: any) => y !== x.n) },
              )
            else if (!full && !blk)
              setCalc(isIt ? { it: [...itCur, x.n] } : isCa ? { ca: [...caCur, x.n] } : { ab: [...abCur, x.n] })
          },
        }
      })
    const ppv = st.ppv || ''
    const pvr = pk ? pRows.find((r?: any) => r.n === ppv) : null
    if (narrow && pvr) this.sk = 'p' + ppv
    const pvIt = !!pvr && isIt
    const pvt = pvr ? (isIt ? null : this.tipFor(ppv)) : null
    const pvVs = pvIt && pvr.vs ? pvr.vs : []
    const pvNames = pvIt ? [pvr.n, ...pvVs.map((v?: any) => v.n)] : []
    const prLv = pvVs.length ? Math.min((st.prf || {})[ppv] || 0, Math.max(...pvVs.map((v?: any) => v.rl))) : 0
    const pvTV = prLv ? pvVs.find((v?: any) => v.rl === prLv) : null
    const pvTarget = pvTV ? pvTV.n : pvr ? pvr.n : ''
    const pvHeld = pvIt ? pvNames.find((n?: any) => pCur.includes(n)) || '' : ''
    const pvFull = pCur.length >= pMax
    const pvSwitch = pvIt && !!pvHeld && pvHeld !== pvTarget
    const pvRemove = pvIt ? !!pvHeld && pvHeld === pvTarget : !!pvr && pvr.on
    const pvDis = pvIt ? !pvHeld && pvFull : !!pvr && !pvr.on && (pvr.full || !!pvr.blk)
    const pvTT = pvIt ? this.itemTip(pvTarget) : null
    const pvTI = pvIt ? itMap.get(pvTarget) : null
    const pvA = pvr && !pvIt ? (d.arts || []).find((y?: any) => y.n === pvr.n) : null
    const pvAs =
      pvA && pvA.s
        ? ((sx?: any) => {
            let a = [
              ['Might', sx.mt],
              ['Hit', sx.hit],
              ['Crit', sx.crt],
              ['Range', sx.rn],
              ['Durability', sx.dc != null ? (sx.dc ? '-' + sx.dc : 0) : null],
            ]
              .filter(([l, v]: any) => v != null && v !== '')
              .map(([l, v]: any) => ({ l, v: sx.b && typeof v === 'number' && v > 0 ? '+' + v : v }))
            if (a.every((x?: any) => x.l === 'Range' || +String(x.v).replace(/^\+/, '') === 0))
              a = a.filter((x?: any) => x.l === 'Range')
            return a
          })(pvA.s)
        : []
    const pvPrim = !!pvr && !pvRemove && !pvDis
    const lvL = prLv ? '+' + prLv : 'base'
    const pkVals: Record<string, any> = {
      pkW: narrow ? 'min(640px,100%)' : 'min(1040px,100%)',
      pkSheet: narrow && !!pvr,
      pkTf: narrow && pvr && this.state.smin === 'p' + ppv ? 'translateY(calc(100% - 56px))' : 'translateY(0)',
      sheetClick: (e?: any) => e.stopPropagation(),
      sheetScrim: (e?: any) => {
        e.stopPropagation()
        this.closeSheet()
      },
      sheetHD: narrow ? 'flex' : 'none',
      sheetClose: (e?: any) => {
        e && e.stopPropagation && e.stopPropagation()
        this.closeSheet()
      },
      sheetDown: (e?: any) => {
        const el = e.currentTarget.closest('[data-sheet]')
        if (!el) return
        e.currentTarget.setPointerCapture(e.pointerId)
        this.rz = { y: e.clientY, h: el.offsetHeight, el, cur: el.offsetHeight }
      },
      sheetMove: (e?: any) => {
        const r = this.rz
        if (!r) return
        const h = Math.max(0, Math.min(window.innerHeight * 0.92, r.h + r.y - e.clientY))
        r.cur = h
        r.el.style.transition = 'none'
        r.el.style.maxHeight = h + 'px'
        r.el.style.height = h + 'px'
      },
      sheetUp: (e?: any) => {
        const r = this.rz
        if (!r) return
        this.rz = null
        r.el.style.transition = ''
        if (r.cur < 200) {
          r.el.style.height = r.h + 'px'
          r.el.style.maxHeight = ''
          this.closeSheet()
        }
      },
      pkPvOn: !!pvr,
      pkPvOff: !pvr,
      pkPvClose: () => this.setState({ ppv: '' }),
      pkPv: pvr
        ? {
            t: pvTI ? pvTI.n : pvr.n,
            sub: pvr.catL,
            bgi: pvr.bgi,
            hasIc: !isIt,
            e: (pvTI && pvTI.e) || pvr.e,
            hasE: !!((pvTI && pvTI.e) || pvr.e),
            st: pvIt || pvAs.length ? '' : pvr.st,
            hasSt: !!(!pvIt && !pvAs.length && pvr.st),
            stats: pvTT ? pvTT.stats : pvAs,
            hasStats: !!(pvTT ? pvTT.hasStats : pvAs.length),
            statNote: pvTT ? pvTT.statNote : '',
            whoGroups: pvt ? pvt.whoGroups : [],
            hasWho: !!(pvt && pvt.hasGroups),
            ga: pvTI && pvTI.ga ? pvTI.ga : '',
            hasGa: !!(pvTI && pvTI.ga),
            gaNote:
              pvTI && pvTI.ga
                ? (() => {
                    const bi = pvr.id || ''
                    const prev = pvNames.map((n?: any) => itMap.get(n)).filter(Boolean)
                    const baseGa = (itMap.get(pvr.n) || {}).ga || ''
                    return pvTI.ga === baseGa ? 'Granted at every refine level' : 'Added at this refine level'
                  })()
                : '',
            hasRf: pvVs.length > 0,
            rf: [{ l: 'Base', lv: 0 }, ...pvVs.map((v?: any) => ({ l: '+' + v.rl, lv: v.rl }))].map((o?: any) => ({
              l: o.l,
              bd: o.lv === prLv ? 'var(--ac, oklch(0.8 0.11 75))' : 'var(--line, oklch(0.29 0.012 60))',
              bg: o.lv === prLv ? 'var(--panel2, oklch(0.25 0.012 60))' : 'transparent',
              go: () => this.setState({ prf: { ...(st.prf || {}), [ppv]: o.lv } }),
            })),
            rc: pvTV && pvTV.rc ? 'Refine cost: ' + pvTV.rc : '',
            hasRc: !!(pvTV && pvTV.rc),
          }
        : {},
      pkPickPv: () => {
        if (!pvr || pvDis) return
        if (pvIt) {
          if (pvRemove) setCalc({ it: pCur.filter((n?: any) => n !== pvHeld) })
          else if (pvSwitch) setCalc({ it: pCur.map((n?: any) => (n === pvHeld ? pvTarget : n)) })
          else setCalc({ it: [...pCur, pvTarget] })
        } else pvr.go()
      },
      pkPickLbl: !pvr
        ? ''
        : pvRemove
          ? 'Remove'
          : pvSwitch
            ? 'Switch to ' + lvL
            : pvIt
              ? pvFull
                ? 'Slots full'
                : 'Add' + (prLv ? ' +' + prLv : '')
              : pvr.blk
                ? 'Conflicts with ' + pvr.blk
                : pvr.full
                  ? 'Slots full'
                  : 'Add',
      pkPickBg: pvPrim ? 'var(--ac, oklch(0.8 0.11 75))' : 'transparent',
      pkPickFg: pvPrim ? 'oklch(0.18 0.01 60)' : 'var(--ac, oklch(0.8 0.11 75))',
      pkPickOp: pvDis ? 0.5 : 1,
      pkPickCur: pvDis ? 'not-allowed' : 'pointer',
      abCanAdd: abCur.length < abMax,
      caCanAdd: caCur.length < caMax,
      pkOpen: !!pk,
      pkTitle: isIt ? 'Add items' : isCa ? 'Add combat arts' : 'Add abilities',
      pkSub:
        (chr ? chr.n : '') +
        (isIt
          ? ' · weapons, tomes, shields & accessories'
          : isCa
            ? ' · learnset'
            : ' · learnset, personal & universal'),
      pkCount: pCur.length + '/' + pMax + (isCa && caBonus ? ' (+' + caBonus + ')' : ''),
      pkQ: st.pq || '',
      pkClrDisp: st.pq ? 'block' : 'none',
      onPkClear: (e?: any) => {
        e.preventDefault()
        const inp = e.currentTarget.parentNode.querySelector('input')
        this.setState({ pq: '' }, () => inp && inp.focus())
      },
      onPkQ: (e?: any) => this.setState({ pq: e.target.value }),
      pkClose: () => this.setState({ pk: null, pq: '', pf: 'All', ppv: '', tip: null }),
      pkNone: pRows.length === 0,
      pkRows: pRows,
      pkChipRows: pChipRows,
      openCurCd: () =>
        this.setState({
          cd: {
            w: 'cur',
            q: '',
            t: this.tierFor(
              d,
              B && B.stages.length
                ? B.stages.length > 1
                  ? B.stages[B.stages.length - 1].from
                  : Math.max(B.stages[0].from, B.rl)
                : 1,
            ),
          },
        }),
      openRecCd: () => this.setState({ cd: { w: 'rec', q: '', t: this.tierFor(d, B ? B.rl : 1) } }),
      ...(() => {
        const cd = st.cd
        const rk = B ? B.kr : null
        const sel = cd
          ? cd.w === 'st'
            ? B && B.stages[cd.i]
              ? B.stages[cd.i].k.n
              : ''
            : cd.w === 'cur'
              ? B && B.stages.length
                ? B.stages[B.stages.length - 1].k.n
                : ''
              : rk
                ? rk.n
                : ''
          : ''
        const q = cd ? cd.q.trim().toLowerCase() : ''
        const lvN = cd
          ? cd.w === 'st'
            ? B && B.stages[cd.i]
              ? B.stages[cd.i].lv
              : 1
            : cd.w === 'cur'
              ? B && B.stages.length
                ? B.stages[B.stages.length - 1].lv
                : 1
              : B
                ? B.rl
                : 1
          : 1
        const rows = cd
          ? d.classes
              .filter(
                (k?: any) =>
                  gOk(k) &&
                  (cd.t === 'All' || k.tier === cd.t) &&
                  (!cd.s || cd.s === 'All skills' || (k.comp || '').split(/,\s*/).includes(cd.s)) &&
                  (!q ||
                    k.n.toLowerCase().includes(q) ||
                    (k.comp || '').toLowerCase().includes(q) ||
                    (k.code || '').toLowerCase() === q),
              )
              .map((k?: any) => ({
                n: k.n,
                bgi: 'url(' + IMG('classes', k.n) + ') center/cover no-repeat',
                tier: k.tier,
                tc: TC[k.tier] || t.mu,
                skl: (k.comp || '')
                  .split(/,\s*/)
                  .filter((n?: any) => n && !(d.skillMove || []).includes(n))
                  .map((n?: any) => SKo(n, t.mu)),
                sub: +k.lv > lvN ? 'Requires Lv ' + k.lv : '',
                subOn: +k.lv > lvN,
                badges: [k.arm ? 'ARMOR' : '', k.mounted && !k.fl ? 'MOUNT' : '', k.fl ? 'FLIER' : '']
                  .filter(Boolean)
                  .map((l?: any) => ({ l })),
                lock: uLock(k) ? 'Locked · needs to complete ' + uNeed(k) + ' path' : '',
                isLock: uLock(k),
                op: +k.lv > lvN ? 0.45 : 1,
                cur: 'pointer',
                mark: k.n === sel ? '✓' : '',
                bd:
                  k.n === sel || k.n === (cd.pv || (narrow ? '' : sel))
                    ? 'var(--ac, oklch(0.8 0.11 75))'
                    : 'var(--line, oklch(0.29 0.012 60))',
                rbg:
                  k.n === (cd.pv || (narrow ? '' : sel))
                    ? 'oklch(0.8 0.11 75 / .12)'
                    : 'var(--panel2, oklch(0.25 0.012 60))',
                go: () => this.setState({ cd: { ...cd, pv: k.n } }),
              }))
          : []
        const pvN = cd ? cd.pv || (narrow ? '' : sel) : ''
        const tp = pvN && d.classes.some((x?: any) => x.n === pvN) ? this.classTip(pvN) : null
        const pickCls = (n?: any) => {
          const f = cd.w === 'st' ? vals.stageLocked[cd.i].onK : cd.w === 'cur' ? vals.onCurK : vals.onRk
          f({ target: { value: n } })
          this.setState({ cd: null, tip: null })
        }
        const isSel = pvN === sel
        if (narrow && tp) this.sk = 'c' + pvN
        return {
          cdW: narrow ? 'min(640px,100%)' : 'min(1040px,100%)',
          cdCols: narrow ? 'minmax(0,1fr)' : 'minmax(0,1fr) 400px',
          cdBodyH: narrow ? 'min(520px,calc(100vh - 260px))' : 'min(540px,calc(100vh - 230px))',
          cdSplit: !narrow,
          cdSheet: narrow && !!tp,
          cdTf: narrow && tp && this.state.smin === 'c' + pvN ? 'translateY(calc(100% - 56px))' : 'translateY(0)',
          cdPv: tp || {},
          cdPvOn: !!tp,
          cdPvOff: !tp,
          cdPickPv: () => pickCls(pvN),
          cdPickLbl: isSel ? 'Keep this class' : 'Select ' + pvN,
          cdPickBg: isSel ? 'transparent' : 'var(--ac, oklch(0.8 0.11 75))',
          cdPickFg: isSel ? 'var(--ac, oklch(0.8 0.11 75))' : 'oklch(0.18 0.01 60)',
          cdPvClose: () => this.setState({ cd: { ...cd, pv: '' } }),
          cdOpen: !!cd,
          cdTitle:
            cd && cd.w === 'rec'
              ? 'Recruited class'
              : cd && cd.w === 'st'
                ? 'Class · stage ' + (cd.i + 1)
                : 'Current class',
          cdCount: rows.length + '',
          cdQ: cd ? cd.q : '',
          cdSk: (cd && cd.s) || 'All skills',
          onCdSk: (e?: any) => this.setState({ cd: { ...cd, s: e.target.value } }),
          cdSkAll: () => this.setState({ cd: { ...cd, s: 'All skills' } }),
          cdSkAllOn: !cd || !cd.s || cd.s === 'All skills',
          cdSkAllBd: !cd || !cd.s || cd.s === 'All skills' ? t.ac : t.line,
          cdSkAllBg: !cd || !cd.s || cd.s === 'All skills' ? t.panel2 : 'transparent',
          cdSkIcons: (d.skillOrder || [])
            .filter((n?: any) => d.classes.some((k?: any) => (k.comp || '').split(/,\s*/).includes(n)))
            .map((n?: any) => {
              const cur = (cd && cd.s) || 'All skills',
                on = cur === n
              return {
                n,
                bgi: SK(n),
                ...this.hov(n, (x?: any) => this.skillTip(x)),
                on,
                bd: on ? t.ac : t.line,
                bg: on ? t.panel2 : 'transparent',
                op: cur === 'All skills' || on ? 1 : 0.5,
                click: () => this.setState({ cd: { ...cd, s: on ? 'All skills' : n } }),
              }
            }),
          cdSkOpts: [
            'All skills',
            ...(d.skillOrder || []).filter((n?: any) => d.classes.some((k?: any) => (k.comp || '').split(/,\s*/).includes(n))),
          ],
          onCdQ: (e?: any) => this.setState({ cd: { ...cd, q: e.target.value } }),
          cdClose: () => this.setState({ cd: null, tip: null }),
          cdRows: rows,
          cdNone: !!cd && !rows.length,
          cdChips: ['All', ...TIERS.filter((g?: any) => P >= 3 || !['Master', 'Divine'].includes(g))].map((g?: any) => {
            const on = cd && cd.t === g
            return {
              l: g,
              bd: on ? 'var(--ac, oklch(0.8 0.11 75))' : 'var(--line, oklch(0.29 0.012 60))',
              bg: on ? 'var(--panel2, oklch(0.25 0.012 60))' : 'transparent',
              fg: on ? 'var(--tx, oklch(0.94 0.008 80))' : 'var(--mu, oklch(0.7 0.01 70))',
              go: () => this.setState({ cd: { ...cd, t: g } }),
            }
          }),
          rkTier: rk ? rk.tier : '',
          rkTc: rk ? TC[rk.tier] || t.mu : t.mu,
        }
      })(),
      openAb: () => this.setState({ pk: 'ab', pq: '', pf: 'All' }),
      openCa: () => this.setState({ pk: 'ca', pq: '', pf: 'All' }),
    }
    const vals: Record<string, any> = {
      ...base,
      infoBtnD: narrow ? 'flex' : 'none',
      infoD: !narrow ? 'flex' : 'none',
      infoB: !narrow ? 'block' : 'none',
      infoG: !narrow ? 'grid' : 'none',
      ...(() => {
        const it = st.invTab || 'cls'
        const T: any = [
          ['cls', 'Class'],
          ['ab', 'Abilities'],
          ['ca', 'Arts'],
          ['it', 'Items'],
        ]
        return {
          invTabsOn: narrow,
          invTabs: T.map(([k, l]: any) => ({
            l,
            on: it === k,
            bg: it === k ? t.panel2 : 'transparent',
            fg: it === k ? t.tx : t.mu,
            click: () => this.setState({ invTab: k }),
          })),
          invD: Object.fromEntries(T.map(([k]: any) => [k, !narrow || it === k ? 'flex' : 'none'])),
        }
      })(),
      navOptOn: !narrow,
      railTf: 'none',
      railEnter: () => {
        this.rHov = true
        this.railPing()
      },
      railLeave: () => {
        this.rHov = false
        this.railPing()
      },
      bdMvD: narrow ? 'none' : 'block',
      bdCols: narrow ? 'repeat(2,minmax(0,1fr))' : 'repeat(auto-fill,minmax(min(100%,230px),1fr))',
      rvOn: narrow,
      rvOpts: [
        ['List', 'list'],
        ['Grid', 'grid'],
      ].map(([l, v]: any) => {
        const on = (st.rview || 'list') === v
        return { l, on, bg: on ? t.panel2 : 'transparent', fg: on ? t.tx : t.mu, click: () => this.save({ rview: v }) }
      }),
      rGridOn: narrow && st.rview === 'grid',
      rListOn: !(narrow && st.rview === 'grid'),
      rCols:
        narrow && st.rview === 'grid' ? 'repeat(3,minmax(0,1fr))' : 'repeat(auto-fill,minmax(min(100%,230px),1fr))',
      rGap: narrow && st.rview === 'grid' ? '10px' : '12px',
      handOptOn: narrow,
      handOpts: [
        ['Left', 'left'],
        ['Right', 'right'],
      ].map(([l, v]: any) => {
        const on = (st.hand || 'right') === v
        return { l, on, bg: on ? t.panel2 : 'transparent', fg: on ? t.tx : t.mu, click: () => this.save({ hand: v }) }
      }),
      handSelf: lh ? 'flex-start' : 'flex-end',
      handMargin: lh ? '-30px 0 -10px -12px' : '-30px -12px -10px 0',
      handDir: lh ? 'row-reverse' : 'row',
      fabL: 'auto',
      fabR: '14px',
      handML: lh ? '0' : 'auto',
      handMR: lh ? 'auto' : '0',
      handEnd: lh ? 'flex-start' : 'flex-end',
      navOpts: [
        ['Sidebar', false],
        ['Top tabs', true],
      ].map(([l, v]: any) => {
        const on = navTop === v
        return { l, on, bg: on ? t.panel2 : 'transparent', fg: on ? t.tx : t.mu, click: () => this.save({ navTop: v }) }
      }),
      ...abVals,
      ...itVals,
      ...pkVals,
      themeOpts: Object.keys(THEMES).map((k?: any) => {
        const x = THEMES[k],
          on = k === thn
        return {
          k,
          on,
          bd: on ? t.ac : t.line,
          bg: on ? t.panel2 : 'transparent',
          fg: on ? t.tx : t.mu,
          c1: x.bg,
          c2: x.panel2,
          c3: x.ac,
          click: () => this.save({ theme: k }),
        }
      }),
      stopClick: (e?: any) => e.stopPropagation(),
      partName: PN[P],
      partColor: PC[P],
      routeLabel,
      needPick: !st.picked,
      pickOpts: [
        ['Prologue (in progress)', 0, 'All'],
        ['Cai', 1, 'Cai'],
        ['Dietrich', 1, 'Dietrich'],
        ['Theodora', 1, 'Theodora'],
        ['Leda', 1, 'Leda'],
      ].map(([l, p, rt]: any) => ({
        l,
        click: () => {
          try {
            localStorage.setItem('weave-codex-picked', '1')
          } catch (e: any) {}
          this.save({ part: p, route: rt })
          this.setState({ picked: true })
        },
      })),
      availN: avail.length,
      sealedN: sealed.length,
      overviewSub: sealed.length
        ? `${sealed.length} more join in later parts on ${R === 'All' ? 'any route' : R + "'s route"}. Move the progress stepper as your playthrough advances — nothing past your current part is revealed.`
        : 'Every unit on this route is revealed.',
      topGrowth: avail
        .filter((c?: any) => c.g)
        .sort((a?: any, b?: any) => tot(b) - tot(a))
        .slice(0, 5)
        .map((c?: any) => ({ n: c.n, tot: tot(c), w: (tot(c) / 500) * 100 + '%', open: open(c.n) })),
      hasTeaser: !hideLocked && sealed.length > 0,
      teaser: sealed.slice(0, 8).map(card),
      goCalc: () => this.save({ screen: 'calc' }),
      goInv: () => this.jumpTo('b-inv'),
      chD: { gro: (st.chTab || 'gro') === 'gro' ? 'flex' : 'none', exp: st.chTab === 'exp' ? 'flex' : 'none' },
      chartJumps: [
        ['Growth heatmap', 'gro'],
        ['Expected stats', 'exp'],
      ].map(([l, k]: any) => {
        const on = (st.chTab || 'gro') === k
        return { l, on, bg: on ? t.panel2 : 'transparent', fg: on ? t.tx : t.mu, go: () => this.setState({ chTab: k }) }
      }),
      goSaved: () => this.jumpTo('b-saved'),
      // roster
      q: st.q,
      onQ: (e?: any) => this.setState({ q: e.target.value }),
      qClrDisp: st.q ? 'block' : 'none',
      onQClear: (e?: any) => {
        e.preventDefault()
        const inp = e.currentTarget.parentNode.querySelector('input')
        this.setState({ q: '' }, () => inp && inp.focus())
      },
      recChips: [
        ['all', 'All'],
        ['star', 'Starred'],
        ['yes', 'Recruited'],
        ['no', 'Unrecruited'],
      ].map(([id, l]: any) => {
        const on = (st.rf || 'all') === id
        return {
          l,
          bg: on ? t.panel2 : 'transparent',
          bd: on ? t.ac : t.line,
          fg: on ? t.tx : t.mu,
          click: () => this.setState({ rf: id }),
        }
      }),
      sortChips: [
        ['ren', 'Renown'],
        ['ch', 'Chapter'],
      ].map(([id, l]: any) => {
        const on = (st.sort || 'ren') === id
        return {
          l,
          bg: on ? t.panel2 : 'transparent',
          bd: on ? t.ac : t.line,
          fg: on ? t.tx : t.mu,
          click: () => this.save({ sort: id }),
        }
      }),
      typeChips: ['All', 'Lords', 'Units'].map((l?: any) => ({
        l,
        bg: st.type === l ? t.panel2 : 'transparent',
        bd: st.type === l ? t.ac : t.line,
        fg: st.type === l ? t.tx : t.mu,
        click: () => this.setState({ type: l }),
      })),
      roster: ((SR?: any) =>
        d.chars
          .filter(onR)
          .filter((c?: any) => c.part <= P && !gone(c))
          .filter((c?: any) => {
            const rf = st.rf || 'all'
            if (rf === 'all') return true
            if (rf === 'star') return (st.starred || []).includes(c.n)
            const r = isRec(c) && c.part <= P && !gone(c)
            return rf === 'yes' ? r : !r && c.part <= P && !gone(c)
          })
          .filter((c?: any) => !st.q || (c.part <= P && (c.n + ' ' + c.fac).toLowerCase().includes(st.q.toLowerCase())))
          .filter((c?: any) => !(hideLocked && c.part > P))
          .sort(
            (a?: any, b?: any) =>
              +(a.part > P) + 2 * +gone(a) - (+(b.part > P) + 2 * +gone(b)) ||
              reqKey(a)[0] - reqKey(b)[0] ||
              +(a.type === 'Unit') - +(b.type === 'Unit') ||
              reqKey(a)[st.sort !== 'ch' ? 2 : 1] - reqKey(b)[st.sort !== 'ch' ? 2 : 1] ||
              reqKey(a)[st.sort !== 'ch' ? 1 : 2] - reqKey(b)[st.sort !== 'ch' ? 1 : 2] ||
              reqKey(a)[3] - reqKey(b)[3] ||
              a.n.localeCompare(b.n),
          )
          .map(card))(st.starred || []),
      rosterSub: `${avail.filter(isRec).length} recruited / ${avail.length} units · sorted by part, ${st.sort !== 'ch' ? 'renown, chapter' : 'chapter, renown'}, support${R === 'All' ? ' (easiest route)' : ''}`,
      isOverview: st.screen === 'overview',
      isRoster: st.screen === 'roster',
      isProfile: st.screen === 'profile',
      isCalc: st.screen === 'calc',
      isCompare: st.screen === 'compare',
      isCharts: st.screen === 'charts',
      isMatch: st.screen === 'match',
      isGlossary: st.screen === 'glossary',
      backRoster: () => this.save({ screen: 'roster' }),
      lsHead: ['Category', 'D', 'C', 'B', 'A', 'S'],
      // calc
      calcC: calc.c,
      calcK: calc.k,
      calcM: calc.m,
      calcPathLbl: B ? B.stages.map((x?: any) => x.k.n).join(' → ') : calc.k,
      calcMLabel: B && B.sp.length ? ' · ' + (calc.m === 'None' ? 'No mount' : calc.m) : '',
      mountOk: !!(B && B.sp.length),
      mountSpLbl: B ? B.sp.join(' / ') : '',
      calcLv: lv,
      calcCharOpts: calcChars.map((c?: any) => c.n),
      classGroups: TIERS.map((g?: any) => ({
        t: g,
        items: d.classes.filter((k?: any) => k.tier === g && gOk(k)).map((k?: any) => k.n),
      })).filter((g?: any) => g.items.length),
      mountOpts: d.mounts.filter((m?: any) => m.n === 'None' || (B && B.sp.includes(m.sp))).map((m?: any) => m.n),
      calcQVal: st.calcQ == null ? cName : st.calcQ,
      calcClrDisp: (st.calcQ == null ? cName : st.calcQ) ? 'block' : 'none',
      onCalcClear: (e?: any) => {
        e.preventDefault()
        const inp = e.currentTarget.parentNode.querySelector('input')
        this.setState({ calcQ: '' }, () => inp && inp.focus())
      },
      onCalcInput: (e?: any) => this.setState({ calcQ: e.target.value }),
      onCalcFocus: (e?: any) => e.target.select(),
      onCalcBlur: () => this.setState({ calcQ: null }),
      onCalcSearch: (e?: any) => {
        const q = e.target.value.trim().toLowerCase()
        const n = calcChars.map((c?: any) => c.n).find((o?: any) => o.toLowerCase() === q)
        if (n && n !== cName) {
          this.setState({ calcQ: null })
          vals.onCalcC({ target: { value: n } })
        } else this.setState({ calcQ: e.target.value })
      },
      onCalcC: (e?: any) => {
        const n = e.target.value
        const dr: Record<string, any> = { ...drafts }
        if (touched(calc, st.bnameC === calc.c ? st.bname : null))
          dr[calc.c] = { calc, bname: st.bnameC === calc.c ? st.bname : null }
        else delete dr[calc.c]
        const nx = dr[n]
        this.setState({ bname: nx ? nx.bname : null, bnameC: n })
        this.save({ calc: nx ? nx.calc : pristine(n), drafts: dr })
      },
      resetCalc: () => {
        {
          const dr: Record<string, any> = { ...drafts }
          delete dr[calc.c]
          this.setState({ bname: null })
          this.save({ calc: pristine(calc.c), drafts: dr })
        }
      },
      bnameVal,
      defName,
      onBname: (e?: any) => this.setState({ bname: e.target.value, bnameC: calc.c }),
      onCalcK: (e?: any) => setCalc({ k: e.target.value }),
      ...(() => {
        const ss = B ? B.stages : [],
          L = ss.length - 1,
          cur: any = ss[L] || { k: { n: '' }, from: 1, lv: 1 }
        const upd = (f?: any, ex?: any) => {
          const n = (calc.stages || []).map((x?: any) => ({ ...x }))
          n.forEach((x?: any, i?: any) => {
            if (i < n.length - 1 && x.m === undefined) x.m = ss[i] && ss[i].mo ? ss[i].mo.n : 'None'
          })
          const r = f(n)
          setCalc({ stages: n, lv: n[n.length - 1].lv, ...(ex ? ex : {}), ...(r || {}) })
        }
        return {
          curTier: cur.k.tier || '',
          curTc: TC[cur.k.tier] || t.mu,
          stageLocked: ss.slice(0, L).map((x?: any, i?: any) => ({
            tier: x.k.tier,
            tc: TC[x.k.tier] || t.mu,
            idx: i + 1,
            k: x.k.n,
            ...uW(x.k),
            range: `Lv ${x.from}–${x.lv}`,
            mOn: mountSp(x.k).length > 0,
            mVal: x.mo ? x.mo.n : 'None',
            mOpts: d.mounts.filter((m?: any) => m.n === 'None' || mountSp(x.k).includes(m.sp)).map((m?: any) => m.n),
            onM: (e?: any) =>
              upd((n?: any) => {
                n[i].m = e.target.value
              }),
            gain: '+' + x.n,
            first: i === 0,
            editable: i > 0,
            onK: (e?: any) =>
              upd((n?: any) => {
                n[i].k = e.target.value
              }),
            openCd: () => this.setState({ cd: { w: 'st', i, q: '', t: this.tierFor(d, x.from) } }),
          })),
          curIdx: L + 1,
          curFirst: L === 0,
          curNotFirst: L > 0,
          curK: cur.k.n,
          curBgi: 'url(' + IMG('classes', cur.k.n) + ') center/cover no-repeat',
          curWarn: uLock(cur.k),
          curWarnTxt: uW(cur.k).warnTxt,
          curEnter: uW(cur.k).enter,
          curLeave: uW(cur.k).leave,
          curReqs: uW(cur.k).reqs,
          curFrom: L === 0 ? Math.max(cur.from, B ? B.rl : 1) : cur.from,
          curGain: '+' + (cur.lv - (L === 0 ? Math.max(cur.from, B ? B.rl : 1) : cur.from)) + ' lv',
          onCurK: (e?: any) =>
            upd((n?: any) => {
              const nk = d.classes.find((y?: any) => y.n === e.target.value)
              n[n.length - 1].k = e.target.value
              const mo = d.mounts.find((y?: any) => y.n === calc.m)
              if (mo && nk && !mountSp(nk).includes(mo.sp)) return { m: 'None', ms: '' }
            }),
          curDec: () =>
            upd((n?: any) => {
              const l = n[n.length - 1]
              l.lv = Math.max(L === 0 ? Math.max(cur.from, B ? B.rl : 1) : cur.from, cur.lv - 1)
            }),
          curInc: () =>
            upd((n?: any) => {
              n[n.length - 1].lv = Math.min(99, cur.lv + 1)
            }),
          onCurLv: (e?: any) =>
            upd((n?: any) => {
              n[n.length - 1].lv = +e.target.value
            }),
          tierJumps: [
            ['Beginner', 5],
            ['Specialty', 20],
            ['Advanced', 35],
            ['Master', 45],
          ].map(([t, v]: any) => {
            const ok = v >= (L === 0 ? Math.max(cur.from, B ? B.rl : 1) : cur.from)
            return {
              label: t + ' ' + v,
              tip: 'Set to Lv ' + v + ' (' + t + ' class requirement)',
              bd: cur.lv === v ? 'var(--ac, oklch(0.8 0.11 75))' : 'var(--line, oklch(0.29 0.012 60))',
              bg: cur.lv === v ? 'var(--panel2, oklch(0.25 0.012 60))' : 'transparent',
              op: ok ? 1 : 0.4,
              click: () =>
                upd((n?: any) => {
                  n[n.length - 1].lv = v
                }),
            }
          }),
          addStage: () => {
            upd((n?: any) => {
              const l = n[n.length - 1]
              l.m = calc.m
              n.push({ k: l.k, lv: l.lv })
            })
            this.setState({ cd: { w: 'cur', q: '', t: this.tierFor(d, cur.lv) } })
          },
          canAdd: cur.lv < 99,
          canUndo: L > 0,
          undoStage: () =>
            upd((n?: any) => {
              n.pop()
              const l = n[n.length - 1]
              const pm = l.m
              delete l.m
              if (pm !== undefined) return { m: pm, ms: '' }
            }),
          onCalcM: (e?: any) => {
            const v = e.target.value
            if (calc.stages && calc.stages.length > 1) upd(() => ({ m: v, ms: '' }))
            else setCalc({ m: v, ms: '' })
          },
          pathLbl: ss.map((x?: any) => x.k.n).join(' → '),
        }
      })(),
      onCalcLv: (e?: any) => setCalc({ lv: +e.target.value }),
      calcRows,
      calcTotal: B ? B.tt : 0,
      calcSplit: B ? `${B.ta} char + ${B.tb} class + ${B.tm} mount` : '',
      projStart:
        B && B.ss
          ? `Lv ${B.rl} start: ${B.ss.note}${B.ss.auto ? ' (±1 noise expected)' : ''}. Then expected growth per level (personal + class from Lv 6), class bonus swaps and mount stats.`
          : 'No base stats recorded for this unit — columns show points gained only.',
      projAvg: `Expected growth summed over levels gained after the pick level, then every full 100% = +1 (rounded down).`,
      hasMst: !!(B && B.m),
      rlShow: !!(B && B.canRec),
      rlVal: B ? B.rl : 1,
      rkVal: B ? B.kr.n : '',
      rkOpts: d.classes.filter(gOk).map((k?: any) => k.n),
      onRk: (e?: any) => setCalc({ rk: e.target.value }),
      rlMax: 99,
      rlLocked: !!(B && B.stages.length > 1),
      rlOp: B && B.stages.length > 1 ? 0.5 : 1,
      rlPe: B && B.stages.length > 1 ? 'none' : 'auto',
      rlTip: B && B.stages.length > 1 ? 'Locked once a second class stage is added' : '',
      rlDec: () => setRlc((B ? B.rl : 1) - 1),
      rlInc: () => setRlc((B ? B.rl : 1) + 1),
      rlKeys: B
        ? [...new Set<any>([1, ...(B.c.rd || []).map((x?: any) => x.lv)])]
            .sort((a?: any, b?: any) => a - b)
            .map((lv?: any) => ({
              lv,
              go: () => setRlc(lv),
              bg: B.rl === lv ? 'var(--ac, oklch(0.8 0.11 75))' : 'transparent',
              fg: B.rl === lv ? 'oklch(0.18 0.01 60)' : 'var(--tx, oklch(0.94 0.008 80))',
            }))
        : [],
      onRl: (e?: any) => setRlc(+e.target.value),
      abNoteOn: ABS.length > 0,
      abNote: ABS.join(' · '),
      calcMov: B && B.k.mov ? (isNaN(+B.k.mov) ? B.k.mov : String(+B.k.mov + LM.mov + AMOV)) : '—',
      calcMovBonus: B
        ? [
            /brio/i.test(B.c.pa || '') &&
              !AMOV && {
                l: 'Brio',
                tip: B.c.n + "'s personal ability Brio — Mov bonus (value not recorded in the data)",
                col: 'oklch(0.76 0.1 40)',
              },
            B.k.mounted &&
              !B.k.fl && {
                l: 'Cavalry Move',
                tip: B.k.n + ' is a cavalry class — may grant Cavalry Move (value not recorded in the data)',
                col: 'oklch(0.78 0.12 150)',
              },
            B.k.arm &&
              !LM.mov && {
                l: 'Armored Move',
                tip: B.k.n + ' is an armored class — may grant Armored Move (effect value not recorded in the data)',
                col: 'oklch(0.74 0.1 185)',
              },
            ...LM.chips,
            ...(B.m
              ? (B.m.ab || '')
                  .split(',')
                  .map((x?: any) => x.trim())
                  .map((n?: any) => d.paired.find((p?: any) => p.n === n))
                  .filter((p?: any) => p && /Mov \+(\d+)/.test(p.e))
                  .map((p?: any) => ({
                    l: p.n + ' +' + /Mov \+(\d+)/.exec(p.e)![1],
                    tip: B.m.n + ' can have ' + p.n + ': ' + p.e,
                    col: 'oklch(0.74 0.1 300)',
                  }))
              : []),
          ].filter(Boolean)
        : [],
      calcMovMax: (() => {
        if (!B || !B.k.mov || !B.m) return ''
        const add = (B.m.ab || '')
          .split(',')
          .map((x?: any) => x.trim())
          .map((n?: any) => d.paired.find((p?: any) => p.n === n))
          .filter((p?: any) => p && /Mov \+(\d+)/.test(p.e))
          .reduce((a?: any, p?: any) => a + +/Mov \+(\d+)/.exec(p.e)![1], 0)
        return add ? '→ ' + (+B.k.mov + LM.mov + AMOV + add) + ' with mount skill' : ''
      })(),
      calcMovNote: B
        ? B.k.mov
          ? 'from ' +
            B.k.n +
            (LM.mov + AMOV && !isNaN(+B.k.mov) ? ' (' + B.k.mov + ' +' + (LM.mov + AMOV) + ' ability)' : '')
          : 'not recorded for ' + B.k.n
        : '',
      pBarFlex: narrow ? '1 1 0' : '1 1 110px',
      pBarOrder: narrow ? 1 : 0,
      tk28: narrow ? '36px' : '28px',
      tk24: narrow ? '32px' : '24px',
      tk30: narrow ? '36px' : '30px',
      pBarSpacer: narrow ? 'none' : 'block',
      pValFlex: narrow ? '1 1 0' : '1 1 220px',
      hasAb: AB9.some(Boolean),
      hasCf: calcRows.some((r?: any) => r.cf !== '—'),
      hasMn: calcRows.some((r?: any) => r.mn !== '—'),
      dskDisp: narrow ? 'none' : 'grid',
      narDisp: narrow ? 'flex' : 'none',
      hdrDisp: narrow ? 'none' : 'flex',
      tripCol: 'auto',
      statCols: narrow
        ? 'repeat(' +
          (2 +
            (B && B.m ? 1 : 0) +
            (calcRows.some((r?: any) => r.cf !== '—') ? 1 : 0) +
            (AB9.some(Boolean) ? 1 : 0) +
            (calcRows.some((r?: any) => r.mn !== '—') ? 1 : 0)) +
          ',minmax(0,1fr))'
        : '48px minmax(0,1fr)' +
          (B && B.m ? ' 48px' : '') +
          (calcRows.some((r?: any) => r.cf !== '—') ? ' 48px' : '') +
          (AB9.some(Boolean) ? ' 48px' : '') +
          (calcRows.some((r?: any) => r.mn !== '—') ? ' 48px' : '') +
          ' max-content',
      viewBars: view === 'Stacked bars',
      viewLedger: view === 'Ledger' && !narrow,
      ledgerCardsOn: view === 'Ledger' && narrow,
      ledgerCards: calcRows.map((r?: any) => ({
        s: r.s,
        cells: [
          ['Char', r.a, 'var(--ac, oklch(0.8 0.11 75))', 500],
          ['Class', r.bs, 'oklch(0.74 0.1 185)', 500],
          ['Mount', r.ms, 'oklch(0.74 0.1 300)', 500],
          ['Bonus', r.abD, 'oklch(0.78 0.12 150)', 500],
          ['Total', r.t, 'var(--tx, #eee)', 600],
          ['Class flat', r.cf, 'oklch(0.74 0.1 185)', 500],
          ['Class min', r.mn, 'var(--ac, oklch(0.8 0.11 75))', 500],
          ['Base', r.baseV, 'var(--mu, oklch(0.7 0.01 70))', 500],
          ['Below avg', r.lo, 'oklch(0.74 0.12 30)', 500],
          ['Average', r.proj, 'var(--ac, oklch(0.8 0.11 75))', 600],
          ['Above avg', r.hi, 'oklch(0.78 0.12 150)', 500],
        ].map(([l, v, c, fw]: any) => ({ l, v, c, fw })),
      })),
      ledgerHead: [
        'Stat',
        'Char',
        'Class',
        'Mount',
        'Bonus',
        'Total',
        'Class flat',
        'Class min',
        'Base',
        'Below avg',
        'Average',
        'Above avg',
      ],
      saveLabel: exists ? (nameSame ? 'Saved ✓' : 'Rename build') : lb ? 'Update build' : 'Save build',
      saveNewOn: !!lb,
      saveBg: lb ? 'var(--ac, oklch(0.8 0.11 75))' : 'transparent',
      saveFg: lb ? 'oklch(0.18 0.01 60)' : 'var(--ac, oklch(0.8 0.11 75))',
      saveNew: () => mkNew(),
      cmpHere: () => {
        let id: any,
          nb = builds
        if (exb) id = exb.id
        else {
          id = Date.now()
          nb = [
            ...builds,
            {
              id,
              c: calc.c,
              k: calc.k,
              m: calc.m,
              lv,
              stages: calc.stages,
              rl: calc.rl || 1,
              rk: calc.rk,
              ab: calc.ab || [],
              ca: calc.ca || [],
              it: calc.it || [],
              ms: msCur,
              name: finalName,
            },
          ]
        }
        window.scrollTo(0, 0)
        const r = this.rootRef.current
        if (r) r.scrollTop = 0
        this.setState({ bname: null })
        this.save({
          screen: 'compare',
          builds: nb,
          cmp: [...st.cmp.filter((x?: any) => x !== id), id].slice(-4),
          calc: { ...calc, bid: id },
          ...(st.cchars && !st.cchars.includes(calc.c) ? { cchars: [...st.cchars, calc.c] } : {}),
        })
      },
      saveBuild: () => {
        if (exists) {
          if (!nameSame) this.save({ builds: builds.map((x?: any) => (x.id === exb.id ? { ...x, name: finalName } : x)) })
          return
        }
        if (lb) {
          this.setState({ bname: null })
          this.save({
            builds: builds.map((x?: any) =>
              x.id === lb.id
                ? {
                    ...x,
                    k: calc.k,
                    m: calc.m,
                    lv,
                    stages: calc.stages,
                    rl: calc.rl || 1,
                    rk: calc.rk,
                    ab: calc.ab || [],
                    ca: calc.ca || [],
                    it: calc.it || [],
                    ms: msCur,
                    name: finalName,
                  }
                : x,
            ),
          })
          return
        }
        mkNew()
      },
      buildsN: buildV.filter(bF).length,
      clrItems: CLR.map((x?: any) => ({
        label: x.label,
        fg: x.k === 'all' ? 'oklch(0.75 0.14 25)' : 'var(--tx, #eee)',
        bd: x.k === 'all' ? 'oklch(0.62 0.17 25)' : t.line,
        ask: () => this.setState({ clr: x.k }),
      })),
      clrOpen: !!clrX,
      clrTitle: clrX ? 'Clear ' + clrX.label.toLowerCase() + '?' : '',
      clrBody: clrX ? clrX.body : '',
      clrBtn: clrX ? 'Delete ' + (clrX.k === 'all' ? 'everything' : clrX.label.toLowerCase()) : '',
      clrCancel: () => this.setState({ clr: null }),
      clrStop: (e?: any) => e.stopPropagation(),
      clrDo: () => {
        const x = CLR.find((y?: any) => y.k === this.state.clr)
        if (x) this.save({ ...x.p, clr: null })
        else this.setState({ clr: null })
      },
      codeOpen: !!st.codeO,
      codeVal: st.codeV ?? '',
      codeMsg: st.codeM || 'Paste a code copied from a build card.',
      toggleCode: () => this.setState((s?: any) => ({ codeO: !s.codeO, codeM: '' })),
      onCode: (e?: any) => this.setState({ codeV: e.target.value }),
      codeKey: (e?: any) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          this.codeMake(this.state.d)
        }
      },
      codeMake: () => this.codeMake(d),
      txtOpen: !!st.txtO,
      txtVal: st.txtV ?? '',
      txtMsg: st.txtM || '',
      toggleTxt: () =>
        this.setState((s?: any) =>
          s.txtO ? { txtO: false } : { txtO: true, txtV: this.fmtAll(d, s.builds || []), txtM: '' },
        ),
      resetTxt: () => this.setState({ txtV: this.fmtAll(d, this.state.builds || []), txtM: '' }),
      onTxt: (e?: any) => this.setState({ txtV: e.target.value }),
      copyTxt: () => {
        const v = this.state.txtV || ''
        this.copyText(v).then((ok?: any) =>
          this.setState({ txtM: ok ? 'Copied' : 'Copy blocked — select the text and press Ctrl/Cmd+C' }),
        )
      },
      importTxt: () => {
        const r = this.parseTxt(d, this.state.txtV || '', this.state.builds || [])
        if (r.add.length) this.save({ builds: [...(this.state.builds || []), ...r.add] })
        this.setState({
          txtM:
            'Imported ' +
            r.add.length +
            (r.dup ? ' · ' + r.dup + ' duplicate' + (r.dup > 1 ? 's' : '') + ' skipped' : '') +
            (r.bad.length ? " · couldn't read: " + r.bad.join('; ') : ''),
        })
      },
      exportBuilds: () => {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(
          new Blob([JSON.stringify({ app: 'weave-codex', v: 1, builds: st.builds || [] }, null, 1)], {
            type: 'application/json',
          }),
        )
        a.download = 'weave-codex-builds.json'
        document.body.appendChild(a)
        a.click()
        a.remove()
      },
      importBuilds: () => {
        const i = document.createElement('input')
        i.type = 'file'
        i.accept = '.json,application/json'
        i.onchange = () => {
          const f = i.files?.[0]
          if (!f) return
          f.text().then((tx?: any) => {
            try {
              const j = JSON.parse(tx),
                arr = Array.isArray(j) ? j : j.builds
              if (!Array.isArray(arr)) throw 0
              const cur = this.state.builds || []
              const sk2 = (x?: any) => this.nk(d, x)
              const seen = new Set<any>(cur.map(sk2))
              let id = Date.now()
              const add = arr
                .filter((x?: any) => x && x.c && x.k && !seen.has(sk2(x)) && seen.add(sk2(x)))
                .map((x?: any) => ({ ...x, id: id++ }))
              this.save({ builds: [...cur, ...add] })
              alert(
                'Imported ' +
                  add.length +
                  ' build' +
                  (add.length === 1 ? '' : 's') +
                  (arr.length > add.length ? ' (' + (arr.length - add.length) + ' duplicates/invalid skipped)' : ''),
              )
            } catch (e: any) {
              alert('Not a valid builds file.')
            }
          })
        }
        i.click()
      },
      buildsTitle: onlyCur ? 'Saved builds for ' + cName : 'Saved builds',
      bOnlyBg: onlyCur ? t.panel2 : 'transparent',
      bOnlyBd: onlyCur ? t.ac : t.line,
      bOnlyLbl: (onlyCur ? '✓ ' : '') + 'Only ' + cName,
      bOnlyTog: () => this.save({ bOnly: !st.bOnly, bRec: false, bStar: false }),
      bRecBg: st.bRec ? t.panel2 : 'transparent',
      bRecBd: st.bRec ? t.ac : t.line,
      bRecLbl: (st.bRec ? '✓ ' : '') + 'Recruited',
      bRecTog: () => this.save({ bRec: !st.bRec, bOnly: false, bStar: false }),
      bStarBg: st.bStar ? t.panel2 : 'transparent',
      bStarBd: st.bStar ? t.ac : t.line,
      bStarLbl: (st.bStar ? '✓ ' : '') + 'Starred',
      bStarTog: () => this.save({ bStar: !st.bStar, bOnly: false, bRec: false }),
      showCalc: st.screen === 'calc' || inPCalc,
      calcHeadDisp: inPCalc ? 'none' : 'flex',
      calcCharDisp: inPCalc ? 'none' : 'flex',
      calcTop: inPCalc ? '-8px' : '0',
      builds: (() => {
        const disp = buildV
          .filter(bF)
          .slice()
          .sort((a?: any, b?: any) => (b.star ? 1 : 0) - (a.star ? 1 : 0))
        const mv = (id?: any, to?: any) => {
          const ids = disp.map((x?: any) => x.id),
            i = ids.indexOf(id)
          if (i < 0 || to < 0 || to >= ids.length || to === i) return
          ids.splice(i, 1)
          ids.splice(to, 0, id)
          const slots = builds.map((x?: any, j?: any) => (ids.includes(x.id) ? j : -1)).filter((j?: any) => j >= 0)
          const by = Object.fromEntries(builds.map((x?: any) => [x.id, x]))
          const nb = builds.slice()
          ids.forEach((q?: any, k?: any) => {
            nb[slots[k]] = by[q]
          })
          this.save({ builds: nb })
        }
        const di = disp.findIndex((x?: any) => x.id === this.dragId),
          oi = disp.findIndex((x?: any) => x.id === this.overId)
        return disp.map((b?: any, bi?: any) => ({
          abTxt: b.abTxt,
          abShow: b.abShow,
          sh:
            this.dragId != null && this.overId === b.id && oi !== di
              ? (di > oi ? '-5px 0 0 0 ' : '5px 0 0 0 ') + t.ac
              : 'none',
          dim: this.dragId === b.id ? 0.4 : 1,
          left: () => mv(b.id, bi - 1),
          right: () => mv(b.id, bi + 1),
          dStart: (e?: any) => {
            this.dragId = b.id
            e.dataTransfer.effectAllowed = 'move'
            try {
              e.dataTransfer.setData('text/plain', String(b.id))
            } catch (x: any) {}
          },
          dOver: (e?: any) => {
            if (this.dragId != null) {
              e.preventDefault()
              if (this.overId !== b.id) {
                this.overId = b.id
                this.forceUpdate()
              }
            }
          },
          dDrop: (e?: any) => {
            e.preventDefault()
            const id = this.dragId
            this.dragId = null
            this.overId = null
            if (id != null) mv(id, bi)
          },
          dEnd: () => {
            this.dragId = null
            this.overId = null
            this.forceUpdate()
          },
          star: b.star ? '★' : '☆',
          starCol: b.star ? t.ac : t.mu,
          starTip: b.star ? 'Unstar' : 'Star build',
          pathTip: (ev?: any) => {
            const k = 'bp' + b.id
            if (this.state.tip && this.state.tip.raw === k) {
              this.setState({ tip: null })
              return
            }
            const r = ev.currentTarget.getBoundingClientRect(),
              x = Math.max(12, Math.min(r.left, window.innerWidth - 312)),
              below = r.bottom + 160 < window.innerHeight
            this.setState({
              tip: {
                t: 'Class path',
                sub: b.c,
                body:
                  b.x.stages.map((x?: any) => x.k.n).join(' → ') +
                  '\nLv ' +
                  b.x.lv +
                  '\n' +
                  (b.m === 'None' ? 'No mount' : 'Mount: ' + b.m) +
                  (b.x.rl > 1 ? '\nRecruited at Lv ' + b.x.rl : ''),
                bodyCol: 'var(--tx, #eee)',
                note: '',
                who: '',
                whoLbl: '',
                whoGroups: [],
                hasGroups: false,
                x: x + 'px',
                y: (below ? r.bottom + 8 : r.top - 8) + 'px',
                tf: below ? 'none' : 'translateY(-100%)',
                raw: k,
              },
            })
          },
          abTip: (ev?: any) => {
            const k = 'bi' + b.id
            if (this.state.tip && this.state.tip.raw === k) {
              this.setState({ tip: null })
              return
            }
            const r = ev.currentTarget.getBoundingClientRect(),
              x = Math.max(12, Math.min(r.left, window.innerWidth - 312)),
              below = r.bottom + 160 < window.innerHeight
            this.setState({
              tip: {
                t: 'Inventory',
                sub: b.c,
                body: [
                  ['Abilities', b.ab],
                  ['Combat arts', b.ca],
                  ['Items', b.it],
                ]
                  .filter(([l, v]: any) => v && v.length)
                  .map(([l, v]: any) => l + ': ' + v.join(', '))
                  .concat(b.ms ? ['Mount: ' + b.ms] : [])
                  .join('\n'),
                bodyCol: 'var(--tx, #eee)',
                note: '',
                who: '',
                whoLbl: '',
                whoGroups: [],
                hasGroups: false,
                x: x + 'px',
                y: (below ? r.bottom + 8 : r.top - 8) + 'px',
                tf: below ? 'none' : 'translateY(-100%)',
                raw: k,
              },
            })
          },
          askDel: () => this.setState({ delId: b.id }),
          cancelDel: () => this.setState({ delId: null }),
          confirming: st.delId === b.id,
          idle: st.delId !== b.id,
          copyCode: () => {
            const o = builds.find((x?: any) => x.id === b.id)
            const v = o ? this.fmtAll(d, [o]) : ''
            const done = () => {
              this.setState({ cpId: b.id })
              clearTimeout(this.cpT)
              this.cpT = setTimeout(() => this.setState({ cpId: null }), 1500)
            }
            this.copyText(v).then((ok?: any) => (ok ? done() : this.setState({ cpId: null })))
          },
          cpLbl: st.cpId === b.id ? 'Copied ✓' : 'Copy code',
          toggleStar: () => this.save({ builds: builds.map((x?: any) => (x.id === b.id ? { ...x, star: !x.star } : x)) }),
          nm: b.nm,
          dn: b.dn,
          onName: (e?: any) => this.save({ builds: builds.map((x?: any) => (x.id === b.id ? { ...x, name: e.target.value } : x)) }),
          c: b.lk ? 'Sealed unit' : b.c,
          blur: b.lk ? 'blur(4px)' : 'none',
          bgi: b.lk
            ? 'none'
            : 'url(' + IMG('classes', b.x.stages[b.x.stages.length - 1].k.n) + ') center/cover no-repeat',
          kLast: b.x.stages[b.x.stages.length - 1].k.n,
          k: b.x.stages.map((x?: any) => x.k.n).join(' → '),
          m: (b.m === 'None' ? 'No mount' : b.m) + (b.x.rl > 1 ? ' · Rec. Lv ' + b.x.rl : ''),
          lv: b.x.lv,
          tot: b.x.tt,
          bd: b.c === calc.c && b.m === calc.m && sk(b) === sk(calc) ? t.ac : t.line,
          load: () => {
            if (!b.lk) {
              this.setState({ bname: b.name == null ? null : b.name, bnameC: b.c })
              this.save({
                calc: {
                  c: b.c,
                  k: b.k,
                  m: b.m,
                  lv: b.lv,
                  stages: b.stages || null,
                  rl: b.rl || 1,
                  rk: b.rk,
                  ab: b.ab || [],
                  ca: b.ca || [],
                  it: b.it || [],
                  ms: b.ms || '',
                  bid: b.id,
                },
              })
            }
          },
          del: () => this.save({ builds: builds.filter((x?: any) => x.id !== b.id), cmp: st.cmp.filter((i?: any) => i !== b.id) }),
        }))
      })(),
    }
    {
      const mine = buildV.filter((b?: any) => b.c === cName && !b.lk)
      const CC4 = CC
      const bh = st.bhide || []
      const sub = (x?: any) => x.stages.map((s?: any) => s.k.n).join(' → ') + ' · Lv ' + x.lv + (x.m ? ' · ' + x.m.n : '')
      const ser = [
        ...(exists || !B ? [] : [{ lab: 'Current', x: B }]),
        ...mine
          .slice()
          .sort((a?: any, b?: any) => (b.star ? 1 : 0) - (a.star ? 1 : 0))
          .map((b?: any, i?: any) => ({ id: b.id, lab: (b.star ? '★ ' : '') + b.nmShow, x: b.x })),
      ].map((s?: any) => ({ ...s, id: s.id || 'cur', sub: sub(s.x) }))
      const allSer = ser
      const selIds = st.bsel
        ? st.bsel.filter((id?: any) => allSer.some((s?: any) => s.id === id))
        : allSer.slice(0, 4).map((s?: any) => s.id)
      const selSorted = allSer.map((s?: any) => s.id).filter((id?: any) => selIds.includes(id))
      const chips = allSer.map((s?: any) => {
        const ix = selSorted.indexOf(s.id),
          on = ix >= 0,
          col = on ? CC4[ix] : t.mu
        return {
          lab: s.lab,
          sub: s.sub,
          col,
          on,
          bd: on ? col : t.line,
          op: on ? 1 : 0.6,
          dot: on ? col : 'transparent',
          toggle: () => this.save({ bsel: on ? selIds.filter((x?: any) => x !== s.id) : [...selIds, s.id].slice(-4) }),
        }
      })
      const ser2 = selSorted.map((id?: any, ix?: any) => ({ ...allSer.find((s?: any) => s.id === id), col: CC4[ix] }))
      const v = (x?: any, i?: any) => {
        const r = x.rows[i],
          b = r.bv == null ? 0 : r.bv
        return { avg: b + r.up, lo: b + r.lo, hi: b + r.hi, mst: r.mst || 0 }
      }
      const GM = Math.max(1, ...ser2.flatMap((z?: any) => z.x.rows.map((r?: any) => r.t)))
      const cx = 150,
        cy = 150,
        RR = 100,
        pt = (i?: any, f?: any) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / 9
          return [cx + RR * f * Math.cos(a), cy + RR * f * Math.sin(a)]
        },
        P = (a?: any) => a.map((n?: any) => n.toFixed(1)).join(',')
      const gv = (z?: any, i?: any) => z.x.rows[i].t / GM
      const bandOf = (n?: any, f?: any) => {
        const mxs = S.map((s?: any, i?: any) => Math.max(...n.map((z?: any) => f(z, i)))),
          mns = S.map((s?: any, i?: any) => Math.min(...n.map((z?: any) => f(z, i))))
        return { mxs, mns }
      }
      const bb = bandOf(ser2.length ? ser2 : [{ x: { rows: S.map(() => ({ t: 0 })) } }], gv)
      const multi = ser2.length > 1
      vals.bc = {
        toCmp: () => {
          const ids = ser2.map((z?: any) => z.id).filter((id?: any) => id !== 'cur')
          const bs = builds
          const base = st.cchars || [...new Set<any>(bs.filter((b?: any) => st.cmp.includes(b.id)).map((b?: any) => b.c))]
          window.scrollTo(0, 0)
          const r = this.rootRef.current
          if (r) r.scrollTop = 0
          this.save({
            screen: 'compare',
            cchars: base.includes(cName) ? base : [...base, cName],
            cmp: [...st.cmp.filter((x?: any) => !ids.includes(x)), ...ids].slice(-4),
          })
        },
        band: multi
          ? 'M' +
            S.map((s?: any, i?: any) => P(pt(i, bb.mxs[i]))).join(' ') +
            'Z M' +
            S.map((s?: any, i?: any) => P(pt(i, bb.mns[i]))).join(' ') +
            'Z'
          : '',
        dots: multi
          ? ser2.flatMap((z?: any) =>
              S.map((s?: any, i?: any) => {
                const [x, y] = pt(i, gv(z, i))
                return { x, y, col: z.col, ...tipH(s + ': ' + z.x.rows[i].t + '%', z.lab) }
              }),
            )
          : [],
        max: GM,
        hundred: (100 / GM) * 100 + '%',
        bars: S.map((s?: any, i?: any) => ({
          s,
          hundred: (100 / Math.max(100, GM)) * 100 + '%',
          items: ser2.map((z?: any) => ({
            ...tipH(s + ': ' + z.x.rows[i].t + '%', z.lab),
            col: z.col,
            w: Math.min(100, (z.x.rows[i].t / Math.max(100, GM)) * 100) + '%',
            v: z.x.rows[i].t,
          })),
        })),
        show: mine.length > 0,
        chips,
        legend: ser2.map((z?: any) => ({
          ...z,
          ...this.hd(
            ser2.filter((q?: any) => q.id !== 'cur').map((q?: any) => q.id),
            z.id,
          ),
        })),
        cols: `40px repeat(${Math.max(1, ser2.length)},minmax(78px,1fr))`,
        rings: [0.25, 0.5, 0.75, 1].map((f?: any) => S.map((s?: any, i?: any) => P(pt(i, f))).join(' ')),
        axes: S.map((s?: any, i?: any) => {
          const [x, y] = pt(i, 1),
            [lx, ly] = pt(i, 1.16)
          const sp = Math.round((bb.mxs[i] - bb.mns[i]) * GM)
          const on = multi && sp > 0
          return {
            s,
            x,
            y,
            lxp: (lx / 300) * 100 + '%',
            lyp: (ly / 300) * 100 + '%',
            lbl: on ? s + ' Δ' + sp : s,
            col: on ? 'oklch(0.82 0.12 85)' : 'inherit',
            fw: on ? 600 : 500,
            op: on ? 1 : 0.75,
          }
        }),
        series: ser2.map((z?: any) => ({ col: z.col, pts: S.map((s?: any, i?: any) => P(pt(i, z.x.rows[i].t / GM))).join(' ') })),
        rows: [...S, 'Σ'].map((s?: any, i?: any) => {
          const vs =
              i < 9
                ? ser2.map((z?: any) => v(z.x, i))
                : ser2.map((z?: any) => ({
                    avg: sum(S.map((_?: any, k?: any) => v(z.x, k).avg)),
                    lo: null,
                    hi: null,
                    mst: sum(S.map((_?: any, k?: any) => v(z.x, k).mst)),
                  })),
            top = Math.max(...vs.map((q?: any) => q.avg))
          return {
            s,
            cells: vs.map((q?: any) => ({
              avg: q.avg,
              rng: q.lo == null ? '' : q.lo + '–' + q.hi,
              ...mfx(q.mst, q.avg),
              col: q.avg === top && vs.length > 1 ? t.ac : t.tx,
              fw: q.avg === top && vs.length > 1 ? 600 : 400,
            })),
          }
        }),
        noBase: ser2.some((z?: any) => !z.x.ss),
      }
    }
    // compare
    const realU = buildV.filter((b?: any) => !b.lk)
    const cch = st.cchars || [...new Set<any>(realU.filter((b?: any) => st.cmp.includes(b.id)).map((b?: any) => b.c))]
    const virt = cch
      .filter((n?: any) => !realU.some((b?: any) => b.c === n) || (st.bases || []).includes(n))
      .map((n?: any) => {
        const p = pristine(n),
          x = this.buildCalc(d, p)
        return x
          ? { ...p, id: 'base:' + n, x, lk: false, virtual: true, dn: 'Base', nm: 'Base', nmShow: 'Base · Lv 1' }
          : null
      })
      .filter(Boolean)
    {
      vals.cdd = {
        ic: phone ? 'none' : 'inline-block',
        ...(narrow
          ? {
              rows: 'none',
              cc: '1',
              cr: 'auto',
              pc: '1',
              pr: 'auto',
              mc: '1',
              mr: 'auto',
              ac: '1',
              ar: 'auto',
              bc: '1',
              br: 'auto',
              sc: '1',
              sr: 'auto',
              co: 0,
              po: 1,
              so: 2,
              mo: 3,
              ao: 4,
              bo: 5,
            }
          : {
              rows: 'auto 1fr auto auto auto',
              cc: '2',
              cr: '1',
              pc: '1',
              pr: '1 / span 2',
              mc: '1 / -1',
              mr: '3',
              ac: '1 / -1',
              ar: '4',
              bc: '1 / -1',
              br: '5',
              sc: '2',
              sr: '2',
              co: 0,
              po: 0,
              so: 0,
              mo: 0,
              ao: 0,
              bo: 0,
            }),
      }
    }
    {
      const DK = ['table', 'radar', 'bars']
      const sv2 = (st.pcTord || []).filter((k?: any) => DK.includes(k))
      const ord = [...sv2, ...DK.filter((k?: any) => !sv2.includes(k))]
      const pcd: Record<string, any> = {
        over: (e?: any) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
          const k = ord[+getComputedStyle(e.currentTarget).order]
          if (k && this.state.pcOver !== k) this.setState({ pcOver: k })
        },
        end: () => this.setState({ pcDrag: null, pcOver: null }),
      }
      ord.forEach((k?: any, i?: any) => {
        pcd[k] = {
          o: i,
          op: st.pcDrag === k ? 0.45 : 1,
          ol:
            st.pcDrag && st.pcDrag !== k && st.pcOver === k
              ? (ord.indexOf(st.pcDrag) > i ? '-5px 0 0 0 ' : '5px 0 0 0 ') + 'var(--ac, oklch(0.82 0.12 85))'
              : 'none',
          start: (e?: any) => {
            e.dataTransfer.effectAllowed = 'move'
            try {
              e.dataTransfer.setData('text/plain', k)
            } catch (_: any) {}
            this.setState({ pcDrag: k })
          },
          drop: (e?: any) => {
            e.preventDefault()
            const from = st.pcDrag
            if (!from || from === k) {
              this.setState({ pcDrag: null, pcOver: null })
              return
            }
            const o = ord.filter((x?: any) => x !== from)
            o.splice(o.indexOf(k) + (ord.indexOf(from) < ord.indexOf(k) ? 1 : 0), 0, from)
            this.setState({ pcDrag: null, pcOver: null })
            this.save({ pcTord: o })
          },
        }
      })
      vals.pcd = pcd
      const W = (k?: any, df?: any) => {
        const on = st[k] == null ? df : st[k]
        return {
          col: on ? '1 / -1' : 'auto',
          lbl: on ? '⤡ Collapse' : '⤢ Expand',
          tip: on ? 'Back to one column' : 'Span two columns',
          tog: () => this.save({ [k]: !on }),
        }
      }
      const wb = W('pcbWideS', false),
        wt = W('pctWideS', true)
      Object.assign(vals, {
        pcbCol: wb.col,
        pcbWideLbl: wb.lbl,
        pcbWideTip: wb.tip,
        pcbWide: wb.tog,
        pctCol: wt.col,
        pctWideLbl: wt.lbl,
        pctWideTip: wt.tip,
        pctWide: wt.tog,
        pcbVert: !!st.pcbVert,
        pcbHoriz: !st.pcbVert,
        pcbRotLbl: st.pcbVert ? '↔ Horizontal' : '↕ Vertical',
        pcbRotTip: st.pcbVert ? 'Horizontal bars' : 'Vertical bars',
        pcbRotate: () => this.save({ pcbVert: !st.pcbVert }),
        pcbLbl: st.pcbWideS ? 'block' : 'none',
      })
    }
    const usable = [...realU, ...virt]
    const selB = usable.filter((b?: any) => st.cmp.includes(b.id) && cch.includes(b.c)).slice(0, 4)
    const vis = st.cmp.filter((x?: any) => {
      const u = usable.find((q?: any) => q.id === x)
      return u && cch.includes(u.c)
    })
    vals.toProfile = open(st.calc && st.calc.c)
    vals.toProfileLbl = 'View ' + (st.calc && st.calc.c) + '’s profile →'
    vals.noBuilds = cch.length === 0
    const elig = [
      ...new Set<any>(
        d.chars.filter((c?: any) => c.g && !(c.part > P || !onR(c) || (c.pro && (P === 1 || P === 2)))).map((c?: any) => c.n),
      ),
    ]
    vals.addOpts = elig.filter((n?: any) => !cch.includes(n))
    vals.cq = st.cq || ''
    {
      const DK = ['table', 'radar', 'bars']
      const sv2 = (st.cTord || []).filter((k?: any) => DK.includes(k))
      const ord = [...sv2, ...DK.filter((k?: any) => !sv2.includes(k))]
      const ct: Record<string, any> = {
        over: (e?: any) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
          const k = ord[+getComputedStyle(e.currentTarget).order]
          if (k && this.state.tOver !== k) this.setState({ tOver: k })
        },
        end: () => this.setState({ tDrag: null, tOver: null }),
      }
      ord.forEach((k?: any, i?: any) => {
        ct[k] = {
          o: i,
          op: st.tDrag === k ? 0.45 : 1,
          ol:
            st.tDrag && st.tDrag !== k && st.tOver === k
              ? (ord.indexOf(st.tDrag) > i ? '-5px 0 0 0 ' : '5px 0 0 0 ') + 'var(--ac, oklch(0.82 0.12 85))'
              : 'none',
          start: (e?: any) => {
            e.dataTransfer.effectAllowed = 'move'
            try {
              e.dataTransfer.setData('text/plain', k)
            } catch (_: any) {}
            this.setState({ tDrag: k })
          },
          drop: (e?: any) => {
            e.preventDefault()
            const from = st.tDrag
            if (!from || from === k) {
              this.setState({ tDrag: null, tOver: null })
              return
            }
            const o = ord.filter((x?: any) => x !== from)
            o.splice(o.indexOf(k) + (ord.indexOf(from) < ord.indexOf(k) ? 1 : 0), 0, from)
            this.setState({ tDrag: null, tOver: null })
            this.save({ cTord: o })
          },
        }
      })
      vals.ct = ct
      const cW: any = st.cW || {}
      const cwN = narrow
      vals.cwBtn = narrow ? 'none' : 'flex'
      ;[
        ['r', 'radar', 1],
        ['b', 'bars', 2],
        ['t', 'table', 3],
      ].forEach(([p, k, d]: any) => {
        const w = cW[k] || d
        vals[p + 'Wl'] = w
        vals[p + 'Bars'] = '▮'.repeat(w) + '▯'.repeat(3 - w)
        vals[p + 'WideCol'] = cwN ? '1 / -1' : w >= 3 ? '1 / -1' : 'span ' + w
        vals[p + 'Cyc'] = () => this.save({ cW: { ...cW, [k]: w >= 3 ? 1 : w + 1 } })
      })
      vals.bVert = !!st.bVert
      vals.bHoriz = !st.bVert
      vals.bRotLbl = st.bVert ? '↔ Horizontal' : '↕ Vertical'
      vals.bRotTip = st.bVert ? 'Horizontal bars' : 'Vertical bars'
      vals.bRotate = () => this.save({ bVert: !st.bVert })
      vals.bLblDisp = (cW.bars || 2) >= 2 ? 'block' : 'none'
    }
    const cdi = cch.indexOf(this.cDrag),
      coi = cch.indexOf(this.cOver)
    const cmv = (id?: any, to?: any) => {
      const o = cch.filter((x?: any) => x !== id)
      o.splice(to, 0, id)
      this.save({ cchars: o })
    }
    vals.clearAllDisp = cch.length ? 'block' : 'none'
    vals.clearAllCmp = () => this.save({ cchars: [], cmp: [], bases: [] })
    vals.cmpGroups = cch.map((n?: any, ni?: any) => ({
      sh: this.cDrag && this.cOver === n && coi !== cdi ? (cdi > coi ? '-5px 0 0 0 ' : '5px 0 0 0 ') + t.ac : 'none',
      dim: this.cDrag === n ? 0.4 : 1,
      dStart: (e?: any) => {
        this.cDrag = n
        e.dataTransfer.effectAllowed = 'move'
        try {
          e.dataTransfer.setData('text/plain', n)
        } catch (x: any) {}
      },
      dOver: (e?: any) => {
        if (this.cDrag) {
          e.preventDefault()
          if (this.cOver !== n) {
            this.cOver = n
            this.forceUpdate()
          }
        }
      },
      dDrop: (e?: any) => {
        e.preventDefault()
        const id = this.cDrag
        this.cDrag = null
        this.cOver = null
        if (id && id !== n) cmv(id, ni)
        else this.forceUpdate()
      },
      dEnd: () => {
        this.cDrag = null
        this.cOver = null
        this.forceUpdate()
      },
      name: n,
      emptyDisp: realU.some((b?: any) => b.c === n) ? 'none' : 'block',
      empty: 'No saved builds',
      baseDisp: realU.some((b?: any) => b.c === n) && !(st.bases || []).includes(n) ? 'flex' : 'none',
      baseLbl: (st.bases || []).includes(n) ? '− Base' : '+ Base',
      toggleBase: () => {
        const on = (st.bases || []).includes(n),
          id = 'base:' + n
        this.save({
          cchars: cch,
          bases: on ? st.bases.filter((x?: any) => x !== n) : [...(st.bases || []), n],
          cmp: on ? st.cmp.filter((x?: any) => x !== id) : [...vis, id].slice(-4),
        })
      },
      profile: () => {
        this.save({ screen: 'profile', sel: n, ptab: 'info' })
        window.scrollTo(0, 0)
        const rr = this.rootRef.current
        if (rr) rr.scrollTop = 0
      },
      open: () => goCalcFor(n),
      close: () =>
        this.save({
          cchars: cch.filter((x?: any) => x !== n),
          cmp: st.cmp.filter((id?: any) => {
            const b = usable.find((u?: any) => u.id === id)
            return !(b && b.c === n)
          }),
        }),
      builds: usable
        .filter((b?: any) => b.c === n)
        .map((b?: any) => {
          const i = selB.indexOf(b),
            on = i >= 0
          const rmBase = b.virtual && (st.bases || []).includes(n)
          return {
            go: (ev?: any) => {
              ev.stopPropagation()
              if (b.virtual) {
                goCalcFor(n)
                return
              }
              window.scrollTo(0, 0)
              this.setState({ bname: b.name == null ? null : b.name, bnameC: b.c })
              this.save({
                screen: 'calc',
                calc: {
                  c: b.c,
                  k: b.k,
                  m: b.m,
                  lv: b.lv,
                  stages: b.stages || null,
                  rl: b.rl || 1,
                  rk: b.rk,
                  ab: b.ab || [],
                  ca: b.ca || [],
                  it: b.it || [],
                  ms: b.ms || '',
                  bid: b.id,
                },
              })
            },
            rmDisp: rmBase ? 'inline' : 'none',
            rm: (ev?: any) => {
              ev.stopPropagation()
              this.save({ cchars: cch, bases: st.bases.filter((x?: any) => x !== n), cmp: st.cmp.filter((x?: any) => x !== b.id) })
            },
            nm: b.nmShow,
            col: on ? CC[i] : t.mu,
            dot: on ? CC[i] : 'transparent',
            bd: on ? CC[i] : t.line,
            bg: on ? t.panel2 : 'transparent',
            tip: rmBase ? 'Remove base' : on ? 'Hide from chart' : 'Show in chart',
            toggle: () => {
              if (rmBase) {
                this.save({
                  cchars: cch,
                  bases: st.bases.filter((x?: any) => x !== n),
                  cmp: st.cmp.filter((x?: any) => x !== b.id),
                })
                return
              }
              const shown = st.cmp.includes(b.id)
              this.save({ cchars: cch, cmp: shown ? st.cmp.filter((x?: any) => x !== b.id) : [...vis, b.id].slice(-4) })
            },
          }
        }),
    }))
    vals.onAddChar = (e?: any) => {
      const q = e.target.value
      const n = vals.addOpts.find((o?: any) => o.toLowerCase() === q.trim().toLowerCase())
      if (!n) {
        this.setState({ cq: q })
        return
      }
      const ex = usable.find((b?: any) => b.c === n)
      this.setState({ cq: '' })
      this.save({ cchars: [...cch, n], cmp: [...vis, ex ? ex.id : 'base:' + n].slice(-4) })
    }
    vals.cmpSel = selB.map((b?: any, i?: any) => ({
      ...this.hd(
        selB.map((q?: any) => q.id),
        b.id,
      ),
      ch: b.c,
      bn: b.nmShow,
      col: CC[i],
    }))
    vals.cmpCols = `44px repeat(${Math.max(1, selB.length)},minmax(100px,1fr))`
    const sv = true
    const pv = (r?: any) => (r.bv == null ? 0 : r.bv) + r.up
    vals.cmpModes = [
      ['growth', 'Growth rates'],
      ['stats', 'Projected stats'],
    ].map(([id, l]: any) => ({
      l,
      bg: (sv ? 'stats' : 'growth') === id ? t.ac : 'transparent',
      fg: (sv ? 'stats' : 'growth') === id ? 'oklch(0.18 0.01 60)' : t.mu,
      click: () => this.save({ cview: id }),
    }))
    const abTip = (txt?: any, body?: any) => ({
      enter: (ev?: any) => {
        const r = ev.currentTarget.getBoundingClientRect()
        const x = Math.max(12, Math.min(r.left, window.innerWidth - 312))
        const below = r.bottom + 160 < window.innerHeight
        this.setState({
          tip: {
            t: txt + ' from abilities',
            sub: 'Ability bonus',
            body,
            bodyCol: 'var(--tx, #eee)',
            note: '',
            who: '',
            whoLbl: '',
            whoGroups: [],
            hasGroups: false,
            x: x + 'px',
            y: (below ? r.bottom + 8 : r.top - 8) + 'px',
            tf: below ? 'none' : 'translateY(-100%)',
            raw: null,
          },
        })
      },
      leave: () => {
        if (window.matchMedia && window.matchMedia('(hover:hover)').matches) this.setState({ tip: null })
      },
    })
    const BON = new Map<any, any>(selB.map((b?: any) => [b.id, this.abBonus(d, b, b.x, b.x.lv, b.c)]))
    const statsOf = (b?: any) =>
      sv
        ? [
            ...b.x.rows.map((r?: any, i?: any) => pv(r) + (r.bv == null ? 0 : BON.get(b.id).AB9[i])),
            sum(b.x.rows.map((r?: any, i?: any) => pv(r) + (r.bv == null ? 0 : BON.get(b.id).AB9[i]))),
          ]
        : [...b.x.rows.map((r?: any) => r.t), b.x.tt]
    vals.cmpRows = [
      (() => {
        const ms = selB.map((b?: any) => BON.get(b.id).mov)
        const nm = ms.filter((x?: any) => typeof x === 'number')
        const mx = Math.max(...nm)
        return {
          s: 'Mov',
          cells: selB.map((b?: any, j?: any) => {
            const o = BON.get(b.id)
            const v = ms[j] == null ? '—' : ms[j]
            return {
              v,
              abl: o.movB ? '+' + o.movB : '',
              hasAbl: !!o.movB,
              abT: abTip('+' + o.movB, 'Mov bonus included in shown value'),
              rng: '',
              enter: () => {},
              leave: () => {},
              mnt: '',
              hasMnt: false,
              badge: '',
              hasBadge: false,
              bg: 'transparent',
              bar: 'transparent',
              col: v === mx && nm.length > 1 ? t.ac : t.tx,
              fw: v === mx && nm.length > 1 ? 600 : 400,
            }
          }),
        }
      })(),
    ].concat(
      [...S, 'Σ'].map((s?: any, i?: any): any => {
        const vs = selB.map((b?: any) => statsOf(b)[i])
        const mx = Math.max(...vs)
        return {
          s,
          cells: vs.map((v?: any, j?: any) => {
            const r = i < 9 ? selB[j].x.rows[i] : null
            const ab = r && r.bv != null ? BON.get(selB[j].id).AB9[i] : 0
            const b = (r && r.bv != null ? r.bv : 0) + ab
            return {
              v,
              abl: ab ? (ab > 0 ? '+' : '') + ab : '',
              hasAbl: !!ab,
              abT: abTip(
                ab > 0 ? '+' + ab : '' + ab,
                BON.get(selB[j].id)
                  .ABS.filter((x?: any) => x.includes(s))
                  .join(' · ') || 'Included in shown stat',
              ),
              rng: !r || !sv ? '' : b + r.lo + '–' + (b + r.hi),
              ...mfx(sv ? (r ? r.mst : sum(selB[j].x.rows.map((q?: any) => q.mst || 0))) : 0, v),
              col: v === mx && vs.length > 1 ? t.ac : t.tx,
              fw: v === mx && vs.length > 1 ? 600 : 400,
            }
          }),
        }
      }),
    )
    vals.cmpNotes = selB
      .map((b?: any, j?: any) => ({ ch: b.c, col: CC[j], txt: BON.get(b.id).ABS.join(' · ') }))
      .filter((n?: any) => n.txt)
    vals.hasCmpNotes = vals.cmpNotes.length > 0
    const cx = 170,
      cy = 170,
      RR = 120,
      MX = Math.max(1, ...selB.flatMap((b?: any) => b.x.rows.map((r?: any) => r.t))),
      pt = (i?: any, v?: any) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 9,
          r = (Math.min(v, MX) / MX) * RR
        return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
      }
    const gv2 = (b?: any, i?: any) => b.x.rows[i].t / MX
    const mx2 = S.map((s?: any, i?: any) => Math.max(0, ...selB.map((b?: any) => gv2(b, i)))),
      mn2 = S.map((s?: any, i?: any) => Math.min(...(selB.length ? selB.map((b?: any) => gv2(b, i)) : [0])))
    const multi2 = selB.length > 1
    const P2 = (a?: any) => a.map((n?: any) => n.toFixed(1)).join(',')
    vals.radar = {
      band: multi2
        ? 'M' +
          S.map((s?: any, i?: any) => P2(pt(i, mx2[i] * MX))).join(' ') +
          'Z M' +
          S.map((s?: any, i?: any) => P2(pt(i, mn2[i] * MX))).join(' ') +
          'Z'
        : '',
      dots: multi2
        ? selB.flatMap((b?: any, j?: any) =>
            S.map((s?: any, i?: any) => {
              const [x, y] = pt(i, b.x.rows[i].t)
              return { x, y, col: CC[j], ...tipH(s + ': ' + b.x.rows[i].t + '%', b.c + ' · ' + b.nmShow) }
            }),
          )
        : [],
      hundred: (100 / MX) * 100 + '%',
      bars: S.map((s?: any, i?: any) => ({
        s,
        hundred: (100 / Math.max(100, MX)) * 100 + '%',
        items: selB.map((b?: any, j?: any) => ({
          ...tipH(s + ': ' + b.x.rows[i].t + '%', b.c + ' · ' + b.nmShow),
          col: CC[j],
          w: Math.min(100, (b.x.rows[i].t / Math.max(100, MX)) * 100) + '%',
          v: b.x.rows[i].t,
        })),
      })),
      rings: [0.25, 0.5, 0.75, 1]
        .map((f?: any) => f * MX)
        .map((v?: any) =>
          S.map((s?: any, i?: any) =>
            pt(i, v)
              .map((n?: any) => n.toFixed(1))
              .join(','),
          ).join(' '),
        ),
      axes: S.map((s?: any, i?: any) => {
        const [x, y] = pt(i, MX)
        const [lx, ly] = pt(i, MX * 1.14)
        const sp = Math.round((mx2[i] - mn2[i]) * MX)
        const on = multi2 && sp > 0
        return {
          s,
          x,
          y,
          lxp: (lx / 340) * 100 + '%',
          lyp: (ly / 340) * 100 + '%',
          lbl: on ? s + ' Δ' + sp : s,
          col: on ? 'oklch(0.82 0.12 85)' : 'inherit',
          fw: on ? 600 : 500,
          op: on ? 1 : 0.75,
        }
      }),
      series: selB.map((b?: any, j?: any) => ({
        col: CC[j],
        pts: b.x.rows
          .map((r?: any, i?: any) =>
            pt(i, r.t)
              .map((n?: any) => n.toFixed(1))
              .join(','),
          )
          .join(' '),
      })),
    }
    // charts
    const hs = Array.isArray(st.hsel) ? st.hsel : [],
      ssum = (c?: any) => (hs.length ? hs.reduce((s?: any, i?: any) => s + c.g[i], 0) : tot(c))
    vals.hmHead = [...S.map((s?: any, i?: any) => ({ l: s, i })), { l: hs.length ? 'Σ sel' : 'Σ', i: -1 }].map((h?: any) => {
      const on = h.i < 0 ? !hs.length : hs.includes(h.i)
      return {
        l: h.l,
        bg: on ? t.ac : t.panel2,
        fg: on ? 'oklch(0.18 0.01 60)' : t.mu,
        click: () => this.save({ hsel: h.i < 0 ? [] : hs.includes(h.i) ? hs.filter((x?: any) => x !== h.i) : [...hs, h.i] }),
      }
    })
    const hmPk = (s?: any) =>
        s
          .match(/oklch\(\S+ \S+ [^\s)/]+/)[0]
          .slice(6)
          .split(' ')
          .map(Number),
      hmB = hmPk(t.panel2),
      hmA = hmPk(t.ac),
      hmc = (k?: any) =>
        `oklch(${(hmB[0] + (hmA[0] - hmB[0]) * k).toFixed(3)} ${(hmB[1] + (hmA[1] - hmB[1]) * k).toFixed(3)} ${(hmB[1] < 0.02 ? hmA[2] : hmB[2]).toFixed(0)})`
    vals.hm = avail
      .filter((c?: any) => c.g)
      .sort((a?: any, b?: any) => ssum(b) - ssum(a) || tot(b) - tot(a))
      .map((c?: any) => ({
        n: c.n,
        tot: ssum(c),
        open: open(c.n),
        cells: c.g.map((v?: any) => {
          const k = Math.max(0, Math.min(1, (v - 10) / 60))
          return { v, bg: hmc(k), fg: k > 0.5 ? 'oklch(0.18 0.01 60)' : t.tx }
        }),
      }))
    vals.hmPhone = narrow
    vals.hmWide = !narrow
    vals.hmP = vals.hm.map((r?: any, ri?: any) => ({
      ...r,
      rank: ri + 1,
      cells: r.cells.map((x?: any, i?: any) => ({ ...x, s: S[i], op: hs.length && !hs.includes(i) ? 0.3 : 1 })),
    }))
    {
      const bs = (c?: any) => c.base || c.lv1e,
        bl = Array.isArray(st.bsel) ? st.bsel : [],
        bsum = (c?: any) => (bl.length ? bl.reduce((a?: any, i?: any) => a + bs(c)[i], 0) : bs(c).reduce((a?: any, b?: any) => a + b, 0)),
        pool = avail.filter((c?: any) => bs(c)),
        mn = S.map((x?: any, i?: any) => Math.min(...pool.map((c?: any) => bs(c)[i]))),
        mxs = S.map((x?: any, i?: any) => Math.max(...pool.map((c?: any) => bs(c)[i])))
      vals.bmHead = [...S.map((x?: any, i?: any) => ({ l: x, i })), { l: bl.length ? 'Σ sel' : 'Σ', i: -1 }].map((h?: any) => {
        const on = h.i < 0 ? !bl.length : bl.includes(h.i)
        return {
          l: h.l,
          bg: on ? t.ac : t.panel2,
          fg: on ? 'oklch(0.18 0.01 60)' : t.mu,
          click: () =>
            this.save({ bsel: h.i < 0 ? [] : bl.includes(h.i) ? bl.filter((y?: any) => y !== h.i) : [...bl, h.i] }),
        }
      })
      const blv = Math.max(1, Math.min(99, +st.blv || 20)),
        pj = (c?: any) => bs(c).map((b?: any, i?: any) => +(b + ((c.g ? c.g[i] : 0) / 100) * (blv - 1)).toFixed(1)),
        pp = pool.map((c?: any) => ({ c, p: pj(c) })),
        pmn = S.map((x?: any, i?: any) => Math.min(...pp.map((o?: any) => o.p[i]))),
        pmx = S.map((x?: any, i?: any) => Math.max(...pp.map((o?: any) => o.p[i]))),
        psum = (o?: any) => (bl.length ? bl.reduce((a?: any, i?: any) => a + o.p[i], 0) : o.p.reduce((a?: any, b?: any) => a + b, 0))
      vals.bmLv = blv
      const bdc = st.bdec !== false
      vals.bmDecOpts = [
        ['Decimals', true],
        ['Whole', false],
      ].map(([l, v]: any) => {
        const on = bdc === v
        return { l, on, bg: on ? t.panel2 : 'transparent', fg: on ? t.tx : t.mu, click: () => this.save({ bdec: v }) }
      })
      vals.bmDec = () => this.save({ blv: Math.max(1, blv - 1) })
      vals.bmInc = () => this.save({ blv: Math.min(99, blv + 1) })
      vals.onBmLv = (e?: any) => this.save({ blv: +e.target.value })
      vals.bmP = pp
        .slice()
        .sort((a?: any, b?: any) => psum(b) - psum(a))
        .map((o?: any, ri?: any) => ({
          n: o.c.n,
          tot: Math.round(psum(o)),
          open: open(o.c.n),
          rank: ri + 1,
          cells: o.p.map((v?: any, i?: any) => {
            const k = pmx[i] === pmn[i] ? 0.5 : (v - pmn[i]) / (pmx[i] - pmn[i])
            return {
              v: bdc ? v.toFixed(1) : String(Math.round(v)),
              sub: bs(o.c)[i] + (o.c.g ? ' +' + o.c.g[i] + '%' : ''),
              s: S[i],
              bg: hmc(k),
              fg: k > 0.5 ? 'oklch(0.18 0.01 60)' : t.tx,
              op: bl.length && !bl.includes(i) ? 0.3 : 1,
            }
          }),
        }))
      vals.bmHeadS = vals.bmHead.slice(0, 9)
      vals.bmSig = { ...vals.bmHead[9], bd: 'transparent' }
      vals.bmScale = `linear-gradient(90deg,${hmc(0)},${hmc(0.5)},${hmc(1)})`
    }
    vals.hmHeadS = vals.hmHead.slice(0, 9)
    vals.hmSig = vals.hmHead[9]
    vals.hmSig = { ...vals.hmSig, bd: 'transparent' }
    vals.hmScale = `linear-gradient(90deg,${hmc(0)},${hmc(0.5)},${hmc(1)})`
    const pcount = [0, 1, 2, 3].map((n?: any) => d.chars.filter((c?: any) => onR(c) && c.part === n).length),
      pm = Math.max(...pcount, 1)
    vals.partBars = [0, 1, 2, 3].map((n?: any, i?: any) => ({
      l: PN[n],
      v: pcount[i],
      w: (pcount[i] / pm) * 100 + '%',
      col: PC[n],
      fill: n <= P ? PC[n] : `repeating-linear-gradient(135deg,${t.line} 0 4px,transparent 4px 8px)`,
    }))
    const mm = d.mounts
      .filter((m?: any) => m.n !== 'None')
      .map((m?: any) => ({ n: m.n, v: sum(m.g) }))
      .sort((a?: any, b?: any) => b.v - a.v)
    const mmx = Math.max(...mm.map((m?: any) => m.v), 1)
    vals.mountBars = mm.map((m?: any) => ({ ...m, w: (m.v / mmx) * 100 + '%' }))
    // glossary
    const mask = (list?: any) =>
      (list || '')
        .split(/,\s*/)
        .map((n?: any) => {
          const c = d.chars.find((x?: any) => x.n === n.trim())
          return c && c.part > P ? '(sealed)' : n
        })
        .join(', ')
    const G: Record<string, any> = {
      Mounts: d.mounts
        .filter((m?: any) => m.n !== 'None')
        .map((m?: any) => ({
          t: m.n,
          sub: m.sp,
          body: '',
          hasChips: true,
          chips: (m.ab || '?').split(/,\s*/).map((v?: any) => ({ v, ...this.hov(v) })),
          meta:
            'Growth ' +
            S.map((s?: any, i?: any) => (m.g[i] ? s + ' +' + m.g[i] : ''))
              .filter(Boolean)
              .join(' · ') +
            (m.loc ? '  ·  Found: ' + m.loc : ''),
        })),
      'Paired abilities': d.paired.map((p?: any) => ({ t: p.n, sub: 'Mount', body: p.e, meta: p.m })),
      Arts: d.arts.map((a?: any) => ({
        t: a.n,
        sub: a.c,
        body: a.e,
        meta: a.s
          ? [
              a.s.mt != null && 'Mt ' + a.s.mt,
              a.s.hit != null && 'Hit ' + a.s.hit,
              a.s.crt != null && 'Crit ' + a.s.crt,
              a.s.rn && 'Rng ' + a.s.rn,
              a.s.wt != null && 'Wt ' + a.s.wt,
              a.s.us != null && 'Uses ' + a.s.us,
              a.s.dc != null && 'Dur -' + a.s.dc,
            ]
              .filter(Boolean)
              .join(' · ')
          : '',
      })),
      Classes: d.classes.map((k?: any) => ({
        t: k.n,
        sub: k.tier + (k.type ? ' · ' + k.type : ''),
        body:
          [k.w && 'Weapons: ' + k.w, k.mov && 'Mov ' + k.mov, k.lv && 'Min. Lv ' + k.lv].filter(Boolean).join(' · ') ||
          'No details recorded',
        meta: k.ab.map((a?: any) => a.n + ' — ' + a.e).join('  ·  '),
      })),
    }
    const gtab = G[st.gtab] ? st.gtab : 'Mounts'
    const gq = st.gq.toLowerCase()
    vals.gTabs = Object.keys(G).map((l?: any) => ({
      l,
      bg: gtab === l ? t.panel2 : 'transparent',
      bd: gtab === l ? t.ac : t.line,
      fg: gtab === l ? t.tx : t.mu,
      click: () => this.save({ gtab: l }),
    }))
    {
      const compat = (k?: any) => k.sp
      const kf = st.kf || 'All',
        kq = (st.kq || '').toLowerCase()
      const isArm = (k?: any) => k.arm
      const MV = d.skillMove || []
      const kwp = st.kwp || 'All skills'
      const topSk = (k?: any) => {
        const b = (k.bonus || '')
          .split(/,\s*/)
          .map((x?: any) => {
            const m = x.match(/^(.*?)\s*\+(\d+)$/)
            return m ? [m[1], +m[2]] : null
          })
          .filter(Boolean)
        const mx = Math.max(0, ...b.map((x?: any) => x[1]))
        return mx ? b.filter((x?: any) => x[1] === mx).map((x?: any) => x[0]) : []
      }
      const sk = (k?: any) => (k.comp || '').split(/,\s*/).filter(Boolean)
      const match = (k?: any) =>
        (st.part >= 3 || !['Master', 'Divine'].includes(k.tier)) &&
        (kwp === 'All skills' || sk(k).includes(kwp)) &&
        (kf === 'All' ||
          (kf === 'Mounted' ? k.mounted : kf === 'Flier' ? k.fl : kf === 'Armor' ? isArm(k) : k.ut === 'infantry')) &&
        (!kq || k.n.toLowerCase().includes(kq))
      const list = d.classes.filter(match)
      const selN = list.find((k?: any) => k.n === st.ksel) ? st.ksel : (list[0] || {}).n
      {
        const kopenNow = narrow && !!st.kopen && st.screen === 'classes'
        const scn = st.screen === 'overview' ? 'roster' : st.screen
        vals.headTitleOn = narrow
        vals.headTitle =
          scn === 'profile'
            ? st.sel || 'Character'
            : ({
                roster: 'Characters',
                calc: 'Unit builder',
                compare: 'Compare builds',
                charts: 'Charts',
                match: 'Meal pairing',
                classes: 'Classes',
                abilities: 'Abilities',
                arts: 'Combat Arts',
                items: 'Items',
                settings: 'Settings',
              } as any)[scn] || 'Weave Codex'
        vals.headBackOn = scn !== 'roster'
        vals.headSub = scn === 'profile' ? 'Characters' : ''
        vals.headSubOn = !!vals.headSub
        vals.backRosterDisp = narrow ? 'none' : 'block'
        {
          const L: Record<string, any> = {
            roster: 'Characters',
            calc: 'Unit builder',
            compare: 'Compare builds',
            charts: 'Charts',
            match: 'Meal pairing',
            classes: 'Classes',
            abilities: 'Abilities',
            arts: 'Combat Arts',
            items: 'Items',
            settings: 'Settings',
          }
          const cr: any = []
          const top = () => {
            window.scrollTo(0, 0)
            const r = this.rootRef.current
            if (r) r.scrollTop = 0
          }
          if (scn === 'profile') {
            cr.push({
              l: 'Characters',
              link: true,
              go: () => {
                this.save({ screen: 'roster', kopen: false })
                top()
              },
            })
            cr.push({ l: st.sel || 'Character', link: false })
          } else if (kopenNow || (st.kopen && scn === 'classes' && st.ksel)) {
            cr.push({
              l: 'Classes',
              link: true,
              go: () => {
                this.save({ kopen: false })
                top()
              },
            })
            cr.push({ l: st.ksel || 'Class', link: false })
          }
          cr.forEach((c?: any, i?: any) => {
            c.i = i
            c.sepD = i ? 'inline' : 'none'
            c.aD = c.link ? 'inline-block' : 'none'
            c.sD = c.link ? 'none' : 'inline'
            c.tt = ''
            c.go = c.go || (() => {})
          })
          vals.crumbs = cr
          vals.hasCrumbs = !narrow && cr.length > 1
        }
        vals.headBack = () => {
          if (kopenNow) {
            if (history.state && history.state.kopen) history.back()
            else this.save({ kopen: false })
          } else this.save({ screen: 'roster' })
          window.scrollTo(0, 0)
          const r = this.rootRef.current
          if (r) r.scrollTop = 0
        }
      }
      {
        const sc = st.screen,
          isXl = sc === 'abilities' || sc === 'arts' || sc === 'items'
        vals.isXl = isXl
        if (isXl) {
          const q = (st.xq || '').toLowerCase()
          const SN = ['HP', 'Str', 'Mag', 'Spd', 'Dex', 'Def', 'Res', 'Lck', 'Cha']
          const sg = (n?: any) => (n > 0 ? '+' : '') + n
          let rows: any = [],
            sub = ''
          const stc = (s?: any) => {
            if (!s) return []
            const c: any = []
            if (s.mt != null) c.push('Mt ' + s.mt)
            if (s.hit != null) c.push('Hit ' + s.hit)
            if (s.crt != null) c.push('Crit ' + s.crt)
            if (s.rn) c.push('Rng ' + s.rn)
            if (s.wt != null) c.push('Wt ' + s.wt)
            if (s.us != null) c.push('Uses ' + s.us)
            if (s.dc != null) c.push('Dur −' + s.dc)
            return c
          }
          if (sc === 'abilities') {
            const A = new Map<any, any>()
            const add = (n?: any, e?: any, cat?: any) => {
              if (!n) return
              const o = A.get(n)
              if (!o) A.set(n, { n, e: e || '', cat })
              else if (!o.e && e) o.e = e
            }
            ;(d.arts || [])
              .filter((a?: any) => a.k === 'Ability' || (a.k === 'Authority Art' && a.kd === 'passive'))
              .forEach((a?: any) => add(a.n, a.e, a.c))
            Object.keys(d.univE || {}).forEach((n?: any) => add(n, d.univE[n], 'Weapon skill'))
            d.classes.forEach((k?: any) =>
              (k.ab || []).forEach((a?: any) => add(a.n, a.e, a.t === 'Master ability' ? 'Class Mastery' : 'Class')),
            )
            d.chars.forEach((c?: any) => {
              if (c.pa) {
                const i = c.pa.indexOf(': ')
                if (i > 0) add(c.pa.slice(0, i), c.pa.slice(i + 2), 'Personal')
              }
              ;(c.lab || []).forEach((a?: any) => add(a.n, a.e, 'Personal'))
            })
            d.mounts.forEach((m?: any) =>
              (m.pa || []).forEach((a?: any) => {
                if (a && a.n) add(a.n, a.e, 'Paired Mount')
              }),
            )
            ;(d.paired || []).forEach((p?: any) => add(p.n, p.e, 'Paired Mount'))

            Object.keys((d.ac || {}).ab || {}).forEach((n?: any) => add(n, '', 'Other'))
            ;[...A.values()].forEach((a?: any) => {
              const L = (d.lk || {})[a.n.toLowerCase()]
              if (L && L[1] === 'authority_art') a.cat = 'Authority'
              if (a.cat === 'Weapon skill') {
                const w = [
                  ['Sword', /sword/i],
                  ['Lance', /lance/i],
                  ['Axe', /axe/i],
                  ['Bow', /bow/i],
                  ['Brawl', /brawl|fist/i],
                  ['Reason', /reason|magic/i],
                  ['Faith', /faith/i],
                ].find((x?: any) => x[1].test(a.n))
                a.cat = w ? w[0] : 'Other'
              }
            })
            rows = [...A.values()].map((a?: any) => {
              const ch: any = []
              return { n: a.n, code: ((d.ac || {}).ab || {})[a.n] || '', tag: a.cat, cat: a.cat, e: a.e, chips: ch }
            })
            sub = rows.length + ' abilities · class, weapon, personal and mount passives'
          } else if (sc === 'arts') {
            rows = (d.arts || [])
              .filter((a?: any) => a.k === 'Combat Art' || (a.k === 'Authority Art' && a.kd !== 'passive'))
              .map((a?: any) => ({
                n: a.n,
                code: ((d.ac || {}).ca || {})[a.n] || '',
                tag: a.k === 'Authority Art' ? 'Authority Art' : a.c,
                cat: a.k === 'Authority Art' ? 'Authority' : a.c,
                e: a.e,
                chips: stc(a.s),
              }))
            sub = rows.length + ' combat and authority arts · Dur − is durability cost per use'
          } else {
            const seen = new Set<any>()
            const CT: Record<string, any> = { weapon: 'Weapons', accessory: 'Accessories', tome: 'Magics' }
            d.items.forEach((i?: any) => {
              if (i.bi) return // forged / refined variants stay out of the catalog
              seen.add(i.n)
              const ch: any = []
              if (i.rk) ch.push('Rank ' + i.rk + (i.rk2 ? ' + ' + i.cat2 + ' ' + i.rk2 : ''))
              if (i.mt != null) ch.push('Mt ' + i.mt)
              if (i.hit != null) ch.push('Hit ' + i.hit)
              if (i.crt != null) ch.push('Crit ' + i.crt)
              if (i.wt != null) ch.push('Wt ' + i.wt)
              if (i.r1 != null) ch.push('Rng ' + (i.r2 && i.r2 !== i.r1 ? i.r1 + '–' + i.r2 : i.r1))
              if (i.us != null) ch.push('Uses ' + i.us)
              if (i.rel) ch.push('Relic')
              rows.push({
                n: i.n,
                code: i.code || '',
                tag: i.cat,
                cat:
                  i.t === 'weapon'
                    ? i.cat
                    : i.t === 'tome'
                      ? i.cat === 'White Magic'
                        ? 'White Magic'
                        : 'Black Magic'
                      : CT[i.t] || 'Other',
                e: i.e,
                chips: ch,
                o: i.t === 'weapon' ? 0 : i.t === 'tome' ? 2 : 3,
              })
            })
            ;(d.arts || [])
              .filter((a?: any) => a.k === 'Spell' && !seen.has(a.n))
              .forEach((a?: any) =>
                rows.push({
                  n: a.n,
                  code: '',
                  tag: a.c + ' spell',
                  cat: a.c === 'Faith' ? 'White Magic' : 'Black Magic',
                  e: a.e,
                  chips: stc(a.s),
                  o: 2,
                }),
              )
            rows.sort((a?: any, b?: any) => a.o - b.o)
            sub = rows.length + ' weapons, accessories and magics'
          }
          rows.forEach((r?: any) => {
            r.cat = r.cat || r.tag || 'Other'
            r.tag = r.tag || 'Other'
          })
          const tabKey = 'xt_' + sc
          const present = new Set<any>(rows.map((r?: any) => r.cat))
          const cats = [
            'All',
            ...(sc === 'items'
              ? ['Sword', 'Lance', 'Axe', 'Bow', 'Brawl', 'Black Magic', 'White Magic', 'Accessories'].filter((x?: any) =>
                  present.has(x),
                )
              : present),
          ]
          const GR =
            sc === 'abilities'
              ? [
                  ['All', 'Personal', 'Authority', 'Class Mastery', 'Class', 'Paired Mount', 'Other'],
                  ['Sword', 'Lance', 'Axe', 'Bow', 'Brawl', 'Reason', 'Faith'],
                  ['Infantry', 'Cavalry', 'Armor', 'Flying'],
                ].map((g?: any) => g.filter((x?: any) => x === 'All' || present.has(x)))
              : [cats]
          const cur = cats.includes(st[tabKey]) ? st[tabKey] : 'All'
          const fr = rows.filter(
            (r?: any) =>
              (cur === 'All' || (r.cat || r.tag) === cur) &&
              (!q || (r.n + ' ' + r.e + ' ' + r.code).toLowerCase().includes(q)),
          )
          vals.xTitle = ({ abilities: 'Abilities', arts: 'Combat Arts', items: 'Items' } as any)[sc]
          vals.xSub = sub
          vals.xCols = narrow ? 'minmax(0,1fr)' : 'repeat(3,minmax(0,1fr))'
          vals.xq = st.xq || ''
          vals.onXq = (e?: any) => this.setState({ xq: e.target.value })
          vals.xClrDisp = st.xq ? 'block' : 'none'
          vals.onXClear = (e?: any) => {
            e.preventDefault()
            const inp = e.currentTarget.parentNode.querySelector('input')
            this.setState({ xq: '' }, () => inp && inp.focus())
          }
          const mk = (l?: any) => ({
            l,
            bg: cur === l ? t.panel2 : 'transparent',
            bd: cur === l ? t.ac : t.line,
            fg: cur === l ? t.tx : t.mu,
            click: () => this.setState({ [tabKey]: l }),
          })
          vals.xTabRows = GR.map((g?: any) => ({ tabs: g.map(mk) }))
          vals.xRows = fr.map((r?: any) => ({
            ...r,
            hasImg: sc !== 'items',
            img: sc === 'arts' ? IMG('arts', r.cat) : IMG('abilities', r.n),
            hasE: !!r.e,
            hasC: r.chips.length > 0,
          }))
          vals.xEmpty = !fr.length
        }
      }
      {
        const GR: any = [
          ['Chars', ['roster', 'calc', 'compare', 'charts'], 'roster'],
          ['Meal', ['match'], 'match'],
          ['Codex', ['classes', 'abilities', 'arts', 'items'], 'classes'],
          ['Settings', ['settings'], 'settings'],
        ]
        const byId: any = {}
        NAV.forEach((n?: any, i?: any) => (byId[n[0]] = nav[i]))
        vals.navG = GR.map(([l, ids, first]: any) => {
          const on = ids.includes(scr)
          return {
            short: l,
            icon: byId[first].icon,
            fg: on ? t.tx : t.mu,
            bar: on ? t.ac : 'transparent',
            go:
              on && scr !== first && ids.length > 1
                ? () => {
                    window.scrollTo(0, 0)
                    const r = this.rootRef.current
                    if (r) r.scrollTop = 0
                  }
                : byId[first].go,
          }
        })
        const g = GR.find((x?: any) => x[1].includes(scr))
        vals.subOn = narrow && !!g && g[1].length > 1
        vals.subTabs = vals.subOn
          ? g[1].map((id?: any) => ({
              l: NAV.find((n?: any) => n[0] === id)[2],
              go: byId[id].go,
              bg: id === scr ? t.panel2 : 'transparent',
              fg: id === scr ? t.ac : t.mu,
            }))
          : []
      }
      vals.h1Disp = narrow ? 'none' : 'block'
      {
        const on = !!(st.tip && st.tip.raw === 'statinfo')
        vals.infoOn = on
        vals.infoFg = on ? t.ac : t.mu
        vals.infoTog = (ev?: any) => {
          if (this.state.tip && this.state.tip.raw === 'statinfo') {
            this.setState({ tip: null })
            return
          }
          const r = ev.currentTarget.getBoundingClientRect(),
            W = window.innerWidth,
            H = window.innerHeight,
            x = Math.max(12, Math.min(r.right - 300, W - 312)),
            below = r.bottom + 320 < H
          const lg: any = [
            ['Character', 'var(--ac, oklch(0.8 0.11 75))'],
            ['Class', 'oklch(0.74 0.1 185)'],
            ...(vals.hasMst ? [['Mount', 'oklch(0.74 0.1 300)']] : []),
            ...(vals.hasAb ? [['Bonus', 'oklch(0.78 0.12 150)']] : []),
            ['Negative', 'oklch(0.74 0.12 30)'],
          ]
          this.setState({
            tip: {
              t: 'Average',
              hasIc: false,
              bgi: '',
              sub: 'Per-stat breakdown',
              body: vals.projAvg,
              bodyCol: 'var(--tx, #eee)',
              stats: [],
              hasStats: false,
              statNote: '',
              note:
                'Below / above avg: each level’s growth is a chance roll, real results may vary. Low and High show the below/above average outcomes likely to occur.' +
                (vals.abNoteOn ? ' Ability bonuses (included above): ' + vals.abNote : ''),
              who: 'Bar colors in the stat breakdown.',
              whoLbl: 'Legend',
              hasGroups: true,
              whoGroups: lg.map(([rank, bgi]: any) => ({ rank: '', bgi, names: rank })),
              hasSk: false,
              skIcons: [],
              hasGrids: false,
              grids: [],
              x: x + 'px',
              y: (below ? r.bottom + 8 : r.top - 8) + 'px',
              tf: below ? 'none' : 'translateY(-100%)',
              raw: 'statinfo',
            },
          })
        }
      }
      vals.jmOn = false
      vals.jmOpen = false
      vals.jmItems = []
      vals.jmLabel = ''
      vals.jmTog = () => {}
      vals.jmClose = () => {}
      vals.topShow = !!st.topShow && narrow
      vals.toTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        const r = this.rootRef.current
        if (r) r.scrollTo({ top: 0, behavior: 'smooth' })
      }
      {
        const SCa = ({
          match: [
            ['Setup', 'mx-setup'],
            ['Suggested meals', 'mx-sug'],
            ['Supports', 'mx-grid'],
            ['Characters', 'mx-list'],
          ],
          classes:
            narrow && st.kopen
              ? null
              : TIERS.filter((g?: any) => st.part >= 3 || !['Master', 'Divine'].includes(g)).map((g?: any) => [g, 'k-' + g]),
          compare: [
            ['Units & builds', 'b-units'],
            ['Growth profile', 'b-gro'],
            ['Projected stats', 'b-proj'],
          ],
          settings: [
            ['Story progress', 's-prog'],
            ['Color scheme', 's-color'],
            ['Handedness', 's-hand'],
            ['Backup', 's-backup'],
            ['Clear data', 's-clear'],
            ['Sources', 's-src'],
          ],
          calc: [
            ['Unit setup', 'b-setup'],
            ['Class path', 'b-class'],
            ['Inventory', 'b-inv'],
            ['Stats', 'b-stats'],
            ['Growth rates', 'b-gro'],
            ['Projected stats', 'b-proj'],
            ['Saved builds', 'b-saved'],
          ],
        } as any)[st.screen]
        this.spyKeys = null
        vals.rlOn = false
        vals.rl = []
        if (SCa) {
          const jo = (st.jscr === st.screen ? st.jord || '' : '').split('|')
          let SC = SCa.slice()
          if (SC.some((x?: any) => jo.includes(x[1]))) {
            SC = SC.filter((x?: any) => jo.includes(x[1])).sort((p?: any, q?: any) => jo.indexOf(p[1]) - jo.indexOf(q[1]))
          }
          const ks = SC.map((x?: any) => x[1])
          this.spyKeys = SCa.map((x?: any) => x[1])
          const spy = ks.includes(st.spy) ? st.spy : ks[0]
          vals.rlOn =
            !narrow &&
            (st.screen === 'calc' ||
              st.screen === 'compare' ||
              st.screen === 'match' ||
              st.screen === 'classes' ||
              st.screen === 'settings')
          vals.rl = this.rg(SC, (x?: any) => x[1]).map((gp?: any) => {
            const k = gp[0][1],
              l = gp.map((x?: any) => x[0]).join(' · '),
              on = gp.some((x?: any) => x[1] === spy)
            return {
              l,
              go: () => this.jumpTo(k),
              dot: on ? 'var(--ac, oklch(0.8 0.11 75))' : 'var(--mu, oklch(0.78 0.035 120))',
              dop: on ? 1 : 0.55,
              ...((on && !st.railOff) || st.jhv === k
                ? { lblW: '240px', lblP: '3px 8px', lblBw: '1px' }
                : { lblW: '0px', lblP: '3px 0', lblBw: '0px' }),
              enter: () => this.setState({ jhv: k }),
              leave: () => this.setState({ jhv: null }),
            }
          })
          if (narrow) {
            const cl = () => this.setState({ jmOpen: false })
            vals.jmOn = true
            vals.topShow = false
            vals.jmOpen = !!st.jmOpen
            vals.jmLabel = (SC.find((x?: any) => x[1] === spy) || SC[0])[0]
            vals.jmTog = () => this.setState({ jmOpen: !st.jmOpen })
            vals.jmClose = cl
            vals.jmItems = SC.map(([l, k]: any) => ({
              l,
              fg: k === spy ? 'var(--ac, oklch(0.82 0.12 85))' : 'var(--tx, #eee)',
              bg: k === spy ? 'var(--panel2, oklch(0.25 0.012 60))' : 'transparent',
              click: () => {
                cl()
                this.jumpTo(k)
              },
            }))
            vals.jmTop = () => {
              cl()
              vals.toTop()
            }
          }
        }
      }
      vals.isClasses = st.screen === 'classes'
      vals.kq = st.kq || ''
      vals.onKq = (e?: any) => this.setState({ kq: e.target.value })
      vals.kClrDisp = st.kq ? 'block' : 'none'
      vals.onKClear = (e?: any) => {
        e.preventDefault()
        const inp = e.currentTarget.parentNode.querySelector('input')
        this.setState({ kq: '' }, () => inp && inp.focus())
      }
      vals.kCount = list.length
      vals.kwpAll = () => this.setState({ kwp: 'All skills' })
      vals.kwpAllOn = kwp === 'All skills'
      vals.kwpAllBd = kwp === 'All skills' ? t.ac : t.line
      vals.kwpAllBg = kwp === 'All skills' ? t.panel2 : 'transparent'
      vals.kfAll = () => this.setState({ kf: 'All' })
      vals.kfAllOn = kf === 'All'
      vals.kfAllBd = kf === 'All' ? t.ac : t.line
      vals.kfAllBg = kf === 'All' ? t.panel2 : 'transparent'
      vals.kwpIcons = [...new Set<any>(d.classes.flatMap(sk))]
        .filter((n?: any) => !(d.skillMove || []).includes(n))
        .sort((p?: any, q?: any) => {
          const o = d.skillOrder || [],
            i = o.indexOf(p),
            j = o.indexOf(q)
          return (i < 0 ? 99 : i) - (j < 0 ? 99 : j)
        })
        .map((n?: any) => {
          const on = kwp === n
          return {
            n,
            bgi: SK(n),
            on,
            bd: on ? t.ac : t.line,
            bg: on ? t.panel2 : 'transparent',
            op: kwp === 'All skills' || on ? 1 : 0.5,
            click: () => this.setState({ kwp: on ? 'All skills' : n }),
            ...this.hov(n, (x?: any) => this.skillTip(x)),
          }
        })
      vals.kwp = kwp
      vals.onKwp = (e?: any) => this.setState({ kwp: e.target.value })
      vals.kwpOpts = [
        'All skills',
        ...[...new Set<any>(d.classes.flatMap(sk))]
          .filter((n?: any) => !(d.skillMove || []).includes(n))
          .sort((p?: any, q?: any) => {
            const o = d.skillOrder || [],
              i = o.indexOf(p),
              j = o.indexOf(q)
            return (i < 0 ? 99 : i) - (j < 0 ? 99 : j)
          }),
      ]
      vals.kTabs = [
        ['Infantry', 'Infantry'],
        ['Mounted', 'Riding'],
        ['Armor', 'Heavy Armor'],
        ['Flier', 'Flying'],
      ].map(([l, sn]: any) => {
        const on = kf === l
        return {
          l: sn,
          on,
          bgi: SK(sn),
          bg: on ? t.panel2 : 'transparent',
          bd: on ? t.ac : t.line,
          op: kf === 'All' || on ? 1 : 0.5,
          click: () => this.setState({ kf: on ? 'All' : l }),
          ...this.hov(sn, (x?: any) => this.skillTip(x)),
        }
      })
      const kP = st.part,
        kR = st.route
      const okR = new Set<any>([
        ...(st.cleared || []),
        ...(st.cleared2 || []),
        ...(kP >= 1 && kP <= 2 && kR !== 'All' ? [kR] : []),
      ])
      const kLock = (k?: any) => !!(k.un && k.un.length && kP >= 1 && !k.un.some((u?: any) => okR.has(u.r)))
      const kNeed = (k?: any) => [...new Set<any>(k.un.map((u?: any) => u.r))].join(' / ')
      vals.kGroups = TIERS.filter((g?: any) => st.part >= 3 || !['Master', 'Divine'].includes(g))
        .map((g?: any) => ({
          t: g,
          lv: (() => {
            const l = d.classes.filter((k?: any) => k.tier === g && k.lv !== '' && !isNaN(+k.lv)).map((k?: any) => +k.lv)
            return l.length ? ' · Level ' + Math.min(...l) : ''
          })(),
          items: list
            .filter((k?: any) => k.tier === g)
            .map((k?: any) => ({
              n: k.n,
              locked: kLock(k),
              lockTxt: kLock(k) ? 'needs to complete ' + kNeed(k) + ' path' : '',
              absW: sk(k)
                .filter((n?: any) => !MV.includes(n))
                .map((n?: any) => SKo(n, t.mu)),
              absM: sk(k)
                .filter((n?: any) => MV.includes(n))
                .map((n?: any) => ({ n, col: t.mu })),
              code: k.code || '',
              type: k.type.replace('(no Fextralife page)', '—'),
              mov: k.mov || '—',
              armored: isArm(k),
              mounted: !!k.mounted && !k.fl,
              flier: !!k.fl,
              img: IMG('classes', k.n),
              bd: k.n === selN ? t.ac : t.line,
              bg: k.n === selN ? t.panel2 : t.panel,
              open: () => {
                this.save({ ksel: k.n, kopen: narrow })
                if (narrow) {
                  const r = this.rootRef.current
                  if (r) r.scrollTop = 0
                  window.scrollTo(0, 0)
                }
              },
            })),
        }))
        .filter((g?: any) => g.items.length)
        .map((g?: any) => ({ ...g, n: g.items.length }))
      vals.kCols = narrow ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(340px,420px)'
      vals.kPos = narrow ? 'fixed' : 'sticky'
      vals.kTop = narrow ? 'auto' : '120px'
      vals.kMaxH = narrow ? '80vh' : 'calc(100vh - 140px)'
      vals.kSide = narrow ? '0' : 'auto'
      vals.kZ = narrow ? '92' : 'auto'
      vals.kPad = narrow ? '16px 20px calc(20px + env(safe-area-inset-bottom))' : '20px'
      vals.kRad = narrow ? '16px 16px 0 0' : 'var(--r, 14px)'
      vals.kSh = narrow ? '0 -18px 50px -12px rgba(0,0,0,.6)' : 'none'
      const k = d.classes.find((x?: any) => x.n === selN)
      vals.kHasSel = !!k
      const kOpen = narrow && !!st.kopen && !!k
      if (kOpen) this.sk = 'k'
      vals.kBackOn = kOpen
      vals.kListDisp = 'flex'
      vals.kShowDetail = !!k && (!narrow || kOpen)
      vals.kBack = () => {
        if (history.state && history.state.kopen) history.back()
        else this.save({ kopen: false })
        const r = this.rootRef.current
        if (r) r.scrollTop = 0
      }
      if (k) {
        const sp = compat(k) || []
        const ms = d.mounts.filter((m?: any) => sp.includes(m.sp))
        const sg = (v?: any) => (v > 0 ? '+' : '') + v
        const mult = 1
        const selM = sp.length ? ms.find((m?: any) => m.n === st.kmount) || null : null

        const MA = mountAt(selM)
        const mg = MA.g.map((v?: any) => v * mult),
          mst = MA.st.map((v?: any) => v * mult)
        const cellsG = S.map((s?: any, i?: any) => {
          const v = k.g[i] + mg[i]
          return {
            s,
            v: sg(v),
            col: v > 0 ? 'var(--tx, #eee)' : v > 0 ? 'var(--tx, #eee)' : v < 0 ? 'oklch(0.74 0.12 30)' : t.mu,
          }
        })
        const cellsS = S.map((s?: any, i?: any) => {
          const v = k.mods[i] + mst[i]
          return {
            s,
            v: sg(v),
            col: v > 0 ? 'var(--tx, #eee)' : v > 0 ? 'var(--tx, #eee)' : v < 0 ? 'oklch(0.74 0.12 30)' : t.mu,
          }
        })
        vals.k = {
          n: k.n,
          img: IMG('classes', k.n),
          hasMn: (k.mn || []).some((v?: any) => v > 0),
          mnc: (k.mn || []).map((v?: any, i?: any) => ({
            s: (['HP', 'Str', 'Mag', 'Spd', 'Dex', 'Def', 'Res', 'Lck', 'Cha'] as any)[i],
            v: v || '–',
            col: v ? t.tx : t.mu,
          })),
          tier: k.tier,
          licTxt: k.lic && k.lic !== k.tier ? ' · ' + k.lic + ' license' : '',
          type: k.type.replace('(no Fextralife page)', 'Type not recorded'),
          mounted: sp.length > 0,
          sub: [
            k.tier + (k.lic && k.lic !== k.tier ? ' · ' + k.lic + ' license' : ''),
            k.type.replace('(no Fextralife page)', ''),
            k.lv ? 'Lv ' + k.lv : '',
          ]
            .filter(Boolean)
            .join(' · '),
          skW: sk(k)
            .filter((n?: any) => !MV.includes(n))
            .map((n?: any) => SKo(n, t.tx)),
          skM: sk(k)
            .filter((n?: any) => MV.includes(n))
            .map((n?: any) => ({ n, col: t.tx })),
          note: [k.mov ? 'Mov ' + k.mov : ''].filter(Boolean).join(' · '),
          facts: [
            ['Primary req.', k.pri],
            ['Secondary req.', k.sec],
            ['Skill EXP bonus', k.bonus],
          ]
            .filter(([a, b]: any) => b && b !== 'None')
            .map(([k, v]: any) => ({
              k,
              v,
              parts: String(v)
                .split(/,\s*/)
                .map((p?: any) => {
                  const m = p.match(/^(.*?)(\s*[(+\-].*)?$/),
                    n = m[1].trim(),
                    b = SK(n)
                  return {
                    ic: !!b,
                    noIc: !b,
                    bgi: b,
                    n,
                    rest: (m[2] || '').replace(/[()]/g, '').trim(),
                    txt: p,
                    ...(b ? this.hov(n, (x?: any) => this.skillTip(x)) : {}),
                  }
                }),
            })),
          hasUn: !!(k.un && k.un.length),
          unLocked: kLock(k),
          unWarn: kLock(k) ? 'Not unlocked on your cleared routes. Needs to complete ' + kNeed(k) + ' path.' : '',
          un: (k.un || []).map((u?: any) => ({
            r: u.r + "'s route",
            d: u.d,
            where: u.ch ? 'Chapter ' + u.ch : 'Renown ' + u.ren,
            bd: okR.has(u.r) ? 'var(--ac, oklch(0.82 0.12 85))' : 'var(--line, oklch(0.42 0.06 110 / .55))',
            tag: okR.has(u.r) ? ' · Available' : '',
          })),
          g: cellsG,
          gt: sum(k.g) + sum(mg),
          mods: cellsS,
          gLbl: selM ? ` · incl. ${selM.n}` : '',
          hasSelM: !!selM,
          selMn: selM ? selM.n : '',
          clearM: () => this.save({ kmount: null }),
          hasAb: k.ab.length > 0,
          ab: k.ab.map((a?: any) => ({ n: a.n, t: a.t, e: a.e, mt: MT(a.m), hasMt: !!a.m })),
          abGroups: (() => {
            const mk = (a?: any) => ({
              n: a.n,
              bgi: AB(a.n),
              e: a.e,
              mt: MT(a.m),
              hasMt: !!a.m,
              tag: a.t === 'Master ability' ? 'Master' : 'Class',
            })
            return [
              {
                lbl: k.n + ' · always active',
                bs: 'solid',
                items: k.ab.filter((a?: any) => a.t !== 'Master ability').map(mk),
              },
              {
                lbl: k.n + ' · unlocked on mastery',
                bs: 'dashed',
                items: k.ab.filter((a?: any) => a.t === 'Master ability').map(mk),
              },
            ].filter((g?: any) => g.items.length)
          })(),
          mNote: sp.join(' / ') + ' only',
          noMounts: ms.length === 0,
          mounts: ms.map((m?: any) => {
            const on = selM && selM.n === m.n
            return {
              bd: on ? 'oklch(0.74 0.1 300)' : 'transparent',
              pick: () => this.save({ kmount: on ? null : m.n }),
              pickLbl: on ? 'Selected' : 'Select',
              pickBg: on ? 'oklch(0.74 0.1 300)' : 'transparent',
              pickFg: on ? 'oklch(0.18 0.01 60)' : 'oklch(0.74 0.1 300)',
              n: m.n,
              sp: m.sp,
              gt: sum(m.g) * mult,
              g: S.map((s?: any, i?: any) => (m.g[i] ? s + ' +' + m.g[i] * mult : '')).filter(Boolean),
              st: S.map((s?: any, i?: any) => (m.st[i] ? s + ' +' + m.st[i] * mult : '')).filter(Boolean),
              hasSt: m.st.some(Boolean),
              gc: m.g.map((v?: any, i?: any) => ({
                s: S[i],
                v: sg(v * mult),
                col: v > 0 ? t.ac : v < 0 ? 'oklch(0.74 0.12 30)' : t.mu,
              })),
              stc: m.st.map((v?: any, i?: any) => ({
                s: S[i],
                v: sg(v * mult),
                col: v > 0 ? t.ac : v < 0 ? 'oklch(0.74 0.12 30)' : t.mu,
              })),
              loc: m.loc || '',
              chipGroups: this.mGroups(m).map((g?: any) => ({
                lbl: g.lbl,
                items: g.items.map((v?: any) => ({ v, bgi: AB(v), tag: 'Bond ' + g.bl[v], ...this.hov(v) })),
              })),
            }
          }),
          toCalc: () =>
            this.save({
              screen: 'calc',
              calc: {
                ...calc,
                k: k.n,
                m: selM ? selM.n : ms.length && !ms.some((m?: any) => m.n === calc.m) ? ms[0].n : sp.length ? calc.m : 'None',
              },
            }),
        }
      }
    }
    vals.tipOn = !!st.tip
    vals.tip = st.tip || {}
    vals.afOn = !!st.afTip
    vals.afTip = st.afTip || {}
    vals.gItems = G[gtab].filter((g?: any) => !gq || (g.t + ' ' + g.body + ' ' + g.meta).toLowerCase().includes(gq))
    vals.gCount = vals.gItems.length
    vals.gq = st.gq
    vals.onGq = (e?: any) => this.setState({ gq: e.target.value })
    {
      const MX: any = st.mx || {}
      const names = avail.map((c?: any) => c.n)
      const meals = [...new Set<any>(d.chars.flatMap((c?: any) => Object.values(c.ml || {}).flat()))].sort()
      const meal = meals.includes(MX.meal) ? MX.meal : ''
      const c1n = MX.c1 && MX.c1 !== MX.c2 && MX.c1 !== MX.c3 && names.includes(MX.c1) ? MX.c1 : ''
      const c2n = MX.c2 && MX.c2 !== c1n && names.includes(MX.c2) ? MX.c2 : ''
      const c3n = MX.c3 && MX.c3 !== c1n && MX.c3 !== c2n && names.includes(MX.c3) ? MX.c3 : ''
      const byN = (n?: any) => d.chars.find((x?: any) => x.n === n)
      const KO = ['loves', 'likes', 'neutral', 'dislikes'],
        ML: Record<string, any> = {
          loves: ['Loves', 'oklch(0.78 0.1 150)', 2],
          likes: ['Likes', 'oklch(0.78 0.1 110)', 1],
          neutral: ['Neutral', 'oklch(0.7 0.01 70)', 0],
          dislikes: ['Dislikes', 'oklch(0.74 0.12 30)', -2],
        }
      const mop = (c?: any) => {
        const k = !meal ? null : KO.find((k?: any) => ((c.ml || {})[k] || []).includes(meal))
        return k
          ? { l: ML[k][0], col: ML[k][1], p: ML[k][2], w: '76px' }
          : { l: 'No data', col: 'oklch(0.7 0.01 70)', p: 0, w: '76px' }
      }
      const SO: Record<string, any> = { A: 6, B: 4, C: 2, '?': 2 },
        SC: Record<string, any> = { A: 'oklch(0.78 0.1 150)', B: 'oklch(0.78 0.1 110)', C: 'oklch(0.7 0.01 70)', '?': 'oklch(0.7 0.01 70)' }
      const sf = (x?: any, y?: any) => {
        const q = (x.sup || []).find((z?: any) => z.n === y.n)
        return q ? q.r || '?' : null
      }
      const sup = (a?: any, b?: any) => {
        const r = [sf(a, b), sf(b, a)].filter(Boolean).sort((x?: any, y?: any) => SO[y] - SO[x])[0]
        return r
          ? { l: r === '?' ? 'Rank ?' : 'Rank ' + r, col: SC[r], p: SO[r], w: '84px', has: true }
          : { l: 'None', col: 'oklch(0.74 0.12 30)', p: 0, w: '84px', has: false }
      }
      const chosen = [c1n, c2n, c3n].filter(Boolean).map(byN)
      const rowOf = (c?: any) => {
        const oth = chosen.filter((x?: any) => x.n !== c.n),
          ss = oth.map((o?: any) => ({ o, s: sup(o, c) })),
          m = mop(c)
        const rr: any = reqRec(c) || {}
        return {
          ren: parseInt(rr.ren) || 0,
          sl: parseInt(rr.sup) || 0,
          reqL: (() => {
            const q = reqRec(c)
            if (!q) return []
            const n = parseInt(q.ren)
            return [n ? 'Renown ' + n : '', q.sup ? 'Support ' + q.sup : ''].filter(Boolean)
          })(),
          n: c.n,
          sups: ss.map(({ o, s }: any) => ({
            ...s,
            l: o.n + ' · ' + s.l.replace('Rank ', ''),
            nm: o.n,
            rk: s.l.replace('Rank ', ''),
            w: '0px',
          })),
          has: ss.some((x?: any) => x.s.has),
          cnt: oth.length
            ? (() => {
                const av = new Set<any>(avail.map((y?: any) => y.n))
                const pa = (x?: any) => new Set<any>((x.sup || []).map((z?: any) => z.n).filter((n?: any) => av.has(n)))
                let I = pa(c)
                oth.forEach((o?: any) => {
                  const p = pa(o)
                  I = new Set<any>([...I].filter((n?: any) => p.has(n)))
                })
                ;[c, ...oth].forEach((x?: any) => I.delete(x.n))
                return I.size
              })()
            : 0,
          tot: oth.length,
          meal: m,
          sp: ss.reduce((a?: any, x?: any) => a + x.s.p, 0),
          score: ss.reduce((a?: any, x?: any) => a + x.s.p, 0) + m.p + oth.reduce((a?: any, x?: any) => a + mop(x).p, 0),
        }
      }
      const all = MX.all !== false,
        list = avail
          .map(rowOf)
          .filter(
            (r?: any) =>
              (!MX.unrec || !isRec(byN(r.n))) &&
              (!MX.rec || isRec(byN(r.n))) &&
              (!MX.star || (st.starred || []).includes(r.n)),
          )
          .filter((r?: any) => all || !chosen.length || r.has || [c1n, c2n, c3n].includes(r.n))
          .sort((a?: any, b?: any) => {
            const rt = (r?: any) => {
              const c = byN(r.n)
              return c && (c.type === 'Flame Lord' || c.type === 'Main') ? 1 : 0
            }
            const sk = MX.sort
            if (sk === 'ren' || sk === 'sl') {
              const z = (v?: any) => v || 99
              return z(a[sk]) - z(b[sk]) || b.score - a.score || a.n.localeCompare(b.n)
            }
            if (sk === 'cnt') return b.cnt - a.cnt || b.score - a.score || a.n.localeCompare(b.n)
            if (sk === 'sup') return b.sp - a.sp || b.score - a.score || a.n.localeCompare(b.n)
            if (sk === 'meal') return b.meal.p - a.meal.p || b.score - a.score || a.n.localeCompare(b.n)
            return (c1n ? 0 : rt(b) - rt(a)) || b.score - a.score || a.n.localeCompare(b.n)
          })
      const sortBtn = (k?: any, l?: any, up?: any) => ({
        l: l + (MX.sort === k ? (up ? ' ↑' : ' ↓') : ''),
        fg: MX.sort === k ? t.ac : t.mu,
        click: () => this.save({ mx: { ...MX, sort: MX.sort === k ? '' : k } }),
      })
      const pairs: any = []
      chosen.forEach((a?: any, i?: any) => chosen.slice(i + 1).forEach((b?: any) => pairs.push({ lbl: a.n + ' – ' + b.n, s: sup(a, b) })))
      const sug =
        !meal && chosen.length
          ? meals
              .map((m?: any) => {
                const ops = chosen.map((c?: any) => {
                  const k = KO.find((k?: any) => ((c.ml || {})[k] || []).includes(m))
                  return k
                    ? { l: c.n + ' · ' + ML[k][0], col: ML[k][1], w: '0px', p: ML[k][2] }
                    : { l: c.n + ' · No data', col: 'oklch(0.7 0.01 70)', w: '0px', p: 0 }
                })
                return {
                  m,
                  ops,
                  score: ops.reduce((a?: any, o?: any) => a + o.p, 0),
                  pick: () => this.save({ mx: { ...MX, meal: m } }),
                }
              })
              .sort((a?: any, b?: any) => b.score - a.score || a.m.localeCompare(b.m))
          : []
      const mxMute: string = 'oklch(0.7 0.01 70)',
        slots = [c1n, c2n, c3n].map((n?: any) => (n ? byN(n) : null)),
        mxHead = slots.map((c?: any, i?: any) => (c ? c.n : 'Character ' + (i + 1))),
        mxRows = slots.map((a?: any, i?: any) => ({
          n: mxHead[i],
          cells: slots.map((b?: any) =>
            a && b && a !== b
              ? ((q?: any) => ({ ...q, l: q.has ? q.l.replace('Rank ', '') : 'None', w: '0px' }))(sup(a, b))
              : { l: '—', col: mxMute, w: '0px' },
          ),
        }))
      const pm = slots.map((c?: any, i?: any) => ({ lbl: mxHead[i], m: c && meal ? mop(c) : { l: '—', col: mxMute, w: '76px' } }))
      vals.mx = {
        tileCols: narrow ? 'minmax(0,1fr) auto' : 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
        mxHeadB: [c1n, c2n, c3n].map((n?: any, i?: any) => ({
          l: n || (narrow ? 'Pick ' + (i + 1) : 'Character ' + (i + 1)),
          fg: n ? 'var(--tx, #eee)' : 'var(--ac, oklch(0.8 0.11 75))',
          bs: n ? 'solid' : 'dashed',
          bd: n ? 'var(--line, oklch(0.29 0.012 60))' : 'var(--ac, oklch(0.8 0.11 75))',
          ar: n ? '' : ' ↓',
          go: () => {
            const has = n && [...document.querySelectorAll('[data-jump="mx:' + n + '"]')].some((e?: any) => e.offsetParent)
            this.jumpTo(has ? 'mx:' + n : 'mx-filters')
          },
        })),
        sortBtns: [
          sortBtn('sup', 'Support'),
          sortBtn('cnt', 'Common supports'),
          sortBtn('meal', 'Meal'),
          ...(P < 3 ? [sortBtn('ren', 'Renown', 1), sortBtn('sl', 'Support lvl', 1)] : []),
        ],
        showReq: !narrow && P < 3,
        reqLD: narrow && P < 3 ? 'flex' : 'none',
        lblReqD: 'none',
        meal: meal || '—',
        meals: ['—', ...meals],
        hasMeal: !!meal,
        mxHead,
        mxRows,
        mxCols: 'minmax(70px,.8fr) repeat(3,minmax(0,1fr))',
        mxSel: [
          [c1n, 'c1', [c2n, c3n]],
          [c2n, 'c2', [c1n, c3n]],
          [c3n, 'c3', [c1n, c2n]],
        ].map(([cur, k, ex]: any, i?: any) => ({
          v: cur || '—',
          ph: 'Character ' + (i + 1),
          opts: [
            { v: '—', l: 'Character ' + (i + 1) },
            ...names.filter((n?: any) => !ex.includes(n)).map((n?: any) => ({ v: n, l: n })),
          ],
          on: (e?: any) => this.save({ mx: { ...MX, [k]: e.target.value === '—' ? '' : e.target.value } }),
        })),
        hasSug: sug.length > 0,
        sug,
        sugCols: narrow ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,2.4fr)',
        c1: c1n || '—',
        c1Opts: ['—', ...names.filter((n?: any) => n !== c2n && n !== c3n)],
        c2: c2n || '—',
        c3: c3n || '—',
        c2Opts: ['—', ...names.filter((n?: any) => n !== c1n && n !== c3n)],
        c3Opts: ['—', ...names.filter((n?: any) => n !== c1n && n !== c2n)],
        onC3: (e?: any) => this.save({ mx: { ...MX, c3: e.target.value === '—' ? '' : e.target.value } }),
        reset: () => this.save({ mx: {} }),
        onMeal: (e?: any) => this.save({ mx: { ...MX, meal: e.target.value === '—' ? '' : e.target.value } }),
        onC1: (e?: any) => this.save({ mx: { ...MX, c1: e.target.value === '—' ? '' : e.target.value } }),
        onC2: (e?: any) => this.save({ mx: { ...MX, c2: e.target.value === '—' ? '' : e.target.value } }),
        hasPair: true,
        pairs,
        pm,
        pTotal: pairs.reduce((a?: any, x?: any) => a + x.s.p, 0) + pm.reduce((a?: any, x?: any) => a + x.m.p, 0),
        count:
          list.length +
          ' ' +
          (all ? 'characters' : 'with a support to ' + (chosen.map((x?: any) => x.n).join(', ') || 'anyone')) +
          (meal ? ' · ' + meal : ''),
        toggleAll: () => this.save({ mx: { ...MX, all: !all } }),
        toggleUnrec: () => this.save({ mx: { ...MX, unrec: !MX.unrec, rec: false } }),
        toggleStar: () => this.save({ mx: { ...MX, star: !MX.star } }),
        stBd: MX.star ? t.ac : t.line,
        stBg: MX.star ? t.panel2 : 'transparent',
        stFg: MX.star ? t.tx : t.mu,
        toggleRec: () => this.save({ mx: { ...MX, rec: !MX.rec, unrec: false } }),
        rcBd: MX.rec ? t.ac : t.line,
        rcBg: MX.rec ? t.panel2 : 'transparent',
        rcFg: MX.rec ? t.tx : t.mu,
        unBd: MX.unrec ? t.ac : t.line,
        unBg: MX.unrec ? t.panel2 : 'transparent',
        unFg: MX.unrec ? t.tx : t.mu,
        allBd: !all ? t.ac : t.line,
        allBg: !all ? t.panel2 : 'transparent',
        allFg: !all ? t.tx : t.mu,
        cols: narrow
          ? 'minmax(0,2fr) minmax(0,1fr)'
          : P < 3
            ? 'minmax(0,1fr) minmax(0,1.3fr) minmax(0,.7fr) minmax(0,.7fr) minmax(0,.5fr) minmax(0,.6fr)'
            : 'minmax(0,1fr) minmax(0,1.3fr) minmax(0,.7fr) minmax(0,.7fr)',
        nameCol: narrow ? '1 / -1' : 'auto',
        repOn: !!st.mxRep && !!(c1n && c2n && c3n),
        repName: st.mxRep || '',
        repClose: () => this.setState({ mxRep: null }),
        repOpts: [
          ['c1', c1n],
          ['c2', c2n],
          ['c3', c3n],
        ].map(([k, n]: any) => ({
          n,
          go: () => {
            this.save({ mx: { ...MX, [k]: st.mxRep } })
            this.setState({ mxRep: null })
          },
        })),
        cmnD: narrow ? 'none' : 'flex',
        sugWrap: narrow ? 'nowrap' : 'wrap',
        sugOv: narrow ? 'auto' : 'visible',
        sugFs: narrow ? '11px/1.3' : '12px/1.3',
        sortD: narrow ? 'flex' : 'none',
        sortTabs: [
          ['sup', 'Support'],
          ['cnt', 'Common'],
          ['meal', 'Meal'],
          ...(P < 3
            ? [
                ['ren', 'Renown'],
                ['sl', 'Sup lvl'],
              ]
            : []),
        ].map(([k, l]: any) => {
          const on = MX.sort === k
          return {
            l,
            on,
            bg: on ? t.panel2 : 'transparent',
            fg: on ? t.tx : t.mu,
            click: () => this.save({ mx: { ...MX, sort: on ? '' : k } }),
          }
        }),
        lblD: narrow && !!(c1n || c2n || c3n) ? 'block' : 'none',
        lblMealD: narrow && !!meal ? 'block' : 'none',
        headDisp: narrow ? 'none' : 'grid',
        empty: !list.length,
        rows: list.map((r?: any) => ({
          ...r,
          cntTxt: r.tot ? String(r.cnt) : '—',
          renTxt: r.ren ? r.ren : '—',
          slTxt: r.sl ? r.sl : '—',
          sc: r.score >= 8 ? 'oklch(0.78 0.1 150)' : r.score < 0 ? 'oklch(0.74 0.12 30)' : 'var(--tx, #eee)',
          bg: [c1n, c2n, c3n].includes(r.n) ? t.panel2 : 'transparent',
          pick: () => {
            if (c1n && c2n && c3n && ![c1n, c2n, c3n].includes(r.n)) {
              this.setState({ mxRep: r.n })
              return
            }
            this.save({
              mx: {
                ...MX,
                ...(r.n === c1n
                  ? { c1: '' }
                  : r.n === c2n
                    ? { c2: '' }
                    : r.n === c3n
                      ? { c3: '' }
                      : !c1n
                        ? { c1: r.n }
                        : !c2n
                          ? { c2: r.n }
                          : { c3: r.n }),
              },
            })
          },
          open: (e?: any) => {
            e.stopPropagation()
            open(r.n)()
          },
        })),
      }
    }
    // profile
    const c = d.chars.find((x?: any) => x.n === st.sel)
    if (c) {
      const locked = c.part > P
      vals.imgErr = this.imgErr
      vals.p = {
        n: locked ? 'Sealed unit' : c.n,
        bgi: locked ? 'none' : 'url(' + IMG('characters', c.n) + ') 50% 8%/cover no-repeat',
        title: locked ? '' : c.title,
        type: TL[c.type] || c.type,
        cls: c.cls || 'Class unknown',
        fac: c.fac || '—',
        hasFac: !!c.fac,
        partLbl: PN[c.part],
        pcol: PC[c.part],
        url: c.url,
        tot: tot(c),
        toCalc: () => goCalcFor(c.n),
        calcBtn: 'Unit builder',
        toCmp: () => {
          window.scrollTo(0, 0)
          const ex = builds.find((b?: any) => b.c === c.n)
          if (ex) {
            const cur = st.cmp.filter((x?: any) => x !== ex.id)
            this.save({
              screen: 'compare',
              cmp: [...cur, ex.id].slice(-4),
              ...(st.cchars && !st.cchars.includes(c.n) ? { cchars: [...st.cchars, c.n] } : {}),
            })
            return
          }
          const base = st.cchars || [...new Set<any>(builds.filter((b?: any) => st.cmp.includes(b.id)).map((b?: any) => b.c))]
          this.save({
            screen: 'compare',
            cchars: base.includes(c.n) ? base : [...base, c.n],
            cmp: [...st.cmp, 'base:' + c.n].slice(-4),
          })
        },
        growth: S.map((s?: any, i?: any) => {
          const b = c.g0 && c.g ? c.g[i] - c.g0[i] : 0
          return {
            s,
            v: c.g ? c.g[i] : '—',
            w: (c.g ? ((c.g[i] - b) / 80) * 100 : 0) + '%',
            bw: (b / 80) * 100 + '%',
            hasB: b > 0,
            bv: '+' + b,
          }
        }),
        growthNote: c.g0 ? 'Signs of Growth (personal ability) adds +20 to each rate' : '',
        hasGNote: !!c.g0,
        bms: (c.bm || '')
          .split(/\s*\/\s*/)
          .filter((n?: any) => n && !/^none/i.test(n))
          .map((n?: any) => {
            const seen = new Set<any>()
            const all = d.bloodmarks.filter((b?: any) => b.n === n.trim())
            const b = all.find((x?: any) => (x.c || '').includes(c.n)) || all[0]
            return b
              ? {
                  n: b.n,
                  bgi: 'url(' + IMG('abilities', b.n) + ') center/cover no-repeat',
                  e: b.e,
                  t: b.t ? 'Trigger ' + b.t + '%' : '',
                  also: mask(
                    (b.c || '')
                      .split(/,\s*/)
                      .filter((x?: any) => x !== c.n && !seen.has(x) && seen.add(x))
                      .join(', '),
                  ),
                }
              : {
                  n,
                  bgi: 'url(' + IMG('abilities', n) + ') center/cover no-repeat',
                  e: 'Effect not recorded in the workbook yet.',
                  t: '',
                  also: '',
                }
          }),
        abil: [['Exploration', c.ex]]
          .filter(([k, v]: any) => v && !/^(none|\(none)/i.test(v))
          .map(([k, v, m]: any) => ({ k, v, mt: m || '', hasMt: !!m })),
        fav: c.fav || '—',
        unfav: c.unfav || '—',
        hasBase: !!(c.base || c.lv1e),
        bases: [
          (c.base || c.lv1e) && {
            t: 'Level 1 base stats' + (c.base ? '' : ' (estimated)'),
            cells: S.map((s?: any, i?: any) => ({ s, v: (c.base || c.lv1e)[i] })),
          },
        ].filter(Boolean),
        about: [
          ['Likes', c.likes],
          ['Interests', c.int],
          ['Birthday', c.bday],
          ['Height', c.h],
          ['Age', c.age],
        ]
          .filter(([k, v]: any) => v && v !== 'Unknown')
          .map(([k, v]: any) => ({ k, v })),
        recHidden: !(st.recRev || []).includes(c.n),
        recBlur: (st.recRev || []).includes(c.n) ? 'none' : 'blur(7px)',
        recPe: (st.recRev || []).includes(c.n) ? 'auto' : 'none',
        recSel: (st.recRev || []).includes(c.n) ? 'auto' : 'none',
        recReveal: () => this.setState({ recRev: [...(st.recRev || []), c.n] }),
        recScope: R === 'All' || P >= 3 ? ' · all routes' : ' · ' + R + "'s route",
        rec: c.rec
          .filter((r?: any) => R === 'All' || P >= 3 || r.route === R || r.route === 'All' || r.part >= 3)
          .map((r?: any) => ({
            ...r,
            hasNote: !!r.note,
            mBlur:
              (P < 3 && (r.m === 'Meet requirements & talk' || r.m === 'Automatic')) ||
              ['Cai', 'Dietrich', 'Theodora', 'Leda'].includes(c.n) ||
              (st.recRev || []).includes(c.n)
                ? 'none'
                : 'blur(7px)',
          }))
          .map((r?: any) => {
            const ok = r.ok === 'Yes',
              lk = ok && r.part > P
            const req = [r.req, r.gold && r.gold + ' gold', r.dates && 'Deadline ' + r.dates]
              .filter(Boolean)
              .join(' · ')
            const tags = ok ? [r.ren && 'Renown ' + r.ren, r.sup && 'Support ' + r.sup].filter(Boolean) : []
            return {
              mBlur: r.mBlur,
              route: r.route,
              where: ok ? PN[r.part] + (r.ch ? ' · Ch. ' + r.ch : '') : 'Not recruitable',
              col: ok ? PC[r.part] : t.mu,
              method: ok ? r.m : '',
              tags,
              hasTags: tags.length > 0,
              tagLine: tags.join(' · '),
              req,
              showReq: !!req && !lk,
              sealed: !!req && lk,
            }
          }),
        hasLs: c.ls.length > 0,
        ls: this.lsAll(c).map((l?: any) => ({
          c: l.c,
          hasIc: l.hasIc,
          bgi: l.bgi,
          af: l.af,
          aft: l.aft,
          afc: l.afc,
          afEnter: l.afEnter,
          afLeave: l.afLeave,
          n: ((r?: any) =>
            r
              .slice(0, 5)
              .reduce((s?: any, v?: any) => s + (v && v !== '?' ? v.split(/,\s*(?![^()]*\))/).filter(Boolean).length : 0), 0))(l.r),
          r: l.r
            .slice(0, 5)
            .map((v?: any) => ({
              bg: t.panel,
              lines: this.lsLines(v, t).map((z?: any) => ({ ...z, bg: z.on ? t.panel2 : 'transparent' })),
            })),
        })),
      }
      vals.p.recHidden =
        !(st.recRev || []).includes(c.n) &&
        !['Cai', 'Dietrich', 'Theodora', 'Leda'].includes(c.n) &&
        (P >= 3 || vals.p.rec.some((r?: any) => (r.method && r.mBlur !== 'none') || r.showReq))
      {
        const avN = new Set<any>(avail.map((x?: any) => x.n))
        const sp = (c.sup || []).map((x?: any) => (avN.has(x.n) ? x : { n: 'Hidden unit', r: '?', lk: 1 })),
          gf: any = c.gf || { loved: [], liked: [] },
          pr = c.pr || []
        const mm: any = c.ml || {}
        vals.p.meals = [
          ['Loves meal', 'loves', 'oklch(0.78 0.1 150)'],
          ['Likes meal', 'likes', 'oklch(0.78 0.1 110)'],
          ['Neutral meal', 'neutral', 'oklch(0.7 0.01 70)'],
          ['Dislikes meal', 'dislikes', 'oklch(0.74 0.12 30)'],
        ]
          .filter(([a, k]: any) => (mm[k] || []).length)
          .map(([a, k, col]: any) => ({ k: a, v: mm[k].join(', '), col }))
        vals.p.hasGifts = gf.loved.length + gf.liked.length > 0
        vals.p.hasMeals = vals.p.meals.length > 0
        vals.p.hasRel = sp.length > 0 || gf.loved.length + gf.liked.length > 0 || vals.p.meals.length > 0
        {
          const SL: Record<string, any> = {
            hit: 'Hit',
            avoid: 'Avoid',
            physical: 'Physical',
            protection: 'Protection',
            mystical: 'Mystical',
            resilience: 'Resilience',
            critical: 'Critical',
            dodge: 'Dodge',
            attack_speed: 'Attack speed',
          }
          vals.p.sup = sp.map((s?: any) => {
            const has = !!(s.b && s.b.length)
            const body = has ? s.b.map(([k, v]: any) => (SL[k] || k) + ' +' + v).join(', ') : ''
            return {
              n: s.n,
              r: s.r || '?',
              blur: s.lk ? 'blur(7px)' : 'none',
              pe: s.lk ? 'none' : 'auto',
              cur: has ? 'help' : 'default',
              enter: has
                ? (ev?: any) => {
                    const r = ev.currentTarget.getBoundingClientRect()
                    const x = Math.max(12, Math.min(r.left, window.innerWidth - 312))
                    const below = r.bottom + 160 < window.innerHeight
                    this.setState({
                      tip: {
                        t: s.n,
                        sub: 'Support bonus' + (s.nc ? ' · no support conversation' : ''),
                        body,
                        bodyCol: 'var(--tx, #eee)',
                        note: '',
                        who: '',
                        whoLbl: '',
                        whoGroups: [],
                        hasGroups: false,
                        x: x + 'px',
                        y: (below ? r.bottom + 8 : r.top - 8) + 'px',
                        tf: below ? 'none' : 'translateY(-100%)',
                        raw: null,
                      },
                    })
                  }
                : () => {},
              leave: () => {
                if (window.matchMedia && window.matchMedia('(hover:hover)').matches) this.setState({ tip: null })
              },
            }
          })
        }
        vals.p.hasSup = sp.length > 0
        vals.p.gfLoved = gf.loved.join(', ')
        vals.p.gfLiked = gf.liked.join(', ')
        vals.p.hasLoved = gf.loved.length > 0
        vals.p.hasLiked = gf.liked.length > 0
        vals.p.pr = pr
        vals.p.hasPr = pr.length > 0
        const go = (k?: any) => () => {
          const el = [...document.querySelectorAll('[data-jump="' + k + '"]')].find((e?: any) => e.offsetParent)
          if (!el) return
          let p = el.parentElement
          while (
            p &&
            p !== document.body &&
            !(p.scrollHeight > p.clientHeight + 2 && /(auto|scroll)/.test(getComputedStyle(p).overflowY))
          )
            p = p.parentElement
          let off = 16
          document.querySelectorAll('header,div,nav').forEach((h?: any) => {
            if (h.contains(el)) return
            const cs = getComputedStyle(h)
            if (cs.position !== 'sticky' && cs.position !== 'fixed') return
            const b = h.getBoundingClientRect()
            if (b.top <= 1 && b.bottom > 0 && b.bottom < 220 && b.width > 200) off = Math.max(off, b.bottom + 10)
          })
          const dy = el.getBoundingClientRect().top - off
          if (p && p !== document.body) p.scrollBy({ top: dy, behavior: 'smooth' })
          else window.scrollBy({ top: dy, behavior: 'smooth' })
        }
        vals.p.jumps = [
          ['Growth profile', 'radar', !!c.g],
          ['Base stats & growth', 'growth', !!(c.g || c.base || c.lv1e)],
          ['Bloodmark', 'bm', vals.p.bms.length > 0],
          ['Base stats profile', 'bradar', vals.p.hasBase],
          ['Abilities', 'lv', true],
          ['Recruitment', 'rec', (c.rec || []).length > 0],
          ['Supports', 'sup', sp.length > 0],
          ['Gifts', 'gifts', vals.p.hasGifts],
          ['Meals', 'meals', vals.p.hasMeals],
          ['Learnset', 'ls', (c.ls || []).length > 0],
          ['Pale Raven', 'pr', pr.length > 0],
        ]
          .filter((x?: any) => x[2])
          .map(([l, k]: any) => ({ l, k, go: go(k) }))
        const isP = st.screen === 'profile'
        const pkeys = vals.p.jumps.map((j?: any) => j.k)
        if (isP) this.spyKeys = pkeys
        const jo = (st.jscr === st.screen ? st.jord || '' : '').split('|')
        vals.p.jumps = vals.p.jumps.slice().sort((p?: any, q?: any) => {
          const x = jo.indexOf(p.k),
            y = jo.indexOf(q.k)
          return (x < 0 ? 99 : x) - (y < 0 ? 99 : y)
        })
        const spy = pkeys.includes(st.spy) ? st.spy : (vals.p.jumps[0] || {}).k
        const pj0 = vals.p.jumps
        if (!narrow)
          vals.p.jumps = this.rg(pj0, (j?: any) => j.k).map((gp?: any) => ({
            ...gp[0],
            l: gp.map((x?: any) => x.l).join(' · '),
            grpKs: gp.map((x?: any) => x.k),
          }))
        vals.p.jumps = vals.p.jumps.map((j?: any) => {
          const on = (j.grpKs || [j.k]).includes(spy),
            sh = !narrow && ((on && !st.railOff) || st.jhv === j.k)
          return {
            ...j,
            dot: on ? 'var(--ac, oklch(0.8 0.11 75))' : 'var(--mu, oklch(0.78 0.035 120))',
            dop: on ? 1 : 0.55,
            ...(sh ? { lblW: '240px', lblP: '3px 8px', lblBw: '1px' } : { lblW: '0px', lblP: '3px 0', lblBw: '0px' }),
            enter: () => this.setState({ jhv: j.k }),
            leave: () => this.setState({ jhv: null }),
          }
        })
        vals.p.railR = '10px'
        vals.p.railH = '26px'
        vals.p.hasJumps = !narrow && vals.p.jumps.length > 0
        if (isP && narrow && vals.p.jumps.length) {
          const cur = vals.p.jumps.find((j?: any) => j.k === spy) || vals.p.jumps[0]
          const cl = () => this.setState({ jmOpen: false })
          vals.jmOn = true
          vals.topShow = false
          vals.jmOpen = !!st.jmOpen
          vals.jmLabel = cur.l
          vals.jmTog = () => this.setState({ jmOpen: !st.jmOpen })
          vals.jmClose = cl
          vals.jmItems = vals.p.jumps.map((j?: any) => ({
            l: j.l,
            fg: j.k === spy ? 'var(--ac, oklch(0.82 0.12 85))' : 'var(--tx, #eee)',
            bg: j.k === spy ? 'var(--panel2, oklch(0.25 0.012 60))' : 'transparent',
            click: () => {
              cl()
              j.go()
            },
          }))
          vals.jmTop = () => {
            cl()
            vals.toTop()
          }
        }
      }
      {
        const bb0 = c.base || c.lv1e,
          gg = c.g
        vals.p.hasG = !!gg
        vals.p.bcap = 'Level 1 base stats' + (c.base ? '' : ' (estimated)')
        vals.p.btot = bb0 ? bb0.reduce((a?: any, b?: any) => a + b, 0) : '—'
        const arw = (pool?: any, i?: any, v?: any) => {
          if (typeof v !== 'number' || !pool.length) return { ar: '', ac: 'transparent' }
          const p = pool.filter((x?: any) => x < v).length / pool.length,
            q = pool.filter((x?: any) => x <= v).length / pool.length,
            m = (p + q) / 2
          return v === Math.max(...pool)
            ? { ar: '★', ac: 'var(--ac, oklch(0.82 0.12 85))' }
            : m >= 0.9
              ? { ar: '⇈', ac: 'oklch(0.85 0.14 150)' }
              : m >= 0.7
                ? { ar: '↑', ac: 'oklch(0.85 0.14 150)' }
                : m <= 0.1
                  ? { ar: '⇊', ac: 'oklch(0.74 0.12 30)' }
                  : m <= 0.3
                    ? { ar: '↓', ac: 'oklch(0.74 0.12 30)' }
                    : { ar: '', ac: 'transparent' }
        }
        vals.p.bcells = S.map((s?: any, i?: any) => ({
          s,
          v: bb0 ? bb0[i] : '—',
          ...arw(
            d.chars.filter((x?: any) => x.base || x.lv1e).map((x?: any) => (x.base || x.lv1e)[i]),
            i,
            bb0 ? bb0[i] : null,
          ),
        }))
        vals.p.gcells = S.map((s?: any, i?: any) => ({
          s,
          v: gg ? gg[i] : '—',
          ...arw(
            d.chars.filter((x?: any) => x.g).map((x?: any) => x.g[i]),
            i,
            gg ? gg[i] : null,
          ),
        }))
        vals.p.hasRaw = !!(bb0 || gg)
        vals.p.showRec = true
        vals.p.raw = S.map((s?: any, i?: any) => ({ s, b: bb0 ? bb0[i] : '—', g: gg ? gg[i] + '%' : '—' }))
        vals.p.rawBt = bb0 ? bb0.reduce((a?: any, b?: any) => a + b, 0) : '—'
        vals.p.rawGt = gg ? gg.reduce((a?: any, b?: any) => a + b, 0) + '%' : '—'
      }
      {
        const bp = d.chars.filter((x?: any) => x.base || x.lv1e),
          bs = (x?: any) => x.base || x.lv1e,
          cb = bs(c) || null
        const cx = 150,
          cy = 145,
          RR = 110
        const pt = (i?: any, f?: any) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / 9,
            r = f * RR
          return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
        }
        const fmt = (p?: any) => p.map((n?: any) => n.toFixed(1)).join(',')
        const fr = S.map((s?: any, i?: any) => {
          const vs = bp.map((x?: any) => bs(x)[i])
          const mn = Math.min(...vs),
            mx = Math.max(...vs)
          const v = cb ? cb[i] : mn
          return { f: mx === mn ? 1 : Math.max(0.07, (v - mn) / (mx - mn)), top: v === mx, low: v === mn }
        })
        vals.p.bradar = {
          n: bp.length,
          rings: [0.25, 0.5, 0.75, 1].map((f?: any) => S.map((s?: any, i?: any) => fmt(pt(i, f))).join(' ')),
          axes: S.map((s?: any, i?: any) => {
            const [x, y] = pt(i, 1),
              [lx, ly] = pt(i, 1.16)
            return { s, x, y, lxp: (lx / 300) * 100 + '%', lyp: (ly / 290) * 100 + '%' }
          }),
          pts: fr.map((r?: any, i?: any) => fmt(pt(i, r.f))).join(' '),
          dots: fr.map((r?: any, i?: any) => {
            const [x, y] = pt(i, r.f)
            return {
              x,
              y,
              ...tipH(String(cb ? cb[i] : '—'), S[i] + ' base' + (r.top ? ' · highest' : r.low ? ' · lowest' : '')),
              col: r.top ? 'oklch(0.85 0.14 150)' : r.low ? 'oklch(0.74 0.12 30)' : 'var(--ac, oklch(0.82 0.12 85))',
            }
          }),
        }
      }
      vals.p.abil = vals.p.abil.map((a?: any) => {
        if (a.k !== 'Bloodmark') return { ...a, enter: () => {}, leave: () => {}, cur: 'default', deco: 'none' }
        const nm = a.v
          .split(/\s*\/\s*/)[0]
          .split(':')[0]
          .trim()
        const h = this.hov(nm)
        return { ...a, enter: h.enter, leave: h.leave, cur: 'help', deco: 'underline' }
      })
      {
        const pool = d.chars.filter((x?: any) => x.g)
        const cx = 150,
          cy = 145,
          RR = 110
        const pt = (i?: any, f?: any) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / 9,
            r = f * RR
          return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
        }
        const fmt = (p?: any) => p.map((n?: any) => n.toFixed(1)).join(',')
        const fr = S.map((s?: any, i?: any) => {
          const vs = pool.map((x?: any) => x.g[i])
          const mn = Math.min(...vs),
            mx = Math.max(...vs)
          const v = c.g ? c.g[i] : mn
          return { f: mx === mn ? 1 : Math.max(0.07, (v - mn) / (mx - mn)), top: v === mx, low: v === mn }
        })
        vals.p.radar = {
          n: pool.length,
          rings: [0.25, 0.5, 0.75, 1].map((f?: any) => S.map((s?: any, i?: any) => fmt(pt(i, f))).join(' ')),
          axes: S.map((s?: any, i?: any) => {
            const [x, y] = pt(i, 1),
              [lx, ly] = pt(i, 1.16)
            return { s, x, y, lxp: (lx / 300) * 100 + '%', lyp: (ly / 290) * 100 + '%' }
          }),
          pts: fr.map((r?: any, i?: any) => fmt(pt(i, r.f))).join(' '),
          dots: fr.map((r?: any, i?: any) => {
            const [x, y] = pt(i, r.f)
            return {
              x,
              y,
              ...tipH(c.g ? c.g[i] + '%' : '—', S[i] + ' growth' + (r.top ? ' · highest' : r.low ? ' · lowest' : '')),
              col: r.top ? 'oklch(0.85 0.14 150)' : r.low ? 'oklch(0.74 0.12 30)' : 'var(--ac, oklch(0.82 0.12 85))',
            }
          }),
        }
      }
      const pc2 = c.g && c.part <= P
      vals.p.lsNarrow = narrow && c.ls.length > 0 && st.ptab !== 'calc'
      vals.p.lsWide = !narrow && c.ls.length > 0 && st.ptab !== 'calc'
      const LVH = (n?: any) => this.hov(n)
      vals.p.lvl = [
        ...(c.pa && !/^(none|\(none)/i.test(c.pa)
          ? [
              (() => {
                const i = c.pa.indexOf(': ')
                return {
                  lv: 'Personal',
                  n: i < 0 ? c.pa : c.pa.slice(0, i),
                  e: i < 0 ? '' : c.pa.slice(i + 2),
                  mt: MT(c.pm),
                }
              })(),
            ]
          : []),
        ...(c.lab || []).map((a?: any) => ({ lv: a.lv ? 'Lv ' + a.lv : 'Upgrade', n: a.n, e: a.e, mt: MT(a.m) })),
      ].map((x?: any) => ({ ...x, bgi: 'url(' + IMG('abilities', x.n) + ') center/cover no-repeat', ...LVH(x.n) }))
      vals.p.lvlShow = vals.p.lvl.length > 0 && st.ptab !== 'calc'
      vals.p.lsList = this.lsAll(c)
        .map((l?: any) => ({
          c: l.c,
          hasIc: l.hasIc,
          bgi: l.bgi,
          af: l.af,
          aft: l.aft,
          afc: l.afc,
          afEnter: l.afEnter,
          afLeave: l.afLeave,
          n: ((r?: any) =>
            r
              .slice(0, 5)
              .reduce((s?: any, v?: any) => s + (v && v !== '?' ? v.split(/,\s*(?![^()]*\))/).filter(Boolean).length : 0), 0))(l.r),
          items: l.r
            .slice(0, 5)
            .map((v?: any, i?: any) => ({ v, rank: (['D', 'C', 'B', 'A', 'S'] as any)[i] }))
            .filter((x?: any) => x.v)
            .map((x?: any) => ({
              rank: x.rank,
              lines: this.lsLines(x.v, t).map((z?: any) => ({
                ...z,
                bg: z.on ? t.ac.replace(')', ' / .18)') : 'transparent',
              })),
            })),
        }))
        .filter((l?: any) => l.items.length)
      const ptab: string = 'info'
      vals.pTabs = [
        ['info', 'Profile'],
        ['calc', 'Builds'],
      ]
        .filter(([id]: any) => id === 'info' || pc2)
        .map(([id, l]: any) => ({
          l,
          fg: ptab === id ? t.tx : t.mu,
          bar: ptab === id ? t.ac : 'transparent',
          click: () => this.save({ ptab: id }),
        }))
      vals.pGrid = ptab === 'calc' ? 'none' : 'grid'
      {
        const DEF = ['lv', 'bm', 'sup', 'growth', 'rec', 'bradar', 'radar', 'ls', 'pr', 'meals', 'gifts']
        const saved = (st.pOrd || []).filter((k?: any) => DEF.includes(k))
        const ord = [...saved, ...DEF.filter((k?: any) => !saved.includes(k))]
        const pd: Record<string, any> = {
          over: (e?: any) => {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'move'
          },
          end: () => this.setState({ pDrag: null, pOver: null }),
        }
        const col: any = st.pW || {}
        const DW: Record<string, any> = { pr: 4, rec: 1, radar: 2, gifts: 2, lv: 1, sup: 2, bm: 1, growth: 3, bradar: 2, meals: 2, ls: 4 }
        const N = narrow ? 3 : Math.min(4, Math.max(2, st.pCols || 4))
        pd.n = N
        vals.pColCtl = phone || narrow || ptab === 'calc' ? 'none' : 'flex'
        vals.pColOpts = [2, 3, 4].map((n?: any) => ({
          n,
          bg: n === N ? t.ac : 'transparent',
          fg: n === N ? 'oklch(0.18 0.01 60)' : t.mu,
          click: () => this.save({ pCols: n }),
        }))
        vals.pGridCols =
          narrow || N === 3 ? 'repeat(auto-fit,minmax(min(100%,320px),1fr))' : 'repeat(' + N + ',minmax(0,1fr))'
        ord.forEach((k?: any, i?: any) => {
          const w0 = col[k]
          const w =
            k === 'ls' ? N : Math.min(N, w0 === undefined ? DW[k] || 1 : w0 === true ? 2 : w0 === false ? 1 : w0)
          const set = (v?: any) => (e?: any) => {
            e.stopPropagation()
            this.save({ pW: { ...col, [k]: v } })
          }
          pd[k] = {
            o: i,
            gc: narrow ? 'span 1' : w >= N ? '1 / -1' : 'span ' + w,
            mh: 'none',
            ov: k === 'ls' || k === 'lv' ? 'auto' : 'visible',
            wl: w,
            bars: '▮'.repeat(w) + '▯'.repeat(N - w),
            cyc: set(w >= N ? 1 : w + 1),
            ...[1, 2, 3].reduce(
              (o?: any, x?: any) => (
                (o['b' + x] = w === x ? t.ac : 'transparent'),
                (o['f' + x] = w === x ? 'oklch(0.18 0.01 60)' : t.mu),
                o
              ),
              {},
            ),
            op: st.pDrag === k ? 0.45 : 1,
            ol:
              st.pDrag && st.pDrag !== k && st.pOver === k
                ? (ord.indexOf(st.pDrag) > i ? '-5px 0 0 0 ' : '5px 0 0 0 ') + 'var(--ac, oklch(0.82 0.12 85))'
                : 'none',
            start: (e?: any) => {
              e.dataTransfer.effectAllowed = 'move'
              try {
                e.dataTransfer.setData('text/plain', k)
              } catch (_: any) {}
              this.setState({ pDrag: k })
            },
            drop: (e?: any) => {
              e.preventDefault()
              const from = st.pDrag || e.dataTransfer.getData('text/plain')
              if (!from || from === k) {
                this.setState({ pDrag: null, pOver: null })
                return
              }
              const o = ord.filter((x?: any) => x !== from)
              o.splice(o.indexOf(k) + (ord.indexOf(from) < ord.indexOf(k) ? 1 : 0), 0, from)
              this.setState({ pDrag: null, pOver: null })
              this.save({ pOrd: o })
            },
          }
        })
        pd.over = (e?: any) => {
          e.preventDefault()
          const el = e.currentTarget
          const k = ord[+getComputedStyle(el).order]
          if (k && this.state.pOver !== k) this.setState({ pOver: k })
        }
        pd.ic = phone ? 'none' : 'inline-block'
        pd.wic = phone || narrow ? 'none' : 'inline-flex'
        vals.p.jumps = vals.p.jumps
          .filter((j?: any) => j.k !== 'lv' || vals.p.lvlShow)
          .sort((a?: any, b?: any) => ord.indexOf(a.k) - ord.indexOf(b.k))
        vals.pd = pd
      }
      vals.pFlex = ptab === 'calc' ? 'none' : 'flex'
      vals.p.hasBm = vals.p.bms.length > 0
      vals.p.hasAbout = vals.p.about.length > 0
    }
    return vals
  }

  render() {
    return <AppView v={{ ...this.props, ...this.renderVals() }} />
  }
}
