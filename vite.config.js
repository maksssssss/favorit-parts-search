import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// API работает только по HTTP, поэтому в браузере ходим на /api,
// а Vite проксирует запросы на сервер Favorit Parts.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://api.favorit-parts.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/hs/hsprice/'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
  },
})
