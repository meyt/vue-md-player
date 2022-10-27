<template>
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    :style="styles"
  >
    <path fill="currentColor" :d="value" />
  </svg>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 24
    }
  },
  computed: {
    styles () {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        fontSize: this.size + 'px',
      }
    }
  }
}
</script>