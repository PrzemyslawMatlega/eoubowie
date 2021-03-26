<template>
  <div :class="$style.formInfo">
    <span :class="$style.price">{{ price }} {{ currency }}</span>
    <div :class="$style.rating">
      <AppStars :rating="rating" />
    </div>
  </div>
</template>
<script>
import AppStars from './AppStars'
export default {
  components: {
    AppStars
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
    cmpClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.formInfo {
  background: #fff;
}
.rating {
  width: 200px;
  height: 35px;
}
</style>
