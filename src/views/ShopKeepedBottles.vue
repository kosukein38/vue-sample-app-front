<script>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { axiosInstance } from '../utils/axios.js'
import ConfirmDialog from '../components/ConfirmDialog.vue';
// import { useRoute } from 'vue-router';

// const route = useRoute();

export default {
  components: { ApplicationBar, NavigationDrawer, FooterBar, ConfirmDialog },
  data() {
    return {
      shopKeepedBottles: []
    }
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

<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>お店のキープボトル一覧</h1>
      <ul>
        <li v-for="bottle in shopKeepedBottles" :key="bottle.id">
          <router-link :to="`/shop/customers/${bottle.customer_id}`">
            {{ bottle.customer.name }}
          </router-link> / 
          <router-link :to="`/shop/customers/${bottle.customer_id}/keeped_bottles/${bottle.id}`">
            {{ bottle.bottle_number }}
          </router-link>
          <button @click="deleteKeepedBottle(bottle.id)">削除</button>
        </li>
      </ul>
      <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
    </v-container>
  </v-main>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>
