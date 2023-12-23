<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>お店のキープボトル一覧</h1>

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

      <v-data-table :headers="headers" :items="shopKeepedBottles" :search="search">
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <router-link :to="`/shop/customers/${item.customer_id}`">
                {{ item.customer.name }}
              </router-link>
            </td>
            <td>
              <router-link :to="`/shop/customers/${item.customer_id}/keeped_bottles/${item.id}`">
                {{ item.bottle_number }}
              </router-link>
            </td>
            <td>
              <v-btn @click="deleteKeepedBottle(item.id, item.customer_id)" color="red" dark>
                削除
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- 確認ダイアログのコンポーネントを追加 -->
      <ConfirmDialog ref="confirmDialog" />
    </v-container>
  </v-main>
  <div><router-link to="/shop">Homeへ</router-link></div>
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
      shopKeepedBottles: [],
      search: '',
      headers: [
        { text: '顧客名', value: 'customer.name' },
        { text: 'ボトル番号', value: 'bottle_number' },
        { text: '操作', value: 'actions', sortable: false },
      ],
    };
  },
  async created() {
    await this.fetchKeepedBottles();
  },
  methods: {
    async fetchKeepedBottles() {
      const res = await axiosInstance.get('/shop/keeped_bottles');
      this.shopKeepedBottles = res.data;
    },
    async deleteKeepedBottle(id, customer_id) {
      const confirmed = await this.$refs.confirmDialog.confirm(
        '本当に削除してよろしいですか？'
      );

      if (confirmed) {
        await axiosInstance.delete(`/shop/customers/${customer_id}/keeped_bottles/${id}`);
        await this.fetchKeepedBottles();
      }
    }
  },
};
</script>

<style>
/* スタイルの定義は省略 */
</style>
