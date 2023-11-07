<template>

    <!-- No bookings found! -->
    <!-- <no-message :infoText="message" :infoTitle="title"></no-message> -->

    <div>
      <show-toast-msg :message="message" :description="description" v-if="showToastComponent" />
    </div>

    <div>

      <event-card />

      <booking-request-modal :show="showModal"
        @close-modal="closeModal" @show-toast-msg="showToastMessage"
      />

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
    title: 'No bookings requests yet',
    message: 'Oops! It looks like there are no customer bookings at the moment',
    showModal: false,
    showToast: false,
    optionType: 'pending',
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
    showToastMessage(){
      this.showModal = false;
      this.showToastComponent = true;
      setTimeout(() =>
      {
        this.showToastComponent = false;
      }, 10000);
    },  
  }
}
</script>

<style lang="scss" scoped>
</style>