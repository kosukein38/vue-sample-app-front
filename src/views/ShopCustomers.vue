<template>
  <div>
    <ApplicationBar />
    <NavigationDrawer />
    <FooterBar />
    <v-main>
      <v-container>
        <h1>顧客一覧</h1>

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

        <v-data-table :headers="headers" :items="shopCustomers" :search="search">
          <template v-slot:item="{ item }">
            <tr>
              <td>
                <router-link :to="`customers/${item.id}`">{{ item.name }}</router-link>
              </td>
              <td>{{ item.age }}</td>
              <td>{{ item.last_visit_date }}</td>
              <td>{{ item.memo }}</td>
              <td>
                <v-btn @click="deleteCustomer(item.id)" color="red" dark>
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
      <v-btn color="primary"><router-link class="btn" to="/shop/customers/new">従業員追加</router-link></v-btn>
    </v-container>
    </v-main>
  </div>
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
      shopCustomers: [],
      search: '',
      headers: [
        { text: '名前', value: 'name' },
        { text: '年齢', value: 'age' },
        { text: 'メモ', value: 'memo' },
        { text: '最終訪問日', value: 'last_visit_date' },
        { text: '操作', value: 'actions', sortable: false },
      ],
    };
  },

  async created() {
    await this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      const res = await axiosInstance.get('/shop/customers');
      this.shopCustomers = res.data;
    },
    async deleteCustomer(id) {
      const confirmed = await this.$refs.confirmDialog.confirm(
        '本当に削除してよろしいですか？'
      );

      if (confirmed) {
        await axiosInstance.delete(`/shop/customers/${id}`);
        await this.fetchCustomers();
      }
    }
  },
};
</script>

<style>
.btn {
  color: inherit;
  text-decoration: none;
}
</style>
