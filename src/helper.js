export function padStart (a, b, c) {
  return (new Array(b || 2).join(c || 0) + (a || c || 0)).slice(-b)
}

export function secondsToTime (secs) {
  let hours = Math.floor(secs / (60 * 60))

  const divisorForMinutes = secs % (60 * 60)
  let minutes = Math.floor(divisorForMinutes / 60)

  const divisorForSeconds = divisorForMinutes % 60
  let seconds = Math.ceil(divisorForSeconds)
  hours = padStart(hours, 2, '0')
  minutes = padStart(minutes, 2, '0')
  seconds = padStart(seconds, 2, '0')
  if (hours === '00') return [minutes, seconds]
  return [hours, minutes, seconds]
}

export function fitAndCenterObject (objectAspectRatio, viewport) {
  /**
   * @param {Number} objectAspectRatio
   * @param {Object} viewport {top, left, width, height}
   * @return {Object} {top, left, width, height}
   */
  const res = {}

  // Fit board to viewport height
  res.height = viewport.height
  res.width = res.height * objectAspectRatio
  if (res.width > viewport.width) {
    res.width = viewport.width
    res.height = res.width / objectAspectRatio
  }

  // Center the object
  res.top = viewport.top + (viewport.height / 2 - res.height / 2)
  res.left = viewport.left + (viewport.width / 2 - res.width / 2)
  return res
}
