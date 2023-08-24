<template>
  <layout>
    <router-view></router-view>
  </layout>
  
  <!-- <router-view></router-view> -->
  <slot />
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import Layout from '/src/components/Layouts/Layout.vue';
export default {
  setup()
  {

  },
  methods: {
    ...mapActions([
      'fetchArtistOptions', 'artistOptions', 'fetchProfile',
    ]),
  },
  mounted()
  {
    // this.fetchArtistOptions();
    // this.artistOptions();
    // this.fetchProfile();
    

  },
  created() {
    // this.fetchArtistOptions()
    //   .then(response =>
    //   {
    //     console.log('Fetching Artist Option: [artist layout]', response)
    //   });

    // this.artistOptions();
    // this.fetchProfile();
    this.fetchArtistOptions().then(response =>
    {
      console.log('Fetch Artist Option [index]: ', response)
      this.artistOptions();
      this.fetchProfile();
    })
      .catch(err =>
      {
        // this.$vs.notification({
        //   color: 'danger',
        //   position: 'top-right',
        //   title: 'Server Status',
        //   text: `${err.message}`
        // })
      });
  },
}
</script>

<!-- <style>
@import '@/assets/css/artist-ui.css';
</style> -->