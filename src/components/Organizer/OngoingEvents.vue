<template>
  <div>
    <event-card v-for="(item, i) in events" :key="i" :event="item" />
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
      events: state => state.events.ongoingEvents, 
    })
  },
  mounted() {
    console.log('Ongoing Events[vue]: ', this.events)
  },
  methods: {
    
  }
}
</script>
  
  <style lang="scss" scoped></style>