import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@formspree/react']
  },
  build: {
    commonjsOptions: {
      include: [/@formspree\/react/, /node_modules/]
    }
  }
})