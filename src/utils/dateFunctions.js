function areDaysEqual(firstDate, secondDate) {
  if (firstDate === null || secondDate === null) return false
  return firstDate.toDateString() === secondDate.toDateString()
}
function isFirstDateEarlier(firstDate, secondDate) {
  const first = firstDate.setHours(0, 0, 0, 0)
  const second = secondDate.setHours(0, 0, 0, 0)
  return first < second
}

function convertToDateObject(value) {
  if (typeof value === 'string') {
    return new Date(value)
  } else return value
}

function areDaysInRange(rangeFrom, rangeTo, days) {
  return getDaysBetween(rangeFrom, rangeTo).some(day => {
    return days.some(el => areDaysEqual(el, day))
  })
}

function getDaysBetween(dateFrom, dateTo) {
  let arr = []
  for (
    let date = new Date(dateFrom);
    date <= dateTo;
    date.setDate(date.getDate() + 1)
  ) {
    arr.push(new Date(date))
  }
  return arr
}

function getMonthDiff(dateFrom, dateTo) {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  )
}

export {
  areDaysEqual,
  convertToDateObject,
  getDaysBetween,
  getMonthDiff,
  isFirstDateEarlier,
  areDaysInRange
}
