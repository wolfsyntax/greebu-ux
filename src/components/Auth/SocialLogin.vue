<template>
  <div class="row mb-0 text-center" :class="$route.name === 'login' ? 'select-login' : 'select-register'">
    <div class="col-md-12 continue-with">
      <p><span>Or Continue with</span></p>
    </div>
    <button @click="login('google')" class="google btn"><img src="/assets/sign-in-with-google.svg" width="20" height="20" alt="Sign-in with Google">Sign-in with Google</button>
    <button @click="login('facebook')" class="facebook"><img src="/assets/sign-in-with-facebook.svg" width="20" height="20" alt="Sign up with Facebook">Sign up with Facebook</button>
    <div class="forgot-password" v-if="$route.name === 'login'">
      <a href="forgot-password">I Forgot my Password</a>
    </div>
    <div class="no-account" v-if="$route.name === 'login'">
      <p>Don’t you have an account? <a href="/register">Sign up</a></p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup() {
    
  },
  components: {

  },
  data()
  {
    return {

    }
  },
  methods: {
    ...mapActions([
      'socialMediaAuth', 'socialAuth',
    ]),
    login(provider)
    {
      // const loader = this.$vs.loading({
      //   text: 'Loading...',
      // })

      this.socialMediaAuth(provider)
        .then(response =>
        {
          console.log('Response [SocialLogin]: ', response)
          var formData = {};

          if (provider === 'google')
          {
            const { _tokenResponse: { federatedId, email, emailVerified, firstName, lastName }, user: { providerData, uid, photoURL } } = response;
            const provider = providerData.slice(0, 1).shift();

            formData = {
              provider_id: federatedId.replace('https://accounts.google.com/', '') || uid,
              first_name: firstName,
              last_name: lastName,
              email,
              username: `goo${provider?.uid}gle`,
              is_verified: emailVerified,
              avatar: photoURL,
            };

            if (provider?.phoneNumber) {
              formData.phone = provider.phone
            }
            
          }

          if (Object.keys(formData))
          {
            this.socialAuth({
              provider: provider,
              formData
            })
              .then(result =>
              {

                const { message, status } = result;
                if (status === 200) {

                  // this.$vs.notification({
                  //   color: 'success',
                  //   position: 'top-right',
                  //   title: 'Signin',
                  //   text: `${message}`
                  // })

                  this.$router.push("/");

                } else {
                  // this.$vs.notification({
                  //   color: 'danger',
                  //   position: 'top-right',
                  //   title: 'Server Status',
                  //   text: `${message}`
                  // })
                }

                setTimeout(() =>
                {
                  loader.close()
                }, 3000)
              })
              .catch(err =>
              {
                // loader.close()

                // this.$vs.notification({
                //   color: 'danger',
                //   position: 'top-right',
                //   title: 'Server Status',
                //   text: `${err.message}`
                // })

              })
          }
        });
    }
  },
  computed: {
    ...mapGetters([]),
    ...mapState({
      
    }),
  },
  mounted() {
    
  },
}
</script>