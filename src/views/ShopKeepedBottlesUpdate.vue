<template>
  <ApplicationBar />
  <NavigationDrawer />
  <FooterBar />
  <v-main>
    <v-container>
      <h1>キープボトル編集</h1>
      <div>
        <v-text-field
          v-model="editedKeepedBottle.bottle_number"
          label="ボトル番号"
        ></v-text-field>
      </div>
      <v-row v-if="editedKeepedBottle.customer">
            <v-col>
              <label>お客さんの名前</label>
              <div class="v-text-field__slot">
                <router-link :to="`/shop/customers/${editedKeepedBottle.customer_id}`">{{ editedKeepedBottle.customer.name }}</router-link>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="editedKeepedBottle.bottle">
            <v-col>
              <label>酒</label>
              <div class="v-text-field__slot">
                <router-link :to="`/shop/bottles/${editedKeepedBottle.bottle_id}`">{{ editedKeepedBottle.bottle.name }}</router-link>
              </div>
            </v-col>
          </v-row>
      <div>
        <v-select
          v-model="editedKeepedBottle.state"
          :items="states"
          label="状態"
        ></v-select>
      </div>
      <div>
        <v-text-field
          v-model="editedKeepedBottle.open_date"
          label="開封日"
          type="date"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          v-model="editedKeepedBottle.expiration_date"
          label="賞味期限"
          type="date"
        ></v-text-field>
      </div>
      <v-btn @click="saveChanges">保存</v-btn>
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

const editedKeepedBottle = ref({
  bottle_number: '',
  state: { value: '' },
  open_date: null,
  expiration_date: null,
});

const states = [
  { text: '未開封', value: 'unopend' },
  { text: '開封', value: 'opend' },
  { text: '廃棄', value: 'discard' },
];

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`shop/customers/${route.params.customer_id}/keeped_bottles/${route.params.id}`);
    editedKeepedBottle.value = response.data;
  } catch (error) {
    console.error('Failed to fetch keeped bottle data', error);
  }
});

const saveChanges = async () => {
  try {
    await axiosInstance.put(`shop/customers/${route.params.customer_id}/keeped_bottles/${route.params.id}`, editedKeepedBottle.value);
    console.log('Keeped bottle updated successfully');
    router.go(-1);
  } catch (error) {
    console.error('Failed to update keeped bottle', error);
  }
};
</script>

<style>
/* v-text-fieldのスタイルに合わせる */
.v-text-field__slot {
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
}
</style>
