import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'
import '../src/assets/style.styl'
import audioPlayer from '../src/components/audio-player'
import videoPlayer from '../src/components/video-player'

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.component('audio-player', audioPlayer)
Vue.component('video-player', videoPlayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
