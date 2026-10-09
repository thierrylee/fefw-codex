import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function CompareScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label="Compare" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 style={{ display: str(v.h1Disp), margin: '0', font: "600 30px/1.1 'Cinzel',serif" } as CSSProperties}>
            Compare builds
          </h1>
          <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>
            Pick up to four saved builds. Radar shows total growth rates; the table shows projected stats (average, with
            below–above average range).
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
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
                      className="hv-16"
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
                    className="hv-17"
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
                          className="hv-8"
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
                className="hv-17"
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
          Tap a build to show/hide it (max 4) · × hides a character
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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,max(220px,calc(33.333% - 11px))),1fr))',
            gap: '16px',
            alignItems: 'start',
          }}
        >
          <div
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
                title={`Tile width: ${str(v.rWl)} of 3 columns — click to change`}
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
                <span>{T(v.rWl)}/3</span>
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
                    <line x1="170" y1="170" x2={a?.x} y2={a?.y} stroke="rgba(255,255,255,.09)"></line>
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
                      r="5"
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
                        font: `${str(a?.fw)} 11px/1 'IBM Plex Mono',monospace`,
                        color: str(a?.col),
                        opacity: str(a?.op),
                        pointerEvents: 'none',
                      } as CSSProperties
                    }
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
                  title={`Tile width: ${str(v.bWl)} of 3 columns — click to change`}
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
                  <span>{T(v.bWl)}/3</span>
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
                              <div style={{ display: 'block' }}>
                                <span
                                  style={{
                                    display: 'block',
                                    height: '16px',
                                    borderRadius: '3px',
                                    background: 'var(--panel2, oklch(0.25 0.012 60))',
                                    overflow: 'hidden',
                                    position: 'relative',
                                  }}
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
                                    {T(x?.v)}
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
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(9,minmax(0,1fr))',
                      gap: '8px',
                      width: '100%',
                    }}
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
                                    } as CSSProperties
                                  }
                                >
                                  <span
                                    style={
                                      {
                                        display: str(v.bLblDisp),
                                        position: 'absolute',
                                        bottom: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        paddingBottom: '2px',
                                        font: "600 10px/1 'IBM Plex Mono',monospace",
                                      } as CSSProperties
                                    }
                                  >
                                    {T(x?.v)}
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
                title={`Tile width: ${str(v.tWl)} of 3 columns — click to change`}
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
                <span>{T(v.tWl)}/3</span>
              </button>
            </div>
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
              <div style={{ padding: '10px 8px', borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))' }}></div>
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
                          <span style={{ color: str(x?.col), fontWeight: str(x?.fw) } as CSSProperties}>{T(x?.v)}</span>
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(x?.rng)}</span>
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
                        {T(n?.txt)}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}
