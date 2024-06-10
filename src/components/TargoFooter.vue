<template>
  <section class="footer">
    <div class="footer__container">
      Все права защищены © {{ new Date().getFullYear() }}
    </div>
  </section>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'TargoFooter',
  setup() {
    const theme = inject('theme');
    return { theme };
  },
};
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.footer {
  border-radius: 30px 30px 0 0;
  background-color: v-bind(theme);
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rem(19);
    min-height: em(67.4);
    padding: 10px inherit;
  }
}
</style>
