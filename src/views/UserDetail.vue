<script setup>
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router'; // useRoute を追加

const user = ref({
  name: '',
  email: '',
  role: '',
});

// useRoute を利用して route を取得
const route = useRoute();
const getRole = (role) => {
  switch (role) {
    case 'employee': return '一般従業員';
    case 'leader': return 'リーダー';
    case 'manager': return 'manager';
    default: return '';
  }
};

onMounted(async () => {
  // バックエンドからボトルの詳細情報を取得
  const response = await axiosInstance.get(`shop/users/${route.params.id}`);
  user.value = response.data;
});
</script>

<template>
  <div>
    <h1>店員詳細</h1>
    <div>
      <p><strong>名前:</strong> {{ user.name }}</p>
      <p><strong>メールアドレス:</strong> {{ user.email }}</p>
      <p><strong>カテゴリ:</strong> {{ getRole(user.role) }}</p>
      <router-link :to="{ name: 'ShopUsersUpdate', params: { id: $route.params.id } }">編集</router-link>
    </div>
  </div>
  <div><router-link to="/shop">Home</router-link></div>
</template>


<style>
/* スタイルの定義は省略 */
</style>

