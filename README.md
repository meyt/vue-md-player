# vue-md-player

[![Build Status](https://travis-ci.org/meyt/vue-md-player.svg?branch=master)](https://travis-ci.org/meyt/vue-md-player)

Lightweight HTML5 video and audio player component for vuejs.

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
<template lang="pug">
  div
    audio-player
      source(src="http://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3")
    video-player
      source(src="https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_10mb.mp4" type="video/mp4")
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
