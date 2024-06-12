<template>
  <header class="header">
    <div class="header__container">
      <RouterLink
        to="/"
        class="header__logo"
      >
        Targo
        <img
          :src="require('../../public/logo.png')"
          alt="Logo"
        >
      </RouterLink>
      <div
        ref="themes"
        class="header__themes themes"
      >
        <button class="themes__button _selected" />
        <button class="themes__button themes_blue" />
        <button class="themes__button themes_banana" />
        <button class="themes__button themes_cyan" />
        <button
          class="themes__button themes_lavender"
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
  </header>
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
  mounted() {
    const media = window.matchMedia('(max-width: 479.98px)');
    media.onchange = () => {
      if (media.matches) {
        for (let i = 0; i < this.$refs.themes.children.length; i++) {
          this.$refs.themes.children[i].style.display = 'none';
          this.$refs.themes.children[i].onclick = e => this.switchButton(e, i);
        }
        document.querySelector('.themes__button._selected').classList.remove('_selected');
        this.$refs.themes.children[1].style.display = 'inline-block';
      }
      else {
        this.$refs.themes.children[0].classList.add('_selected');
        for (const child of this.$refs.themes.children) {
          child.style.display = 'inline-block';
          child.onclick = this.switchTheme;
        }
      }
    };
    media.onchange();
  },
  methods: {
    switchTheme(e) {
      document.querySelector('.themes__button._selected').classList.remove('_selected');
      this.theme = window.getComputedStyle(e.target).backgroundColor;
      e.target.classList.add('_selected');
    },
    switchButton(e, i) {
      this.$refs.themes.children[i].style.display = 'none';
      this.$refs.themes.children[(i + 1) % this.$refs.themes.children.length].style.display = 'inline-block';
      this.theme = window.getComputedStyle(e.target).backgroundColor;
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
    position: relative;
    font-size: rem(20);
    font-weight: 500;
    & img {
      position: absolute;
      bottom: -24%;
      right: -23%;
    }
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
