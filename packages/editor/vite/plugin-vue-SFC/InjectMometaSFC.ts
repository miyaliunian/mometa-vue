import { parse } from '@vue/compiler-sfc'

const toString = (obj: any) => {
  if (typeof obj !== 'object') return obj
  if (obj === null) return
  const keys = Object.keys(obj)
  let res = '{'
  res += keys
    .map((key) => {
      return ` ${key}: ${toString(obj[key])}`
    })
    .join(',')
  res += '}'

  return res
}

const InjectMometaSFC = (code: string): string => {
  const descriptor = parse(code).descriptor
  const template = code.split('\n')
  const ast = descriptor.template?.ast!

  const DFS = (node: any) => {
    if (node.type === 1 && !node.tagType) {
      const children = node.children
      for (let i = children.length - 1; i >= 0; i--) {
        DFS(children[i])
      }

      const start = node.loc.start
      const end = node.loc.end

      const mometa = {
        start,
        end,
      }

      const sliceBegain = start.column + node.tag.length
      const line = template[start.line - 1]
      template[start.line - 1] =
        line.slice(0, sliceBegain) +
        ` :mometa="${toString(mometa)}"` +
        line.slice(sliceBegain)
    }
  }

  for (let i = ast.children.length - 1; i >= 0; i--) {
    DFS(ast.children[i])
  }

  return template.join('\n')
}

export default InjectMometaSFC
