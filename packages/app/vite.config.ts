import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//@ts-ignore
import { MometaVueSFC, MometaVueJSX } from '../editor/vite'

export default defineConfig({
  plugins: [MometaVueJSX(), MometaVueSFC(), vue()],
})
