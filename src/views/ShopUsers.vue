<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>店員一覧</h1>

      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-card>

      <v-data-table :headers="headers" :items="shopUsers" :search="search">
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <router-link :to="`users/${item.id}`">{{ item.name }}</router-link>
            </td>
            <td>
              <v-btn @click="deleteUser(item.id)" color="red" dark>
                削除
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- 確認ダイアログのコンポーネントを追加 -->
      <ConfirmDialog ref="confirmDialog" />
    </v-container>
    <v-container>
      <v-btn color="primary"><router-link class="btn" to="/shop">Homeへ</router-link></v-btn>
    </v-container>
    <v-container>
      <v-btn color="primary"><router-link class="btn" to="/shop/users/new">従業員追加</router-link></v-btn>
    </v-container>
  </v-main>
</template>

<script>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { axiosInstance } from '../utils/axios.js'
import ConfirmDialog from '../components/ConfirmDialog.vue';

export default {
  components: { ApplicationBar, NavigationDrawer, FooterBar, ConfirmDialog },
  data() {
    return {
      shopUsers: [],
      search: '',
      headers: [
        { text: '名前', value: 'name' },
        { text: '操作', value: 'actions', sortable: false },
      ],
    };
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
      
      if (confirmed) {
        // 追加: GET /login_status のリクエストを送信
        const loginStatusResponse = await axiosInstance.get('/login_status');
        // CSRFトークンを取得してaxiosのデフォルトヘッダーにセット
        const csrfToken = loginStatusResponse.headers['x-csrf-token'];
        axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;

        await axiosInstance.delete(`/shop/users/${id}`);
        await this.fetchUsers(); // 削除後にデータを再取得して更新
      }
    }
  },
};
</script>
