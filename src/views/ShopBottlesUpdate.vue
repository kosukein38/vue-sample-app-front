<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>ボトル編集</h1>
      <div>
        <label>名前: </label>
        <v-text-field v-model="editedBottle.name" outlined></v-text-field>
      </div>
      <div>
        <label>カテゴリ: </label>
        <v-select v-model="editedBottle.category.value" :items="categories" outlined></v-select>
      </div>
      <div>
        <label>価格: </label>
        <v-text-field v-model="editedBottle.price" type="number" outlined></v-text-field>
      </div>
      <div>
        <label>説明: </label>
        <v-textarea v-model="editedBottle.description" outlined></v-textarea>
      </div>
      <v-btn @click="saveChanges" color="primary">保存</v-btn>
    </v-container>
  </v-main>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>


<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref, onMounted } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const editedBottle = ref({
  name: '',
  category: { value: '' }, // カテゴリをオブジェクトで初期化
  price: 0,
  description: '',
});

const categories = [
  { text: '焼酎', value: 'shochu' },
  { text: 'ウィスキー', value: 'whisky' },
  { text: 'ジン', value: 'gin' },
  { text: 'ラム', value: 'ram' },
  { text: 'ブランデー', value: 'brandy' },
  { text: 'その他', value: 'other' }
];

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`shop/bottles/${route.params.id}`);
    editedBottle.value = response.data;
  } catch (error) {
    console.error('Failed to fetch bottle data', error);
  }
});

const saveChanges = async () => {
  try {
    await axiosInstance.put(`shop/bottles/${route.params.id}`, editedBottle.value);
    console.log('Bottle updated successfully');
    router.go(-1);
  } catch (error) {
    console.error('Failed to update bottle', error);
  }
};
</script>

