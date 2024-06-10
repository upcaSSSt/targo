<template>
  <div
    class="card"
    @click="showPlot"
  >
    <slot></slot>
  </div>
</template>

<script>
import { inject, getCurrentInstance } from 'vue';

export default {
  name: 'TargoHeader',
  props: {
    orders: {
      type: Array,
      default: null,
      require: true,
    },
  },
  emits: ['cardClick'],
  setup() {
    const theme = inject('theme');
    return { theme };
  },
  mounted() {
  },
  methods: {
    showPlot() {
      this.$emit('cardClick', this.orders);
    },
  },
};
</script>

<style lang="scss">
@import "../scss/style.scss";
@import "../scss/mixins.scss";

.card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  gap: 10px;
  flex: 0 1 23%;
  border: 1px solid v-bind(theme);
  box-shadow: 5px 5px 10px v-bind(theme);
  &__img {
    height: rem(300);
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & input {
      display: none;
    }
  }
  &__name {
    letter-spacing: .5px;
  }
  &__description {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__button {
    width: 100%;
    padding: em(10);
    background-color: v-bind(theme);
    &_red {
      background-color: #ee4b2b;
    }
  }
  & > *:not(:first-child):not(:last-child) {
    padding: 0 em(15); ////
  }
  @media (max-width: $tablet) {
    & {
      flex: 0 1 45%;
    }
  }
  @media (max-width: $mobile) {
    & {
      flex: 1 1 100%;
    }
  }
}
</style>
