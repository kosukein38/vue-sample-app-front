<script>
import { axiosInstance } from '../utils/axios.js'
import ConfirmDialog from '../components/ConfirmDialog.vue'; // 追加

export default {
  data() {
    return {
      shopBottles: []
    }
  },
  async created() {
    await this.fetchBottles();
  },
  methods: {
    async fetchBottles() {
      const res = await axiosInstance.get('/shop/bottles');
      this.shopBottles = res.data;
    },
    async deleteBottle(id) {
      const confirmed = await this.$refs.confirmDialog.confirm(
        '本当に削除してよろしいですか？'
      );

      if (confirmed) {
        await axiosInstance.delete(`/shop/bottles/${id}`);
        await this.fetchBottles(); // 削除後にデータを再取得して更新
      }
    }
  },
  components: {
    ConfirmDialog
  }
};
</script>

<template>
  <div>
    <h1>お店のボトル一覧</h1>
    <div><router-link to="/shop/bottles/new">ボトル追加</router-link></div>
    <ul>
      <li v-for="bottle in shopBottles" :key="bottle.id">
        <router-link :to="`bottles/${bottle.id}`">{{ bottle.name }}</router-link>
        <button @click="deleteBottle(bottle.id)">削除</button>
      </li>
    </ul>
    <!-- 確認ダイアログのコンポーネントを追加 -->
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
  </div>
  <div><router-link to="/shop">Homeへ</router-link></div>
</template>
