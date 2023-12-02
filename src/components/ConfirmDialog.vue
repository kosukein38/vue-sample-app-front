<template>
  <div v-if="showDialog" class="confirm-dialog">
    <div class="dialog-box">
      <p>{{ message }}</p>
      <button @click="confirmAction(true)">はい</button>
      <button @click="confirmAction(false)">いいえ</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      message: ''
    };
  },
  methods: {
    async confirm(message) {
      this.message = message;
      this.showDialog = true;
      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    },
    confirmAction(action) {
      this.showDialog = false;
      this.resolve(action);
    }
  }
};
</script>

<style scoped>
.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background-color: gray;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.confirm-dialog p {
  color: black; /* テキストの色をブラックに設定 */
}
</style>
