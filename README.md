# vue-md-player

![Build Status](https://github.com/meyt/vue-md-player/actions/workflows/main.yaml/badge.svg?branch=master)

Lightweight HTML5 video and audio player component for Vue.


[Demo](https://meyt.github.io/vue-md-player) - [Codepen](https://codepen.io/barname_nevis/pen/rNKapaY)

## Screenshots

### Video Player

![video player](https://github.com/meyt/vue-md-player/raw/master/stuff/video-player-screenshot.png?raw=true)

### Audio Player

![audio player](https://github.com/meyt/vue-md-player/raw/master/stuff/audio-player-screenshot.png?raw=true)

## Install

Vue 2
```
npm install --save vue-md-player@1
```

Vue 3
```
npm install --save vue-md-player
```

## Usage

```vue
<template>
  <div>
    <audio-player src="./audio.mp3" />
    <video-player src="./video.mp4" />
  </div>
</template>

<script>
import { AudioPlayer, VideoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/style.css'
export default {
  components: {
    AudioPlayer,
    VideoPlayer
  }
}
</script>
```
