<script setup>
import { ref } from 'vue'
import { axiosInstance } from '../utils/axios.js'
import { useRouter } from 'vue-router'

const name = ref('')
const age = ref(0) // 例として年齢を追加
const lastVisitDate = ref(null) // 追加: 最終訪問日
const memo = ref('') // 追加: メモ
const router = useRouter(); // 追加: useRouterを使用してrouterオブジェクトを取得

const onClick = async () => {
  const data = {
    name: name.value,
    age: age.value,
    last_visit_date: lastVisitDate.value, // 追加
    memo: memo.value // 追加
  }

  await axiosInstance.post('shop/customers', data)
  router.push({
    name: 'customerList'
  })
}
</script>

<template>
  <div>
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
  </div>
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
