<template>
  <div :class="$style.formInfo">
    <div :class="$style.price">{{ price }} {{ currency }}</div>
    <div :class="$style.rating">
      <AppStars :rating="rating" />
      <span :class="$style.votes">
        {{ votes }}
      </span>
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
    }
  }
}
</script>

<style lang="scss" module>
.formInfo {
  background: transparent;
  width: 100%;
}
.price {
  padding-bottom: 1rem;
  font-size: 2.4rem;
  line-height: 1;
  font-weight: var(--font-bold);
  color: var(--tundora);
}
.rating {
  display: flex;
  align-items: flex-start;
}
.votes {
  line-height: 1;
  font-size: 1.2rem;
  font-weight: var(--font-bold);
  color: var(--dove-gray);
  padding-left: 0.4rem;
}
</style>
