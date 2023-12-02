<script>
import { axiosInstance } from '../utils/axios.js'
import ConfirmDialog from '../components/ConfirmDialog.vue'; // 追加

export default {
  data() {
    return {
      shopCustomers: []
    }
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
        await this.fetchCustomers(); // 削除後にデータを再取得して更新
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
    <h1>ShopCustomer - 顧客一覧</h1>
    <ul>
      <li v-for="customer in shopCustomers" :key="customer.id">
        <router-link :to="`customers/${customer.id}`">{{ customer.name }}</router-link>
        <button @click="deleteCustomer(customer.id)">削除</button>
      </li>
    </ul>
    <!-- 確認ダイアログのコンポーネントを追加 -->
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
  </div>
</template>
