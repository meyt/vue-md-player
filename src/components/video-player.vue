<template>
  <div
    ref="mediaPlayer"
    @mouseover="onMouseHover"
    @dblclick.prevent="() => doubleClickFullscreen ? toggleFullScreen() : null"
    :class="classes"
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
      >
        <template v-if="canLoad">
          <source v-if="src" :src="src" :type="srcType"/>
          <slot />
        </template>
      </video>
    </div>

    <!-- Pre-loader-->
    <preloader
      @click.native="unmuteOrTogglePlay()"
      v-if="isInProgress"
    />

    <!-- Control Bar-->
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
import { secondsToTime } from '../helper'
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
      controlbar: false
    }
  },
  computed: {
    classes () {
      return {
        'vuemdplayer video': true,
        'fullscreen': this.fullscreen,
        'contain': !this.fullscreen && this.contain
      }
    },
    durationTime () {
      return secondsToTime(this.duration).join(':')
    },
    currentTime () {
      return secondsToTime(this.current).join(':')
    }
  },
  methods: {
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
