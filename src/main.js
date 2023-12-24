import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { axiosInstance } from './utils/axios.js'

// ナビゲーションガード
router.beforeEach(async (to, from, next) => {
  try {
    // 仮のエラーを発生させるために、サーバーに存在しないエンドポイントを指定
    const response = await axiosInstance.get('/login_status')
    const isLoggedIn = response.data.logged_in

    if (!isLoggedIn && to.path !== '/') {
      console.log('ログアウトしているためリダイレクト:', isLoggedIn, to.path)
      return next('/')
    }

    const csrfToken = response.headers['x-csrf-token']
    axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken
    next()
  } catch (error) {
    console.error('ログイン状態の確認に失敗しました', error)

    // エラーが発生した場合もリダイレクトしないように、現在のルートに留まる
    if (to.path !== '/') {
      next('/')
    } else {
      next()
    }
  }
})

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
