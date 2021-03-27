<template>
  <div :class="$style.calendar">
    <DatePickerNav @prevMonth="prevMonth" @nextMonth="nextMonth"
      >{{ currentMonth.getMonth() | convertMonth }}
      {{ currentMonth.getFullYear() }}</DatePickerNav
    >
    <transition name="quick" mode="out-in">
      <DatePickerMonth
        :key="currentMonth.getTime()"
        :current-month="currentMonth"
        :unavailable-dates="unavailableDates"
      />
    </transition>
  </div>
</template>

<script>
import DatePickerMonth from './DatePickerMonth'
import DatePickerNav from './DatePickerNav'
export default {
  name: 'DatePickerCalendar',
  components: {
    DatePickerMonth,
    DatePickerNav
  },
  props: {
    calendarSetup: {
      type: Object,
      required: true
    },
    unavailableDates: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentMonth: new Date(new Date().setHours(0, 0, 0, 0))
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
  },
  methods: {
    prevMonth() {
      this.currentMonth = new Date(
        this.currentMonth.setMonth(this.currentMonth.getMonth() - 1, 1)
      )
    },
    nextMonth() {
      this.currentMonth = new Date(
        this.currentMonth.setMonth(this.currentMonth.getMonth() + 1, 1)
      )
    }
  },
  filters: {
    convertMonth(month) {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      return monthNames[month]
    }
  }
}
</script>

<style lang="scss" module>
.calendar {
  width: 100%;
}
</style>
