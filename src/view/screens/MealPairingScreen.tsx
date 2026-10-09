import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function MealPairingScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label="Meal pairing" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 style={{ display: str(v.h1Disp), margin: '0', font: "600 30px/1.1 'Cinzel',serif" } as CSSProperties}>
            Meal pairing
          </h1>
          <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>
            Pick a meal and up to three characters; characters with a support to them and a liking for the meal rank
            highest. Tap a row to pair.
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
            gap: '12px 16px',
            padding: '16px',
            borderRadius: 'var(--r, 14px)',
            border: '1px solid var(--line, oklch(0.29 0.012 60))',
            background: 'var(--panel, oklch(0.2 0.01 60))',
          }}
        >
          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                font: "500 10px/1 'IBM Plex Mono',monospace",
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              Meal
            </span>
            <select
              key={v.mx?.meal}
              value={v.mx?.meal ?? ''}
              onChange={v.mx?.onMeal}
              style={{
                width: '100%',
                maxWidth: '100%',
                minWidth: '0',
                boxSizing: 'border-box',
                padding: '8px 12px',
                borderRadius: '999px',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                background: 'var(--panel)',
                color: 'var(--tx)',
                colorScheme: 'dark',
                font: 'inherit',
                fontSize: '13px',
              }}
            >
              {L(v.mx?.meals).map((o: any, $index: number) => (
                <Fragment key={$index}>
                  <option value={o ?? ''}>{T(o)}</option>
                </Fragment>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                font: "500 10px/1 'IBM Plex Mono',monospace",
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              Character 1
            </span>
            <select
              key={v.mx?.c1}
              value={v.mx?.c1 ?? ''}
              onChange={v.mx?.onC1}
              style={{
                width: '100%',
                maxWidth: '100%',
                minWidth: '0',
                boxSizing: 'border-box',
                padding: '8px 12px',
                borderRadius: '999px',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                background: 'var(--panel)',
                color: 'var(--tx)',
                colorScheme: 'dark',
                font: 'inherit',
                fontSize: '13px',
              }}
            >
              {L(v.mx?.c1Opts).map((o: any, $index: number) => (
                <Fragment key={$index}>
                  <option value={o ?? ''}>{T(o)}</option>
                </Fragment>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                font: "500 10px/1 'IBM Plex Mono',monospace",
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              Character 2
            </span>
            <select
              key={v.mx?.c2}
              value={v.mx?.c2 ?? ''}
              onChange={v.mx?.onC2}
              style={{
                width: '100%',
                maxWidth: '100%',
                minWidth: '0',
                boxSizing: 'border-box',
                padding: '8px 12px',
                borderRadius: '999px',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                background: 'var(--panel)',
                color: 'var(--tx)',
                colorScheme: 'dark',
                font: 'inherit',
                fontSize: '13px',
              }}
            >
              {L(v.mx?.c2Opts).map((o: any, $index: number) => (
                <Fragment key={$index}>
                  <option value={o ?? ''}>{T(o)}</option>
                </Fragment>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                font: "500 10px/1 'IBM Plex Mono',monospace",
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              Character 3
            </span>
            <select
              key={v.mx?.c3}
              value={v.mx?.c3 ?? ''}
              onChange={v.mx?.onC3}
              style={{
                width: '100%',
                maxWidth: '100%',
                minWidth: '0',
                boxSizing: 'border-box',
                padding: '8px 12px',
                borderRadius: '999px',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                background: 'var(--panel)',
                color: 'var(--tx)',
                colorScheme: 'dark',
                font: 'inherit',
                fontSize: '13px',
              }}
            >
              {L(v.mx?.c3Opts).map((o: any, $index: number) => (
                <Fragment key={$index}>
                  <option value={o ?? ''}>{T(o)}</option>
                </Fragment>
              ))}
            </select>
          </label>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={v.mx?.reset}
              style={{
                minHeight: '36px',
                padding: '0 14px',
                borderRadius: '999px',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                background: 'transparent',
                color: 'var(--mu, oklch(0.7 0.01 70))',
                cursor: 'pointer',
                fontSize: '12px',
              }}
              className="hv-17"
            >
              Reset
            </button>
          </div>
        </div>
        {v.mx?.hasSug ? (
          <>
            <div
              style={{
                borderRadius: 'var(--r, 14px)',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))' }}>
                <span
                  style={{
                    font: "500 10px/1 'IBM Plex Mono',monospace",
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                  }}
                >
                  Suggested meals
                </span>
              </div>
              {L(v.mx?.sug).map((g: any, $index: number) => (
                <Fragment key={$index}>
                  <div
                    onClick={g?.pick}
                    style={
                      {
                        display: 'grid',
                        gridTemplateColumns: str(v.mx?.sugCols),
                        gap: '8px 12px',
                        alignItems: 'center',
                        padding: '10px 12px',
                        minHeight: '44px',
                        boxSizing: 'border-box',
                        borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                        cursor: 'pointer',
                      } as CSSProperties
                    }
                    className="hv-18"
                  >
                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(g?.m)}</span>
                    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {L(g?.ops).map((q: any, $index: number) => (
                        <Fragment key={$index}>
                          <span
                            style={
                              {
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxSizing: 'border-box',
                                minWidth: str(q?.w),
                                padding: '3px 9px',
                                borderRadius: '999px',
                                border: `1px solid ${str(q?.col)}`,
                                color: str(q?.col),
                                fontSize: '12px',
                                whiteSpace: 'nowrap',
                              } as CSSProperties
                            }
                          >
                            {T(q?.l)}
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
        {v.mx?.hasPair ? (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,160px),1fr))',
                gap: '16px',
                padding: '16px',
                borderRadius: 'var(--r, 14px)',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                background: 'var(--panel, oklch(0.2 0.01 60))',
              }}
            >
              <div
                style={
                  {
                    gridColumn: '1 / -1',
                    display: 'grid',
                    gridTemplateColumns: str(v.mx?.mxCols),
                    alignItems: 'stretch',
                    minWidth: '0',
                    overflowX: 'auto',
                  } as CSSProperties
                }
              >
                <div
                  style={{
                    padding: '8px',
                    borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    minWidth: '0',
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
                    Supports
                  </span>
                </div>
                {L(v.mx?.mxHead).map((h: any, $index: number) => (
                  <Fragment key={$index}>
                    <div
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '0',
                        fontWeight: '600',
                        fontSize: '12px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {T(h)}
                    </div>
                  </Fragment>
                ))}
                {L(v.mx?.mxRows).map((r: any, $index: number) => (
                  <Fragment key={$index}>
                    <div
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        minWidth: '0',
                        fontWeight: '600',
                        fontSize: '12px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {T(r?.n)}
                    </div>
                    {L(r?.cells).map((q: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          style={{
                            padding: '8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '0',
                          }}
                        >
                          <span
                            style={
                              {
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxSizing: 'border-box',
                                minWidth: str(q?.w),
                                padding: '3px 9px',
                                borderRadius: '999px',
                                border: `1px solid ${str(q?.col)}`,
                                color: str(q?.col),
                                fontSize: '12px',
                                whiteSpace: 'nowrap',
                              } as CSSProperties
                            }
                          >
                            {T(q?.l)}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </Fragment>
                ))}
              </div>
              {L(v.mx?.pm).map((q: any, $index: number) => (
                <Fragment key={$index}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      }}
                    >
                      {T(q?.lbl)}
                      {' · meal'}
                    </span>
                    <span
                      style={
                        {
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxSizing: 'border-box',
                          minWidth: str(q?.m?.w),
                          padding: '3px 9px',
                          borderRadius: '999px',
                          border: `1px solid ${str(q?.m?.col)}`,
                          color: str(q?.m?.col),
                          fontSize: '12px',
                          whiteSpace: 'nowrap',
                        } as CSSProperties
                      }
                    >
                      {T(q?.m?.l)}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
          </>
        ) : null}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(v.mx?.count)}</span>
          <button
            onClick={v.mx?.toggleAll}
            style={
              {
                minHeight: '36px',
                padding: '0 14px',
                borderRadius: '999px',
                border: `1px solid ${str(v.mx?.allBd)}`,
                background: str(v.mx?.allBg),
                color: str(v.mx?.allFg),
                cursor: 'pointer',
                fontSize: '12px',
              } as CSSProperties
            }
          >
            Support only
          </button>
        </div>
        <div
          style={{
            borderRadius: 'var(--r, 14px)',
            border: '1px solid var(--line, oklch(0.29 0.012 60))',
            background: 'var(--panel, oklch(0.2 0.01 60))',
            overflow: 'hidden',
          }}
        >
          <div
            style={
              {
                display: str(v.mx?.headDisp),
                gridTemplateColumns: str(v.mx?.cols),
                gap: '8px 12px',
                padding: '10px 12px',
                borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
              } as CSSProperties
            }
          >
            <span
              style={{
                font: "500 10px/1 'IBM Plex Mono',monospace",
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              Character
            </span>
            <span
              style={{
                font: "500 10px/1 'IBM Plex Mono',monospace",
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              Support · meal
            </span>
          </div>
          {L(v.mx?.rows).map((r: any, $index: number) => (
            <Fragment key={$index}>
              <div
                onClick={r?.pick}
                style={
                  {
                    display: 'grid',
                    gridTemplateColumns: str(v.mx?.cols),
                    gap: '8px 12px',
                    alignItems: 'center',
                    padding: '10px 12px',
                    minHeight: '44px',
                    boxSizing: 'border-box',
                    borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                    cursor: 'pointer',
                    background: str(r?.bg),
                  } as CSSProperties
                }
                className="hv-18"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
                  <span style={{ fontWeight: '600', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {T(r?.n)}
                  </span>
                  <button
                    onClick={r?.open}
                    title="View profile"
                    style={{
                      flex: 'none',
                      height: '28px',
                      padding: '0 10px',
                      borderRadius: '999px',
                      border: '1px solid var(--line, oklch(0.29 0.012 60))',
                      background: 'transparent',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                      cursor: 'pointer',
                      fontSize: '12px',
                      lineHeight: '1',
                    }}
                    className="hv-16"
                  >
                    Profile
                  </button>
                </span>
                <span
                  style={
                    {
                      order: str(v.mx?.chipO),
                      gridColumn: str(v.mx?.chipCol),
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                    } as CSSProperties
                  }
                >
                  {L(r?.sups).map((q: any, $index: number) => (
                    <Fragment key={$index}>
                      <span
                        style={
                          {
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                            minWidth: str(q?.w),
                            padding: '3px 9px',
                            borderRadius: '999px',
                            border: `1px solid ${str(q?.col)}`,
                            color: str(q?.col),
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                          } as CSSProperties
                        }
                      >
                        {T(q?.l)}
                      </span>
                    </Fragment>
                  ))}
                  {v.mx?.hasMeal ? (
                    <>
                      <span
                        style={
                          {
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                            minWidth: str(r?.meal?.w),
                            padding: '3px 9px',
                            borderRadius: '999px',
                            border: `1px solid ${str(r?.meal?.col)}`,
                            color: str(r?.meal?.col),
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                          } as CSSProperties
                        }
                      >
                        {T(r?.meal?.l)}
                      </span>
                    </>
                  ) : null}
                </span>
              </div>
            </Fragment>
          ))}
          {v.mx?.empty ? (
            <>
              <div style={{ padding: '24px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                No characters with a support to the selected yet. Turn off Support only to list everyone.
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  )
}
