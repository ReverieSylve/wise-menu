import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    vuetify({
      autoImport: true
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        logLevel: 'debug',
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  define: { 'process.env': {} },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  }
})
