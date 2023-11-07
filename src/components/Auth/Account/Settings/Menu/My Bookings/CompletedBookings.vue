<template>

  <!-- No bookings found! -->
  <!-- <no-message :infoText="message" :infoTitle="title"></no-message> -->

  <div>

    <event-card />

    <!-- <booking-request-modal :show="showModal"
      @close-modal="closeModal" @show-toast-msg="showToastMessage"
    /> -->

  </div> 

</template>

<script>
// import BookingRequestModal from './BookingRequestModal.vue';
import NoMessage from '../NoMessage.vue';
import BookingRequestModal from './BookingRequestModal.vue';
import EventCard from './EventCardProposal.vue';

export default {
setup()
{

  return {}
},
components: {
 BookingRequestModal,
 EventCard,
  NoMessage
},
data: () => ({
  optionType: 'completed',
}),
methods: {
  closeModal()
  {
    this.showModal = false;
  },
  onModalAccepted()
  {
    this.showToast = true;
    setTimeout(() =>
    {
      this.showToast = false;
    }, 7000);
    this.showModal = false;
  },   
}
}
</script>

<style lang="scss" scoped>
</style>