import { defineConfig } from 'vite'
import dotenv from "dotenv";
import react from '@vitejs/plugin-react'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.VITE_APP_PORT) || 5173,
  }
});
