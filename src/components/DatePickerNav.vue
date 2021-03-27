<template>
  <div :class="$style.navbar">
    <div @click="$emit('prevMonth')">PREV</div>
    <div :class="$style.date">
      <slot></slot>
    </div>
    <div @click="$emit('nextMonth')">NEXT</div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" module>
.navbar {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  min-height: 6.5rem;
  padding: 2rem 2.7rem;
  background: var(--caribbean-green);
}
.date {
  padding: 0 1rem;
  font-size: 2.4rem;
  line-height: 1;
  color: #fff;
}
</style>
