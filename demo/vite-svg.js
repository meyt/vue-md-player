const fs = require('fs')
const svgo = require('svgo')
const transpile = require('vue-template-es2015-compiler')
const compiler = require('vue-template-compiler')

async function compileSvg (source, id) {
  source = compiler.compile(source, { preserveWhitespace: false }).render
  source = `module.exports = { render: function () { ${source} } };`
  return transpile(source).replace('module.exports =', 'export default')
}

async function optimizeSvg (content, path) {
  const { data } = await svgo.optimize(content, { path })
  return data
}

export default function (options) {
  const cache = new Map()
  const svgRegex = /\.svg$/
  return {
    name: 'vue-svg',
    async transform (source, id, isBuild) {
      let result = id.match(svgRegex)
      if (result) {
        result = cache.get(id)
        if (!result) {
          result = fs.readFileSync(id)
          result = await optimizeSvg(result, id)
          result = await compileSvg(result, id)
          if (isBuild) cache.set(id, result)
        }
        return result
      }
    }
  }
}
