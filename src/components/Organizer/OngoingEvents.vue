<template>

  <div class="card">
    <div class="bg-wrapper">
    <img src="/assets/organizer-account/post-img.webp" class="img-fluid card-bg" loading="lazy" alt="Event image">
    <div class="d-flex align-items-start organized-by">
        <img src="/assets/organizer-account/post-img.webp" class="float-start" alt="Organized by logo">
        <div class="organizer-wrap">
        <h5>JJ Enterprises</h5>
        <p class="mb-0">Organized by</p>
        </div>
    </div>

    </div> <!-- end of bg-wrapper -->
    <div class="card-body">
    <div class="d-flex align-items-center event-details-wrap">
        <div>
        <h6 class="mb-0 month">APR</h6>
        <h3 class="mb-0 num">01</h3>
        </div>
        <div>
        <h4 class="event-name">IDLE PITCH PAUSE PLAY REWIN</h4>
        <h5 class="event-place">Naga City, Cam. Sur Philippines</h5>
        <h5 class="date-time">Saturday, 8:00 am - 12:00 pm</h5>
        </div>
    </div>
    <div>
        <button class="mb-0 btn btn-primary view-details">View Details</button>
    </div>
    </div>
  </div>
    

  </template>
  
  <script>
  import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
  import ViewDetail from '/src/components/Events/ViewEventDetailsModal.vue';
  import MustSignupModal from '/src/components/Artist/MustSignupModal.vue';
  export default {
    setup()
    {
  
  
      return {}
    },
    components: {
      ViewDetail,
      signupmodal: MustSignupModal,
    },
    props: {
      pos: {
        type: Number,
        default: -1,
        required: true
      },
  
      event: {
        type: Object,
        default: {},
        required: true
      },
    },
    computed: {
      ...mapGetters(["isLoggedIn", 'userRole']),
      ...mapState({
        account: state => state.account,
        members: (state) => state.artist.members,
      })
    },
    mounted()
    {
      console.log('Card: ', this.event);
    },
    methods: {
      toggle(pos = -1)
      {
        if (pos > -1) {
          this.$store.commit('SET_EVENT', this.event);
        } else {
          this.$store.commit('SET_EVENT', {});
        }
  
        this.$emit('show', pos);
  
      },
      sendProposal()
      {
        
        this.$store.commit('SET_EVENT', this.event);
        this.$store.commit('SET_PROPOSAL', {
          event_id: this.event.id || '',
          artist_id: this.account.id || '',
          artist_name: this.account.artist_name || '',
          genres: this.account.genres || [],
          total_member: this.members.length || 0,
          cover_letter: '',
          sample_song: '',
        })
  
        this.$router.push('/proposal')
      }
    }
  }
  </script>
  
  <style lang="scss" scoped></style>