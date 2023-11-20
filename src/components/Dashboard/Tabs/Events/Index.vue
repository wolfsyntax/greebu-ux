<template>
  <section >
    <div>
      <h2>This Week Events</h2>
      <div class="row">
        <div class="">
          <ongoing-events @modal="toggle" :accessType="previewAs" />
        </div>
      </div> 

      <h2>Upcoming Events</h2>

      <div class="row">
        <div class="">
          <upcoming-events @modal="toggle" :accessType="previewAs" />
        </div>
      </div> 
      
      <h2>Past Events</h2>

      <div class="row">
        <div class="">
          <past-events @modal="toggle" :accessType="previewAs" />
        </div>
      </div> 
    </div>

    <view-detail usage="dashboard" v-if="isLoggedIn" />
    <events-modal @close="dismiss" v-if="isLoggedIn" />
    <cancel-modal :show="showCancel" @confirm="confirmDelete" @close="dismissCancel" />
    <event-success :modalType="modalType" />
    <!-- <delete-confirmation @confirm="confirmDelete" @cancel="cancelRequest" /> -->
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
import CancelModal from './EventCancel.vue';

import { Modal } from 'bootstrap';

export default {
  setup () {
    

    return {}
  },
  components: {
    EventsModal,
    CancelModal,
    EventSuccess,
    PastEvents,
    OngoingEvents,
    UpcomingEvents,
    ViewDetail,
    DeleteConfirmation,
  },
  props: {
    previewAs: { 
      type: String,
      default: 'dashboard',
      required: true
    },
  },
  data: () => ({
    modal: null,
    modalType: 'edit',
    showCancel: false,
  }),
  methods: {
    ...mapActions([
      'myOngoingEvents', 'myUpcomingEvents', 'myPastEvents', 'removeEvent', 
    ]),
    dismissCancel() {
      this.showCancel = false;
      this.$store.commit('SET_EVENT_ID');
    },
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
      this.$store.commit('SET_EVENT', eventId)
      
      if (type === 'view') {
        
        new Modal(document.getElementById('eventDetailsModal'), {
          keyboard: false,
          // backdrop: 'static',
        }).show();

      } else if (type === 'remove') {
        console.log('Remove show cancel')
        this.showCancel = true;
        new Modal(document.getElementById('eventCancellation'), {
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
    console.log('Event Tab preview as ', this.previewAs)
    if (this.previewAs === 'dashboard') {
      
      this.myOngoingEvents();
      this.myUpcomingEvents();
      this.myPastEvents();

    } 

  },
  watch: {
    showCancel(cur, prev) {
      
      if (!cur) {
        this.myOngoingEvents();
        this.myUpcomingEvents();
        this.myPastEvents();
        
        this.modalType = 'edit';
      }

    }
  }
}
</script>

<style scoped>
@import '@/assets/css/artist-ui.css';
</style>