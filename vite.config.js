import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        sketchflow: 'sketchflow.html',
        arrowmio: 'arrowmio.html',
        flipbook: 'flipbook.html',
        expiryguard: 'expiryguard.html',
      },
    },
  },
})
