<template>
  <div class="card__img">
    <img
      :src="require(`../assets/${imgName}`)"
      alt="Product"
    >
  </div>
  <h3 class="card__name">
    {{ name }}
  </h3>
  <div class="card__price">
    {{ price.toLocaleString('ru') }} ₽
  </div>
  <div class="card__description">
    {{ description }}
  </div>
  <div class="card__buttons">
    <button
      class="card__button"
      @click="order"
    >
      Заказать
    </button>
  </div>
</template>

<script>
import { inject, getCurrentInstance } from 'vue';

export default {
  name: 'TargoHeader',
  props: {
    id: {
      type: Number,
      require: true,
    },
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
    description: {
      type: String,
      default: 'Описание отсутствует...',
      require: true,
    },
  },
  setup() {
    const counter = inject('counter');
    const theme = inject('theme');
    const basket = inject('basket');
    return { counter, theme, basket };
  },
  methods: {
    order(e) {
      e.stopPropagation();

      this.counter += 1;
      const order = this.basket.find(b => b.id === this.id);
      if (order)
        order.n += 1;
      else
        this.basket.push({ imgName: this.imgName, name: this.name, price: this.price, n: 1, id: this.id });
    },
  },
};
</script>

<style scoped lang="scss">

</style>
