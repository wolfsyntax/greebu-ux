<template>
  <section >
    <div>
      <h2>Ongoing Events</h2>
      <div class="row">
        <div class="">
          <ongoing-events @modal="toggle" />
        </div>
      </div> 

      <h2>Upcoming Events</h2>

      <div class="row">
        <div class="">
          <upcoming-events @modal="toggle" />
        </div>
      </div> 
      
      <h2>Past Events</h2>

      <div class="row">
        <div class="">
          <past-events @modal="toggle" />
        </div>
      </div> 
    </div>

    <view-detail v-if="isLoggedIn" />
      <!-- SHOW THIS IF THERE IS NO EVENTS -->

        <!-- <div class="text-center no-events-wrap">
          <img src="/assets/events/no-events.svg" class="no-events-icon" alt="No events added icon">
          <h2 class="title">No Events Added</h2>
          <p class="description">It looks like you haven’t posted any events yet? Use the button below to create your first song to start your Geebu journey!</p>
          <button class="btn add-event">Add Event</button>
        </div> -->
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import OngoingEvents from '/src/components/Organizer/OngoingEvents.vue';
import PastEvents from '/src/components/Organizer/PastEvents.vue';
import UpcomingEvents from '/src/components/Organizer/UpcomingEvents.vue';
import ViewDetail from '/src/components/Events/ViewEventDetailsModal.vue';

import { Modal } from 'bootstrap';

export default {
  setup () {
    

    return {}
  },
  components: {
    PastEvents,
    OngoingEvents,
    UpcomingEvents,
    ViewDetail
  },
  methods: {
    ...mapActions([
      'myOngoingEvents', 'myUpcomingEvents', 'myPastEvents',
    ]),
    toggle() {
      console.log('Show Modal')
      new Modal(document.getElementById('eventDetailsModal'), {
          keyboard: false,
          // backdrop: 'static',
        }).show()
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", 'userInfo', 'info', 'userRole']),
  },
  mounted() {
    console.log('My Ongoing Events:')
    this.myOngoingEvents();
    this.myUpcomingEvents();
    this.myPastEvents();

  }
}
</script>

<style lang="scss" scoped>

</style>