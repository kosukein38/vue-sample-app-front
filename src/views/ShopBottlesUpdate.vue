<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router'; // useRoute を追加
import { useRouter } from 'vue-router';

// データの初期値をセット
const editedBottle = ref({
  name: '',
  category: 0,
  price: 0,
  description: '',
});

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    // バックエンドからボトルの詳細情報を取得
    const response = await axiosInstance.get(`shop/bottles/${route.params.id}`);
    editedBottle.value = response.data;
  } catch (error) {
    console.error('Failed to fetch bottle data', error);
  }
});

const saveChanges = async () => {
  try {
    // バックエンドに対して更新リクエストを送信
    await axiosInstance.put(`shop/bottles/${route.params.id}`, editedBottle.value);
    console.log('Bottle updated successfully');

    // 保存が成功したらリダイレクトなどの処理を追加
    router.go(-1);
  } catch (error) {
    console.error('Failed to update bottle', error);
  }
};
</script>

<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>ボトル編集</h1>
      <pre>{{ editedBottle }}</pre>
      <div>
        <label>名前: </label>
        <input v-model="editedBottle.name" />
      </div>
      <div>
        <label>カテゴリ: </label>
        <!-- カテゴリの選択肢をプルダウンで表示 -->
        <select v-model="editedBottle.category">
          <option value="shochu">焼酎</option>
          <option value="whisky">ウィスキー</option>
          <option value="gin">ジン</option>
          <option value="ram">ラム</option>
          <option value="brandy">ブランデー</option>
          <option value="other">その他</option>
        </select>
      </div>
      <div>
        <label>価格: </label>
        <input v-model="editedBottle.price" />
      </div>
      <div>
        <label>説明: </label>
        <textarea v-model="editedBottle.description"></textarea>
      </div>
      <button @click="saveChanges">保存</button>
    </v-container>
  </v-main>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
