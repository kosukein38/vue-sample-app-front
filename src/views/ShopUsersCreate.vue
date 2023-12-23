<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>新規店員作成</h1>
      
      <v-row>
        <v-col>
          <label>名前</label>
          <v-text-field v-model="name" outlined></v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col>
          <label>メールアドレス</label>
          <v-text-field v-model="email" type="email" outlined></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <label>役割:</label>
          <v-select v-model="role" :items="roles" outlined></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <label>パスワード</label>
          <v-text-field v-model="password" type="password" outlined></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <label>パスワード確認</label>
          <v-text-field v-model="password_confirmation" type="password" outlined></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn @click="onClick" color="primary">作成</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const role = ref('');
const password = ref('');
const password_confirmation = ref('');
const router = useRouter();

const roles = [
  { text: '一般従業員', value: 'employee' },
  { text: 'リーダー', value: 'leader' },
  { text: 'マネージャー', value: 'manager' }
];

const onClick = async () => {
  try {
    const userData = {
      user: {
        name: name.value,
        email: email.value,
        role: role.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      }
    };

    const loginStatusResponse = await axiosInstance.get('/login_status');
    const csrfToken = loginStatusResponse.headers['x-csrf-token'];
    axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;

    await axiosInstance.post('shop/users', userData);
    router.push({ name: 'userList' });
  } catch (error) {
    console.error('Error creating customer:', error);
  }
};
</script>

