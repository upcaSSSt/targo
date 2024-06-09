<template>
  <section
    v-show="showAddForm"
    class="form-add"
  >
    <form
      name="product-add"
      class="form-add__add add"
      enctype="multipart/form-data"
      @submit="addProduct"
    >
      <h2 class="add__title">
        Добавить товар
      </h2>
      <div class="add__img">
        <input
          class="add__input"
          type="file"
          accept="image/*"
          name="img"
          required
        >
      </div>
      <div class="add__name">
        <label>
          <h3 class="add__subtitle">Название</h3>
          <input
            class="add__input"
            type="text"
            name="name"
            placeholder="Имя отсутствует..."
          >
        </label>
      </div>
      <div class="add__price">
        <label>
          <h3 class="add__subtitle">Цена</h3>
          <input
            class="add__input"
            name="price"
            type="number"
            min="1"
            required
          >
        </label>
      </div>
      <div class="add__description">
        <label>
          <h3 class="add__subtitle">Описание</h3>
          <textarea
            name="description"
            class="add__input"
            placeholder="Описание отсутствует..."
          />
        </label>
      </div>
      <div class="add__button">
        <button class="btn">
          Добавить
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { inject } from 'vue';
export default {
  name: 'FormAdd',
  setup() {
    const theme = inject('theme');
    const products = inject('products');
    const showAddForm = inject('showAddForm');
    const themeAlpha = inject('themeAlpha');
    return { theme, products, showAddForm, themeAlpha };
  },
  methods: {
    async addProduct(e) {
      e.preventDefault();
      const form = document.querySelector('.form-add__add');
      const fd = new FormData(form);
      form.reset();
      
      if (!fd.get('name'))
        fd.set('name', 'Имя отсутствует...');
      if (!fd.get('description'))
        fd.set('description', 'Описание отсутствует...');

      const res = await fetch('http://localhost:3000/', {
        method: 'post',
        body: fd,
      });
      const now = new Date();
      now.setHours(now.getTimezoneOffset() / -60, 0, 0, 0);
      try {
        setTimeout(() => {
          this.products.push({
            imgName: fd.get('img').name,
            name: fd.get('name'),
            price: +fd.get('price'),
            description: fd.get('description'),
            orders: [{ date: now, n: 1 }],
            id: new Date().getTime(),
          });
        }, 2000);
      }
      catch {
        alert('Не удалось добавить товар. Попробуйте снова');
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.form-add {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: v-bind(themeAlpha());
}
.add {
  font-size: rem(20);
  border-radius: 20px;
  text-align: center;
  padding: 15px; ////
  border: 2px solid v-bind(theme);
  background-color: #fff;
  &__title {
    font-weight: 700;
    text-align: center;
  }
  &__description textarea {
    min-height: em(100);
  }
  &__subtitle {
    font-weight: 600;
    margin: 10px 0;
  }
  &__input {
    border-radius: 15px;
    width: 100%;
    padding: em(10);
    background-color: v-bind(themeAlpha());
  }
  & >*:not(:last-child) {
    margin: 0 0 10px;
  }
}
</style>
