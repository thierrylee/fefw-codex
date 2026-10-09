import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { L, T, str, type VM } from './runtime'
import { OverviewScreen } from './screens/OverviewScreen'
import { CharactersScreen } from './screens/CharactersScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { UnitBuilderScreen } from './screens/UnitBuilderScreen'
import { CompareScreen } from './screens/CompareScreen'
import { MealPairingScreen } from './screens/MealPairingScreen'
import { ChartsScreen } from './screens/ChartsScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { ClassesScreen } from './screens/ClassesScreen'
import { CatalogScreen } from './screens/CatalogScreen'

export function AppView({ v }: { v: VM }) {
  return (
    <>
      <div
        style={{ minHeight: '100vh', background: 'oklch(0.15 0.035 165)', padding: str(v.outerPad) } as CSSProperties}
      >
        <div
          ref={v.rootRef}
          style={
            {
              '--bg': str(v.t?.bg),
              '--panel': str(v.t?.panel),
              '--panel2': str(v.t?.panel2),
              '--line': str(v.t?.line),
              '--tx': str(v.t?.tx),
              '--mu': str(v.t?.mu),
              '--ac': str(v.t?.ac),
              '--r': str(v.t?.r),
              '--glow': str(v.t?.glow),
              position: 'relative',
              maxWidth: str(v.appMaxW),
              height: str(v.appH),
              minHeight: str(v.appMinH),
              margin: '0 auto',
              overflow: str(v.appOverflow),
              borderRadius: str(v.appRadius),
              border: str(v.appBorder),
              background: 'var(--bg, oklch(0.165 0.008 60))',
              color: 'var(--tx, oklch(0.94 0.008 80))',
              fontFamily: "'IBM Plex Sans',system-ui,sans-serif",
              fontSize: '14px',
              lineHeight: '1.45',
            } as CSSProperties
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: str(v.gridCols), minHeight: '100%' } as CSSProperties}>
            {v.sidebar ? (
              <>
                {v.hasNavTip ? (
                  <>
                    <div
                      style={
                        {
                          position: 'fixed',
                          zIndex: '60',
                          left: `${str(v.navTip?.x)}px`,
                          top: `${str(v.navTip?.y)}px`,
                          transform: 'translateY(-50%)',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          background: 'var(--panel2, oklch(0.25 0.012 60))',
                          color: 'var(--tx, oklch(0.94 0.008 80))',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          boxShadow: '0 6px 20px oklch(0 0 0 / .4)',
                          fontSize: '13px',
                          fontWeight: '500',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none',
                        } as CSSProperties
                      }
                    >
                      {T(v.navTip?.l)}
                    </div>
                  </>
                ) : null}
                <aside
                  style={
                    {
                      position: 'sticky',
                      top: '0',
                      height: '100vh',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '28px',
                      padding: str(v.sbPad),
                      borderRight: '1px solid var(--line, oklch(0.29 0.012 60))',
                      background: 'var(--panel, oklch(0.2 0.01 60))',
                    } as CSSProperties
                  }
                >
                  <div
                    style={
                      {
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: str(v.sbHeadJust),
                        gap: '8px',
                        padding: str(v.sbHeadPad),
                      } as CSSProperties
                    }
                  >
                    {v.sbOpen ? (
                      <>
                        <div
                          style={{
                            font: "700 17px/32px 'Cinzel',serif",
                            letterSpacing: '.08em',
                            color: 'var(--ac, oklch(0.82 0.12 85))',
                          }}
                        >
                          Weave Codex
                        </div>
                      </>
                    ) : null}
                    <button
                      onClick={v.sbToggle}
                      title={v.sbTip}
                      style={{
                        flex: 'none',
                        width: '32px',
                        height: '32px',
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '8px',
                        border: '1px solid var(--line, oklch(0.29 0.012 60))',
                        background: 'transparent',
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                        cursor: 'pointer',
                        fontSize: '14px',
                        lineHeight: '1',
                        padding: '0',
                      }}
                      className="hv-0"
                    >
                      {T(v.sbIcon)}
                    </button>
                  </div>
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {L(v.nav).map((it: any, $index: number) => (
                      <Fragment key={$index}>
                        <button
                          onClick={it?.go}
                          onMouseEnter={it?.tipOn}
                          onMouseLeave={v.navTipOff}
                          onFocus={it?.tipOn}
                          onBlur={v.navTipOff}
                          aria-label={it?.label}
                          style={
                            {
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: str(v.sbJust),
                              gap: '12px',
                              minHeight: '44px',
                              padding: '10px 12px',
                              border: '0',
                              borderRadius: '10px',
                              background: str(it?.bg),
                              color: str(it?.fg),
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontWeight: '500',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              boxShadow: `inset 3px 0 0 ${str(it?.bar)}`,
                            } as CSSProperties
                          }
                          className="hv-1"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flex: 'none' }}
                          >
                            <path d={it?.icon}></path>
                          </svg>
                          {v.sbOpen ? (
                            <>
                              <span style={{ fontSize: '14px' }}>{T(it?.label)}</span>
                            </>
                          ) : null}
                        </button>
                      </Fragment>
                    ))}
                  </nav>
                </aside>
              </>
            ) : null}
            <main style={{ minWidth: '0', display: 'flex', flexDirection: 'column' }}>
              {v.headOn ? (
                <>
                  <header
                    style={
                      {
                        position: 'sticky',
                        top: '0',
                        zIndex: '5',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        padding: str(v.headPad),
                        background: 'var(--bg, oklch(0.2 0.045 165))',
                        borderBottom: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                      } as CSSProperties
                    }
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '14px 24px',
                      }}
                    >
                      {v.showBrandInHead ? (
                        <>
                          <div
                            style={{
                              font: "700 17px/1 'Cinzel',serif",
                              letterSpacing: '.08em',
                              color: 'var(--ac, oklch(0.82 0.12 85))',
                              marginRight: 'auto',
                            }}
                          >
                            Weave Codex
                          </div>
                        </>
                      ) : null}
                      {v.headTitleOn ? (
                        <>
                          <div
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 0', minWidth: '0' }}
                          >
                            {v.headBackOn ? (
                              <>
                                <button
                                  onClick={v.headBack}
                                  aria-label="Back"
                                  style={{
                                    flex: 'none',
                                    width: '44px',
                                    height: '44px',
                                    marginLeft: '-10px',
                                    display: 'grid',
                                    placeItems: 'center',
                                    border: '0',
                                    borderRadius: '50%',
                                    background: 'transparent',
                                    color: 'var(--ac, oklch(0.82 0.12 85))',
                                    cursor: 'pointer',
                                    fontSize: '22px',
                                    lineHeight: '1',
                                  }}
                                  className="hv-2"
                                >
                                  ←
                                </button>
                              </>
                            ) : null}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                              {v.headSubOn ? (
                                <>
                                  <span
                                    style={{
                                      font: "500 10px/1 'IBM Plex Mono',monospace",
                                      letterSpacing: '.14em',
                                      textTransform: 'uppercase',
                                      color: 'var(--mu, oklch(0.7 0.01 70))',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                    }}
                                  >
                                    {T(v.headSub)}
                                  </span>
                                </>
                              ) : null}
                              <h1
                                style={{
                                  margin: '0',
                                  font: "700 19px/1.2 'Cinzel',serif",
                                  letterSpacing: '.04em',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  minWidth: '0',
                                }}
                              >
                                {T(v.headTitle)}
                              </h1>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    {v.topTabs ? (
                      <>
                        <nav style={{ display: 'flex', gap: '4px', marginBottom: '-13px' }}>
                          {L(v.nav).map((it: any, $index: number) => (
                            <Fragment key={$index}>
                              <button
                                onClick={it?.go}
                                style={
                                  {
                                    padding: '10px 14px',
                                    border: '0',
                                    borderBottom: `2px solid ${str(it?.bar)}`,
                                    background: 'transparent',
                                    color: str(it?.fg),
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                  } as CSSProperties
                                }
                              >
                                {T(it?.label)}
                              </button>
                            </Fragment>
                          ))}
                        </nav>
                      </>
                    ) : null}
                  </header>
                </>
              ) : null}
              <div
                style={
                  {
                    flex: '1',
                    padding: str(v.bodyPad),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '22px',
                    maxWidth: '1280px',
                    width: '100%',
                  } as CSSProperties
                }
              >
                {v.subOn ? (
                  <>
                    <div
                      role="tablist"
                      style={{
                        display: 'flex',
                        gap: '4px',
                        padding: '3px',
                        borderRadius: '999px',
                        background: 'var(--panel, oklch(0.2 0.01 60))',
                        border: '1px solid var(--line, oklch(0.29 0.012 60))',
                        marginBottom: '-6px',
                      }}
                    >
                      {L(v.subTabs).map((s: any, $index: number) => (
                        <Fragment key={$index}>
                          <button
                            role="tab"
                            onClick={s?.go}
                            style={
                              {
                                flex: '1 1 0',
                                minWidth: '0',
                                minHeight: '36px',
                                border: '0',
                                borderRadius: '999px',
                                background: str(s?.bg),
                                color: str(s?.fg),
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                              } as CSSProperties
                            }
                          >
                            {T(s?.l)}
                          </button>
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
                {v.hasCrumbs ? (
                  <>
                    <nav
                      aria-label="Breadcrumb"
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '4px 8px',
                        font: "500 11px/1 'IBM Plex Mono',monospace",
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        marginBottom: '-8px',
                      }}
                    >
                      {L(v.crumbs).map((c: any, $index: number) => (
                        <Fragment key={$index}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{ display: str(c?.sepD), color: 'var(--mu, oklch(0.7 0.01 70))' } as CSSProperties}
                            >
                              ›
                            </span>
                            <button
                              onClick={c?.go}
                              title={c?.tt}
                              style={
                                {
                                  display: str(c?.aD),
                                  padding: '6px 0',
                                  border: '0',
                                  background: 'transparent',
                                  color: 'var(--mu, oklch(0.7 0.01 70))',
                                  cursor: 'pointer',
                                  font: 'inherit',
                                  letterSpacing: 'inherit',
                                  textTransform: 'inherit',
                                } as CSSProperties
                              }
                              className="hv-3"
                            >
                              {T(c?.l)}
                            </button>
                            <span
                              aria-current="page"
                              style={{ display: str(c?.sD), color: 'var(--tx, oklch(0.95 0.01 90))' } as CSSProperties}
                            >
                              {T(c?.l)}
                            </span>
                          </span>
                        </Fragment>
                      ))}
                    </nav>
                  </>
                ) : null}
                {v.loading ? (
                  <>
                    <div
                      style={{
                        color: 'var(--mu, oklch(0.7 0.01 70))',
                        fontFamily: "'IBM Plex Mono',monospace",
                        fontSize: '12px',
                      }}
                    >
                      Loading codex…
                    </div>
                  </>
                ) : null}
                {v.isOverview ? (
                  <>
                    <OverviewScreen v={v} />
                  </>
                ) : null}
                {v.isRoster ? (
                  <>
                    <CharactersScreen v={v} />
                  </>
                ) : null}
                {v.isProfile ? (
                  <>
                    <ProfileScreen v={v} />
                  </>
                ) : null}
                {v.showCalc ? (
                  <>
                    <UnitBuilderScreen v={v} />
                  </>
                ) : null}
                {v.isCompare ? (
                  <>
                    <CompareScreen v={v} />
                  </>
                ) : null}
                {v.isMatch ? (
                  <>
                    <MealPairingScreen v={v} />
                  </>
                ) : null}
                {v.isCharts ? (
                  <>
                    <ChartsScreen v={v} />
                  </>
                ) : null}
                {v.isSettings ? (
                  <>
                    <SettingsScreen v={v} />
                  </>
                ) : null}
                {v.isClasses ? (
                  <>
                    <ClassesScreen v={v} />
                  </>
                ) : null}
                {v.isXl ? (
                  <>
                    <CatalogScreen v={v} />
                  </>
                ) : null}
                <div style={{ height: str(v.bottomSpacer) } as CSSProperties}></div>
              </div>
              {v.narrow ? (
                <>
                  <div style={{ position: 'sticky', bottom: '0', zIndex: '6' }}>
                    {v.topShow ? (
                      <>
                        <button
                          onClick={v.toTop}
                          aria-label="Back to top"
                          title="Back to top"
                          style={{
                            position: 'absolute',
                            right: '14px',
                            top: '-58px',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                            background: 'var(--panel2, oklch(0.3 0.055 165))',
                            color: 'var(--ac, oklch(0.82 0.12 85))',
                            display: 'grid',
                            placeItems: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(0,0,0,.4)',
                            padding: '0',
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 19V5M5 12l7-7 7 7"></path>
                          </svg>
                        </button>
                      </>
                    ) : null}
                    <nav
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4,1fr)',
                        padding: '6px 6px 14px',
                        background: 'var(--panel, oklch(0.2 0.01 60))',
                        borderTop: '1px solid var(--line, oklch(0.29 0.012 60))',
                      }}
                    >
                      {L(v.navG).map((it: any, $index: number) => (
                        <Fragment key={$index}>
                          <button
                            onClick={it?.go}
                            style={
                              {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '3px',
                                minHeight: '56px',
                                justifyContent: 'center',
                                border: '0',
                                background: 'transparent',
                                color: str(it?.fg),
                                cursor: 'pointer',
                                fontSize: '10px',
                                fontWeight: '500',
                              } as CSSProperties
                            }
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="22"
                              height="22"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{ flex: 'none' }}
                            >
                              <path d={it?.icon}></path>
                            </svg>
                            <span
                              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
                            >
                              {T(it?.short)}
                              <span
                                style={
                                  {
                                    width: '18px',
                                    height: '3px',
                                    borderRadius: '2px',
                                    background: str(it?.bar),
                                  } as CSSProperties
                                }
                              ></span>
                            </span>
                          </button>
                        </Fragment>
                      ))}
                    </nav>
                  </div>
                </>
              ) : null}
              {v.pkOpen ? (
                <>
                  <div
                    onClick={v.pkClose}
                    style={{
                      position: 'fixed',
                      inset: '0',
                      zIndex: '90',
                      display: 'grid',
                      placeItems: 'center',
                      padding: '16px',
                      background: 'oklch(0.1 0.01 60 / .7)',
                    }}
                  >
                    <div
                      data-cdlg="1"
                      onClick={v.stopClick}
                      style={{
                        width: 'min(640px,100%)',
                        maxHeight: 'min(720px,calc(100vh - 32px))',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        padding: '20px',
                        borderRadius: 'var(--r, 14px)',
                        background: 'var(--panel, oklch(0.2 0.01 60))',
                        border: '1px solid var(--line, oklch(0.29 0.012 60))',
                        boxShadow: '0 24px 70px -12px rgba(0,0,0,.7)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                        <h2 style={{ margin: '0', font: "600 18px/1.2 'Cinzel',serif" }}>{T(v.pkTitle)}</h2>
                        <span
                          style={{
                            font: "500 10px/1 'IBM Plex Mono',monospace",
                            letterSpacing: '.12em',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                        >
                          {T(v.pkCount)}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>{T(v.pkSub)}</span>
                        <button
                          onClick={v.pkClose}
                          aria-label="Close"
                          style={
                            {
                              marginLeft: 'auto',
                              width: str(v.tk28),
                              height: str(v.tk28),
                              border: '0',
                              borderRadius: '50%',
                              background: 'transparent',
                              cursor: 'pointer',
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                              fontSize: '16px',
                            } as CSSProperties
                          }
                          className="hv-8"
                        >
                          ×
                        </button>
                      </div>
                      <span style={{ position: 'relative', display: 'flex' }}>
                        <input
                          value={v.pkQ ?? ''}
                          onInput={v.onPkQ}
                          placeholder="Search by name or effect…"
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
                        />
                        <button
                          onClick={v.onPkClear}
                          title="Clear"
                          aria-label="Clear search"
                          style={
                            {
                              display: str(v.pkClrDisp),
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
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {L(v.pkChipRows).map((row: any, $index: number) => (
                          <Fragment key={$index}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {L(row?.chips).map((c: any, $index: number) => (
                                <Fragment key={$index}>
                                  <button
                                    onClick={c?.go}
                                    style={
                                      {
                                        padding: '7px 12px',
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
                                    {T(c?.l)}
                                  </button>
                                </Fragment>
                              ))}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      <div
                        style={{
                          overflowY: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          minHeight: '120px',
                          paddingRight: '4px',
                        }}
                      >
                        {L(v.pkRows).map((r: any, $index: number) => (
                          <Fragment key={$index}>
                            <div
                              data-pkn={r?.n}
                              data-tip="1"
                              onMouseEnter={r?.enter}
                              onMouseLeave={r?.leave}
                              onClick={r?.go}
                              style={
                                {
                                  display: 'grid',
                                  gridTemplateColumns: '24px 1fr auto',
                                  gap: '10px',
                                  alignItems: 'start',
                                  padding: '9px 12px',
                                  borderRadius: '10px',
                                  border: `1px solid ${str(r?.bd)}`,
                                  background: str(r?.rbg),
                                  opacity: str(r?.op),
                                  cursor: str(r?.cur),
                                } as CSSProperties
                              }
                            >
                              <span
                                style={{
                                  font: "600 14px/1.3 'IBM Plex Mono',monospace",
                                  color: 'var(--ac, oklch(0.8 0.11 75))',
                                }}
                              >
                                {T(r?.mark)}
                              </span>
                              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                                <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(r?.n)}</span>
                                <span
                                  style={
                                    {
                                      display: str(r?.stDisp),
                                      font: "500 11px/1.3 'IBM Plex Mono',monospace",
                                      color: 'var(--ac, oklch(0.8 0.11 75))',
                                    } as CSSProperties
                                  }
                                >
                                  {T(r?.st)}
                                </span>
                                <span
                                  style={
                                    {
                                      display: str(r?.eDisp),
                                      fontSize: '12px',
                                      color: 'var(--mu, oklch(0.7 0.01 70))',
                                      textWrap: 'pretty',
                                    } as CSSProperties
                                  }
                                >
                                  {T(r?.e)}
                                </span>
                              </span>
                              <span
                                style={{
                                  font: "500 10px/1.3 'IBM Plex Mono',monospace",
                                  letterSpacing: '.1em',
                                  textTransform: 'uppercase',
                                  color: 'var(--mu, oklch(0.7 0.01 70))',
                                }}
                              >
                                {T(r?.catL)}
                              </span>
                            </div>
                          </Fragment>
                        ))}
                        {v.pkNone ? (
                          <>
                            <span
                              style={{ padding: '16px', textAlign: 'center', color: 'var(--mu, oklch(0.7 0.01 70))' }}
                            >
                              Nothing matches.
                            </span>
                          </>
                        ) : null}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          onClick={v.pkClose}
                          style={{
                            padding: '7px 12px',
                            borderRadius: '999px',
                            border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                            background: 'transparent',
                            color: 'var(--ac, oklch(0.8 0.11 75))',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                          className="hv-6"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {v.cdOpen ? (
                <>
                  <div
                    onClick={v.cdClose}
                    style={{
                      position: 'fixed',
                      inset: '0',
                      zIndex: '90',
                      display: 'grid',
                      placeItems: 'center',
                      padding: '16px',
                      background: 'oklch(0.1 0.01 60 / .7)',
                    }}
                  >
                    <div
                      data-cdlg="1"
                      onClick={v.stopClick}
                      style={{
                        width: 'min(640px,100%)',
                        maxHeight: 'min(720px,calc(100vh - 32px))',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        padding: '20px',
                        borderRadius: 'var(--r, 14px)',
                        background: 'var(--panel, oklch(0.2 0.01 60))',
                        border: '1px solid var(--line, oklch(0.29 0.012 60))',
                        boxShadow: '0 24px 70px -12px rgba(0,0,0,.7)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                        <h2 style={{ margin: '0', font: "600 18px/1.2 'Cinzel',serif" }}>{T(v.cdTitle)}</h2>
                        <span
                          style={{
                            font: "500 10px/1 'IBM Plex Mono',monospace",
                            letterSpacing: '.12em',
                            color: 'var(--mu, oklch(0.7 0.01 70))',
                          }}
                        >
                          {T(v.cdCount)}
                        </span>
                        <button
                          onClick={v.cdClose}
                          aria-label="Close"
                          style={
                            {
                              marginLeft: 'auto',
                              width: str(v.tk28),
                              height: str(v.tk28),
                              border: '0',
                              borderRadius: '50%',
                              background: 'transparent',
                              cursor: 'pointer',
                              color: 'var(--mu, oklch(0.7 0.01 70))',
                              fontSize: '16px',
                            } as CSSProperties
                          }
                          className="hv-8"
                        >
                          ×
                        </button>
                      </div>
                      <input
                        value={v.cdQ ?? ''}
                        onInput={v.onCdQ}
                        placeholder="Search by class or weapon…"
                        autoComplete="off"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '8px 12px',
                          borderRadius: '999px',
                          border: '1px solid var(--line)',
                          background: 'var(--panel)',
                          outline: 'none',
                        }}
                      />
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {L(v.cdChips).map((c: any, $index: number) => (
                          <Fragment key={$index}>
                            <button
                              onClick={c?.go}
                              style={
                                {
                                  padding: '7px 12px',
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
                              {T(c?.l)}
                            </button>
                          </Fragment>
                        ))}
                      </div>
                      <div
                        style={{
                          overflowY: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          minHeight: '120px',
                          paddingRight: '4px',
                        }}
                      >
                        {L(v.cdRows).map((r: any, $index: number) => (
                          <Fragment key={$index}>
                            <div
                              data-tip="1"
                              onMouseEnter={r?.enter}
                              onMouseLeave={r?.leave}
                              onClick={r?.go}
                              style={
                                {
                                  display: 'grid',
                                  gridTemplateColumns: '24px 1fr auto',
                                  gap: '10px',
                                  alignItems: 'start',
                                  padding: '9px 12px',
                                  borderRadius: '10px',
                                  border: `1px solid ${str(r?.bd)}`,
                                  background: 'var(--panel2, oklch(0.25 0.012 60))',
                                  opacity: str(r?.op),
                                  cursor: str(r?.cur),
                                } as CSSProperties
                              }
                            >
                              <span
                                style={{
                                  font: "600 14px/1.3 'IBM Plex Mono',monospace",
                                  color: 'var(--ac, oklch(0.8 0.11 75))',
                                }}
                              >
                                {T(r?.mark)}
                              </span>
                              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                                <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(r?.n)}</span>
                                <span
                                  style={{
                                    fontSize: '12px',
                                    color: 'var(--mu, oklch(0.7 0.01 70))',
                                    textWrap: 'pretty',
                                  }}
                                >
                                  {T(r?.sub)}
                                </span>
                              </span>
                              <span
                                style={
                                  {
                                    font: "500 10px/1.3 'IBM Plex Mono',monospace",
                                    letterSpacing: '.1em',
                                    textTransform: 'uppercase',
                                    color: str(r?.tc),
                                  } as CSSProperties
                                }
                              >
                                {T(r?.tier)}
                              </span>
                            </div>
                          </Fragment>
                        ))}
                        {v.cdNone ? (
                          <>
                            <span
                              style={{ padding: '16px', textAlign: 'center', color: 'var(--mu, oklch(0.7 0.01 70))' }}
                            >
                              Nothing matches.
                            </span>
                          </>
                        ) : null}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          onClick={v.cdClose}
                          style={{
                            padding: '7px 12px',
                            borderRadius: '999px',
                            border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                            background: 'transparent',
                            color: 'var(--ac, oklch(0.8 0.11 75))',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                          className="hv-6"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {v.tipOn ? (
                <>
                  <div
                    style={
                      {
                        position: 'fixed',
                        left: str(v.tip?.x),
                        top: str(v.tip?.y),
                        transform: str(v.tip?.tf),
                        zIndex: '95',
                        width: '300px',
                        maxWidth: 'calc(100vw - 24px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '14px 16px',
                        borderRadius: 'var(--r, 12px)',
                        background: 'var(--panel2, oklch(0.3 0.055 165))',
                        border: '1px solid var(--ac, oklch(0.82 0.12 85))',
                        boxShadow: '0 18px 50px -12px rgba(0,0,0,.6)',
                        pointerEvents: 'none',
                      } as CSSProperties
                    }
                  >
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline' }}
                    >
                      <span style={{ font: "600 16px/1.25 'Cinzel',serif", color: 'var(--ac, oklch(0.82 0.12 85))' }}>
                        {T(v.tip?.t)}
                      </span>
                      <span
                        style={{
                          font: "500 10px/1.3 'IBM Plex Mono',monospace",
                          letterSpacing: '.08em',
                          textTransform: 'uppercase',
                          color: 'var(--mu, oklch(0.78 0.035 120))',
                          textAlign: 'right',
                        }}
                      >
                        {T(v.tip?.sub)}
                      </span>
                    </div>
                    <span
                      style={
                        {
                          fontSize: '13px',
                          lineHeight: '1.45',
                          textWrap: 'pretty',
                          color: str(v.tip?.bodyCol),
                        } as CSSProperties
                      }
                    >
                      {T(v.tip?.body)}
                    </span>
                    {v.tip?.hasStats ? (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fill,minmax(64px,1fr))',
                              gap: '6px',
                            }}
                          >
                            {L(v.tip?.stats).map((s: any, $index: number) => (
                              <Fragment key={$index}>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',
                                    padding: '6px 8px',
                                    borderRadius: '6px',
                                    background: 'var(--panel, oklch(0.2 0.01 60))',
                                  }}
                                >
                                  <span
                                    style={{
                                      font: "500 9.5px/1 'IBM Plex Mono',monospace",
                                      letterSpacing: '.06em',
                                      textTransform: 'uppercase',
                                      color: 'var(--mu, oklch(0.78 0.035 120))',
                                    }}
                                  >
                                    {T(s?.l)}
                                  </span>
                                  <span style={{ font: "600 16px/1.1 'IBM Plex Mono',monospace" }}>{T(s?.v)}</span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                          <span
                            style={{
                              font: "500 10px/1.4 'IBM Plex Mono',monospace",
                              color: 'var(--mu, oklch(0.78 0.035 120))',
                            }}
                          >
                            {T(v.tip?.statNote)}
                          </span>
                        </div>
                      </>
                    ) : null}
                    {v.tip?.note ? (
                      <>
                        <span
                          style={{
                            font: "500 11px/1.4 'IBM Plex Mono',monospace",
                            color: 'var(--mu, oklch(0.78 0.035 120))',
                          }}
                        >
                          {T(v.tip?.note)}
                        </span>
                      </>
                    ) : null}
                    {v.tip?.who ? (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3px',
                            paddingTop: '8px',
                            borderTop: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
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
                            {T(v.tip?.whoLbl)}
                          </span>
                          {v.tip?.hasGroups ? (
                            <>
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'auto minmax(0,1fr)',
                                  gap: '4px 10px',
                                  alignItems: 'baseline',
                                }}
                              >
                                {L(v.tip?.whoGroups).map((g: any, $index: number) => (
                                  <Fragment key={$index}>
                                    <span
                                      style={{
                                        font: "600 11px/1.4 'IBM Plex Mono',monospace",
                                        color: 'var(--ac, oklch(0.82 0.12 85))',
                                      }}
                                    >
                                      {T(g?.rank)}
                                    </span>
                                    <span style={{ fontSize: '12px', textWrap: 'pretty' }}>{T(g?.names)}</span>
                                  </Fragment>
                                ))}
                              </div>
                            </>
                          ) : null}
                          <span
                            style={{ fontSize: '12px', textWrap: 'pretty', color: 'var(--mu, oklch(0.78 0.035 120))' }}
                          >
                            {T(v.tip?.who)}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </>
              ) : null}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
