<script>
import { axiosInstance } from '../utils/axios.js'
import ConfirmDialog from '../components/ConfirmDialog.vue'; // 追加

export default {
  data() {
    return {
      shopUsers: []
    }
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const res = await axiosInstance.get('/shop/users');
      this.shopUsers = res.data;
    },
    async deleteUser(id) {
      const confirmed = await this.$refs.confirmDialog.confirm(
        '本当に削除してよろしいですか？'
      );
      // 追加: GET /login_status のリクエストを送信
      const loginStatusResponse = await axiosInstance.get('/login_status');
      // CSRFトークンを取得してaxiosのデフォルトヘッダーにセット
      const csrfToken = loginStatusResponse.headers['x-csrf-token'];
      axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;
      if (confirmed) {
        await axiosInstance.delete(`/shop/users/${id}`);
        await this.fetchUsers(); // 削除後にデータを再取得して更新
      }
    }
  },
  components: {
    ConfirmDialog
  }
};
</script>

<template>
  <div>
    <h1>店員一覧</h1>
    <div><router-link to="/shop/users/new">従業員追加</router-link></div>
    <ul>
      <li v-for="user in shopUsers" :key="user.id">
        <router-link :to="`users/${user.id}`">{{ user.name }}</router-link>
        <button @click="deleteUser(user.id)">削除</button>
      </li>
    </ul>
    <!-- 確認ダイアログのコンポーネントを追加 -->
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
  </div>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>
