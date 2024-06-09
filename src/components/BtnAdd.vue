<template>
  <div class="add">
    <button @click="showForm">
      +
    </button>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: 'BtnAdd',
  setup() {
    const toggleForm = inject('toggleForm');
    return { toggleForm };
  },
  methods: {
    showForm() {
      this.toggleForm();
      document.body.classList.toggle('_lock');
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/style.scss";
@import "../scss/mixins.scss";

.add {
  position: relative;
  z-index: 4;
  & button {
    font-size: rem(48);
    font-weight: 700;
    border-radius: 15px;
  }
}
</style>
