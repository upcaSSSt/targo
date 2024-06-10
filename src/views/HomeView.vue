<template>
  <OrdersPlot ref="ordersPlot" />
  <section class="products">
    <div class="products__container">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :orders="product.orders"
        @card-click="cardClick"
      >
      <ProductContent
        :id="product.id"
        :img-name="product.imgName"
        :name="product.name"
        :price="product.price"
        :description="product.description"
      />
    </ProductCard>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue';
import OrdersPlot from '../components/OrdersPlot.vue';
import ProductCard from '../components/ProductCard.vue';
import ProductContent from '../components/ProductContent.vue';

export default {
  name: 'HomeView',
  components: {
    OrdersPlot,
    ProductCard,
    ProductContent,
  },
  setup() {
    const theme = inject('theme');
    const products = inject('products');
    return { theme, products };
  },
  methods: {
    cardClick(orders) {
      document.querySelector('.plot').classList.add('_open');
      document.body.classList.add('_lock');
      this.$refs.ordersPlot.cardClick(orders);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.products {
  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 25px; ////
  }
}
</style>
