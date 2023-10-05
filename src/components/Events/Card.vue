<template>
  <div class="card">

    <div class="bg-wrapper">
      <img :src="event.cover_photo" class="img-fluid card-bg" loading="lazy" alt="Event image">
      <div class="d-flex align-items-start organized-by">
        <img :src="event.organizer_avatar" class="float-start" alt="Organized by logo">
        <div>
          <h5>{{ event.organizer_name }}</h5>
          <p class="mb-0">Organized by</p>
        </div>
      </div>
    </div> <!-- end of bg-wrapper -->

    <div class="card-body">

      <div class="event-title-wrap">
        <h5 class="card-title">{{ event.event_name }} </h5>
        <p class="mb-0 card-text">{{ event.description }}</p>
      </div>

      <div class="place-time-wrap">

        <div class="location">
          <span class="material-symbols-outlined">&#xe0c8;</span>
          <p>{{ event.location }}</p>
        </div>
        <div class="date">
          <span class="material-symbols-outlined">&#xebcc;</span>
          <p>{{ $moment(`${event.start_date}`).format('MMMM Do, YYYY') }} - {{ $moment(`${event.end_date}`).format('MMMM Do, YYYY') }}</p>
        </div>
        <div class="time">
          <span class="material-symbols-outlined">&#xe8b5;</span>
          <p>{{ $moment(`${$moment().format('YYYY-MM-DD')} ${event.start_time}`).format('h:mm a') }} - {{
            $moment(`${$moment().format('YYYY-MM-DD')} ${event.end_time}`).format('h:mm a') }}</p>
        </div>

      </div>

      <div class="seeking-for" v-if="(userRole === 'artists' || userRole === 'organizer') && event.look_types.length > 0">
        <h6 class="title">Seeking for</h6>
        <span class="badge type-artist" v-for="(look, index) in event.look_types" :key="index">{{ look }}</span>
      </div>
      <div class="seeking-for"
        v-if="(userRole === 'artists' || userRole === 'organizer') && event.look_types.length === 0">
        <h6 class="title" style="opacity: 0;">Seeking for</h6>
        <span class="badge type-artist" style="opacity: 0;">acoustic band</span>
      </div>

      <div v-if="isLoggedIn">
        <button class="btn btn-primary view-details" data-bs-toggle="modal" data-bs-target="#eventDetailsModal">View
          Details</button>
        <viewEventDetails />
      </div>
      <div v-else>
        <button class="btn btn-primary view-details" data-bs-toggle="modal" data-bs-target="#mustSignUp">View
          Details</button>
        <signupmodal />
      </div>

      <button class="btn btn-primary send-proposal" @click="sendProposal" v-if="userRole === 'artists'" >Send Proposal</button>
    </div>
  </div> <!-- end of card -->
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import ViewDetail from '/src/components/Events/ViewEventDetailsModal.vue';
import MustSignupModal from '/src/components/Artist/MustSignupModal.vue';
export default {
  setup() {


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
  },
  mounted() {
    console.log('Card: ', this.event);
  },
  methods: {
    toggle(pos = -1) {
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
      this.$router.push('/proposal')
    }
  }
}
</script>

<style lang="scss" scoped></style>