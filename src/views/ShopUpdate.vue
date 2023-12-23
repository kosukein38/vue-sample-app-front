<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>店舗編集</h1>
      <div>
        <label>名前: </label>
        <v-text-field v-model="editedShop.name" outlined></v-text-field>
      </div>
      <div>
        <label>メールアドレス: </label>
        <v-text-field v-model="editedShop.email" outlined></v-text-field>
      </div>
      <div>
        <label>電話番号: </label>
        <v-text-field v-model="editedShop.tel" outlined></v-text-field>
      </div>
      <div>
        <label>住所: </label>
        <v-text-field v-model="editedShop.address" outlined></v-text-field>
      </div>
      <div>
        <label>URL: </label>
        <v-text-field v-model="editedShop.url" outlined></v-text-field>
      </div>
      <v-btn @click="saveChanges" color="primary">保存</v-btn>
    </v-container>
    <v-container>
      <v-btn color="primary">
        <router-link class="btn" to="/shop">Homeへ</router-link>
      </v-btn>
    </v-container>
  </v-main>
</template>


<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRouter } from 'vue-router';

const editedShop = ref({
  name: '',
  email: '',
  tel: '',
  address: '',
  url: ''
});

const router = useRouter();

onMounted(async () => {
  await fetchShopData();
});

const fetchShopData = async () => {
  try {
    const response = await axiosInstance.get(`shop/shop_info`);
    editedShop.value = response.data;
  } catch (error) {
    console.error('Failed to fetch shop data', error);
  }
};

const saveChanges = async () => {
  try {
    // 追加: GET /login_status のリクエストを送信
    const loginStatusResponse = await axiosInstance.get('/login_status');
    // CSRFトークンを取得してaxiosのデフォルトヘッダーにセット
    const csrfToken = loginStatusResponse.headers['x-csrf-token'];
    axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;

    const shopData = {
      shop: {
        name: editedShop.value.name,
        email: editedShop.value.email,
        tel: editedShop.value.tel,
        address: editedShop.value.address,
        url: editedShop.value.url
      }
    };

    await axiosInstance.put(`shop/shop_info`, shopData);
    console.log('Shop updated successfully');
    // 保存が成功したらリダイレクトなどの処理を追加
    router.go(-1);
  } catch (error) {
    console.error('Failed to update shop', error);
  }
};
</script>


