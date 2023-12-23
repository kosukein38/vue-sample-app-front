<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>顧客編集</h1>
      <div>
        <label>名前: </label>
        <v-text-field v-model="editedCustomer.name" outlined></v-text-field>
      </div>
      <div>
        <label>年齢: </label>
        <v-text-field v-model="editedCustomer.age" outlined></v-text-field>
      </div>
      <div>
        <label>最終訪問日: </label>
        <v-text-field v-model="editedCustomer.last_visit_date" type="date" outlined></v-text-field>
      </div>
      <div>
        <label>メモ: </label>
        <v-textarea v-model="editedCustomer.memo" outlined></v-textarea>
      </div>
      <v-btn @click="saveChanges" color="primary">保存</v-btn>
    </v-container>
  </v-main>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const editedCustomer = ref({
  name: '',
  age: 0,
  last_visit_date: null,
  memo: '',
});

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  // router.params が定義されており、かつ 'id' プロパティが含まれていることを確認
  if (route.params && route.params.id) {
    await fetchCustomerData();
  } else {
    console.error('無効なルートパラメータ');
  }
});

const fetchCustomerData = async () => {
  try {
    const response = await axiosInstance.get(`shop/customers/${route.params.id}`);
    editedCustomer.value = response.data;
  } catch (error) {
    console.error('顧客データの取得に失敗しました', error);
  }
};

const saveChanges = async () => {
  try {
    await axiosInstance.put(`shop/customers/${route.params.id}`, editedCustomer.value);
    console.log('顧客データが正常に更新されました');
    // 保存が成功したらリダイレクトなどの処理を追加
    router.go(-1);
  } catch (error) {
    console.error('顧客データの更新に失敗しました', error);
  }
};
</script>
