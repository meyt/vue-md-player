export default {
  props: {
    src: {
      type: String,
      default: null
    },
    srcType: {
      type: String,
      default: null
    },
    preload: {
      type: String,
      default: 'metadata'
    }
  },
  data () {
    return {
      loading: false,
      playing: false,
      paused: false,
      seeking: false,
      ended: false,
      muted: true,
      firstPlay: false,
      duration: null,
      current: 0
    }
  },
  computed: {
    isInProgress () {
      return this.loading || this.seeking
    }
  },
  watch: {
    loading (newVal) {
      this.$emit('loading', newVal)
    },
    playing (newVal) {
      this.$emit('playing', newVal)
    },
    paused (newVal) {
      this.$emit('paused', newVal)
    },
    current (newVal) {
      this.$emit('current', newVal)
    },
    duration (newVal) {
      this.$emit('duration', newVal)
    },
    muted (newVal) {
      this.$emit('muted', newVal)
    },
    seeking (newVal) {
      this.$emit('seeking', newVal)
    },
    ended (newVal) {
      this.$emit('ended', newVal)
    }
  },
  mounted () {
    const m = this.$refs.media
    m.controls = false
    m.muted = true
    m.addEventListener('volumechange', this.onVolumeChange)
    m.addEventListener('loadstart', this.onLoadStart)
    m.addEventListener('onwaiting', this.onWaiting)
    m.addEventListener('seeking', this.onSeeking)
    m.addEventListener('seeked', this.onSeeked)
    m.addEventListener('ended', this.onEnded)
    m.addEventListener('suspend', this.onSuspended)
    m.addEventListener('playing', this.onPlaying)
    m.addEventListener('pause', this.onPause)
    m.addEventListener('abort', this.onAbort)
    m.addEventListener('durationchange', this.onDurationChange)
    m.addEventListener('progress', this.onProgress)
    m.addEventListener('timeupdate', this.onTimeUpdate)
    if (this.preload === 'auto') this.load()
  },
  beforeDestroy () {
    const m = this.$refs.media
    m.removeEventListener('volumechange', this.onVolumeChange)
    m.removeEventListener('loadstart', this.onLoadStart)
    m.removeEventListener('onwaiting', this.onWaiting)
    m.removeEventListener('seeking', this.onSeeking)
    m.removeEventListener('seeked', this.onSeeked)
    m.removeEventListener('ended', this.onEnded)
    m.removeEventListener('suspend', this.onSuspended)
    m.removeEventListener('stalled', this.onStalled)
    m.removeEventListener('playing', this.onPlaying)
    m.removeEventListener('pause', this.onPause)
    m.removeEventListener('abort', this.onAbort)
    m.removeEventListener('durationchange', this.onDurationChange)
    m.removeEventListener('progress', this.onProgress)
    m.removeEventListener('timeupdate', this.onTimeUpdate)
  },
  methods: {
    onVolumeChange () {
      /**
       * Sent when the audio volume changes
       * (both when the volume is set and when the muted attribute is changed).
       */
      this.$emit('volume', this.$refs.media.volume)
    },
    onLoadStart () {
      /**
       * Sent when loading of the media begins.
       */
      this.loading = true
    },
    onWaiting () {
      /**
       * Sent when the requested operation (such as playback) is delayed
       * pending the completion of another operation (such as a seek).
       */
      this.loading = true
    },
    onSeeking () {
      /**
       * The seeking event is fired when a seek operation starts, meaning
       * the Boolean seeking attribute has changed to true and the media is
       * seeking a new position.
       */
      this.seeking = true
    },
    onSeeked () {
      /**
       * Sent when a seek operation completes.
       */
      if (this.$refs.media.readyState === 4) {
        this.loading = false
      }
      this.current = this.$refs.media.currentTime
      this.seeking = false
    },
    onEnded () {
      /**
       * The ended event is fired when playback or streaming has stopped
       * because the end of the media was reached or because no further data
       * is available. This event occurs based upon HTMLMediaElement
       * (<audio> and <video>) fire ended when playback of the media
       * reaches the end of the media.
       */
      this.ended = true
    },
    onSuspended () {
      /**
       * Sent when loading of the media is suspended
       * this may happen either because the download has completed or
       * because it has been paused for any other reason.
       */
      this.loading = false
    },
    onStalled () {
      /**
       * Sent when the user agent is trying to fetch media data,
       * but data is unexpectedly not forthcoming.
       */
      this.loading = true
      this.pause = true
    },
    onPlaying () {
      /**
       * Sent when the media has enough data to start playing,
       * after the play event, but also when recovering from being stalled,
       * when looping media restarts, and after seeked, if it was playing
       * before seeking.
       */
      this.playing = true
      this.paused = false
      this.ended = false
      this.current = this.$refs.media.currentTime
      if (this.$refs.media.readyState === 4) {
        this.loading = false
      }
    },
    onPause () {
      /**
       * Sent when the playback state is changed to paused
       */
      this.playing = false
      this.paused = true
      this.current = this.$refs.media.currentTime
    },
    onAbort () {
      /*
       * Sent when playback is aborted; for example, if the media is playing
       * and is restarted from the beginning, this event is sent.
       */
      this.loading = false
    },
    onDurationChange () {
      /**
       * The metadata has loaded or changed, indicating a change in duration
       * of the media.  This is sent, for example, when the media has loaded
       * enough that the duration is known.
       */
      this.duration = this.$refs.media.duration
    },
    onProgress () {
      /**
       * Sent periodically to inform interested parties of progress downloading
       * the media. Information about the current amount of the media that
       * has been downloaded is available in the media element's buffered
       * attribute.
       */
      this.current = this.$refs.media.currentTime
    },
    onTimeUpdate () {
      /**
       * The time indicated by the element's currentTime attribute has changed.
       */
      this.current = this.$refs.media.currentTime
    },
    mute () {
      this.$refs.media.muted = true
      this.muted = true
    },
    unmute () {
      this.$refs.media.muted = false
      this.muted = false
    },
    play () {
      this.$refs.media.play()
    },
    pause () {
      this.$refs.media.pause()
    },
    togglePlay () {
      if (this.ended) this.seek(0)
      if (this.playing) {
        this.pause()
      } else {
        this.play()
      }
    },
    toggleMute () {
      if (this.muted) {
        this.unmute()
      } else {
        this.mute()
      }
    },
    seek (seconds) {
      this.$refs.media.currentTime = seconds
    },
    load () {
      this.$refs.media.load()
      this.resetFirstPlay()
    },
    unmuteAndTogglePlay () {
      if (!this.firstPlay) {
        this.unmute()
        this.firstPlay = true
      }
      this.togglePlay()
    },
    unmuteOrTogglePlay () {
      if (!this.firstPlay) {
        this.unmute()
        this.firstPlay = true
        if (this.playing) return
      }
      this.togglePlay()
    },
    resetFirstPlay () {
      this.firstPlay = false
    }
  }
}
