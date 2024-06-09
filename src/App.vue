<template>
  <FormAdd />
  <OrdersPlot ref="ordersPlot" />
  <TargoHeader />
  <main class="main">
    <div class="main__container">
      <CardsContainer
        @card-click="cardClick"
      />
    </div>
  </main>
  <TargoFooter />
</template>

<script>
import { ref, provide } from 'vue';
import FormAdd from './components/FormAdd.vue';
import OrdersPlot from './components/OrdersPlot.vue';
import TargoHeader from './components/TargoHeader.vue';
import CardsContainer from './components/CardsContainer.vue';
import TargoFooter from './components/TargoFooter.vue';

export default {
  name: 'App',
  components: {
    FormAdd,
    OrdersPlot,
    TargoHeader,
    CardsContainer,
    TargoFooter,
  },
  setup() {
    const theme = ref('rgb(245, 245, 220)');
    const showAddForm = ref(false);
    const products = ref([]);
    const themeAlpha = () => `rgba${theme.value.slice(3, -1)}, 0.5)`;
    const toggleForm = () => showAddForm.value = !showAddForm.value;

    provide('theme', theme);
    provide('showAddForm', showAddForm);
    provide('products', products);
    provide('themeAlpha', themeAlpha);
    provide('toggleForm', toggleForm);
    return { theme, products, themeAlpha };
  },
  methods: {
    cardClick(orders) {
      this.$refs.ordersPlot.cardClick(orders);
    }
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

.btn {
  border-radius: 15px;
  padding: 10px 15px;
  background-color: v-bind(theme);
}

.main {
  padding: 50px 0;
}
</style>
