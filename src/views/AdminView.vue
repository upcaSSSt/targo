<template>
  <FormAdd />
  <section class="products">
    <div class="products__container">
      <ProductCard
        v-for="(product, id) in editedProducts"
        :key="id"
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
    <Transition>
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
    </Transition>
  </section>
</template>

<script>
import { ref, provide, inject } from 'vue';
import FormAdd from '../components/FormAdd.vue';
import OrdersPlot from '../components/OrdersPlot.vue';
import ProductCard from '../components/ProductCard.vue';
import ProductEdit from '../components/ProductEdit.vue';

export default {
  name: 'AdminView',
  components: {
    FormAdd,
    OrdersPlot,
    ProductCard,
    ProductEdit,
  },
  setup() {
    const showAdminBtns = ref(false);
    const edits = ref({});
    const editedProducts = ref({});

    const theme = inject('theme');
    const products = inject('products');

    for (const id in products.value)
      editedProducts.value[id] = {
        imgName: products.value[id].imgName,
        name: products.value[id].name,
        price: products.value[id].price,
        description: products.value[id].description,
      };

    provide('showAdminBtns', showAdminBtns);
    provide('edits', edits);
    provide('editedProducts', editedProducts);
    return { showAdminBtns, edits, theme, products, editedProducts };
  },
  async beforeRouteLeave() {
    for (const id in this.edits)
      if (this.edits[id].imgName)
        await fetch('http://localhost:3000/delFile', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: this.edits[id].imgName }),
        });
  },
  methods: {
    async save() {
      this.showAdminBtns = false;
      for (const id in this.edits) {
        const oldImgName = this.products[id].imgName;

        for (const field in this.edits[id])
          this.products[id][field] = this.edits[id][field];
        if (this.edits[id].imgName)
          await fetch('http://localhost:3000/delFile', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: oldImgName }),
          });
      }
      await fetch('http://localhost:3000/edit', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ edits: this.edits }),
      });

      this.edits = {};
    },
    async cancel() {
      this.showAdminBtns = false;

      for (const id in this.edits) {
        for (const field in this.edits[id])
          this.editedProducts[id][field] = this.products[id][field];

        if (this.edits[id].imgName)
          await fetch('http://localhost:3000/delFile', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.edits[id].imgName }),
          });
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
