<template>
  <div>
    <artist-profile @form="submit" :error="errors" v-if="userRole === 'artists'"/>    
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

import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    ArtistProfile,
    CustomerProfile,
    OrganizerProfile,
    ProviderProfile
  },
  setup () {
    

    return {}
  },
  data: () => ({
    form: {},
    errors: []
  }),
  methods: {
    ...mapActions([
      'accountProfile',
    ]),
    submit(value)
    {

      console.log(`Account Profile [${this.userRole}]: `, value);
      
      // this.accountProfile(value)
      //   .then(response =>
      //   {
      //     console.log('Account Profile: ', response);
      //     this.errors = [];
      //   });
    }
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