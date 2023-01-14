import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//@ts-ignore
import MometaVue from '../editor/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [MometaVue(), vue()],
})
