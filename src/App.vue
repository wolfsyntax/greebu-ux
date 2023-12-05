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
  created() {
    const success = (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log('My Geo-Location: ', latitude, longitude);
      // Do something with the position
    };

    const error = (err) => {
      console.log('On Error Geo-Location', error)
    };

    if (navigator.geolocation) {
      // This will open permission popup
      navigator.geolocation.getCurrentPosition(success, error);
    }

  },
  beforeRouteEnter (to, from, next) { 
    console.log('To: ', to)
    console.log('From: ', from);
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
