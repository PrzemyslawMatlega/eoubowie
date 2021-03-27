<template>
  <div :class="$style.month">
    <div :class="$style.grid">
      <div v-for="weekDay in weekDayArr" :key="weekDay" :class="$style.weekDay">
        {{ weekDay }}
      </div>
      {{ getDays }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weekDayArr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  props: {
    currentDate: {
      type: Date,
      required: true
    }
  },
  computed: {
    getDays() {
      const days = []
      const getCurrentMonthDays = () => {
        const date = new Date(this.currentDate)
        date.setDate(1)
        while (date.getMonth() === this.currentDate.getMonth()) {
          days.push(new Date(date))
          date.setDate(date.getDate() + 1)
        }
      }
      function getPrevMonthDays(firstDay) {
        const date = new Date(firstDay)
        while (date.getDay() > 0) {
          date.setDate(date.getDate() - 1)
          days.unshift(new Date(date))
        }
      }
      function getNextMonthDays(lastDay) {
        const date = new Date(lastDay)
        while (date.getDay() < 6) {
          date.setDate(date.getDate() + 1)
          days.push(new Date(date))
        }
      }
      getCurrentMonthDays()
      getPrevMonthDays(days[0])
      getNextMonthDays(days[days.length - 1])

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
