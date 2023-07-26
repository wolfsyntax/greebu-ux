<template>
  <div class="row mb-0 text-center" :class="$route.name === 'login' ? 'select-login' : 'select-register'">
    <div class="col-md-12 continue-with">
      <p><span>Or Continue with</span></p>
    </div>
    <button @click="login('google')" class="google btn"><img src="/assets/sign-in-with-google.svg" width="20" height="20" alt="Sign-in with Google">Sign-in with Google</button>
    <button @click="login('facebook')" class="facebook"><img src="/assets/sign-in-with-facebook.svg" width="20" height="20" alt="Sign up with Facebook">Sign up with Facebook</button>
    <div class="forgot-password" v-if="$route.name === 'login'">
      <a href="/forgot">I Forgot my Password</a>
    </div>
    <div class="no-account" v-if="$route.name === 'login'">
      <p>Don’t have an account? <a href="/register">Sign up</a></p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { getRedirectResult } from 'firebase/auth';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';

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

            // if (provider?.phoneNumber) {
            //   formData.phone = provider.phone
            // }
            
          }

          if (Object.keys(formData))
          {

            // Works with signInWithPopup
            this.socialAuth({
              provider: provider,
              formData
            })
              .then(response =>
              {

                console.log('Response: ', response);
                const { message, status, result } = response;

                if (status === 200) {
                  // Firebase Authenticated details:
                  // const { value: providerData } = useCurrentUser();
                  // console.log('useCurrentUser: ', providerData);
                  if (!result?.user?.phone_verified_at)
                  {
                    this.$router.push({ name: 'verify' })
                  } else {
                    this.$router.push({ name: 'home' });
                  }

                } else {

                }
              })
              .catch(err =>
              {

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