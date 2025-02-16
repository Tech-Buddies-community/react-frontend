import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: 'https://express-be.dev.app.techbuddies.id/',
          // target: 'http://localhost:3000',
          changeOrigin: true,
        },

      },
    }
  },
)