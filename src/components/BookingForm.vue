<template>
  <div :class="$style.bookingForm">
    <div :class="$style.wrapper">
      <FormInfo
        :price="price"
        :currency="currency"
        :rating="rating"
        :votes="votes"
        :class="$style.bookingFormInfo"
      />
    </div>
  </div>
</template>
<script>
import FormInfo from './FormInfo'
export default {
  name: 'BookingForm',
  components: {
    FormInfo
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
  background: var(--gallery);
}
.wrapper {
  width: 100%;
  height: 400px;
  border: 0.1rem solid var(--alto);
  border-radius: 0.3rem;
}
.bookingFormInfo {
  --star-color-full: var(--smalt-blue);
  --star-color-empty: var(--alto);
  background: white;
}
</style>
