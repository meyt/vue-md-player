<template lang="pug">
  div.player-container.audio

    // Player
    div.player
      audio(ref="media")
        slot(v-if="canLoad")

    // Control Bar
    div.control-bar.visible
      scrubber(
        v-model="current"
        :min="0"
        :max="duration"
        light
        @input="seek(current)"
        :loading="isInProgress"
      )
      div.layout
        button.btn(
          icon
          large
          @click="unmuteAndTogglePlay()"
        )
          pause-icon(v-if="playing")
          replay-icon(v-else-if="ended")
          play-icon(v-else)
        div.spacer
        div.flex.times
          span {{ currentTime }}
          span &nbsp;/&nbsp;
          span {{ durationTime }}

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
import '../assets/style.styl'

export default {
  mixins: [mediaMixin],
  components: {
    playIcon,
    pauseIcon,
    replayIcon,
    volumeUpIcon,
    volumeOffIcon,
    scrubber
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
    }
  },
  methods: {
  }
}
</script>
