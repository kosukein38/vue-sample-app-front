<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>キープボトル詳細</h1>
      <v-card>
        <v-card-title>
          <span class="headline">キープボトル詳細</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field label="ボトル番号" v-model="keepedBottle.bottle_number" readonly></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="keepedBottle.customer">
            <v-col>
              <label>お客さんの名前</label>
              <div class="v-text-field__slot">
                <router-link :to="`/shop/customers/${keepedBottle.customer_id}`">{{ keepedBottle.customer.name }}</router-link>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="keepedBottle.bottle">
            <v-col>
              <label>酒</label>
              <div class="v-text-field__slot">
                <router-link :to="`/shop/bottles/${keepedBottle.bottle_id}`">{{ keepedBottle.bottle.name }}</router-link>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="状態" v-model="keepedBottle.state" readonly></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="開封日" v-model="formattedOpenDate" readonly></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="賞味期限" v-model="formattedExpirationDate" readonly></v-text-field>
            </v-col>
          </v-row>
          <!-- 編集ページへのリンクを追加 -->
          <v-row>
            <v-col>
              <v-btn color="primary">
                <router-link class="btn" :to="{ name: 'ShopKeepedBottlesUpdate', params: { id: $route.params.id } }">編集</router-link>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
import { ref, onMounted, computed } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRoute } from 'vue-router';

const keepedBottle = ref({
  bottle_number: '',
  state: '',
  open_date: null,
  expiration_date: null
});

const route = useRoute();

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`shop/customers/${route.params.customer_id}/keeped_bottles/${route.params.id}`);
    keepedBottle.value = response.data;
  } catch (error) {
    console.error('Failed to fetch keeped bottle details:', error);
  }
});

const formattedOpenDate = computed(() => formatDate(keepedBottle.value.open_date));
const formattedExpirationDate = computed(() => formatDate(keepedBottle.value.expiration_date));

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
}
</script>

<style>
/* v-text-fieldのスタイルに合わせる */
.v-text-field__slot {
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
}
</style>
