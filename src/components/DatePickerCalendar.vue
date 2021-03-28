<template>
  <div
    data-testid="date-picker-calendar"
    :class="[
      $style.calendar,
      { [$style.calendarCheckIn]: editMode === 'checkIn' },
      { [$style.calendarCheckOut]: editMode === 'checkOut' }
    ]"
  >
    <DatePickerNav
      @prevMonth="prevMonth"
      @nextMonth="nextMonth"
      :prevEnable="getCurrentMonthIndex !== 0"
      :nextEnable="getCurrentMonthIndex !== this.getRange.length - 1"
    >
      {{ currentMonth.getMonth() | convertMonth }}
      {{ currentMonth.getFullYear() }}
    </DatePickerNav>
    <transition name="quick" mode="out-in">
      <DatePickerMonth
        :key="currentMonth.getTime()"
        :current-month="currentMonth"
        :locked-days="lockedDays"
        :date-from="dateFrom"
        :date-to="dateTo"
        :edit-mode="editMode"
      />
    </transition>
  </div>
</template>

<script>
import DatePickerMonth from './DatePickerMonth'
import DatePickerNav from './DatePickerNav'
import { getMonthDiff } from '@/utils/dateFunctions'
export default {
  name: 'DatePickerCalendar',
  components: {
    DatePickerMonth,
    DatePickerNav
  },
  props: {
    dateFrom: {
      type: Date,
      default: null
    },
    dateTo: {
      type: Date,
      default: null
    },
    calendarSetup: {
      type: Object,
      required: true
    },
    lockedDays: {
      type: Array,
      default: () => []
    },
    editMode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentMonth: new Date(new Date().setHours(0, 0, 0, 0))
    }
  },
  computed: {
    getRange() {
      const thisYear = new Date().getFullYear()
      const {
        firstMonth = `${thisYear}-01-01`,
        lastMonth = `${thisYear}-12-01`
      } = this.calendarSetup
      const monthArr = []

      const monthQty =
        getMonthDiff(new Date(firstMonth), new Date(lastMonth)) + 1

      for (let i = 0; i < monthQty; i++) {
        const baseMonth = new Date(firstMonth.valueOf())
        monthArr.push(new Date(baseMonth.setMonth(baseMonth.getMonth() + i)))
      }

      return monthArr
    },
    getCurrentMonthIndex() {
      return this.getRange
        .map(el => el.toDateString())
        .indexOf(new Date(this.currentMonth.setDate(1)).toDateString())
    }
  },
  methods: {
    prevMonth() {
      if (this.getCurrentMonthIndex > 0) {
        this.currentMonth = new Date(
          this.currentMonth.setMonth(this.currentMonth.getMonth() - 1, 1)
        )
      }
    },
    nextMonth() {
      if (this.getCurrentMonthIndex !== this.getRange.length - 1) {
        this.currentMonth = new Date(
          this.currentMonth.setMonth(this.currentMonth.getMonth() + 1, 1)
        )
      }
    }
  },
  watch: {
    editMode(value) {
      if (value === 'checkIn' && this.dateFrom !== null) {
        this.currentMonth = new Date(new Date(this.dateFrom).setDate(1))
      } else if (value === 'checkOut' && this.dateTo !== null) {
        this.currentMonth = new Date(new Date(this.dateTo).setDate(1))
      }
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
  },
  created() {
    if (this.getCurrentMonthIndex === -1) {
      this.currentMonth = this.getRange[0]
    }
  }
}
</script>

<style lang="scss" module>
.calendar {
  position: relative;
  width: 100%;
  z-index: 5;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  &:before {
    content: '';
    position: absolute;
    top: -0.7rem;
    left: 2rem;
    width: 2rem;
    height: 2rem;
    border: 0.1rem solid var(--alto);
    transform: rotate(45deg);
    transition: 0.5s left ease;
    z-index: -1;
  }
}
.calendarCheckIn {
  &:before {
    left: 2rem;
  }
}
.calendarCheckOut {
  &:before {
    left: 24rem;
  }
}
</style>
