import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from "dotenv"
import path from "path"
// https://vitejs.dev/config/
env.config()
export default defineConfig({
  define:{
    __BACKEND_URL__:`"${process.env.BACKEND_URL}"`,
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
