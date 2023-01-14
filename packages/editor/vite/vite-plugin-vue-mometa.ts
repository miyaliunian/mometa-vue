import { createFilter, PluginOption } from 'vite'

import InjectMometaElement from './InjectMometaElement'
import InjectMometaSFC from './InjectMometaSFC'

const MometaVue = function (): PluginOption {
  const SFCOption = {
    include: [/\.vue$/],
    exclude: [],
  }

  const vueOptions = {
    include: [/vue\.js\?v=\d+/],
    exclude: [],
  }

  const VueFilter = createFilter(vueOptions.include, vueOptions.exclude)
  const SFCFilter = createFilter(SFCOption.include, SFCOption.exclude)

  return {
    name: 'vite-plugin-vue-mometa',
    apply: 'serve',
    transform(code, id) {
      const isSFC = SFCFilter(id)
      const isVue = VueFilter(id)
      if (!isSFC && !isVue) return code
      if (isSFC) {
        return InjectMometaSFC(code)
      }
      if (isVue) {
        return InjectMometaElement(code)
      }
    },
  }
}

export default MometaVue
