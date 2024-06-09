<template>
  <section
    class="plot"
    @click="closePopup"
  >
    <div class="plot__container">
      <div
        class="plot__body"
        @click="$event.stopPropagation()"
      >
        <div class="plot__items">
          <div class="plot__item">
            <input
              class="plot__input plot__input_min"
              type="date"
              @change="minChange"
            >
          </div>
          <div class="plot__item">
            <input
              class="plot__input plot__input_max"
              type="date"
              @change="maxChange"
            >
          </div>
        </div>
        <div class="plot__content" />
      </div>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue';
import Plotly from 'plotly.js-dist-min';

export default {
  name: 'OrdersPlot',
  setup() {
    const theme = inject('theme');
    const themeAlpha = inject('themeAlpha');
    return { theme, themeAlpha };
  },
  data() {
    return {
      minI: 0,
      maxI: 0,
      orders: [],
      plotContent: null,
      minInput: null,
      maxInput: null,
    };
  },
  mounted() {
    this.plotContent = document.querySelector('.plot__content');
    this.minInput = document.querySelector('.plot__input_min');
    this.maxInput = document.querySelector('.plot__input_max');

    const layout = {
      title: {
        text: 'Количество заказов',
        font: { color: '#000' },
      },
      xaxis: { title: { text: 'Даты', font: { color: '#000' }}, fixedrange: true },
      yaxis: { title: { text: 'Количество', font: { color: '#000' }}, dtick: 1, fixedrange: true },
    };

    Plotly.newPlot(this.plotContent, [{}], layout, { displayModeBar: false, responsive: true });
  },
  methods: {
    cardClick(orders) {
      this.minI = 0;
      this.maxI = orders.length - 1;
      this.minInput.value = orders[0].date.toISOString().slice(0, -14);
      this.maxInput.value = orders.at(-1).date.toISOString().slice(0, -14);
      this.minInput.min = orders[0].date.toISOString().slice(0, -14);
      this.minInput.max = this.maxInput.value;
      this.maxInput.min = this.minInput.value;
      this.maxInput.max = orders.at(-1).date.toISOString().slice(0, -14);

      Plotly.deleteTraces(this.plotContent, 0);
      Plotly.addTraces(this.plotContent, {
        x: orders.slice(this.minI, this.maxI + 1).map(o => o.date.toLocaleString('ru').slice(0, -10)),
        y: orders.slice(this.minI, this.maxI + 1).map(o => o.n),
        mode: 'lines+markers',
        name: 'test1',
        line: { color: this.theme },
      });
      this.orders = orders;
    },
    closePopup() {
      document.querySelector('.plot').classList.remove('_open');
      document.body.classList.remove('_lock');
    },
    minChange(e) {
      this.maxInput.min = e.target.value;
      const date = new Date(e.target.value);
      for (let i = 0; i <= this.maxI; i++)
        if (this.orders[i].date >= date) {
            this.minI = i;
            break;
        }
      this.editTraces();
    },
    maxChange(e) {
      this.minInput.max = e.target.value;
      const date = new Date(e.target.value);
      for (let i = this.orders.length - 1; i >= this.minI; i--)
        if (this.orders[i].date <= date) {
            this.maxI = i;
            break;
        }
      this.editTraces();
    },
    editTraces() {
      Plotly.deleteTraces(this.plotContent, 0);
      Plotly.addTraces(this.plotContent, {
        x: this.orders.slice(this.minI, this.maxI + 1).map(o => o.date.toLocaleString('ru').slice(0, -10)),
        y: this.orders.slice(this.minI, this.maxI + 1).map(o => o.n),
        mode: 'lines+markers',
        name: 'test1',
        line: { color: this.theme },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.plot {
  position: fixed;
  z-index: 5;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: v-bind(themeAlpha());
  transition: top .8s ease;
  &._open {
    top: 0;
  }
  &__container {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &__body {
    flex: 1 1 auto;
    cursor: default;
  }
  &__items {
    display: flex;
    gap: 5px;
  }
  &__item {
    flex: 0 1 50%;
    font-weight: 700;
  }
  &__input {
    width: 100%;
    text-align: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    color: #fff;
    background-color: v-bind(theme);
  }
}
</style>