<template>
  <div :class="$style.datePicker">
    <div :class="$style.dateTab">Check in</div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0,4.67578125,31.48828125,22.140625"
      :class="$style.arrow"
    >
      <path
        d="M21.205 5.007a1.112 1.112 0 00-1.587 0 1.12 1.12 0 000 1.571l8.047 8.047H1.111A1.106 1.106 0 000 15.737c0 .619.492 1.127 1.111 1.127h26.554l-8.047 8.032c-.429.444-.429 1.159 0 1.587a1.112 1.112 0 001.587 0l9.952-9.952a1.093 1.093 0 000-1.571l-9.952-9.953z"
      />
    </svg>
    <div :class="$style.dateTab">Check out</div>
    <div :class="$style.calendarWrapper">
      <DatePickerCalendar
        :calendar-setup="calendarSetup"
        :unavailable-dates="unavailableDates"
      />
    </div>
  </div>
</template>

<script>
import DatePickerCalendar from './DatePickerCalendar'
export default {
  name: 'DatePicker',
  components: {
    DatePickerCalendar
  },
  props: {
    dateFrom: {
      type: String,
      default: ''
    },
    dateTo: {
      type: String,
      default: ''
    },
    unavailableDates: {
      type: Array,
      default: () => []
    },
    calendarSetup: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" module>
.datePicker {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.7rem 1rem;
}
.arrow {
  height: 1.5rem;
  padding: 0 1rem;
  path {
    fill: var(--dove-gray);
  }
}
.dateTab {
  flex-grow: 1;
  padding: 0.3rem 0.8rem;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 1.8rem;
  letter-spacing: 0.1rem;
  line-height: 1;
  color: var(--gray);
  font-weight: var(--font-semi-bold);
  transition: 0.2s all ease;
  &:hover {
    background: var(--alto);
  }
}
.calendarWrapper {
  top: 5rem;
  left: 0;
  width: 100%;
  position: absolute;
}
</style>
