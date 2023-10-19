<template>
  <section >
    <div>
      <h2>Ongoing Events</h2>
      <div class="row">
        <div class="">
          <ongoing-events/>
        </div>
      </div> 

      <h2>Upcoming Events</h2>

      <div class="row">
        <div class="">
          <upcoming-events/>
        </div>
      </div> 
      
      <h2>Past Events</h2>

      <div class="row">
        <div class="">
          <past-events/>
        </div>
      </div> 
    </div>

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
import { mapActions } from 'vuex';

import OngoingEvents from '/src/components/Organizer/OngoingEvents.vue';
import PastEvents from '/src/components/Organizer/PastEvents.vue';
import UpcomingEvents from '/src/components/Organizer/UpcomingEvents.vue';

export default {
  setup () {
    

    return {}
  },
  components: {
    PastEvents,
    OngoingEvents,
    UpcomingEvents
  },
  methods: {
    ...mapActions([
      'myOngoingEvents', 'myUpcomingEvents', 'myPastEvents',
    ]),
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