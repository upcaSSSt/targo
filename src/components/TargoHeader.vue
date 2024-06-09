<template>
  <section class="header">
    <div class="header__container">
      <div class="header__logo">
        Targo
      </div>
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
      <BtnAdd />
      <div class="header__basket">
        <img
          src="../../public/basket.svg"
          alt="Basket"
        >
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
    const theme = inject('theme');
    return { theme };
  },
  methods: {
    switchTheme(e) {
      document.querySelector('.themes__button._selected').classList.remove('_selected');
      this.theme = window.getComputedStyle(e.target).backgroundColor;
      e.target.classList.add('_selected');
    }
  }
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
  &__basket img {

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
