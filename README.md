# vue-md-player

[![Build Status](https://github.com/meyt/vue-md-player/actions/workflows/main.yaml/badge.svg?branch=master)](https://github.com/meyt/vue-md-player/actions)
[![View this project on NPM](https://img.shields.io/npm/v/vue-md-player.svg)](https://www.npmjs.com/package/vue-md-player)

Lightweight HTML5 video and audio player component for Vue.


[Demo](https://meyt.github.io/vue-md-player) - [Codepen](https://codepen.io/barname_nevis/pen/rNKapaY)

[README for Vue 2 users](https://github.com/meyt/vue-md-player/tree/v1)

## Screenshots

### Video Player

![video player](https://github.com/meyt/vue-md-player/raw/master/stuff/video-player-screenshot.png?raw=true)

### Audio Player

![audio player](https://github.com/meyt/vue-md-player/raw/master/stuff/audio-player-screenshot.png?raw=true)

## Install

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

## Properties

| Property                  | Player         | Type    | Default  | Description                                                                                                                                                                                                                                         |
|---------------------------|----------------|---------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `autoplay`                | Video<br>Audio | Boolean | false    | Play automatically as soon as it can do.                                                                                                                                                                                                            |
| `contain`                 | Video          | Boolean | false    | Fit the video to container size.                                                                                                                                                                                                                    |
| `crossorigin`             | Video<br>Audio | String  | -        | [Read on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#crossorigin)                                                                                                                                                          |
| `double-click-fullscreen` | Video          | Boolean | false    | Go to fullscreen mode by double-click on the video.                                                                                                                                                                                                 |
| `light`                   | Video<br>Audio | Boolean | false    | Enable light theme.                                                                                                                                                                                                                                 |
| `loop`                    | Video<br>Audio | Boolean | false    | Automatically seek back to the start upon reaching the end of the audio/video.                                                                                                                                                                      |
| `muted`                   | Video<br>Audio | Boolean | false    | Indicates whether the audio will be initially silenced.                                                                                                                                                                    |
| `playsinline`             | Video          | Boolean | false    | Some browsers prefer to play video in fullscreen, force them to play inline.                                                                                                                                                                        |
| `poster`                  | Video          | String  | -        | A URL for an image to be shown while the video is downloading.                                                                                                                                                                                      |
| `preload`                 | Video<br>Audio | String  | metadata | `none`: Indicates that the audio/video should not be preloaded.<br>`metadata`: Indicates that only audio/video metadata (e.g. length) is fetched.<br>`auto`: Indicates that the whole audio/video file can be downloaded, even if the user is not expected to use it. |
| `src`                     | Video<br>Audio | String  | -        | The URL of the video or audio to embed.                                                                                                                                                                                                             |
