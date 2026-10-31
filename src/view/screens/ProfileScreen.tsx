import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function ProfileScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label="Profile" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              flex: 'none',
              width: '120px',
              height: '150px',
              borderRadius: 'var(--r, 14px)',
              border: '1px solid var(--line, oklch(0.29 0.012 60))',
              background:
                'repeating-linear-gradient(135deg,var(--panel2, oklch(0.25 0.012 60)) 0 7px,var(--panel, oklch(0.2 0.01 60)) 7px 14px)',
              display: 'grid',
              placeItems: 'center',
              font: "500 10px/1 'IBM Plex Mono',monospace",
              color: 'var(--mu, oklch(0.7 0.01 70))',
            }}
          >
            portrait<div style={{ position: 'absolute', inset: '0', background: str(v.p?.bgi) } as CSSProperties}></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1', minWidth: '240px' }}>
            <div
              style={
                {
                  font: "500 10px/1 'IBM Plex Mono',monospace",
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: str(v.p?.pcol),
                } as CSSProperties
              }
            >
              {T(v.p?.partLbl)}
              {' · '}
              {T(v.p?.type)}
            </div>
            <h1 style={{ margin: '0', font: "600 38px/1 'Cinzel',serif" }}>{T(v.p?.n)}</h1>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {v.p?.hasFac ? (
                <>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: 'var(--panel2, oklch(0.25 0.012 60))',
                      fontSize: '12px',
                    }}
                  >
                    {T(v.p?.fac)}
                  </span>
                </>
              ) : null}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'flex-end',
              marginLeft: 'auto',
              maxWidth: 'min(100%,560px)',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <button
                onClick={v.p?.toCalc}
                style={{
                  padding: '9px 16px',
                  borderRadius: '999px',
                  border: '0',
                  background: 'var(--ac, oklch(0.8 0.11 75))',
                  color: 'oklch(0.18 0.01 60)',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {T(v.p?.calcBtn)}
              </button>
              <button
                onClick={v.p?.toCmp}
                style={{
                  padding: '9px 16px',
                  borderRadius: '999px',
                  border: '1px solid var(--ac, oklch(0.82 0.12 85))',
                  background: 'transparent',
                  color: 'var(--ac, oklch(0.82 0.12 85))',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Compare
              </button>
            </div>
            {v.p?.hasJumps ? (
              <>
                <div
                  style={
                    {
                      position: 'fixed',
                      right: str(v.p?.railR),
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: '5',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    } as CSSProperties
                  }
                >
                  {L(v.p?.jumps).map((j: any, $index: number) => (
                    <Fragment key={$index}>
                      <button
                        onClick={j?.go}
                        onMouseEnter={j?.enter}
                        onMouseLeave={j?.leave}
                        aria-label={j?.l}
                        style={
                          {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            minHeight: str(v.p?.railH),
                            padding: '0 6px',
                            border: '0',
                            background: 'transparent',
                            cursor: 'pointer',
                            color: 'var(--tx, #eee)',
                          } as CSSProperties
                        }
                      >
                        <span
                          style={
                            {
                              display: str(j?.lblD),
                              fontSize: '12px',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              background: 'var(--panel2, oklch(0.25 0.012 60))',
                              border: '1px solid var(--line, oklch(0.29 0.012 60))',
                              whiteSpace: 'nowrap',
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
          </div>
        </div>
        <div
          style={
            {
              display: str(v.pColCtl),
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
            {L(v.pColOpts).map((o: any, $index: number) => (
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
        <div style={{ display: str(v.pGrid), gridTemplateColumns: str(v.pGridCols), gap: '16px' } as CSSProperties}>
          <div
            data-jump="radar"
            draggable="true"
            onDragStart={v.pd?.radar?.start}
            onDragOver={v.pd?.over}
            onDrop={v.pd?.radar?.drop}
            onDragEnd={v.pd?.end}
            style={
              {
                order: str(v.pd?.radar?.o),
                gridColumn: str(v.pd?.radar?.gc),
                maxHeight: str(v.pd?.radar?.mh),
                overflow: str(v.pd?.radar?.ov),
                opacity: str(v.pd?.radar?.op),
                boxShadow: str(v.pd?.radar?.ol),
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '20px',
                borderRadius: 'var(--r, 14px)',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
              } as CSSProperties
            }
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  title="Drag to move"
                  style={
                    {
                      display: str(v.pd?.ic),
                      cursor: 'grab',
                      fontSize: '14px',
                      lineHeight: '1',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                      userSelect: 'none',
                    } as CSSProperties
                  }
                >
                  ⠿
                </span>
                <span
                  style={{
                    font: "500 10px/1 'IBM Plex Mono',monospace",
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                  }}
                >
                  Growth profile
                </span>
              </span>
              <button
                title={`Tile width: ${str(v.pd?.radar?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                onClick={v.pd?.radar?.cyc}
                style={
                  {
                    display: str(v.pd?.wic),
                    flex: 'none',
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
                <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.radar?.bars)}</span>
                <span>
                  {T(v.pd?.radar?.wl)}/{T(v.pd?.n)}
                </span>
              </button>
            </div>
            <div style={{ display: 'grid', placeItems: 'center', padding: '4px 0 8px' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <svg viewBox="0 0 300 290" style={{ display: 'block', width: '100%', overflow: 'visible' }}>
                  {L(v.p?.radar?.rings).map((g: any, $index: number) => (
                    <Fragment key={$index}>
                      <polygon points={g} fill="none" stroke="rgba(255,255,255,.1)"></polygon>
                    </Fragment>
                  ))}
                  {L(v.p?.radar?.axes).map((a: any, $index: number) => (
                    <Fragment key={$index}>
                      <line x1="150" y1="145" x2={a?.x} y2={a?.y} stroke="rgba(255,255,255,.1)"></line>
                    </Fragment>
                  ))}
                  <polygon
                    points={v.p?.radar?.pts}
                    fill="var(--ac, oklch(0.82 0.12 85))"
                    fillOpacity=".2"
                    stroke="var(--ac, oklch(0.82 0.12 85))"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  ></polygon>
                  {L(v.p?.radar?.dots).map((d: any, $index: number) => (
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
                {L(v.p?.radar?.axes).map((a: any, $index: number) => (
                  <Fragment key={$index}>
                    <span
                      style={
                        {
                          position: 'absolute',
                          left: str(a?.lxp),
                          top: str(a?.lyp),
                          transform: 'translate(-50%,-50%)',
                          font: "500 11px/1 'IBM Plex Mono',monospace",
                          opacity: '.75',
                          pointerEvents: 'none',
                        } as CSSProperties
                      }
                    >
                      {T(a?.s)}
                    </span>
                  </Fragment>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '6px 14px',
                  fontSize: '12px',
                  color: 'var(--mu, oklch(0.78 0.035 120))',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '14px',
                      height: '10px',
                      borderRadius: '2px',
                      border: '2px solid var(--ac, oklch(0.82 0.12 85))',
                      background: 'oklch(0.82 0.12 85 / .2)',
                    }}
                  ></span>
                  {T(v.p?.n)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.85 0.14 150)' }}
                  ></span>
                  Highest of all units
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.74 0.12 30)' }}
                  ></span>
                  Lowest of all units
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--mu, oklch(0.78 0.035 120))', textAlign: 'center' }}>
                {'Scaled per stat across '}
                {T(v.p?.radar?.n)}
                {' units · edge = highest, centre = lowest'}
              </span>
            </div>
          </div>
          <div
            data-jump="growth"
            draggable="true"
            onDragStart={v.pd?.growth?.start}
            onDragOver={v.pd?.over}
            onDrop={v.pd?.growth?.drop}
            onDragEnd={v.pd?.end}
            style={
              {
                order: str(v.pd?.growth?.o),
                gridColumn: str(v.pd?.growth?.gc),
                maxHeight: str(v.pd?.growth?.mh),
                overflow: str(v.pd?.growth?.ov),
                opacity: str(v.pd?.growth?.op),
                boxShadow: str(v.pd?.growth?.ol),
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '20px',
                borderRadius: 'var(--r, 14px)',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
              } as CSSProperties
            }
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  title="Drag to move"
                  style={
                    {
                      display: str(v.pd?.ic),
                      cursor: 'grab',
                      fontSize: '14px',
                      lineHeight: '1',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                      userSelect: 'none',
                    } as CSSProperties
                  }
                >
                  ⠿
                </span>
                <span
                  style={{
                    font: "500 10px/1 'IBM Plex Mono',monospace",
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                  }}
                >
                  Base stats & growth
                </span>
              </span>
              <button
                title={`Tile width: ${str(v.pd?.growth?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                onClick={v.pd?.growth?.cyc}
                style={
                  {
                    display: str(v.pd?.wic),
                    flex: 'none',
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
                <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.growth?.bars)}</span>
                <span>
                  {T(v.pd?.growth?.wl)}/{T(v.pd?.n)}
                </span>
              </button>
            </div>
            {v.p?.hasBase ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    {T(v.p?.bcap)}
                    {' · Σ '}
                    {T(v.p?.btot)}
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9,minmax(0,1fr))', gap: '4px' }}>
                    {L(v.p?.bcells).map((b: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '7px 0',
                            borderRadius: '6px',
                            background: 'var(--panel2, oklch(0.25 0.012 60))',
                          }}
                        >
                          <span
                            style={{
                              font: "500 9.5px/1 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            }}
                          >
                            {T(b?.s)}
                          </span>
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px',
                              font: "600 12px/1 'IBM Plex Mono',monospace",
                              color: 'var(--tx, oklch(0.96 0.01 80))',
                            }}
                          >
                            {T(b?.v)}
                            <span style={{ fontSize: '11px', color: str(b?.ac) } as CSSProperties}>{T(b?.ar)}</span>
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
            {v.p?.hasG ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    {'Growth rates · Σ '}
                    {T(v.p?.tot)}%
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9,minmax(0,1fr))', gap: '4px' }}>
                    {L(v.p?.gcells).map((g: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '7px 0',
                            borderRadius: '6px',
                            background: 'var(--panel2, oklch(0.25 0.012 60))',
                          }}
                        >
                          <span
                            style={{
                              font: "500 9.5px/1 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            }}
                          >
                            {T(g?.s)}
                          </span>
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px',
                              font: "600 12px/1 'IBM Plex Mono',monospace",
                              color: 'var(--tx, oklch(0.96 0.01 80))',
                            }}
                          >
                            {T(g?.v)}
                            <span style={{ fontSize: '11px', color: str(g?.ac) } as CSSProperties}>{T(g?.ar)}</span>
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  {v.p?.hasGNote ? (
                    <>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '12px',
                          color: 'var(--mu, oklch(0.78 0.035 120))',
                        }}
                      >
                        <span
                          style={{
                            flex: 'none',
                            width: '14px',
                            height: '8px',
                            borderRadius: '2px',
                            background: 'oklch(0.78 0.1 150)',
                          }}
                        ></span>
                        {T(v.p?.growthNote)}
                      </span>
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px 14px',
                marginTop: 'auto',
                fontSize: '12px',
                color: 'var(--mu, oklch(0.78 0.035 120))',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ font: "600 11px/1 'IBM Plex Mono',monospace", color: 'var(--ac, oklch(0.82 0.12 85))' }}>
                  ★
                </span>
                Highest
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ font: "600 11px/1 'IBM Plex Mono',monospace", color: 'oklch(0.85 0.14 150)' }}>⇈</span>
                Top 10%
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ font: "600 11px/1 'IBM Plex Mono',monospace", color: 'oklch(0.85 0.14 150)' }}>↑</span>
                Top 30%
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ font: "600 11px/1 'IBM Plex Mono',monospace", color: 'oklch(0.74 0.12 30)' }}>↓</span>
                Bottom 30%
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ font: "600 11px/1 'IBM Plex Mono',monospace", color: 'oklch(0.74 0.12 30)' }}>⇊</span>
                Bottom 10%
              </span>
              <span>vs all units</span>
            </div>
          </div>
          {v.p?.hasBm ? (
            <>
              <div
                data-jump="bm"
                draggable="true"
                onDragStart={v.pd?.bm?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.bm?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.bm?.o),
                    gridColumn: str(v.pd?.bm?.gc),
                    maxHeight: str(v.pd?.bm?.mh),
                    overflow: str(v.pd?.bm?.ov),
                    opacity: str(v.pd?.bm?.op),
                    boxShadow: str(v.pd?.bm?.ol),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.245 0.05 165))',
                    border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Bloodmark
                    </span>
                  </span>
                  <button
                    title={`Tile width: ${str(v.pd?.bm?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                    onClick={v.pd?.bm?.cyc}
                    style={
                      {
                        display: str(v.pd?.wic),
                        flex: 'none',
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
                    <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.bm?.bars)}</span>
                    <span>
                      {T(v.pd?.bm?.wl)}/{T(v.pd?.n)}
                    </span>
                  </button>
                </div>
                {L(v.p?.bms).map((b: any, $index: number) => (
                  <Fragment key={$index}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div
                        style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
                          <span
                            style={{
                              flex: 'none',
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              background: 'var(--panel2, oklch(0.25 0.012 60))',
                              display: 'grid',
                            }}
                          >
                            <span
                              style={{ width: '100%', height: '100%', background: str(b?.bgi) } as CSSProperties}
                            ></span>
                          </span>
                          <span
                            style={{ font: "600 16px/1.25 'Cinzel',serif", color: 'var(--ac, oklch(0.82 0.12 85))' }}
                          >
                            {T(b?.n)}
                          </span>
                        </span>
                        <span
                          style={{
                            font: "500 11px/1 'IBM Plex Mono',monospace",
                            color: 'var(--mu, oklch(0.78 0.035 120))',
                          }}
                        >
                          {T(b?.t)}
                        </span>
                      </div>
                      <span style={{ fontSize: '13px', textWrap: 'pretty' }}>{T(b?.e)}</span>
                      {b?.also ? (
                        <>
                          <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>
                            {'Also held by: '}
                            {T(b?.also)}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
          {v.p?.hasBase ? (
            <>
              <div
                data-jump="bradar"
                draggable="true"
                onDragStart={v.pd?.bradar?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.bradar?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.bradar?.o),
                    gridColumn: str(v.pd?.bradar?.gc),
                    maxHeight: str(v.pd?.bradar?.mh),
                    overflow: str(v.pd?.bradar?.ov),
                    opacity: str(v.pd?.bradar?.op),
                    boxShadow: str(v.pd?.bradar?.ol),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Base stats profile
                    </span>
                  </span>
                  <button
                    title={`Tile width: ${str(v.pd?.bradar?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                    onClick={v.pd?.bradar?.cyc}
                    style={
                      {
                        display: str(v.pd?.wic),
                        flex: 'none',
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
                    <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.bradar?.bars)}</span>
                    <span>
                      {T(v.pd?.bradar?.wl)}/{T(v.pd?.n)}
                    </span>
                  </button>
                </div>
                <div style={{ display: 'grid', placeItems: 'center', padding: '4px 0 8px' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                    <svg viewBox="0 0 300 290" style={{ display: 'block', width: '100%', overflow: 'visible' }}>
                      {L(v.p?.bradar?.rings).map((g: any, $index: number) => (
                        <Fragment key={$index}>
                          <polygon points={g} fill="none" stroke="rgba(255,255,255,.1)"></polygon>
                        </Fragment>
                      ))}
                      {L(v.p?.bradar?.axes).map((a: any, $index: number) => (
                        <Fragment key={$index}>
                          <line x1="150" y1="145" x2={a?.x} y2={a?.y} stroke="rgba(255,255,255,.1)"></line>
                        </Fragment>
                      ))}
                      <polygon
                        points={v.p?.bradar?.pts}
                        fill="var(--ac, oklch(0.82 0.12 85))"
                        fillOpacity=".2"
                        stroke="var(--ac, oklch(0.82 0.12 85))"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      ></polygon>
                      {L(v.p?.bradar?.dots).map((d: any, $index: number) => (
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
                    {L(v.p?.bradar?.axes).map((a: any, $index: number) => (
                      <Fragment key={$index}>
                        <span
                          style={
                            {
                              position: 'absolute',
                              left: str(a?.lxp),
                              top: str(a?.lyp),
                              transform: 'translate(-50%,-50%)',
                              font: "500 11px/1 'IBM Plex Mono',monospace",
                              opacity: '.75',
                              pointerEvents: 'none',
                            } as CSSProperties
                          }
                        >
                          {T(a?.s)}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '6px 14px',
                      fontSize: '12px',
                      color: 'var(--mu, oklch(0.78 0.035 120))',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          width: '14px',
                          height: '10px',
                          borderRadius: '2px',
                          border: '2px solid var(--ac, oklch(0.82 0.12 85))',
                          background: 'oklch(0.82 0.12 85 / .2)',
                        }}
                      ></span>
                      {T(v.p?.n)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.85 0.14 150)' }}
                      ></span>
                      Highest of all units
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.74 0.12 30)' }}
                      ></span>
                      Lowest of all units
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--mu, oklch(0.78 0.035 120))', textAlign: 'center' }}>
                    {'Level 1 base stats, scaled per stat across '}
                    {T(v.p?.bradar?.n)}
                    {' units · edge = highest, centre = lowest'}
                  </span>
                </div>
              </div>
            </>
          ) : null}
          {v.p?.showRec ? (
            <>
              <div
                data-jump="rec"
                draggable="true"
                onDragStart={v.pd?.rec?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.rec?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.rec?.o),
                    maxHeight: str(v.pd?.rec?.mh),
                    overflow: str(v.pd?.rec?.ov),
                    opacity: str(v.pd?.rec?.op),
                    boxShadow: str(v.pd?.rec?.ol),
                    gridColumn: str(v.pd?.rec?.gc),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Recruitment{T(v.p?.recScope)}
                    </span>
                  </span>
                  <button
                    title={`Tile width: ${str(v.pd?.rec?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                    onClick={v.pd?.rec?.cyc}
                    style={
                      {
                        display: str(v.pd?.wic),
                        flex: 'none',
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
                    <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.rec?.bars)}</span>
                    <span>
                      {T(v.pd?.rec?.wl)}/{T(v.pd?.n)}
                    </span>
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
                      gap: '10px',
                    }}
                  >
                    {L(v.p?.rec).map((r: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            background: 'var(--panel2, oklch(0.25 0.012 60))',
                          }}
                        >
                          <span style={{ fontWeight: '600' }}>{T(r?.route)}</span>
                          <span
                            style={
                              { font: "500 11px/1.4 'IBM Plex Mono',monospace", color: str(r?.col) } as CSSProperties
                            }
                          >
                            {T(r?.where)}
                          </span>
                          {r?.hasTags ? (
                            <>
                              <span
                                style={
                                  {
                                    font: "500 11px/1.4 'IBM Plex Mono',monospace",
                                    color: str(r?.col),
                                  } as CSSProperties
                                }
                              >
                                {T(r?.tagLine)}
                              </span>
                            </>
                          ) : null}
                          <span
                            style={
                              {
                                fontSize: '12px',
                                color: 'var(--mu, oklch(0.7 0.01 70))',
                                filter: str(r?.mBlur),
                                transition: 'filter .2s',
                              } as CSSProperties
                            }
                          >
                            {T(r?.method)}
                          </span>
                          {r?.showReq ? (
                            <>
                              <span
                                style={
                                  {
                                    fontSize: '12px',
                                    textWrap: 'pretty',
                                    filter: str(v.p?.recBlur),
                                    userSelect: str(v.p?.recSel),
                                    transition: 'filter .2s',
                                  } as CSSProperties
                                }
                              >
                                {T(r?.req)}
                              </span>
                              {r?.hasNote ? (
                                <>
                                  <span
                                    style={
                                      {
                                        fontSize: '12px',
                                        color: 'var(--mu, oklch(0.7 0.01 70))',
                                        textWrap: 'pretty',
                                        filter: str(v.p?.recBlur),
                                        userSelect: str(v.p?.recSel),
                                        transition: 'filter .2s',
                                      } as CSSProperties
                                    }
                                  >
                                    {T(r?.note)}
                                  </span>
                                </>
                              ) : null}
                            </>
                          ) : null}
                          {r?.sealed ? (
                            <>
                              <span style={{ fontSize: '12px', filter: 'blur(4px)', userSelect: 'none' }}>
                                {T(r?.req)}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  {v.p?.recHidden ? (
                    <>
                      <div
                        style={{
                          position: 'absolute',
                          inset: '0',
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          paddingBottom: '14px',
                          pointerEvents: 'none',
                        }}
                      >
                        <button
                          onClick={v.p?.recReveal}
                          style={{
                            pointerEvents: 'auto',
                            minHeight: '44px',
                            padding: '9px 16px',
                            borderRadius: '999px',
                            border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                            background: 'var(--panel, oklch(0.2 0.01 60))',
                            color: 'var(--tx, #eee)',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600',
                            boxShadow: '0 6px 20px oklch(0 0 0 / .4)',
                          }}
                        >
                          See spoilers
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
          {v.p?.hasSup ? (
            <>
              <div
                data-jump="sup"
                draggable="true"
                onDragStart={v.pd?.sup?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.sup?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.sup?.o),
                    maxHeight: str(v.pd?.sup?.mh),
                    overflow: str(v.pd?.sup?.ov),
                    opacity: str(v.pd?.sup?.op),
                    boxShadow: str(v.pd?.sup?.ol),
                    gridColumn: str(v.pd?.sup?.gc),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Supports
                    </span>
                  </span>
                  <button
                    title={`Tile width: ${str(v.pd?.sup?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                    onClick={v.pd?.sup?.cyc}
                    style={
                      {
                        display: str(v.pd?.wic),
                        flex: 'none',
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
                    <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.sup?.bars)}</span>
                    <span>
                      {T(v.pd?.sup?.wl)}/{T(v.pd?.n)}
                    </span>
                  </button>
                </div>
                {v.p?.hasSup ? (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {L(v.p?.sup).map((s: any, $index: number) => (
                        <Fragment key={$index}>
                          <span
                            onMouseEnter={s?.enter}
                            onMouseLeave={s?.leave}
                            style={
                              {
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'baseline',
                                padding: '5px 10px',
                                borderRadius: '999px',
                                background: 'var(--panel2, oklch(0.25 0.012 60))',
                                fontSize: '12px',
                                cursor: str(s?.cur),
                                filter: str(s?.blur),
                                pointerEvents: str(s?.pe),
                                userSelect: 'none',
                              } as CSSProperties
                            }
                          >
                            {T(s?.n)}
                            <span
                              style={{
                                font: "600 11px/1 'IBM Plex Mono',monospace",
                                color: 'var(--ac, oklch(0.82 0.12 85))',
                              }}
                            >
                              {T(s?.r)}
                            </span>
                          </span>
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
          {v.p?.hasGifts ? (
            <>
              <div
                data-jump="gifts"
                draggable="true"
                onDragStart={v.pd?.gifts?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.gifts?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.gifts?.o),
                    maxHeight: str(v.pd?.gifts?.mh),
                    overflow: str(v.pd?.gifts?.ov),
                    opacity: str(v.pd?.gifts?.op),
                    boxShadow: str(v.pd?.gifts?.ol),
                    gridColumn: str(v.pd?.gifts?.gc),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Gifts
                    </span>
                  </span>
                  <button
                    title={`Tile width: ${str(v.pd?.gifts?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                    onClick={v.pd?.gifts?.cyc}
                    style={
                      {
                        display: str(v.pd?.wic),
                        flex: 'none',
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
                    <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.gifts?.bars)}</span>
                    <span>
                      {T(v.pd?.gifts?.wl)}/{T(v.pd?.n)}
                    </span>
                  </button>
                </div>
                {v.p?.hasLoved ? (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '10px' }}>
                      <span style={{ fontSize: '12px', color: 'oklch(0.78 0.1 150)' }}>Loved</span>
                      <span style={{ fontSize: '13px', textWrap: 'pretty' }}>{T(v.p?.gfLoved)}</span>
                    </div>
                  </>
                ) : null}
                {v.p?.hasLiked ? (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '10px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>Liked</span>
                      <span style={{ fontSize: '13px', textWrap: 'pretty' }}>{T(v.p?.gfLiked)}</span>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
          {v.p?.hasMeals ? (
            <>
              <div
                data-jump="meals"
                draggable="true"
                onDragStart={v.pd?.meals?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.meals?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.meals?.o),
                    maxHeight: str(v.pd?.meals?.mh),
                    overflow: str(v.pd?.meals?.ov),
                    opacity: str(v.pd?.meals?.op),
                    boxShadow: str(v.pd?.meals?.ol),
                    gridColumn: str(v.pd?.meals?.gc),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Meals
                    </span>
                  </span>
                  <button
                    title={`Tile width: ${str(v.pd?.meals?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                    onClick={v.pd?.meals?.cyc}
                    style={
                      {
                        display: str(v.pd?.wic),
                        flex: 'none',
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
                    <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.meals?.bars)}</span>
                    <span>
                      {T(v.pd?.meals?.wl)}/{T(v.pd?.n)}
                    </span>
                  </button>
                </div>
                {L(v.p?.meals).map((ml: any, $index: number) => (
                  <Fragment key={$index}>
                    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '10px' }}>
                      <span style={{ fontSize: '12px', color: str(ml?.col) } as CSSProperties}>{T(ml?.k)}</span>
                      <span style={{ fontSize: '13px', textWrap: 'pretty' }}>{T(ml?.v)}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
          {v.p?.hasPr ? (
            <>
              <div
                data-jump="pr"
                draggable="true"
                onDragStart={v.pd?.pr?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.pr?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.pr?.o),
                    maxHeight: str(v.pd?.pr?.mh),
                    overflow: str(v.pd?.pr?.ov),
                    opacity: str(v.pd?.pr?.op),
                    boxShadow: str(v.pd?.pr?.ol),
                    gridColumn: str(v.pd?.pr?.gc),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Pale Raven answers
                    </span>
                  </span>
                  <button
                    title={`Tile width: ${str(v.pd?.pr?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                    onClick={v.pd?.pr?.cyc}
                    style={
                      {
                        display: str(v.pd?.wic),
                        flex: 'none',
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
                    <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.pr?.bars)}</span>
                    <span>
                      {T(v.pd?.pr?.wl)}/{T(v.pd?.n)}
                    </span>
                  </button>
                </div>
                {L(v.p?.pr).map((x: any, $index: number) => (
                  <Fragment key={$index}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0,1fr) auto',
                        gap: '4px 16px',
                        alignItems: 'baseline',
                        paddingBottom: '10px',
                        borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '13px',
                          fontStyle: 'italic',
                          textWrap: 'pretty',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                        }}
                      >
                        “{T(x?.q)}”
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ac, oklch(0.82 0.12 85))' }}>
                        {T(x?.a)}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
          {v.p?.lsNarrow ? (
            <>
              <div
                data-jump="ls"
                draggable="true"
                onDragStart={v.pd?.ls?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.ls?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.ls?.o),
                    maxHeight: str(v.pd?.ls?.mh),
                    overflow: str(v.pd?.ls?.ov),
                    opacity: str(v.pd?.ls?.op),
                    boxShadow: str(v.pd?.ls?.ol),
                    gridColumn: str(v.pd?.ls?.gc),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Learnset by skill rank
                    </span>
                  </span>
                </div>
                {L(v.p?.lsList).map((l: any, $index: number) => (
                  <Fragment key={$index}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          font: "600 14px/1.2 'Cinzel',serif",
                          color: 'var(--ac, oklch(0.82 0.12 85))',
                        }}
                      >
                        {l?.hasIc ? (
                          <>
                            <span
                              style={
                                {
                                  flex: 'none',
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '4px',
                                  background: str(l?.bgi),
                                } as CSSProperties
                              }
                            ></span>
                          </>
                        ) : null}
                        {T(l?.c)}
                        {l?.af ? (
                          <>
                            <span
                              onMouseEnter={l?.afEnter}
                              onMouseLeave={l?.afLeave}
                              onClick={l?.afEnter}
                              style={
                                {
                                  padding: '6px 4px',
                                  margin: '-6px -4px',
                                  font: "600 11px/1 'IBM Plex Mono',monospace",
                                  color: str(l?.afc),
                                  cursor: 'help',
                                } as CSSProperties
                              }
                            >
                              {T(l?.af)}
                            </span>
                          </>
                        ) : null}
                      </span>
                      {L(l?.items).map((x: any, $index: number) => (
                        <Fragment key={$index}>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '28px 1fr',
                              gap: '10px',
                              alignItems: 'start',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              background: 'var(--panel2, oklch(0.25 0.012 60))',
                            }}
                          >
                            <span
                              style={{
                                font: "600 11px/1 'IBM Plex Mono',monospace",
                                paddingTop: '9px',
                                color: 'var(--mu, oklch(0.78 0.035 120))',
                              }}
                            >
                              {T(x?.rank)}
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              {L(x?.lines).map((z: any, $index: number) => (
                                <Fragment key={$index}>
                                  <div
                                    data-tip="1"
                                    onMouseEnter={z?.enter}
                                    onMouseLeave={z?.leave}
                                    onClick={z?.enter}
                                    style={
                                      {
                                        minHeight: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0 8px',
                                        margin: '0 -8px',
                                        borderRadius: '6px',
                                        background: str(z?.bg),
                                        cursor: str(z?.cur),
                                        fontSize: '13px',
                                        gap: '8px',
                                      } as CSSProperties
                                    }
                                  >
                                    {T(z?.v)}
                                    {z?.hasPlus ? (
                                      <>
                                        <span
                                          style={{
                                            font: "600 10px/1 'IBM Plex Mono',monospace",
                                            padding: '3px 5px',
                                            borderRadius: '4px',
                                            background: 'var(--ac, oklch(0.8 0.11 75))',
                                            color: 'oklch(0.18 0.01 60)',
                                          }}
                                        >
                                          {T(z?.plus)}
                                        </span>
                                      </>
                                    ) : null}
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
          {v.p?.lsWide ? (
            <>
              <div
                data-jump="ls"
                draggable="true"
                onDragStart={v.pd?.ls?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.ls?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.ls?.o),
                    maxHeight: str(v.pd?.ls?.mh),
                    overflow: str(v.pd?.ls?.ov),
                    opacity: str(v.pd?.ls?.op),
                    boxShadow: str(v.pd?.ls?.ol),
                    gridColumn: str(v.pd?.ls?.gc),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Learnset by skill rank
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '110px repeat(5,minmax(110px,1fr))',
                    gap: '1px',
                    background: 'var(--line, oklch(0.29 0.012 60))',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    minWidth: '660px',
                  }}
                >
                  {L(v.lsHead).map((h: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={{
                          padding: '8px 10px',
                          background: 'var(--panel2, oklch(0.25 0.012 60))',
                          font: "600 11px/1 'IBM Plex Mono',monospace",
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                        }}
                      >
                        {T(h)}
                      </div>
                    </Fragment>
                  ))}
                  {L(v.p?.ls).map((l: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={{
                          padding: '8px 10px',
                          background: 'var(--panel, oklch(0.2 0.01 60))',
                          fontWeight: '600',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {l?.hasIc ? (
                          <>
                            <span
                              style={
                                {
                                  flex: 'none',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '4px',
                                  background: str(l?.bgi),
                                } as CSSProperties
                              }
                            ></span>
                          </>
                        ) : null}
                        {T(l?.c)}
                        {l?.af ? (
                          <>
                            <span
                              onMouseEnter={l?.afEnter}
                              onMouseLeave={l?.afLeave}
                              onClick={l?.afEnter}
                              style={
                                {
                                  padding: '6px 4px',
                                  margin: '-6px -4px',
                                  font: "600 11px/1 'IBM Plex Mono',monospace",
                                  color: str(l?.afc),
                                  cursor: 'help',
                                } as CSSProperties
                              }
                            >
                              {T(l?.af)}
                            </span>
                          </>
                        ) : null}
                      </div>
                      {L(l?.r).map((x: any, $index: number) => (
                        <Fragment key={$index}>
                          <div
                            style={
                              {
                                padding: '4px 6px',
                                background: str(x?.bg),
                                fontSize: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1px',
                              } as CSSProperties
                            }
                          >
                            {L(x?.lines).map((z: any, $index: number) => (
                              <Fragment key={$index}>
                                <div
                                  data-tip="1"
                                  onMouseEnter={z?.enter}
                                  onMouseLeave={z?.leave}
                                  onClick={z?.enter}
                                  style={
                                    {
                                      padding: '4px',
                                      borderRadius: '6px',
                                      background: str(z?.bg),
                                      color: str(z?.col),
                                      cursor: str(z?.cur),
                                      transition: 'background .15s',
                                    } as CSSProperties
                                  }
                                >
                                  <span style={{ borderBottom: `1px dotted ${str(z?.ul)}` } as CSSProperties}>
                                    {T(z?.v)}
                                  </span>
                                  {z?.hasPlus ? (
                                    <>
                                      <span
                                        style={{
                                          marginLeft: '5px',
                                          font: "600 9.5px/1 'IBM Plex Mono',monospace",
                                          padding: '2px 4px',
                                          borderRadius: '4px',
                                          background: 'var(--ac, oklch(0.8 0.11 75))',
                                          color: 'oklch(0.18 0.01 60)',
                                        }}
                                      >
                                        {T(z?.plus)}
                                      </span>
                                    </>
                                  ) : null}
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </Fragment>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </>
          ) : null}
          {v.p?.lvlShow ? (
            <>
              <div
                data-jump="lv"
                draggable="true"
                onDragStart={v.pd?.lv?.start}
                onDragOver={v.pd?.over}
                onDrop={v.pd?.lv?.drop}
                onDragEnd={v.pd?.end}
                style={
                  {
                    order: str(v.pd?.lv?.o),
                    maxHeight: str(v.pd?.lv?.mh),
                    overflow: str(v.pd?.lv?.ov),
                    opacity: str(v.pd?.lv?.op),
                    boxShadow: str(v.pd?.lv?.ol),
                    gridColumn: str(v.pd?.lv?.gc),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                    border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      title="Drag to move"
                      style={
                        {
                          display: str(v.pd?.ic),
                          cursor: 'grab',
                          fontSize: '14px',
                          lineHeight: '1',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          userSelect: 'none',
                        } as CSSProperties
                      }
                    >
                      ⠿
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      Personal abilities
                    </span>
                  </span>
                  <button
                    title={`Tile width: ${str(v.pd?.lv?.wl)} of ${str(v.pd?.n)} columns — click to change`}
                    onClick={v.pd?.lv?.cyc}
                    style={
                      {
                        display: str(v.pd?.wic),
                        flex: 'none',
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
                    <span style={{ letterSpacing: '1px', fontSize: '10px' }}>{T(v.pd?.lv?.bars)}</span>
                    <span>
                      {T(v.pd?.lv?.wl)}/{T(v.pd?.n)}
                    </span>
                  </button>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '90px 1fr',
                    gap: '1px',
                    background: 'var(--line, oklch(0.29 0.012 60))',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: '8px 10px',
                      background: 'var(--panel2, oklch(0.25 0.012 60))',
                      font: "600 11px/1 'IBM Plex Mono',monospace",
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    Unlock
                  </div>
                  <div
                    style={{
                      padding: '8px 10px',
                      background: 'var(--panel2, oklch(0.25 0.012 60))',
                      font: "600 11px/1 'IBM Plex Mono',monospace",
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    Ability
                  </div>
                  {L(v.p?.lvl).map((a: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={{
                          padding: '8px 10px',
                          background: 'var(--panel, oklch(0.2 0.01 60))',
                          font: "600 12px/1.4 'IBM Plex Mono',monospace",
                          color: 'var(--ac, oklch(0.82 0.12 85))',
                        }}
                      >
                        {T(a?.lv)}
                      </div>
                      <div
                        data-tip="1"
                        onMouseEnter={a?.enter}
                        onMouseLeave={a?.leave}
                        onClick={a?.enter}
                        style={{
                          padding: '8px 10px',
                          background: 'var(--panel, oklch(0.2 0.01 60))',
                          fontWeight: '600',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          flexWrap: 'wrap',
                          cursor: 'help',
                        }}
                      >
                        <span
                          style={{
                            flex: 'none',
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            background: 'var(--panel2, oklch(0.25 0.012 60))',
                            display: 'grid',
                          }}
                        >
                          <span
                            style={{ width: '100%', height: '100%', background: str(a?.bgi) } as CSSProperties}
                          ></span>
                        </span>
                        <span
                          style={{
                            textDecoration: 'underline dotted',
                            textUnderlineOffset: '4px',
                            textDecorationColor: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                        >
                          {T(a?.n)}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  )
}
