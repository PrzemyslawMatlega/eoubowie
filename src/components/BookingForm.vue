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
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :unavailableDates="unavailableDates"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BookingFormInfo from './BookingFormInfo'
import DatePicker from './DatePicker'
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
    unavailableDates: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" module>
.bookingForm {
  width: 44rem;
  padding: 1rem 1.5rem 7rem;
  background: var(--gallery);
}
.wrapper {
  width: 100%;
  height: 400px;
  border: 0.1rem solid var(--alto);
  border-radius: 0.3rem;
  padding: 2.5rem;
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
  padding: 0.7rem 1rem;
  border-radius: 0.3rem;
}
</style>
