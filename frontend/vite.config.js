import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            if (proxyRes.headers.location) {
              const target = 'http://localhost:8000'
              if (proxyRes.headers.location.startsWith(target)) {
                let redirectPath = proxyRes.headers.location.substring(target.length)
                // Normalize redirect path to include /api and handle trailing slashes consistently
                if (!redirectPath.startsWith('/api')) {
                  redirectPath = '/api' + redirectPath
                }
                proxyRes.headers.location = redirectPath
              }
            }
          })
        },
      },
    },
  },
})
