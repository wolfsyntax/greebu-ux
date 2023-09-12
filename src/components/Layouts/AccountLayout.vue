<template>
  <div>
    <layout>
    <!-- <slot /> -->
    <!-- <router-view /> -->
  </layout>
  </div>
</template>

<script>
import Layout from '/src/components/Layouts/Layout.vue';
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    layout: Layout
  },
  data()
  {
    return {
    }
  },
  watch: {
  },
  props: {
  },
  methods: {
    ...mapActions([
      'fetchArtistOptions', 'artistOptions', 'fetchProfile',
    ]),
    ...mapMutations([
      'SET_ACCOUNT', 'SET_AUTH', 'SET_PROFILE',
      'SET_ARTIST_GENRES', 'SET_MEMBERS',
    ]),
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

          this.$store.dispatch('artistOptions');
        }
      })
      .listen(`.update-member`, (e) =>
        {
          console.log('Member via Pusher [account layout]: ', e);
          const { response: { members } } = e;
          if (members) this.SET_MEMBERS(members);

        })
    
  },
  created()
  {

  },
  computed: {
    ...mapGetters(["userInfo", "token", 'userRole', 'myAccount',]),
    ...mapState({
      users: (state) => state.user,
    }),
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>