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
    
    this.fetchProfile()
      .then(res =>
      { 
        console.log('Fetch Profile [ArtistLayout]: ', res)
      }).catch(err =>
      {
        console.log('Fetch Profile Error [ArtistLayout]: ', err)
      })

    this.artistOptions()
      .then(res =>
      {
        console.log('Artist Options [ArtistLayout] ', res)
      });
    console.log('Artist layout mounted');
  },
  created() {
    
  },
}
</script>

<!-- <style>
@import '@/assets/css/artist-ui.css';
</style> -->