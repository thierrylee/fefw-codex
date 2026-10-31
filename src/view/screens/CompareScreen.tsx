import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function CompareScreen({ v }: { v: VM }) {
  return (
    <>
      <section
        data-screen-label="Compare"
        style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingTop: str(v.secPT) } as CSSProperties}
      >
        {v.rlOn ? (
          <>
            <div
              style={
                {
                  position: 'fixed',
                  right: '10px',
                  bottom: '16px',
                  zIndex: '5',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  pointerEvents: 'none',
                  transform: str(v.railTf),
                  transition: 'transform .35s cubic-bezier(.2,.8,.2,1)',
                } as CSSProperties
              }
              onMouseEnter={v.railEnter}
              onMouseLeave={v.railLeave}
            >
              {L(v.rl).map((j: any, $index: number) => (
                <Fragment key={$index}>
                  <button
                    onClick={j?.go}
                    onMouseEnter={j?.enter}
                    onMouseLeave={j?.leave}
                    aria-label={j?.l}
                    style={{
                      pointerEvents: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      minHeight: '26px',
                      padding: '0 6px',
                      border: '0',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'var(--tx, #eee)',
                    }}
                  >
                    <span
                      style={
                        {
                          display: 'inline-block',
                          overflow: 'hidden',
                          maxWidth: str(j?.lblW),
                          fontSize: '12px',
                          padding: str(j?.lblP),
                          borderRadius: '6px',
                          background: 'var(--panel2, oklch(0.25 0.012 60))',
                          borderStyle: 'solid',
                          borderColor: 'var(--line, oklch(0.29 0.012 60))',
                          borderWidth: str(j?.lblBw),
                          whiteSpace: 'nowrap',
                          transition: 'max-width .3s cubic-bezier(.2,.8,.2,1),padding .3s,border-width .3s',
                        } as CSSProperties
                      }
                    >
                      {T(j?.l)}
                    </span>
                    <span
                      style={
                        {
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: str(j?.dot),
                          opacity: str(j?.dop),
                        } as CSSProperties
                      }
                    ></span>
                  </button>
                </Fragment>
              ))}
            </div>
          </>
        ) : null}
        <div style={{ display: str(v.cmpHeadD), flexDirection: 'column', gap: '4px' } as CSSProperties}>
          <h1
            style={
              {
                position: str(v.stickyPos),
                top: 'var(--hh,0px)',
                zIndex: '3',
                background: 'var(--bg, oklch(0.2 0.045 165))',
                boxShadow: '-32px 0 0 var(--bg, oklch(0.2 0.045 165)),32px 0 0 var(--bg, oklch(0.2 0.045 165))',
                minHeight: str(v.stickyMH),
                paddingTop: str(v.stickyPT),
                display: str(v.h1Disp),
                margin: '0',
                font: "600 30px/1.1 'Cinzel',serif",
              } as CSSProperties
            }
          >
            Compare builds
          </h1>
          <span style={{ marginTop: str(v.subGap), color: 'var(--mu, oklch(0.7 0.01 70))' } as CSSProperties}>
            {'Pick up to '}
            {T(v.cmpLimTxt)}
            {
              ' saved builds. Radar shows total growth rates; the table shows projected stats (average, with below–above average range).'
            }
          </span>
        </div>
        <div data-jump="b-units" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {L(v.cmpGroups).map((g: any, $index: number) => (
            <Fragment key={$index}>
              <div
                draggable="true"
                onDragStart={g?.dStart}
                onDragOver={g?.dOver}
                onDrop={g?.dDrop}
                onDragEnd={g?.dEnd}
                style={
                  {
                    opacity: str(g?.dim),
                    boxShadow: str(g?.sh),
                    cursor: 'grab',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    minWidth: '0',
                    maxWidth: '100%',
                    padding: '8px 8px 10px 14px',
                    borderRadius: 'var(--r, 14px)',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(g?.name)}</span>
                    <button
                      onClick={g?.profile}
                      style={
                        {
                          height: str(v.tk28),
                          padding: '0 10px',
                          borderRadius: '999px',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          background: 'transparent',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          cursor: 'pointer',
                          fontSize: '12px',
                          lineHeight: '1',
                        } as CSSProperties
                      }
                      className="hv-15"
                    >
                      View Profile
                    </button>
                  </div>
                  <button
                    onClick={g?.close}
                    title="Hide this character (builds are kept)"
                    style={
                      {
                        width: str(v.tk28),
                        height: str(v.tk28),
                        border: '0',
                        borderRadius: '50%',
                        background: 'transparent',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                        cursor: 'pointer',
                        fontSize: '16px',
                        lineHeight: '1',
                      } as CSSProperties
                    }
                    className="hv-16"
                  >
                    ×
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingRight: '6px' }}>
                  {L(g?.builds).map((b: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={
                          {
                            display: 'flex',
                            alignItems: 'stretch',
                            minHeight: '36px',
                            borderRadius: '999px',
                            border: `1px solid ${str(b?.bd)}`,
                            background: str(b?.bg),
                            overflow: 'hidden',
                          } as CSSProperties
                        }
                      >
                        <button
                          onClick={b?.toggle}
                          title={b?.tip}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            border: '0',
                            background: 'transparent',
                            color: 'inherit',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          <span
                            style={
                              {
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                border: `2px solid ${str(b?.col)}`,
                                background: str(b?.dot),
                              } as CSSProperties
                            }
                          ></span>
                          <span>{T(b?.nm)}</span>
                          <span
                            onClick={b?.rm}
                            title="Remove base"
                            style={
                              {
                                display: str(b?.rmDisp),
                                marginLeft: '2px',
                                color: 'var(--mu, oklch(0.7 0.01 70))',
                                lineHeight: '1',
                              } as CSSProperties
                            }
                          >
                            ×
                          </span>
                        </button>
                        <button
                          onClick={b?.go}
                          title="Open in unit builder"
                          aria-label="Open in unit builder"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '44px',
                            padding: '0 10px',
                            border: '0',
                            borderLeft: '1px solid var(--line, oklch(0.29 0.012 60))',
                            background: 'transparent',
                            color: 'var(--ac, oklch(0.8 0.11 75))',
                            cursor: 'pointer',
                            fontSize: '14px',
                          }}
                          className="hv-6"
                        >
                          ↗
                        </button>
                      </div>
                    </Fragment>
                  ))}
                  <button
                    onClick={g?.toggleBase}
                    title="Include this character's base stats (Lv 1)"
                    style={
                      {
                        display: str(g?.baseDisp),
                        alignItems: 'center',
                        minHeight: '34px',
                        padding: '7px 12px',
                        borderRadius: '999px',
                        border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                        background: 'transparent',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                        cursor: 'pointer',
                        fontSize: '12px',
                      } as CSSProperties
                    }
                  >
                    {T(g?.baseLbl)}
                  </button>
                </div>
                <span
                  style={
                    {
                      display: str(g?.emptyDisp),
                      width: '0',
                      minWidth: '100%',
                      fontSize: '12px',
                      lineHeight: '1.35',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    } as CSSProperties
                  }
                >
                  {T(g?.empty)}
                </span>
              </div>
            </Fragment>
          ))}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignSelf: 'stretch',
              padding: '8px 8px 10px 14px',
              borderRadius: 'var(--r, 14px)',
              border: '1px solid var(--line, oklch(0.29 0.012 60))',
              background: 'var(--panel, oklch(0.2 0.01 60))',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <span style={{ fontWeight: '600', fontSize: '13px' }}>Characters</span>
              <button
                onClick={v.clearAllCmp}
                style={
                  {
                    display: str(v.clearAllDisp),
                    height: str(v.tk28),
                    padding: '0 10px',
                    border: '0',
                    borderRadius: '999px',
                    background: 'transparent',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                    cursor: 'pointer',
                    fontSize: '12px',
                    lineHeight: '1',
                  } as CSSProperties
                }
                className="hv-16"
              >
                Remove all
              </button>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingRight: '6px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: '36px',
                  padding: '0 4px 0 12px',
                  borderRadius: '999px',
                  border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>+ Add</span>
                <input
                  list="cmp-chars"
                  value={v.cq ?? ''}
                  onChange={v.onAddChar}
                  placeholder="Search character…"
                  autoComplete="off"
                  style={{
                    width: '170px',
                    padding: '4px 8px',
                    border: '0',
                    background: 'transparent',
                    color: 'var(--tx)',
                    colorScheme: 'dark',
                    boxShadow: 'inset 0 0 0 100px var(--panel)',
                    font: 'inherit',
                    fontSize: '12px',
                    outline: 'none',
                  }}
                />
                <datalist id="cmp-chars">
                  {L(v.addOpts).map((o: any, $index: number) => (
                    <Fragment key={$index}>
                      <option value={o ?? ''}></option>
                    </Fragment>
                  ))}
                </datalist>
              </div>
            </div>
          </div>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
          {'Tap a build to show/hide it (max '}
          {T(v.cmpLim)}) · × hides a character
        </span>
        {v.noBuilds ? (
          <>
            <div
              style={{
                padding: '24px',
                borderRadius: 'var(--r, 14px)',
                border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              No characters selected — add one above to compare its saved builds.
            </div>
          </>
        ) : null}
        <div
          style={
            {
              display: str(v.cColCtl),
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '8px',
              font: "500 10px/1 'IBM Plex Mono',monospace",
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--mu, oklch(0.7 0.01 70))',
            } as CSSProperties
          }
        >
          <span>Columns</span>
          <span
            style={{
              display: 'flex',
              borderRadius: '6px',
              border: '1px solid var(--line, oklch(0.29 0.012 60))',
              overflow: 'hidden',
            }}
          >
            {L(v.cColOpts).map((o: any, $index: number) => (
              <Fragment key={$index}>
                <button
                  onClick={o?.click}
                  title={`Max ${str(o?.n)} columns`}
                  style={
                    {
                      height: '26px',
                      minWidth: '30px',
                      padding: '0 9px',
                      border: '0',
                      background: str(o?.bg),
                      color: str(o?.fg),
                      cursor: 'pointer',
                      font: "500 11px/1 'IBM Plex Mono',monospace",
                    } as CSSProperties
                  }
                >
                  {T(o?.n)}
                </button>
              </Fragment>
            ))}
          </span>
        </div>
        <div
          style={
            {
              display: 'grid',
              gridTemplateColumns: str(v.cGridCols),
              gap: '16px',
              alignItems: 'start',
            } as CSSProperties
          }
        >
          <div
            data-jump="b-gro"
            draggable="true"
            onDragStart={v.ct?.radar?.start}
            onDragOver={v.ct?.over}
            onDrop={v.ct?.radar?.drop}
            onDragEnd={v.ct?.end}
            title="Drag to move"
            style={
              {
                gridColumn: str(v.rWideCol),
                order: str(v.ct?.radar?.o),
                opacity: str(v.ct?.radar?.op),
                boxShadow: str(v.ct?.radar?.ol),
                cursor: 'grab',
                padding: '20px',
                borderRadius: 'var(--r, 14px)',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              } as CSSProperties
            }
          >
            <div
              style={{
                alignSelf: 'stretch',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <span
                style={{
                  font: "500 10px/1 'IBM Plex Mono',monospace",
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                }}
              >
                <span
                  title="Drag to move"
                  style={
                    {
                      display: str(v.cdd?.ic),
                      marginRight: '8px',
                      fontSize: '14px',
                      lineHeight: '1',
                      cursor: 'grab',
                      userSelect: 'none',
                    } as CSSProperties
                  }
                >
                  ⠿
                </span>
                Growth rates
              </span>
              <button
                title={`Tile width: ${str(v.rWl)} of ${str(v.cNC)} columns — click to change`}
                onClick={v.rCyc}
                style={
                  {
                    flex: 'none',
                    display: str(v.cwBtn),
                    alignItems: 'center',
                    gap: '6px',
                    height: '26px',
                    padding: '0 9px',
                    borderRadius: '6px',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                    background: 'transparent',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                    cursor: 'pointer',
                    font: "500 11px/1 'IBM Plex Mono',monospace",
                  } as CSSProperties
                }
              >
                <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.rBars)}</span>
                <span>
                  {T(v.rWl)}/{T(v.cNC)}
                </span>
              </button>
            </div>
            <div style={{ alignSelf: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
              {L(v.cmpSel).map((h: any, $index: number) => (
                <Fragment key={$index}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                    <span
                      style={
                        { width: '10px', height: '10px', borderRadius: '3px', background: str(h?.col) } as CSSProperties
                      }
                    ></span>
                    <span>{T(h?.ch)}</span>
                    <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(h?.bn)}</span>
                  </span>
                </Fragment>
              ))}
            </div>
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
              <svg viewBox="0 0 340 340" style={{ display: 'block', width: '100%', overflow: 'visible' }}>
                {L(v.radar?.rings).map((g: any, $index: number) => (
                  <Fragment key={$index}>
                    <polygon points={g} fill="none" stroke="rgba(255,255,255,.09)"></polygon>
                  </Fragment>
                ))}
                {L(v.radar?.axes).map((a: any, $index: number) => (
                  <Fragment key={$index}>
                    <line x1="170" y1="170" x2={a?.x} y2={a?.y} stroke={a?.lc} strokeWidth={a?.lw}></line>
                    <line
                      x1="170"
                      y1="170"
                      x2={a?.x}
                      y2={a?.y}
                      stroke="transparent"
                      strokeWidth="18"
                      onMouseEnter={a?.hon}
                      onMouseLeave={a?.hoff}
                      style={{ cursor: 'help' }}
                    ></line>
                  </Fragment>
                ))}
                <path
                  d={v.radar?.band}
                  fill="oklch(0.82 0.12 85)"
                  fillOpacity=".24"
                  fillRule="evenodd"
                  stroke="none"
                ></path>
                {L(v.radar?.series).map((s: any, $index: number) => (
                  <Fragment key={$index}>
                    <polygon
                      points={s?.pts}
                      fill={s?.col}
                      fillOpacity=".14"
                      stroke={s?.col}
                      strokeWidth="2"
                      strokeLinejoin="round"
                    ></polygon>
                  </Fragment>
                ))}
                {L(v.radar?.dots).map((d: any, $index: number) => (
                  <Fragment key={$index}>
                    <circle
                      cx={d?.x}
                      cy={d?.y}
                      r={d?.r}
                      fill={d?.col}
                      onMouseEnter={d?.enter}
                      onMouseLeave={d?.leave}
                      onClick={d?.enter}
                      style={{ cursor: 'help' }}
                    ></circle>
                  </Fragment>
                ))}
              </svg>
              {L(v.radar?.axes).map((a: any, $index: number) => (
                <Fragment key={$index}>
                  <span
                    style={
                      {
                        position: 'absolute',
                        left: str(a?.lxp),
                        top: str(a?.lyp),
                        transform: 'translate(-50%,-50%)',
                        whiteSpace: 'nowrap',
                        font: `${str(a?.hfw)} 11px/1 'IBM Plex Mono',monospace`,
                        color: str(a?.col),
                        opacity: str(a?.hop),
                        cursor: 'help',
                      } as CSSProperties
                    }
                    onMouseEnter={a?.hon}
                    onMouseLeave={a?.hoff}
                  >
                    {T(a?.lbl)}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
          <div
            draggable="true"
            onDragStart={v.ct?.bars?.start}
            onDragOver={v.ct?.over}
            onDrop={v.ct?.bars?.drop}
            onDragEnd={v.ct?.end}
            title="Drag to move"
            style={
              {
                gridColumn: str(v.bWideCol),
                order: str(v.ct?.bars?.o),
                opacity: str(v.ct?.bars?.op),
                boxShadow: str(v.ct?.bars?.ol),
                cursor: 'grab',
                padding: '20px',
                borderRadius: 'var(--r, 14px)',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              } as CSSProperties
            }
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <span
                style={{
                  font: "500 10px/1 'IBM Plex Mono',monospace",
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                }}
              >
                <span
                  title="Drag to move"
                  style={
                    {
                      display: str(v.cdd?.ic),
                      marginRight: '8px',
                      fontSize: '14px',
                      lineHeight: '1',
                      cursor: 'grab',
                      userSelect: 'none',
                    } as CSSProperties
                  }
                >
                  ⠿
                </span>
                Growth by stat
              </span>
              <span style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={v.bRotate}
                  title={v.bRotTip}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '999px',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                    background: 'transparent',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                    cursor: 'pointer',
                    font: "500 11px/1 'IBM Plex Mono',monospace",
                  }}
                >
                  {T(v.bRotLbl)}
                </button>
                <button
                  title={`Tile width: ${str(v.bWl)} of ${str(v.cNC)} columns — click to change`}
                  onClick={v.bCyc}
                  style={
                    {
                      flex: 'none',
                      display: str(v.cwBtn),
                      alignItems: 'center',
                      gap: '6px',
                      height: '26px',
                      padding: '0 9px',
                      borderRadius: '6px',
                      border: '1px solid var(--line, oklch(0.29 0.012 60))',
                      background: 'transparent',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                      cursor: 'pointer',
                      font: "500 11px/1 'IBM Plex Mono',monospace",
                    } as CSSProperties
                  }
                >
                  <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.bBars)}</span>
                  <span>
                    {T(v.bWl)}/{T(v.cNC)}
                  </span>
                </button>
              </span>
            </div>
            <div style={{ alignSelf: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
              {L(v.cmpSel).map((h: any, $index: number) => (
                <Fragment key={$index}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                    <span
                      style={
                        { width: '10px', height: '10px', borderRadius: '3px', background: str(h?.col) } as CSSProperties
                      }
                    ></span>
                    <span>{T(h?.ch)}</span>
                    <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(h?.bn)}</span>
                  </span>
                </Fragment>
              ))}
            </div>
            <div
              style={
                {
                  alignSelf: 'flex-start',
                  flex: 'none',
                  maxWidth: '100%',
                  width: str(v.statBarW),
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexWrap: str(v.statWrap),
                  gap: '2px',
                  padding: '3px',
                  borderRadius: '8px',
                  background: 'var(--bg, oklch(0.16 0.01 60))',
                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                } as CSSProperties
              }
            >
              <span style={{ display: 'contents' }}>
                {L(v.statCtl).map((t: any, $index: number) => (
                  <Fragment key={$index}>
                    <button
                      onClick={t?.click}
                      style={
                        {
                          flex: str(v.statCtlFlex),
                          minWidth: '0',
                          minHeight: '36px',
                          padding: str(v.statPad),
                          border: '0',
                          borderRadius: '6px',
                          background: 'transparent',
                          color: str(t?.fg),
                          cursor: 'pointer',
                          fontSize: str(v.statFs),
                        } as CSSProperties
                      }
                    >
                      {T(t?.l)}
                    </button>
                  </Fragment>
                ))}
                <span
                  style={
                    {
                      display: str(v.statSepD),
                      width: '1px',
                      margin: '6px 2px',
                      background: 'var(--line, oklch(0.29 0.012 60))',
                    } as CSSProperties
                  }
                ></span>
              </span>
              {L(v.statChips).map((t: any, $index: number) => (
                <Fragment key={$index}>
                  <button
                    onClick={t?.click}
                    aria-pressed={t?.on}
                    style={
                      {
                        flex: str(v.statChipFlex),
                        minHeight: '36px',
                        minWidth: str(v.statMinW),
                        padding: str(v.statPad),
                        border: '0',
                        borderRadius: '6px',
                        background: str(t?.bg),
                        color: str(t?.fg),
                        cursor: 'pointer',
                        font: "500 11px/1 'IBM Plex Mono',monospace",
                      } as CSSProperties
                    }
                  >
                    {T(t?.l)}
                  </button>
                </Fragment>
              ))}
            </div>
            {v.bHoriz ? (
              <>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {L(v.radar?.bars).map((r: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '34px minmax(0,1fr)',
                          gap: '10px',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ font: "600 12px/1 'IBM Plex Mono',monospace" }}>{T(r?.s)}</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          {L(r?.items).map((x: any, $index: number) => (
                            <Fragment key={$index}>
                              <div
                                onMouseEnter={x?.enter}
                                onMouseLeave={x?.leave}
                                style={{ display: 'block', opacity: str(x?.op) } as CSSProperties}
                              >
                                <span
                                  style={
                                    {
                                      display: 'block',
                                      height: '16px',
                                      borderRadius: '3px',
                                      background: 'var(--panel2, oklch(0.25 0.012 60))',
                                      overflow: 'hidden',
                                      position: 'relative',
                                      boxShadow: str(x?.ol),
                                    } as CSSProperties
                                  }
                                >
                                  <span
                                    style={
                                      {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        boxSizing: 'border-box',
                                        padding: '0 5px',
                                        height: '100%',
                                        width: str(x?.w),
                                        minWidth: 'fit-content',
                                        background: str(x?.col),
                                        color: 'oklch(0.18 0.01 60)',
                                        font: "600 10px/1 'IBM Plex Mono',monospace",
                                      } as CSSProperties
                                    }
                                  >
                                    {T(x?.lh)}
                                  </span>
                                  <span
                                    style={
                                      {
                                        position: 'absolute',
                                        left: str(v.radar?.hundred),
                                        top: '0',
                                        bottom: '0',
                                        width: '1px',
                                        background: 'var(--mu, oklch(0.7 0.01 70))',
                                        opacity: '.6',
                                      } as CSSProperties
                                    }
                                  ></span>
                                </span>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    </Fragment>
                  ))}
                  <span style={{ fontSize: '11px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>Tick = 100% growth</span>
                </div>
              </>
            ) : null}
            {v.bVert ? (
              <>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    style={
                      {
                        display: 'grid',
                        gridTemplateColumns: `repeat(${str(v.barN)},minmax(0,1fr))`,
                        gap: '8px',
                        width: '100%',
                      } as CSSProperties
                    }
                  >
                    {L(v.radar?.bars).map((r: any, $index: number) => (
                      <Fragment key={$index}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
                          <div
                            style={{
                              position: 'relative',
                              height: '220px',
                              display: 'flex',
                              alignItems: 'flex-end',
                              gap: '2px',
                              borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            }}
                          >
                            {L(r?.items).map((x: any, $index: number) => (
                              <Fragment key={$index}>
                                <div
                                  onMouseEnter={x?.enter}
                                  onMouseLeave={x?.leave}
                                  onClick={x?.enter}
                                  style={
                                    {
                                      flex: '1 1 0',
                                      cursor: 'help',
                                      minWidth: '0',
                                      height: str(x?.w),
                                      background: str(x?.col),
                                      borderRadius: '3px 3px 0 0',
                                      position: 'relative',
                                      opacity: str(x?.op),
                                      boxShadow: str(x?.ol),
                                    } as CSSProperties
                                  }
                                >
                                  <span
                                    style={
                                      {
                                        display: str(v.bLblDisp),
                                        position: 'absolute',
                                        bottom: '100%',
                                        left: `calc(50% + ${str(x?.lk)} * (100% + 2px))`,
                                        transform: 'translateX(-50%)',
                                        paddingBottom: '2px',
                                        font: "600 10px/1 'IBM Plex Mono',monospace",
                                      } as CSSProperties
                                    }
                                  >
                                    {T(x?.lv)}
                                  </span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                          <span style={{ textAlign: 'center', font: "600 12px/1 'IBM Plex Mono',monospace" }}>
                            {T(r?.s)}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div
            data-jump="b-proj"
            draggable="true"
            onDragStart={v.ct?.table?.start}
            onDragOver={v.ct?.over}
            onDrop={v.ct?.table?.drop}
            onDragEnd={v.ct?.end}
            title="Drag to move"
            style={
              {
                gridColumn: str(v.tWideCol),
                order: str(v.ct?.table?.o),
                opacity: str(v.ct?.table?.op),
                boxShadow: str(v.ct?.table?.ol),
                cursor: 'grab',
                padding: '20px',
                borderRadius: 'var(--r, 14px)',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                overflowX: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              } as CSSProperties
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <span
                style={{
                  font: "500 10px/1 'IBM Plex Mono',monospace",
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                }}
              >
                <span
                  title="Drag to move"
                  style={
                    {
                      display: str(v.cdd?.ic),
                      marginRight: '8px',
                      fontSize: '14px',
                      lineHeight: '1',
                      cursor: 'grab',
                      userSelect: 'none',
                    } as CSSProperties
                  }
                >
                  ⠿
                </span>
                Projected stats · average with range
              </span>
              <button
                onClick={v.cmpHzTog}
                title={v.cmpHzTip}
                aria-pressed={v.cmpHz}
                style={
                  {
                    display: str(v.cmpHzBtnD),
                    flex: 'none',
                    marginLeft: 'auto',
                    padding: '7px 12px',
                    borderRadius: '999px',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                    background: 'transparent',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                    cursor: 'pointer',
                    font: "500 11px/1 'IBM Plex Mono',monospace",
                  } as CSSProperties
                }
              >
                {T(v.cmpHzLbl)}
              </button>
              <button
                title={`Tile width: ${str(v.tWl)} of ${str(v.cNC)} columns — click to change`}
                onClick={v.tCyc}
                style={
                  {
                    flex: 'none',
                    display: str(v.cwBtn),
                    alignItems: 'center',
                    gap: '6px',
                    height: '26px',
                    padding: '0 9px',
                    borderRadius: '6px',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                    background: 'transparent',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                    cursor: 'pointer',
                    font: "500 11px/1 'IBM Plex Mono',monospace",
                  } as CSSProperties
                }
              >
                <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.tBars)}</span>
                <span>
                  {T(v.tWl)}/{T(v.cNC)}
                </span>
              </button>
            </div>
            {v.cmpBarsOn ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {L(v.cmpCards).map((c: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={
                          {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid var(--line, oklch(0.29 0.012 60))',
                            background: 'var(--bg, oklch(0.16 0.01 60))',
                            borderLeft: `3px solid ${str(c?.h?.col)}`,
                          } as CSSProperties
                        }
                      >
                        <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <span
                            style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '3px' }}
                          >
                            <span
                              style={{
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {T(c?.h?.ch)}
                            </span>
                            <span
                              style={{
                                font: "500 10px/1.2 'IBM Plex Mono',monospace",
                                color: 'var(--mu, oklch(0.7 0.01 70))',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {T(c?.h?.bn)}
                            </span>
                          </span>
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'baseline',
                              gap: '10px',
                              font: "600 13px/1 'IBM Plex Mono',monospace",
                            }}
                          >
                            <span
                              style={{
                                font: "500 10px/1 'IBM Plex Mono',monospace",
                                color: 'var(--mu, oklch(0.7 0.01 70))',
                              }}
                            >
                              {'Mov '}
                              <span
                                style={{
                                  font: "600 13px/1 'IBM Plex Mono',monospace",
                                  color: 'var(--tx, oklch(0.94 0.008 80))',
                                }}
                              >
                                {T(c?.mov)}
                              </span>
                            </span>
                            <span style={{ color: 'var(--ac, oklch(0.8 0.11 75))' }}>{T(c?.tot)}</span>
                          </span>
                        </span>
                        <span
                          style={
                            {
                              display: 'grid',
                              gridTemplateColumns: `repeat(${str(v.cmpN)},minmax(0,1fr))`,
                              gap: '2px',
                              width: '100%',
                            } as CSSProperties
                          }
                        >
                          {L(c?.cells).map((x: any, $index: number) => (
                            <Fragment key={$index}>
                              <span
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
                              >
                                <span
                                  style={{
                                    font: "500 8.5px/1 'IBM Plex Mono',monospace",
                                    color: 'var(--mu, oklch(0.7 0.01 70))',
                                  }}
                                >
                                  {T(x?.s)}
                                </span>
                                <span
                                  style={
                                    {
                                      width: '100%',
                                      padding: '6px 0',
                                      textAlign: 'center',
                                      borderRadius: '4px',
                                      background: str(x?.bg),
                                      color: str(x?.col),
                                      font: "500 11px/1 'IBM Plex Mono',monospace",
                                      fontWeight: str(x?.fw),
                                    } as CSSProperties
                                  }
                                >
                                  {T(x?.v)}
                                </span>
                                <span
                                  style={{
                                    font: "500 8.5px/1 'IBM Plex Mono',monospace",
                                    color: 'var(--mu, oklch(0.7 0.01 70))',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {T(x?.rng)}
                                </span>
                              </span>
                            </Fragment>
                          ))}
                        </span>
                        {c?.hasB ? (
                          <>
                            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 6px', alignItems: 'center' }}>
                              {L(c?.badges).map((x: any, $index: number) => (
                                <Fragment key={$index}>
                                  <span
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      font: "500 10px/1 'IBM Plex Mono',monospace",
                                      color: 'var(--mu, oklch(0.7 0.01 70))',
                                    }}
                                  >
                                    {T(x?.s)}
                                    {x?.hasAbl ? (
                                      <>
                                        <span
                                          data-tip="1"
                                          onMouseEnter={x?.abT?.enter}
                                          onMouseLeave={x?.abT?.leave}
                                          onClick={x?.abT?.enter}
                                          style={{
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            padding: '2px 6px',
                                            borderRadius: '999px',
                                            background: 'oklch(0.78 0.12 150)',
                                            color: 'oklch(0.18 0.01 60)',
                                            cursor: 'help',
                                          }}
                                        >
                                          {T(x?.abl)}
                                        </span>
                                      </>
                                    ) : null}
                                    {x?.hasBadge ? (
                                      <>
                                        <span
                                          data-tip="1"
                                          onMouseEnter={x?.enter}
                                          onMouseLeave={x?.leave}
                                          onClick={x?.enter}
                                          style={{
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            padding: '2px 6px',
                                            borderRadius: '999px',
                                            background: 'oklch(0.74 0.1 300)',
                                            color: 'oklch(0.18 0.01 60)',
                                            cursor: 'help',
                                          }}
                                        >
                                          {T(x?.badge)}
                                        </span>
                                      </>
                                    ) : null}
                                    {x?.hasMnt ? (
                                      <>
                                        <span style={{ color: 'oklch(0.74 0.1 300)' }}>{T(x?.mnt)}</span>
                                      </>
                                    ) : null}
                                  </span>
                                </Fragment>
                              ))}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            {v.cmpHzT ? (
              <>
                <div
                  style={
                    {
                      display: 'grid',
                      gridTemplateColumns: str(v.cmpHzCols),
                      font: "500 13px/1 'IBM Plex Mono',monospace",
                    } as CSSProperties
                  }
                >
                  <div
                    style={{ padding: '10px 6px', borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))' }}
                  ></div>
                  {L(v.cmpStats).map((s: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={{
                          padding: '10px 4px',
                          borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                          textAlign: 'center',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                        }}
                      >
                        {T(s?.s)}
                      </div>
                    </Fragment>
                  ))}
                  {L(v.cmpT).map((b: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        draggable={b?.h?.drg}
                        onDragStart={b?.h?.dStart}
                        onDragOver={b?.h?.dOver}
                        onDrop={b?.h?.dDrop}
                        onDragEnd={b?.h?.dEnd}
                        title="Drag to reorder"
                        style={
                          {
                            opacity: str(b?.h?.dim),
                            cursor: str(b?.h?.cur),
                            padding: '8px 6px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            boxShadow: str(b?.h?.shV),
                            borderLeft: `3px solid ${str(b?.h?.col)}`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3px',
                            minWidth: '0',
                            justifyContent: 'center',
                            fontFamily: "'IBM Plex Sans'",
                            fontWeight: '600',
                            fontSize: '12px',
                          } as CSSProperties
                        }
                      >
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {T(b?.h?.ch)}
                        </span>
                        <span
                          style={{
                            font: "500 10px/1.2 'IBM Plex Mono',monospace",
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={b?.h?.bn}
                        >
                          {T(b?.h?.bn)}
                        </span>
                      </div>
                      {L(b?.cells).map((x: any, $index: number) => (
                        <Fragment key={$index}>
                          <div
                            style={
                              {
                                padding: '8px 2px',
                                borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                                background: str(x?.bg),
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '3px',
                                minWidth: '0',
                              } as CSSProperties
                            }
                          >
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: '4px',
                              }}
                            >
                              {x?.hasAbl ? (
                                <>
                                  <span
                                    data-tip="1"
                                    onMouseEnter={x?.abT?.enter}
                                    onMouseLeave={x?.abT?.leave}
                                    onClick={x?.abT?.enter}
                                    style={{
                                      fontSize: '10px',
                                      fontWeight: '600',
                                      padding: '2px 6px',
                                      borderRadius: '999px',
                                      background: 'oklch(0.78 0.12 150)',
                                      color: 'oklch(0.18 0.01 60)',
                                      cursor: 'help',
                                    }}
                                  >
                                    {T(x?.abl)}
                                  </span>
                                </>
                              ) : null}
                              {x?.hasBadge ? (
                                <>
                                  <span
                                    data-tip="1"
                                    onMouseEnter={x?.enter}
                                    onMouseLeave={x?.leave}
                                    onClick={x?.enter}
                                    style={{
                                      fontSize: '10px',
                                      fontWeight: '600',
                                      padding: '2px 6px',
                                      borderRadius: '999px',
                                      background: 'oklch(0.74 0.1 300)',
                                      color: 'oklch(0.18 0.01 60)',
                                      cursor: 'help',
                                    }}
                                  >
                                    {T(x?.badge)}
                                  </span>
                                </>
                              ) : null}
                              <span style={{ color: str(x?.col), fontWeight: str(x?.fw) } as CSSProperties}>
                                {T(x?.v)}
                              </span>
                            </span>
                            <span
                              style={
                                {
                                  display: str(v.cmpRngD),
                                  fontSize: '10px',
                                  color: 'var(--mu, oklch(0.7 0.01 70))',
                                  whiteSpace: 'nowrap',
                                } as CSSProperties
                              }
                            >
                              {T(x?.rng)}
                            </span>
                            {x?.hasMnt ? (
                              <>
                                <span style={{ fontSize: '10px', color: 'oklch(0.74 0.1 300)' }}>{T(x?.mnt)}</span>
                              </>
                            ) : null}
                          </div>
                        </Fragment>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            {v.cmpVt ? (
              <>
                <div
                  style={
                    {
                      display: 'grid',
                      gridTemplateColumns: str(v.cmpCols),
                      font: "500 13px/1 'IBM Plex Mono',monospace",
                      minWidth: '280px',
                    } as CSSProperties
                  }
                >
                  <div
                    style={{ padding: '10px 8px', borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))' }}
                  ></div>
                  {L(v.cmpSel).map((h: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        draggable={h?.drg}
                        onDragStart={h?.dStart}
                        onDragOver={h?.dOver}
                        onDrop={h?.dDrop}
                        onDragEnd={h?.dEnd}
                        title="Drag to reorder"
                        style={
                          {
                            opacity: str(h?.dim),
                            boxShadow: str(h?.sh),
                            cursor: str(h?.cur),
                            padding: '10px 8px',
                            borderBottom: `2px solid ${str(h?.col)}`,
                            textAlign: 'right',
                            fontFamily: "'IBM Plex Sans'",
                            fontWeight: '600',
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            minWidth: '0',
                          } as CSSProperties
                        }
                      >
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {T(h?.ch)}
                        </span>
                        <span
                          style={{
                            font: "500 10px/1.2 'IBM Plex Mono',monospace",
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={h?.bn}
                        >
                          {T(h?.bn)}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                  {L(v.cmpRows).map((r: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={{
                          padding: '9px 8px',
                          borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                        }}
                      >
                        {T(r?.s)}
                      </div>
                      {L(r?.cells).map((x: any, $index: number) => (
                        <Fragment key={$index}>
                          <div
                            style={
                              {
                                padding: '8px',
                                borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                                background: str(x?.bg),
                                boxShadow: `inset 3px 0 0 ${str(x?.bar)}`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: '3px',
                              } as CSSProperties
                            }
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {x?.hasAbl ? (
                                <>
                                  <span
                                    data-tip="1"
                                    onMouseEnter={x?.abT?.enter}
                                    onMouseLeave={x?.abT?.leave}
                                    onClick={x?.abT?.enter}
                                    style={{
                                      fontSize: '10px',
                                      fontWeight: '600',
                                      padding: '2px 6px',
                                      borderRadius: '999px',
                                      background: 'oklch(0.78 0.12 150)',
                                      color: 'oklch(0.18 0.01 60)',
                                      cursor: 'help',
                                    }}
                                  >
                                    {T(x?.abl)}
                                  </span>
                                </>
                              ) : null}
                              {x?.hasBadge ? (
                                <>
                                  <span
                                    data-tip="1"
                                    onMouseEnter={x?.enter}
                                    onMouseLeave={x?.leave}
                                    onClick={x?.enter}
                                    style={{
                                      fontSize: '10px',
                                      fontWeight: '600',
                                      padding: '2px 6px',
                                      borderRadius: '999px',
                                      background: 'oklch(0.74 0.1 300)',
                                      color: 'oklch(0.18 0.01 60)',
                                      cursor: 'help',
                                    }}
                                  >
                                    {T(x?.badge)}
                                  </span>
                                </>
                              ) : null}
                              <span style={{ color: str(x?.col), fontWeight: str(x?.fw) } as CSSProperties}>
                                {T(x?.v)}
                              </span>
                            </span>
                            <span style={{ fontSize: '10px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                              {T(x?.rng)}
                            </span>
                            {x?.hasMnt ? (
                              <>
                                <span style={{ fontSize: '10px', color: 'oklch(0.74 0.1 300)' }}>{T(x?.mnt)}</span>
                              </>
                            ) : null}
                          </div>
                        </Fragment>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          {v.hasCmpNotes ? (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '12px',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                }}
              >
                {L(v.cmpNotes).map((n: any, $index: number) => (
                  <Fragment key={$index}>
                    <div>
                      <span style={{ color: str(n?.col), fontWeight: '600' } as CSSProperties}>{T(n?.ch)}</span>
                      {' · '}
                      <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(n?.bn)}</span>
                      {' · '}
                      {T(n?.txt)}
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
          <div
            data-jump="b-gr"
            draggable="true"
            onDragStart={v.ct?.gr?.start}
            onDragOver={v.ct?.over}
            onDrop={v.ct?.gr?.drop}
            onDragEnd={v.ct?.end}
            title="Drag to move"
            style={
              {
                gridColumn: str(v.gWideCol),
                order: str(v.ct?.gr?.o),
                opacity: str(v.ct?.gr?.op),
                boxShadow: str(v.ct?.gr?.ol),
                cursor: 'grab',
                padding: '20px',
                borderRadius: 'var(--r, 14px)',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              } as CSSProperties
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <span
                style={{
                  font: "500 10px/1 'IBM Plex Mono',monospace",
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                }}
              >
                <span
                  title="Drag to move"
                  style={
                    {
                      display: str(v.cdd?.ic),
                      marginRight: '8px',
                      fontSize: '14px',
                      lineHeight: '1',
                      cursor: 'grab',
                      userSelect: 'none',
                    } as CSSProperties
                  }
                >
                  ⠿
                </span>
                Growth rates · total per stat
              </span>
              <button
                title={`Tile width: ${str(v.gWl)} of ${str(v.cNC)} columns — click to change`}
                onClick={v.gCyc}
                style={
                  {
                    flex: 'none',
                    display: str(v.cwBtn),
                    alignItems: 'center',
                    gap: '6px',
                    height: '26px',
                    padding: '0 9px',
                    borderRadius: '6px',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                    background: 'transparent',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                    cursor: 'pointer',
                    font: "500 11px/1 'IBM Plex Mono',monospace",
                  } as CSSProperties
                }
              >
                <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.gBars)}</span>
                <span>
                  {T(v.gWl)}/{T(v.cNC)}
                </span>
              </button>
            </div>
            {v.grWide ? (
              <>
                <div
                  style={
                    {
                      display: 'grid',
                      gridTemplateColumns: str(v.grCols),
                      gap: '4px',
                      font: "500 12px/1 'IBM Plex Mono',monospace",
                      alignItems: 'stretch',
                    } as CSSProperties
                  }
                >
                  <span></span>
                  {L(v.grStats).map((s: any, $index: number) => (
                    <Fragment key={$index}>
                      <span style={{ padding: '6px 0', textAlign: 'center', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                        {T(s?.s)}
                      </span>
                    </Fragment>
                  ))}
                  <span style={{ padding: '6px 0', textAlign: 'center', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                    Σ
                  </span>
                  {L(v.grRows).map((r: any, $index: number) => (
                    <Fragment key={$index}>
                      <span
                        draggable={r?.h?.drg}
                        onDragStart={r?.h?.dStart}
                        onDragOver={r?.h?.dOver}
                        onDrop={r?.h?.dDrop}
                        onDragEnd={r?.h?.dEnd}
                        title="Drag to reorder"
                        style={
                          {
                            opacity: str(r?.h?.dim),
                            cursor: str(r?.h?.cur),
                            boxShadow: str(r?.h?.shV),
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '3px',
                            padding: '4px 6px',
                            borderLeft: `3px solid ${str(r?.col)}`,
                            minWidth: '0',
                            fontFamily: "'IBM Plex Sans'",
                            fontWeight: '600',
                            fontSize: '12px',
                          } as CSSProperties
                        }
                      >
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {T(r?.name)}
                        </span>
                      </span>
                      {L(r?.cells).map((x: any, $index: number) => (
                        <Fragment key={$index}>
                          <div
                            style={
                              {
                                display: 'grid',
                                placeItems: 'center',
                                height: '34px',
                                borderRadius: '8px',
                                background: str(x?.bg),
                                color: str(x?.fg),
                              } as CSSProperties
                            }
                          >
                            {T(x?.v)}
                          </div>
                        </Fragment>
                      ))}
                      <span
                        style={{
                          display: 'grid',
                          placeItems: 'center',
                          font: "600 13px/1 'IBM Plex Mono',monospace",
                          color: 'var(--ac, oklch(0.8 0.11 75))',
                        }}
                      >
                        {T(r?.tot)}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            {v.grNarrow ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {L(v.grRows).map((r: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={
                          {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid var(--line, oklch(0.29 0.012 60))',
                            background: 'var(--bg, oklch(0.16 0.01 60))',
                            borderLeft: `3px solid ${str(r?.col)}`,
                          } as CSSProperties
                        }
                      >
                        <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <span
                            style={{
                              flex: '1',
                              minWidth: '0',
                              fontWeight: '600',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {T(r?.name)}
                          </span>
                          <span
                            style={{
                              font: "600 13px/1 'IBM Plex Mono',monospace",
                              color: 'var(--ac, oklch(0.8 0.11 75))',
                            }}
                          >
                            {T(r?.tot)}
                          </span>
                        </span>
                        <span
                          style={
                            {
                              display: 'grid',
                              gridTemplateColumns: `repeat(${str(v.grN)},minmax(0,1fr))`,
                              gap: '2px',
                              width: '100%',
                            } as CSSProperties
                          }
                        >
                          {L(r?.cells).map((x: any, $index: number) => (
                            <Fragment key={$index}>
                              <span
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
                              >
                                <span
                                  style={{
                                    font: "500 8.5px/1 'IBM Plex Mono',monospace",
                                    color: 'var(--mu, oklch(0.7 0.01 70))',
                                  }}
                                >
                                  {T(x?.s)}
                                </span>
                                <span
                                  style={
                                    {
                                      width: '100%',
                                      padding: '6px 0',
                                      textAlign: 'center',
                                      borderRadius: '4px',
                                      background: str(x?.bg),
                                      color: str(x?.fg),
                                      font: "500 11px/1 'IBM Plex Mono',monospace",
                                    } as CSSProperties
                                  }
                                >
                                  {T(x?.v)}
                                </span>
                              </span>
                            </Fragment>
                          ))}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div
            data-jump="b-pj"
            draggable="true"
            onDragStart={v.ct?.pj?.start}
            onDragOver={v.ct?.over}
            onDrop={v.ct?.pj?.drop}
            onDragEnd={v.ct?.end}
            title="Drag to move"
            style={
              {
                gridColumn: str(v.jWideCol),
                order: str(v.ct?.pj?.o),
                opacity: str(v.ct?.pj?.op),
                boxShadow: str(v.ct?.pj?.ol),
                cursor: 'grab',
                padding: '20px',
                borderRadius: 'var(--r, 14px)',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                minWidth: '0',
              } as CSSProperties
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <span
                style={{
                  font: "500 10px/1 'IBM Plex Mono',monospace",
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                }}
              >
                <span
                  title="Drag to move"
                  style={
                    {
                      display: str(v.cdd?.ic),
                      marginRight: '8px',
                      fontSize: '14px',
                      lineHeight: '1',
                      cursor: 'grab',
                      userSelect: 'none',
                    } as CSSProperties
                  }
                >
                  ⠿
                </span>
                Projected stats · range
              </span>
              <span style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={v.pjTog}
                  title={v.pjTip}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '999px',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                    background: 'transparent',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                    cursor: 'pointer',
                    font: "500 11px/1 'IBM Plex Mono',monospace",
                  }}
                >
                  {T(v.pjLbl)}
                </button>
                <button
                  title={`Tile width: ${str(v.jWl)} of ${str(v.cNC)} columns — click to change`}
                  onClick={v.jCyc}
                  style={
                    {
                      flex: 'none',
                      display: str(v.cwBtn),
                      alignItems: 'center',
                      gap: '6px',
                      height: '26px',
                      padding: '0 9px',
                      borderRadius: '6px',
                      border: '1px solid var(--line, oklch(0.29 0.012 60))',
                      background: 'transparent',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                      cursor: 'pointer',
                      font: "500 11px/1 'IBM Plex Mono',monospace",
                    } as CSSProperties
                  }
                >
                  <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.jBars)}</span>
                  <span>
                    {T(v.jWl)}/{T(v.cNC)}
                  </span>
                </button>
              </span>
            </div>
            <div style={{ alignSelf: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
              {L(v.cmpSel).map((h: any, $index: number) => (
                <Fragment key={$index}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                    <span
                      style={
                        { width: '10px', height: '10px', borderRadius: '3px', background: str(h?.col) } as CSSProperties
                      }
                    ></span>
                    <span>{T(h?.ch)}</span>
                    <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(h?.bn)}</span>
                  </span>
                </Fragment>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0' }}>
              <div
                style={
                  {
                    alignSelf: 'flex-start',
                    flex: 'none',
                    maxWidth: '100%',
                    width: str(v.statBarW),
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexWrap: str(v.statWrap),
                    gap: '2px',
                    padding: '3px',
                    borderRadius: '8px',
                    background: 'var(--bg, oklch(0.16 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <span style={{ display: 'contents' }}>
                  {L(v.statCtl).map((t: any, $index: number) => (
                    <Fragment key={$index}>
                      <button
                        onClick={t?.click}
                        style={
                          {
                            flex: str(v.statCtlFlex),
                            minWidth: '0',
                            minHeight: '36px',
                            padding: str(v.statPad),
                            border: '0',
                            borderRadius: '6px',
                            background: 'transparent',
                            color: str(t?.fg),
                            cursor: 'pointer',
                            fontSize: str(v.statFs),
                          } as CSSProperties
                        }
                      >
                        {T(t?.l)}
                      </button>
                    </Fragment>
                  ))}
                  <span
                    style={
                      {
                        display: str(v.statSepD),
                        width: '1px',
                        margin: '6px 2px',
                        background: 'var(--line, oklch(0.29 0.012 60))',
                      } as CSSProperties
                    }
                  ></span>
                </span>
                {L(v.statChips).map((t: any, $index: number) => (
                  <Fragment key={$index}>
                    <button
                      onClick={t?.click}
                      aria-pressed={t?.on}
                      style={
                        {
                          flex: str(v.statChipFlex),
                          minHeight: '36px',
                          minWidth: str(v.statMinW),
                          padding: str(v.statPad),
                          border: '0',
                          borderRadius: '6px',
                          background: str(t?.bg),
                          color: str(t?.fg),
                          cursor: 'pointer',
                          font: "500 11px/1 'IBM Plex Mono',monospace",
                        } as CSSProperties
                      }
                    >
                      {T(t?.l)}
                    </button>
                  </Fragment>
                ))}
              </div>
              {v.pjListOn ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {L(v.pjRange).map((r: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          onMouseEnter={r?.hon}
                          onMouseLeave={r?.hoff}
                          style={
                            {
                              opacity: str(r?.op),
                              display: 'grid',
                              gridTemplateColumns: '34px minmax(0,1fr)',
                              gap: '10px',
                              alignItems: 'center',
                            } as CSSProperties
                          }
                        >
                          <span style={{ font: "600 12px/1 'IBM Plex Mono',monospace" }}>{T(r?.s)}</span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            {L(r?.items).map((x: any, $index: number) => (
                              <Fragment key={$index}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span
                                    style={{
                                      position: 'relative',
                                      flex: '1 1 0',
                                      minWidth: '0',
                                      height: '16px',
                                      borderRadius: '3px',
                                      background: 'var(--panel2, oklch(0.25 0.012 60))',
                                    }}
                                  >
                                    <span
                                      style={
                                        {
                                          position: 'absolute',
                                          top: '0',
                                          bottom: '0',
                                          left: str(x?.l),
                                          width: str(x?.w),
                                          background: str(x?.col),
                                          opacity: '.4',
                                        } as CSSProperties
                                      }
                                    ></span>
                                    <span
                                      style={
                                        {
                                          position: 'absolute',
                                          top: '0',
                                          bottom: '0',
                                          left: str(x?.a),
                                          width: '3px',
                                          marginLeft: '-1px',
                                          background: str(x?.col),
                                        } as CSSProperties
                                      }
                                    ></span>
                                    {x?.hasR ? (
                                      <>
                                        <span
                                          style={
                                            {
                                              position: 'absolute',
                                              top: '50%',
                                              left: str(x?.hb),
                                              transform: 'translateY(-50%)',
                                              marginLeft: '4px',
                                              font: "400 9px/1 'IBM Plex Mono',monospace",
                                              color: 'var(--mu, oklch(0.7 0.01 70))',
                                              opacity: '.7',
                                            } as CSSProperties
                                          }
                                        >
                                          {T(x?.hi)}
                                        </span>
                                        <span
                                          style={
                                            {
                                              position: 'absolute',
                                              top: '50%',
                                              left: str(x?.l),
                                              transform: 'translate(-100%,-50%)',
                                              marginLeft: '-4px',
                                              font: "400 9px/1 'IBM Plex Mono',monospace",
                                              color: 'var(--mu, oklch(0.7 0.01 70))',
                                              opacity: '.7',
                                            } as CSSProperties
                                          }
                                        >
                                          {T(x?.lo)}
                                        </span>
                                      </>
                                    ) : null}
                                    <span
                                      style={
                                        {
                                          position: 'absolute',
                                          top: '50%',
                                          left: str(x?.a),
                                          transform: 'translate(-50%,-50%)',
                                          padding: '2px 3px',
                                          borderRadius: '3px',
                                          background: 'var(--panel, oklch(0.2 0.01 60))',
                                          font: "600 10px/1 'IBM Plex Mono',monospace",
                                        } as CSSProperties
                                      }
                                    >
                                      {T(x?.v)}
                                    </span>
                                  </span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {v.pjColsOn ? (
                <>
                  <div
                    style={
                      {
                        display: 'grid',
                        gridTemplateColumns: `repeat(${str(v.pjN)},minmax(0,1fr))`,
                        gap: '8px',
                        width: '100%',
                      } as CSSProperties
                    }
                  >
                    {L(v.pjRange).map((r: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          onMouseEnter={r?.hon}
                          onMouseLeave={r?.hoff}
                          style={
                            {
                              opacity: str(r?.op),
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px',
                              minWidth: '0',
                            } as CSSProperties
                          }
                        >
                          <span
                            style={
                              {
                                display: str(v.pjListD),
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '2px',
                              } as CSSProperties
                            }
                          >
                            {L(r?.items).map((x: any, $index: number) => (
                              <Fragment key={$index}>
                                <span
                                  title={x?.rg}
                                  style={
                                    {
                                      font: "600 10px/1 'IBM Plex Mono',monospace",
                                      color: str(x?.col),
                                    } as CSSProperties
                                  }
                                >
                                  {T(x?.v)}
                                </span>
                              </Fragment>
                            ))}
                          </span>
                          <div
                            style={{
                              position: 'relative',
                              height: '220px',
                              display: 'flex',
                              alignItems: 'stretch',
                              gap: '2px',
                              borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            }}
                          >
                            {L(r?.items).map((x: any, $index: number) => (
                              <Fragment key={$index}>
                                <div
                                  title={`${str(x?.v)} ${str(x?.rg)}`}
                                  style={{ position: 'relative', flex: '1 1 0', minWidth: '0' }}
                                >
                                  <div
                                    style={{
                                      position: 'absolute',
                                      inset: '0',
                                      borderRadius: '3px',
                                      background: 'var(--panel2, oklch(0.25 0.012 60))',
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <div
                                      style={
                                        {
                                          position: 'absolute',
                                          left: '0',
                                          right: '0',
                                          bottom: str(x?.l),
                                          height: str(x?.w),
                                          background: str(x?.col),
                                          opacity: '.4',
                                        } as CSSProperties
                                      }
                                    ></div>
                                    <div
                                      style={
                                        {
                                          position: 'absolute',
                                          left: '0',
                                          right: '0',
                                          bottom: str(x?.a),
                                          height: '3px',
                                          marginBottom: '-1px',
                                          background: str(x?.col),
                                        } as CSSProperties
                                      }
                                    ></div>
                                  </div>
                                  {x?.hasR ? (
                                    <>
                                      <span
                                        style={
                                          {
                                            display: str(v.pjLblD),
                                            position: 'absolute',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            bottom: str(x?.hb),
                                            paddingBottom: '2px',
                                            font: "400 9px/1 'IBM Plex Mono',monospace",
                                            color: 'var(--mu, oklch(0.7 0.01 70))',
                                            opacity: '.7',
                                          } as CSSProperties
                                        }
                                      >
                                        {T(x?.hi)}
                                      </span>
                                      <span
                                        style={
                                          {
                                            display: str(v.pjLblD),
                                            position: 'absolute',
                                            left: '50%',
                                            transform: 'translate(-50%,100%)',
                                            bottom: str(x?.l),
                                            paddingTop: '2px',
                                            font: "400 9px/1 'IBM Plex Mono',monospace",
                                            color: 'var(--mu, oklch(0.7 0.01 70))',
                                            opacity: '.7',
                                          } as CSSProperties
                                        }
                                      >
                                        {T(x?.lo)}
                                      </span>
                                    </>
                                  ) : null}
                                  <span
                                    style={
                                      {
                                        display: str(v.pjLblD),
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        bottom: str(x?.a),
                                        marginBottom: '-5px',
                                        padding: '2px 3px',
                                        borderRadius: '3px',
                                        background: 'var(--panel, oklch(0.2 0.01 60))',
                                        font: "600 10px/1 'IBM Plex Mono',monospace",
                                      } as CSSProperties
                                    }
                                  >
                                    {T(x?.v)}
                                  </span>
                                  {x?.noR ? (
                                    <>
                                      <span style={{ display: 'none' }}></span>
                                    </>
                                  ) : null}
                                </div>
                              </Fragment>
                            ))}
                          </div>
                          <span
                            style={{
                              textAlign: 'center',
                              font: "500 10px/1 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            }}
                          >
                            {T(r?.s)}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div
            data-jump="b-pr"
            draggable="true"
            onDragStart={v.ct?.pr?.start}
            onDragOver={v.ct?.over}
            onDrop={v.ct?.pr?.drop}
            onDragEnd={v.ct?.end}
            title="Drag to move"
            style={
              {
                gridColumn: str(v.kWideCol),
                order: str(v.ct?.pr?.o),
                opacity: str(v.ct?.pr?.op),
                boxShadow: str(v.ct?.pr?.ol),
                cursor: 'grab',
                padding: '20px',
                borderRadius: 'var(--r, 14px)',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                minWidth: '0',
              } as CSSProperties
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <span
                style={{
                  font: "500 10px/1 'IBM Plex Mono',monospace",
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                }}
              >
                <span
                  title="Drag to move"
                  style={
                    {
                      display: str(v.cdd?.ic),
                      marginRight: '8px',
                      fontSize: '14px',
                      lineHeight: '1',
                      cursor: 'grab',
                      userSelect: 'none',
                    } as CSSProperties
                  }
                >
                  ⠿
                </span>
                Projected stats · radar
              </span>
              <button
                title={`Tile width: ${str(v.kWl)} of ${str(v.cNC)} columns — click to change`}
                onClick={v.kCyc}
                style={
                  {
                    flex: 'none',
                    display: str(v.cwBtn),
                    alignItems: 'center',
                    gap: '6px',
                    height: '26px',
                    padding: '0 9px',
                    borderRadius: '6px',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                    background: 'transparent',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                    cursor: 'pointer',
                    font: "500 11px/1 'IBM Plex Mono',monospace",
                  } as CSSProperties
                }
              >
                <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.kBars)}</span>
                <span>
                  {T(v.kWl)}/{T(v.cNC)}
                </span>
              </button>
            </div>
            <div style={{ alignSelf: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
              {L(v.cmpSel).map((h: any, $index: number) => (
                <Fragment key={$index}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                    <span
                      style={
                        { width: '10px', height: '10px', borderRadius: '3px', background: str(h?.col) } as CSSProperties
                      }
                    ></span>
                    <span>{T(h?.ch)}</span>
                    <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(h?.bn)}</span>
                  </span>
                </Fragment>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                <svg viewBox="0 0 340 340" style={{ display: 'block', width: '100%', overflow: 'visible' }}>
                  {L(v.pjRings).map((p: any, $index: number) => (
                    <Fragment key={$index}>
                      <polygon points={p?.pts} fill="none" stroke="rgba(255,255,255,.09)"></polygon>
                    </Fragment>
                  ))}
                  {L(v.pjAxes).map((a: any, $index: number) => (
                    <Fragment key={$index}>
                      <line x1="170" y1="170" x2={a?.x} y2={a?.y} stroke={a?.lc} strokeWidth={a?.lw}></line>
                      <line
                        x1="170"
                        y1="170"
                        x2={a?.x}
                        y2={a?.y}
                        stroke="transparent"
                        strokeWidth="18"
                        onMouseEnter={a?.hon}
                        onMouseLeave={a?.hoff}
                        style={{ cursor: 'help' }}
                      ></line>
                    </Fragment>
                  ))}
                  {L(v.pjPolys).map((p: any, $index: number) => (
                    <Fragment key={$index}>
                      <polygon
                        points={p?.pts}
                        fill={p?.col}
                        fillOpacity=".14"
                        stroke={p?.col}
                        strokeWidth="2"
                        strokeLinejoin="round"
                      ></polygon>
                    </Fragment>
                  ))}
                  {L(v.pjVals).map((d: any, $index: number) => (
                    <Fragment key={$index}>
                      <circle
                        cx={d?.x}
                        cy={d?.y}
                        r={d?.r}
                        fill={d?.col}
                        onMouseEnter={d?.hon}
                        onMouseLeave={d?.hoff}
                        style={{ cursor: 'help' }}
                      ></circle>
                    </Fragment>
                  ))}
                </svg>
                {L(v.pjAxes).map((a: any, $index: number) => (
                  <Fragment key={$index}>
                    <span
                      style={
                        {
                          position: 'absolute',
                          left: str(a?.lxp),
                          top: str(a?.lyp),
                          transform: 'translate(-50%,-50%)',
                          whiteSpace: 'nowrap',
                          font: `${str(a?.hfw)} 11px/1 'IBM Plex Mono',monospace`,
                          opacity: str(a?.hop),
                          cursor: 'help',
                        } as CSSProperties
                      }
                      onMouseEnter={a?.hon}
                      onMouseLeave={a?.hoff}
                    >
                      {T(a?.s)}
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
