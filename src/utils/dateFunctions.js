function areDaysEqual(firstDate, secondDate) {
  if (firstDate === null || secondDate === null) return false
  return firstDate.toDateString() === secondDate.toDateString()
}

function convertToDateObject(value) {
  if (typeof value === 'string') {
    return new Date(value)
  } else return value
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

export { areDaysEqual, convertToDateObject, getDaysBetween, getMonthDiff }
