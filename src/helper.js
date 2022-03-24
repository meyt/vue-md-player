import padStart from 'lodash/padStart'

export function secondsToTime (secs) {
  var hours = Math.floor(secs / (60 * 60))

  var divisorForMinutes = secs % (60 * 60)
  var minutes = Math.floor(divisorForMinutes / 60)

  var divisorForSeconds = divisorForMinutes % 60
  var seconds = Math.ceil(divisorForSeconds)
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
