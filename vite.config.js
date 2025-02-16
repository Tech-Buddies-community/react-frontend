import { defineConfig } from 'vite'
import dotenv from "dotenv";
import react from '@vitejs/plugin-react'

dotenv.config();

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000'
const APP_PORT = process.env.VITE_APP_PORT || 5173

console.log(`APP RUN ON PORT '${APP_PORT}'`);
console.log(`LISTEN ON BACKEND URL '${API_URL}'`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
        },
      },
      port: APP_PORT,
    }
  },
)