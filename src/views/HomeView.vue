<script setup></script>

<template>
  <main>
    <div>
      <h1>Home</h1>
      <div><router-link to="/shop/users">店員一覧</router-link></div>
      <div><router-link to="/shop/customers">顧客一覧</router-link></div>
      <div><router-link to="/shop/customers/new">新規顧客登録</router-link></div>
      <div><router-link to="/shop/bottles">お店のボトル一覧</router-link></div>
      <div><router-link to="/shop/keeped_bottles">お店のキープボトル一覧</router-link></div>
      <div><router-link to="/shop/shop_info">お店の情報</router-link></div>
    </div>
  </main>
</template>
