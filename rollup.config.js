import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import svg from 'rollup-plugin-vue-inline-svg'
import { eslint } from 'rollup-plugin-eslint'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'
import css from 'rollup-plugin-css-only'
import stylus from 'rollup-plugin-stylus-compiler'

const external =  Object.keys(pkg.peerDependencies)
const extensions = ['.js', '.vue']
const isProduction = !process.env.ROLLUP_WATCH
const globals = { vue: 'Vue' }

const lintOpts = {
  extensions,
  exclude: ['**/*.json', '**/*.styl'],
  cache: true,
  throwOnError: true
}

const plugins = [
  resolve(),
  bundleSize(),
  commonjs(),
  stylus(),
  css(),
  eslint(lintOpts),
  svg(),
  vue({
    template: {
      isProduction,
      compilerOptions: { preserveWhitespace: false }
    },
    css: true
  })
]

export default {
  external,
  plugins,
  input: 'src/index.js',
  output: [
    {
      format: 'esm',
      file: 'dist/vue-md-player.js',
      globals
    },
    {
      format: 'cjs',
      file: 'dist/vue-md-player.cjs.js',
      globals
    }
  ]
}
