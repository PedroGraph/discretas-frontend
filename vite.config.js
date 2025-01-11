import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import env from "dotenv"
import path from "path"
import process from 'process'
const _dirname = path.resolve();

env.config()
export default defineConfig({
  define:{
    __BACKEND_URL__:`"${process.env.BACKEND_URL}"`,
    __MERCADO_PAGO__: `"${process.env.MERCADO_PAGO}"`
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: '0.0.0.0',
    port: 4000
  },
  resolve: {
    alias: {
      "@": path.resolve(_dirname, "./src"),
    },
  },
})
