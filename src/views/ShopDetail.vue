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
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>店舗詳細</h1>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <v-form>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="店舗名" v-model="shop.name" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Email" v-model="shop.email" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="電話番号" v-model="shop.tel" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="住所" v-model="shop.address" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="URL" v-model="shop.url" readonly></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-btn color="primary">
        <router-link class="btn" :to="{ name: 'ShopUpdate' }">編集</router-link>
      </v-btn>
    </v-container>
    <v-container>
      <v-btn color="primary">
        <router-link class="btn" to="/shop">Homeへ</router-link>
      </v-btn>
    </v-container>
  </v-main>
</template>

<style>
/* スタイルの定義は省略 */
</style>
