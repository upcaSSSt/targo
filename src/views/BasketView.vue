<template>
  <section class="basket">
    <div class="basket__container">
      <BasketCard
        v-for="(order, id) in basket"
        :key="id"
        :imgName="order.imgName"
        :name="order.name"
        :price="order.price"
        v-model:n="order.n"
      />
    </div>
  </section>
  <section class="order">
    <div class="order__container">
      <div class="order__total">
        Итого: {{ total() }} ₽
      </div>
      <button
        class="btn"
        @click="order"
      >
        Заказать
      </button>
      <button
        class="order__del"
        @click="del"
      >
        <img
          src="../../public/trash.svg"
          alt="Trash"
        >
      </button>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue';
import BasketCard from '../components/BasketCard.vue';

export default {
  name: 'BasketView',
  components: {
    BasketCard,
  },
  setup() {
    const counter = inject('counter');
    const theme = inject('theme');
    const products = inject('products');
    const basket = inject('basket');
    return { counter, theme, products, basket };
  },
  methods: {
    total() {
      let sum = 0;
      for (const id in this.basket)
        sum += this.basket[id].price * this.basket[id].n;
      return sum;
    },
    async order() {
      const newOrders = {};
      const now = new Date();
      now.setHours(now.getTimezoneOffset() / -60, 0, 0, 0);

      for (const id in this.basket) {
        if (this.products[id].orders.length < 1 || this.products[id].orders.at(-1).date < now)
          this.products[id].orders.push({ date: now, n: this.basket[id].n });
        else
          this.products[id].orders.at(-1).n += this.basket[id].n;
        newOrders[id] = this.products[id].orders.at(-1).n;
      }
      this.del();

      await fetch('http://localhost:3000/order', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newOrders, now: now.toISOString().slice(0, -14) }),////
      });
    },
    del() {
      this.counter = 0;
      this.basket = {};
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.basket {
  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
}

.order {
  &__container {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  &__del img {
    filter: invert(66%) sepia(83%) saturate(6545%) hue-rotate(346deg) brightness(96%) contrast(93%);
  }
}

</style>
