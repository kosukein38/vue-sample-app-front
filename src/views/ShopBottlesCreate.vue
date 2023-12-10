<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRouter } from 'vue-router';

const name = ref('');
const category = ref('');
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
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>新しいボトルの登録</h1>
      <div>
        <label>名前:</label>
        <input v-model="name" />
      </div>
      <div>
        <label>カテゴリ:</label>
        <!-- カテゴリ選択肢はenumと対応させ、整数値を直接送信 -->
        <select v-model="category">
          <option value="shochu">焼酎</option>
          <option value="whisky">ウィスキー</option>
          <option value="gin">ジン</option>
          <option value="ram">ラム</option>
          <option value="brandy">ブランデー</option>
          <option value="other">その他</option>
        </select>
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
    </v-container>
  </v-main>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
