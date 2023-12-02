<script>
import { axiosInstance } from '../utils/axios.js';

export default {
  data() {
    return {
      editedCustomer: {
        name: '',
        age: 0,
        last_visit_date: null,
        memo: '',
      },
    };
  },
  created() {
    // コンポーネントが作成された際に顧客の既存データを取得
    this.fetchCustomerData();
  },
  methods: {
    async fetchCustomerData() {
      try {
        const response = await axiosInstance.get(`shop/customers/${this.$route.params.id}`);
        // 顧客の既存データを取得し、editedCustomerにセット
        this.editedCustomer = response.data;
      } catch (error) {
        console.error('Failed to fetch customer data', error);
      }
    },
    async saveChanges() {
      try {
        await axiosInstance.put(`shop/customers/${this.$route.params.id}`, this.editedCustomer);
        console.log('Customer updated successfully');

        // 保存が成功したらリダイレクトなどの処理を追加
        this.$router.go(-1);
      } catch (error) {
        console.error('Failed to update customer', error);
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>顧客編集</h1>
    <div>
      <label>名前: </label>
      <input v-model="editedCustomer.name" />
    </div>
    <div>
      <label>年齢: </label>
      <input v-model="editedCustomer.age" />
    </div>
    <div>
      <label>最終訪問日: </label>
      <input type="date" v-model="editedCustomer.last_visit_date" />
    </div>
    <div>
      <label>メモ: </label>
      <textarea v-model="editedCustomer.memo"></textarea>
    </div>
    <button @click="saveChanges">保存</button>
  </div>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
