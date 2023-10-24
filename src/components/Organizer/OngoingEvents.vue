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
    <button class="btn add-event">Add Event</button>
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
    
  },
  computed: {
    ...mapGetters(["isLoggedIn", 'userRole']),
    ...mapState({
      events: state => state.events.ongoingEvents, 
    })
  },
  mounted() {
    console.log('Ongoing Events[vue]: ', this.events)
  },
  methods: {
    viewDetail(target, type) {
      this.$store.commit('SET_EVENT_ID', target?.id || '');
      
      this.$emit('modal', target?.id, type, 'ongoing');
      console.log('Selected Ongoing Event: ', target)
    }
  }
}
</script>
  
  <style lang="scss" scoped></style>