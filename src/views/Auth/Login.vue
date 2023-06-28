
<template>
  <div>
    <layout>

      <Head title="Login" />
      <section class="login">
        <div class="container-fluid">

          <div id="loginCarouselBanner" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#loginCarouselBanner" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#loginCarouselBanner" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#loginCarouselBanner" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="5000">
              </div>
              <div class="carousel-item" data-bs-interval="5000">
              </div>
              <div class="carousel-item" data-bs-interval="5000">
              </div>
            </div>
          </div>

          <div class="login-form">
            <div class="logo">
              <a href="/"><img src="@/assets/geebu-logo.svg" width="175" height="46" alt="Logo"></a>
            </div>
            <div class="card">
              <div class="card-header">
                <h2>Login</h2>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div class="card-body">
                <!-- <div v-if="$page.props.flash.message" class="alert">
                  {{ $page.props.flash.message }}
                </div> -->
                <form @submit.prevent="submit">
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input id="email" type="text" class="form-control" name="email" v-model="form.email" required
                      autocomplete="email">
                    <div v-if="errors?.email">{{ errors.email }}</div>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" class="form-control" name="password" v-model="form.password"
                      required autocomplete="new-password">
                    <div v-if="errors?.password">{{ errors.password }}</div>
                  </div>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="keepLogin">
                    <label class="form-check-label" for="keepLogin">Keep me logged in</label>
                  </div>
                  <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="submit" :disabled="form.processing">Login</button>
                  </div>
                </form>
              </div>
            </div>

            <div class="row mb-0 text-center select-login">
              <div class="col-md-12 continue-with">
                <p><span>Or Continue with</span></p>
              </div>
              <a href="/login/google" class="google"><img src="@/assets/sign-in-with-google.svg" width="20"
                  height="20" alt="Sign-in with Google">Sign-in with Google</a>
              <a href="/login/facebook" class="facebook"><img src="@/assets/sign-in-with-facebook.svg"
                  width="20" height="20" alt="Sign up with Facebook">Sign up with Facebook</a>
              <div class="forgot-password">
                <a href="forgot-password">I Forgot my Password</a>
              </div>
              <div class="no-account">
                <p>Don’t you have an account? <a href="/register">Sign up</a></p>
              </div>
            </div>
          </div>
        </div> <!-- end of container -->
      </section>
  </layout>
</div>
</template>
<script>
import Layout from '@/components/Layouts/AuthLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    layout: Layout,
  },
  data()
  {
    return {
      form: {
        email: null,
        password: null,
      }
    }
  },
  setup()
  {
    
  },
  props: {
    errors: Object,
  },
  methods: {
    ...mapActions([
      'signin'
    ]),
    submit()
    { 

      this.signin(this.form).then((response) =>
      {

        const { status, data } = response;
        console.log('Response: ', response)
        this.$vs.notification({
          color: 'success',
          position: 'top-right',
          title: 'Signin',
          text: `${data?.message}`
        })
        var user = this.$store.state.user;
        var role = this.$store.state.role;

        if (role === 'artists') {
          this.$router.push("/artist");
        } else {
          this.$router.push("/");
        }

      });

    }
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      users: (state) => state.user,
    }),
  }
}
</script>
<style scoped></style>
