import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // On force Rollup à accepter le module même s'il a un doute
      external: [], 
    },
  },
  optimizeDeps: {
    include: ['@formspree/react'],
  },
})