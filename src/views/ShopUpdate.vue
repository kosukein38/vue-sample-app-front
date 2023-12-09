<script>
import { axiosInstance } from '../utils/axios.js';

export default {
  data() {
    return {
      editedShop: {
        name: '',
        email: '',
        tel: '',
        address: '',
        url: ''
      },
    };
  },
  created() {
    // コンポーネントが作成された際に顧客の既存データを取得
    this.fetchShopData();
  },
  methods: {
    async fetchShopData() {
      try {
        const response = await axiosInstance.get(`shop/shop_info`);
        // 顧客の既存データを取得し、editedCustomerにセット
        this.editedShop = response.data;
      } catch (error) {
        console.error('Failed to fetch shop data', error);
      }
    },

    async saveChanges() {
      try {
        // 追加: GET /login_status のリクエストを送信
        const loginStatusResponse = await axiosInstance.get('/login_status');
        // CSRFトークンを取得してaxiosのデフォルトヘッダーにセット
        const csrfToken = loginStatusResponse.headers['x-csrf-token'];
        axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;

        const shopData = {
          shop: {
            name: this.editedShop.name,
            email: this.editedShop.email,
            tel: this.editedShop.tel,
            address: this.editedShop.address,
            url: this.editedShop.url
          }
        };

        await axiosInstance.put(`shop/shop_info`, shopData);
        console.log('Shoper updated successfully');
        // 保存が成功したらリダイレクトなどの処理を追加
        this.$router.go(-1);
      } catch (error) {
        console.error('Failed to update shop', error);
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>顧客編集</h1>
    <div>
      <label>名前: </label>
      <input v-model="editedShop.name" />
    </div>
    <div>
      <label>メールアドレス: </label>
      <input v-model="editedShop.email" />
    </div>
    <div>
      <label>電話番号: </label>
      <input v-model="editedShop.tel" />
    </div>
    <div>
      <label>住所: </label>
      <input v-model="editedShop.address" />
    </div>
    <div>
      <label>URL: </label>
      <input v-model="editedShop.url" />
    </div>
    <button @click="saveChanges">保存</button>
  </div>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
