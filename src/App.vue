<template>
  <TargoHeader />
  <main class="main">
    <RouterView />
  </main>
  <TargoFooter />
</template>

<script>
import { ref, provide } from 'vue';
import TargoHeader from './components/TargoHeader.vue';
import TargoFooter from './components/TargoFooter.vue';

export default {
  name: 'App',
  components: {
    TargoHeader,
    TargoFooter,
  },
  setup() {
    const counter = ref(0);
    const showAddForm = ref(false);
    const theme = ref('rgb(245, 245, 220)');
    const products = ref([]);
    const editedProducts = ref({});
    const basket = ref({});
    const themeAlpha = () => `rgba${theme.value.slice(3, -1)}, 0.5)`;
    const toggleForm = () => showAddForm.value = !showAddForm.value;

    provide('counter', counter);
    provide('showAddForm', showAddForm);
    provide('theme', theme);
    provide('products', products);
    provide('editedProducts', editedProducts);
    provide('basket', basket);
    provide('themeAlpha', themeAlpha);
    provide('toggleForm', toggleForm);
    return { theme, products, editedProducts, themeAlpha };
  },
  mounted() {
    fetch('http://localhost:3000/').then((response) => response.json()).then((data) => {
      for (const id in data) {
        this.editedProducts[id] = {
          imgName: data[id].imgName,
          name: data[id].name,
          price: data[id].price,
          description: data[id].description,
        };

        for (const order of data[id].orders)
          order.date = new Date(order.date);
      }
      this.products = data;
    });
  },
};
</script>

<style lang="scss">
@import "./scss/style.scss";
@import "./scss/null.scss";
@import "./scss/mixins.scss";
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap");

.svg-container, .main-svg {
  width: 100% !important;
}

::-webkit-calendar-picker-indicator {
    background-color: transparent;
    padding: 5px;
    cursor: pointer;
    border-radius: 3px;
}

.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}

.btn {
  border-radius: 15px;
  padding: 10px 15px;
  background-color: v-bind(theme);
  &_red {
    background-color: #ee4b2b !important;
  }
}

.main {
  padding: 50px 0;
  & >* {
    padding: 0 0 30px;
  }
}
</style>
