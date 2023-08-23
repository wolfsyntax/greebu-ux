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
    this.fetchArtistOptions();
    this.artistOptions();
    this.fetchProfile();
  },
  created() {
    this.fetchArtistOptions()
      .then(response =>
      {
        console.log('Fetching Artist Option: [artist layout]', response)
      });
    this.artistOptions();
  },
}
</script>

<!-- <style>
@import '@/assets/css/artist-ui.css';
</style> -->