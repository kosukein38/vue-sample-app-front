<template>
  <div>
    <v-card class="mx-auto" style="max-width: 500px;">
      <v-form ref="form" class="pa-4 pt-6" @submit.prevent="signUp">
        <v-card-title class="d-flex justify-center pa-0 mt-6 mb-3">
          アカウントを登録
        </v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="name" label="ユーザー名" placeholder="山田太郎" required></v-text-field>
        <v-text-field v-model="email" variant="filled" label="メールアドレス" placeholder="yamada.taro@example.com" type="email" required></v-text-field>
        <v-text-field v-model="password" variant="filled" label="パスワード" style="min-height: 96px" placeholder="password" type="password" required></v-text-field>
        <v-text-field v-model="passwordConfirmation" variant="filled" label="パスワード(確認)" style="min-height: 96px" placeholder="password" type="password" required></v-text-field>
        <div class="error text-center" style="color: red;">{{ error }}</div>
        <div class="text-center">
          <v-btn type="submit" class="primary">登録</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { axiosInstance } from '../utils/axios.js'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      error: null
    };
  },
  methods: {
    async signUp() {
      this.error = null;
      try {
        // パラメータの形式を Rails に合わせて整形
        const userData = {
          user: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation
          }
        };

        const res = await axiosInstance.post('/signup', userData);
        // const csrfToken = res.headers['x-csrf-token'];
        // axiosInstance.defaults.headers['X-CSRF-Token'] = csrfToken;

        if (!res) {
          throw new Error('アカウントを登録できませんでした');
        }
        if (!this.error) {
          this.$emit('redirectToHome')
        }
        console.log({ res });
        return res;
      } catch (error) {
        this.error = 'アカウントを登録できませんでした';
      }
    }
  }
};
</script>
