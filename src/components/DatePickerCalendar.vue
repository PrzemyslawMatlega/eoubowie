<template>
  <div :class="$style.calendar">
    <template v-for="singleDate in getRange">
      <DatePickerMonth :key="singleDate.getTime()" :single-date="singleDate" />
    </template>
  </div>
</template>

<script>
import DatePickerMonth from './DatePickerMonth'
export default {
  name: 'DatePickerCalendar',
  components: {
    DatePickerMonth
  },
  props: {
    calendarSetup: {
      type: Object,
      required: true
    }
  },
  computed: {
    getRange() {
      const firstMonthArr = this.calendarSetup.firstMonth.split('-')
      const lastMonthArr = this.calendarSetup.lastMonth.split('-')
      const firstMonth = new Date(
        parseInt(firstMonthArr[1]),
        parseInt(firstMonthArr[0]) - 1
      )
      const monthArr = []

      function monthDiff(dateFrom, dateTo) {
        return (
          dateTo.getMonth() -
          dateFrom.getMonth() +
          12 * (dateTo.getFullYear() - dateFrom.getFullYear())
        )
      }
      const monthQty = monthDiff(
        firstMonth,
        new Date(parseInt(lastMonthArr[1]), parseInt(lastMonthArr[0]) - 1)
      )

      for (let i = 0; i < monthQty; i++) {
        const baseMonth = new Date(firstMonth.valueOf())
        monthArr.push(new Date(baseMonth.setMonth(baseMonth.getMonth() + i)))
      }

      return monthArr
    }
  }
}
</script>

<style lang="scss" module>
.calendar {
}
</style>
