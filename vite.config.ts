import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url' //npm i -D @types/node
import react from '@vitejs/plugin-react-swc'

/*
VITE -BUILD:
resolve.alias: Es una configuración que permite crear atajos (alias) para 
importar archivos o carpetas sin tener que escribir rutas largas y relativas.
  -Convierte la URL del archivo en una ruta de sistema de archivos válida para Node.
  -new URL() → crea una URL absoluta apuntando a tu carpeta src.
  -fileURLToPath(...) → la convierte en una ruta normal que Vite puede entender.

TS -DEV:
    "baseUrl": "src",
    "paths": {
      "@/components/*": ["components/*"]
    },
*/
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
