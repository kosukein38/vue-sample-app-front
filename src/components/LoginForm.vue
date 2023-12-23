<template>
  <div>
    <v-card class="mx-auto" style="max-width: 500px;">
      <v-form ref="form" class="pa-4 pt-6" @submit.prevent="login">
        <v-card-title class="d-flex justify-center pa-0 mt-6 mb-3">
          ログイン
        </v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="email" variant="filled" label="メールアドレス" placeholder="yamada.taro@example.com" type="email" required></v-text-field>
        <v-text-field v-model="password" variant="filled" label="パスワード" style="min-height: 96px" placeholder="password" type="password" required></v-text-field>
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
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        this.error = null
        const res = await axiosInstance.post('/login', {
          email: this.email,
          password: this.password,
          }
        )
        if (!res) {
          throw new Error('メールアドレスかパスワードが違います')
        }
        if (!this.error) {
          this.$emit('redirectToHome')
        }
        console.log({ res })
        return res
      } catch (error) {
        console.log({ error })
        this.error = 'メールアドレスかパスワードが違います'
      }
    }
  }
}
</script>
