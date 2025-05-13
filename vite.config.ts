import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPath from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  server:{
  proxy:{
    "/api":{target: "http:localhost:3000/api", changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/,"")
    },

  },
  },
  plugins: [
    tailwindcss(),
    tsConfigPath(),
    react(),
    electron({
      main: {
       
        entry: 'electron/main.ts',
      },
      preload: {
       
        input: path.join(__dirname, 'electron/preload.ts'),
      },
     
      renderer: process.env.NODE_ENV === 'test'
       
        ? undefined
        : {},
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
