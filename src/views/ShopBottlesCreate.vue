<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>新しいボトルの登録</h1>
      
      <v-row>
        <v-col>
          <label>名前:</label>
          <v-text-field v-model="name" outlined></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <label>カテゴリ:</label>
          <v-select v-model="category" :items="categories" item-value="value" outlined></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <label>価格:</label>
          <v-text-field v-model="price" type="number" outlined></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <label>説明:</label>
          <v-textarea v-model="description" outlined></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn @click="onSubmit" color="primary">登録</v-btn>
        </v-col>
      </v-row>
      
    </v-container>
  </v-main>
</template>

<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRouter } from 'vue-router';

const name = ref('');
const category = ref('');
const price = ref(null);
const description = ref('');
const router = useRouter();
const categories = [
  { text: '焼酎', value: 'shochu' },
  { text: 'ウィスキー', value: 'whisky' },
  { text: 'ジン', value: 'gin' },
  { text: 'ラム', value: 'ram' },
  { text: 'ブランデー', value: 'brandy' },
  { text: 'その他', value: 'other' }
];

const onSubmit = async () => {
  try {
    const response = await axiosInstance.post('shop/bottles', {
      name: name.value,
      category: category.value,
      price: price.value,
      description: description.value,
    });

    console.log('Bottle created successfully:', response.data);

    router.push({ name: 'bottleList' });
  } catch (error) {
    console.error('Failed to create bottle:', error);
  }
};
</script>
