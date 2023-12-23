<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>店員詳細</h1>
      <div>
        <v-text-field label="名前" v-model="user.name" readonly></v-text-field>
        <v-text-field label="メールアドレス" v-model="user.email" readonly></v-text-field>
        <v-select label="カテゴリ" :items="roles" v-model="user.role" readonly></v-select>
      </div>
    </v-container>
    <v-container>
      <v-btn color="primary"><router-link class="btn" :to="{ name: 'ShopUsersUpdate', params: { id: $route.params.id } }">編集</router-link></v-btn>
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

const user = ref({
  name: '',
  email: '',
  role: '',
});

const roles = ['一般従業員', 'リーダー', 'マネージャー'];



onMounted(async () => {
  const response = await axiosInstance.get(`shop/users/${useRoute().params.id}`);
  user.value = response.data;
});
</script>

<style>
/* スタイルの定義は省略 */
</style>
