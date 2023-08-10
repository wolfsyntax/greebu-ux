<template>
  <div>
    <artist-profile v-if="userRole === 'artists'"/>    
    <organizer-profile v-else-if="userRole === 'organizer'" />
    <provider-profile v-else-if="userRole === 'service-provider'" />
    <customer-profile v-else />
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
  computed: {
    ...mapGetters(["userInfo", "info", "token", "isLoggedIn", 'userRole']),
    ...mapState({
      users: (state) => state.user,
    }),
  }
}
</script>

<style lang="scss" scoped>

</style>