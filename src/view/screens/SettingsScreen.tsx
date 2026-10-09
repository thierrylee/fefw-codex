import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from '../runtime'

export function SettingsScreen({ v }: { v: VM }) {
  return (
    <>
      <section data-screen-label="Settings" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 style={{ display: str(v.h1Disp), margin: '0', font: "600 30px/1.1 'Cinzel',serif" } as CSSProperties}>
            Settings
          </h1>
          <span style={{ color: 'var(--mu, oklch(0.78 0.035 120))' }}>
            Set these once for your playthrough. Content past your current part stays sealed.
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            padding: '20px',
            borderRadius: 'var(--r, 14px)',
            background: 'var(--panel, oklch(0.245 0.05 165))',
            border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
          }}
        >
          <span
            style={{
              font: "500 10px/1 'IBM Plex Mono',monospace",
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--mu, oklch(0.78 0.035 120))',
              marginBottom: '6px',
            }}
          >
            Story progress
          </span>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--mu, oklch(0.78 0.035 120))',
              marginBottom: '16px',
              textWrap: 'pretty',
            }}
          >
            Pick where you are. Parts I and II follow your lord's route; routes converge from Part III.
          </span>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={v.tPro?.click}
              style={
                {
                  position: 'relative',
                  zIndex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  minHeight: '52px',
                  padding: '8px 14px 8px 8px',
                  borderRadius: '12px',
                  border: `1px ${str(v.tPro?.bs)} ${str(v.tPro?.ring)}`,
                  background: str(v.tPro?.chip),
                  cursor: 'pointer',
                  textAlign: 'left',
                  minWidth: '0',
                } as CSSProperties
              }
            >
              <span
                style={
                  {
                    flex: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: str(v.tPro?.fill),
                    color: str(v.tPro?.txt),
                    font: "600 11px/1 'IBM Plex Mono',monospace",
                  } as CSSProperties
                }
              >
                {T(v.tPro?.roman)}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                <span
                  style={
                    {
                      fontWeight: '600',
                      color: str(v.tPro?.lbl),
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    } as CSSProperties
                  }
                >
                  {T(v.tPro?.label)}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>{T(v.tPro?.state)}</span>
              </span>
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', height: '22px' }}>
            <span style={{ width: '2px', background: str(v.tc?.l0) } as CSSProperties}></span>
          </div>
          <div
            style={
              {
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: str(v.tCols),
                gap: '10px',
                padding: '14px 0',
              } as CSSProperties
            }
          >
            <span
              style={
                {
                  display: str(v.tLine),
                  position: 'absolute',
                  left: '25%',
                  right: '25%',
                  top: '0',
                  height: '2px',
                  background: str(v.tc?.l0),
                } as CSSProperties
              }
            ></span>
            <span
              style={
                {
                  display: str(v.tLine),
                  position: 'absolute',
                  left: '25%',
                  right: '25%',
                  bottom: '0',
                  height: '2px',
                  background: str(v.tc?.l2),
                } as CSSProperties
              }
            ></span>
            {L(v.tRoutes).map((r: any, $index: number) => (
              <Fragment key={$index}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '6px',
                    borderRadius: 'var(--r, 14px)',
                    border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                  }}
                >
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <button
                      onClick={r?.click}
                      style={
                        {
                          position: 'relative',
                          zIndex: '1',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          minHeight: '52px',
                          padding: `8px ${str(v.tPr)} 8px 8px`,
                          borderRadius: '12px',
                          border: `1px ${str(r?.bs)} ${str(r?.ring)}`,
                          background: str(r?.chip),
                          cursor: 'pointer',
                          textAlign: 'left',
                          minWidth: '0',
                        } as CSSProperties
                      }
                    >
                      <span
                        style={
                          {
                            flex: 'none',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'grid',
                            placeItems: 'center',
                            background: str(r?.fill),
                            color: str(r?.txt),
                            font: "600 11px/1 'IBM Plex Mono',monospace",
                          } as CSSProperties
                        }
                      >
                        {T(r?.roman)}
                      </span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                        <span
                          style={
                            {
                              fontWeight: '600',
                              color: str(r?.lbl),
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            } as CSSProperties
                          }
                        >
                          {T(r?.label)}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>
                          {T(r?.state)}
                        </span>
                      </span>
                    </button>
                    {r?.showChk ? (
                      <>
                        <button
                          onClick={r?.toggle}
                          title={r?.chkTip}
                          style={
                            {
                              position: 'absolute',
                              zIndex: '2',
                              top: '50%',
                              right: '8px',
                              transform: 'translateY(-50%)',
                              width: str(v.tk30),
                              height: str(v.tk30),
                              borderRadius: '8px',
                              border: `1px solid ${str(r?.chkBd)}`,
                              background: str(r?.chkBg),
                              color: str(r?.chkFg),
                              cursor: 'pointer',
                              fontSize: '14px',
                              lineHeight: '1',
                            } as CSSProperties
                          }
                        >
                          ✓
                        </button>
                      </>
                    ) : null}
                  </div>
                  <div style={{ display: 'flex', paddingLeft: '23px', height: '8px' }}>
                    <span style={{ width: '2px', background: str(r?.p2?.ring) } as CSSProperties}></span>
                  </div>
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <button
                      onClick={r?.p2?.click}
                      style={
                        {
                          position: 'relative',
                          zIndex: '1',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          minHeight: '52px',
                          padding: `8px ${str(v.tPr)} 8px 8px`,
                          borderRadius: '12px',
                          border: `1px ${str(r?.p2?.bs)} ${str(r?.p2?.ring)}`,
                          background: str(r?.p2?.chip),
                          cursor: 'pointer',
                          textAlign: 'left',
                          minWidth: '0',
                        } as CSSProperties
                      }
                    >
                      <span
                        style={
                          {
                            flex: 'none',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'grid',
                            placeItems: 'center',
                            background: str(r?.p2?.fill),
                            color: str(r?.p2?.txt),
                            font: "600 11px/1 'IBM Plex Mono',monospace",
                          } as CSSProperties
                        }
                      >
                        {T(r?.p2?.roman)}
                      </span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                        <span
                          style={
                            {
                              fontWeight: '600',
                              color: str(r?.p2?.lbl),
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            } as CSSProperties
                          }
                        >
                          {T(r?.p2?.label)}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>
                          {T(r?.p2?.state)}
                        </span>
                      </span>
                    </button>
                    {r?.showChk ? (
                      <>
                        <button
                          onClick={r?.p2?.toggle}
                          title={r?.p2?.chkTip}
                          style={
                            {
                              position: 'absolute',
                              zIndex: '2',
                              top: '50%',
                              right: '8px',
                              transform: 'translateY(-50%)',
                              width: str(v.tk30),
                              height: str(v.tk30),
                              borderRadius: '8px',
                              border: `1px solid ${str(r?.p2?.chkBd)}`,
                              background: str(r?.p2?.chkBg),
                              color: str(r?.p2?.chkFg),
                              cursor: 'pointer',
                              fontSize: '14px',
                              lineHeight: '1',
                            } as CSSProperties
                          }
                        >
                          ✓
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          {v.tShowChips ? (
            <>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '4px 0 2px',
                }}
              >
                <span
                  style={{
                    font: "500 10px/1 'IBM Plex Mono',monospace",
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--mu, oklch(0.78 0.035 120))',
                  }}
                >
                  Cleared
                </span>
                {L(v.tClChips).map((c: any, $index: number) => (
                  <Fragment key={$index}>
                    <button
                      onClick={c?.click}
                      style={
                        {
                          minHeight: '36px',
                          padding: '4px 12px',
                          borderRadius: '999px',
                          border: `1px solid ${str(c?.bd)}`,
                          background: str(c?.bg),
                          color: str(c?.fg),
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                        } as CSSProperties
                      }
                    >
                      {T(c?.mark)}
                      {T(c?.r)}
                    </button>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
          <span
            style={{
              fontSize: '12px',
              color: 'var(--mu, oklch(0.78 0.035 120))',
              textAlign: 'center',
              padding: '6px 0 0',
              textWrap: 'pretty',
            }}
          >
            {T(v.tHint)}
          </span>
          {v.tSkip ? (
            <>
              <span
                style={
                  {
                    alignSelf: 'center',
                    marginTop: '8px',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    border: `1px dashed ${str(v.tc?.l0)}`,
                    fontSize: '12px',
                    color: 'var(--tx, #eee)',
                  } as CSSProperties
                }
              >
                No route cleared · Part I–II recruits locked
              </span>
            </>
          ) : null}
          <div style={{ display: 'flex', justifyContent: 'center', height: '22px' }}>
            <span style={{ width: '2px', background: str(v.tc?.l3) } as CSSProperties}></span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={v.tP3?.click}
              style={
                {
                  position: 'relative',
                  zIndex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  minHeight: '52px',
                  padding: '8px 14px 8px 8px',
                  borderRadius: '12px',
                  border: `1px ${str(v.tP3?.bs)} ${str(v.tP3?.ring)}`,
                  background: str(v.tP3?.chip),
                  cursor: 'pointer',
                  textAlign: 'left',
                  minWidth: '0',
                } as CSSProperties
              }
            >
              <span
                style={
                  {
                    flex: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: str(v.tP3?.fill),
                    color: str(v.tP3?.txt),
                    font: "600 11px/1 'IBM Plex Mono',monospace",
                  } as CSSProperties
                }
              >
                {T(v.tP3?.roman)}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                <span
                  style={
                    {
                      fontWeight: '600',
                      color: str(v.tP3?.lbl),
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    } as CSSProperties
                  }
                >
                  {T(v.tP3?.label)}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>{T(v.tP3?.state)}</span>
              </span>
            </button>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            padding: '20px',
            borderRadius: 'var(--r, 14px)',
            background: 'var(--panel, oklch(0.245 0.05 165))',
            border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
          }}
        >
          <span
            style={{
              font: "500 10px/1 'IBM Plex Mono',monospace",
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--mu, oklch(0.78 0.035 120))',
              marginBottom: '6px',
            }}
          >
            Color scheme
          </span>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--mu, oklch(0.78 0.035 120))',
              marginBottom: '16px',
              textWrap: 'pretty',
            }}
          >
            Applies across the whole app.
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: '10px' }}>
            {L(v.themeOpts).map((o: any, $index: number) => (
              <Fragment key={$index}>
                <button
                  onClick={o?.click}
                  style={
                    {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      minHeight: '44px',
                      padding: '6px 12px 6px 8px',
                      borderRadius: '12px',
                      border: `1px solid ${str(o?.bd)}`,
                      background: str(o?.bg),
                      color: str(o?.fg),
                      cursor: 'pointer',
                      textAlign: 'left',
                      minWidth: '0',
                      font: 'inherit',
                      fontWeight: '600',
                    } as CSSProperties
                  }
                >
                  <span
                    style={
                      {
                        flex: 'none',
                        display: 'flex',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: `1px solid ${str(o?.bd)}`,
                      } as CSSProperties
                    }
                  >
                    <span style={{ flex: '1', background: str(o?.c1) } as CSSProperties}></span>
                    <span style={{ flex: '1', background: str(o?.c2) } as CSSProperties}></span>
                    <span style={{ flex: '1', background: str(o?.c3) } as CSSProperties}></span>
                  </span>
                  <span style={{ minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {T(o?.k)}
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '20px',
            borderRadius: 'var(--r, 14px)',
            background: 'var(--panel, oklch(0.245 0.05 165))',
            border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
          }}
        >
          <span
            style={{
              font: "500 10px/1 'IBM Plex Mono',monospace",
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--mu, oklch(0.78 0.035 120))',
            }}
          >
            Backup
          </span>
          <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))', textWrap: 'pretty' }}>
            Move your saved builds between devices. Import merges with what you already have.
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={v.exportBuilds}
              style={{
                padding: '7px 12px',
                borderRadius: '999px',
                border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                background: 'transparent',
                color: 'var(--tx, #eee)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Export builds (file)
            </button>
            <button
              onClick={v.importBuilds}
              style={{
                padding: '7px 12px',
                borderRadius: '999px',
                border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                background: 'transparent',
                color: 'var(--tx, #eee)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Import builds (file)
            </button>
            <button
              onClick={v.toggleTxt}
              style={{
                padding: '7px 12px',
                borderRadius: '999px',
                border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                background: 'transparent',
                color: 'var(--tx, #eee)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Export / import as text
            </button>
          </div>
          {v.txtOpen ? (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: 'var(--r, 14px)',
                  border: '1px solid var(--line, oklch(0.29 0.012 60))',
                  background: 'var(--panel, oklch(0.2 0.01 60))',
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                  One build per line: character-id (R5 class-code) @mount-id: class code + level sequence, then optional
                  | ab: … | ca: … | it: … | ms: mount-skill code | nm: name | star — e.g. lilian (R5 HN) @wild-horse:
                  HN20 AR35 | ms: PAAL | nm: Scout. Recruit and mount parts are optional.
                </span>
                <textarea
                  value={v.txtVal ?? ''}
                  onChange={v.onTxt}
                  rows={6}
                  spellCheck="false"
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--r)',
                    border: '1px solid var(--line)',
                    background: 'var(--panel)',
                    color: 'var(--tx, oklch(0.94 0.008 80))',
                    font: "12px/1.5 'IBM Plex Mono',monospace",
                    resize: 'vertical',
                  }}
                ></textarea>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={v.importTxt}
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
                    Import text
                  </button>
                  <button
                    onClick={v.copyTxt}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--line, oklch(0.29 0.012 60))',
                      background: 'transparent',
                      color: 'var(--tx, oklch(0.94 0.008 80))',
                      cursor: 'pointer',
                    }}
                  >
                    Copy
                  </button>
                  <button
                    onClick={v.resetTxt}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--line, oklch(0.29 0.012 60))',
                      background: 'transparent',
                      color: 'var(--tx, oklch(0.94 0.008 80))',
                      cursor: 'pointer',
                    }}
                  >
                    Reload from saved
                  </button>
                  <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(v.txtMsg)}</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '20px',
            borderRadius: 'var(--r, 14px)',
            background: 'var(--panel, oklch(0.245 0.05 165))',
            border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
          }}
        >
          <span
            style={{
              font: "500 10px/1 'IBM Plex Mono',monospace",
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--mu, oklch(0.78 0.035 120))',
            }}
          >
            Clear data
          </span>
          <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))', textWrap: 'pretty' }}>
            Each option asks for confirmation first. Deleted data can't be restored — export a backup beforehand.
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {L(v.clrItems).map((c: any, $index: number) => (
              <Fragment key={$index}>
                <button
                  onClick={c?.ask}
                  style={
                    {
                      padding: '7px 12px',
                      borderRadius: '999px',
                      border: `1px solid ${str(c?.bd)}`,
                      background: 'transparent',
                      color: str(c?.fg),
                      cursor: 'pointer',
                      fontSize: '13px',
                    } as CSSProperties
                  }
                >
                  {T(c?.label)}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '20px',
            borderRadius: 'var(--r, 14px)',
            background: 'var(--panel, oklch(0.245 0.05 165))',
            border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
          }}
        >
          <span
            style={{
              font: "500 10px/1 'IBM Plex Mono',monospace",
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--mu, oklch(0.78 0.035 120))',
            }}
          >
            Sources
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 12px' }}>
              <a
                href="https://game8.co/games/Fire-Emblem-Fortunes-Weave"
                target="_blank"
                rel="noopener"
                style={{ fontSize: '13px' }}
              >
                Game8
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 12px' }}>
              <a
                href="https://serenesforest.net/fortunes-weave/"
                target="_blank"
                rel="noopener"
                style={{ fontSize: '13px' }}
              >
                Serenes Forest
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 12px' }}>
              <a
                href="https://fortunesweave.wiki.fextralife.com/"
                target="_blank"
                rel="noopener"
                style={{ fontSize: '13px' }}
              >
                FextraLife
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 12px' }}>
              <a href="https://fortunesweave.co.uk/" target="_blank" rel="noopener" style={{ fontSize: '13px' }}>
                FortunesWeave.co.uk
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 12px' }}>
              <a
                href="https://marigoldfe.com/fortunes-weave/"
                target="_blank"
                rel="noopener"
                style={{ fontSize: '13px' }}
              >
                Marigold
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 12px' }}>
              <a
                href="https://docs.google.com/spreadsheets/d/1YW5AdvPUbLPr1RAGlnotcRaNTFCQPTKiIgshwrcdUtE"
                target="_blank"
                rel="noopener"
                style={{ fontSize: '13px' }}
              >
                Learnset sheet
              </a>
              <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>
                Community's Google Sheet
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 12px' }}>
              <a
                href="https://www.reddit.com/r/fireemblem/"
                target="_blank"
                rel="noopener"
                style={{ fontSize: '13px' }}
              >
                Reddit
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 12px' }}>
              <span style={{ fontSize: '13px' }}>InGame data compiled by Thierry LEE</span>
            </div>
          </div>
        </div>
        {v.clrOpen ? (
          <>
            <div
              onClick={v.clrCancel}
              style={{
                position: 'fixed',
                inset: '0',
                zIndex: '100',
                display: 'grid',
                placeItems: 'center',
                padding: '16px',
                background: 'oklch(0.1 0.01 60 / .7)',
              }}
            >
              <div
                onClick={v.clrStop}
                role="dialog"
                style={{
                  width: 'min(100%,420px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  padding: '22px',
                  borderRadius: 'var(--r, 14px)',
                  background: 'var(--panel, oklch(0.245 0.05 165))',
                  border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                  color: 'var(--tx, #eee)',
                }}
              >
                <h2 style={{ margin: '0', font: "600 18px/1.2 'Cinzel',serif" }}>{T(v.clrTitle)}</h2>
                <span style={{ fontSize: '14px', lineHeight: '1.5', textWrap: 'pretty' }}>{T(v.clrBody)}</span>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <button
                    onClick={v.clrCancel}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                      background: 'transparent',
                      color: 'var(--tx, #eee)',
                      cursor: 'pointer',
                      fontSize: '13px',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={v.clrDo}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '999px',
                      border: '0',
                      background: 'oklch(0.62 0.17 25)',
                      color: '#fff',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '13px',
                    }}
                  >
                    {T(v.clrBtn)}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </section>
    </>
  )
}
