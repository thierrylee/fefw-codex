import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function ChartsScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label="Charts" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px 16px',
              flexWrap: 'wrap',
            }}
          >
            <h1 style={{ display: str(v.h1Disp), margin: '0', font: "600 30px/1.1 'Cinzel',serif" } as CSSProperties}>
              Charts
            </h1>
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
              {L(v.chartJumps).map((j: any, $index: number) => (
                <Fragment key={$index}>
                  <button
                    onClick={j?.go}
                    aria-pressed={j?.on}
                    style={
                      {
                        minHeight: '36px',
                        padding: '0 12px',
                        border: '0',
                        borderRadius: '6px',
                        background: str(j?.bg),
                        color: str(j?.fg),
                        cursor: 'pointer',
                        fontSize: '12px',
                      } as CSSProperties
                    }
                  >
                    {T(j?.l)}
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
          <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>
            Base character growths for every unit you can field.
          </span>
        </div>
        <div
          data-jump="c-gro"
          style={
            {
              padding: '20px',
              borderRadius: 'var(--r, 14px)',
              background: 'var(--panel, oklch(0.2 0.01 60))',
              border: '1px solid var(--line, oklch(0.29 0.012 60))',
              display: str(v.chD?.gro),
              flexDirection: 'column',
              gap: '14px',
              minWidth: '0',
            } as CSSProperties
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '10px 14px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
              <h2 style={{ margin: '0', font: "600 17px/1.2 'Cinzel',serif" }}>Growth heatmap</h2>
              <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                Base growth % for every unit. Click column headers to select several; rows sort by the total of the
                selected stats.
              </span>
            </div>
          </div>
          {v.hmPhone ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: '6px' }}>
                  {L(v.hmHead).map((h: any, $index: number) => (
                    <Fragment key={$index}>
                      <button
                        onClick={h?.click}
                        style={
                          {
                            minHeight: '40px',
                            border: '0',
                            borderRadius: '8px',
                            background: str(h?.bg),
                            color: str(h?.fg),
                            cursor: 'pointer',
                            font: "600 12px/1 'IBM Plex Mono',monospace",
                          } as CSSProperties
                        }
                      >
                        {T(h?.l)}
                      </button>
                    </Fragment>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {L(v.hmP).map((r: any, $index: number) => (
                    <Fragment key={$index}>
                      <button
                        onClick={r?.open}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          background: 'var(--bg, oklch(0.16 0.01 60))',
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: 'inherit',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <span
                            style={{
                              font: "500 11px/1 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                              minWidth: '20px',
                            }}
                          >
                            {T(r?.rank)}
                          </span>
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
                            {T(r?.n)}
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
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(9,minmax(0,1fr))',
                            gap: '2px',
                            width: '100%',
                          }}
                        >
                          {L(r?.cells).map((x: any, $index: number) => (
                            <Fragment key={$index}>
                              <span
                                style={
                                  {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '2px',
                                    opacity: str(x?.op),
                                  } as CSSProperties
                                }
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
                      </button>
                    </Fragment>
                  ))}
                </div>
              </div>
            </>
          ) : null}
          {v.hmWide ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '28px 150px repeat(9,minmax(0,1fr)) 64px',
                    gap: '4px',
                    alignItems: 'center',
                    position: 'sticky',
                    top: '0',
                    zIndex: '2',
                    padding: '0 8px 8px',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                  }}
                >
                  <span></span>
                  <span
                    style={{
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    Unit
                  </span>
                  {L(v.hmHeadS).map((h: any, $index: number) => (
                    <Fragment key={$index}>
                      <button
                        onClick={h?.click}
                        style={
                          {
                            padding: '9px 0',
                            border: '1px solid transparent',
                            borderRadius: '8px',
                            background: str(h?.bg),
                            color: str(h?.fg),
                            cursor: 'pointer',
                            font: "600 11px/1 'IBM Plex Mono',monospace",
                            letterSpacing: '.06em',
                          } as CSSProperties
                        }
                      >
                        {T(h?.l)}
                      </button>
                    </Fragment>
                  ))}
                  <button
                    onClick={v.hmSig?.click}
                    style={
                      {
                        padding: '9px 0',
                        border: `1px solid ${str(v.hmSig?.bd)}`,
                        borderRadius: '8px',
                        background: str(v.hmSig?.bg),
                        color: str(v.hmSig?.fg),
                        cursor: 'pointer',
                        font: "600 11px/1 'IBM Plex Mono',monospace",
                      } as CSSProperties
                    }
                  >
                    {T(v.hmSig?.l)}
                  </button>
                </div>
                {L(v.hmP).map((r: any, $index: number) => (
                  <Fragment key={$index}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 150px repeat(9,minmax(0,1fr)) 64px',
                        gap: '4px',
                        alignItems: 'stretch',
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}
                      className="hv-6"
                    >
                      <span
                        style={{
                          display: 'grid',
                          placeItems: 'center',
                          font: "500 10px/1 'IBM Plex Mono',monospace",
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                        }}
                      >
                        {T(r?.rank)}
                      </span>
                      <button
                        onClick={r?.open}
                        style={{
                          padding: '0',
                          border: '0',
                          background: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: 'inherit',
                          font: "500 14px/1 'IBM Plex Sans'",
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {T(r?.n)}
                      </button>
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
                                opacity: str(x?.op),
                                font: "500 12px/1 'IBM Plex Mono',monospace",
                              } as CSSProperties
                            }
                          >
                            {T(x?.v)}
                          </div>
                        </Fragment>
                      ))}
                      <div
                        style={{
                          display: 'grid',
                          placeItems: 'center',
                          font: "600 13px/1 'IBM Plex Mono',monospace",
                          color: 'var(--ac, oklch(0.8 0.11 75))',
                        }}
                      >
                        {T(r?.tot)}
                      </div>
                    </div>
                  </Fragment>
                ))}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 8px 0',
                    font: "500 10px/1 'IBM Plex Mono',monospace",
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                  }}
                >
                  <span>10%</span>
                  <span
                    style={
                      {
                        flex: '0 1 220px',
                        height: '8px',
                        borderRadius: '4px',
                        background: str(v.hmScale),
                      } as CSSProperties
                    }
                  ></span>
                  <span>70%+</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div
          data-jump="c-exp"
          style={
            {
              padding: '20px',
              borderRadius: 'var(--r, 14px)',
              background: 'var(--panel, oklch(0.2 0.01 60))',
              border: '1px solid var(--line, oklch(0.29 0.012 60))',
              display: str(v.chD?.exp),
              flexDirection: 'column',
              gap: '14px',
              minWidth: '0',
            } as CSSProperties
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '10px 14px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
              <h2 style={{ margin: '0', font: "600 17px/1.2 'Cinzel',serif" }}>
                {'Expected stats at Lv '}
                {T(v.bmLv)}
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                Base + growth × (Lv − 1), personal growth only, shaded within each stat. Small text shows Lv 1 base and
                growth %. Click column headers to select several; rows sort by the total of the selected stats.
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                font: "500 11px/1 'IBM Plex Mono',monospace",
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              <button
                onClick={v.bmDec}
                aria-label="Lower level"
                style={{
                  width: '36px',
                  height: '36px',
                  flex: 'none',
                  borderRadius: '999px',
                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  background: 'var(--panel)',
                  color: 'var(--tx, oklch(0.94 0.008 80))',
                  font: "600 16px/1 'IBM Plex Mono',monospace",
                  cursor: 'pointer',
                }}
              >
                −
              </button>
              <input
                type="range"
                min="1"
                max="99"
                value={v.bmLv ?? ''}
                onInput={v.onBmLv}
                aria-label="Level"
                style={{ width: '160px', maxWidth: '40vw', accentColor: 'var(--ac, oklch(0.8 0.11 75))' }}
              />
              <button
                onClick={v.bmInc}
                aria-label="Raise level"
                style={{
                  width: '36px',
                  height: '36px',
                  flex: 'none',
                  borderRadius: '999px',
                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  background: 'var(--panel)',
                  color: 'var(--tx, oklch(0.94 0.008 80))',
                  font: "600 16px/1 'IBM Plex Mono',monospace",
                  cursor: 'pointer',
                }}
              >
                +
              </button>
            </div>
          </div>
          {v.hmPhone ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: '6px' }}>
                  {L(v.bmHead).map((h: any, $index: number) => (
                    <Fragment key={$index}>
                      <button
                        onClick={h?.click}
                        style={
                          {
                            minHeight: '40px',
                            border: '0',
                            borderRadius: '8px',
                            background: str(h?.bg),
                            color: str(h?.fg),
                            cursor: 'pointer',
                            font: "600 12px/1 'IBM Plex Mono',monospace",
                          } as CSSProperties
                        }
                      >
                        {T(h?.l)}
                      </button>
                    </Fragment>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {L(v.bmP).map((r: any, $index: number) => (
                    <Fragment key={$index}>
                      <button
                        onClick={r?.open}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          background: 'var(--bg, oklch(0.16 0.01 60))',
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: 'inherit',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <span
                            style={{
                              font: "500 11px/1 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                              minWidth: '20px',
                            }}
                          >
                            {T(r?.rank)}
                          </span>
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
                            {T(r?.n)}
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
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(9,minmax(0,1fr))',
                            gap: '2px',
                            width: '100%',
                          }}
                        >
                          {L(r?.cells).map((x: any, $index: number) => (
                            <Fragment key={$index}>
                              <span
                                style={
                                  {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '2px',
                                    opacity: str(x?.op),
                                  } as CSSProperties
                                }
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
                      </button>
                    </Fragment>
                  ))}
                </div>
              </div>
            </>
          ) : null}
          {v.hmWide ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '28px 150px repeat(9,minmax(0,1fr)) 64px',
                    gap: '4px',
                    alignItems: 'center',
                    position: 'sticky',
                    top: '0',
                    zIndex: '2',
                    padding: '0 8px 8px',
                    background: 'var(--panel, oklch(0.2 0.01 60))',
                  }}
                >
                  <span></span>
                  <span
                    style={{
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    Unit
                  </span>
                  {L(v.bmHeadS).map((h: any, $index: number) => (
                    <Fragment key={$index}>
                      <button
                        onClick={h?.click}
                        style={
                          {
                            padding: '9px 0',
                            border: '1px solid transparent',
                            borderRadius: '8px',
                            background: str(h?.bg),
                            color: str(h?.fg),
                            cursor: 'pointer',
                            font: "600 11px/1 'IBM Plex Mono',monospace",
                            letterSpacing: '.06em',
                          } as CSSProperties
                        }
                      >
                        {T(h?.l)}
                      </button>
                    </Fragment>
                  ))}
                  <button
                    onClick={v.bmSig?.click}
                    style={
                      {
                        padding: '9px 0',
                        border: `1px solid ${str(v.bmSig?.bd)}`,
                        borderRadius: '8px',
                        background: str(v.bmSig?.bg),
                        color: str(v.bmSig?.fg),
                        cursor: 'pointer',
                        font: "600 11px/1 'IBM Plex Mono',monospace",
                      } as CSSProperties
                    }
                  >
                    {T(v.bmSig?.l)}
                  </button>
                </div>
                {L(v.bmP).map((r: any, $index: number) => (
                  <Fragment key={$index}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 150px repeat(9,minmax(0,1fr)) 64px',
                        gap: '4px',
                        alignItems: 'stretch',
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}
                      className="hv-6"
                    >
                      <span
                        style={{
                          display: 'grid',
                          placeItems: 'center',
                          font: "500 10px/1 'IBM Plex Mono',monospace",
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                        }}
                      >
                        {T(r?.rank)}
                      </span>
                      <button
                        onClick={r?.open}
                        style={{
                          padding: '0',
                          border: '0',
                          background: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: 'inherit',
                          font: "500 14px/1 'IBM Plex Sans'",
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {T(r?.n)}
                      </button>
                      {L(r?.cells).map((x: any, $index: number) => (
                        <Fragment key={$index}>
                          <div
                            style={
                              {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '3px',
                                height: '44px',
                                minWidth: '0',
                                overflow: 'hidden',
                                borderRadius: '8px',
                                background: str(x?.bg),
                                color: str(x?.fg),
                                opacity: str(x?.op),
                              } as CSSProperties
                            }
                          >
                            <span style={{ font: "600 13px/1 'IBM Plex Mono',monospace" }}>{T(x?.v)}</span>
                            <span
                              style={{
                                maxWidth: '100%',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                font: "500 8.5px/1 'IBM Plex Mono',monospace",
                                letterSpacing: '-.02em',
                                opacity: '.6',
                              }}
                            >
                              {T(x?.sub)}
                            </span>
                          </div>
                        </Fragment>
                      ))}
                      <div
                        style={{
                          display: 'grid',
                          placeItems: 'center',
                          font: "600 13px/1 'IBM Plex Mono',monospace",
                          color: 'var(--ac, oklch(0.8 0.11 75))',
                        }}
                      >
                        {T(r?.tot)}
                      </div>
                    </div>
                  </Fragment>
                ))}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 8px 0',
                    font: "500 10px/1 'IBM Plex Mono',monospace",
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                  }}
                >
                  <span>Lowest</span>
                  <span
                    style={
                      {
                        flex: '0 1 220px',
                        height: '8px',
                        borderRadius: '4px',
                        background: str(v.bmScale),
                      } as CSSProperties
                    }
                  ></span>
                  <span>Highest</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  )
}
