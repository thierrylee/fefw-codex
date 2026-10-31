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
        style={{ minHeight: '100dvh', background: 'oklch(0.15 0.035 165)', padding: str(v.outerPad) } as CSSProperties}
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
          <div
            style={
              { display: 'grid', gridTemplateColumns: str(v.gridCols), minHeight: str(v.appGridMin) } as CSSProperties
            }
          >
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
                        minHeight: '44px',
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
                              {v.headTitleShow ? (
                                <>
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
                                </>
                              ) : null}
                            </div>
                          </div>
                        </>
                      ) : null}
                      {v.hpOn ? (
                        <>
                          <div
                            style={{
                              position: 'relative',
                              overflow: 'hidden',
                              flex: 'none',
                              alignSelf: 'flex-end',
                              width: '46px',
                              height: '58px',
                              margin: '-4px 0 -14px',
                              borderRadius: '10px 10px 0 0',
                            }}
                          >
                            <div
                              style={{ position: 'absolute', inset: '0', background: str(v.hpBgi) } as CSSProperties}
                            ></div>
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
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
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
                                <svg
                                  viewBox="0 0 24 24"
                                  width="18"
                                  height="18"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  style={{ flex: 'none' }}
                                >
                                  <path d={it?.icon}></path>
                                </svg>
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
                      style={
                        {
                          alignSelf: 'flex-end',
                          width: str(v.subW),
                          maxWidth: '100%',
                          display: 'flex',
                          gap: '4px',
                          padding: '3px',
                          borderRadius: '999px',
                          background: 'var(--panel, oklch(0.2 0.01 60))',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          marginBottom: str(v.subMB),
                          position: str(v.tabPos),
                          top: 'var(--hh,0px)',
                          zIndex: '4',
                          boxShadow: str(v.tabSh),
                        } as CSSProperties
                      }
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
                    {v.jmOpen ? (
                      <>
                        <div onClick={v.jmClose} style={{ position: 'fixed', inset: '0', zIndex: '-1' }}></div>
                        <div
                          style={
                            {
                              position: 'absolute',
                              left: str(v.fabL),
                              right: str(v.fabR),
                              bottom: 'calc(100% + 58px)',
                              minWidth: '200px',
                              maxWidth: 'calc(100% - 28px)',
                              maxHeight: '50vh',
                              overflowY: 'auto',
                              padding: '6px',
                              borderRadius: '12px',
                              background: 'var(--panel, oklch(0.245 0.05 165))',
                              border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                              boxShadow: '0 12px 30px -10px rgba(0,0,0,.6)',
                              display: 'flex',
                              flexDirection: 'column',
                            } as CSSProperties
                          }
                        >
                          <button
                            onClick={v.jmTop}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              textAlign: 'left',
                              minHeight: '40px',
                              padding: '0 12px',
                              border: '0',
                              borderRadius: '8px',
                              background: 'transparent',
                              color: 'var(--mu, oklch(0.78 0.035 120))',
                              font: 'inherit',
                              fontSize: '13px',
                              cursor: 'pointer',
                            }}
                          >
                            <span style={{ color: 'var(--ac, oklch(0.82 0.12 85))' }}>↑</span>Back to top
                          </button>
                          {L(v.jmItems).map((j: any, $index: number) => (
                            <Fragment key={$index}>
                              <button
                                onClick={j?.click}
                                style={
                                  {
                                    textAlign: 'left',
                                    minHeight: '40px',
                                    padding: '0 12px',
                                    border: '0',
                                    borderRadius: '8px',
                                    background: str(j?.bg),
                                    color: str(j?.fg),
                                    font: 'inherit',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                  } as CSSProperties
                                }
                              >
                                {T(j?.l)}
                              </button>
                            </Fragment>
                          ))}
                        </div>
                      </>
                    ) : null}
                    {v.jmOn ? (
                      <>
                        <button
                          onClick={v.jmTog}
                          aria-label="Sections"
                          style={
                            {
                              position: 'absolute',
                              left: str(v.fabL),
                              right: str(v.fabR),
                              top: '-54px',
                              maxWidth: 'calc(100% - 28px)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxSizing: 'border-box',
                              gap: str(v.jmGap),
                              minHeight: '40px',
                              minWidth: str(v.jmMinW),
                              padding: str(v.jmPad),
                              opacity: str(v.jmOp),
                              transition: 'padding .3s ease,gap .3s ease,opacity .3s ease,min-width .3s ease',
                              borderRadius: '999px',
                              border: '1px solid var(--line, oklch(0.42 0.06 110 / .55))',
                              background: 'var(--panel2, oklch(0.3 0.055 165))',
                              color: 'var(--tx, #eee)',
                              font: "600 12px/1 'IBM Plex Sans',sans-serif",
                              cursor: 'pointer',
                              boxShadow: '0 4px 14px rgba(0,0,0,.4)',
                            } as CSSProperties
                          }
                        >
                          <span
                            key={v.jmLabel}
                            style={
                              {
                                animation: `${str(v.jmAnim)} .3s ease`,
                                minWidth: '0',
                                maxWidth: str(v.jmLW),
                                transition: 'max-width .3s ease',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              } as CSSProperties
                            }
                          >
                            {T(v.jmLabel)}
                          </span>
                          <span style={{ color: 'var(--ac, oklch(0.82 0.12 85))' }}>▴</span>
                        </button>
                      </>
                    ) : null}
                    {v.topShow ? (
                      <>
                        <button
                          onClick={v.toTop}
                          aria-label="Back to top"
                          title="Back to top"
                          style={
                            {
                              position: 'absolute',
                              left: str(v.fabL),
                              right: str(v.fabR),
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
                            } as CSSProperties
                          }
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
              {v.mx?.repOn ? (
                <>
                  <div
                    onClick={v.mx?.repClose}
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
                      onClick={v.stopClick}
                      style={{
                        width: 'min(360px,100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        padding: '20px',
                        borderRadius: 'var(--r, 14px)',
                        background: 'var(--panel, oklch(0.2 0.01 60))',
                        border: '1px solid var(--line, oklch(0.29 0.012 60))',
                        boxShadow: '0 24px 70px -12px rgba(0,0,0,.6)',
                      }}
                    >
                      <h2 style={{ margin: '0', font: "600 18px/1.2 'Cinzel',serif" }}>Replace which character?</h2>
                      <span style={{ fontSize: '13px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                        {'Three characters are already selected. '}
                        {T(v.mx?.repName)}
                        {' will take the place of:'}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {L(v.mx?.repOpts).map((o: any, $index: number) => (
                          <Fragment key={$index}>
                            <button
                              onClick={o?.go}
                              style={{
                                minHeight: '44px',
                                padding: '0 14px',
                                borderRadius: '999px',
                                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                                background: 'transparent',
                                color: 'var(--tx, #eee)',
                                font: 'inherit',
                                fontWeight: '600',
                                fontSize: '13px',
                                cursor: 'pointer',
                                textAlign: 'left',
                              }}
                              className="hv-5"
                            >
                              {T(o?.n)}
                            </button>
                          </Fragment>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: str(v.handEnd) } as CSSProperties}>
                        <button
                          onClick={v.mx?.repClose}
                          style={{
                            padding: '7px 12px',
                            borderRadius: '999px',
                            border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                            background: 'transparent',
                            color: 'var(--ac, oklch(0.8 0.11 75))',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
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
                      style={
                        {
                          width: str(v.pkW),
                          maxHeight: 'min(720px,calc(100vh - 32px))',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          padding: '20px',
                          borderRadius: 'var(--r, 14px)',
                          background: 'var(--panel, oklch(0.2 0.01 60))',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          boxShadow: '0 24px 70px -12px rgba(0,0,0,.7)',
                        } as CSSProperties
                      }
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
                          className="hv-6"
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
                            <div
                              style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '2px',
                                padding: '3px',
                                borderRadius: '8px',
                                background: 'var(--bg, oklch(0.16 0.01 60))',
                                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                                alignSelf: 'flex-start',
                              }}
                            >
                              {L(row?.chips).map((c: any, $index: number) => (
                                <Fragment key={$index}>
                                  {c?.noIc ? (
                                    <>
                                      <button
                                        onClick={c?.go}
                                        style={
                                          {
                                            minHeight: '36px',
                                            padding: '0 12px',
                                            border: '0',
                                            borderRadius: '6px',
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
                                    </>
                                  ) : null}
                                  {c?.ic ? (
                                    <>
                                      <button
                                        data-tip="1"
                                        onClick={c?.go}
                                        onMouseEnter={c?.enter}
                                        onMouseLeave={c?.leave}
                                        aria-label={c?.l}
                                        aria-pressed={c?.on}
                                        style={
                                          {
                                            width: '36px',
                                            height: '36px',
                                            padding: '3px',
                                            boxSizing: 'border-box',
                                            borderRadius: '6px',
                                            border: '0',
                                            background: str(c?.bg),
                                            opacity: str(c?.op),
                                            cursor: 'pointer',
                                          } as CSSProperties
                                        }
                                      >
                                        <span
                                          style={
                                            {
                                              display: 'block',
                                              width: '100%',
                                              height: '100%',
                                              borderRadius: '4px',
                                              background: str(c?.bgi),
                                            } as CSSProperties
                                          }
                                        ></span>
                                      </button>
                                    </>
                                  ) : null}
                                </Fragment>
                              ))}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      <div
                        style={
                          {
                            display: 'grid',
                            gridTemplateColumns: str(v.cdCols),
                            gridTemplateRows: 'minmax(0,1fr)',
                            gap: '16px',
                            height: str(v.cdBodyH),
                            minHeight: '0',
                            overflow: 'hidden',
                          } as CSSProperties
                        }
                      >
                        <div
                          style={{
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            minHeight: '120px',
                            minWidth: '0',
                            paddingRight: '4px',
                          }}
                        >
                          {L(v.pkRows).map((r: any, $index: number) => (
                            <Fragment key={$index}>
                              <div
                                data-pkn={r?.n}
                                onClick={r?.pv}
                                style={
                                  {
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'flex-start',
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
                                    flex: 'none',
                                    width: '14px',
                                    font: "600 14px/1.3 'IBM Plex Mono',monospace",
                                    color: 'var(--ac, oklch(0.8 0.11 75))',
                                  }}
                                >
                                  {T(r?.mark)}
                                </span>
                                <span
                                  style={
                                    {
                                      display: str(r?.icD),
                                      flex: 'none',
                                      width: '36px',
                                      height: '36px',
                                      borderRadius: '8px',
                                      background: str(r?.bgi),
                                    } as CSSProperties
                                  }
                                ></span>
                                <span
                                  style={{
                                    flex: '1',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',
                                    minWidth: '0',
                                  }}
                                >
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
                        {v.cdSplit ? (
                          <>
                            <div
                              style={{
                                overflowY: 'auto',
                                minWidth: '0',
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'var(--bg, oklch(0.16 0.01 60))',
                                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                              }}
                            >
                              {v.pkPvOn ? (
                                <>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '0' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          gap: '10px',
                                          alignItems: 'center',
                                          flexWrap: 'wrap',
                                        }}
                                      >
                                        <span
                                          style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}
                                        >
                                          {v.pkPv?.hasIc ? (
                                            <>
                                              <span
                                                style={
                                                  {
                                                    flex: 'none',
                                                    width: '44px',
                                                    height: '44px',
                                                    borderRadius: '8px',
                                                    background: str(v.pkPv?.bgi),
                                                  } as CSSProperties
                                                }
                                              ></span>
                                            </>
                                          ) : null}
                                          <h2
                                            style={{
                                              margin: '0',
                                              font: "600 16px/1.25 'Cinzel',serif",
                                              color: 'var(--ac, oklch(0.82 0.12 85))',
                                            }}
                                          >
                                            {T(v.pkPv?.t)}
                                          </h2>
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                          <span
                                            style={{
                                              font: "500 10px/1 'IBM Plex Mono',monospace",
                                              letterSpacing: '.1em',
                                              textTransform: 'uppercase',
                                              color: 'var(--mu, oklch(0.78 0.035 120))',
                                              textAlign: 'right',
                                            }}
                                          >
                                            {T(v.pkPv?.sub)}
                                          </span>
                                        </span>
                                      </div>
                                      {v.pkPv?.hasSt ? (
                                        <>
                                          <span
                                            style={{
                                              font: "500 11px/1.4 'IBM Plex Mono',monospace",
                                              color: 'var(--ac, oklch(0.82 0.12 85))',
                                            }}
                                          >
                                            {T(v.pkPv?.st)}
                                          </span>
                                        </>
                                      ) : null}
                                      {v.pkPv?.hasE ? (
                                        <>
                                          <span style={{ fontSize: '13px', lineHeight: '1.45', textWrap: 'pretty' }}>
                                            {T(v.pkPv?.e)}
                                          </span>
                                        </>
                                      ) : null}
                                    </div>
                                    {v.pkPv?.hasStats ? (
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
                                            Stats
                                          </span>
                                          <div
                                            style={{
                                              display: 'grid',
                                              gridTemplateColumns: 'repeat(auto-fill,minmax(64px,1fr))',
                                              gap: '4px',
                                            }}
                                          >
                                            {L(v.pkPv?.stats).map((x: any, $index: number) => (
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
                                                    {T(x?.l)}
                                                  </span>
                                                  <span style={{ font: "600 12px/1 'IBM Plex Mono',monospace" }}>
                                                    {T(x?.v)}
                                                  </span>
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
                                            {T(v.pkPv?.statNote)}
                                          </span>
                                        </div>
                                      </>
                                    ) : null}
                                    {v.pkPv?.hasRf ? (
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
                                            Refine level
                                          </span>
                                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {L(v.pkPv?.rf).map((o: any, $index: number) => (
                                              <Fragment key={$index}>
                                                <button
                                                  onClick={o?.go}
                                                  style={
                                                    {
                                                      minWidth: '44px',
                                                      height: '36px',
                                                      padding: '0 10px',
                                                      boxSizing: 'border-box',
                                                      borderRadius: '8px',
                                                      border: `1px solid ${str(o?.bd)}`,
                                                      background: str(o?.bg),
                                                      color: 'var(--tx, #eee)',
                                                      cursor: 'pointer',
                                                      font: "600 12px/1 'IBM Plex Mono',monospace",
                                                    } as CSSProperties
                                                  }
                                                >
                                                  {T(o?.l)}
                                                </button>
                                              </Fragment>
                                            ))}
                                          </div>
                                          {v.pkPv?.hasRc ? (
                                            <>
                                              <span
                                                style={{
                                                  font: "500 11px/1.4 'IBM Plex Mono',monospace",
                                                  color: 'var(--mu, oklch(0.78 0.035 120))',
                                                }}
                                              >
                                                {T(v.pkPv?.rc)}
                                              </span>
                                            </>
                                          ) : null}
                                        </div>
                                      </>
                                    ) : null}
                                    {v.pkPv?.hasGa ? (
                                      <>
                                        <div
                                          style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px',
                                            padding: '8px 10px',
                                            borderRadius: '10px',
                                            border: '1px dashed var(--ac, oklch(0.8 0.11 75))',
                                          }}
                                        >
                                          <span
                                            style={{
                                              font: "500 10px/1 'IBM Plex Mono',monospace",
                                              letterSpacing: '.14em',
                                              textTransform: 'uppercase',
                                              color: 'var(--ac, oklch(0.8 0.11 75))',
                                            }}
                                          >
                                            Grants combat art
                                          </span>
                                          <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(v.pkPv?.ga)}</span>
                                          <span
                                            style={{
                                              font: "500 10px/1.4 'IBM Plex Mono',monospace",
                                              color: 'var(--mu, oklch(0.78 0.035 120))',
                                            }}
                                          >
                                            {T(v.pkPv?.gaNote)}
                                            {' · not counted toward the combat art limit'}
                                          </span>
                                        </div>
                                      </>
                                    ) : null}
                                    {v.pkPv?.hasWho ? (
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
                                            Learned by · rank
                                          </span>
                                          <div
                                            style={{
                                              display: 'grid',
                                              gridTemplateColumns: 'auto minmax(0,1fr)',
                                              gap: '4px 10px',
                                              alignItems: 'baseline',
                                            }}
                                          >
                                            {L(v.pkPv?.whoGroups).map((g: any, $index: number) => (
                                              <Fragment key={$index}>
                                                <span
                                                  style={{
                                                    font: "600 11px/1.4 'IBM Plex Mono',monospace",
                                                    color: 'var(--ac, oklch(0.82 0.12 85))',
                                                  }}
                                                >
                                                  {T(g?.rank)}
                                                </span>
                                                <span style={{ fontSize: '12px', textWrap: 'pretty' }}>
                                                  {T(g?.names)}
                                                </span>
                                              </Fragment>
                                            ))}
                                          </div>
                                        </div>
                                      </>
                                    ) : null}
                                    <div
                                      style={{
                                        position: 'sticky',
                                        bottom: '-16px',
                                        margin: '0 -16px -16px',
                                        padding: '12px 16px 16px',
                                        background: 'var(--bg, oklch(0.16 0.01 60))',
                                        borderTop: '1px solid var(--line, oklch(0.29 0.012 60))',
                                        display: 'flex',
                                        flexDirection: 'column',
                                      }}
                                    >
                                      <button
                                        onClick={v.pkPickPv}
                                        style={
                                          {
                                            minHeight: '44px',
                                            padding: '10px 16px',
                                            borderRadius: '999px',
                                            border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                                            background: str(v.pkPickBg),
                                            color: str(v.pkPickFg),
                                            opacity: str(v.pkPickOp),
                                            fontWeight: '600',
                                            cursor: str(v.pkPickCur),
                                          } as CSSProperties
                                        }
                                      >
                                        {T(v.pkPickLbl)}
                                      </button>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                              {v.pkPvOff ? (
                                <>
                                  <span style={{ fontSize: '13px', color: 'var(--mu, oklch(0.78 0.035 120))' }}>
                                    Select a row to preview.
                                  </span>
                                </>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div style={{ display: 'flex', justifyContent: str(v.handEnd) } as CSSProperties}>
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
                          className="hv-11"
                        >
                          Done
                        </button>
                      </div>
                      {v.pkSheet ? (
                        <>
                          <div
                            onClick={v.sheetScrim}
                            style={{ position: 'fixed', inset: '0', zIndex: '91', touchAction: 'none' }}
                          ></div>
                          <div
                            data-sheet="1"
                            onClick={v.sheetClick}
                            style={
                              {
                                position: 'fixed',
                                left: '0',
                                right: '0',
                                bottom: '0',
                                zIndex: '92',
                                maxHeight: '80vh',
                                transform: str(v.pkTf),
                                transition: 'transform .25s cubic-bezier(.2,.8,.2,1)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto',
                                boxSizing: 'border-box',
                                padding: '16px 16px calc(16px + env(safe-area-inset-bottom))',
                                borderRadius: '16px 16px 0 0',
                                background: 'var(--bg, oklch(0.16 0.01 60))',
                                border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                                borderBottom: '0',
                                boxShadow: '0 -18px 50px -12px rgba(0,0,0,.6)',
                              } as CSSProperties
                            }
                          >
                            <div
                              onPointerDown={v.sheetDown}
                              onPointerMove={v.sheetMove}
                              onPointerUp={v.sheetUp}
                              onPointerCancel={v.sheetUp}
                              onClick={v.stopClick}
                              role="separator"
                              aria-label="Resize"
                              style={
                                {
                                  position: 'sticky',
                                  top: '-16px',
                                  zIndex: '2',
                                  display: str(v.sheetHD),
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flex: 'none',
                                  height: '28px',
                                  margin: '-16px -16px 0',
                                  background: 'inherit',
                                  borderRadius: '16px 16px 0 0',
                                  touchAction: 'none',
                                  cursor: 'ns-resize',
                                } as CSSProperties
                              }
                            >
                              <span
                                style={{
                                  width: '40px',
                                  height: '4px',
                                  borderRadius: '2px',
                                  background: 'var(--mu, oklch(0.7 0.01 70))',
                                }}
                              ></span>
                            </div>
                            <div
                              style={{
                                flex: '1 0 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                minWidth: '0',
                              }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                  <div
                                    style={
                                      {
                                        display: 'flex',
                                        flexDirection: str(v.handDir),
                                        alignItems: 'center',
                                      } as CSSProperties
                                    }
                                  >
                                    <span style={{ flex: '1' }}></span>
                                    <span
                                      style={
                                        {
                                          display: 'flex',
                                          flexDirection: str(v.handDir),
                                          alignItems: 'center',
                                          gap: '6px',
                                        } as CSSProperties
                                      }
                                    >
                                      <span
                                        style={{
                                          font: "500 10px/1 'IBM Plex Mono',monospace",
                                          letterSpacing: '.1em',
                                          textTransform: 'uppercase',
                                          color: 'var(--mu, oklch(0.78 0.035 120))',
                                          textAlign: 'right',
                                        }}
                                      >
                                        {T(v.pkPv?.sub)}
                                      </span>
                                      <button
                                        onClick={v.sheetClose}
                                        aria-label="Close preview"
                                        style={{
                                          flex: 'none',
                                          width: '44px',
                                          height: '44px',
                                          border: '0',
                                          borderRadius: '50%',
                                          background: 'transparent',
                                          cursor: 'pointer',
                                          color: 'var(--mu, oklch(0.78 0.035 120))',
                                          fontSize: '20px',
                                        }}
                                      >
                                        ×
                                      </button>
                                    </span>
                                  </div>
                                  <span
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '10px',
                                      minWidth: '0',
                                      alignSelf: 'flex-start',
                                      justifyContent: 'flex-start',
                                    }}
                                  >
                                    {v.pkPv?.hasIc ? (
                                      <>
                                        <span
                                          style={
                                            {
                                              flex: 'none',
                                              width: '44px',
                                              height: '44px',
                                              borderRadius: '8px',
                                              background: str(v.pkPv?.bgi),
                                            } as CSSProperties
                                          }
                                        ></span>
                                      </>
                                    ) : null}
                                    <h2
                                      style={{
                                        margin: '0',
                                        font: "600 16px/1.25 'Cinzel',serif",
                                        color: 'var(--ac, oklch(0.82 0.12 85))',
                                      }}
                                    >
                                      {T(v.pkPv?.t)}
                                    </h2>
                                  </span>
                                </div>
                                {v.pkPv?.hasSt ? (
                                  <>
                                    <span
                                      style={{
                                        font: "500 11px/1.4 'IBM Plex Mono',monospace",
                                        color: 'var(--ac, oklch(0.82 0.12 85))',
                                      }}
                                    >
                                      {T(v.pkPv?.st)}
                                    </span>
                                  </>
                                ) : null}
                                {v.pkPv?.hasE ? (
                                  <>
                                    <span style={{ fontSize: '13px', lineHeight: '1.45', textWrap: 'pretty' }}>
                                      {T(v.pkPv?.e)}
                                    </span>
                                  </>
                                ) : null}
                              </div>
                              {v.pkPv?.hasStats ? (
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
                                      Stats
                                    </span>
                                    <div
                                      style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill,minmax(64px,1fr))',
                                        gap: '4px',
                                      }}
                                    >
                                      {L(v.pkPv?.stats).map((x: any, $index: number) => (
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
                                              {T(x?.l)}
                                            </span>
                                            <span style={{ font: "600 12px/1 'IBM Plex Mono',monospace" }}>
                                              {T(x?.v)}
                                            </span>
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
                                      {T(v.pkPv?.statNote)}
                                    </span>
                                  </div>
                                </>
                              ) : null}
                              {v.pkPv?.hasRf ? (
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
                                      Refine level
                                    </span>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                      {L(v.pkPv?.rf).map((o: any, $index: number) => (
                                        <Fragment key={$index}>
                                          <button
                                            onClick={o?.go}
                                            style={
                                              {
                                                minWidth: '44px',
                                                height: '36px',
                                                padding: '0 10px',
                                                boxSizing: 'border-box',
                                                borderRadius: '8px',
                                                border: `1px solid ${str(o?.bd)}`,
                                                background: str(o?.bg),
                                                color: 'var(--tx, #eee)',
                                                cursor: 'pointer',
                                                font: "600 12px/1 'IBM Plex Mono',monospace",
                                              } as CSSProperties
                                            }
                                          >
                                            {T(o?.l)}
                                          </button>
                                        </Fragment>
                                      ))}
                                    </div>
                                    {v.pkPv?.hasRc ? (
                                      <>
                                        <span
                                          style={{
                                            font: "500 11px/1.4 'IBM Plex Mono',monospace",
                                            color: 'var(--mu, oklch(0.78 0.035 120))',
                                          }}
                                        >
                                          {T(v.pkPv?.rc)}
                                        </span>
                                      </>
                                    ) : null}
                                  </div>
                                </>
                              ) : null}
                              {v.pkPv?.hasGa ? (
                                <>
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '4px',
                                      padding: '8px 10px',
                                      borderRadius: '10px',
                                      border: '1px dashed var(--ac, oklch(0.8 0.11 75))',
                                    }}
                                  >
                                    <span
                                      style={{
                                        font: "500 10px/1 'IBM Plex Mono',monospace",
                                        letterSpacing: '.14em',
                                        textTransform: 'uppercase',
                                        color: 'var(--ac, oklch(0.8 0.11 75))',
                                      }}
                                    >
                                      Grants combat art
                                    </span>
                                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(v.pkPv?.ga)}</span>
                                    <span
                                      style={{
                                        font: "500 10px/1.4 'IBM Plex Mono',monospace",
                                        color: 'var(--mu, oklch(0.78 0.035 120))',
                                      }}
                                    >
                                      {T(v.pkPv?.gaNote)}
                                      {' · not counted toward the combat art limit'}
                                    </span>
                                  </div>
                                </>
                              ) : null}
                              {v.pkPv?.hasWho ? (
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
                                      Learned by · rank
                                    </span>
                                    <div
                                      style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'auto minmax(0,1fr)',
                                        gap: '4px 10px',
                                        alignItems: 'baseline',
                                      }}
                                    >
                                      {L(v.pkPv?.whoGroups).map((g: any, $index: number) => (
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
                                  </div>
                                </>
                              ) : null}
                              <div
                                style={{
                                  position: 'sticky',
                                  bottom: '-16px',
                                  margin: 'auto -16px -16px',
                                  padding: '12px 16px 16px',
                                  background: 'var(--bg, oklch(0.16 0.01 60))',
                                  borderTop: '1px solid var(--line, oklch(0.29 0.012 60))',
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <button
                                  onClick={v.pkPickPv}
                                  style={
                                    {
                                      minHeight: '44px',
                                      padding: '10px 16px',
                                      borderRadius: '999px',
                                      border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                                      background: str(v.pkPickBg),
                                      color: str(v.pkPickFg),
                                      opacity: str(v.pkPickOp),
                                      fontWeight: '600',
                                      cursor: str(v.pkPickCur),
                                    } as CSSProperties
                                  }
                                >
                                  {T(v.pkPickLbl)}
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
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
                      style={
                        {
                          width: str(v.cdW),
                          maxHeight: 'min(720px,calc(100vh - 32px))',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          padding: '20px',
                          borderRadius: 'var(--r, 14px)',
                          background: 'var(--panel, oklch(0.2 0.01 60))',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          boxShadow: '0 24px 70px -12px rgba(0,0,0,.7)',
                        } as CSSProperties
                      }
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
                          className="hv-6"
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
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '2px',
                          padding: '3px',
                          borderRadius: '8px',
                          background: 'var(--bg, oklch(0.16 0.01 60))',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          alignSelf: 'flex-start',
                        }}
                      >
                        {L(v.cdChips).map((c: any, $index: number) => (
                          <Fragment key={$index}>
                            <button
                              onClick={c?.go}
                              style={
                                {
                                  minHeight: '36px',
                                  padding: '0 12px',
                                  border: '0',
                                  borderRadius: '6px',
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
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '2px',
                          padding: '3px',
                          borderRadius: '8px',
                          background: 'var(--bg, oklch(0.16 0.01 60))',
                          border: '1px solid var(--line, oklch(0.29 0.012 60))',
                          alignSelf: 'flex-start',
                        }}
                      >
                        <button
                          onClick={v.cdSkAll}
                          aria-pressed={v.cdSkAllOn}
                          style={
                            {
                              height: '36px',
                              padding: '0 12px',
                              boxSizing: 'border-box',
                              borderRadius: '6px',
                              border: '0',
                              background: str(v.cdSkAllBg),
                              color: 'var(--tx, #eee)',
                              cursor: 'pointer',
                              fontSize: '12px',
                            } as CSSProperties
                          }
                        >
                          All
                        </button>
                        {L(v.cdSkIcons).map((o: any, $index: number) => (
                          <Fragment key={$index}>
                            <button
                              data-tip="1"
                              onClick={o?.click}
                              onMouseEnter={o?.enter}
                              onMouseLeave={o?.leave}
                              aria-label={o?.n}
                              aria-pressed={o?.on}
                              style={
                                {
                                  width: '36px',
                                  height: '36px',
                                  padding: '3px',
                                  boxSizing: 'border-box',
                                  borderRadius: '6px',
                                  border: '0',
                                  background: str(o?.bg),
                                  opacity: str(o?.op),
                                  cursor: 'pointer',
                                } as CSSProperties
                              }
                            >
                              <span
                                style={
                                  {
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '4px',
                                    background: str(o?.bgi),
                                  } as CSSProperties
                                }
                              ></span>
                            </button>
                          </Fragment>
                        ))}
                      </div>
                      <div
                        style={
                          {
                            display: 'grid',
                            gridTemplateColumns: str(v.cdCols),
                            gridTemplateRows: 'minmax(0,1fr)',
                            gap: '16px',
                            height: str(v.cdBodyH),
                            minHeight: '0',
                            overflow: 'hidden',
                          } as CSSProperties
                        }
                      >
                        <div
                          style={{
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            minHeight: '120px',
                            minWidth: '0',
                            paddingRight: '4px',
                          }}
                        >
                          {L(v.cdRows).map((r: any, $index: number) => (
                            <Fragment key={$index}>
                              <div
                                onClick={r?.go}
                                style={
                                  {
                                    display: 'grid',
                                    gridTemplateColumns: '24px 36px 1fr auto',
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
                                <span
                                  style={
                                    {
                                      alignSelf: 'center',
                                      width: '36px',
                                      height: '36px',
                                      borderRadius: '8px',
                                      background: str(r?.bgi),
                                    } as CSSProperties
                                  }
                                ></span>
                                <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                                  <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{T(r?.n)}</span>
                                    {L(r?.badges).map((b: any, $index: number) => (
                                      <Fragment key={$index}>
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
                                          {T(b?.l)}
                                        </span>
                                      </Fragment>
                                    ))}
                                  </span>
                                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {L(r?.skl).map((a: any, $index: number) => (
                                      <Fragment key={$index}>
                                        {a?.ic ? (
                                          <>
                                            <span
                                              data-tip="1"
                                              onMouseEnter={a?.enter}
                                              onMouseLeave={a?.leave}
                                              onClick={a?.enter}
                                              aria-label={a?.n}
                                              style={
                                                {
                                                  width: '24px',
                                                  height: '24px',
                                                  borderRadius: '5px',
                                                  background: str(a?.bgi),
                                                  cursor: 'help',
                                                } as CSSProperties
                                              }
                                            ></span>
                                          </>
                                        ) : null}
                                        {a?.noIc ? (
                                          <>
                                            <span style={{ fontSize: '12px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                                              {T(a?.n)}
                                            </span>
                                          </>
                                        ) : null}
                                      </Fragment>
                                    ))}
                                  </span>
                                  {r?.subOn ? (
                                    <>
                                      <span
                                        style={{
                                          fontSize: '12px',
                                          color: 'var(--mu, oklch(0.7 0.01 70))',
                                          textWrap: 'pretty',
                                        }}
                                      >
                                        {T(r?.sub)}
                                      </span>
                                    </>
                                  ) : null}
                                  {r?.isLock ? (
                                    <>
                                      <span
                                        style={{ fontSize: '12px', color: 'oklch(0.74 0.12 30)', textWrap: 'pretty' }}
                                      >
                                        {T(r?.lock)}
                                      </span>
                                    </>
                                  ) : null}
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
                        {v.cdSplit ? (
                          <>
                            <div
                              style={{
                                overflowY: 'auto',
                                minWidth: '0',
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'var(--bg, oklch(0.16 0.01 60))',
                                border: '1px solid var(--line, oklch(0.29 0.012 60))',
                              }}
                            >
                              {v.cdPvOn ? (
                                <>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '0' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          gap: '10px',
                                          alignItems: 'center',
                                          flexWrap: 'wrap',
                                        }}
                                      >
                                        <span
                                          style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}
                                        >
                                          <span
                                            style={
                                              {
                                                flex: 'none',
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '8px',
                                                background: str(v.cdPv?.bgi),
                                              } as CSSProperties
                                            }
                                          ></span>
                                          <h2
                                            style={{
                                              margin: '0',
                                              font: "600 16px/1.25 'Cinzel',serif",
                                              color: 'var(--ac, oklch(0.82 0.12 85))',
                                            }}
                                          >
                                            {T(v.cdPv?.t)}
                                          </h2>
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                          <span
                                            style={{
                                              font: "500 10px/1 'IBM Plex Mono',monospace",
                                              letterSpacing: '.1em',
                                              textTransform: 'uppercase',
                                              color: 'var(--mu, oklch(0.78 0.035 120))',
                                              textAlign: 'right',
                                            }}
                                          >
                                            {T(v.cdPv?.sub)}
                                          </span>
                                        </span>
                                      </div>
                                      {v.cdPv?.hasSk ? (
                                        <>
                                          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {L(v.cdPv?.skIcons).map((x: any, $index: number) => (
                                              <Fragment key={$index}>
                                                <span
                                                  data-tip="1"
                                                  onMouseEnter={x?.enter}
                                                  onMouseLeave={x?.leave}
                                                  onClick={x?.enter}
                                                  aria-label={x?.n}
                                                  style={
                                                    {
                                                      width: '32px',
                                                      height: '32px',
                                                      borderRadius: '6px',
                                                      background: str(x?.bgi),
                                                      cursor: 'help',
                                                    } as CSSProperties
                                                  }
                                                ></span>
                                              </Fragment>
                                            ))}
                                          </span>
                                        </>
                                      ) : null}
                                      {v.cdPv?.note ? (
                                        <>
                                          <span
                                            style={{
                                              font: "500 11px/1.4 'IBM Plex Mono',monospace",
                                              color: 'var(--mu, oklch(0.78 0.035 120))',
                                            }}
                                          >
                                            {T(v.cdPv?.note)}
                                          </span>
                                        </>
                                      ) : null}
                                      {v.cdPv?.body ? (
                                        <>
                                          <span
                                            style={
                                              {
                                                fontSize: '13px',
                                                lineHeight: '1.45',
                                                textWrap: 'pretty',
                                                color: str(v.cdPv?.bodyCol),
                                              } as CSSProperties
                                            }
                                          >
                                            {T(v.cdPv?.body)}
                                          </span>
                                        </>
                                      ) : null}
                                    </div>
                                    {v.cdPv?.hasGrids ? (
                                      <>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                          {L(v.cdPv?.grids).map((g: any, $index: number) => (
                                            <Fragment key={$index}>
                                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                <span
                                                  style={{
                                                    font: "500 10px/1 'IBM Plex Mono',monospace",
                                                    letterSpacing: '.14em',
                                                    textTransform: 'uppercase',
                                                    color: 'var(--mu, oklch(0.78 0.035 120))',
                                                  }}
                                                >
                                                  {T(g?.lbl)}
                                                </span>
                                                <div
                                                  style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(9,minmax(0,1fr))',
                                                    gap: '4px',
                                                  }}
                                                >
                                                  {L(g?.cells).map((x: any, $index: number) => (
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
                                            </Fragment>
                                          ))}
                                        </div>
                                      </>
                                    ) : null}
                                    {v.cdPv?.hasGroups ? (
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
                                          {L(v.cdPv?.abs).map((a: any, $index: number) => (
                                            <Fragment key={$index}>
                                              <div
                                                style={
                                                  {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '4px',
                                                    padding: '8px 10px',
                                                    borderRadius: '10px',
                                                    border: `1px ${str(a?.dashed)} var(--line, oklch(0.42 0.06 110 / .55))`,
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
                                                  <span
                                                    style={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      gap: '8px',
                                                      minWidth: '0',
                                                    }}
                                                  >
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
                                                    <span style={{ fontWeight: '600', fontSize: '13px' }}>
                                                      {T(a?.n)}
                                                    </span>
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
                                              </div>
                                            </Fragment>
                                          ))}
                                        </div>
                                      </>
                                    ) : null}
                                    <div
                                      style={{
                                        position: 'sticky',
                                        bottom: '-16px',
                                        margin: '0 -16px -16px',
                                        padding: '12px 16px 16px',
                                        background: 'var(--bg, oklch(0.16 0.01 60))',
                                        borderTop: '1px solid var(--line, oklch(0.29 0.012 60))',
                                        display: 'flex',
                                        flexDirection: 'column',
                                      }}
                                    >
                                      <button
                                        onClick={v.cdPickPv}
                                        style={
                                          {
                                            minHeight: '44px',
                                            padding: '10px 16px',
                                            borderRadius: '999px',
                                            border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                                            background: str(v.cdPickBg),
                                            color: str(v.cdPickFg),
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                          } as CSSProperties
                                        }
                                      >
                                        {T(v.cdPickLbl)}
                                      </button>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                              {v.cdPvOff ? (
                                <>
                                  <span style={{ fontSize: '13px', color: 'var(--mu, oklch(0.7 0.01 70))' }}>
                                    Select a row to preview the class.
                                  </span>
                                </>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div style={{ display: 'flex', justifyContent: str(v.handEnd) } as CSSProperties}>
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
                          className="hv-11"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    {v.cdSheet ? (
                      <>
                        <div
                          onClick={v.sheetScrim}
                          style={{ position: 'fixed', inset: '0', zIndex: '91', touchAction: 'none' }}
                        ></div>
                        <div
                          data-sheet="1"
                          onClick={v.sheetClick}
                          style={
                            {
                              position: 'fixed',
                              left: '0',
                              right: '0',
                              bottom: '0',
                              zIndex: '92',
                              maxHeight: '80vh',
                              transform: str(v.cdTf),
                              transition: 'transform .25s cubic-bezier(.2,.8,.2,1)',
                              display: 'flex',
                              flexDirection: 'column',
                              overflowY: 'auto',
                              boxSizing: 'border-box',
                              padding: '16px 16px calc(16px + env(safe-area-inset-bottom))',
                              borderRadius: '16px 16px 0 0',
                              background: 'var(--bg, oklch(0.16 0.01 60))',
                              border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                              borderBottom: '0',
                              boxShadow: '0 -18px 50px -12px rgba(0,0,0,.6)',
                            } as CSSProperties
                          }
                        >
                          <div
                            onPointerDown={v.sheetDown}
                            onPointerMove={v.sheetMove}
                            onPointerUp={v.sheetUp}
                            onPointerCancel={v.sheetUp}
                            onClick={v.stopClick}
                            role="separator"
                            aria-label="Resize"
                            style={
                              {
                                position: 'sticky',
                                top: '-16px',
                                zIndex: '2',
                                display: str(v.sheetHD),
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 'none',
                                height: '28px',
                                margin: '-16px -16px 0',
                                background: 'inherit',
                                borderRadius: '16px 16px 0 0',
                                touchAction: 'none',
                                cursor: 'ns-resize',
                              } as CSSProperties
                            }
                          >
                            <span
                              style={{
                                width: '40px',
                                height: '4px',
                                borderRadius: '2px',
                                background: 'var(--mu, oklch(0.7 0.01 70))',
                              }}
                            ></span>
                          </div>
                          <div
                            style={{
                              flex: '1 0 auto',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '16px',
                              minWidth: '0',
                            }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                <div
                                  style={
                                    {
                                      display: 'flex',
                                      flexDirection: str(v.handDir),
                                      alignItems: 'center',
                                    } as CSSProperties
                                  }
                                >
                                  <span style={{ flex: '1' }}></span>
                                  <span
                                    style={
                                      {
                                        display: 'flex',
                                        flexDirection: str(v.handDir),
                                        alignItems: 'center',
                                        gap: '6px',
                                      } as CSSProperties
                                    }
                                  >
                                    <span
                                      style={{
                                        font: "500 10px/1 'IBM Plex Mono',monospace",
                                        letterSpacing: '.1em',
                                        textTransform: 'uppercase',
                                        color: 'var(--mu, oklch(0.78 0.035 120))',
                                        textAlign: 'right',
                                      }}
                                    >
                                      {T(v.cdPv?.sub)}
                                    </span>
                                    <button
                                      onClick={v.sheetClose}
                                      aria-label="Close preview"
                                      style={{
                                        flex: 'none',
                                        width: '44px',
                                        height: '44px',
                                        border: '0',
                                        borderRadius: '50%',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        color: 'var(--mu, oklch(0.78 0.035 120))',
                                        fontSize: '20px',
                                      }}
                                    >
                                      ×
                                    </button>
                                  </span>
                                </div>
                                <span
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    minWidth: '0',
                                    alignSelf: 'flex-start',
                                    justifyContent: 'flex-start',
                                  }}
                                >
                                  <span
                                    style={
                                      {
                                        flex: 'none',
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '8px',
                                        background: str(v.cdPv?.bgi),
                                      } as CSSProperties
                                    }
                                  ></span>
                                  <h2
                                    style={{
                                      margin: '0',
                                      font: "600 16px/1.25 'Cinzel',serif",
                                      color: 'var(--ac, oklch(0.82 0.12 85))',
                                    }}
                                  >
                                    {T(v.cdPv?.t)}
                                  </h2>
                                </span>
                              </div>
                              {v.cdPv?.hasSk ? (
                                <>
                                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {L(v.cdPv?.skIcons).map((x: any, $index: number) => (
                                      <Fragment key={$index}>
                                        <span
                                          data-tip="1"
                                          onMouseEnter={x?.enter}
                                          onMouseLeave={x?.leave}
                                          onClick={x?.enter}
                                          aria-label={x?.n}
                                          style={
                                            {
                                              width: '32px',
                                              height: '32px',
                                              borderRadius: '6px',
                                              background: str(x?.bgi),
                                              cursor: 'help',
                                            } as CSSProperties
                                          }
                                        ></span>
                                      </Fragment>
                                    ))}
                                  </span>
                                </>
                              ) : null}
                              {v.cdPv?.note ? (
                                <>
                                  <span
                                    style={{
                                      font: "500 11px/1.4 'IBM Plex Mono',monospace",
                                      color: 'var(--mu, oklch(0.78 0.035 120))',
                                    }}
                                  >
                                    {T(v.cdPv?.note)}
                                  </span>
                                </>
                              ) : null}
                              {v.cdPv?.body ? (
                                <>
                                  <span
                                    style={
                                      {
                                        fontSize: '13px',
                                        lineHeight: '1.45',
                                        textWrap: 'pretty',
                                        color: str(v.cdPv?.bodyCol),
                                      } as CSSProperties
                                    }
                                  >
                                    {T(v.cdPv?.body)}
                                  </span>
                                </>
                              ) : null}
                            </div>
                            {v.cdPv?.hasGrids ? (
                              <>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {L(v.cdPv?.grids).map((g: any, $index: number) => (
                                    <Fragment key={$index}>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <span
                                          style={{
                                            font: "500 10px/1 'IBM Plex Mono',monospace",
                                            letterSpacing: '.14em',
                                            textTransform: 'uppercase',
                                            color: 'var(--mu, oklch(0.78 0.035 120))',
                                          }}
                                        >
                                          {T(g?.lbl)}
                                        </span>
                                        <div
                                          style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(9,minmax(0,1fr))',
                                            gap: '4px',
                                          }}
                                        >
                                          {L(g?.cells).map((x: any, $index: number) => (
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
                                    </Fragment>
                                  ))}
                                </div>
                              </>
                            ) : null}
                            {v.cdPv?.hasGroups ? (
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
                                  {L(v.cdPv?.abs).map((a: any, $index: number) => (
                                    <Fragment key={$index}>
                                      <div
                                        style={
                                          {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px',
                                            padding: '8px 10px',
                                            borderRadius: '10px',
                                            border: `1px ${str(a?.dashed)} var(--line, oklch(0.42 0.06 110 / .55))`,
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
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              </>
                            ) : null}
                            <div
                              style={{
                                position: 'sticky',
                                bottom: '-16px',
                                margin: 'auto -16px -16px',
                                padding: '12px 16px 16px',
                                background: 'var(--bg, oklch(0.16 0.01 60))',
                                borderTop: '1px solid var(--line, oklch(0.29 0.012 60))',
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <button
                                onClick={v.cdPickPv}
                                style={
                                  {
                                    minHeight: '44px',
                                    padding: '10px 16px',
                                    borderRadius: '999px',
                                    border: '1px solid var(--ac, oklch(0.8 0.11 75))',
                                    background: str(v.cdPickBg),
                                    color: str(v.cdPickFg),
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                  } as CSSProperties
                                }
                              >
                                {T(v.cdPickLbl)}
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </>
              ) : null}
              {v.afOn ? (
                <>
                  <div
                    style={
                      {
                        position: 'fixed',
                        left: str(v.afTip?.x),
                        top: str(v.afTip?.y),
                        transform: 'translateY(-100%)',
                        zIndex: '95',
                        maxWidth: 'calc(100vw - 24px)',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'var(--panel2, oklch(0.3 0.055 165))',
                        border: '1px solid var(--ac, oklch(0.82 0.12 85))',
                        boxShadow: '0 18px 50px -12px rgba(0,0,0,.6)',
                        pointerEvents: 'none',
                        fontSize: '13px',
                        lineHeight: '1.3',
                        color: 'var(--tx, oklch(0.94 0.008 80))',
                      } as CSSProperties
                    }
                  >
                    {T(v.afTip?.t)}
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
                      style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '0' }}>
                        {v.tip?.hasIc ? (
                          <>
                            <span
                              style={
                                {
                                  flex: 'none',
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '6px',
                                  background: str(v.tip?.bgi),
                                } as CSSProperties
                              }
                            ></span>
                          </>
                        ) : null}
                        <span style={{ font: "600 16px/1.25 'Cinzel',serif", color: 'var(--ac, oklch(0.82 0.12 85))' }}>
                          {T(v.tip?.t)}
                        </span>
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
                    {v.tip?.hasSk ? (
                      <>
                        <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {L(v.tip?.skIcons).map((x: any, $index: number) => (
                            <Fragment key={$index}>
                              <span
                                style={
                                  {
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '5px',
                                    background: str(x?.bgi),
                                  } as CSSProperties
                                }
                              ></span>
                            </Fragment>
                          ))}
                        </span>
                      </>
                    ) : null}
                    <span
                      style={
                        {
                          fontSize: '13px',
                          lineHeight: '1.45',
                          whiteSpace: 'pre-line',
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
                    {v.tip?.hasGrids ? (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {L(v.tip?.grids).map((g: any, $index: number) => (
                            <Fragment key={$index}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <span
                                  style={{
                                    font: "500 10px/1 'IBM Plex Mono',monospace",
                                    letterSpacing: '.14em',
                                    textTransform: 'uppercase',
                                    color: 'var(--mu, oklch(0.78 0.035 120))',
                                  }}
                                >
                                  {T(g?.lbl)}
                                </span>
                                <div
                                  style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(9,minmax(0,1fr))',
                                    gap: '4px',
                                  }}
                                >
                                  {L(g?.cells).map((x: any, $index: number) => (
                                    <Fragment key={$index}>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          gap: '3px',
                                          padding: '7px 0',
                                          borderRadius: '6px',
                                          background: 'var(--panel, oklch(0.2 0.01 60))',
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
                            </Fragment>
                          ))}
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
                                    <span
                                      style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                        fontSize: '12px',
                                        textWrap: 'pretty',
                                      }}
                                    >
                                      <span
                                        style={
                                          {
                                            flex: 'none',
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '4px',
                                            background: str(g?.bgi),
                                          } as CSSProperties
                                        }
                                      ></span>
                                      <span>{T(g?.names)}</span>
                                    </span>
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
