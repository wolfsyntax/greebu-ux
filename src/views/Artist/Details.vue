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

    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (regexExp.test(str)) this.fetchArtistById(this.$route.params?.id);
    else this.fetchArtistBySlug(this.$route.params?.id)
  },
  methods: {
    ...mapActions(['fetchArtistById', 'fetchArtistBySlug', ]),
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