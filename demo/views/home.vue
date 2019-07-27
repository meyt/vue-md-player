<template lang="pug">
  v-container
    v-card.mb-3
      v-card-text
        v-layout.mb-3
          v-flex.px-1
            v-text-field(
              label="Audio source"
              v-model="audioSrc"
              hide-details
            )

        pre(v-text="snippetTemplate")
      audio-player
        source(:src="audioSrc")

    v-card
      v-card-text
        v-layout.mb-3
          v-flex.px-1
            v-text-field(
              label="Video source"
              v-model="videoSrc"
              hide-details
            )

        pre(v-text="videoSnippet")
      video-player
        source(:src="videoSrc")
</template>

<script>
export default {
  data () {
    return {
      audioSrc: 'http://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3',
      videoSrc: 'https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_10mb.mp4'
    }
  },
  computed: {
    snippetTemplate () {
      return `<audio-player>
  <source src="${this.audioSrc}" />
</audio-player>


import { audioPlayer } from 'vue-md-player'
import 'vue-md-player/dist/vue-md-player.css'
export default {
  components: {
    audioPlayer
  }
}`
    },
    videoSnippet () {
      return `<video-player>
  <source src="${this.videoSrc}" />
</video-player>

import { videoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/vue-md-player.css'
export default {
  components: {
    videoPlayer
  }
}`
    }
  }
}
</script>

<style lang="stylus">
.theme--light.application.home
  background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%) !important
</style>
