<template>
  <div
    @mouseover="onMouseHover"
    @dblclick.prevent="() => doubleClickFullscreen ? toggleFullScreen() : null"
    @click.prevent="unmuteOrTogglePlay"
    :class="classes"
    :style="styles"
  >
    <!-- Player-->
    <div class="player">
      <video
        ref="media"
        :width="width"
        :height="height"
        :preload="preload"
        :loop="loop"
        :muted="muted"
        :autoplay="autoplay"
        :crossorigin="crossorigin"
        :playsinline="playsinline"
        @loadedmetadata="onLoadedMetadata"
      >
        <source v-if="src" :src="src" :type="srcType"/>
        <slot />
      </video>
    </div>

    <!-- Overlay -->
    <div v-if="$slots.overlay" class="overlay">
      <slot name="overlay" />
    </div>

    <!-- Poster -->
    <div v-if="poster" class="overlay poster"></div>

    <!-- Pre-loader -->
    <preloader v-if="isInProgress" />

    <!-- Control Bar -->
    <div :class="{'control-bar': true, 'visible': controlbar || paused}" @click.stop>
      <scrubber
        :value="current"
        :min="0"
        :max="duration"
        @input="seek"
        :loading="isInProgress"
      />
      <div class="layout">
        <button class="player-btn" @click="unmuteAndTogglePlay()">
          <icon v-if="playing" :value="pauseIcon"/>
          <icon v-else-if="ended" :value="replayIcon"/>
          <icon v-else :value="playIcon"/>
        </button>
        <div class="spacer" />
        <div class="flex times">
          <span v-text="currentTime" />
          <span>&nbsp;/&nbsp;</span>
          <span v-text="durationTime" />
        </div>
        <button class="player-btn" @click="toggleMute()">
          <icon v-if="_muted" :value="volumeOffIcon"/>
          <icon v-else :value="volumeOnIcon"/>
        </button>
        <button class="player-btn" @click="toggleFullScreen()">
          <icon v-if="fullscreen" :value="fullscreenExitIcon"/>
          <icon fullscreen-icon v-else :value="fullscreenIcon"/>
        </button>
      </div>
  </div>
</div>
</template>

<script>
import Icon from './Icon.vue'
import { playIcon, pauseIcon, replayIcon, volumeOffIcon, volumeOnIcon, fullscreenIcon, fullscreenExitIcon } from '../icons'
import Scrubber from './Scrubber.vue'
import Preloader from './Preloader.vue'
import mediaMixin from '../mixin'
import { secondsToTime, fitAndCenterObject } from '../helpers'
import '../style.scss'

export default {
  name: 'VideoPlayer',
  mixins: [mediaMixin],
  props: {
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    doubleClickFullscreen: {
      type: Boolean,
      default: false
    },
    contain: {
      type: Boolean,
      default: false
    },
    poster: {
      type: String,
      default: null
    },
    playsinline: {
      type: Boolean,
      default: false
    },
    contain: {
      type: Boolean,
      default: false
    },
    playIcon: {
      type: String,
      default: playIcon
    },
    pauseIcon: {
      type: String,
      default: pauseIcon
    },
    replayIcon: {
      type: String,
      default: replayIcon
    },
    volumeOffIcon: {
      type: String,
      default: volumeOffIcon
    },
    volumeOnIcon: {
      type: String,
      default: volumeOnIcon
    },
    fullscreenIcon: {
      type: String,
      default: fullscreenIcon
    },
    fullscreenExitIcon: {
      type: String,
      default: fullscreenExitIcon
    },
  },
  components: {
    Icon,
    Preloader,
    Scrubber
  },
  data () {
    return {
      fullscreen: false,
      controlbar: false,
      videoWidth: 0,
      videoHeight: 0,
      containerWidth: 0,
      containerHeight: 0
    }
  },
  computed: {
    classes () {
      return {
        'vuemdplayer video': true,
        'fullscreen': this.fullscreen,
        'contain': this.fullscreen || this.contain,
        'has-poster': !!this.poster,
        'first-play': !!this.firstPlay
      }
    },
    styles () {
      let x = 0
      let y = 0
      let w = 0
      let h = 0
      if (this.containerWidth && this.videoWidth) {
        const ratio = this.videoWidth / this.videoHeight
        const res = fitAndCenterObject(ratio, { top: 0, left: 0, width: this.containerWidth, height: this.containerHeight })
        x = res.left
        y = res.top
        w = res.width
        h = res.height
      }
      return {
        '--layer-top': y + 'px',
        '--layer-left': x + 'px',
        '--layer-width': w + 'px',
        '--layer-height': h + 'px',
        '--poster': 'url("' + this.poster + '")',
      }
    },
    durationTime () {
      return secondsToTime(this.duration).join(':')
    },
    currentTime () {
      return secondsToTime(this.current).join(':')
    }
  },
  mounted () {
    window.addEventListener('resize', this.onWindowResize)
    this.onResize()

    document.addEventListener('fullscreenchange', this.onFullscreenChange)
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange)
  },
  beforeDestroy () {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange)
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    onWindowResize () {
      clearTimeout(this._resizeRimer)
      this._resizeRimer = setTimeout(this.onResize, 500)
    },
    onFullscreenChange (e) {
      this.fullscreen = !!document.fullscreenElement
      setTimeout(this.onResize, 0)
    },
    onResize () {
      const el = this.$el
      if (!el) return
      this.containerWidth = el.clientWidth
      this.containerHeight = el.clientHeight
    },
    onLoadedMetadata () {
      const mediaEl = this.$refs.media
      if (!mediaEl) return
      this.videoWidth = mediaEl.videoWidth
      this.videoHeight = mediaEl.videoHeight
    },
    onMouseHover () {
      this.controlbar = true
      window.clearTimeout(this.__controlbarTimeout)
      this.__controlbarTimeout = window.setTimeout(() => {
        this.controlbar = false
      }, 3000)
    },
    exitFullScreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      this.fullscreen = false
      setTimeout(this.onResize, 0)
    },
    enterFullScreen () {
      const el = this.$el
      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen()
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen()
      }
      this.fullscreen = true
      setTimeout(this.onResize, 0)
    },
    toggleFullScreen () {
      if (this.fullscreen) {
        this.exitFullScreen()
      } else {
        this.enterFullScreen()
      }
    }
  }
}
</script>
