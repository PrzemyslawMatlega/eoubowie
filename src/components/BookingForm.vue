<template>
  <div :class="$style.bookingForm">
    <div :class="$style.wrapper">
      <div :class="$style.formInfoWrapper">
        <BookingFormInfo
          :price="price"
          :currency="currency"
          :rating="rating"
          :votes="votes"
          :class="$style.bookingFormInfo"
        />
      </div>
      <div :class="$style.datesHeading">Dates</div>
      <div :class="$style.datePickerWrapper">
        <DatePicker
          :date-from="formData.dateFrom"
          :date-to="formData.dateTo"
          :locked-days="lockedDays"
          :calendar-setup="calendarSetup"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BookingFormInfo from './BookingFormInfo'
import DatePicker from './DatePicker'
import { EventBus } from '@/utils/eventBus'
import {
  areDaysEqual,
  convertToDateObject,
  getDaysBetween
} from '@/utils/dateFunctions'
export default {
  name: 'BookingForm',
  components: {
    BookingFormInfo,
    DatePicker
  },

  props: {
    price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    votes: {
      type: Number,
      default: 0
    },
    dateFrom: {
      type: String,
      default: ''
    },
    dateTo: {
      type: String,
      default: ''
    },
    lockedDays: {
      type: Array,
      default: () => []
    },
    calendarSetup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        dateFrom: null,
        dateTo: null
      }
    }
  },
  created() {
    function validateDateRange(from, to, lockedDays) {
      let isValid = true
      if (from === '' && to === '') return isValid

      const dateArr = [from, to].map(el => convertToDateObject(el))
      const unavailableArr = lockedDays.map(el => convertToDateObject(el))

      isValid = !getDaysBetween(dateArr[0], dateArr[1]).some(day => {
        return unavailableArr.some(el => areDaysEqual(el, day))
      })

      return isValid
    }
    if (validateDateRange(this.dateFrom, this.dateTo, this.lockedDays)) {
      this.formData.dateFrom = new Date(this.dateFrom)
      this.formData.dateTo = new Date(this.dateTo)
    }

    EventBus.$on('dayClicked', payload => {
      if (payload.editMode === 'checkIn') {
        this.formData.dateFrom = payload.date
      } else {
        this.formData.dateTo = payload.date
      }
    })
  }
}
</script>
<style lang="scss" module>
.bookingForm {
  max-width: 50rem;
  padding: 1.3rem 1.7rem 7rem;
  background: var(--gallery);
}
.wrapper {
  width: 100%;
  height: 700px;
  border: 0.1rem solid var(--alto);
  border-radius: 0.3rem;
  padding: 2.5rem 2.7rem;
}
.formInfoWrapper {
  margin-bottom: 2.3rem;
  padding-bottom: 2.3rem;
  border-bottom: 0.1rem solid var(--alto);
}
.datesHeading {
  line-height: 1;
  font-size: 1.3rem;
  font-weight: var(--font-bold);
  color: var(--dove-gray);
  padding-bottom: 1rem;
}
.datePickerWrapper {
  width: 100%;
  border: 0.1rem solid var(--alto);
  border-radius: 0.3rem;
}
</style>
