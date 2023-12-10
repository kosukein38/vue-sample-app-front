<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title><router-link to="/shop" class="toolbar-title">オサケノミタイ🍺</router-link></v-toolbar-title>
    <v-toolbar-items>
      <v-btn @click="logout" text>ログアウト</v-btn>
      <v-btn id="menu-activator" color="secondary">
        <v-avatar>
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          ></v-img>
        </v-avatar>
      </v-btn>
      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item v-for="item in avatarItems" :key="item.value" :value="item.value" @click="handleMenuItemClick(item)">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <v-list nav>
      <v-list-item v-for="(item, index) in menuItems" :key="index" :prepend-icon="item.icon" :title="item.title" :to="item.to"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { axiosInstance } from '../utils/axios.js'

export default {
  data: () => ({
    drawer: null,
    menuItems: [
      { icon: 'mdi-view-dashboard', title: '顧客一覧', to: '/shop/customers' },
      { icon: 'mdi-view-dashboard', title: '顧客のキープボトル一覧', to: '/shop/keeped_bottles' },
      { icon: 'mdi-view-dashboard', title: '店のボトル種類一覧', to: '/shop/bottles' },
      { icon: 'mdi-view-dashboard', title: '店員一覧', to: '/shop/users' },
      { icon: 'mdi-view-dashboard', title: '店の登録情報', to: '/shop/shop_info' },
    ],
    avatarItems: [
      { icon: 'mdi-view-dashboard', title: 'ユーザー設定' },
    ],
  }),
  methods: {
    // ログアウトのAPIを呼び出すメソッド
    async logout() {
      try {
        // 追加: GET /login_status のリクエストを送信
        const loginStatusResponse = await axiosInstance.get('/login_status');
        // CSRFトークンを取得してaxiosのデフォルトヘッダーにセット
        const csrfToken = loginStatusResponse.headers['x-csrf-token'];
        axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;

        // ログアウトのAPIを呼び出す
        await axiosInstance.delete(`/logout`); // ログアウトのエンドポイントに合わせてパスを変更してください
        this.$router.push({ name: 'WelcomeView' })
        // ログアウト成功時の処理（例: ログアウト後の画面遷移など）
        console.log('ログアウトしました');
        // ここにログアウト後の画面遷移などの処理を追加
      } catch (error) {
        // エラーハンドリング
        console.error('ログアウトエラー:', error);
      }
    },
    // 他のコード...
  },
};
</script>

<style>
.toolbar-title {
  color: inherit;
  text-decoration: none;
}
</style>
