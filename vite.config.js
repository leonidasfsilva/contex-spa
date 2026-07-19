import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    host: 'contex-spa.localhost',
    strictPort: true,
    hmr: {
      protocol: 'wss',
      host: 'contex-spa.localhost',
      clientPort: 443,
    },
  },
})
