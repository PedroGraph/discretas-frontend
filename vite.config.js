import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from "dotenv"
// https://vitejs.dev/config/
env.config()
export default defineConfig({
  define:{
    __BACKEND_URL__:`"${process.env.BACKEND_URL}"`,
    __PHONE__:`"${process.env.PHONE}"`
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  }
})
