<template>
  <div :class="$style.month">
    <div :class="$style.grid">
      <div v-for="weekDay in weekDayArr" :key="weekDay" :class="$style.weekDay">
        {{ weekDay }}
      </div>
      <DatePickerDay
        v-for="(day, index) in getDays"
        :key="day.date.getTime()"
        :is-current-month="day.isCurrentMonth"
        :is-today="day.isToday"
        :is-unavailable="day.isUnavailable"
        :is-date-from="day.isDateFrom"
        :is-date-to="day.isDateTo"
        :is-date-between="isDateBetween(day.date)"
        :index="index"
        @click.native="dayClicked(day)"
      >
        {{ day.date.getDate() }}
      </DatePickerDay>
    </div>
  </div>
</template>

<script>
import DatePickerDay from './DatePickerDay'
import { EventBus } from '@/utils/eventBus'
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
    },
    dateFrom: {
      type: Date,
      default: null
    },
    dateTo: {
      type: Date,
      default: null
    },
    editMode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      weekDayArr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      today: new Date(new Date().setHours(0, 0, 0, 0))
    }
  },
  methods: {
    dayClicked({ date, isUnavailable }) {
      let isValid = true
      if (isUnavailable) {
        isValid = false
      }
      // @TODO
      // if (this.editMode === 'checkIn') {
      //   this.parseUnavailableDates.some(el => {
      //     return el.toDateString() <= date.toDateString()
      //   })
      //     ? (isValid = false)
      //     : null
      // }
      // if (this.editMode === 'checkOut') {
      //   this.parseUnavailableDates.some(el => {
      //     return el.toDateString() > date.toDateString()
      //   })
      //     ? (isValid = false)
      //     : null
      // }
      if (isValid) {
        EventBus.$emit('dayClicked', { date, editMode: this.editMode })
      }
    },
    setDateAttr(date, isCurrentMonth = true) {
      return {
        date,
        isCurrentMonth,
        isToday: this.compareDates(this.today, date),
        isUnavailable: this.parseUnavailableDates.some(el =>
          this.compareDates(el, date)
        ),
        isDateFrom: this.compareDates(date, this.dateFrom),
        isDateTo: this.compareDates(date, this.dateTo)
      }
    },
    convertToDate(date) {
      if (typeof date !== 'string') return date
      const dateArr = date.split('-')
      return new Date(
        parseInt(dateArr[2]),
        parseInt(dateArr[1]) - 1,
        parseInt(dateArr[0])
      )
    },
    compareDates(firstDate, secondDate) {
      if (firstDate === null || secondDate === null) return false
      return firstDate.toDateString() === secondDate.toDateString()
    },
    getDaysArr(start, end) {
      let arr = []
      for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt))
      }
      return arr
    },
    isDateBetween(dateBetween) {
      if (this.dateFrom === null || this.dateTo === null) return false
      return this.getDaysArr(this.dateFrom, this.dateTo).some(el => {
        return this.compareDates(dateBetween, el)
      })
    }
  },
  computed: {
    parseUnavailableDates() {
      return this.unavailableDates.map(el => new Date(el))
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
  user-select: none;
}
</style>
