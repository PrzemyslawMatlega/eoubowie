<template>
  <div :class="$style.navbar">
    <div :class="$style.arrowWrapper" data-testid="prev-month-wrapper">
      <transition name="quick">
        <div
          v-if="prevEnable"
          @click="$emit('prevMonth')"
          :class="$style.arrow"
          data-testid="prev-month-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
            <defs />
            <path
              d="M198.608 246.104L382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z"
            />
          </svg>
        </div>
      </transition>
    </div>
    <div :class="$style.date">
      <slot></slot>
    </div>
    <div :class="$style.arrowWrapper" data-testid="next-month-wrapper">
      <transition name="quick">
        <div
          v-if="nextEnable"
          @click="$emit('nextMonth')"
          :class="[$style.arrow, $style.arrowRevers]"
          data-testid="next-month-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
            <defs />
            <path
              d="M198.608 246.104L382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z"
            />
          </svg>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prevEnable: {
      type: Boolean,
      required: true
    },
    nextEnable: {
      type: Boolean,
      required: true
    }
  }
}
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
  user-select: none;
}
.arrowWrapper {
  min-width: 3.8rem;
}
.arrow {
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  user-select: none;
  svg {
    height: 1.8rem;
  }
  &:hover {
    transform: translateX(-0.2rem);
  }
}
.arrowRevers {
  svg {
    transform: rotate(180deg);
  }
  &:hover {
    transform: translateX(0.2rem);
  }
}
</style>
