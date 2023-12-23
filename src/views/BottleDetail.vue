<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>ボトル詳細</h1>
      <div>
        <v-text-field label="名前" :value="bottle.name" readonly></v-text-field>
        <v-text-field label="カテゴリ" :value="getCategoryName(bottle.category)" readonly></v-text-field>
        <v-text-field label="価格" :value="bottle.price" readonly></v-text-field>
        <v-text-field label="説明" :value="bottle.description" readonly></v-text-field>
        <v-btn color="primary">
          <router-link class="btn" :to="{ name: 'ShopBottlesUpdate', params: { id: route.params.id } }">編集</router-link>
        </v-btn>
      </div>
    </v-container>
    <v-container>
      <v-btn color="primary"><router-link class="btn" to="/shop">Homeへ</router-link></v-btn>
    </v-container>
  </v-main>
</template>

<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router';

const bottle = ref({
  name: '',
  category: 0,
  price: 0,
  description: ''
});
const route = useRoute();

const getCategoryName = (category) => {
  switch (category) {
    case 'shochu': return '焼酎';
    case 'whisky': return 'ウィスキー';
    case 'gin': return 'ジン';
    case 'rum': return 'ラム';
    case 'brandy': return 'ブランデー';
    case 'other': return 'その他';
    default: return '';
  }
};

onMounted(async () => {
  const response = await axiosInstance.get(`shop/bottles/${route.params.id}`);
  bottle.value = response.data;
});
</script>

