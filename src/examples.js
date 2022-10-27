export default {
  audio: {
    basic: `<template>
  <audio-player>
    <source src="./example.mp3" />
  </audio-player>
</template>
<script>
import { AudioPlayer } from 'vue-md-player'
import 'vue-md-player/dist/style.css'
export default {
  components: {
    AudioPlayer
  }
}
</script>`,
    light: `<template>
  <audio-player src="./example.mp3" light />
</template>`
  },
  video: {
    basic: `<template>
  <video-player>
    <source src="./example.mp4" />
  </video-player>
</template>
<script>
import { VideoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/style.css'
export default {
  components: {
    VideoPlayer
  }
}
</script>`,
    contained: `<template>
  <div class="container">
    <video-player src="./example.mp4" contain />
  </div>
</template>

<style>
.container {
  width: 350px;
  height: 150px;
  position: relative;
}
</style>`,
    doubleClick: `<template>
  <video-player src="./example.mp4" double-click-fullscreen />
</template>`,
    overlay: `<template>
  <video-player src="./example.mp4">
    <template v-slot:overlay>
      <img class="watermark" src="./logo.png">
    </template>
  </video-player>
</template>

<style>
  .watermark {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 20%;
    height: auto;
    pointer-events: none;
    user-select: none;
    display: block;
    opacity: 0.7;
  }
</style>`
  }
}
