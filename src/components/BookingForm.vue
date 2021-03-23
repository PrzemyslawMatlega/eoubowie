<template>
  <div :class="$style.bookingForm">
    <div :class="$style.wrapper"></div>
    <BookingFormInfo />
  </div>
</template>
<script>
import BookingFormInfo from './BookingFormInfo'
export default {
  name: 'BookingForm',
  components: {
    BookingFormInfo
  },
  props: {
    price: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'PLN'
    },
    rating: {
      type: Number,
      default: 0
    },
    votes: {
      type: Number,
      default: 0
    },
    date_from: {
      type: String,
      default: ''
    },
    date_to: {
      type: String,
      default: ''
    },
    unavailable_dates: {
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
  background: $gallery;
}
.wrapper {
  width: 100%;
  height: 400px;
  border: 0.1rem solid $alto;
  border-radius: 0.3rem;
}
</style>
