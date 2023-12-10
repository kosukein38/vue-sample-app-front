<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const role = ref('');
const password =  ref('');
const password_confirmation = ref('');
const router = useRouter();

const onClick = async () => {
  try {
    // 顧客データの作成
    const userData = {
      user: {
        name: name.value,
        email: email.value,
        role: role.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      }
    };

    // 追加: GET /login_status のリクエストを送信
    const loginStatusResponse = await axiosInstance.get('/login_status');
    // CSRFトークンを取得してaxiosのデフォルトヘッダーにセット
    const csrfToken = loginStatusResponse.headers['x-csrf-token'];
    axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;

    // 顧客データをサーバーに送信
    await axiosInstance.post('shop/users', userData);
    // 顧客一覧ページにリダイレクト
    router.push({ name: 'userList' });
  } catch (error) {
    console.error('Error creating customer:', error);
  }
};
</script>

<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>新規店員作成</h1>
      <div>
        <h2>名前</h2>
        <input class="name" v-model="name" />
      </div>
      <div>
        <h2>メールアドレス</h2>
        <input type="email" class="email" v-model="email" />
      </div>
      <div>
        <h2>役割:</h2>
        <!-- カテゴリ選択肢はenumと対応させ、整数値を直接送信 -->
        <select v-model="role">
          <option value="employee">一般従業員</option>
          <option value="leader">リーダー</option>
          <option value="manager">マネージャー</option>
        </select>
      </div>
      <div>
        <h2>パスワード</h2>
        <input type="password" class="password" v-model="password" />
      </div>
      <div>
        <h2>パスワード確認</h2>
        <input type="password" class="password_confirmation" v-model="password_confirmation" />
      </div>
      <button class="button" @click="onClick">作成</button>
    </v-container>
  </v-main>
</template>

<style>
</style>
