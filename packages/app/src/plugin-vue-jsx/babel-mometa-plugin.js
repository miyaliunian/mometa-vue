const parametersInsertPlugin = ({ types, template }, options, dirname) => {
    return {
        visitor: {
            JSXElement(path, state) {
                const openingElement = path.get('openingElement')
                if (!openingElement) {
                    return
                }

                const existingProp = openingElement.node.attributes.find(
                    node => node.name?.name === 'mometa'
                )

                if (existingProp) {
                    return
                }

                const mometaData = {
                    ...path.node.loc,
                    // name: 'div',
                    // filename: 'filename',
                    innerStart: openingElement.node.loc.end,
                    innerEnd: path.get('closingElement')?.node?.loc?.start,
                }
                const objExp = template.expression(JSON.stringify(mometaData), {
                    placeholderPattern: false,
                })()
                const newProp = types.JSXAttribute(
                    types.JSXIdentifier('mometa'),
                    types.JSXExpressionContainer(objExp)
                )
                openingElement.node.attributes.push(newProp)
            },
        },
    }
}
export default parametersInsertPlugin
