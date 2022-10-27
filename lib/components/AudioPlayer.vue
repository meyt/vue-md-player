<template>
  <div :class="classes">
    <div class="player">
      <audio ref="media">
        <source v-if="src" :src="src" :type="srcType"/>
        <slot />
      </audio>
    </div>

    <!-- Control Bar-->
    <div class="control-bar visible">
      <scrubber
        :value="current"
        :min="0"
        :max="duration"
        @input="seek"
        :loading="isInProgress"
      />
      <div class="layout">
        <button class="player-btn" icon large @click="unmuteAndTogglePlay()">
          <icon v-if="playing" :value="pauseIcon" />
          <icon v-else-if="ended" :value="replayIcon"/>
          <icon v-else :value="playIcon" />
        </button>
        <div class="spacer" />
        <div class="flex times">
          <span v-text="currentTime"/>
          <span>&nbsp;/&nbsp;</span>
          <span v-text="durationTime"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mediaMixin from '../mixin'
import Scrubber from './Scrubber.vue'
import Icon from './Icon.vue'
import { playIcon, pauseIcon, replayIcon, volumeOffIcon, volumeOnIcon } from '../icons'
import { secondsToTime } from '../helpers'
import '../style.scss'

export default {
  name: 'AudioPlayer',
  mixins: [mediaMixin],
  components: {
    Icon,
    Scrubber
  },
  props: {
    light: {
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
  },
  data () {
    return {
      controlbar: false
    }
  },
  computed: {
    durationTime () {
      return secondsToTime(this.duration).join(':')
    },
    currentTime () {
      return secondsToTime(this.current).join(':')
    },
    classes () {
      return {
        'vuemdplayer audio': true,
        'light': this.light
      }
    }
  }
}
</script>
