import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Served from https://<user>.github.io/fefw-codex/ on GitHub Pages.
export default defineConfig({
  base: '/fefw-codex/',
  plugins: [
    react(),
    VitePWA({
      // A new version waits until the user accepts it (see UpdatePrompt).
      registerType: 'prompt',
      includeAssets: ['icons/icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'Weave Codex',
        short_name: 'Weave Codex',
        description: "Companion codex for Fire Emblem: Fortune's Weave",
        theme_color: '#0b2a1f',
        background_color: '#0b2a1f',
        display: 'standalone',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the whole app, game data included, so it runs fully offline.
        globPatterns: ['**/*.{html,js,css,woff2,json,png,svg}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
})
