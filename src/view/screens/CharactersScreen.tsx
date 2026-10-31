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
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: str(v.handEnd),
                marginLeft: str(v.handML),
                marginRight: str(v.handMR),
                maxWidth: '100%',
              } as CSSProperties
            }
          >
            <span style={{ position: 'relative', display: 'flex', width: '230px', maxWidth: '100%' }}>
              <input
                value={v.q ?? ''}
                onChange={v.onQ}
                placeholder="Search name or faction"
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
              {L(v.recChips).map((t: any, $index: number) => (
                <Fragment key={$index}>
                  <button
                    onClick={t?.click}
                    style={
                      {
                        minHeight: '36px',
                        padding: '0 12px',
                        border: '0',
                        borderRadius: '6px',
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
              style={
                {
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: str(v.handEnd),
                  alignItems: 'center',
                  gap: '6px',
                } as CSSProperties
              }
            >
              <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>Sort</span>
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
                {L(v.sortChips).map((t: any, $index: number) => (
                  <Fragment key={$index}>
                    <button
                      onClick={t?.click}
                      style={
                        {
                          minHeight: '36px',
                          padding: '0 12px',
                          border: '0',
                          borderRadius: '6px',
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
            {v.rvOn ? (
              <>
                <div
                  style={
                    {
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: str(v.handEnd),
                      alignItems: 'center',
                      gap: '6px',
                    } as CSSProperties
                  }
                >
                  <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>View</span>
                  <div
                    style={{
                      display: 'flex',
                      gap: '2px',
                      padding: '3px',
                      borderRadius: '8px',
                      background: 'var(--bg, oklch(0.16 0.01 60))',
                      border: '1px solid var(--line, oklch(0.29 0.012 60))',
                    }}
                  >
                    {L(v.rvOpts).map((o: any, $index: number) => (
                      <Fragment key={$index}>
                        <button
                          onClick={o?.click}
                          aria-pressed={o?.on}
                          style={
                            {
                              minHeight: '36px',
                              padding: '0 12px',
                              border: '0',
                              borderRadius: '6px',
                              background: str(o?.bg),
                              color: str(o?.fg),
                              cursor: 'pointer',
                              fontSize: '12px',
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
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: str(v.rCols), gap: str(v.rGap) } as CSSProperties}>
          {L(v.roster).map((c: any, $index: number) => (
            <Fragment key={$index}>
              {c?.unl ? (
                <>
                  {v.rListOn ? (
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
                              position: 'relative',
                              overflow: 'hidden',
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
                            <img
                              src={c?.img}
                              alt=""
                              loading="lazy"
                              onError={v.imgErr}
                              style={{
                                position: 'absolute',
                                inset: '0',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: '50% 12%',
                                background: 'var(--panel2, oklch(0.25 0.012 60))',
                              }}
                            />
                          </div>
                          <div
                            style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0', flex: '1' }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '8px',
                                paddingRight: '22px',
                              }}
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
                  {v.rGridOn ? (
                    <>
                      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <button
                          onClick={c?.open}
                          style={
                            {
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px',
                              padding: '6px 6px 8px',
                              borderRadius: 'var(--r, 14px)',
                              border: `1px solid ${str(c?.cardBd)}`,
                              background: 'var(--panel, oklch(0.2 0.01 60))',
                              cursor: 'pointer',
                              textAlign: 'left',
                              flex: '1',
                              minWidth: '0',
                            } as CSSProperties
                          }
                          className="hv-5"
                        >
                          <div
                            style={{
                              position: 'relative',
                              overflow: 'hidden',
                              width: '100%',
                              aspectRatio: '1/1',
                              borderRadius: '10px',
                              display: 'grid',
                              placeItems: 'center',
                              background:
                                'repeating-linear-gradient(135deg,var(--panel2, oklch(0.25 0.012 60)) 0 6px,var(--panel, oklch(0.2 0.01 60)) 6px 12px)',
                              font: "600 20px/1 'Cinzel',serif",
                              color: 'var(--ac, oklch(0.8 0.11 75))',
                            }}
                          >
                            {T(c?.init)}
                            <img
                              src={c?.img}
                              alt=""
                              loading="lazy"
                              onError={v.imgErr}
                              style={{
                                position: 'absolute',
                                inset: '0',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: '50% 12%',
                                background: 'var(--panel2, oklch(0.25 0.012 60))',
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontWeight: '600',
                              fontSize: '13px',
                              padding: '0 2px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '100%',
                            }}
                          >
                            {T(c?.n)}
                          </span>
                          <span
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              gap: '3px',
                              padding: '0 2px',
                              minHeight: '28px',
                              maxWidth: 'calc(100% - 30px)',
                            }}
                          >
                            {L(c?.rsTxt).map((x: any, $index: number) => (
                              <Fragment key={$index}>
                                <span
                                  style={{
                                    font: "500 10px/1 'IBM Plex Mono',monospace",
                                    color: 'var(--ac, oklch(0.8 0.11 75))',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {T(x)}
                                </span>
                              </Fragment>
                            ))}
                          </span>
                        </button>
                        <button
                          onClick={c?.toggleStar}
                          title={c?.starTip}
                          style={
                            {
                              position: 'absolute',
                              right: '0',
                              top: '0',
                              width: str(v.tk30),
                              height: str(v.tk30),
                              border: '0',
                              background: 'transparent',
                              cursor: 'pointer',
                              fontSize: '16px',
                              lineHeight: '1',
                              color: str(c?.starCol),
                              textShadow: '0 1px 3px rgba(0,0,0,.8)',
                              padding: '0',
                            } as CSSProperties
                          }
                        >
                          {T(c?.star)}
                        </button>
                        <button
                          onClick={c?.recToggle}
                          aria-label={c?.recTip}
                          aria-disabled={c?.recFixed}
                          style={
                            {
                              position: 'absolute',
                              right: '4px',
                              bottom: '8px',
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
                </>
              ) : null}
              {c?.gone ? (
                <>
                  {v.rListOn ? (
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
                            style={{
                              font: "500 10px/1 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            }}
                          >
                            Away in Part I · returns in Part II
                          </span>
                        </div>
                      </button>
                    </>
                  ) : null}
                  {v.rGridOn ? (
                    <>
                      <button
                        onClick={c?.open}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          padding: '6px 6px 8px',
                          borderRadius: 'var(--r, 14px)',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          background: 'transparent',
                          cursor: 'pointer',
                          textAlign: 'left',
                          opacity: '.55',
                          minWidth: '0',
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            aspectRatio: '1/1',
                            borderRadius: '10px',
                            display: 'grid',
                            placeItems: 'center',
                            background: 'var(--panel2, oklch(0.25 0.012 60))',
                            font: "600 20px/1 'Cinzel',serif",
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                        >
                          {T(c?.init)}
                        </div>
                        <span
                          style={{
                            fontWeight: '600',
                            fontSize: '13px',
                            padding: '0 2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%',
                          }}
                        >
                          {T(c?.n)}
                        </span>
                        <span
                          style={{
                            font: "500 10px/1 'IBM Plex Mono',monospace",
                            padding: '0 2px',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                        >
                          Away
                        </span>
                      </button>
                    </>
                  ) : null}
                </>
              ) : null}
              {c?.locked ? (
                <>
                  {v.rListOn ? (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'center',
                          padding: '12px',
                          borderRadius: 'var(--r, 14px)',
                          border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                          background:
                            'repeating-linear-gradient(135deg,transparent 0 8px,rgba(255,255,255,.02) 8px 16px)',
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
                            style={
                              { font: "500 10px/1 'IBM Plex Mono',monospace", color: str(c?.pcol) } as CSSProperties
                            }
                          >
                            {'Sealed · '}
                            {T(c?.partLbl)}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : null}
                  {v.rGridOn ? (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          padding: '6px 6px 8px',
                          borderRadius: 'var(--r, 14px)',
                          border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                          minWidth: '0',
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            aspectRatio: '1/1',
                            borderRadius: '10px',
                            background: 'var(--panel2, oklch(0.25 0.012 60))',
                            filter: 'blur(3px)',
                          }}
                        ></div>
                        <span
                          style={{
                            fontWeight: '600',
                            fontSize: '13px',
                            padding: '0 2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            filter: 'blur(5px)',
                            userSelect: 'none',
                          }}
                        >
                          {T(c?.n)}
                        </span>
                        <span
                          style={
                            {
                              font: "500 10px/1 'IBM Plex Mono',monospace",
                              padding: '0 2px',
                              color: str(c?.pcol),
                            } as CSSProperties
                          }
                        >
                          {'Sealed · '}
                          {T(c?.partLbl)}
                        </span>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </Fragment>
          ))}
        </div>
      </section>
    </>
  )
}
