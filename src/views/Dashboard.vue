<template>
  <layout>
    <artist-dashboard v-if="userRole === 'artists'"/>
    <organizer-dashboard v-else-if="userRole === 'organizer'"/>
    <provider-dashboard v-else-if="userRole === 'service-provider'"/>
    <customer-dashboard v-else-if="userRole === 'customers'"/>
    
    <div v-else>
      No Profile Exists
    </div>

  </layout>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

import ArtistDashboard from '@/components/Dashboard/Artist.vue';
import OrganizerDashboard from '@/components/Dashboard/Organizer.vue';
import ProviderDashboard from '@/components/Dashboard/ServiceProvider.vue';
import CustomerDashboard from '@/components/Dashboard/Customer.vue';

import Layout from '/src/components/Layouts/Layout.vue';
export default {
  components: {
    ArtistDashboard,
    OrganizerDashboard,
    ProviderDashboard,
    CustomerDashboard,
    Layout,
  },
  setup()
  {

  },
  data: () => ({}),
  computed: {
    ...mapGetters(["userInfo", 'info', 'isLoggedIn', 'userRole',]),
    ...mapState({
      users: (state) => state.user,
    }),
  },
  mounted()
  {
    this.$echo.private(`profile.${this.userInfo?.id}`)
      .listen(`.update-profile`, (e) =>
      {
        console.log('Profile updated via Pusher [account layout]: ', e);
        const { response } = e;
        const { account, profile, user } = response;

        if (account) this.SET_ACCOUNT(account);
        if (profile) this.SET_PROFILE(profile);
        if (user) this.SET_AUTH(user);

        if (this.userRole === 'artists') {

          const { genres, members } = response;

          if (genres) this.SET_ARTIST_GENRES(genres);
          if (members) this.SET_MEMBERS(members);

          this.artistOptions();
        }
      })
      .listen(`.update-member`, (e) =>
      {
        console.log('Member via Pusher [Dashboard - Global]: ', e);
        const { response: {members} } = e;
        if (members) this.SET_MEMBERS(members);
        
      }) 

    // this.$echo.private(`artist-profile.${this.userInfo?.id}`)
    //   .listen(`.update-member`, (e) =>
    //   {
    //     console.log('Member via Pusher [Dashboard - Global]: ', e);
    //     const { response } = e;

    //   })
  },
  watch: {

  },
  methods: {
    ...mapActions([
      'artistOptions', 'fetchProfile',
    ]),
    ...mapMutations([
      'SET_ACCOUNT', 'SET_AUTH', 'SET_PROFILE',
      'SET_ARTIST_GENRES', 'SET_MEMBERS',
    ]),
  },

}
</script>