<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router'; // useRoute を追加
import { useRouter } from 'vue-router';

const bottleNumber = ref('');
const state = ref('');
const openDate = ref(null);
const expirationDate = ref(null);
const selectedBottleId = ref(null);
const route = useRoute(); // useRoute を利用して route を取得
const router = useRouter();
// あらかじめ登録されたボトルの一覧
const bottles = ref([]);

const onSubmit = async () => {
  try {
    const customerId = route.params.customer_id; // ルートのパラメータから customer_id を取得

    const response = await axiosInstance.post(`shop/customers/${customerId}/keeped_bottles`, {
      bottle_id: selectedBottleId.value, // ボトルIDを選択されたものに変更
      bottle_number: bottleNumber.value,
      state: state.value,
      open_date: openDate.value,
      expiration_date: expirationDate.value,
    });

    console.log('KeepedBottle created successfully:', response.data);

    router.push({ name: 'shopKeepedBottles' });
  } catch (error) {
    console.error('Failed to create KeepedBottle:', error);
  }
};
onMounted(async () => {
  // ボトルの一覧を取得
  const response = await axiosInstance.get('shop/bottles');
  bottles.value = response.data;
});


</script>

<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>新しいキープボトルの登録</h1>
      <div>
        <label>ボトル選択:</label>
        <!-- ボトルの一覧をセレクトボックスで表示 -->
        <select v-model="selectedBottleId">
          <option :value="bottle.id" v-for="bottle in bottles" :key="bottle.id">{{ bottle.name }}</option>
        </select>
      </div>
      <div>
        <label>ボトル番号:</label>
        <input v-model="bottleNumber" />
      </div>
      <div>
        <label>状態:</label>
        <select v-model="state">
          <option value="unopend">未開封</option>
          <option value="opend">開封</option>
          <option value="discard">廃棄</option>
        </select>
      </div>
      <div>
        <label>開封日:</label>
        <input type="date" v-model="openDate" />
      </div>
      <div>
        <label>賞味期限:</label>
        <input type="date" v-model="expirationDate" />
      </div>
    </v-container>
    <button @click="onSubmit">登録</button>
  </v-main>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>

<style>
/* スタイルの定義は省略 */
</style>
