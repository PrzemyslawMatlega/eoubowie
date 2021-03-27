<template>
  <div :class="$style.month">
    <div :class="$style.grid">
      <div v-for="weekDay in weekDayArr" :key="weekDay" :class="$style.weekDay">
        {{ weekDay }}
      </div>
      <DatePickerDay
        v-for="day in getDays"
        :key="day.date.getTime()"
        :is-current-month="day.isCurrentMonth"
        :is-today="day.isToday"
        :is-unavailable="day.isUnavailable"
      >
        {{ day.date.getDate() }}
      </DatePickerDay>
    </div>
  </div>
</template>

<script>
import DatePickerDay from './DatePickerDay'
export default {
  components: {
    DatePickerDay
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
  data() {
    return {
      weekDayArr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      today: new Date(new Date().setHours(0, 0, 0, 0))
    }
  },
  methods: {
    setDateAttr(date, isCurrentMonth = true) {
      return {
        date,
        isCurrentMonth,
        isToday:
          this.today.toDateString() === date.toDateString() ? true : false,
        isUnavailable: this.parseUnavailableDates.some(
          el => el.toDateString() === date.toDateString()
        )
      }
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
  background: #fff;
}
.currentMonth {
}
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: auto;
  justify-content: center;
  row-gap: 1.5rem;
  padding: 2.5rem 2rem;
}
.weekDay {
  @extend %flex-cc;
  padding-bottom: 0.5rem;
  font-size: 1.4rem;
  font-weight: var(--font-semi-bold);
  color: var(--silver);
}
</style>
