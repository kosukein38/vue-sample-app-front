<template>
  <v-app-bar color="primary">

    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>

    <v-app-bar-title>
      <router-link to="/shop" class="toolbar-title">オサケノミタイ🍺</router-link>
    </v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">
    <v-list nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="顧客一覧" value="顧客一覧" to="/shop/customers"></v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" title="顧客のキープボトル一覧" value="顧客のキープボトル一覧" to="/shop/keeped_bottles"></v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" title="店のボトル種類一覧" value="店のボトル種類一覧" to="/shop/bottles"></v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" title="店員一覧" value="店員一覧" to="/shop/users"></v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" title="店の登録情報" value="店の登録情報" to="/shop/shop_info"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
}
</script>

<style>
.toolbar-title {
  color: inherit;
  text-decoration: none;
}
</style>
