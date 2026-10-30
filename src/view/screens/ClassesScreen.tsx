import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function ClassesScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label="Classes" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {v.kBackOn ? (
          <>
            <button
              onClick={v.kBack}
              style={{
                display: 'none',
                alignSelf: 'flex-start',
                minHeight: '44px',
                padding: '0',
                border: '0',
                background: 'none',
                color: 'var(--mu, oklch(0.7 0.01 70))',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              ← Classes
            </button>
          </>
        ) : null}
        <div
          style={
            {
              display: str(v.kListDisp),
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '14px',
              flexWrap: 'wrap',
            } as CSSProperties
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ display: str(v.h1Disp), margin: '0', font: "600 30px/1.1 'Cinzel',serif" } as CSSProperties}>
              Classes
            </h1>
            <span style={{ color: 'var(--mu, oklch(0.78 0.035 120))' }}>
              {T(v.kCount)}
              {' classes · mounted classes list compatible mounts'}
            </span>
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
                value={v.kq ?? ''}
                onChange={v.onKq}
                placeholder="Search class, weapon or skill"
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
                onClick={v.onKClear}
                title="Clear"
                aria-label="Clear search"
                style={
                  {
                    display: str(v.kClrDisp),
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
            <div
              style={
                { display: str(v.kListDisp), flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' } as CSSProperties
              }
            >
              <select
                value={v.kwp ?? ''}
                onChange={v.onKwp}
                aria-label="Skill"
                style={{
                  padding: '7px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--line)',
                  background: 'var(--panel)',
                  color: 'var(--tx, #eee)',
                  fontSize: '12px',
                  maxWidth: '100%',
                }}
              >
                {L(v.kwpOpts).map((o: any, $index: number) => (
                  <Fragment key={$index}>
                    <option value={o ?? ''}>{T(o)}</option>
                  </Fragment>
                ))}
              </select>
              {L(v.kTabs).map((t: any, $index: number) => (
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
          </div>
        </div>
        <div
          style={
            { display: 'grid', gridTemplateColumns: str(v.kCols), gap: '16px', alignItems: 'start' } as CSSProperties
          }
        >
          <div
            style={{ display: str(v.kListDisp), flexDirection: 'column', gap: '16px', minWidth: '0' } as CSSProperties}
          >
            {L(v.kGroups).map((g: any, $index: number) => (
              <Fragment key={$index}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--mu, oklch(0.78 0.035 120))',
                    }}
                  >
                    {T(g?.t)}
                    {' · '}
                    {T(g?.n)}
                  </span>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,190px),1fr))',
                      gap: '8px',
                    }}
                  >
                    {L(g?.items).map((k: any, $index: number) => (
                      <Fragment key={$index}>
                        <button
                          onClick={k?.open}
                          style={
                            {
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              padding: '11px 13px',
                              borderRadius: '10px',
                              border: `1px solid ${str(k?.bd)}`,
                              background: str(k?.bg),
                              cursor: 'pointer',
                              textAlign: 'left',
                            } as CSSProperties
                          }
                        >
                          <span
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              justifyContent: 'space-between',
                              gap: '6px 8px',
                              alignItems: 'center',
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '0' }}>
                              <span
                                style={{
                                  flex: 'none',
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  background: 'var(--panel2, oklch(0.25 0.012 60))',
                                  display: 'grid',
                                }}
                              >
                                <img
                                  src={k?.img}
                                  alt=""
                                  loading="lazy"
                                  data-h="1"
                                  onError={v.imgErr}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                              </span>
                              <span style={{ fontWeight: '600' }}>{T(k?.n)}</span>
                            </span>
                            <span style={{ display: 'flex', gap: '4px', flex: 'none' }}>
                              {k?.armored ? (
                                <>
                                  <span
                                    style={{
                                      font: "500 9.5px/1 'IBM Plex Mono',monospace",
                                      letterSpacing: '.08em',
                                      padding: '3px 6px',
                                      borderRadius: '4px',
                                      border: '1px solid var(--ac, oklch(0.82 0.12 85))',
                                      color: 'var(--ac, oklch(0.82 0.12 85))',
                                    }}
                                  >
                                    ARMOR
                                  </span>
                                </>
                              ) : null}
                              {k?.mounted ? (
                                <>
                                  <span
                                    style={{
                                      font: "500 9.5px/1 'IBM Plex Mono',monospace",
                                      letterSpacing: '.08em',
                                      padding: '3px 6px',
                                      borderRadius: '4px',
                                      border: '1px solid var(--ac, oklch(0.82 0.12 85))',
                                      color: 'var(--ac, oklch(0.82 0.12 85))',
                                    }}
                                  >
                                    MOUNT
                                  </span>
                                </>
                              ) : null}
                              {k?.flier ? (
                                <>
                                  <span
                                    style={{
                                      font: "500 9.5px/1 'IBM Plex Mono',monospace",
                                      letterSpacing: '.08em',
                                      padding: '3px 6px',
                                      borderRadius: '4px',
                                      border: '1px solid var(--ac, oklch(0.82 0.12 85))',
                                      color: 'var(--ac, oklch(0.82 0.12 85))',
                                    }}
                                  >
                                    FLIER
                                  </span>
                                </>
                              ) : null}
                            </span>
                          </span>
                          <span
                            style={{
                              fontSize: '12px',
                              color: 'var(--mu, oklch(0.78 0.035 120))',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {T(k?.type)}
                            {' · Mov '}
                            {T(k?.mov)}
                          </span>
                          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
                            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {L(k?.absW).map((a: any, $index: number) => (
                                <Fragment key={$index}>
                                  <span
                                    style={
                                      {
                                        fontSize: '11px',
                                        lineHeight: '1.2',
                                        padding: '3px 6px',
                                        borderRadius: '4px',
                                        background: 'var(--panel2, oklch(0.3 0.055 165))',
                                        color: str(a?.col),
                                      } as CSSProperties
                                    }
                                  >
                                    {T(a?.n)}
                                  </span>
                                </Fragment>
                              ))}
                            </span>
                          </span>
                          {k?.locked ? (
                            <>
                              <span style={{ fontSize: '12px', color: 'oklch(0.74 0.12 30)', textWrap: 'pretty' }}>
                                {'Locked · '}
                                {T(k?.lockTxt)}
                              </span>
                            </>
                          ) : null}
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          {v.kShowDetail ? (
            <>
              <div
                data-kdetail="1"
                style={
                  {
                    position: str(v.kPos),
                    top: str(v.kTop),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    padding: '20px',
                    borderRadius: 'var(--r, 14px)',
                    background: 'var(--panel, oklch(0.245 0.05 165))',
                    border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                    maxHeight: str(v.kMaxH),
                    overflow: 'auto',
                  } as CSSProperties
                }
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '10px',
                      alignItems: 'baseline',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
                      <span
                        style={{
                          flex: 'none',
                          width: '44px',
                          height: '44px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          background: 'var(--panel2, oklch(0.25 0.012 60))',
                          display: 'grid',
                        }}
                      >
                        <img
                          src={v.k?.img}
                          alt=""
                          loading="lazy"
                          data-h="1"
                          onError={v.imgErr}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </span>
                      <h2
                        style={{
                          margin: '0',
                          font: "600 16px/1.25 'Cinzel',serif",
                          color: 'var(--ac, oklch(0.82 0.12 85))',
                        }}
                      >
                        {T(v.k?.n)}
                      </h2>
                    </span>
                    <span
                      style={{
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        color: 'var(--mu, oklch(0.78 0.035 120))',
                        textAlign: 'right',
                      }}
                    >
                      {T(v.k?.sub)}
                    </span>
                  </div>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {L(v.k?.skW).map((a: any, $index: number) => (
                        <Fragment key={$index}>
                          <span
                            style={
                              {
                                fontSize: '13px',
                                fontWeight: '600',
                                lineHeight: '1.2',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                background: 'var(--panel2, oklch(0.3 0.055 165))',
                                color: str(a?.col),
                              } as CSSProperties
                            }
                          >
                            {T(a?.n)}
                          </span>
                        </Fragment>
                      ))}
                    </span>
                  </span>
                  <span
                    style={{
                      font: "500 11px/1.4 'IBM Plex Mono',monospace",
                      color: 'var(--mu, oklch(0.78 0.035 120))',
                    }}
                  >
                    {T(v.k?.note)}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    font: "500 11px/1.4 'IBM Plex Mono',monospace",
                    color: 'var(--mu, oklch(0.78 0.035 120))',
                  }}
                >
                  {L(v.k?.facts).map((f: any, $index: number) => (
                    <Fragment key={$index}>
                      <span>
                        {T(f?.k)}
                        {': '}
                        {T(f?.v)}
                      </span>
                    </Fragment>
                  ))}
                </div>
                {v.k?.hasUn ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span
                        style={{
                          font: "500 10px/1 'IBM Plex Mono',monospace",
                          letterSpacing: '.14em',
                          textTransform: 'uppercase',
                          color: 'var(--mu, oklch(0.78 0.035 120))',
                        }}
                      >
                        Unlock requirements
                      </span>
                      {v.k?.unLocked ? (
                        <>
                          <span
                            style={{
                              padding: '10px 12px',
                              borderRadius: '8px',
                              border: '1px solid oklch(0.74 0.12 30)',
                              fontSize: '13px',
                              color: 'oklch(0.74 0.12 30)',
                              textWrap: 'pretty',
                            }}
                          >
                            {T(v.k?.unWarn)}
                          </span>
                        </>
                      ) : null}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
                          gap: '8px',
                        }}
                      >
                        {L(v.k?.un).map((u: any, $index: number) => (
                          <Fragment key={$index}>
                            <div
                              style={
                                {
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '6px',
                                  padding: '12px 14px',
                                  borderRadius: '10px',
                                  border: `1px solid ${str(u?.bd)}`,
                                  background: 'var(--panel2, oklch(0.3 0.055 165))',
                                } as CSSProperties
                              }
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                                <span style={{ fontWeight: '600' }}>
                                  {T(u?.r)}
                                  {T(u?.tag)}
                                </span>
                                <span
                                  style={{
                                    font: "500 11px/1.4 'IBM Plex Mono',monospace",
                                    color: 'var(--ac, oklch(0.82 0.12 85))',
                                  }}
                                >
                                  {T(u?.where)}
                                </span>
                              </div>
                              <span
                                style={{
                                  fontSize: '12px',
                                  color: 'var(--mu, oklch(0.78 0.035 120))',
                                  textWrap: 'pretty',
                                }}
                              >
                                {T(u?.d)}
                              </span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--mu, oklch(0.78 0.035 120))',
                    }}
                  >
                    {'Growth modifier · Σ '}
                    {T(v.k?.gt)}%{T(v.k?.gLbl)}
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9,minmax(0,1fr))', gap: '4px' }}>
                    {L(v.k?.g).map((x: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '7px 0',
                            borderRadius: '6px',
                            background: 'var(--panel2, oklch(0.3 0.055 165))',
                          }}
                        >
                          <span
                            style={{
                              font: "500 9.5px/1 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.78 0.035 120))',
                            }}
                          >
                            {T(x?.s)}
                          </span>
                          <span
                            style={
                              { font: "600 12px/1 'IBM Plex Mono',monospace", color: str(x?.col) } as CSSProperties
                            }
                          >
                            {T(x?.v)}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <span
                    style={{
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--mu, oklch(0.78 0.035 120))',
                      marginTop: '6px',
                    }}
                  >
                    Stat modifier
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9,minmax(0,1fr))', gap: '4px' }}>
                    {L(v.k?.mods).map((x: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '7px 0',
                            borderRadius: '6px',
                            background: 'var(--panel2, oklch(0.3 0.055 165))',
                          }}
                        >
                          <span
                            style={{
                              font: "500 9.5px/1 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.78 0.035 120))',
                            }}
                          >
                            {T(x?.s)}
                          </span>
                          <span
                            style={
                              { font: "600 12px/1 'IBM Plex Mono',monospace", color: str(x?.col) } as CSSProperties
                            }
                          >
                            {T(x?.v)}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  {v.k?.hasMn ? (
                    <>
                      <span
                        style={{
                          font: "500 10px/1 'IBM Plex Mono',monospace",
                          letterSpacing: '.14em',
                          textTransform: 'uppercase',
                          color: 'var(--mu, oklch(0.78 0.035 120))',
                          marginTop: '6px',
                        }}
                      >
                        Minimum stats
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9,minmax(0,1fr))', gap: '4px' }}>
                        {L(v.k?.mnc).map((x: any, $index: number) => (
                          <Fragment key={$index}>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '7px 0',
                                borderRadius: '6px',
                                background: 'var(--panel2, oklch(0.3 0.055 165))',
                              }}
                            >
                              <span
                                style={{
                                  font: "500 9.5px/1 'IBM Plex Mono',monospace",
                                  color: 'var(--mu, oklch(0.78 0.035 120))',
                                }}
                              >
                                {T(x?.s)}
                              </span>
                              <span
                                style={
                                  { font: "600 12px/1 'IBM Plex Mono',monospace", color: str(x?.col) } as CSSProperties
                                }
                              >
                                {T(x?.v)}
                              </span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
                {v.k?.hasAb ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span
                        style={{
                          font: "500 10px/1 'IBM Plex Mono',monospace",
                          letterSpacing: '.14em',
                          textTransform: 'uppercase',
                          color: 'var(--mu, oklch(0.78 0.035 120))',
                        }}
                      >
                        Abilities
                      </span>
                      {L(v.k?.abGroups).map((g: any, $index: number) => (
                        <Fragment key={$index}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>
                              {T(g?.lbl)}
                            </span>
                            {L(g?.items).map((a: any, $index: number) => (
                              <Fragment key={$index}>
                                <div
                                  style={
                                    {
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '4px',
                                      padding: '8px 10px',
                                      borderRadius: '10px',
                                      border: `1px ${str(g?.bs)} var(--line, oklch(0.42 0.06 110 / .55))`,
                                    } as CSSProperties
                                  }
                                >
                                  <span
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      gap: '8px',
                                    }}
                                  >
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '0' }}>
                                      <span
                                        style={
                                          {
                                            flex: 'none',
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '6px',
                                            background: str(a?.bgi),
                                          } as CSSProperties
                                        }
                                      ></span>
                                      <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(a?.n)}</span>
                                    </span>
                                    <span
                                      style={{
                                        font: "500 10px/1 'IBM Plex Mono',monospace",
                                        letterSpacing: '.12em',
                                        textTransform: 'uppercase',
                                        color: 'var(--mu, oklch(0.78 0.035 120))',
                                      }}
                                    >
                                      {T(a?.tag)}
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      fontSize: '12px',
                                      color: 'var(--mu, oklch(0.78 0.035 120))',
                                      textWrap: 'pretty',
                                    }}
                                  >
                                    {T(a?.e)}
                                  </span>
                                  {a?.hasMt ? (
                                    <>
                                      <span
                                        style={{
                                          alignSelf: 'flex-start',
                                          font: "500 11px/1 'IBM Plex Mono',monospace",
                                          padding: '4px 7px',
                                          borderRadius: '4px',
                                          background: 'var(--panel2, oklch(0.3 0.055 165))',
                                          color: 'var(--ac, oklch(0.82 0.12 85))',
                                        }}
                                      >
                                        {T(a?.mt)}
                                      </span>
                                    </>
                                  ) : null}
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
                {v.k?.mounted ? (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        paddingTop: '14px',
                        borderTop: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '10px',
                          alignItems: 'baseline',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span style={{ font: "600 16px/1.2 'Cinzel',serif", color: 'var(--ac, oklch(0.82 0.12 85))' }}>
                          Mounts
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>
                          {T(v.k?.mNote)}
                        </span>
                      </div>
                      {v.k?.noMounts ? (
                        <>
                          <span style={{ fontSize: '13px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>
                            No compatible mounts recorded in the workbook.
                          </span>
                        </>
                      ) : null}
                      {L(v.k?.mounts).map((m: any, $index: number) => (
                        <Fragment key={$index}>
                          <div
                            style={
                              {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                background: 'var(--panel2, oklch(0.3 0.055 165))',
                                border: `1px solid ${str(m?.bd)}`,
                              } as CSSProperties
                            }
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '10px',
                                alignItems: 'center',
                              }}
                            >
                              <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <span style={{ fontWeight: '600' }}>{T(m?.n)}</span>
                                <span
                                  style={{
                                    font: "500 10px/1 'IBM Plex Mono',monospace",
                                    color: 'var(--mu, oklch(0.78 0.035 120))',
                                  }}
                                >
                                  {T(m?.sp)}
                                  {' · Σ +'}
                                  {T(m?.gt)}%
                                </span>
                              </span>
                              <button
                                onClick={m?.pick}
                                style={
                                  {
                                    padding: '7px 12px',
                                    borderRadius: '999px',
                                    border: '1px solid oklch(0.74 0.1 300)',
                                    background: str(m?.pickBg),
                                    color: str(m?.pickFg),
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                  } as CSSProperties
                                }
                              >
                                {T(m?.pickLbl)}
                              </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <span
                                style={{
                                  font: "500 10px/1 'IBM Plex Mono',monospace",
                                  letterSpacing: '.14em',
                                  textTransform: 'uppercase',
                                  color: 'var(--mu, oklch(0.78 0.035 120))',
                                }}
                              >
                                Growth modifier
                              </span>
                              <div
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(9,minmax(0,1fr))', gap: '4px' }}
                              >
                                {L(m?.gc).map((x: any, $index: number) => (
                                  <Fragment key={$index}>
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '3px',
                                        padding: '7px 0',
                                        borderRadius: '6px',
                                        background: 'var(--panel, oklch(0.245 0.05 165))',
                                      }}
                                    >
                                      <span
                                        style={{
                                          font: "500 9.5px/1 'IBM Plex Mono',monospace",
                                          color: 'var(--mu, oklch(0.78 0.035 120))',
                                        }}
                                      >
                                        {T(x?.s)}
                                      </span>
                                      <span
                                        style={
                                          {
                                            font: "600 12px/1 'IBM Plex Mono',monospace",
                                            color: str(x?.col),
                                          } as CSSProperties
                                        }
                                      >
                                        {T(x?.v)}
                                      </span>
                                    </div>
                                  </Fragment>
                                ))}
                              </div>
                            </div>
                            {m?.hasSt ? (
                              <>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  <span
                                    style={{
                                      font: "500 10px/1 'IBM Plex Mono',monospace",
                                      letterSpacing: '.14em',
                                      textTransform: 'uppercase',
                                      color: 'var(--mu, oklch(0.78 0.035 120))',
                                    }}
                                  >
                                    Stat modifier
                                  </span>
                                  <div
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: 'repeat(9,minmax(0,1fr))',
                                      gap: '4px',
                                    }}
                                  >
                                    {L(m?.stc).map((x: any, $index: number) => (
                                      <Fragment key={$index}>
                                        <div
                                          style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '3px',
                                            padding: '7px 0',
                                            borderRadius: '6px',
                                            background: 'var(--panel, oklch(0.245 0.05 165))',
                                          }}
                                        >
                                          <span
                                            style={{
                                              font: "500 9.5px/1 'IBM Plex Mono',monospace",
                                              color: 'var(--mu, oklch(0.78 0.035 120))',
                                            }}
                                          >
                                            {T(x?.s)}
                                          </span>
                                          <span
                                            style={
                                              {
                                                font: "600 12px/1 'IBM Plex Mono',monospace",
                                                color: str(x?.col),
                                              } as CSSProperties
                                            }
                                          >
                                            {T(x?.v)}
                                          </span>
                                        </div>
                                      </Fragment>
                                    ))}
                                  </div>
                                </div>
                              </>
                            ) : null}
                            {L(m?.chipGroups).map((g: any, $index: number) => (
                              <Fragment key={$index}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>
                                    {T(g?.lbl)}
                                  </span>
                                  {L(g?.items).map((x: any, $index: number) => (
                                    <Fragment key={$index}>
                                      <div
                                        data-tip="1"
                                        onMouseEnter={x?.enter}
                                        onMouseLeave={x?.leave}
                                        onClick={x?.enter}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          gap: '8px',
                                          padding: '8px 10px',
                                          borderRadius: '10px',
                                          border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                                          cursor: 'help',
                                        }}
                                        className="hv-5"
                                      >
                                        <span
                                          style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '0' }}
                                        >
                                          <span
                                            style={
                                              {
                                                flex: 'none',
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '6px',
                                                background: str(x?.bgi),
                                              } as CSSProperties
                                            }
                                          ></span>
                                          <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(x?.v)}</span>
                                        </span>
                                        <span
                                          style={{
                                            font: "500 10px/1 'IBM Plex Mono',monospace",
                                            letterSpacing: '.12em',
                                            textTransform: 'uppercase',
                                            color: 'var(--mu, oklch(0.78 0.035 120))',
                                          }}
                                        >
                                          {T(x?.tag)}
                                        </span>
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              </Fragment>
                            ))}
                            {m?.loc ? (
                              <>
                                <span
                                  style={{
                                    fontSize: '12px',
                                    color: 'var(--mu, oklch(0.78 0.035 120))',
                                    textWrap: 'pretty',
                                  }}
                                >
                                  {'Found: '}
                                  {T(m?.loc)}
                                </span>
                              </>
                            ) : null}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  )
}
