import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
    strictPort: true,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        onProxyReq: (proxyReq, req, res) => {
          console.log(`[PROXY] ${req.method} ${req.url} -> ${proxyReq.path}`);
        },
        onError: (err, req, res) => {
          console.error('Proxy error:', err);
          res.writeHead(503, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({
            success: false,
            error: 'Backend API server is not available at http://localhost:9090'
          }));
        },
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})