<template>
  <section class="header">
    <div class="header__container">
      <RouterLink
        to="/"
        class="header__logo"
      >
        Targo
      </RouterLink>
      <div class="header__themes themes">
        <button
          class="themes__button _selected"
          @click="switchTheme"
        />
        <button
          class="themes__button themes_blue"
          @click="switchTheme"
        />
        <button
          class="themes__button themes_banana"
          @click="switchTheme"
        />
        <button
          class="themes__button themes_cyan"
          @click="switchTheme"
        />
        <button
          class="themes__button themes_lavender"
          @click="switchTheme"
        />
      </div>
      <BtnAdd v-show="$route.meta.showAddBtn" />
      <div
        v-show="$route.meta.showBasketBtn"
        class="header__buttons"
      >
        <div class="header__admin">
          <RouterLink to="/admin">
            <img
              src="../../public/admin.svg"
              alt="Admin"
            >
          </RouterLink>
        </div>
        <div
          class="header__basket"
        >
          <RouterLink to="/basket">
            <img
              src="../../public/basket.svg"
              alt="Basket"
            >
            <span>
              {{ counter }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue';
import BtnAdd from './BtnAdd.vue';

export default {
  name: 'TargoHeader',
  components: {
    BtnAdd,
  },
  setup() {
    const counter = inject('counter');
    const theme = inject('theme');
    return { counter, theme };
  },
  methods: {
    switchTheme(e) {
      document.querySelector('.themes__button._selected').classList.remove('_selected');
      this.theme = window.getComputedStyle(e.target).backgroundColor;
      e.target.classList.add('_selected');
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";

._selected {
  border: 2px solid #fff;
}

.header {
  border-radius: 0 0 30px 30px;
  background-color: v-bind(theme);
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    min-height: em(80);
    & >* {
      padding: 5px 0;
    }
  }
  &__logo {
    font-size: rem(20);
    font-weight: 500;
  }
  &__themes {
    display: flex;
    gap: em(10);
  }
  &__buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__basket {
    position: relative;
    & span {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: rem(14);
      border-radius: 50%;
      padding: 5px;
      background-color: orange;
    }
  }
}
.themes {
  &__button {
    width: em(20);
    height: em(20);
    border-radius: 50%;
    background-color: rgb(245, 245, 220);
  }
  &_blue {
    background-color: rgb(0, 128, 255);
  }
  &_banana {
    background-color: rgb(255, 225, 53);
  }
  &_cyan {
    background-color: rgb(135, 206, 250);
  }
  &_lavender {
    background-color: rgb(181, 126, 220);
  }
}
</style>
