<template>
  <div class="container welcome">
    <p>ようこそ！</p>
    <div v-if="shouldShowLoginForm">
      <LoginForm @redirectToHome="redirectToHome"/>
      <p class="change-form">初めての方は<span @click="shouldShowLoginForm = false">こちら</span>をクリック</p>
    </div>
    <div v-if="!shouldShowLoginForm">
      <SignupForm @redirectToHome="redirectToHome"/>
      <p class="change-form">アカウントをお持ちの方は<span @click="shouldShowLoginForm = true">こちら</span>をクリック</p>
    </div>
  </div>
  <!-- <div class="login">
    log in
    <div>
      <div>{{ message }}</div>
      <input type="text" v-model="email" placeholder="EMAIL" /><br />
      <input type="password" v-model="password" placeholder="PASSWORD" /><br />
      <button @click="onSubmit">LOGIN</button>
    </div>
  </div> -->
</template>

<script>
// import { ref } from 'vue';
// import { axiosInstance } from '../utils/axios.js'
// import { useRouter } from 'vue-router';
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'
export default  {
  components: { SignupForm, LoginForm },
  data () {
    return {
      shouldShowLoginForm: true
    }
  },
  methods: {
    redirectToHome () {
      this.$router.push({ name: 'HomeView' })
    }
  }  
}


// const email = ref('');
// const password = ref('');
// const router = useRouter();
// const message = ref('');

// const onSubmit = async () => {
//   try {
//     // ログインAPIへのリクエスト
//     const response = await axiosInstance.post('/login', {
//       email: email.value,
//       password: password.value,
//     });

//     // ログイン成功時の処理
//     console.log('Success:', response.data);
//     console.log('header:', response.headers);

//     // CSRFトークンを取得してaxiosのデフォルトヘッダーにセット
//     const csrfToken = response.headers['x-csrf-token'];
//     axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;

//     // ログイン成功時のページ遷移
//     router.push({ name: 'HomeView' });
//   } catch (error) {
//     // ログイン失敗時の処理
//     console.error('Login failed:', error);
//     message.value = 'Login failed';
//   }
</script>
