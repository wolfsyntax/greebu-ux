<template>
  <!-- <div class="row mb-0 text-center" :class="$route.name === 'login' ? 'select-login' : 'select-register'">
    <div class="col-md-12 continue-with">
      <p><span>Or Continue with</span></p>
    </div>
    <button @click="login('google')" class="google btn"><img src="/assets/sign-in-with-google.svg" width="20" height="20" alt="Sign up with Google">Sign up with Google</button>
    <button @click="login('facebook')" class="facebook"><img src="/assets/sign-in-with-facebook.svg" width="20" height="20" alt="Sign up with Facebook">Sign up with Facebook</button>
    <div class="forgot-password" v-if="$route.name === 'login'">
      <a href="/forgot">I Forgot my Password</a>
    </div>
    <div class="no-account" v-if="$route.name === 'login'">
      <p>Don’t have an account? <a href="/register">Sign up</a></p>
    </div>
  </div> -->

    <div class="row mb-0 text-center" :class="$route.name === 'login' ? 'select-login' : 'select-register'">
    <div class="col-md-12 continue-with">
      <p><span>Or Continue with</span></p>
    </div>
    <button type="button" @click="login('google')" class="google btn" v-if="$route.name === 'login'"><img src="/assets/sign-in-with-google.svg" width="20" height="20" alt="Sign up with Google">Sign in with Google</button>
    <!-- <button @click="login('facebook')" class="facebook" v-if="$route.name === 'login'"><img src="/assets/sign-in-with-facebook.svg" width="20" height="20" alt="Sign up with Facebook">Sign in with Facebook</button> -->
  
    <div v-if="$route.name === 'register'">
      <button type="button" @click="login('google')" class="google btn"><img src="/assets/sign-in-with-google.svg" width="20" height="20" alt="Sign up with Google">Sign up with Google</button>
    <!-- <button @click="login('facebook')" class="facebook"><img src="/assets/sign-in-with-facebook.svg" width="20" height="20" alt="Sign up with Facebook">Sign up with Facebook</button> -->
    </div>

    <div class="forgot-password" v-if="$route.name === 'login'">
      <router-link to="/forgot">I Forgot my Password</router-link>
    </div>
    <div class="no-account" v-if="$route.name === 'login'">
      <p>Don’t have an account? <router-link to="/register">Sign up</router-link></p>
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
  props: {
    account_type: { 
      type: String,
      default: null,
      required: false
    },

  },
  methods: {
    ...mapActions([
      'socialMediaAuth', 'socialAuthV2', 'fetchProfile',
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
          console.log('Firebase login response: ', response)
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
            formData.auth_type = this.$route.name;
            formData.account_type = this.account_type; 
            console.log('Social Signup info: ', formData);
            // Works with signInWithPopup
            this.socialAuthV2({
              provider: provider,
              formData,
              auth_type: this.$route.name
            })
              .then(response =>
              {

                const { message, status, result } = response;

                if (status === 200 && formData.auth_type === 'register') {
                  console.log('[200] Verify Page: ', response);
                  
                  if (!result.hasOwnProperty("token")) {
                    this.$router.push({ name: 'verify' });
                  } else {
                    this.fetchProfile();
                    this.$router.push({ path: '/', query: { onboarding: 'true' } });
                  }

                  
                } else if (status === 200) {
                  this.fetchProfile();
                  console.log('Redirect to onboarding');
                  this.$router.push({ path: '/', query: { onboarding: 'true' } });

                } else {
                  this.$emit('request', 'Account not registered.');
                }
              })
              .catch(err =>
              {
                const { status, message } = err;
                console.log('[Error] Social Auth: ', err);

                if (status === 203) this.$emit('request', message);
                else this.$emit('request', 'Server Error.');
              })
          }
        });
    },
  },
  computed: {
    ...mapGetters([]),
    ...mapState({
      userType: state => state.account_type,
    }),
  },
  mounted() {
    
  },
}
</script>