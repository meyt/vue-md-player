# vue-md-player

![Build Status](https://github.com/meyt/vue-md-player/actions/workflows/main.yaml/badge.svg?branch=master)

Lightweight HTML5 video and audio player component for Vue@2.

[Demo](https://meyt.github.io/vue-md-player)

## Screenshots

### Video Player

![video player](https://github.com/meyt/vue-md-player/raw/master/stuff/video-player-screenshot.png?raw=true)

### Audio Player

![audio player](https://github.com/meyt/vue-md-player/raw/master/stuff/audio-player-screenshot.png?raw=true)

## Install

```
npm install --save vue-md-player
```


## Usage:

```vue
<template>
  <div>
    <audio-player src="./audio.mp3" />
    <video-player src="./video.mp4" />
  </div>
</template>

<script>
import { audioPlayer, videoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/vue-md-player.css'
export default {
  components: {
    audioPlayer,
    videoPlayer
  }
}
</script>
```
