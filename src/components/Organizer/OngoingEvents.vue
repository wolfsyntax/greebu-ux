<template>
  <div class="row" v-if="events.length">
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"  v-for="(item, i) in events" :key="i" >
      <event-card :myEvent="item" @show-detail="viewDetail" />
    </div>
  </div>
  <div class="text-center no-events-wrap" v-else>
    <img src="/assets/events/no-events.svg" class="no-events-icon" alt="No events added icon">
    <h2 class="title">No Events Added</h2>
    <p class="description">It looks like you haven’t posted any events yet? Use the button below to create your first song to start your Geebu journey!</p>
    <button class="btn add-event" v-if="userRole === 'organizer'">Add Event</button>
  </div>
</template>
  
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import ViewDetail from '/src/components/Events/ViewEventDetailsModal.vue';
import MustSignupModal from '/src/components/Artist/MustSignupModal.vue';

import EventCard from '/src/components/Dashboard/Tabs/Events/EventCard.vue';
export default {
  setup()
  {
  
  
    return {}
  },
  components: {
    EventCard,
    ViewDetail,
    signupmodal: MustSignupModal,
  },
  props: {
    accessType: { 
      type: String,
      default: 'dashboard',
      required: false
    },
    
  },
  data: () => ({
    events: [],
  }),
  computed: {
    ...mapGetters(["isLoggedIn", 'userRole']),
    ...mapState({
      myEvents: state => state.events.ongoingEvents,
      ongoing: state => state.artist.artistOngoingEvents,
    })
  },
  mounted() {
    console.log('Ongoing Events[vue]: ', this.events)
    this.events = this.accessType === 'dashboard' ? this.myEvents : this.ongoing; 
  },
  methods: {
    viewDetail(target, type) {
      this.$store.commit('SET_EVENT', target);
      this.$emit('modal', target, type, 'ongoing');
      console.log('Selected Ongoing Event: ', target)
    }
  }
}
</script>
  
  <style lang="scss" scoped></style>