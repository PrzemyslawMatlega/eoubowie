<template>
  <div :class="$style.month">
    <div :class="$style.navbar">
      <div @click="$emit('prevMonth')">PREV</div>
      <div :class="$style.currentMonth">{{ singleDate }}</div>
      <div @click="$emit('nextMonth')">NEXT</div>
    </div>
    <div :class="$style.grid"></div>
  </div>
</template>

<script>
export default {
  props: {
    singleDate: {
      type: Date,
      required: true
    }
  }
}
</script>

<style lang="scss" module>
.month {
}
.currentMonth {
}
.grid {
}
</style>
