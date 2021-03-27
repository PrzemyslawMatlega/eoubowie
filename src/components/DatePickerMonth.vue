<template>
  <div :class="$style.month">
    <div :class="$style.grid">
      <div v-for="weekDay in weekDayArr" :key="weekDay" :class="$style.weekDay">
        {{ weekDay }}
      </div>
      {{ getDays }}
      {{ parseUnavailableDates }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weekDayArr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      today: new Date(new Date().setHours(0, 0, 0, 0))
    }
  },
  props: {
    currentMonth: {
      type: Date,
      required: true
    },
    unavailableDates: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    setDateAttr(date, isCurrentMonth = true) {
      const dayObject = {
        date,
        isCurrentMonth,
        isToday:
          this.today.toDateString() === date.toDateString() ? true : false,
        isUnavailable: this.parseUnavailableDates.some(
          el => el.toDateString() === date.toDateString()
        )
      }
      return dayObject
    }
  },
  computed: {
    parseUnavailableDates() {
      return this.unavailableDates.map(el => {
        const dateArr = el.split('-')
        return new Date(
          parseInt(dateArr[2]),
          parseInt(dateArr[1]) - 1,
          parseInt(dateArr[0])
        )
      })
    },
    getDays() {
      const days = []
      const getCurrentMonthDays = () => {
        const date = new Date(this.currentMonth)
        date.setDate(1)
        while (date.getMonth() === this.currentMonth.getMonth()) {
          days.push(this.setDateAttr(new Date(date)))
          date.setDate(date.getDate() + 1)
        }
      }
      const getPrevMonthDays = firstDay => {
        const date = new Date(firstDay)
        while (date.getDay() > 0) {
          date.setDate(date.getDate() - 1)
          days.unshift(this.setDateAttr(new Date(date), false))
        }
      }
      const getNextMonthDays = lastDay => {
        const date = new Date(lastDay)
        while (date.getDay() < 6) {
          date.setDate(date.getDate() + 1)
          days.push(this.setDateAttr(new Date(date), false))
        }
      }
      getCurrentMonthDays()
      getPrevMonthDays(days[0].date)
      getNextMonthDays(days[days.length - 1].date)

      return days
    }
  }
}
</script>

<style lang="scss" module>
.month {
}
.currentMonth {
}
.grid {
}
</style>
