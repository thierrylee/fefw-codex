import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function MealPairingScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label="Meal pairing" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
          data-jump="mx-setup"
          style={
            {
              display: 'grid',
              gridTemplateColumns: str(v.mx?.tileCols),
              gap: '12px 16px',
              padding: '16px',
              borderRadius: 'var(--r, 14px)',
              border: '1px solid var(--line, oklch(0.29 0.012 60))',
              background: 'var(--panel, oklch(0.2 0.01 60))',
            } as CSSProperties
          }
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
              className="hv-16"
            >
              Reset
            </button>
          </div>
        </div>
        {v.mx?.hasPair ? (
          <>
            <div
              data-jump="mx-grid"
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
                {L(v.mx?.mxHeadB).map((h: any, $index: number) => (
                  <Fragment key={$index}>
                    <div
                      style={{
                        padding: '6px 4px',
                        borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                        display: 'flex',
                        minWidth: '0',
                      }}
                    >
                      <button
                        onClick={h?.go}
                        style={
                          {
                            flex: '1',
                            minWidth: '0',
                            minHeight: '32px',
                            padding: '0 8px',
                            borderRadius: '999px',
                            border: `1px ${str(h?.bs)} ${str(h?.bd)}`,
                            background: 'transparent',
                            color: str(h?.fg),
                            font: "600 12px 'IBM Plex Sans',sans-serif",
                            cursor: 'pointer',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          } as CSSProperties
                        }
                        className="hv-17"
                      >
                        {T(h?.l)}
                        {T(h?.ar)}
                      </button>
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
                                font: "600 13px/1 'IBM Plex Mono',monospace",
                                color: str(q?.col),
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
                  }}
                >
                  Meal
                </div>
                {L(v.mx?.pm).map((q: any, $index: number) => (
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
                            font: "600 13px/1 'IBM Plex Mono',monospace",
                            color: str(q?.m?.col),
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
            </div>
          </>
        ) : null}
        {v.mx?.hasSug ? (
          <>
            <div
              data-jump="mx-sug"
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
                        gap: '2px 12px',
                        alignItems: 'center',
                        padding: '8px 12px',
                        minHeight: '40px',
                        boxSizing: 'border-box',
                        borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                        cursor: 'pointer',
                      } as CSSProperties
                    }
                    className="hv-18"
                  >
                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(g?.m)}</span>
                    <span
                      style={
                        {
                          display: 'flex',
                          flexWrap: str(v.mx?.sugWrap),
                          overflowX: str(v.mx?.sugOv),
                          scrollbarWidth: 'none',
                          gap: '2px 12px',
                          minWidth: '0',
                        } as CSSProperties
                      }
                    >
                      {L(g?.ops).map((q: any, $index: number) => (
                        <Fragment key={$index}>
                          <span
                            style={
                              {
                                font: `500 ${str(v.mx?.sugFs)} 'IBM Plex Mono',monospace`,
                                color: str(q?.col),
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
        <div
          data-jump="mx-filters"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(v.mx?.count)}</span>
          <span
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2px',
              padding: '3px',
              borderRadius: '8px',
              background: 'var(--bg, oklch(0.16 0.01 60))',
              border: '1px solid var(--line, oklch(0.29 0.012 60))',
            }}
          >
            <button
              onClick={v.mx?.toggleAll}
              style={
                {
                  minHeight: '36px',
                  padding: '0 12px',
                  border: '0',
                  borderRadius: '6px',
                  background: str(v.mx?.allBg),
                  color: str(v.mx?.allFg),
                  cursor: 'pointer',
                  fontSize: '12px',
                } as CSSProperties
              }
            >
              Support
            </button>
            <button
              onClick={v.mx?.toggleUnrec}
              style={
                {
                  minHeight: '36px',
                  padding: '0 12px',
                  border: '0',
                  borderRadius: '6px',
                  background: str(v.mx?.unBg),
                  color: str(v.mx?.unFg),
                  cursor: 'pointer',
                  fontSize: '12px',
                } as CSSProperties
              }
            >
              Unrecruited
            </button>
            <button
              onClick={v.mx?.toggleRec}
              style={
                {
                  minHeight: '36px',
                  padding: '0 12px',
                  border: '0',
                  borderRadius: '6px',
                  background: str(v.mx?.rcBg),
                  color: str(v.mx?.rcFg),
                  cursor: 'pointer',
                  fontSize: '12px',
                } as CSSProperties
              }
            >
              Recruited
            </button>
            <button
              onClick={v.mx?.toggleStar}
              style={
                {
                  minHeight: '36px',
                  padding: '0 12px',
                  border: '0',
                  borderRadius: '6px',
                  background: str(v.mx?.stBg),
                  color: str(v.mx?.stFg),
                  cursor: 'pointer',
                  fontSize: '12px',
                } as CSSProperties
              }
            >
              Starred
            </button>
          </span>
        </div>
        <div
          style={
            {
              display: str(v.mx?.sortD),
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '-6px',
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
            Sort by
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2px',
              padding: '3px',
              borderRadius: '8px',
              background: 'var(--bg, oklch(0.16 0.01 60))',
              border: '1px solid var(--line, oklch(0.29 0.012 60))',
            }}
          >
            {L(v.mx?.sortTabs).map((b: any, $index: number) => (
              <Fragment key={$index}>
                <button
                  onClick={b?.click}
                  aria-pressed={b?.on}
                  style={
                    {
                      minHeight: '36px',
                      padding: '0 12px',
                      border: '0',
                      borderRadius: '6px',
                      background: str(b?.bg),
                      color: str(b?.fg),
                      cursor: 'pointer',
                      fontSize: '12px',
                    } as CSSProperties
                  }
                >
                  {T(b?.l)}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        <div
          data-jump="mx-list"
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
            {L(v.mx?.sortBtns).map((b: any, $index: number) => (
              <Fragment key={$index}>
                <button
                  onClick={b?.click}
                  title="Sort by highest"
                  style={
                    {
                      padding: '0',
                      border: '0',
                      background: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: str(b?.fg),
                    } as CSSProperties
                  }
                >
                  {T(b?.l)}
                </button>
              </Fragment>
            ))}
          </div>
          {L(v.mx?.rows).map((r: any, $index: number) => (
            <Fragment key={$index}>
              <div
                data-jump={`mx:${str(r?.n)}`}
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
                data-rh="1"
              >
                <span
                  style={
                    {
                      gridColumn: str(v.mx?.nameCol),
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      minWidth: '0',
                    } as CSSProperties
                  }
                >
                  <span style={{ fontWeight: '600', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {T(r?.n)}
                  </span>
                  <span
                    style={
                      {
                        display: str(v.mx?.reqLD),
                        marginLeft: 'auto',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: '3px',
                      } as CSSProperties
                    }
                  >
                    {L(r?.reqL).map((x: any, $index: number) => (
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
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
                  <span
                    style={
                      {
                        display: str(v.mx?.lblD),
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      } as CSSProperties
                    }
                  >
                    {'Support '}
                    <span style={{ letterSpacing: '.04em', textTransform: 'none' }}>
                      ({T(r?.cntTxt)}
                      {' common)'}
                    </span>
                  </span>
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px' }}>
                    {L(r?.sups).map((q: any, $index: number) => (
                      <Fragment key={$index}>
                        <span style={{ font: "500 12px/1.3 'IBM Plex Mono',monospace", whiteSpace: 'nowrap' }}>
                          <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(q?.nm)}</span>{' '}
                          <span style={{ fontWeight: '600', color: str(q?.col) } as CSSProperties}>{T(q?.rk)}</span>
                        </span>
                      </Fragment>
                    ))}
                  </span>
                </span>
                <span
                  style={
                    { display: str(v.mx?.cmnD), flexDirection: 'column', gap: '6px', minWidth: '0' } as CSSProperties
                  }
                >
                  <span style={{ display: 'none' }}></span>
                  <span
                    style={{ font: "500 12px/1 'IBM Plex Mono',monospace", color: 'var(--mu, oklch(0.7 0.01 70))' }}
                  >
                    {T(r?.cntTxt)}
                  </span>
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
                  <span
                    style={
                      {
                        display: str(v.mx?.lblMealD),
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                      } as CSSProperties
                    }
                  >
                    Meal
                  </span>
                  <span style={{ display: 'flex', minWidth: '0' }}>
                    {v.mx?.hasMeal ? (
                      <>
                        <span
                          style={
                            {
                              font: "600 12px/1.3 'IBM Plex Mono',monospace",
                              color: str(r?.meal?.col),
                              whiteSpace: 'nowrap',
                            } as CSSProperties
                          }
                        >
                          {T(r?.meal?.l)}
                        </span>
                      </>
                    ) : null}
                  </span>
                </span>
                {v.mx?.showReq ? (
                  <>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
                      <span
                        style={
                          {
                            display: str(v.mx?.lblReqD),
                            font: "500 10px/1 'IBM Plex Mono',monospace",
                            letterSpacing: '.14em',
                            textTransform: 'uppercase',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          } as CSSProperties
                        }
                      >
                        Renown
                      </span>
                      <span
                        style={{ font: "500 12px/1 'IBM Plex Mono',monospace", color: 'var(--mu, oklch(0.7 0.01 70))' }}
                      >
                        {T(r?.renTxt)}
                      </span>
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
                      <span
                        style={
                          {
                            display: str(v.mx?.lblReqD),
                            font: "500 10px/1 'IBM Plex Mono',monospace",
                            letterSpacing: '.14em',
                            textTransform: 'uppercase',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          } as CSSProperties
                        }
                      >
                        Sup lvl
                      </span>
                      <span
                        style={{ font: "500 12px/1 'IBM Plex Mono',monospace", color: 'var(--mu, oklch(0.7 0.01 70))' }}
                      >
                        {T(r?.slTxt)}
                      </span>
                    </span>
                  </>
                ) : null}
              </div>
            </Fragment>
          ))}
          {v.mx?.empty ? (
            <>
              <div style={{ padding: '24px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                No characters with a support to the selected yet. Turn off Support to list everyone.
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  )
}
