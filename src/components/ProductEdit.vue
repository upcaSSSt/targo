<template>
  <div class="card__img">
    <label>
      <img
        :src="require(`../assets/${imgName}`)"
        alt="Product"
      >
      <input
        type="file"
        accept="image/*"
        name="img"
      >
    </label>
  </div>
  <input
    class="card__name"
    name="name"
    :value="name"
    @blur="addEdited"
  >
  <input
    class="card__price"
    name="price"
    :value="price"
    @blur="addEdited"
  >
  <input
    class="card__description"
    name="description"
    :value="description"
    @blur="addEdited"
  >
  <div class="card__buttons">
    <button
      class="card__button btn_red"
      @click="del"
    >
      Удалить
    </button>
  </div>
</template>

<script>
import { inject, getCurrentInstance } from 'vue';

export default {
  name: 'TargoHeader',
  props: {
    id: {
      type: Number,
      require: true,
    },
    imgName: {
      type: String,
      default: '404.webp',
      require: true,
    },
    name: {
      type: String,
      default: 'Имя отсутствует...',
      require: true,
    },
    price: {
      type: Number,
      default: 0,
      require: true,
    },
    description: {
      type: String,
      default: 'Описание отсутствует...',
      require: true,
    },
  },
  setup() {
    const edits = inject('edits');
    const products = inject('products');
    const basket = inject('basket');
    return { edits, products, basket };
  },
  methods: {
    async addEditedImg(e) {
      if (this.edits[this.id]) {
        if (this.edits[this.id].imgName)
          await fetch('http://localhost:3000/delFile', {
            method: 'post',
            body: JSON.stringify({ name: this.edits[this.id].imgName }),
          });
        this.edits[this.id].fields.imgName = e.target.files[0].name;
      }
      else
        this.edits[this.id] = { id: this.id, fields: { imgName: e.target.files[0].name } };
    },
    addEdited(e) {
      const nn = this.edits.find(ef => ef.id === this.id);
      if (nn)
        nn.fields[e.target.name] = e.target.value;
      else
        this.edits.push({ id: this.id, fields: { [e.target.name]: e.target.value } });
    },
    async del(e) {
      e.stopPropagation();
      if (confirm(`Вы действительно хотите удалить ${this.name}?`)) {
        const index = this.products.findIndex((p) => p.id === this.id);
        this.products.splice(index, 1);
        const res = await fetch('http://localhost:3000/del', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ index }),
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
input, textarea {
  text-align: center;
}
</style>
