<script setup>
import { ref } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRouter } from 'vue-router';

const name = ref('');
const category = ref(null);
const price = ref(null);
const description = ref('');
const router = useRouter();

const onSubmit = async () => {
  try {
    const response = await axiosInstance.post('shop/bottles', {
      name: name.value,
      category: category.value,
      price: price.value,
      description: description.value,
    });

    console.log('Bottle created successfully:', response.data);

    router.push({ name: 'bottleList' });
  } catch (error) {
    console.error('Failed to create bottle:', error);
  }
};
</script>

<template>
  <div>
    <h1>新規顧客登録</h1>
    <div>
      <label>名前:</label>
      <input v-model="name" />
    </div>
    <div>
      <label>カテゴリ:</label>
      <input v-model="category" />
    </div>
    <div>
      <label>価格:</label>
      <input v-model="price" />
    </div>
    <div>
      <label>説明:</label>
      <textarea v-model="description"></textarea>
    </div>
    <button @click="onSubmit">登録</button>
  </div>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
