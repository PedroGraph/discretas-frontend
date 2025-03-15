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
    __TOKEN_MERCADO_PAGO__: `"${process.env.TOKEN_MERCADOPAGO}"`
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: '0.0.0.0',
    port: 4000,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 24678,
      clientPort: 24678,
      timeout: 1000,
      overlay: false
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(_dirname, "./src"),
    },
  },
})
