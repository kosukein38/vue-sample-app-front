<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>ユーザー編集</h1>
      <div>
        <label>名前: </label>
        <v-text-field v-model="editedUser.name" />
      </div>
      <div>
        <label>Email: </label>
        <v-text-field v-model="editedUser.email" />
      </div>
      <div>
        <label>役割:</label>
        <v-select v-model="editedUser.role" :items="roles" outlined></v-select>
      </div>
      <div>
        <label>パスワード</label>
        <v-text-field type="password" v-model="editedUser.password" />
      </div>
      <div>
        <label>パスワード確認</label>
        <v-text-field type="password" v-model="editedUser.password_confirmation" />
      </div>
      <v-btn @click="saveChanges" color="primary">保存</v-btn>
    </v-container>
    <v-container>
      <v-btn color="primary"><router-link class="btn" to="/shop">Homeへ</router-link></v-btn>
    </v-container>
  </v-main>
</template>

<script setup>
import ApplicationBar from '../components/ApplicationBar.vue';
import NavigationDrawer from '../components/NavigationDrawer.vue';
import FooterBar from '../components/FooterBar.vue';
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const editedUser = ref({
  name: '',
  email: '',
  role: '',
  password: '',
  password_confirmation: '',
});

// 役割 (role) の一覧を enum の値に合わせて設定
const roles = [
  { text: '一般従業員', value: 'employee' },
  { text: 'リーダー', value: 'leader' },
  { text: 'マネージャー', value: 'manager' },
];

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`shop/users/${route.params.id}`);
    editedUser.value = response.data;
  } catch (error) {
    console.error('Failed to fetch user data', error);
  }
});

const saveChanges = async () => {
  try {
    const loginStatusResponse = await axiosInstance.get('/login_status');
    const csrfToken = loginStatusResponse.headers['x-csrf-token'];
    axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;

    await axiosInstance.put(`shop/users/${route.params.id}`, editedUser.value);
    console.log('User updated successfully');

    router.go(-1);
  } catch (error) {
    console.error('Failed to update user', error);
  }
};
</script>

<style>
/* スタイルの定義は省略 */
</style>
