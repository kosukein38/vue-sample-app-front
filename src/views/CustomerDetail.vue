<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>顧客詳細</h1>
      <div>
        <div>
          <label>名前:</label> {{ customer.name }}
        </div>

        <div>
          <label>年齢:</label> {{ customer.age }}
        </div>

        <div>
          <label>最終訪問日:</label> {{ customer.last_visit_date }}
        </div>

        <div>
          <label>メモ:</label> {{ customer.memo }}
        </div>
        <v-container>
          <v-btn color="primary">
            <router-link class="btn" :to="{ name: 'ShopCustomersUpdate', params: { id: $route.params.id } }">編集</router-link>
          </v-btn>
        </v-container>
        <v-container>
          <div v-if="customer.keeped_bottles && customer.keeped_bottles.length > 0">
            <h4>キープボトル</h4>
            <ul>
              <li v-for="bottle in customer.keeped_bottles" :key="bottle.id">
                <div>
                  <label>ボトル番号:</label> {{ bottle.bottle_number }}
                </div>
  
                <div>
                  <label>状態:</label> {{ bottle.state }}
                </div>
              </li>
            </ul>
          </div>
        </v-container>
      </div>
    </v-container>
    <v-container>
      <v-btn color="primary">
        <router-link class="btn" :to="`/shop/customers/${$route.params.id}/keeped_bottles/new`">キープボトル追加</router-link>
      </v-btn>
    </v-container>
    <v-container>
      <v-btn color="primary"><router-link class="btn" to="/shop">Homeへ</router-link></v-btn>
    </v-container>
  </v-main>
</template>

<script>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { axiosInstance } from '../utils/axios.js';

export default {
  components: { ApplicationBar, NavigationDrawer, FooterBar },
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
