import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/hls': {
        target: 'http://192.168.72.130:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hls/, '/hls')
      },
      // 生产环境代理配置 - 用于测试
      '/prod-api': {
        target: 'http://139.186.225.25',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prod-api/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('🚀 代理请求:', req.method, req.url, '->', options.target + proxyReq.path)
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('✅ 代理响应:', proxyRes.statusCode, req.url)
          })
          proxy.on('error', (err, req, res) => {
            console.log('❌ 代理错误:', err.message, req.url)
          })
        }
      }
    }
  }
})
