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
        @change="addEditedImg"
      >
    </label>
  </div>
  <input
    class="card__name"
    name="name"
    :value="name"
    @blur="addEdited($event, $event.target.value)"
  >
  <input
    class="card__price"
    name="price"
    :value="price"
    @blur="addEdited($event, +$event.target.value)"
  >
  <textarea
    class="card__description"
    name="description"
    :value="description"
    @blur="addEdited($event, $event.target.value)"
  >
  </textarea>
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
  name: 'ProductEdit',
  props: {
    id: {
      type: String,
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
    const showAdminBtns = inject('showAdminBtns');
    const edits = inject('edits');
    const products = inject('products');
    const editedProducts = inject('editedProducts');
    const basket = inject('basket');
    return { showAdminBtns, edits, editedProducts, products, basket };
  },
  methods: {
    async addEditedImg(e) {
      const fd = new FormData();
      fd.append('img', e.target.files[0]);
      await fetch('http://localhost:3000/addFile', {
        method: 'post',
        body: fd,
      });

      setTimeout(async () => {
        this.$emit('update:imgName', e.target.files[0].name);

        if (this.edits[this.id]) {
          if (this.edits[this.id].imgName)
            await fetch('http://localhost:3000/delFile', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: this.edits[this.id].imgName }),
            });
          this.edits[this.id].imgName = e.target.files[0].name;
        }
        else
          this.edits[this.id] = { imgName: e.target.files[0].name };
      }, 2000);
      this.showAdminBtns = true;
    },
    addEdited(e, value) {
      if (this.edits[this.id])
        this.edits[this.id][e.target.name] = value;
      else
        this.edits[this.id] = { [e.target.name]: value };
      this.$emit(`update:${e.target.name}`, value);
      this.showAdminBtns = true;
    },
    async del(e) {
      e.stopPropagation();
      if (confirm(`Вы действительно хотите удалить ${this.name}?`)) {
        delete this.products[this.id];
        delete this.edits[this.id];
        delete this.editedProducts[this.id];
        const res = await fetch('http://localhost:3000/del', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: this.id }),
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
