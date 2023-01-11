
import { ref } from 'vue'

const __sfc_main__ = {
  name: 'Main',
  setup() {
    const message = ref('前段逗逗飞')
    return {
      message,
    }
  },
}

__sfc_main__.__scopeId='data-v-1673405955086'
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = { class: "message" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, _toDisplayString(_ctx.message), 1 /* TEXT */))
}
__sfc_main__.render=render
export default __sfc_main__

      var el = document.createElement('style')
      el.innerHTML =  `
.message[data-v-1673405955086] {
  font-size: 60px;
  font-weight: 900;
}
`
      document.body.append(el);
    