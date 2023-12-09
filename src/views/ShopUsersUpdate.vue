<script setup>
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router'; // useRoute を追加
import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
// データの初期値をセット
const editedUser = ref({
  user: {
    name: '',
    email: '',
    role: '',
    password: '',
    password_confirmation: ''
  }
});


onMounted(async () => {
  try {
    // バックエンドからボトルの詳細情報を取得
    const response = await axiosInstance.get(`shop/users/${route.params.id}`);
    editedUser.value = response.data;
  } catch (error) {
    console.error('Failed to fetch bottle data', error);
  }
});

const saveChanges = async () => {
  try {
    // 追加: GET /login_status のリクエストを送信
    const loginStatusResponse = await axiosInstance.get('/login_status');
    // CSRFトークンを取得してaxiosのデフォルトヘッダーにセット
    const csrfToken = loginStatusResponse.headers['x-csrf-token'];
    axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    // バックエンドに対して更新リクエストを送信
    await axiosInstance.put(`shop/users/${route.params.id}`, editedUser.value);
    console.log('User updated successfully');

    // 保存が成功したらリダイレクトなどの処理を追加
    router.go(-1);
  } catch (error) {
    console.error('Failed to update user', error);
  }
};
</script>

<template>
  <div>
    <h1>ボトル編集</h1>
    <pre>{{ editedUser }}</pre>
    <div>
      <label>名前: </label>
      <input v-model="editedUser.name" />
    </div>
    <div>
      <label>email: </label>
      <input v-model="editedUser.email" />
    </div>
    <div>
      <label>役割:</label>
      <!-- カテゴリ選択肢はenumと対応させ、整数値を直接送信 -->
      <select v-model="editedUser.role">
        <option value="employee">一般従業員</option>
        <option value="leader">リーダー</option>
        <option value="manager">マネージャー</option>
      </select>
    </div>
    <div>
      <label>パスワード</label>
      <input type="password" class="password" v-model="password" />
    </div>
    <div>
      <label>パスワード確認</label>
      <input type="password" class="password_confirmation" v-model="password_confirmation" />
    </div>
    <button @click="saveChanges">保存</button>
  </div>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
