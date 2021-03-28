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
          :locked-days="convertlockedDays"
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
import { convertToDateObject, areDaysInRange } from '@/utils/dateFunctions'
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
  computed: {
    convertlockedDays() {
      return this.lockedDays.map(el => convertToDateObject(el))
    }
  },
  created() {
    const initValidation = () => {
      let isValid = true
      if (this.dateFrom === '' && this.dateTo === '') return isValid

      const dateArr = [this.dateFrom, this.dateTo].map(el =>
        convertToDateObject(el)
      )

      if (areDaysInRange(dateArr[0], dateArr[1], this.convertlockedDays)) {
        isValid = false
      }

      return isValid
    }
    if (initValidation()) {
      this.formData.dateFrom =
        this.dateFrom !== '' ? new Date(this.dateFrom) : null
      this.formData.dateTo = this.dateTo !== '' ? new Date(this.dateTo) : null
    }

    EventBus.$on('dayClicked', payload => {
      if (payload.editMode === 'checkIn') {
        this.formData.dateFrom = payload.date
        if (payload.lockedInRange) {
          this.formData.dateTo = null
        }
      } else {
        this.formData.dateTo = payload.date
        if (payload.lockedInRange) {
          this.formData.dateFrom = null
        }
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
