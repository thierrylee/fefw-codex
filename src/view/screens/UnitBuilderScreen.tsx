import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function UnitBuilderScreen({ v }: { v: VM }) {
  return (
    <>
      <section
        data-screen-label="Unit builder"
        style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: str(v.calcTop) } as CSSProperties}
      >
        <div style={{ display: str(v.calcHeadDisp), flexDirection: 'column', gap: '4px' } as CSSProperties}>
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
              Unit builder
            </h1>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={v.goInv}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                  background: 'transparent',
                  color: 'var(--tx, #eee)',
                  cursor: 'pointer',
                  font: "600 12px/1 'IBM Plex Sans',sans-serif",
                  whiteSpace: 'nowrap',
                }}
                className="hv-6"
              >
                <span style={{ color: 'var(--ac, oklch(0.8 0.11 75))' }}>↓</span>Inventory
              </button>
              <button
                onClick={v.goSaved}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                  background: 'transparent',
                  color: 'var(--tx, #eee)',
                  cursor: 'pointer',
                  font: "600 12px/1 'IBM Plex Sans',sans-serif",
                  whiteSpace: 'nowrap',
                }}
                className="hv-6"
              >
                <span style={{ color: 'var(--ac, oklch(0.8 0.11 75))' }}>↓</span>Saved builds
              </button>
            </div>
          </div>
          <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))', maxWidth: '62ch', textWrap: 'pretty' }}>
            Units start at Lv 1 in their initial class. Each level adds character + class + mount growth to a running
            total; every full 100% grants +1 to that stat.
          </span>
        </div>
        <div
          style={
            {
              display: 'grid',
              gridTemplateColumns: str(v.calcCols),
              gridTemplateRows: str(v.cdd?.rows),
              gap: '16px',
              alignItems: 'start',
            } as CSSProperties
          }
        >
          <div style={{ display: 'contents' }}>
            <div
              style={
                {
                  gridColumn: str(v.cdd?.cc),
                  gridRow: str(v.cdd?.cr),
                  order: str(v.cdd?.co),
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
                  alignItems: 'start',
                  gap: '16px 24px',
                  padding: '20px',
                  borderRadius: 'var(--r, 14px)',
                  background: 'var(--panel, oklch(0.2 0.01 60))',
                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                } as CSSProperties
              }
            >
              <div
                style={{
                  gridColumn: '1/-1',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px 12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px 14px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      font: "500 10px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    Unit setup
                  </span>
                  <button
                    onClick={v.toProfile}
                    style={
                      {
                        display: str(v.calcCharDisp),
                        alignItems: 'center',
                        padding: '7px 12px',
                        borderRadius: '999px',
                        border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                        background: 'transparent',
                        color: 'var(--tx, #eee)',
                        cursor: 'pointer',
                        font: "600 12px/1 'IBM Plex Sans',sans-serif",
                        whiteSpace: 'nowrap',
                      } as CSSProperties
                    }
                    className="hv-6"
                  >
                    {T(v.toProfileLbl)}
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flex: 'none' }}>
                  <button
                    onClick={v.cmpHere}
                    title="Save this build and compare it with others"
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '9px 16px',
                      borderRadius: '999px',
                      border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                      background: 'var(--ac, oklch(0.8 0.11 75))',
                      color: 'oklch(0.18 0.01 60)',
                      font: "600 13px/1 'IBM Plex Sans',sans-serif",
                      cursor: 'pointer',
                    }}
                    className="hv-7"
                  >
                    Compare
                  </button>
                  <button
                    onClick={v.resetCalc}
                    title="Reset build to defaults"
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '7px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--line, oklch(0.29 0.012 60))',
                      background: 'transparent',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                      font: "600 12px/1 'IBM Plex Sans',sans-serif",
                      cursor: 'pointer',
                    }}
                    className="hv-8"
                  >
                    Reset build
                  </button>
                </div>
              </div>
              <div style={{ display: str(v.calcCharDisp), flexDirection: 'column', gap: '6px' } as CSSProperties}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                  }}
                >
                  Character
                </span>
                <span style={{ position: 'relative', display: 'flex' }}>
                  <input
                    list="calc-chars"
                    value={v.calcQVal ?? ''}
                    onChange={v.onCalcSearch}
                    onFocus={v.onCalcFocus}
                    onBlur={v.onCalcBlur}
                    placeholder="Search character…"
                    autoComplete="off"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '8px 36px 8px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--line)',
                      background: 'var(--panel)',
                      outline: 'none',
                    }}
                    className="focus-9"
                  />
                  <button
                    onMouseDown={v.onCalcClear}
                    title="Clear"
                    aria-label="Clear"
                    style={
                      {
                        display: str(v.calcClrDisp),
                        position: 'absolute',
                        right: '6px',
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
                <datalist id="calc-chars">
                  {L(v.calcCharOpts).map((o: any, $index: number) => (
                    <Fragment key={$index}>
                      <option value={o ?? ''}></option>
                    </Fragment>
                  ))}
                </datalist>
              </div>
              {v.rlShow ? (
                <>
                  <div
                    title={v.rlTip}
                    style={
                      {
                        opacity: str(v.rlOp),
                        pointerEvents: str(v.rlPe),
                        gridColumn: '1/-1',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
                        gap: '12px 24px',
                        alignItems: 'start',
                      } as CSSProperties
                    }
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '12px',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                        }}
                      >
                        Recruited at
                        <span
                          style={{
                            marginLeft: 'auto',
                            font: "600 13px/1 'IBM Plex Mono',monospace",
                            color: 'var(--tx, oklch(0.94 0.008 80))',
                          }}
                        >
                          {'Lv '}
                          {T(v.rlVal)}
                        </span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                        <button
                          disabled={v.rlLocked}
                          onClick={v.rlDec}
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
                          disabled={v.rlLocked}
                          type="range"
                          min="1"
                          max={v.rlMax}
                          value={v.rlVal ?? ''}
                          onChange={v.onRl}
                          style={{ flex: '1', minWidth: '0', margin: '0' }}
                        />
                        <button
                          disabled={v.rlLocked}
                          onClick={v.rlInc}
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
                      </span>
                      <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {L(v.rlKeys).map((k: any, $index: number) => (
                          <Fragment key={$index}>
                            <button
                              disabled={v.rlLocked}
                              onClick={k?.go}
                              style={
                                {
                                  padding: '6px 12px',
                                  borderRadius: '999px',
                                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                                  background: str(k?.bg),
                                  color: str(k?.fg),
                                  font: "600 12px/1 'IBM Plex Mono',monospace",
                                  cursor: 'pointer',
                                } as CSSProperties
                              }
                            >
                              {'Lv '}
                              {T(k?.lv)}
                            </button>
                          </Fragment>
                        ))}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                        Earlier levels use character growths only.
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '12px',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                        }}
                      >
                        Recruited class
                      </span>
                      <button
                        disabled={v.rlLocked}
                        onClick={v.openRecCd}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          width: '100%',
                          maxWidth: '100%',
                          minWidth: '0',
                          boxSizing: 'border-box',
                          padding: '8px 12px',
                          borderRadius: '999px',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          background: 'var(--panel)',
                          color: 'var(--tx, oklch(0.94 0.008 80))',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                        className="hv-5"
                      >
                        <span
                          style={{
                            flex: '1',
                            minWidth: '0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {T(v.rkVal)}
                        </span>
                        <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))', fontSize: '10px' }}>▾</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            <div
              style={
                {
                  gridColumn: str(v.cdd?.pc),
                  gridRow: str(v.cdd?.pr),
                  order: str(v.cdd?.po),
                  minWidth: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  padding: '20px',
                  borderRadius: 'var(--r, 14px)',
                  background: 'var(--panel, oklch(0.2 0.01 60))',
                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                } as CSSProperties
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    font: "500 10px/1 'IBM Plex Mono',monospace",
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: 'var(--mu, oklch(0.7 0.01 70))',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>Class path</span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      font: "600 13px/1 'IBM Plex Mono',monospace",
                      letterSpacing: '0',
                      textTransform: 'none',
                      color: 'var(--tx, oklch(0.94 0.008 80))',
                    }}
                  >
                    {'Lv '}
                    {T(v.calcLv)}
                  </span>
                </span>
                {L(v.stageLocked).map((s: any, $index: number) => (
                  <Fragment key={$index}>
                    <div
                      style={
                        {
                          display: 'grid',
                          gridTemplateColumns: '22px 1fr',
                          gap: '10px',
                          alignItems: 'center',
                          padding: '9px 12px',
                          borderRadius: '10px',
                          border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                          borderLeft: `4px solid ${str(s?.tc)}`,
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                        } as CSSProperties
                      }
                    >
                      <span style={{ font: "600 11px/1 'IBM Plex Mono',monospace" }}>{T(s?.idx)}</span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                        {s?.first ? (
                          <>
                            <span style={{ fontWeight: '600', color: 'var(--tx, oklch(0.94 0.008 80))' }}>
                              {T(s?.k)}
                            </span>
                          </>
                        ) : null}
                        {s?.editable ? (
                          <>
                            <button
                              onClick={s?.openCd}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                maxWidth: '100%',
                                minWidth: '0',
                                boxSizing: 'border-box',
                                padding: '8px 12px',
                                borderRadius: '999px',
                                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                                background: 'var(--panel)',
                                color: 'var(--tx, oklch(0.94 0.008 80))',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textAlign: 'left',
                              }}
                              className="hv-5"
                            >
                              <span
                                style={{
                                  flex: '1',
                                  minWidth: '0',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {T(s?.k)}
                              </span>
                              <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))', fontSize: '10px' }}>▾</span>
                            </button>
                          </>
                        ) : null}
                        {s?.mOn ? (
                          <>
                            <select
                              value={s?.mVal ?? ''}
                              onChange={s?.onM}
                              aria-label="Mount"
                              style={{
                                padding: '8px 12px',
                                borderRadius: '999px',
                                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                                background: 'var(--panel)',
                                width: '100%',
                                maxWidth: '100%',
                                minWidth: '0',
                                boxSizing: 'border-box',
                              }}
                            >
                              {L(s?.mOpts).map((o: any, $index: number) => (
                                <Fragment key={$index}>
                                  <option value={o ?? ''}>{T(o)}</option>
                                </Fragment>
                              ))}
                            </select>
                          </>
                        ) : null}
                        <span
                          style={{
                            font: "500 10px/1 'IBM Plex Mono',monospace",
                            letterSpacing: '.12em',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span
                            style={
                              {
                                padding: '3px 7px',
                                borderRadius: '999px',
                                background: str(s?.tc),
                                color: 'oklch(0.18 0.01 60)',
                                letterSpacing: '.06em',
                              } as CSSProperties
                            }
                          >
                            {T(s?.tier)}
                          </span>
                          {T(s?.range)}
                          {' ('}
                          {T(s?.gain)})
                        </span>
                      </span>
                    </div>
                  </Fragment>
                ))}
                <div
                  style={
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                      borderLeft: `4px solid ${str(v.curTc)}`,
                      background: 'var(--panel2, oklch(0.25 0.012 60))',
                    } as CSSProperties
                  }
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: '10px', alignItems: 'center' }}>
                    <span
                      style={{ font: "600 11px/1 'IBM Plex Mono',monospace", color: 'var(--ac, oklch(0.8 0.11 75))' }}
                    >
                      {T(v.curIdx)}
                    </span>
                    {v.curFirst ? (
                      <>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}
                        >
                          <span style={{ fontWeight: '600' }}>{T(v.curK)}</span>
                          <span
                            style={{
                              font: "500 10px/1 'IBM Plex Mono',monospace",
                              letterSpacing: '.12em',
                              textTransform: 'uppercase',
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            }}
                          >
                            Initial
                          </span>
                        </div>
                      </>
                    ) : null}
                    {v.curNotFirst ? (
                      <>
                        <button
                          onClick={v.openCurCd}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            width: '100%',
                            maxWidth: '100%',
                            minWidth: '0',
                            boxSizing: 'border-box',
                            padding: '8px 12px',
                            borderRadius: '999px',
                            border: '1px solid var(--line, oklch(0.29 0.012 60))',
                            background: 'var(--panel)',
                            color: 'var(--tx, oklch(0.94 0.008 80))',
                            fontWeight: '600',
                            cursor: 'pointer',
                            textAlign: 'left',
                          }}
                          className="hv-5"
                        >
                          <span
                            style={{
                              flex: '1',
                              minWidth: '0',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {T(v.curK)}
                          </span>
                          <span style={{ color: 'var(--mu, oklch(0.7 0.01 70))', fontSize: '10px' }}>▾</span>
                        </button>
                      </>
                    ) : null}
                  </div>
                  {v.mountOk ? (
                    <>
                      <label
                        style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: '10px', alignItems: 'center' }}
                      >
                        <span
                          style={{
                            font: "500 10px/1 'IBM Plex Mono',monospace",
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                        >
                          Mnt
                        </span>
                        <select
                          value={v.calcM ?? ''}
                          onChange={v.onCalcM}
                          style={{
                            width: '100%',
                            maxWidth: '100%',
                            minWidth: '0',
                            boxSizing: 'border-box',
                            padding: '8px 12px',
                            borderRadius: '999px',
                            border: '1px solid var(--line, oklch(0.29 0.012 60))',
                            background: 'var(--panel)',
                            fontWeight: '600',
                          }}
                        >
                          {L(v.mountOpts).map((o: any, $index: number) => (
                            <Fragment key={$index}>
                              <option value={o ?? ''}>{T(o)}</option>
                            </Fragment>
                          ))}
                        </select>
                      </label>
                    </>
                  ) : null}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      font: "500 11px/1 'IBM Plex Mono',monospace",
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={
                          {
                            padding: '3px 7px',
                            borderRadius: '999px',
                            background: str(v.curTc),
                            color: 'oklch(0.18 0.01 60)',
                            letterSpacing: '.06em',
                            textTransform: 'uppercase',
                            fontSize: '10px',
                          } as CSSProperties
                        }
                      >
                        {T(v.curTier)}
                      </span>
                      {'From Lv '}
                      {T(v.curFrom)}
                      {' → Lv '}
                      {T(v.calcLv)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={v.curDec}
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
                      min={v.curFrom}
                      max="99"
                      value={v.calcLv ?? ''}
                      onChange={v.onCurLv}
                      style={{ flex: '1 1 0', minWidth: '0' }}
                    />
                    <button
                      onClick={v.curInc}
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
                    <span
                      style={{
                        font: "500 11px/1 'IBM Plex Mono',monospace",
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {T(v.curGain)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {L(v.tierJumps).map((j: any, $index: number) => (
                      <Fragment key={$index}>
                        <button
                          onClick={j?.click}
                          title={j?.tip}
                          style={
                            {
                              padding: '7px 12px',
                              borderRadius: '999px',
                              border: `1px solid ${str(j?.bd)}`,
                              background: str(j?.bg),
                              color: 'var(--tx, oklch(0.94 0.008 80))',
                              font: "500 11px/1 'IBM Plex Mono',monospace",
                              cursor: 'pointer',
                              opacity: str(j?.op),
                            } as CSSProperties
                          }
                        >
                          {T(j?.label)}
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'nowrap' }}>
                  {v.canAdd ? (
                    <>
                      <button
                        onClick={v.addStage}
                        style={{
                          flex: '1 1 auto',
                          minWidth: '0',
                          whiteSpace: 'nowrap',
                          padding: '7px 12px',
                          borderRadius: '999px',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        Lock & change class
                      </button>
                    </>
                  ) : null}
                  {v.canUndo ? (
                    <>
                      <button
                        onClick={v.undoStage}
                        style={{
                          flex: '0 1 auto',
                          minWidth: '0',
                          whiteSpace: 'nowrap',
                          padding: '7px 12px',
                          borderRadius: '999px',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          background: 'var(--panel, oklch(0.2 0.01 60))',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: 'var(--tx, oklch(0.94 0.008 80))',
                        }}
                        className="hv-5"
                      >
                        Undo class
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            {v.mntAbHas ? (
              <>
                <div
                  style={
                    {
                      gridColumn: str(v.cdd?.mc),
                      gridRow: str(v.cdd?.mr),
                      order: str(v.cdd?.mo),
                      minWidth: '0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      padding: '20px',
                      borderRadius: 'var(--r, 14px)',
                      background: 'var(--panel, oklch(0.2 0.01 60))',
                      border: '1px solid var(--line, oklch(0.29 0.012 60))',
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
                    Paired abilities
                  </span>
                  {v.mntAbHas ? (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                          {T(v.mntName)}
                          {' · Paired abilities'}
                        </span>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                          <div
                            role="radio"
                            aria-checked={v.mntNoOn}
                            onClick={v.mntNoPick}
                            style={
                              {
                                flex: 'none',
                                width: '96px',
                                boxSizing: 'border-box',
                                alignSelf: 'stretch',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                border: `1px solid ${str(v.mntNoBd)}`,
                                background: str(v.mntNoBg),
                                cursor: 'pointer',
                              } as CSSProperties
                            }
                            className="hv-10"
                          >
                            <span style={{ fontWeight: '600', fontSize: '12px' }}>No skill</span>
                          </div>
                          <div style={{ flex: '1', minWidth: '0', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {L(v.mntGroups).map((g: any, $index: number) => (
                              <Fragment key={$index}>
                                <div
                                  style={{
                                    flex: '1 1 180px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px',
                                    minWidth: '0',
                                  }}
                                >
                                  {L(g?.items).map((a: any, $index: number) => (
                                    <Fragment key={$index}>
                                      <div
                                        role="radio"
                                        aria-checked={a?.on}
                                        data-tip="1"
                                        onMouseEnter={a?.enter}
                                        onMouseLeave={a?.leave}
                                        onClick={a?.pick}
                                        style={
                                          {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '6px',
                                            padding: '6px 8px',
                                            minWidth: '0',
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            border: `1px solid ${str(a?.bd)}`,
                                            background: str(a?.bg),
                                            cursor: 'pointer',
                                          } as CSSProperties
                                        }
                                        className="hv-10"
                                      >
                                        <span
                                          style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px',
                                            minWidth: '0',
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontWeight: '600',
                                              fontSize: '12px',
                                              lineHeight: '1.2',
                                              overflowWrap: 'anywhere',
                                            }}
                                          >
                                            {T(a?.n)}
                                          </span>
                                          <span
                                            style={{
                                              font: "500 10px/1 'IBM Plex Mono',monospace",
                                              letterSpacing: '.12em',
                                              textTransform: 'uppercase',
                                              color: 'oklch(0.74 0.1 300)',
                                            }}
                                          >
                                            {T(a?.tag)}
                                          </span>
                                        </span>
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
            <div
              data-jump="b-inv"
              style={
                {
                  gridColumn: str(v.cdd?.ac),
                  gridRow: str(v.cdd?.ar),
                  order: str(v.cdd?.ao),
                  minWidth: '0',
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
              <span
                style={{
                  font: "500 10px/1 'IBM Plex Mono',monospace",
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                }}
              >
                Inventory
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
                  gap: '16px',
                  alignItems: 'start',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {L(v.clsGroups).map((g: any, $index: number) => (
                    <Fragment key={$index}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '12px', color: str(g?.lc) } as CSSProperties}>{T(g?.lbl)}</span>
                        {L(g?.items).map((a: any, $index: number) => (
                          <Fragment key={$index}>
                            <div
                              data-tip="1"
                              onMouseEnter={a?.enter}
                              onMouseLeave={a?.leave}
                              onClick={a?.enter}
                              style={
                                {
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: '4px 8px',
                                  padding: '8px 10px',
                                  borderRadius: '10px',
                                  border: `1px ${str(g?.bs)} ${str(g?.bd)}`,
                                  background: str(g?.bg),
                                  cursor: 'help',
                                } as CSSProperties
                              }
                              className="hv-11"
                            >
                              <span
                                style={{ fontWeight: str(g?.nw), fontSize: '13px', color: str(g?.nc) } as CSSProperties}
                              >
                                {T(a?.n)}
                              </span>
                              <span
                                style={{
                                  font: "500 10px/1 'IBM Plex Mono',monospace",
                                  letterSpacing: '.12em',
                                  textTransform: 'uppercase',
                                  color: 'var(--mu, oklch(0.7 0.01 70))',
                                }}
                              >
                                {T(a?.t)}
                              </span>
                              <span
                                style={{
                                  flexBasis: '100%',
                                  fontSize: '12px',
                                  lineHeight: '1.4',
                                  textWrap: 'pretty',
                                  color: 'var(--mu, oklch(0.7 0.01 70))',
                                }}
                              >
                                {T(a?.e)}
                              </span>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </Fragment>
                  ))}
                  {v.clsNone ? (
                    <>
                      <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                        No class abilities.
                      </span>
                    </>
                  ) : null}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    Abilities
                    <span style={{ font: "500 10px/1 'IBM Plex Mono',monospace", letterSpacing: '.12em' }}>
                      {T(v.abCount)}
                    </span>
                    {v.abHas ? (
                      <>
                        <button
                          onClick={v.abClear}
                          style={{
                            marginLeft: 'auto',
                            border: '0',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                          className="hv-8"
                        >
                          Clear
                        </button>
                      </>
                    ) : null}
                  </span>
                  {L(v.abSel).map((a: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        data-tip="1"
                        draggable={a?.drg}
                        onDragStart={a?.dStart}
                        onDragOver={a?.dOver}
                        onDrop={a?.dDrop}
                        onDragEnd={a?.dEnd}
                        title="Drag to reorder"
                        onMouseEnter={a?.enter}
                        onMouseLeave={a?.leave}
                        onClick={a?.open}
                        style={
                          {
                            opacity: str(a?.dim),
                            boxShadow: str(a?.sh),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderRadius: '10px',
                            border: '1px solid var(--line, oklch(0.29 0.012 60))',
                            background: 'var(--panel2, oklch(0.25 0.012 60))',
                            cursor: 'pointer',
                          } as CSSProperties
                        }
                        className="hv-5"
                      >
                        <span
                          style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0', flex: '1' }}
                        >
                          <span
                            style={{
                              fontWeight: '600',
                              fontSize: '13px',
                              alignSelf: 'flex-start',
                              borderBottom: '1px dotted var(--ac, oklch(0.82 0.12 85))',
                            }}
                          >
                            {T(a?.n)}
                          </span>
                          <span
                            style={
                              {
                                display: str(a?.wd),
                                font: "500 11px/1.3 'IBM Plex Mono',monospace",
                                color: 'var(--ac, oklch(0.8 0.11 75))',
                              } as CSSProperties
                            }
                          >
                            {T(a?.wn)}
                          </span>
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '1.4',
                              textWrap: 'pretty',
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            }}
                          >
                            {T(a?.e)}
                          </span>
                        </span>
                        <button
                          onClick={a?.rm}
                          title="Remove"
                          aria-label={`Remove ${str(a?.n)}`}
                          style={
                            {
                              width: str(v.tk24),
                              height: str(v.tk24),
                              border: '0',
                              borderRadius: '50%',
                              background: 'transparent',
                              cursor: 'pointer',
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            } as CSSProperties
                          }
                          className="hv-8"
                        >
                          ×
                        </button>
                      </div>
                    </Fragment>
                  ))}
                  {v.abFull ? (
                    <>
                      <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                        Ability slots full — remove one to add another.
                      </span>
                    </>
                  ) : null}
                  {v.abCanAdd ? (
                    <>
                      <button
                        onClick={v.openAb}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                          background: 'transparent',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '600',
                        }}
                        className="hv-12"
                      >
                        + Add ability…
                      </button>
                    </>
                  ) : null}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    Combat arts
                    <span style={{ font: "500 10px/1 'IBM Plex Mono',monospace", letterSpacing: '.12em' }}>
                      {T(v.caCount)}
                    </span>
                    {v.caHas ? (
                      <>
                        <button
                          onClick={v.caClear}
                          style={{
                            marginLeft: 'auto',
                            border: '0',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                          className="hv-8"
                        >
                          Clear
                        </button>
                      </>
                    ) : null}
                  </span>
                  {L(v.caSel).map((a: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        data-tip="1"
                        draggable={a?.drg}
                        onDragStart={a?.dStart}
                        onDragOver={a?.dOver}
                        onDrop={a?.dDrop}
                        onDragEnd={a?.dEnd}
                        title="Drag to reorder"
                        onMouseEnter={a?.enter}
                        onMouseLeave={a?.leave}
                        onClick={a?.open}
                        style={
                          {
                            opacity: str(a?.dim),
                            boxShadow: str(a?.sh),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderRadius: '10px',
                            border: '1px solid var(--line, oklch(0.29 0.012 60))',
                            background: 'var(--panel2, oklch(0.25 0.012 60))',
                            cursor: 'pointer',
                          } as CSSProperties
                        }
                        className="hv-5"
                      >
                        <span
                          style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0', flex: '1' }}
                        >
                          <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <span
                              style={{
                                fontWeight: '600',
                                fontSize: '13px',
                                borderBottom: '1px dotted var(--ac, oklch(0.82 0.12 85))',
                              }}
                            >
                              {T(a?.n)}
                            </span>
                            <span
                              style={{
                                font: "500 10px/1 'IBM Plex Mono',monospace",
                                letterSpacing: '.12em',
                                textTransform: 'uppercase',
                                color: 'var(--mu, oklch(0.7 0.01 70))',
                              }}
                            >
                              {T(a?.c)}
                            </span>
                          </span>
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '1.4',
                              textWrap: 'pretty',
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            }}
                          >
                            {T(a?.e)}
                          </span>
                        </span>
                        <button
                          onClick={a?.rm}
                          title="Remove"
                          aria-label={`Remove ${str(a?.n)}`}
                          style={
                            {
                              width: str(v.tk24),
                              height: str(v.tk24),
                              border: '0',
                              borderRadius: '50%',
                              background: 'transparent',
                              cursor: 'pointer',
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            } as CSSProperties
                          }
                          className="hv-8"
                        >
                          ×
                        </button>
                      </div>
                    </Fragment>
                  ))}
                  {v.caFull ? (
                    <>
                      <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                        Combat art slots full — remove one to add another.
                      </span>
                    </>
                  ) : null}
                  {v.caCanAdd ? (
                    <>
                      <button
                        onClick={v.openCa}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                          background: 'transparent',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '600',
                        }}
                        className="hv-12"
                      >
                        + Add combat art…
                      </button>
                    </>
                  ) : null}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: 'var(--mu, oklch(0.7 0.01 70))',
                    }}
                  >
                    Items
                    <span style={{ font: "500 10px/1 'IBM Plex Mono',monospace", letterSpacing: '.12em' }}>
                      {T(v.itCount)}
                    </span>
                    {v.itHas ? (
                      <>
                        <button
                          onClick={v.itClear}
                          style={{
                            marginLeft: 'auto',
                            border: '0',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                          className="hv-8"
                        >
                          Clear
                        </button>
                      </>
                    ) : null}
                  </span>
                  {L(v.itSel).map((a: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        data-tip="1"
                        draggable={a?.drg}
                        onDragStart={a?.dStart}
                        onDragOver={a?.dOver}
                        onDrop={a?.dDrop}
                        onDragEnd={a?.dEnd}
                        title="Drag to reorder — first weapon is the equipped one"
                        onMouseEnter={a?.enter}
                        onMouseLeave={a?.leave}
                        onClick={a?.open}
                        style={
                          {
                            opacity: str(a?.dim),
                            boxShadow: str(a?.sh),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderRadius: '10px',
                            border: '1px solid var(--line, oklch(0.29 0.012 60))',
                            background: 'var(--panel2, oklch(0.25 0.012 60))',
                            cursor: 'pointer',
                          } as CSSProperties
                        }
                        className="hv-5"
                      >
                        <span
                          style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0', flex: '1' }}
                        >
                          <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                            <span
                              style={{ fontWeight: '600', fontSize: '13px', opacity: str(a?.eqDim) } as CSSProperties}
                            >
                              {T(a?.n)}
                            </span>
                            <span
                              style={{
                                font: "500 10px/1 'IBM Plex Mono',monospace",
                                letterSpacing: '.12em',
                                textTransform: 'uppercase',
                                color: 'var(--mu, oklch(0.7 0.01 70))',
                              }}
                            >
                              {T(a?.c)}
                            </span>
                          </span>
                          <span
                            style={
                              {
                                font: "600 10px/1 'IBM Plex Mono',monospace",
                                letterSpacing: '.12em',
                                textTransform: 'uppercase',
                                color: str(a?.eqCol),
                              } as CSSProperties
                            }
                          >
                            {T(a?.eq)}
                          </span>
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '1.4',
                              textWrap: 'pretty',
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            }}
                          >
                            {T(a?.e)}
                          </span>
                        </span>
                        <button
                          onClick={a?.rm}
                          title="Remove"
                          aria-label={`Remove ${str(a?.n)}`}
                          style={
                            {
                              width: str(v.tk24),
                              height: str(v.tk24),
                              border: '0',
                              borderRadius: '50%',
                              background: 'transparent',
                              cursor: 'pointer',
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            } as CSSProperties
                          }
                          className="hv-8"
                        >
                          ×
                        </button>
                      </div>
                    </Fragment>
                  ))}
                  {v.itFull ? (
                    <>
                      <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                        Item slots full — remove one to add another.
                      </span>
                    </>
                  ) : null}
                  {v.itCanAdd ? (
                    <>
                      <button
                        onClick={v.openIt}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px dashed var(--line, oklch(0.29 0.012 60))',
                          background: 'transparent',
                          color: 'var(--mu, oklch(0.7 0.01 70))',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '600',
                        }}
                        className="hv-12"
                      >
                        + Add item…
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div
            style={
              {
                gridColumn: str(v.cdd?.bc),
                gridRow: str(v.cdd?.br),
                order: str(v.cdd?.bo),
                minWidth: '0',
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
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>Build name</span>
              <input
                value={v.bnameVal ?? ''}
                onChange={v.onBname}
                placeholder={v.defName}
                maxLength={40}
                style={{
                  padding: '8px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--line)',
                  background: 'var(--panel)',
                  outline: 'none',
                  fontFamily: "'IBM Plex Mono',monospace",
                  fontSize: '12px',
                }}
              />
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={v.resetCalc}
                style={{
                  padding: '7px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  background: 'transparent',
                  color: 'var(--mu, oklch(0.7 0.01 70))',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
                className="hv-8"
              >
                Reset
              </button>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                {v.saveNewOn ? (
                  <>
                    <span
                      style={{ font: "500 11px/1 'IBM Plex Mono',monospace", color: 'var(--ac, oklch(0.8 0.11 75))' }}
                    >
                      ● Unsaved changes
                    </span>
                  </>
                ) : null}
                {v.saveNewOn ? (
                  <>
                    <button
                      onClick={v.saveNew}
                      style={{
                        padding: '7px 12px',
                        borderRadius: '999px',
                        border: '1px solid var(--line, oklch(0.29 0.012 60))',
                        background: 'transparent',
                        color: 'var(--tx, #eee)',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                      className="hv-6"
                    >
                      Save as new build
                    </button>
                  </>
                ) : null}
                <button
                  onClick={v.saveBuild}
                  style={
                    {
                      padding: '9px 16px',
                      borderRadius: '999px',
                      border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                      background: str(v.saveBg),
                      color: str(v.saveFg),
                      fontWeight: '600',
                      cursor: 'pointer',
                    } as CSSProperties
                  }
                >
                  {T(v.saveLabel)}
                </button>
              </div>
            </div>
          </div>
          <div
            style={
              {
                gridColumn: str(v.cdd?.sc),
                gridRow: str(v.cdd?.sr),
                order: str(v.cdd?.so),
                minWidth: '0',
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
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
                Per-stat breakdown
              </span>
              <span style={{ font: "600 12px/1 'IBM Plex Mono',monospace", color: 'var(--tx, oklch(0.94 0.008 80))' }}>
                {'Lv '}
                {T(v.calcLv)}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px 14px',
                font: "500 10px/1 'IBM Plex Mono',monospace",
                letterSpacing: '.04em',
                textTransform: 'uppercase',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '3px',
                    background: 'var(--ac, oklch(0.8 0.11 75))',
                  }}
                ></span>
                Character
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'oklch(0.74 0.1 185)' }}
                ></span>
                Class
              </span>
              {v.hasMst ? (
                <>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'oklch(0.74 0.1 300)' }}
                    ></span>
                    Mount
                  </span>
                </>
              ) : null}
              {v.hasAb ? (
                <>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'oklch(0.78 0.12 150)' }}
                    ></span>
                    Bonus
                  </span>
                </>
              ) : null}
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'oklch(0.74 0.12 30)' }}
                ></span>
                Negative
              </span>
            </div>
            {v.viewBars ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div
                    style={
                      {
                        display: str(v.narDisp),
                        justifyContent: 'flex-end',
                        gap: '12px',
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                        textTransform: 'uppercase',
                        letterSpacing: '.04em',
                      } as CSSProperties
                    }
                  >
                    <span style={{ width: '44px', textAlign: 'right' }}>Low</span>
                    <span style={{ width: '64px', textAlign: 'center', color: 'var(--tx, #eee)' }}>Average</span>
                    <span style={{ width: '44px', textAlign: 'left' }}>High</span>
                  </div>
                  <div
                    style={
                      {
                        display: str(v.hdrDisp),
                        flexWrap: 'wrap',
                        gap: '8px 10px',
                        font: "500 10px/1 'IBM Plex Mono',monospace",
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                        textTransform: 'uppercase',
                        letterSpacing: '.04em',
                      } as CSSProperties
                    }
                  >
                    <span style={{ width: '38px' }}></span>
                    <span style={{ flex: str(v.pBarFlex), display: str(v.pBarSpacer) } as CSSProperties}></span>
                    <div
                      style={
                        {
                          display: str(v.dskDisp),
                          gridTemplateColumns: str(v.statCols),
                          gap: '8px',
                          flex: str(v.pValFlex),
                          minWidth: '0',
                        } as CSSProperties
                      }
                    >
                      <span style={{ textAlign: 'right' }}>Growth</span>
                      <span></span>
                      {v.hasMst ? (
                        <>
                          <span style={{ textAlign: 'right', color: 'oklch(0.74 0.1 300)' }}>Mount</span>
                        </>
                      ) : null}
                      {v.hasCf ? (
                        <>
                          <span style={{ textAlign: 'right', color: 'oklch(0.74 0.1 185)' }}>Class</span>
                        </>
                      ) : null}
                      {v.hasAb ? (
                        <>
                          <span style={{ textAlign: 'right', color: 'oklch(0.78 0.12 150)' }}>Bonus</span>
                        </>
                      ) : null}
                      {v.hasMn ? (
                        <>
                          <span style={{ textAlign: 'right', color: 'var(--ac, oklch(0.8 0.11 75))' }}>Min</span>
                        </>
                      ) : null}
                      <div
                        style={
                          {
                            gridColumn: str(v.tripCol),
                            display: 'grid',
                            gridTemplateColumns: '44px 64px 44px',
                            gap: '4px',
                          } as CSSProperties
                        }
                      >
                        <span style={{ textAlign: 'right' }}>Low</span>
                        <span style={{ textAlign: 'center', color: 'var(--tx, #eee)' }}>Average</span>
                        <span style={{ textAlign: 'left' }}>High</span>
                      </div>
                    </div>
                  </div>
                  {L(v.calcRows).map((r: any, $index: number) => (
                    <Fragment key={$index}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 10px', alignItems: 'center' }}>
                        <span style={{ width: '38px', font: "600 14px/1 'IBM Plex Mono',monospace" }}>{T(r?.s)}</span>
                        <div
                          style={
                            {
                              order: '1',
                              flex: '1 1 0',
                              minWidth: '0',
                              display: str(v.narDisp),
                              justifyContent: 'flex-end',
                              alignItems: 'baseline',
                              gap: '12px',
                            } as CSSProperties
                          }
                        >
                          <span
                            style={{
                              width: '44px',
                              textAlign: 'right',
                              font: "500 13px/1 'IBM Plex Mono',monospace",
                              color: 'oklch(0.72 0.1 28)',
                              opacity: '.8',
                            }}
                          >
                            {T(r?.lo)}
                          </span>
                          <span
                            style={{
                              width: '64px',
                              textAlign: 'center',
                              font: "600 22px/1 'IBM Plex Mono',monospace",
                              color: 'var(--ac, oklch(0.8 0.11 75))',
                            }}
                          >
                            {T(r?.proj)}
                          </span>
                          <span
                            style={{
                              width: '44px',
                              textAlign: 'left',
                              font: "500 13px/1 'IBM Plex Mono',monospace",
                              color: 'oklch(0.76 0.1 150)',
                              opacity: '.8',
                            }}
                          >
                            {T(r?.hi)}
                          </span>
                        </div>
                        <div
                          style={
                            {
                              flex: str(v.pBarFlex),
                              order: str(v.pBarOrder),
                              minWidth: '0',
                              position: 'relative',
                              height: '18px',
                              borderRadius: '4px',
                              background: 'var(--panel2, oklch(0.25 0.012 60))',
                              overflow: 'hidden',
                              display: 'flex',
                            } as CSSProperties
                          }
                        >
                          <span
                            title={`Character ${str(r?.a)}`}
                            style={
                              {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flex: 'none',
                                minWidth: 'fit-content',
                                font: "600 10px/1 'IBM Plex Mono',monospace",
                                color: 'oklch(0.18 0.01 60)',
                                height: '100%',
                                width: str(r?.wa),
                                background: 'var(--ac, oklch(0.8 0.11 75))',
                                transition: 'width .3s',
                              } as CSSProperties
                            }
                          >
                            {T(r?.aL)}
                          </span>
                          <span
                            title={`Class ${str(r?.b)}`}
                            style={
                              {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flex: 'none',
                                minWidth: 'fit-content',
                                font: "600 10px/1 'IBM Plex Mono',monospace",
                                color: 'oklch(0.18 0.01 60)',
                                height: '100%',
                                width: str(r?.wb),
                                background: 'oklch(0.74 0.1 185)',
                                transition: 'width .3s',
                              } as CSSProperties
                            }
                          >
                            {T(r?.bL)}
                          </span>
                          <span
                            title={`Mount ${str(r?.m)}`}
                            style={
                              {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flex: 'none',
                                minWidth: 'fit-content',
                                font: "600 10px/1 'IBM Plex Mono',monospace",
                                color: 'oklch(0.18 0.01 60)',
                                height: '100%',
                                width: str(r?.wm),
                                background: 'oklch(0.74 0.1 300)',
                                transition: 'width .3s',
                              } as CSSProperties
                            }
                          >
                            {T(r?.mL)}
                          </span>
                          <span
                            title="Negative class/mount growth"
                            style={
                              {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flex: 'none',
                                minWidth: 'fit-content',
                                font: "600 10px/1 'IBM Plex Mono',monospace",
                                color: 'oklch(0.18 0.01 60)',
                                height: '100%',
                                width: str(r?.wn),
                                background:
                                  'repeating-linear-gradient(135deg,oklch(0.74 0.12 30) 0 4px,oklch(0.62 0.12 30) 4px 8px)',
                                transition: 'width .3s',
                              } as CSSProperties
                            }
                          >
                            {T(r?.nL)}
                          </span>
                          <span
                            style={
                              {
                                position: 'absolute',
                                left: str(r?.hundred),
                                top: '-2px',
                                bottom: '-2px',
                                width: '1px',
                                background: 'var(--mu, oklch(0.7 0.01 70))',
                                opacity: '.5',
                              } as CSSProperties
                            }
                          ></span>
                        </div>
                        <div
                          style={
                            {
                              display: str(v.dskDisp),
                              gridTemplateColumns: str(v.statCols),
                              gap: '8px',
                              flex: str(v.pValFlex),
                              minWidth: '0',
                              alignItems: 'center',
                            } as CSSProperties
                          }
                        >
                          <span style={{ font: "600 17px/1 'IBM Plex Mono',monospace", textAlign: 'right' }}>
                            {T(r?.t)}%
                          </span>
                          <span></span>
                          {v.hasMst ? (
                            <>
                              <span
                                style={{
                                  font: "500 17px/1 'IBM Plex Mono',monospace",
                                  textAlign: 'right',
                                  color: 'oklch(0.74 0.1 300)',
                                }}
                              >
                                {T(r?.mst)}
                              </span>
                            </>
                          ) : null}
                          {v.hasCf ? (
                            <>
                              <span
                                style={{
                                  font: "500 17px/1 'IBM Plex Mono',monospace",
                                  textAlign: 'right',
                                  color: 'oklch(0.74 0.1 185)',
                                }}
                              >
                                {T(r?.cf)}
                              </span>
                            </>
                          ) : null}
                          {v.hasAb ? (
                            <>
                              <span
                                style={{
                                  font: "500 17px/1 'IBM Plex Mono',monospace",
                                  textAlign: 'right',
                                  color: 'oklch(0.78 0.12 150)',
                                }}
                              >
                                {T(r?.abD)}
                              </span>
                            </>
                          ) : null}
                          {v.hasMn ? (
                            <>
                              <span
                                style={{
                                  font: "500 17px/1 'IBM Plex Mono',monospace",
                                  textAlign: 'right',
                                  color: 'var(--ac, oklch(0.8 0.11 75))',
                                }}
                              >
                                {T(r?.mn)}
                              </span>
                            </>
                          ) : null}
                          <div
                            style={
                              {
                                gridColumn: str(v.tripCol),
                                display: 'grid',
                                gridTemplateColumns: '44px 64px 44px',
                                gap: '4px',
                                alignItems: 'baseline',
                              } as CSSProperties
                            }
                          >
                            <span
                              style={{
                                font: "500 13px/1 'IBM Plex Mono',monospace",
                                textAlign: 'right',
                                color: 'oklch(0.72 0.1 28)',
                                opacity: '.8',
                              }}
                            >
                              {T(r?.lo)}
                            </span>
                            <span
                              style={{
                                font: "600 19px/1 'IBM Plex Mono',monospace",
                                textAlign: 'center',
                                color: 'var(--ac, oklch(0.8 0.11 75))',
                              }}
                            >
                              {T(r?.proj)}
                            </span>
                            <span
                              style={{
                                font: "500 13px/1 'IBM Plex Mono',monospace",
                                textAlign: 'left',
                                color: 'oklch(0.76 0.1 150)',
                                opacity: '.8',
                              }}
                            >
                              {T(r?.hi)}
                            </span>
                          </div>
                        </div>
                        <div
                          style={
                            {
                              order: '3',
                              flex: '1 1 100%',
                              display: str(v.narDisp),
                              flexWrap: 'wrap',
                              gap: '4px 12px',
                              font: "500 11px/1 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                            } as CSSProperties
                          }
                        >
                          {L(r?.chips).map((x: any, $index: number) => (
                            <Fragment key={$index}>
                              <span>
                                {T(x?.l)} <span style={{ color: str(x?.c) } as CSSProperties}>{T(x?.v)}</span>
                              </span>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    </Fragment>
                  ))}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '10px',
                      paddingTop: '10px',
                      borderTop: '1px solid var(--line, oklch(0.29 0.012 60))',
                    }}
                  >
                    <span style={{ width: '38px', font: "600 14px/1 'IBM Plex Mono',monospace" }}>Mov</span>
                    <span
                      style={{ font: "600 19px/1 'IBM Plex Mono',monospace", color: 'var(--ac, oklch(0.8 0.11 75))' }}
                    >
                      {T(v.calcMov)}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(v.calcMovNote)}</span>
                  </div>
                  {v.abNoteOn ? (
                    <>
                      <div style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))', textWrap: 'pretty' }}>
                        <span style={{ color: 'oklch(0.78 0.12 150)', fontWeight: '600' }}>
                          Ability bonuses (included above):
                        </span>{' '}
                        {T(v.abNote)}
                      </div>
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
            {v.ledgerCardsOn ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {L(v.ledgerCards).map((r: any, $index: number) => (
                    <Fragment key={$index}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          background: 'var(--panel2, oklch(0.25 0.012 60))',
                        }}
                      >
                        <span style={{ font: "600 12px/1 'IBM Plex Mono',monospace" }}>{T(r?.s)}</span>
                        <div
                          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '8px 6px' }}
                        >
                          {L(r?.cells).map((x: any, $index: number) => (
                            <Fragment key={$index}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                                <span
                                  style={{
                                    font: "500 10px/1 'IBM Plex Mono',monospace",
                                    letterSpacing: '.08em',
                                    textTransform: 'uppercase',
                                    color: 'var(--mu, oklch(0.7 0.01 70))',
                                  }}
                                >
                                  {T(x?.l)}
                                </span>
                                <span
                                  style={
                                    {
                                      font: `${str(x?.fw)} 12px/1 'IBM Plex Mono',monospace`,
                                      color: str(x?.c),
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
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            {v.viewLedger ? (
              <>
                <div style={{ overflowX: 'auto' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12,minmax(56px,1fr))',
                      minWidth: '720px',
                      font: "500 12px/1 'IBM Plex Mono',monospace",
                    }}
                  >
                    {L(v.ledgerHead).map((h: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '.08em',
                            textAlign: 'right',
                          }}
                        >
                          {T(h)}
                        </div>
                      </Fragment>
                    ))}
                    {L(v.calcRows).map((r: any, $index: number) => (
                      <Fragment key={$index}>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            fontWeight: '600',
                            textAlign: 'right',
                          }}
                        >
                          {T(r?.s)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'var(--ac, oklch(0.8 0.11 75))',
                          }}
                        >
                          {T(r?.a)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'oklch(0.74 0.1 185)',
                          }}
                        >
                          {T(r?.bs)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'oklch(0.74 0.1 300)',
                          }}
                        >
                          {T(r?.ms)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'oklch(0.78 0.12 150)',
                          }}
                        >
                          {T(r?.abD)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            fontWeight: '600',
                          }}
                        >
                          {T(r?.t)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'oklch(0.74 0.1 185)',
                          }}
                        >
                          {T(r?.cf)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'var(--ac, oklch(0.8 0.11 75))',
                          }}
                        >
                          {T(r?.mn)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                        >
                          {T(r?.baseV)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'oklch(0.74 0.12 30)',
                          }}
                        >
                          {T(r?.lo)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'var(--ac, oklch(0.8 0.11 75))',
                            fontWeight: '600',
                          }}
                        >
                          {T(r?.proj)}
                        </div>
                        <div
                          style={{
                            padding: '10px 8px',
                            borderBottom: '1px solid var(--line, oklch(0.29 0.012 60))',
                            textAlign: 'right',
                            color: 'oklch(0.78 0.12 150)',
                          }}
                        >
                          {T(r?.hi)}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
                gap: '14px',
                paddingTop: '14px',
                borderTop: '1px solid var(--line, oklch(0.29 0.012 60))',
                fontSize: '12px',
                lineHeight: '1.45',
                color: 'var(--mu, oklch(0.7 0.01 70))',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    font: "600 10px/1 'IBM Plex Mono',monospace",
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--tx, oklch(0.94 0.008 80))',
                  }}
                >
                  Average
                </span>
                <span style={{ textWrap: 'pretty' }}>{T(v.projAvg)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    font: "600 10px/1 'IBM Plex Mono',monospace",
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--tx, oklch(0.94 0.008 80))',
                  }}
                >
                  Below / above avg
                </span>
                <span style={{ textWrap: 'pretty' }}>
                  Each level’s growth is a chance roll, real results may vary: Low and High show the below/above average
                  outcomes likely to occur.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div data-jump="b-saved" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
            <h2 style={{ margin: '0', font: "600 18px/1.2 'Cinzel',serif" }}>{T(v.buildsTitle)}</h2>
            <span style={{ fontSize: '13px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
              {T(v.buildsN)}
              {' saved · load one, or compare them side by side'}
            </span>
            <button
              onClick={v.toggleCode}
              title="Create a build from a build code"
              style={{
                marginLeft: 'auto',
                padding: '7px 12px',
                borderRadius: '999px',
                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                background: 'transparent',
                color: 'var(--tx, oklch(0.94 0.008 80))',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Add build from code
            </button>
            <button
              onClick={v.bOnlyTog}
              title="Show only the current character's builds"
              style={
                {
                  padding: '7px 12px',
                  borderRadius: '999px',
                  border: `1px solid ${str(v.bOnlyBd)}`,
                  background: str(v.bOnlyBg),
                  color: 'var(--tx, oklch(0.94 0.008 80))',
                  cursor: 'pointer',
                  fontSize: '12px',
                } as CSSProperties
              }
            >
              {T(v.bOnlyLbl)}
            </button>
          </div>
          {v.codeOpen ? (
            <>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  padding: '12px 14px',
                  borderRadius: 'var(--r, 14px)',
                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  background: 'var(--panel, oklch(0.2 0.01 60))',
                }}
              >
                <input
                  value={v.codeVal ?? ''}
                  onInput={v.onCode}
                  onKeyDown={v.codeKey}
                  placeholder="Cai (R5 Bardinger) @Wild Horse: Bar5 Pal20"
                  spellCheck="false"
                  style={{
                    flex: '1 1 260px',
                    minWidth: '0',
                    padding: '8px 12px',
                    borderRadius: '999px',
                    border: '1px solid var(--line)',
                    background: 'var(--panel)',
                    color: 'var(--tx, oklch(0.94 0.008 80))',
                    font: "12px 'IBM Plex Mono',monospace",
                  }}
                />
                <button
                  onClick={v.codeMake}
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
                  Create build
                </button>
                <span style={{ flexBasis: '100%', fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                  {T(v.codeMsg)}
                </span>
              </div>
            </>
          ) : null}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,230px),1fr))',
              gap: '10px',
            }}
          >
            {L(v.builds).map((b: any, $index: number) => (
              <Fragment key={$index}>
                <div
                  draggable="true"
                  onDragStart={b?.dStart}
                  onDragOver={b?.dOver}
                  onDrop={b?.dDrop}
                  onDragEnd={b?.dEnd}
                  style={
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '12px 14px',
                      borderRadius: 'var(--r, 14px)',
                      border: `1px solid ${str(b?.bd)}`,
                      background: 'var(--panel, oklch(0.2 0.01 60))',
                      opacity: str(b?.dim),
                      boxShadow: str(b?.sh),
                      cursor: 'grab',
                    } as CSSProperties
                  }
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '0' }}>
                      <span
                        title="Drag to reorder"
                        style={
                          {
                            display: str(v.cdd?.ic),
                            fontSize: '14px',
                            lineHeight: '1',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                            userSelect: 'none',
                          } as CSSProperties
                        }
                      >
                        ⠿
                      </span>
                      <span style={{ fontWeight: '600', filter: str(b?.blur) } as CSSProperties}>{T(b?.c)}</span>
                    </span>
                    <span style={{ display: 'flex', gap: '0', margin: '-6px -8px -6px 0' }}>
                      <button
                        onClick={b?.left}
                        title="Move earlier"
                        aria-label="Move earlier"
                        style={
                          {
                            width: str(v.tk28),
                            height: str(v.tk28),
                            border: '0',
                            borderRadius: '50%',
                            background: 'transparent',
                            cursor: 'pointer',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          } as CSSProperties
                        }
                      >
                        ←
                      </button>
                      <button
                        onClick={b?.right}
                        title="Move later"
                        aria-label="Move later"
                        style={
                          {
                            width: str(v.tk28),
                            height: str(v.tk28),
                            border: '0',
                            borderRadius: '50%',
                            background: 'transparent',
                            cursor: 'pointer',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          } as CSSProperties
                        }
                      >
                        →
                      </button>
                      <button
                        onClick={b?.toggleStar}
                        title={b?.starTip}
                        aria-label={b?.starTip}
                        style={
                          {
                            width: str(v.tk28),
                            height: str(v.tk28),
                            border: '0',
                            borderRadius: '50%',
                            background: 'transparent',
                            cursor: 'pointer',
                            color: str(b?.starCol),
                            fontSize: '16px',
                            lineHeight: '1',
                          } as CSSProperties
                        }
                      >
                        {T(b?.star)}
                      </button>
                      <button
                        onClick={b?.askDel}
                        title="Delete build"
                        aria-label="Delete build"
                        style={
                          {
                            width: str(v.tk28),
                            height: str(v.tk28),
                            border: '0',
                            borderRadius: '50%',
                            background: 'transparent',
                            cursor: 'pointer',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                            display: 'grid',
                            placeItems: 'center',
                          } as CSSProperties
                        }
                        className="hv-13"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.6 9h6.8L12 4"></path>
                        </svg>
                      </button>
                    </span>
                  </div>
                  <input
                    value={b?.nm ?? ''}
                    onChange={b?.onName}
                    placeholder={b?.dn}
                    title="Rename build"
                    maxLength={40}
                    style={{
                      padding: '6px 8px',
                      margin: '0 -8px',
                      borderRadius: '6px',
                      border: '1px solid transparent',
                      background: 'transparent',
                      outline: 'none',
                      font: "600 13px/1.2 'IBM Plex Mono',monospace",
                      color: 'var(--ac, oklch(0.8 0.11 75))',
                    }}
                    className="hv-14 focus-15"
                  />
                  <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                    {T(b?.k)}
                    {' · '}
                    {T(b?.m)}
                    {' · Lv '}
                    {T(b?.lv)}
                  </span>
                  <span
                    style={
                      {
                        display: str(b?.abShow),
                        fontSize: '12px',
                        lineHeight: '1.35',
                        textWrap: 'pretty',
                      } as CSSProperties
                    }
                  >
                    {T(b?.abTxt)}
                  </span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {b?.confirming ? (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            flexWrap: 'nowrap',
                            width: '100%',
                          }}
                        >
                          <span style={{ fontSize: '12px', marginRight: 'auto' }}>Delete this build?</span>
                          <button
                            onClick={b?.cancelDel}
                            style={{
                              padding: '7px 12px',
                              borderRadius: '999px',
                              border: '1px solid var(--line, oklch(0.29 0.012 60))',
                              background: 'transparent',
                              color: 'var(--tx, oklch(0.94 0.008 80))',
                              cursor: 'pointer',
                              fontSize: '12px',
                              lineHeight: '1.2',
                              boxSizing: 'border-box',
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={b?.del}
                            style={{
                              padding: '7px 12px',
                              borderRadius: '999px',
                              border: '1px solid transparent',
                              background: 'oklch(0.62 0.17 25)',
                              color: '#fff',
                              fontWeight: '600',
                              cursor: 'pointer',
                              fontSize: '12px',
                              lineHeight: '1.2',
                              boxSizing: 'border-box',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : null}
                    {b?.idle ? (
                      <>
                        <button
                          onClick={b?.load}
                          style={{
                            padding: '9px 16px',
                            borderRadius: '999px',
                            border: '0',
                            background: 'var(--ac, oklch(0.8 0.11 75))',
                            color: 'oklch(0.18 0.01 60)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          Load
                        </button>
                        <button
                          onClick={b?.copyCode}
                          title="Copy this build's code"
                          style={{
                            padding: '7px 12px',
                            borderRadius: '999px',
                            border: '1px solid var(--line, oklch(0.29 0.012 60))',
                            background: 'transparent',
                            color: 'var(--tx, oklch(0.94 0.008 80))',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          {T(b?.cpLbl)}
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        {v.bc?.show ? (
          <>
            <div style={{ display: 'flex' }}>
              <button
                onClick={v.bc?.toCmp}
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
                Compare builds →
              </button>
            </div>
          </>
        ) : null}
      </section>
    </>
  )
}
