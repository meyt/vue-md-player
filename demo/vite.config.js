import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import svgLoader from './vite-svg'

// https://vitejs.dev/config/
export default defineConfig({
  root: './demo',
  plugins: [createVuePlugin(), svgLoader()]
})
