<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router';

const keepedBottle = ref({
  bottle_number: '',
  state: '',
  open_date: null,
  expiration_date: null
});

const route = useRoute();

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`shop/customers/${route.params.customer_id}/keeped_bottles/${route.params.id}`);
    keepedBottle.value = response.data;
  } catch (error) {
    console.error('Failed to fetch keeped bottle details:', error);
  }
});
</script>

<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>キープボトル詳細</h1>
      <div>
        <p><strong>ボトル番号:</strong> {{ keepedBottle.bottle_number }} </p>
        <p v-if="keepedBottle.customer">
          <strong>お客さんの名前:</strong>
          <router-link :to="`/shop/customers/${keepedBottle.customer_id}`">{{ keepedBottle.customer.name }}</router-link>
        </p>
        <p v-if="keepedBottle.bottle">
          <strong>酒:</strong>
          <router-link :to="`/shop/bottles/${keepedBottle.bottle_id}`">{{ keepedBottle.bottle.name }}</router-link>
        </p>
        <p><strong>状態:</strong> {{ keepedBottle.state }} </p>
        <p><strong>開封日:</strong> {{ keepedBottle.open_date }} </p>
        <p><strong>賞味期限:</strong> {{ keepedBottle.expiration_date }} </p>

        <!-- 編集ページへのリンクを追加 -->
        <router-link :to="{ name: 'ShopKeepedBottlesUpdate', params: { id: $route.params.id } }">編集</router-link>
      </div>
    </v-container>
  </v-main>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
