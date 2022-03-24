import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import svg from 'rollup-plugin-vue-inline-svg'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import scss from 'rollup-plugin-scss'
import pkg from './package.json'

const external = Object.keys(pkg.peerDependencies)
const isProduction = !process.env.ROLLUP_WATCH
const globals = { vue: 'Vue' }

const plugins = [
  resolve(),
  bundleSize(),
  commonjs(),
  scss(),
  css(),
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
