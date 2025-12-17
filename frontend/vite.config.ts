import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections (needed for Docker)
    port: 5173,
    watch: {
      usePolling: true, // Enable polling for file changes (needed for Docker volumes)
      interval: 1000, // Poll interval in milliseconds
    },
    hmr: {
      host: 'localhost', // HMR host for client connection
      port: 5173,
    },
    proxy: {
      '/api': {
         // In Docker, use service name 'backend', otherwise use localhost
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // Ensure cookies are forwarded
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Forward cookies from client request
            if (req.headers.cookie) {
              proxyReq.setHeader('Cookie', req.headers.cookie);
            }
          });
        },
      }
    }
  },
  // Copy runtime-config.js to dist during build
  publicDir: 'public',
})
