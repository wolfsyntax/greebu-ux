
<template>
  <div>
    <layout>

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
              <a href="/"><img src="/assets/geebu-logo.svg" width="175" height="46" alt="Logo"></a>
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
                    <button class="btn btn-primary" type="submit" :disabled="form.processing">Login</button>
                  </div>
                </form>
              </div>
            </div>
            <social-button />
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
</div>
</template>
<script>

import Layout from '/src/components/Layouts/AuthLayout.vue';
import SocialButton from '/src/components/Auth/SocialLogin.vue';

import { mapGetters, mapState, mapActions } from "vuex";
// import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
export default {
  components: {
    layout: Layout,
    'social-button': SocialButton,
  },
  data()
  {
    return {
      form: {
        email: null,
        password: null,
        remember_me: false,
      },
      errors: null,
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

        const { status, data } = response;
        
        if (status === 200) {
          // this.$vs.notification({
          //   color: 'success',
          //   position: 'top-right',
          //   title: 'Signin',
          //   text: `${data?.message}`
          // })
          // var user = this.$store.state.user;
          // var role = this.$store.state.role;
          
          // if (role === 'artists') {
          //   this.$router.push("/");
          // }
          this.$router.push("/");
        } else {

          this.errors = data?.result?.errors;
          
          // this.$vs.notification({
          //   color: 'danger',
          //   position: 'top-right',
          //   title: 'Signin',
          //   text: `${data?.message}`
          // })
        }
      })
      .catch(err =>
      {
        // console.log('Err: ', err)
        // this.$vs.notification({
        //   color: 'danger',
        //   position: 'top-right',
        //   title: 'Server Status',
        //   text: `${err.message}`
        // })
      });

    },
    // AuthProviderFB()
    // {
    //   const provider = new FacebookAuthProvider();
    //   const auth = getAuth();

    //   signInWithPopup(auth, provider).then(result =>
    //   {
    //     //console.log('Firebase result [Facebook]: ', result);

    //   }).catch((err) =>
    //   {
    //     // this.$vs.notification({
    //     //   color: 'danger',
    //     //   position: 'top-right',
    //     //   title: 'Oops',
    //     //   text: err.message
    //     // })
    //   })
    // },
    // AuthProviderGoogle()
    // {
    //   const provider = new GoogleAuthProvider()
    //   const auth = getAuth();
    //   // const loader = this.$vs.loading({
    //   //   text: 'Loading...',
    //   // })
    //   signInWithPopup(auth, provider).then(result =>
    //   {
    //     const { _tokenResponse: {federatedId, email, emailVerified, firstName, lastName}, user: {providerData, uid, photoURL} } = result;
    //     const provider = providerData.slice(0, 1).shift();

    //     const formData = {
    //       provider_id: federatedId.replace('https://accounts.google.com/', '') || uid,
    //       first_name: firstName,
    //       last_name: lastName,
    //       email,
    //       username: `goo${provider?.uid}gle`,
    //       is_verified: emailVerified,
    //       avatar: photoURL,
    //     };

    //     if (provider?.phoneNumber)
    //     {
    //       formData.phone = provider.phone
    //     }
        
    //     this.socialAuth({
    //       provider: 'google',
    //       formData
    //     })
    //     .then(response => {

    //       const { message, status } = response;
    //       if (status === 200) {
            
    //         // this.$vs.notification({
    //         //   color: 'success',
    //         //   position: 'top-right',
    //         //   title: 'Signin',
    //         //   text: `${message}`
    //         // })

    //         this.$router.push("/");

    //       } else {
    //         // this.$vs.notification({
    //         //     color: 'danger',
    //         //     position: 'top-right',
    //         //     title: 'Server Status',
    //         //     text: `${message}`
    //         //   })
    //       }

    //       // setTimeout(() =>
    //       //   {
    //       //     loader.close()
    //       //   }, 3000)
    //     })
    //     .catch(err =>
    //     {
    //       // loader.close()

    //       // this.$vs.notification({
    //       //   color: 'danger',
    //       //   position: 'top-right',
    //       //   title: 'Server Status',
    //       //   text: `${err.message}`
    //       // })
            
    //     })
    //   }).catch((err) =>
    //   {
    //     // loader.close()
    //     // this.$vs.notification({
    //     //   color: 'danger',
    //     //   position: 'top-right',
    //     //   title: 'Oops',
    //     //   text: err.message
    //     // })
    //   })
    // }

  },
  computed: mapState({
      users: (state) => state.user,
    }),
  
}
</script>
<style scoped></style>
