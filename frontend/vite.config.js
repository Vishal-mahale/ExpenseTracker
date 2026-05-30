import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // forward any request starting with /api to your backend
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // your backend
        changeOrigin: true,
        secure: false
        // rewrite is optional if you keep same /api path on backend
        // rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})






