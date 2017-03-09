function ClockConverter () {

}

let convertMinutes = function (minutes) {
  let reminder = minutes % 5
  return Array(4).fill()
    .map(() => reminder-- > 0 ? 'Y' : 'O')
    .join('')
}

let convertHours = function (hours) {
  let reminder = hours % 5
  return Array(4).fill()
    .map(() => reminder-- > 0 ? 'R' : 'O')
    .join('')
}

let fiveMinutesRow = function (minutes) {
  let blocks = Math.floor(minutes / 5)
  return Array(11).fill()
    .map((_, index) => {
      return (blocks-- > 0)
        ? (((index + 1) % 3) === 0 ? 'R' : 'Y')
        : 'O'
    })
    .join('')
}
let fiveHoursRow = function (hours) {
  let blocks = Math.floor(hours / 5)
  return Array(4).fill()
    .map(() => (blocks-- > 0) ? 'R' : 'O')
    .join('')
}

ClockConverter.prototype.convert = function (dateTime) {
  let berlinClock = {
    minutesRow: convertMinutes(dateTime.getMinutes()),
    fiveMinutesRow: fiveMinutesRow(dateTime.getMinutes()),
    hoursRow: convertHours(dateTime.getHours()),
    fiveHoursRow: fiveHoursRow(dateTime.getHours()),
    seconds: (dateTime.getSeconds() % 2) === 0 ? 'Y' : 'O'
  }
  berlinClock.time =
    berlinClock.seconds +
    berlinClock.fiveHoursRow +
    berlinClock.hoursRow +
    berlinClock.fiveMinutesRow +
    berlinClock.minutesRow
  return berlinClock
}

module.exports = ClockConverter
