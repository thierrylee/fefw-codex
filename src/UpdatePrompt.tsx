import { useEffect, useState, type CSSProperties } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

const CHECK_EVERY_MS = 60 * 60 * 1000

/** Toasts for the service worker: "available offline" once, then "update ready" when a new version is published. */
export function UpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, reg) {
      if (!reg) return
      // Look for a new version hourly and whenever the app comes back to the foreground.
      setInterval(() => navigator.onLine && reg.update(), CHECK_EVERY_MS)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && navigator.onLine) reg.update()
      })
    },
  })
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!offlineReady) return
    const t = setTimeout(() => setOfflineReady(false), 4000)
    return () => clearTimeout(t)
  }, [offlineReady, setOfflineReady])

  if (needRefresh && !hidden)
    return (
      <div role="status" style={toast}>
        <span>A new version of the codex is available.</span>
        <button style={primary} onClick={() => updateServiceWorker(true)}>
          Reload
        </button>
        <button
          style={secondary}
          onClick={() => {
            setHidden(true)
            setNeedRefresh(false)
          }}
        >
          Later
        </button>
      </div>
    )
  if (offlineReady)
    return (
      <div role="status" style={toast}>
        <span>Ready to use offline.</span>
      </div>
    )
  return null
}

const toast: CSSProperties = {
  position: 'fixed',
  left: '50%',
  bottom: 'calc(84px + env(safe-area-inset-bottom))',
  transform: 'translateX(-50%)',
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  maxWidth: 'calc(100vw - 32px)',
  padding: '10px 12px 10px 16px',
  borderRadius: 12,
  background: 'oklch(0.3 0.055 165)',
  border: '1px solid oklch(0.82 0.12 85 / .5)',
  color: 'oklch(0.95 0.02 90)',
  font: "14px/1.35 'IBM Plex Sans', system-ui, sans-serif",
  boxShadow: '0 12px 40px -12px rgba(0,0,0,.6)',
}
const primary: CSSProperties = {
  padding: '6px 14px',
  borderRadius: 999,
  border: 'none',
  background: 'oklch(0.82 0.12 85)',
  color: 'oklch(0.18 0.02 60)',
  fontWeight: 600,
  cursor: 'pointer',
}
const secondary: CSSProperties = {
  ...primary,
  background: 'transparent',
  color: 'oklch(0.78 0.035 120)',
  fontWeight: 500,
}
