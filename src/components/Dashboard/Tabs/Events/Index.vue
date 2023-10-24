<template>
  <section >
    <div>
      <h2>This Week Events</h2>
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
    <events-modal @close="dismiss" v-if="isLoggedIn" />
    <event-success :modalType="modalType" />
    <delete-confirmation @confirm="confirmDelete" @cancel="cancelRequest" />
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
import { mapActions, mapGetters, mapState } from 'vuex';

import OngoingEvents from '/src/components/Organizer/OngoingEvents.vue';
import PastEvents from '/src/components/Organizer/PastEvents.vue';
import UpcomingEvents from '/src/components/Organizer/UpcomingEvents.vue';
import ViewDetail from '/src/components/Events/ViewEventDetailsModal.vue';
import EventsModal from '/src/components/Auth/Events/EditModal.vue';
import EventSuccess from '/src/components/Auth/Events/SuccessModal.vue';
// src\components\DeleteConfirmation.vue
import DeleteConfirmation from '/src/components/DeleteConfirmation.vue';

import { Modal } from 'bootstrap';

export default {
  setup () {
    

    return {}
  },
  components: {
    EventsModal,
    EventSuccess,
    PastEvents,
    OngoingEvents,
    UpcomingEvents,
    ViewDetail,
    DeleteConfirmation,
  },
  data: () => ({
    modal: null,
    modalType: 'edit',
  }),
  methods: {
    ...mapActions([
      'myOngoingEvents', 'myUpcomingEvents', 'myPastEvents', 'removeEvent', 
    ]),
    confirmDelete() {
      
      this.modalType = 'remove';

      new Modal(document.getElementById('eventsCreatedModal'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
      
    },
    cancelRequest() {
      this.$store.commit('SET_EVENT_ID');
    },
    dismiss(option) {
      this.modalType = 'edit';

      if (option === 'success') {
        new Modal(document.getElementById('eventsCreatedModal'), {
          keyboard: false,
          backdrop: 'static',
        }).show()
      }
    },
    toggle(eventId, type, origin) {
      // this.$store.commit('SET_EVENT_ID', eventId);
      if (type === 'view') {
        
        new Modal(document.getElementById('eventDetailsModal'), {
          keyboard: false,
          // backdrop: 'static',
        }).show();

      } else if (type === 'remove') {
        
        new Modal(this.modal, {
          keyboard: false,
          backdrop: 'static',
        }).show();

      } else {
      
        new Modal(document.getElementById('editEventModal'), {
          keyboard: false,
          backdrop: 'static',
        }).show();

      }
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", 'userInfo', 'info', 'userRole']),
    ...mapState({
      event_id: state => state.events.eventId
    })
  },
  created() {
    // this.event_id = '';
  },
  mounted() {

    this.$store.commit('SET_EVENT_FORM', {});
    this.myOngoingEvents();
    this.myUpcomingEvents();
    this.myPastEvents();
    
    this.modal = document.getElementById('deleteConfirmation');

    this.modal.addEventListener('hide.bs.modal', () => {
      this.myOngoingEvents();
      this.myUpcomingEvents();
      this.myPastEvents();
      
      this.modalType = 'edit';

    })
    this.modal.addEventListener('shown.bs.modal', () => {
      console.log('Show delete confirmation for event ', this.event_id);
      
    });
  }
}
</script>

<style lang="scss" scoped>

</style>