import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function CatalogScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label={v.xTitle} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ display: str(v.h1Disp), margin: '0', font: "600 30px/1.1 'Cinzel',serif" } as CSSProperties}>
              {T(v.xTitle)}
            </h1>
            <span style={{ color: 'var(--mu, oklch(0.78 0.035 120))' }}>{T(v.xSub)}</span>
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
                value={v.xq ?? ''}
                onChange={v.onXq}
                placeholder="Search name or effect"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '8px 36px 8px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--line)',
                  background: 'var(--panel)',
                  outline: 'none',
                }}
              />
              <button
                onClick={v.onXClear}
                title="Clear"
                aria-label="Clear search"
                style={
                  {
                    display: str(v.xClrDisp),
                    position: 'absolute',
                    right: '4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: str(v.tk28),
                    height: str(v.tk28),
                    border: '0',
                    borderRadius: '50%',
                    background: 'transparent',
                    color: 'var(--mu)',
                    cursor: 'pointer',
                    fontSize: '16px',
                    lineHeight: '1',
                  } as CSSProperties
                }
              >
                ×
              </button>
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
              {L(v.xTabRows).map((row: any, $index: number) => (
                <Fragment key={$index}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
                    {L(row?.tabs).map((t: any, $index: number) => (
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
                              whiteSpace: 'nowrap',
                              fontSize: '12px',
                            } as CSSProperties
                          }
                        >
                          {T(t?.l)}
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        {v.xEmpty ? (
          <>
            <span style={{ color: 'var(--mu, oklch(0.78 0.035 120))' }}>No matches.</span>
          </>
        ) : null}
        <div
          style={
            { display: 'grid', gridTemplateColumns: str(v.xCols), gap: '10px', alignItems: 'start' } as CSSProperties
          }
        >
          {L(v.xRows).map((r: any, $index: number) => (
            <Fragment key={$index}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                  background: 'var(--panel, oklch(0.245 0.05 165))',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                  <span
                    style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '2px 6px', minWidth: '0' }}
                  >
                    <span style={{ fontWeight: '600' }}>{T(r?.n)}</span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.06em',
                        color: 'var(--mu, oklch(0.78 0.035 120))',
                        opacity: '.7',
                      }}
                    >
                      {T(r?.code)}
                    </span>
                  </span>
                  <span
                    style={{
                      flex: 'none',
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: 'var(--mu, oklch(0.78 0.035 120))',
                    }}
                  >
                    {T(r?.tag)}
                  </span>
                </span>
                {r?.hasE ? (
                  <>
                    <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))', textWrap: 'pretty' }}>
                      {T(r?.e)}
                    </span>
                  </>
                ) : null}
                {r?.hasC ? (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {L(r?.chips).map((c: any, $index: number) => (
                        <Fragment key={$index}>
                          <span
                            style={{
                              font: "500 11px/1 'IBM Plex Mono',monospace",
                              padding: '4px 7px',
                              borderRadius: '4px',
                              background: 'var(--panel2, oklch(0.3 0.055 165))',
                              color: 'var(--ac, oklch(0.82 0.12 85))',
                            }}
                          >
                            {T(c)}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </>
  )
}
