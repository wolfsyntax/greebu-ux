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
  },
  mounted()
  {
    // this.fetchArtistOptions();
    // this.artistOptions();
    this.fetchProfile();
  },
  created () {
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>