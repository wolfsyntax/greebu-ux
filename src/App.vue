<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <router-view></router-view>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  setup() {
    
  },
  methods: {
    ...mapActions([
      'fetchUserInfo', 'signout',
    ]),
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  mounted() {
    console.log('App.vue mounted')
    if (this.isLoggedIn) {

      this.fetchUserInfo()
        .then(res => {
          console.log('Fetch User Info: ', res)
        })
        .catch(err => {
          this.$router.push({name: 'home' })
        })
    }
  }
  // compatConfig: { MODE: 3 },
}
</script>
<style scoped>

</style>
