<template>
  <div class="container">
    <h1>
      <a href="https://github.com/meyt/vue-md-player" target="_blank">vue-md-player demo</a>
    </h1>
    <div class="card">

      <h2>Audio Player</h2>

      <h3>Basic</h3>
      <pre v-text="examples.audio.basic"/>
      <div class="audio-container">
        <audio-player :src="audioSrc" />
      </div>

      <h3>Light mode</h3>
      <pre v-text="examples.audio.light"/>
      <div class="audio-container">
        <audio-player :src="audioSrc" light />
      </div>

      <h2>Video Player</h2>

      <h3>Basic</h3>
      <pre v-text="examples.video.basic"/>
      <div class="video-container">
        <video-player :src="videoSrc" />
      </div>

      <h3>Contained</h3>
      <pre v-text="examples.video.contained"/>
      Vertical
      <div class="contained-vertical">
        <video-player :src="videoSrc" contain />
      </div>
      Horizontal
      <div class="contained-horizontal">
        <video-player :src="videoSrc" contain />
      </div>

      <h3>Double click fullscreen</h3>
      <pre v-text="examples.video.doubleClick"/>
      <div class="video-container">
        <video-player :src="videoSrc" double-click-fullscreen />
      </div>

      <h3>Overlay</h3>
      <pre v-text="examples.video.overlay" />
      <div class="video-container">
        <video-player :src="videoSrc">
          <template v-slot:overlay>
            <img class="watermark" :src="watermarkSrc">
          </template>
        </video-player>
      </div>
      <div class="contained-vertical">
        <video-player :src="videoSrc" contain>
          <template v-slot:overlay>
            <img class="watermark" :src="watermarkSrc">
          </template>
        </video-player>
      </div>
      <div class="contained-horizontal">
        <video-player :src="videoSrc" contain>
          <template v-slot:overlay>
            <img class="watermark" :src="watermarkSrc">
          </template>
        </video-player>
      </div>
    </div>
  </div>
</template>
<script>
import { videoPlayer, audioPlayer } from '../../src/index'
import examples from './examples'
import '../../dist/vue-md-player.css'
import videoSrc from './assets/example.mp4'
import audioSrc from './assets/example.mp3'
import watermarkSrc from './assets/watermark.png'

export default {
  components: {
    videoPlayer,
    audioPlayer
  },
  data () {
    return {
      videoSrc,
      audioSrc,
      watermarkSrc,
      examples
    }
  },
  mounted () {
    setTimeout(function () {
      document.querySelectorAll('textarea').forEach(function (el) {
        el.style.height = '1px'
        el.style.height = el.scrollHeight + 'px'
      })
    }, 0)
  },
  methods: {
    audioSnippet () {
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
    }
  }
}
</script>
<style>
  html, body{
    margin: 0;
    padding: 0;
    background: #eee;
  }
  .container {
    width: 550px;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    padding-bottom: 16px;
  }
  .card {
    background: #fff;
    position: relative;
    padding: 16px;
    border-radius: 4px;
  }
  .contained-vertical {
    width: 250px;
    height: 300px;
    position: relative;
  }
  .contained-horizontal {
    width: 350px;
    height: 150px;
    position: relative;
  }
  textarea {
    color: #000;
    border: none;
    background: #eee;
    width: 100%;
    padding: 8px;
    outline: 0;
    height: auto;
    resize: none;
    overflow: hidden;
    font-size: 11px;
    box-sizing: border-box;
  }
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
  a {
    text-decoration: none;
  }
  h1 {
    color: #555;
    text-align: center;
  }

  pre {
    display: block;
    width: 100%;
    background-color: #eee;
    text-align: left;
    font-family: monospace;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 11px;
    word-break: break-all;
    white-space: pre-wrap;
    box-sizing: border-box;
  }
</style>
