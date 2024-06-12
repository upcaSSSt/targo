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
              ref="min"
              class="plot__input plot__input_min"
              type="date"
              @change="minChange"
            >
          </div>
          <div class="plot__item">
            <input
              ref="max"
              class="plot__input plot__input_max"
              type="date"
              @change="maxChange"
            >
          </div>
        </div>
        <div class="plot__content">
          <div
            v-show="showEmpty"
            class="plot__empty"
          >
              Нет заказов
          </div>
          <div
            ref="plot"
            class="plot__plot"
          />
        </div>
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
      showEmpty: false,
      minI: 0,
      maxI: 0,
      orders: [],
    };
  },
  mounted() {
    const layout = {
      title: {
        text: 'Количество заказов',
        font: { color: '#000' },
      },
      xaxis: { title: { text: 'Даты', font: { color: '#000' } }, fixedrange: true },
      yaxis: { title: { text: 'Количество', font: { color: '#000' } }, dtick: 1, fixedrange: true },
    };

    Plotly.newPlot(this.$refs.plot, [{}], layout, { displayModeBar: false, responsive: true });
  },
  methods: {
    cardClick(orders) {
      this.minI = 0;
      this.maxI = orders.length;

      if (orders.length > 0) {
        this.showEmpty = false;
        this.$refs.min.value = orders[0].date.toISOString().slice(0, -14);
        this.$refs.max.value = orders.at(-1).date.toISOString().slice(0, -14);
        this.$refs.min.min = orders[0].date.toISOString().slice(0, -14);
        this.$refs.max.max = orders.at(-1).date.toISOString().slice(0, -14);
      }
      else {
        this.showEmpty = true;
        const now = new Date();
        now.setHours(now.getTimezoneOffset() / -60, 0, 0, 0);
        this.$refs.min.value = now.toISOString().slice(0, -14);
        this.$refs.max.value = now.toISOString().slice(0, -14);
        this.$refs.min.min = now.toISOString().slice(0, -14);
        this.$refs.max.max = now.toISOString().slice(0, -14);
      }
      this.$refs.min.max = this.$refs.max.value;
      this.$refs.max.min = this.$refs.min.value;

      this.orders = orders;
      this.editTraces();
    },
    closePopup() {
      document.querySelector('.plot').classList.remove('_open');
      document.body.classList.remove('_lock');
    },
    minChange(e) {
      this.$refs.max.min = e.target.value;
      const date = new Date(e.target.value);
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].date >= date) {
          this.minI = i;
          break;
        }
      }
      this.editTraces();
    },
    maxChange(e) {
      this.$refs.min.max = e.target.value;
      const date = new Date(e.target.value);
      for (let i = this.orders.length - 1; i >= 0; i--) {
        if (this.orders[i].date <= date) {
          this.maxI = i + 1;
          break;
        }
      }
      this.editTraces();
    },
    editTraces() {
      Plotly.deleteTraces(this.$refs.plot, 0);
      Plotly.addTraces(this.$refs.plot, {
        x: this.orders.slice(this.minI, this.maxI).map((o) => o.date.toLocaleString('ru').slice(0, -10)),
        y: this.orders.slice(this.minI, this.maxI).map((o) => o.n),
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
    &::-webkit-datetime-edit-day-field,
    &::-webkit-datetime-edit-month-field,
    &::-webkit-datetime-edit-year-field {
      color: #fff;
    }
    &:selection {
      background-color: transparent;
    }
  }
  &__content {
    position: relative;
  }
  &__empty {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
</style>
