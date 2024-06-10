<template>
  <FormAdd />
  <section class="products">
    <div class="products__container">
      <ProductCard
        v-for="(product, id) in editedProducts"
        :key="id"
        :orders="product.orders"
        @card-click=""
      >
        <ProductEdit
          :id="id"
          v-model:img-name="product.imgName"
          v-model:name="product.name"
          v-model:price="product.price"
          v-model:description="product.description"
        />
      </ProductCard>
    </div>
  </section>
  <section class="buttons">
    <div
      v-show="showAdminBtns"
      class="buttons__container"
    >
      <button
        class="buttons__save btn"
        @click="save"
      >
        Сохранить
      </button>
      <button
        class="buttons__cancel btn btn_red"
        @click="cancel"
      >
        Отмена
      </button>
    </div>
  </section>
</template>

<script>
import { ref, provide, inject } from 'vue';
import FormAdd from '../components/FormAdd.vue';
import OrdersPlot from '../components/OrdersPlot.vue';
import ProductCard from '../components/ProductCard.vue';
import ProductEdit from '../components/ProductEdit.vue';

export default {
  name: 'HomeView',
  components: {
    FormAdd,
    OrdersPlot,
    ProductCard,
    ProductEdit,
  },
  setup() {
    const showAdminBtns = ref(false);
    const edits = ref({});
    provide('edits', edits);

    const theme = inject('theme');
    const products = inject('products');
    const editedProducts = inject('editedProducts');
    return { edits, theme, products, editedProducts };
  },
  methods: {
    async save() {
      this.showAdminBtns = false;
      for (const edit of this.edits) {
        const index = this.products.findIndex(p => p.id === edit.id);
        for (const field in edit.fields)
          this.products[index][field] = edit.fields[field];
      }
      await fetch('http://localhost:3000/edit', {
        method: 'post',
        body: fd,
      });
    },
    cancel() {
      this.showAdminBtns = false;

      for (const id of this.edits) {
        const product = this.products.find(p => p.id === +id);
        for (const field of this.edits)
          this.editedProducts[id][field] = product[field];
      }

      this.edits = {};
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

.buttons {
  &__container {
    display: flex;
    gap: 15px;
  }
}

</style>
