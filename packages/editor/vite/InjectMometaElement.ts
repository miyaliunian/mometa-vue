import { parse } from '@babel/parser'
import types from '@babel/types'
// @ts-ignore
import traverse from '@babel/traverse'
// @ts-ignore
import generate from '@babel/generator'

const InjectMometaElement = (source: string) => {
  const ast = parse(source, { sourceType: 'module' })

  const expression = types.ifStatement(
    types.binaryExpression(
      '===',
      types.identifier('key'),
      types.stringLiteral('mometa')
    ),
    types.blockStatement([
      types.expressionStatement(
        types.assignmentExpression(
          '=',
          types.memberExpression(
            types.identifier('el'),
            types.identifier('__mometa')
          ),
          types.identifier('nextValue')
        )
      ),
      types.expressionStatement(types.identifier('return')),
    ])
  )

  ;(traverse as any).default(ast, {
    VariableDeclarator(path: any) {
      if (path.get('id').node.name === 'patchProp') {
        const node = path.get('init').get('body').node
        node.body.unshift(expression)
      }
    },
  })
  return generate.default(ast).code
}

export default InjectMometaElement
