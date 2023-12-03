<template>
  <div>
    <h1>キープボトル編集</h1>
    <div>
      <label>ボトル番号: </label>
      <input v-model="editedKeepedBottle.bottle_number" />
    </div>
    <p v-if="editedKeepedBottle.customer">
        <strong>お客さんの名前:</strong>
        <router-link :to="`/shop/customers/${editedKeepedBottle.customer_id}`">{{ editedKeepedBottle.customer.name }}</router-link>
      </p>
      <p v-if="editedKeepedBottle.bottle">
        <strong>酒:</strong>
        <router-link :to="`/shop/bottles/${editedKeepedBottle.bottle_id}`">{{ editedKeepedBottle.bottle.name }}</router-link>
      </p>
    <div>
      <label>状態: </label>
      <!-- 状態の選択肢をプルダウンで表示 -->
      <select v-model="editedKeepedBottle.state">
        <option value="unopend">未開封</option>
        <option value="opend">開封</option>
        <option value="discard">廃棄</option>
      </select>
    </div>
    <div>
      <label>開封日: </label>
      <input type="date" v-model="editedKeepedBottle.open_date" />
    </div>
    <div>
      <label>賞味期限: </label>
      <input type="date" v-model="editedKeepedBottle.expiration_date" />
    </div>
    <button @click="saveChanges">保存</button>
  </div>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

// データの初期値をセット
const editedKeepedBottle = ref({
  bottle_number: '',
  state: '',
  open_date: null,
  expiration_date: null,
});

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    // バックエンドからキープボトルの詳細情報を取得
    const response = await axiosInstance.get(`shop/customers/${route.params.customer_id}/keeped_bottles/${route.params.id}`);
    editedKeepedBottle.value = response.data;
  } catch (error) {
    console.error('Failed to fetch keeped bottle data', error);
  }
});

const saveChanges = async () => {
  try {
    // バックエンドに対して更新リクエストを送信
    await axiosInstance.put(`shop/customers/${route.params.customer_id}/keeped_bottles/${route.params.id}`, editedKeepedBottle.value);
    console.log('Keeped bottle updated successfully');

    // 保存が成功したらリダイレクトなどの処理を追加
    router.go(-1);
  } catch (error) {
    console.error('Failed to update keeped bottle', error);
  }
};
</script>

<style>
/* スタイルの定義は省略 */
</style>
