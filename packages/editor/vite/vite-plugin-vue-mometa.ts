import { createFilter, PluginOption } from 'vite'

import InjectMometaSFC from './InjectMometaSFC'

const MometaVue = function (): PluginOption {
  const SFCOption = {
    include: [/\.vue$/],
    exclude: [],
  }

  const SFCFilter = createFilter(SFCOption.include, SFCOption.exclude)

  return {
    name: 'vite-plugin-vue-mometa',
    apply: 'serve',
    transform(code, id) {
      const isSFC = SFCFilter(id)
      if (!isSFC) return code
      return InjectMometaSFC(code)
    },
  }
}

export default MometaVue
