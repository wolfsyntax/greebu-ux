<template>
 
    <div class="container">
      <p>Artist: {{ artist }}</p> 
      <p>User: {{  profile }}</p>
      <p>Member: {{ members }}</p>
    </div>

</template>
<script>
//import Layout from '@/components/Layouts/ArtistLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    // layout: Layout,
  },
  data()
  {
    return {
      form: {
        
      },
      errors: {

      }
    }
  },
  setup()
  {

  },
  props: {
    
  },
  mounted()
  {
    this.fetchArtistOptions().then(response =>
    {

    })
  },
  methods: {
    ...mapActions([
      'retrieveArtists', 'fetchArtistOptions',
    ]),
    submit()
    {

      // this.signin(this.form).then((response) =>
      // {

      //   const { status } = response;

      //   var user = this.$store.state.user;
      //   var role = this.$store.state.role;

      //   if (role === 'artists') {
      //     this.$router.push("/artist");
      //   }

      // });
      

    }
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      users: (state)    => state.user,
      profile: (state)  => state.profile,
      role: (state)     => state.role,
      artist: (state)   => state.artist.artist,
      members: (state)  => state.artist.members,
    }),
  }
}
</script>
<style scoped></style>
