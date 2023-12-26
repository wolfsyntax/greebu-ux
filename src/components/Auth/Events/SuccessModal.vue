<template>
  <div class="modal fade" id="eventsCreatedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">

        <div class="modal-body text-center p-0">
          <img src="/assets/artist-account/check-circle.svg" class="check-cirle" alt="check circle">
          <h3 class="event-created">{{ modalType === 'create' ? 'Event created' : (modalType === 'remove' ? 'Cancelled Successfully': 'Successfully Saved') }}!</h3>
          <p class="message">{{ modalType === 'create' ? 'Your event is successfully created': (modalType === 'remove' ? 'Event has already been cancelled' : 'Event has already been saved and updated') }}.</p>
          <button class="bnt close-modal-button" data-bs-dismiss="modal">Done</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    modalType: { 
      type: String,
      default: 'create',
      required: false
    },
    
  },
  methods: {
    ...mapActions([
      'myOngoingEvents', 'myUpcomingEvents', 'myPastEvents',
    ]),
  },
  mounted() {

    const myModal = document.getElementById('eventsCreatedModal');

    myModal.addEventListener('shown.bs.modal', () =>
    {
      this.$store.commit('RESET_EVENT_FORM');
      this.myOngoingEvents();
      this.myUpcomingEvents();
      this.myPastEvents();
    });



  }    
}
</script>

<style scoped>

</style>