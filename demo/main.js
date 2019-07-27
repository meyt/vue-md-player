import Vue from 'vue'
import VueMeta from 'vue-meta'
import Vuetify from 'vuetify/lib'

import App from './App.vue'
import router from './router'
import store from './store'

import audioPlayer from '../src/components/audio-player'
import videoPlayer from '../src/components/video-player'

import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'
import '../src/assets/style.styl'

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.component('audio-player', audioPlayer)
Vue.component('video-player', videoPlayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
