<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRouter } from 'vue-router';

const name = ref('');
const age = ref(0);
const lastVisitDate = ref(null);
const memo = ref('');
const router = useRouter();

const onClick = async () => {
  try {
    // 顧客データの作成
    const data = {
      name: name.value,
      age: age.value,
      last_visit_date: lastVisitDate.value,
      memo: memo.value
    };

    // 顧客データをサーバーに送信
    await axiosInstance.post('shop/customers', data);
    // 顧客一覧ページにリダイレクト
    router.push({ name: 'customerList' });
  } catch (error) {
    console.error('Error creating customer:', error);
  }
};
</script>

<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>新規顧客作成</h1>
      <div>
        <h2>名前</h2>
        <input class="name" v-model="name" />
      </div>
      <div>
        <h2>年齢</h2>
        <input type="number" class="age" v-model="age" />
      </div>
      <div>
        <h2>最終訪問日</h2>
        <input type="date" class="last-visit-date" v-model="lastVisitDate" />
      </div>
      <div>
        <h2>メモ</h2>
        <textarea class="memo" v-model="memo"></textarea>
      </div>
      <button class="button" @click="onClick">作成</button>
    </v-container>
  </v-main>
</template>

<style>
.title {
  width: 500px;
}
.contents {
  width: 500px;
  height: 300px;
}
.button {
  margin-top: 20px;
}
</style>
