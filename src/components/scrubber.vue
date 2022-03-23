<template>
  <div ref="scrubber" :class="{scrubber: true, light: light, loading: loading}">
    <div class="bar"/>
    <div class="progress" :style="{width: percent + '%'}" />
    <div class="handler" :style="{left: percent + '%'}" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    light: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      percent: 0,
      dragging: false
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal === oldVal) return
      this.percent = ((newVal - this.min) * 100) / (this.max - this.min)
    }
  },
  methods: {
    isScrubber (el) {
      return [el, el.parentNode].includes(this.$refs.scrubber)
    },
    dragStart (e) {
      if (!this.isScrubber(e.target)) return
      e.preventDefault()
      this.dragging = true
    },
    drag (e) {
      if (!this.dragging) return
      e.preventDefault()
      this.updateProgress(e)
    },
    dragEnd (e) {
      // To just prevent close parent dialog
      // capturing must enabled on click event
      if (this.dragging) e.stopPropagation()
      this.dragging = false
      this.updateProgress(e)
    },
    updateProgress (e) {
      if (!this.isScrubber(e.target)) return
      if (e.type === 'touchend') return
      const posX = e.type === 'touchmove'
        ? e.touches[0].clientX
        : e.clientX
      const el = this.$refs.scrubber
      const barWidth = el.clientWidth
      let progressWidth = posX - el.getBoundingClientRect().left
      if (progressWidth >= barWidth) progressWidth = barWidth
      if (progressWidth < 0) progressWidth = 0
      this.percent = progressWidth * 100 / barWidth
      this.$emit('input', this.min + ((this.max - this.min) * this.percent / 100))
      this.$emit('change')
    }
  },
  mounted () {
    // Register triggers
    window.addEventListener('touchstart', this.dragStart, false)
    window.addEventListener('touchend', this.dragEnd, false)
    window.addEventListener('touchmove', this.drag, { passive: false })

    window.addEventListener('mousedown', this.dragStart, false)
    window.addEventListener('mousemove', this.drag, false)
    // Note: click event can stop propagate but mouseup cant
    window.addEventListener('click', this.dragEnd, { capture: true })
  },
  beforeDestroy () {
    // Remove triggers
    window.removeEventListener('touchstart', this.dragStart, false)
    window.removeEventListener('touchend', this.dragEnd, false)
    window.removeEventListener('touchmove', this.drag, false)

    window.removeEventListener('mousedown', this.dragStart, false)
    window.removeEventListener('mousemove', this.drag, false)
    window.removeEventListener('click', this.dragEnd)
  }
}
</script>
<style lang="scss">
.vuemdplayer .scrubber {
  margin: 0px 16px -4px;
  touch-action: none;
  cursor: pointer;
  direction: ltr;
  height: 30px;
  position: relative;
  user-select: none;
  .bar {
    height: 3px;
    width: 100%;
    position: relative;
    top: 16px;
    background-color: rgba(255,255,255,0.3);
    border-radius: 5px;
    transition: height 0.2s;
  }
  .progress {
    height: 3px;
    width: 0;
    position: absolute;
    top: 16px;
    background-color: #fff;
    border-radius: 5px;
    transition: height 0.2s;
  }
  .handler {
    background-color: #fff;
    height: 17px;
    width: 17px;
    border-radius: 19px;
    top: 9px;
    margin-left: -9px;
    position: absolute;
    left: 0;
    box-shadow: rgba(0,0,0,0.5) 0px 0px 3px;
    transform: scale(0.3);
    opacity: 1;
    transition: transform 125ms cubic-bezier(0.15, 0.75, 0.5, 0.95) 0s;
  }
  &:hover {
    .handler {
      transform: scale(1);
    }
  }
  &.loading {
    .handler {
      top: 10px;
    }
    .progress {
      height: 5px;
    }
    .bar {
      height: 5px;
      background-color: initial;
      background-image: repeating-linear-gradient(-45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 11px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px);
      background-size: 28px 28px;
      background-repeat: repeat-x;
      animation: vuemdplayer-scrobberprogress 0.5s linear infinite;
    }
  }
  &.light {
    .bar {
      background-color: rgba(0,0,0,0.3);
    }
    .progress {
      background-color: #000;
    }
    .handler {
      background-color: #000;
    }
  }
}

@keyframes vuemdplayer-scrobberprogress {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 28px 0;
  }
}
</style>
