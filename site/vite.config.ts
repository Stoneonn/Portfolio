import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seoFallback } from './seo'

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFallback()],
  server: {
    port: 5173,
    strictPort: true,
  },
})
