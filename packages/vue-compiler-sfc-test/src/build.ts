
import { readFile, writeFile } from 'fs-extra'
import {
  parse,
  compileScript,
  rewriteDefault,
  compileTemplate,
  compileStyle,
} from '@vue/compiler-sfc'
import { build } from 'esbuild'
import { externalGlobalPlugin } from 'esbuild-plugin-external-global'

async function start() {
  // 相对于 npm script 的运行目录
  const file = await readFile('./src/main.vue', 'utf8')
  // 用 @vue/compiler-sfc 进行解析，解析出 SFC 的每个块
  const { descriptor } = parse(file)
  // console.log(descriptor);

  // 这个 id 是 scopeId，用于 css scope，保证唯一即可
  const id = Date.now().toString()
  const scopeId = `data-v-${id}`

  // 编译 script，因为可能有 script setup，还要进行 css 变量注入
  const script = compileScript(descriptor, { id: scopeId })

  // 用于存放代码，最后 join('\n') 合并成一份完整代码
  const codeList = []

  // 重写 default
  codeList.push(rewriteDefault(script.content, '__sfc_main__'))
  codeList.push(`__sfc_main__.__scopeId='${scopeId}'`)

  // 编译模板，转换成 render 函数
  const template = compileTemplate({
    source: descriptor.template!.content,
    filename: 'main.vue', // 用于错误提示
    id: scopeId,
  })

  codeList.push(template.code)
  codeList.push(`__sfc_main__.render=render`)
  codeList.push(`export default __sfc_main__`)

  for (const styleBlock of descriptor.styles) {
    const styleCode = compileStyle({
      source: styleBlock.content,
      id,
      filename: 'main.vue',
      scoped: styleBlock.scoped,
    })
    const styleDOM = `
      var el = document.createElement('style')
      el.innerHTML =  \`${styleCode.code}\`
      document.body.append(el);
    `
    codeList.push(styleDOM)
  }

  // 合成代码
  const code = codeList.join('\n')
  // console.log(code);
  await writeFile('build.temp.js', code)

  await build({
    entryPoints: ['build.temp.js'],
    format: 'esm',
    outfile: 'bundle.js',
    bundle: true,
    external: ['vue'],
    plugins: [
      externalGlobalPlugin({
        vue: 'window.Vue',
      }),
    ],
  })
}

start()
