<template>
  <div class="home">
    <div :class="$style.raz"></div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" module>
.raz {
  width: 100px;
  height: 100px;
  background: $alto;
}
</style>
