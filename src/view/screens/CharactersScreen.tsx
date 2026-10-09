import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function CharactersScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label="Characters" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '1 1 280px', minWidth: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px 14px', flexWrap: 'wrap' }}>
              <h1 style={{ display: str(v.h1Disp), margin: '0', font: "600 30px/1.1 'Cinzel',serif" } as CSSProperties}>
                Characters
              </h1>
              <button
                onClick={v.goSettings}
                title="Change progress in Settings"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: '36px',
                  padding: '4px 12px 4px 4px',
                  borderRadius: '999px',
                  border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                  background: 'var(--panel, oklch(0.245 0.05 165))',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                }}
                className="hv-4"
              >
                <span
                  style={
                    {
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      background: str(v.partColor),
                      color: 'oklch(0.18 0.01 60)',
                      font: "600 10px/1 'IBM Plex Mono',monospace",
                    } as CSSProperties
                  }
                >
                  {T(v.partRoman)}
                </span>
                <span>{T(v.progLabel)}</span>
                <span style={{ color: 'var(--ac, oklch(0.82 0.12 85))', fontWeight: '600' }}>Change →</span>
              </button>
            </div>
            <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(v.rosterSub)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'flex-end',
              marginLeft: 'auto',
              maxWidth: '100%',
            }}
          >
            <span style={{ position: 'relative', display: 'flex', width: '230px', maxWidth: '100%' }}>
              <input
                value={v.q ?? ''}
                onChange={v.onQ}
                placeholder="Search name, class, faction"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '8px 36px 8px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  background: 'var(--panel, oklch(0.2 0.01 60))',
                  outline: 'none',
                }}
              />
              <button
                onMouseDown={v.onQClear}
                title="Clear"
                aria-label="Clear search"
                style={
                  {
                    display: str(v.qClrDisp),
                    position: 'absolute',
                    right: '4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
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
              >
                ×
              </button>
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
              {L(v.recChips).map((t: any, $index: number) => (
                <Fragment key={$index}>
                  <button
                    onClick={t?.click}
                    style={
                      {
                        padding: '7px 12px',
                        borderRadius: '999px',
                        border: `1px solid ${str(t?.bd)}`,
                        background: str(t?.bg),
                        color: str(t?.fg),
                        cursor: 'pointer',
                        fontSize: '12px',
                      } as CSSProperties
                    }
                  >
                    {T(t?.l)}
                  </button>
                </Fragment>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>Sort</span>
              {L(v.sortChips).map((t: any, $index: number) => (
                <Fragment key={$index}>
                  <button
                    onClick={t?.click}
                    style={
                      {
                        padding: '7px 12px',
                        borderRadius: '999px',
                        border: `1px solid ${str(t?.bd)}`,
                        background: str(t?.bg),
                        color: str(t?.fg),
                        cursor: 'pointer',
                        fontSize: '12px',
                      } as CSSProperties
                    }
                  >
                    {T(t?.l)}
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,230px),1fr))', gap: '12px' }}
        >
          {L(v.roster).map((c: any, $index: number) => (
            <Fragment key={$index}>
              {c?.unl ? (
                <>
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <button
                      onClick={c?.open}
                      style={
                        {
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'center',
                          padding: '12px',
                          borderRadius: 'var(--r, 14px)',
                          border: `1px solid ${str(c?.cardBd)}`,
                          background: 'var(--panel, oklch(0.2 0.01 60))',
                          cursor: 'pointer',
                          textAlign: 'left',
                          flex: '1',
                        } as CSSProperties
                      }
                      className="hv-5"
                    >
                      <div
                        style={{
                          flex: 'none',
                          width: '52px',
                          height: '52px',
                          borderRadius: '12px',
                          display: 'grid',
                          placeItems: 'center',
                          background:
                            'repeating-linear-gradient(135deg,var(--panel2, oklch(0.25 0.012 60)) 0 6px,var(--panel, oklch(0.2 0.01 60)) 6px 12px)',
                          font: "600 16px/1 'Cinzel',serif",
                          color: 'var(--ac, oklch(0.8 0.11 75))',
                        }}
                      >
                        {T(c?.init)}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0', flex: '1' }}>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', paddingRight: '22px' }}
                        >
                          <span
                            style={{
                              fontWeight: '600',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {T(c?.n)}
                          </span>
                        </div>
                        {c?.facShow ? (
                          <>
                            <span
                              style={{
                                fontSize: '12px',
                                color: 'var(--mu, oklch(0.7 0.01 70))',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {T(c?.fac)}
                            </span>
                          </>
                        ) : null}
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span
                            style={
                              {
                                font: "500 10px/1 'IBM Plex Mono',monospace",
                                padding: '3px 6px',
                                borderRadius: '4px',
                                border: `1px solid ${str(c?.pcol)}`,
                                color: str(c?.pcol),
                              } as CSSProperties
                            }
                          >
                            {T(c?.partLbl)}
                          </span>
                          <span
                            style={{
                              marginLeft: 'auto',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                              gap: '3px',
                            }}
                          >
                            {L(c?.renTxt).map((x: any, $index: number) => (
                              <Fragment key={$index}>
                                <span
                                  style={{
                                    font: "500 10px/1 'IBM Plex Mono',monospace",
                                    color: 'var(--ac, oklch(0.8 0.11 75))',
                                    textAlign: 'right',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {T(x)}
                                </span>
                              </Fragment>
                            ))}
                          </span>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={c?.toggleStar}
                      title={c?.starTip}
                      style={
                        {
                          position: 'absolute',
                          right: '6px',
                          top: '6px',
                          width: str(v.tk30),
                          height: str(v.tk30),
                          border: '0',
                          borderRadius: '50%',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontSize: '16px',
                          lineHeight: '1',
                          color: str(c?.starCol),
                          padding: '0',
                        } as CSSProperties
                      }
                    >
                      {T(c?.star)}
                    </button>
                    <button
                      onClick={c?.recToggle}
                      onMouseEnter={c?.recEnter}
                      onMouseLeave={c?.recLeave}
                      onFocus={c?.recEnter}
                      onBlur={c?.recLeave}
                      aria-label={c?.recTip}
                      aria-disabled={c?.recFixed}
                      style={
                        {
                          position: 'absolute',
                          left: '48px',
                          top: 'calc(50% + 10px)',
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          border: `2px ${str(c?.recBs)} ${str(c?.recBd)}`,
                          background: str(c?.recBg),
                          color: str(c?.recFg),
                          cursor: str(c?.recCur),
                          opacity: str(c?.recOp),
                          display: 'grid',
                          placeItems: 'center',
                          font: "700 12px/1 'IBM Plex Sans'",
                          padding: '0',
                        } as CSSProperties
                      }
                    >
                      {T(c?.recIcon)}
                    </button>
                  </div>
                </>
              ) : null}
              {c?.gone ? (
                <>
                  <button
                    onClick={c?.open}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                      padding: '12px',
                      borderRadius: 'var(--r, 14px)',
                      border: '1px solid var(--line, oklch(0.29 0.012 60))',
                      background: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      opacity: '.55',
                    }}
                  >
                    <div
                      style={{
                        flex: 'none',
                        width: '52px',
                        height: '52px',
                        borderRadius: '12px',
                        display: 'grid',
                        placeItems: 'center',
                        background: 'var(--panel2, oklch(0.25 0.012 60))',
                        font: "600 16px/1 'Cinzel',serif",
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      {T(c?.init)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
                      <span style={{ fontWeight: '600' }}>{T(c?.n)}</span>
                      <span
                        style={{ font: "500 10px/1 'IBM Plex Mono',monospace", color: 'var(--mu, oklch(0.7 0.01 70))' }}
                      >
                        Away in Part I · returns in Part II
                      </span>
                    </div>
                  </button>
                </>
              ) : null}
              {c?.locked ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                      padding: '12px',
                      borderRadius: 'var(--r, 14px)',
                      border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                      background: 'repeating-linear-gradient(135deg,transparent 0 8px,rgba(255,255,255,.02) 8px 16px)',
                    }}
                  >
                    <div
                      style={{
                        flex: 'none',
                        width: '52px',
                        height: '52px',
                        borderRadius: '12px',
                        background: 'var(--panel2, oklch(0.25 0.012 60))',
                        filter: 'blur(3px)',
                      }}
                    ></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
                      <span style={{ fontWeight: '600', filter: 'blur(5px)', userSelect: 'none' }}>{T(c?.n)}</span>
                      <span
                        style={{ font: "500 10px/1 'IBM Plex Mono',monospace", color: str(c?.pcol) } as CSSProperties}
                      >
                        {'Sealed · '}
                        {T(c?.partLbl)}
                      </span>
                    </div>
                  </div>
                </>
              ) : null}
            </Fragment>
          ))}
        </div>
      </section>
    </>
  )
}
