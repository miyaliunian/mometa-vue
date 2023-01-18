import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-ignore
import  vueJsxPlugin from './src/plugin-vue-jsx'
//@ts-ignore
import MometaVue from '../editor/vite'

export default defineConfig({
  plugins: [vueJsxPlugin(),MometaVue(), vue()],
})
