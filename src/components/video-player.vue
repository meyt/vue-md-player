<template>
  <div
    ref="mediaPlayer"
    @mouseover="onMouseHover"
    @dblclick.prevent="() => doubleClickFullscreen ? toggleFullScreen() : null"
    :preload="preload"
    :class="classes"
    :style="styles"
  >
    <!-- Player-->
    <div
      class="player"
      @click.prevent="unmuteOrTogglePlay"
    >
      <video
        ref="media"
        :width="width"
        :height="height"
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

    <!-- Pre-loader -->
    <preloader
      @click.native="unmuteOrTogglePlay()"
      v-if="isInProgress"
    />

    <!-- Control Bar -->
    <div :class="{'control-bar': true, 'visible': controlbar || paused}">
      <scrubber
        v-model="current"
        :min="0"
        :max="duration"
        @input="seek(current)"
        :loading="isInProgress"
      />
      <div class="layout">
        <button class="player-btn" @click="unmuteAndTogglePlay()">
          <pause-icon v-if="playing"/>
          <replay-icon v-else-if="ended"/>
          <play-icon v-else/>
        </button>
        <div class="spacer" />
        <div class="flex times">
          <span v-text="currentTime" />
          <span>&nbsp;/&nbsp;</span>
          <span v-text="durationTime" />
        </div>
        <button class="player-btn" @click="toggleMute()">
          <volume-off-icon v-if="muted"/>
          <volume-up-icon v-else/>
        </button>
        <button class="player-btn" @click="toggleFullScreen()">
          <fullscreen-exit-icon v-if="fullscreen"/>
          <fullscreen-icon v-else/>
        </button>
      </div>
  </div>
</div>
</template>

<script>
import playIcon from '../assets/icons/play.svg'
import pauseIcon from '../assets/icons/pause.svg'
import replayIcon from '../assets/icons/replay.svg'
import volumeUpIcon from '../assets/icons/volume-up.svg'
import volumeOffIcon from '../assets/icons/volume-off.svg'
import fullscreenIcon from '../assets/icons/fullscreen.svg'
import fullscreenExitIcon from '../assets/icons/fullscreen-exit.svg'
import scrubber from './scrubber.vue'
import preloader from './preloader.vue'
import mediaMixin from '../mixin'
import { secondsToTime, fitAndCenterObject } from '../helper'
import '../assets/style.scss'

export default {
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
    }
  },
  components: {
    playIcon,
    pauseIcon,
    replayIcon,
    volumeUpIcon,
    volumeOffIcon,
    fullscreenIcon,
    fullscreenExitIcon,
    preloader,
    scrubber
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
        'contain': this.fullscreen || this.contain
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
        '--layer-height': h + 'px'
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
      this.containerWidth = this.$refs.mediaPlayer.clientWidth
      this.containerHeight = this.$refs.mediaPlayer.clientHeight
    },
    onLoadedMetadata () {
      const m = this.$refs.media
      this.videoWidth = m.videoWidth
      this.videoHeight = m.videoHeight
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
      const el = this.$refs.mediaPlayer
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
