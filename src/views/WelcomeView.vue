<template>
  <ApplicationBar/>
  <FooterBar/>
  <v-main>
    <v-container>
      <div class="container welcome">
        <div v-if="shouldShowLoginForm">
          <LoginForm @redirectToHome="redirectToHome"/>
          <p class="change-form text-center">初めての方は<span @click="shouldShowLoginForm = false">こちら</span>をクリック</p>
        </div>
        <div v-if="!shouldShowLoginForm">
          <SignupForm @redirectToHome="redirectToHome"/>
          <p class="change-form text-center">アカウントをお持ちの方は<span @click="shouldShowLoginForm = true">こちら</span>をクリック</p>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import ApplicationBar from '../components/ApplicationBar.vue'
import FooterBar from '../components/FooterBar.vue'
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'
export default  {
  components: { ApplicationBar, FooterBar, SignupForm, LoginForm },
  data () {
    return {
      shouldShowLoginForm: true
    }
  },
  methods: {
    redirectToHome () {
      this.$router.push({ name: 'HomeView' })
    }
  }  
}
</script>
