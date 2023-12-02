<script setup>
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router'; // useRoute を追加

const bottle = ref({
  name: '',
  category: 0,
  price: 0,
  description: ''
});
const route = useRoute(); // useRoute を利用して route を取得

// カテゴリのenumに対応する名称を取得する関数
const getCategoryName = (category) => {
  switch (category) {
    case 'shochu': return '焼酎';
    case 'whisky': return 'ウィスキー';
    case 'gin': return 'ジン';
    case 'rum': return 'ラム';
    case 'brandy': return 'ブランデー';
    case 'other': return 'その他';
    default: return '';
  }
};

onMounted(async () => {
  // バックエンドからボトルの詳細情報を取得
  const response = await axiosInstance.get(`shop/bottles/${route.params.id}`);
  bottle.value = response.data;
});
</script>

<template>
  <div>
    <h1>ボトル詳細</h1>
    <div>
      <p><strong>名前:</strong> {{ bottle.name }}</p>
      <p><strong>カテゴリ:</strong> {{ getCategoryName(bottle.category) }}</p>
      <p><strong>価格:</strong> {{ bottle.price }}</p>
      <p><strong>説明:</strong> {{ bottle.description }}</p>
      <router-link :to="{ name: 'ShopBottlesUpdate', params: { id: $route.params.id } }">編集</router-link>
    </div>
  </div>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>


<style>
/* スタイルの定義は省略 */
</style>

