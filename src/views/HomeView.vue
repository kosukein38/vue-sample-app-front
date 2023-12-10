<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
</script>

<template>
  <ApplicationBar/>
  <NavigationDrawer/>
  <FooterBar/>
  <v-main>
    <v-container>
      <h1>Home</h1>
      <div><router-link to="/shop/customers">既存のお客さん検索</router-link></div>
      <div><router-link to="/shop/customers/new">新規のお客さん登録</router-link></div>
    </v-container>
  </v-main>  
</template>
