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
        v-model="current"
        :min="0"
        :max="duration"
        @input="seek(current)"
        :loading="isInProgress"
      />
      <div class="layout">
        <button class="player-btn" icon large @click="unmuteAndTogglePlay()">
          <pause-icon v-if="playing"/>
          <replay-icon v-else-if="ended"/>
          <play-icon v-else />
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
import scrubber from './scrubber.vue'
import playIcon from '../assets/icons/play.svg'
import pauseIcon from '../assets/icons/pause.svg'
import replayIcon from '../assets/icons/replay.svg'
import volumeUpIcon from '../assets/icons/volume-up.svg'
import volumeOffIcon from '../assets/icons/volume-off.svg'
import { secondsToTime } from '../helper'
import '../assets/style.scss'

export default {
  name: 'AudioPlayer',
  mixins: [mediaMixin],
  components: {
    playIcon,
    pauseIcon,
    replayIcon,
    volumeUpIcon,
    volumeOffIcon,
    scrubber
  },
  props: {
    light: {
      type: Boolean,
      default: false
    }
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
