<template>
  <div
    class="card"
    @click="showPlot"
  >
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
      {{ `${price.toLocaleString('ru')} ₽` }}
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
      <button
        class="card__button card__button_red"
        @click="del"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import { inject, getCurrentInstance } from 'vue';
import Plotly from 'plotly.js-dist-min';
export default {
  name: 'TargoHeader',
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
    description: {
      type: String,
      default: 'Описание отсутствует',
      require: true,
    },
    orders: {
      type: Array,
      default: null,
      require: true,
    },
  },
  emits: ['cardClick'],
  setup() {
    const theme = inject('theme');
    const products = inject('products');
    const key = getCurrentInstance().vnode.key;
    return { theme, products, key };
  },
  mounted() {
    console.log(this.name, this.key);
  },
  methods: {
    showPlot() {
      this.$parent.$emit('cardClick', this.orders);
      document.querySelector('.plot').classList.add('_open');
      document.body.classList.add('_lock');
    },
    async order(e) {
      e.stopPropagation();
      const index = this.products.findIndex(p => p.id === this.key);
      const now = new Date();
      now.setHours(now.getTimezoneOffset() / -60, 0, 0, 0);
      if (this.products[index].orders.at(-1).date < now)
        this.products[index].orders.push({ date: now, n: 1 });
      else
        this.products[index].orders.at(-1).n += 1;
      const res = await fetch('http://localhost:3000/order', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index, now: now.toISOString().slice(0, -14) }),
      });
    },
    async del(e) {
      e.stopPropagation();
      if (confirm(`Вы действительно хотите удалить ${this.name}?`)) {
        const index = this.products.findIndex(p => p.id === this.key);
        this.products.splice(index, 1);
        const res = await fetch('http://localhost:3000/del', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ index }),
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
  box-shadow: 3px 3px 10px #000;
  &__img {
    height: rem(300); ////
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
  &__buttons {
    display: flex;
  }
  &__button {
    flex: 1 0 50%;
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
