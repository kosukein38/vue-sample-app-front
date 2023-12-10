<script>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { axiosInstance } from '../utils/axios.js';

export default {
  components: { ApplicationBar, NavigationDrawer, FooterBar },
  data() {
    return {
      shop: {}
    }
  },
  async created() {
    const res = await axiosInstance.get(`shop/shop_info`)
    this.shop = res.data
  }
}
</script>

<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>店舗詳細</h1>
      <div>
        <p><strong>店舗名:</strong> {{ shop.name }}</p>
        <p><strong>email:</strong> {{ shop.email }}</p>
        <p><strong>電話番号:</strong> {{ shop.tel }}</p>
        <p><strong>住所:</strong> {{ shop.address }}</p>
        <p><strong>url:</strong> {{ shop.url }}</p>
        <router-link :to="{ name: 'ShopUpdate' }">編集</router-link>
      </div>
    </v-container>
  </v-main>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
