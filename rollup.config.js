import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import svg from 'rollup-plugin-vue-inline-svg'
import { eslint } from 'rollup-plugin-eslint'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'
import css from 'rollup-plugin-css-only'
import scss from 'rollup-plugin-scss'

const external = Object.keys(pkg.peerDependencies)
const extensions = ['.js', '.vue']
const isProduction = !process.env.ROLLUP_WATCH
const globals = { vue: 'Vue' }

const lintOpts = {
  extensions,
  exclude: ['**/*.json', '**/*.scss'],
  cache: true,
  throwOnError: true
}

const plugins = [
  resolve(),
  bundleSize(),
  commonjs(),
  scss(),
  css(),
  eslint(lintOpts),
  svg()
]

export default [
  // ESM build to be used with webpack/rollup.
  {
    external,
    plugins: [
      ...plugins,
      vue({
        template: {
          isProduction,
          compilerOptions: { preserveWhitespace: false }
        },
        css: false,
        compileTemplate: true
      })
    ],
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/vue-md-player.js',
      globals
    }
  },
  // SSR build.
  {
    external,
    plugins: [
      ...plugins,
      vue({
        template: {
          isProduction,
          compilerOptions: { preserveWhitespace: false, optimizeSSR: true }
        },
        css: false,
        compileTemplate: true
      })
    ],
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/vue-md-player.cjs.js',
      globals
    }
  },
  // Browser build.
  {
    external,
    plugins: [
      ...plugins,
      vue({
        template: {
          isProduction,
          compilerOptions: { preserveWhitespace: false }
        }
      })
    ],
    input: 'src/index.js',
    output: {
      format: 'iife',
      file: 'dist/vue-md-player.iife.js',
      name: 'vueMdPlayer',
      globals
    }
  }
]
