<template>
  <div class="card">
    <div class="bg-wrapper">
      <img :src="event?.cover_photo" class="img-fluid card-bg" loading="lazy" alt="Event image">
      <div class="organized-by">
        <img :src="event?.organizer_avatar" class="float-start" alt="Organized by logo">
        <div>
          <h5>{{ event?.organizer_name }}</h5>
          <p>Organized by</p>
        </div>
      </div>
    </div> <!-- end of bg-wrapper -->

    <div class="card-body">
      <h5 class="card-title">{{ event?.event_name }}
        <span v-if="event?.is_free" class="badge free">Free</span>
        <span v-else class="badge paid">Paid</span>
      </h5>

      <p class="card-text">{{ event?.description }}</p>
      <p class="location">
        <span class="material-symbols-outlined">location_on</span>
        <span class="text">{{ event?.location }}</span>
      </p>

      <p class="date">
        <span class="material-symbols-outlined">calendar_month</span>
        <span class="orange-text">{{ $moment(`${event?.start_date}`).format('MMMM Do, YYYY') }}&nbsp;&mdash;&nbsp;{{
          $moment(`${event?.end_date}`).format('MMMM Do, YYYY') }}</span>
      </p>

      <p class="time">
        <span class="material-symbols-outlined">schedule</span>
        <span class="orange-text">{{ $moment(`${$moment().format('YYYY-MM-DD')} ${event?.start_time}`).format('h:mm a')
        }}&nbsp;&mdash;&nbsp;{{ $moment(`${$moment().format('YYYY-MM-DD')} ${event?.end_time}`).format('h:mm a')
}}</span>
      </p>

      <div class="seeking-for" v-if="(userRole === 'artists' || userRole === 'organizer') && event?.look_types.length > 0">
        <h6 class="title">Seeking for</h6>
        <span class="badge type-artist" v-for="(look, index) in event?.look_types" :key="index">{{ look }}</span>
      </div>

      <div v-if="isLoggedIn">
        <button class="btn btn-primary view-details" @click="toggle(pos)">View Details</button>
      </div>

      <div v-else>
        <button class="btn btn-primary view-details" @click="toggle">View Details</button>
      </div>

      <button class="btn btn-primary send-proposal" @click="sendProposal" v-if="userRole === 'artists'" >Send Proposal</button>
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