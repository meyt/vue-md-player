<template lang="pug">
  v-app(:class="[$route.name]")
    v-content
      v-layout(justify-center)
        v-flex(xs12 md6)
          h1.text-xs-center.mt-2
            a(href="https://github.com/meyt/vue-md-player" target="_blank")
            | vue-md-player demo

          router-view
</template>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Material+Icons')
@import '~vuetify/src/stylus/main'
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
body
  margin 0px

a
  text-decoration: none
  color: #444 !important

pre
  display: block
  width: 100%
  background-color: #eee
  text-align: left
  font-family: monospace
  border-radius: 5px
  padding: 10px
  margin-bottom: 10px
  font-size: 11px
  word-break: break-all
  white-space: pre-wrap
</style>
