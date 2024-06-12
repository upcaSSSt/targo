<template>
  <div
    class="basket-card"
    @click="showPlot"
  >
    <div class="basket-card__img">
      <img
        :src="require(`../assets/${imgName}`)"
        alt="Product"
      >
    </div>
    <div class="basket-card__info">
      <h5 class="basket-card__name">
        {{ name }}
      </h5>
      <div class="basket-card__price">
        {{ (price * n).toLocaleString('ru') }} ₽
      </div>
    </div>
    <div class="basket-card__buttons">
      <button
        class="basket-card__button"
        @click="add"
      >
        +
      </button>
      <div class="basket-card__n">
        {{ n }}
      </div>
      <button
        class="basket-card__button"
        @click="minus"
      >
        -
      </button>
    </div>
  </div>
</template>

<script>
import { inject, getCurrentInstance } from 'vue';

export default {
  name: 'BasketCard',
  props: {
    imgName: {
      type: String,
      default: '404.webp',
      require: true,
    },
    name: {
      type: String,
      default: 'Без имени',
      require: true,
    },
    price: {
      type: Number,
      default: 0,
      require: true,
    },
    n: {
      type: Number,
      default: 1,
      require: true,
    },
  },
  emits: ['update:n'],
  setup() {
    const counter = inject('counter');
    const theme = inject('theme');
    const products = inject('products');
    const basket = inject('basket');
    const { key } = getCurrentInstance().vnode;
    return { counter, theme, products, basket, key };
  },
  methods: {
    add() {
      this.$emit('update:n', this.n + 1);
      this.counter += 1;
    },
    minus() {
      this.$emit('update:n', this.n - 1);
      this.counter -= 1;
      
      if (this.n === 1)
        delete this.basket[this.key];
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/style.scss";
@import "../scss/mixins.scss";

.basket-card {
  flex: 0 1 32%;
  display: flex;
  align-items: center;
  border-radius: 20px;
  //gap: 15px;
  padding: 10px;
  border: 1px solid v-bind(theme);
  box-shadow: 5px 5px 10px v-bind(theme);
  &__img {
    flex: 0 0 33.333%;
    height: rem(100); ////
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__info {
    margin: 0 0 0 15px;
    & >*:not(:last-child) {
      margin: 0 0 10px;
    }
  }
  &__name {
    
  }
  &__buttons {
    //flex: 0 1 13%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 0 0 5px;
    margin: 0 0 0 auto;
  }
  &__button {
    width: 30px;
    border-radius: 10px;
    padding: em(7);
    background-color: v-bind(theme);
    &_red {
      background-color: #ee4b2b;
    }
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
