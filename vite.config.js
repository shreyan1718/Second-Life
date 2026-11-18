import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Second Life — Vite configuration

// The platform's live preview runs the app inside a sandboxed iframe with an
// opaque ("null") origin. Browsers block scripts from such origins unless the
// server sends permissive CORS headers — this middleware guarantees they are
// present on every response so the preview always renders.
function allowPreviewFrame() {
  return {
    name: 'allow-preview-frame',
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), allowPreviewFrame()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true, // required so the sandboxed preview proxy can reach the dev server
    cors: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
})
