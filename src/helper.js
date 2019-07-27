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
