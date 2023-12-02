<script>
import { axiosInstance } from '../utils/axios.js';

export default {
  data() {
    return {
      customer: {}
    }
  },
  async created() {
    const res = await axiosInstance.get(`shop/customers/${this.$route.params['id']}`)
    this.customer = res.data
  }
}
</script>

<template>
  <div>
    <h1>顧客詳細</h1>
    <div>
      <p><strong>名前:</strong> {{ customer.name }}</p>
      <p><strong>年齢:</strong> {{ customer.age }}</p>
      <p><strong>最終訪問日:</strong> {{ customer.last_visit_date }}</p>
      <p><strong>メモ:</strong> {{ customer.memo }}</p>
      <router-link :to="{ name: 'shopCustomersEdit', params: { id: $route.params.id } }">編集</router-link>
    </div>
  </div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
