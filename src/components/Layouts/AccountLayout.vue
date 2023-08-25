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

    this.fetchProfile()
      .then(res =>
      {
        console.log('Fetch Profile [AccountLayout]: ', res)
      }).catch(err =>
      {
        console.log('Fetch Profile Error [AccountLayout]: ', err)
      })

    if (this.userRole === 'artists') {
      this.artistOptions()
        .then(res =>
        {
          console.log('Artist Options [AccountLayout] ', res)
        });
    }
    
  },
  created () {
  },
  computed: {
    ...mapGetters(["userInfo", "token", 'userRole', 'myAccount',])
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>