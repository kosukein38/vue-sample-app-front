<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>お店のボトル一覧</h1>
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

      <v-data-table :headers="headers" :items="shopBottles" :search="search">
        <template v-slot:item="{ item: bottle }">
          <tr>
            <td>
              <router-link :to="`bottles/${bottle.id}`">{{ bottle.name }}</router-link>
            </td>
            <td>{{ bottle.quantity }}</td>
            <td>{{ bottle.price }}</td>
            <td>{{ bottle.manufacturer }}</td>
            <td>
              <v-btn @click="deleteBottle(bottle.id)" color="red" dark>
                削除
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <!-- 確認ダイアログのコンポーネントを追加 -->
      <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
    </v-container>
    <v-container>
      <v-btn color="primary">
        <router-link class="btn" to="/shop">Homeへ</router-link>
      </v-btn>
    </v-container>
    <v-container>
      <v-btn color="primary"><router-link class="btn" to="/shop/bottles/new">ボトル追加</router-link></v-btn>
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
      shopBottles: [],
      search: '',
      headers: [
        { text: 'ボトル名', value: 'name' },
        { text: '数量', value: 'quantity' },
        { text: '価格', value: 'price' },
        { text: 'メーカー', value: 'manufacturer' },
        { text: '操作', value: 'actions', sortable: false },
      ],
    }
  },
  async created() {
    await this.fetchBottles();
  },
  methods: {
    async fetchBottles() {
      const res = await axiosInstance.get('/shop/bottles');
      this.shopBottles = res.data;
    },
    async deleteBottle(id) {
      const confirmed = await this.$refs.confirmDialog.confirm(
        '本当に削除してよろしいですか？'
      );

      if (confirmed) {
        await axiosInstance.delete(`/shop/bottles/${id}`);
        await this.fetchBottles(); // 削除後にデータを再取得して更新
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
