<template>
  <div
    :class="[
      $style.day,
      {
        [$style.dayCurrentMonth]: isCurrentMonth,
        [$style.dayToday]: isToday,
        [$style.dayUnavailable]: isUnavailable,
        [$style.dayFrom]: isDateFrom,
        [$style.dayTo]: isDateTo
      }
    ]"
  >
    <div :class="$style.inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCurrentMonth: {
      type: Boolean,
      required: true
    },
    isToday: {
      type: Boolean,
      required: true
    },
    isUnavailable: {
      type: Boolean,
      required: true
    },
    isDateFrom: {
      type: Boolean,
      required: true
    },
    isDateTo: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" module>
.day {
  @extend %flex-cc;
  height: 4.5rem;
  font-size: 1.5rem;
  font-weight: var(--font-bold);
  color: var(--alto);
  user-select: none;
}
.dayCurrentMonth {
  color: var(--lemon-gras);
}
.dayToday {
  color: var(--turquoise-blue);
  .inner {
    @extend %flex-cc;
    height: 4.5rem;
    width: 4.5rem;
    border: 0.2rem solid var(--caribbean-green);
    border-radius: 50%;
  }
}
.dayUnavailable {
  color: var(--alto);
}
.dayFrom {
  background: red;
}
.dayTo {
  background: blue;
}
</style>
