<template>
  <section class="products">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :img-name="product.imgName"
      :name="product.name"
      :price="product.price"
      :description="product.description"
      :orders="product.orders"
    />
  </section>
</template>

<script>
import { inject } from 'vue';
import ProductCard from './ProductCard.vue';

export default {
  name: 'CardsContainer',
  components: {
    ProductCard,
  },
  setup() {
    const theme = inject('theme');
    const products = inject('products');
    return { theme, products };
  },
  mounted() {
    const response = fetch('http://localhost:3000/products').then(response => response.json()).then(data => {
      for (let i = 0; i < data.length; i++) {
        data[i].id = i;
        for (const order of data[i].orders)
          order.date = new Date(order.date);
      }
      this.products = data;
    });
  },
};
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px; ////
}
</style>
