
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
                <!-- <div v-if="$page.props.flash.message" class="alert">
                  {{ $page.props.flash.message }}
                </div> -->
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
                    <button class="btn btn-primary" type="submit" 
                    :disabled="form.processing"
                    >
                    <span v-if="isLoading">
                    <i class="busy-submitting"></i>Login</span>
                    <span v-else>Login</span>
                  </button>
              
                  </div>
                </form>
              </div>
            </div>
            <social-button @request="vuefire"/>
            <!-- <OnBoardingMessage /> -->
            <!-- <div class="row mb-0 text-center select-login">
              <div class="col-md-12 continue-with">
                <p><span>Or Continue with</span></p>
              </div>
              <a href="" @click.prevent="AuthProviderGoogle()" class="google"><img src="@/assets/sign-in-with-google.svg" width="20"
                  height="20" alt="Sign-in with Google">Sign-in with Google</a>
              <a href="" @click.prevent="AuthProviderFB()" class="facebook"><img src="@/assets/sign-in-with-facebook.svg"
                  width="20" height="20" alt="Sign up with Facebook">Sign up with Facebook</a>
              <div class="forgot-password">
                <a href="forgot-password">I Forgot my Password</a>
              </div>
              <div class="no-account">
                <p>Don’t you have an account? <a href="/register">Sign up</a></p>
              </div>
            </div> -->
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

import { mapGetters, mapState, mapActions } from "vuex";
// import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
export default {
  components: {
    layout: Layout,
    'social-button': SocialButton,
    'verify-card': Verify
  },
  data()
  {
    return {
      form: {
        email: null,
        password: null,
        remember_me: false,
      },
      isInitial: true,
      isVerified: true,
      errors: null,
      message: null,
      isLoading: false,
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
      this.signin(this.form).then((response) =>
      {
        console.log('Login Response: ', response)
        const { status: statusCode, data: {result, status, message}} = response;
        console.log('Status Code: ', statusCode, '\nStatus: ', status);
        this.isLoading = true;
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

        } else if (statusCode === 203 && status === 203) {

          this.errors = result?.errors;
          this.message = message;
          this.isLoading = false

        } else if (statusCode === 203 && status === 403) {
          
          this.isVerified = false;
          this.isInitial = false;
          this.isLoading = false
        } else {
          
          this.errors = result?.errors;
          this.message = message;
          this.isLoading = false

          // if (status === 403) {
          //   this.$router.push({ path: this.$route.path, query: { id: result?.user?.id } });
          // }

        }
      })
      .catch(err =>
      {
        console.log('Login Err: ', err)
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
<style scoped></style>
