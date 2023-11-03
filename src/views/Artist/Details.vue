<template>
  <div>
    [{{ artistProfile }}]
    {{ $route.params?.id }}
    <button>Follow</button>
    <button @click="$router.push({name: 'artists-booking', params: {id: $route.params?.id }})">Book Now</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  setup () {
    

    return {}
  },
  mounted() {
    this.fetchArtist(this.$route.params?.id);
  },
  methods: {
    ...mapActions(['fetchArtist',]),
  },
  computed: {
    ...mapState({
      artistProfile: state => state.artist.artist_profile,
    })
  }
}
</script>

<style lang="scss" scoped>

</style>