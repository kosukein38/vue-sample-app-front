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
      <router-link :to="{ name: 'ShopCustomersUpdate', params: { id: $route.params.id } }">編集</router-link>
      <div v-if="customer.keeped_bottles && customer.keeped_bottles.length > 0">
        <h4>キープボトル</h4>
        <ul>
          <li v-for="bottle in customer.keeped_bottles" :key="bottle.id">
            <p><strong>ボトル番号:</strong> {{ bottle.bottle_number }}</p>
            <p><strong>状態:</strong> {{ bottle.state }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div><router-link to="/shop">Homeへ</router-link></div>
  <div><router-link :to="`/shop/customers/${$route.params.id}/keeped_bottles/new`">キープボトル追加</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
