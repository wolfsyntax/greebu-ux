<template>
  <div class="my-proposal">

    <div class="content" v-if="userRole === 'artists'">
      <my-proposal-artist />
    </div>

    <div class="content" v-else-if="userRole === 'organizer'">
      <my-proposal-organizer />
    </div>

  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import MyProposalArtist from './My Proposal Artist/Index.vue';
import MyProposalOrganizer from './My Proposal Organizer/Index.vue';

export default {
  components: {
    MyProposalArtist,
    MyProposalOrganizer
  },
  setup()
  {

    return {}
  },
  computed: {
    ...mapGetters(['myAccount', ]),
    ...mapState({
      userRole: state => state.role,
    })
  },
}
</script>

<style lang="scss" scoped></style>