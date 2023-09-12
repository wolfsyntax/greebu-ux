<template>
  <div>
    <artist-profile @form="submit" :error="errors" :message="message" v-if="userRole === 'artists'"/>    
    <organizer-profile @form="submit" :error="errors" v-else-if="userRole === 'organizer'" />
    <provider-profile @form="submit" :error="errors" v-else-if="userRole === 'service-provider'" />
    <customer-profile @form="submit" :error="errors" v-else-if="userRole === 'customers'" />
    <p v-else>No Profile Exists</p>
  </div>
</template>

<script>

import ArtistProfile from '/src/views/Artist/Profile.vue';  // src\views\Artist\Profile.vue
import CustomerProfile from '/src/views/Customer/Profile.vue'; // src\views\Customer\Profile.vue
import OrganizerProfile from '/src/views/Organizer/Profile.vue'; // src\views\Organizer\Profile.vue
import ProviderProfile from '/src/views/Services/Profile.vue'; // src\views\Services\Profile.vue

import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    ArtistProfile,
    CustomerProfile,
    OrganizerProfile,
    ProviderProfile,
  },
  setup () {
    

    return {}
  },
  data: () => ({
    form: {},
    errors: [],
    message: '',
  }),
  methods: {
    ...mapActions([
      'accountProfile',
    ]),
    ...mapMutations([
      'SET_ACCOUNT', 'SET_PROFILE', 'SET_AUTH',
      'SET_ARTIST_GENRES', 'SET_MEMBERS',
    ]),
    submit(value)
    {

      console.log(`Account Profile [${this.userRole}]:: `, value);
      
      this.accountProfile(value)
        .then(response =>
        {
          console.log('Account Profile+: ', response);
          this.errors = [];

          const { status: statusCode, data: {status, result}} = response;

          if (response?.status === 200 && status === 200)
          {
            this.message = 'Updated successfully';
            window.scrollBy(-10000, -10000);
            this.$forceUpdate();
           // this.$router.push('/artist');

            setTimeout(() => {
              this.message = false;
            }, 5000);

          } else {
            const { errors } = result;
            if (errors) this.errors = errors;

            this.message = '';
            window.scrollBy(-10000, -10000);
            this.$forceUpdate();
            
          }
          
        });
    }
  },
  mounted()
  { 

      // this.$echo.private(`profile.${this.userInfo.id}`)
      //   .listen(`.update-profile`, (e) =>
      //   {
      //     console.log('Profile updated via Pusher: ', e);
      //     const { response } = e;
      //     const { account, profile, user } = response;
      //     if(account)this.SET_ACCOUNT(account);
      //     if (profile) this.SET_PROFILE(profile);
      //     if (user) this.SET_AUTH(user);

      //     if (this.userRole === 'artists') {

      //       const { genres, members } = response;

      //       // console.log('Band Members: ', members);
      //       if (genres) this.SET_ARTIST_GENRES(genres);
      //       if (members) this.SET_MEMBERS(members);

      //       this.$store.dispatch('artistOptions');
      //     }
      //   })

    if (!this.isLoggedIn) this.$router.push('/');
  },
  computed: {
    ...mapGetters(["userInfo", "info", "token", "isLoggedIn", 'userRole']),
    ...mapState({
      users: (state) => state.user,
    }),
  },
}
</script>

<style lang="scss" scoped>

</style>