<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>新しいキープボトルの登録</h1>
      <v-form @submit.prevent="onSubmit">
        <div>
          <label>ボトル選択:</label>
          <v-select
            v-model="selectedBottleId"
            :items="bottles.map(bottle => ({ text: bottle.name, value: bottle.id }))"
            label="ボトル選択"
            outlined
          ></v-select>
        </div>
        <div>
          <label>ボトル番号:</label>
          <v-text-field v-model="bottleNumber" label="ボトル番号" outlined></v-text-field>
        </div>
        <div>
          <label>状態:</label>
          <v-select
            v-model="state"
            :items="[
              { text: '未開封', value: 0 },
              { text: '開封', value: 1 },
              { text: '廃棄', value: 100 }
            ]"
            label="状態"
            outlined
          ></v-select>
        </div>
        <div>
          <label>開封日:</label>
          <v-text-field v-model="openDate" label="開封日" type="date" outlined></v-text-field>
        </div>
        <div>
          <label>賞味期限:</label>
          <v-text-field v-model="expirationDate" label="賞味期限" type="date" outlined></v-text-field>
        </div>
        <v-btn type="submit" color="primary">登録</v-btn>
      </v-form>
    </v-container>
    <v-container>
      <v-btn color="primary"><router-link class="btn" to="/shop">Homeへ</router-link></v-btn>
    </v-container>
  </v-main>
</template>

<script setup>
import ApplicationBar from '../components/ApplicationBar.vue';
import NavigationDrawer from '../components/NavigationDrawer.vue';
import FooterBar from '../components/FooterBar.vue';
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
const bottles = ref([]);

const onSubmit = async () => {
  try {
    const customerId = route.params.customer_id;

    const response = await axiosInstance.post(`shop/customers/${customerId}/keeped_bottles`, {
      bottle_id: selectedBottleId.value,
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
  const response = await axiosInstance.get('shop/bottles');
  bottles.value = response.data;
});
</script>
