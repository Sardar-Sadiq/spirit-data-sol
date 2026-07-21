import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  resolve: {
    dedupe: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three') || id.includes('node_modules/@react-three/rapier')) {
            return 'vendor-3d';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/framer-motion') || id.includes('node_modules/lenis')) {
            return 'vendor-animation';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
