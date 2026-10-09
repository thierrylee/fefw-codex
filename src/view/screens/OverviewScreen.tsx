import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function OverviewScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label="Overview" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {v.needPick ? (
          <>
            <div
              style={
                {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '16px 18px',
                  borderRadius: '12px',
                  border: `1px dashed ${str(v.partColor)}`,
                  background: 'var(--panel2, oklch(0.25 0.012 60))',
                } as CSSProperties
              }
            >
              <span style={{ fontWeight: '600' }}>Choose your path</span>
              <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                No saved progress yet. Start at the Prologue, or jump to a route.
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {L(v.pickOpts).map((o: any, $index: number) => (
                  <Fragment key={$index}>
                    <button
                      onClick={o?.click}
                      style={
                        {
                          cursor: 'pointer',
                          minHeight: '44px',
                          padding: '0 16px',
                          borderRadius: '999px',
                          border: `1px solid ${str(v.partColor)}`,
                          background: 'transparent',
                          color: 'inherit',
                          font: 'inherit',
                        } as CSSProperties
                      }
                    >
                      {T(o?.l)}
                    </button>
                  </Fragment>
                ))}
              </div>
            </div>
          </>
        ) : null}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div
            style={
              {
                font: "500 10px/1 'IBM Plex Mono',monospace",
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: str(v.partColor),
              } as CSSProperties
            }
          >
            {T(v.partName)}
            {' · '}
            {T(v.routeLabel)}
          </div>
          <h1 style={{ margin: '0', font: "600 34px/1.1 'Cinzel',serif", letterSpacing: '.02em', textWrap: 'pretty' }}>
            {T(v.availN)}
            {' units at your side'}
          </h1>
          <p style={{ margin: '0', color: 'var(--mu, oklch(0.7 0.01 70))', maxWidth: '60ch', textWrap: 'pretty' }}>
            {T(v.overviewSub)}
          </p>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '16px' }}
        >
          <div
            style={
              {
                gridColumn: `span ${str(v.heroSpan)}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '22px',
                borderRadius: 'var(--r, 14px)',
                background: 'var(--panel, oklch(0.2 0.01 60))',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                boxShadow: 'var(--glow, none)',
              } as CSSProperties
            }
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  font: "500 10px/1 'IBM Plex Mono',monospace",
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                }}
              >
                Current build
              </div>
              <button
                onClick={v.goCalc}
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
                Open unit builder
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', flexWrap: 'wrap' }}>
              <div style={{ font: "600 56px/0.9 'IBM Plex Mono',monospace", color: 'var(--ac, oklch(0.8 0.11 75))' }}>
                {T(v.calcTotal)}
                <span style={{ fontSize: '22px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '4px' }}>
                <div style={{ font: "600 18px/1.2 'Cinzel',serif" }}>{T(v.calcC)}</div>
                <div style={{ color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                  {T(v.calcPathLbl)}
                  {T(v.calcMLabel)}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9,minmax(0,1fr))',
                gap: '6px',
                alignItems: 'end',
                height: '92px',
              }}
            >
              {L(v.calcRows).map((row: any, $index: number) => (
                <Fragment key={$index}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '5px',
                      height: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <div
                      style={
                        {
                          width: '100%',
                          maxWidth: '26px',
                          borderRadius: '4px 4px 1px 1px',
                          background: 'var(--ac, oklch(0.8 0.11 75))',
                          opacity: '.9',
                          height: str(row?.hMini),
                        } as CSSProperties
                      }
                    ></div>
                    <span
                      style={{ font: "500 10px/1 'IBM Plex Mono',monospace", color: 'var(--mu, oklch(0.7 0.01 70))' }}
                    >
                      {T(row?.s)}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '22px',
              borderRadius: 'var(--r, 14px)',
              background: 'var(--panel, oklch(0.2 0.01 60))',
              border: '1px solid var(--line, oklch(0.29 0.012 60))',
            }}
          >
            <div
              style={{
                font: "500 10px/1 'IBM Plex Mono',monospace",
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              Highest base growth
            </div>
            {L(v.topGrowth).map((g: any, $index: number) => (
              <Fragment key={$index}>
                <button
                  onClick={g?.open}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '4px 12px',
                    alignItems: 'center',
                    padding: '0',
                    border: '0',
                    background: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: '500' }}>{T(g?.n)}</span>
                  <span
                    style={{ font: "500 12px/1 'IBM Plex Mono',monospace", color: 'var(--mu, oklch(0.7 0.01 70))' }}
                  >
                    {T(g?.tot)}%
                  </span>
                  <span
                    style={{
                      gridColumn: '1/-1',
                      height: '4px',
                      borderRadius: '2px',
                      background: 'var(--panel2, oklch(0.25 0.012 60))',
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={
                        {
                          display: 'block',
                          height: '100%',
                          width: str(g?.w),
                          background: 'var(--ac, oklch(0.8 0.11 75))',
                        } as CSSProperties
                      }
                    ></span>
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        {v.hasTeaser ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ margin: '0', font: "600 18px/1.2 'Cinzel',serif" }}>Sealed until later parts</h2>
                <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))', fontSize: '13px' }}>
                  {T(v.sealedN)}
                  {' units · advance the progress stepper to reveal'}
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,180px),1fr))',
                  gap: '12px',
                }}
              >
                {L(v.teaser).map((c: any, $index: number) => (
                  <Fragment key={$index}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: 'var(--r, 14px)',
                        border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                        background:
                          'repeating-linear-gradient(135deg,transparent 0 8px,rgba(255,255,255,.02) 8px 16px)',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: 'var(--panel2, oklch(0.25 0.012 60))',
                          filter: 'blur(3px)',
                        }}
                      ></div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                        <span style={{ fontWeight: '600', filter: 'blur(5px)', userSelect: 'none' }}>{T(c?.n)}</span>
                        <span
                          style={{ font: "500 10px/1 'IBM Plex Mono',monospace", color: str(c?.pcol) } as CSSProperties}
                        >
                          {T(c?.partLbl)}
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </section>
    </>
  )
}
