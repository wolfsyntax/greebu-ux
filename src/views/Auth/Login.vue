
<template>
  <div>
    <layout v-if="isInitial">

      <Head title="Login" />
      <section class="login">
        <div class="container-fluid">

          <div id="loginCarouselBanner" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#loginCarouselBanner" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#loginCarouselBanner" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#loginCarouselBanner" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
              </div>
              <div class="carousel-item">
              </div>
              <div class="carousel-item">
              </div>
            </div>
          </div>

          <div class="login-form">
            <div class="logo">
              <router-link to="/"><img src="/assets/geebu-logo.svg" width="175" height="46" alt="Logo"></router-link>
            </div>
            <div class="card">
              <div class="card-header">
                <h2>Login to your account</h2>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div class="card-body">
           
                <div class="alert alert-danger" role="alert" v-if="message">
                  {{ message }}
                </div>
                <form @submit.prevent="submit">
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input id="email" type="text" class="form-control" name="email" v-model="form.email" required
                      autocomplete="email">
                    <div v-if="errors?.email" class="text-danger">{{ errors.email.shift() }}</div>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" class="form-control" name="password" v-model="form.password"
                      required autocomplete="new-password">
                    <div v-if="errors?.password" class="text-danger">{{ errors.password.shift() }}</div>
                  </div>
                  <div class="form-check form-checkbox">
                    <input type="checkbox" class="form-check-input" id="keepLogin">
                    <label class="form-check-label" for="keepLogin">Keep me logged in</label>
                  </div>
                  <div class="d-grid gap-2 btn-login">
     
                  <button class="btn btn-primary" type="submit" :disabled="form.processing" v-if="showLoginButton">Login</button>
                  <button class="btn btn-primary" type="button" :disabled="form.processing" v-else>
                    <LoadingIndicator />
                  </button>
              
                  </div>
                </form>
              </div>
            </div>
            <social-button @request="vuefire"/>
          </div>
        </div> <!-- end of container -->
      </section>
  </layout>
  <verify-card v-else-if="!isVerified" />
</div>
</template>
<script>

import Layout from '/src/components/Layouts/AuthLayout.vue';
import SocialButton from '/src/components/Auth/SocialLogin.vue';
import Verify from '@/components/Auth/Verify.vue';
import LoadingIndicator from "/src/components/LoadingIndicator.vue";

import { mapGetters, mapState, mapActions } from "vuex";
// import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
export default {
  components: {
    layout: Layout,
    'social-button': SocialButton,
    'verify-card': Verify,
    LoadingIndicator
  },
  data()
  {
    return {
      form: {
        email: null,
        password: null,
        remember_me: false,
        processing: false,
      },
      isInitial: true,
      isVerified: true,
      errors: null,
      message: null,
      showLoginButton: true,
    }
  },
  setup()
  {
    
  },
  props: {

  },
  methods: {
    ...mapActions([
      'signin', 'socialAuth',
    ]),
    submit()
    { 
      this.showLoginButton = false;
      this.form.processing = true;
      this.signin(this.form).then((response) =>
      {
        console.log('Login Response: ', response)
        const { status: statusCode, data: {result, status, message}} = response;
        console.log('Status Code: ', statusCode, '\nStatus: ', status);
     
        if (statusCode === 200) {

          // if (role === 'artists') {
          //   this.$router.push("/");
          // }

          // -if="users.id && !users.phone_verified_at"

          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$router.push('/dashboard')
          }
          this.showLoginButton = true;
        } else if (statusCode === 203 && status === 203) {

          this.errors = result?.errors;
          this.message = message;
          this.showLoginButton = true;

        } else if (statusCode === 203 && status === 403) {
          
          this.isVerified = false;
          this.isInitial = false;
          this.showLoginButton = true;
        } else {
          
          this.errors = result?.errors;
          this.message = message;
          this.showLoginButton = true;

          // if (status === 403) {
          //   this.$router.push({ path: this.$route.path, query: { id: result?.user?.id } });
          // }

        }
      })
      .catch(err =>
      {
        console.log('Login Err: ', err)
      })
      .finally(f => {
        this.form.processing = false;
      });

    },
    vuefire(msg)
    {
      this.message = msg;
    },
  },
  computed: mapState({
      users: (state) => state.user,
    }),
  
}
</script>
<style scoped>
.btn-login .btn:disabled {
  background: #fed7aa;
  border: none;
}
</style>
