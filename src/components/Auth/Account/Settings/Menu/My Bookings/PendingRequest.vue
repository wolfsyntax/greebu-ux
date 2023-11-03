<template>
  <div>

    <div class="customized-songs-wrapper">
    <div class="d-flex align-items-center justify-content-between event-description">

      <div class="left-wrap">
        <div class="d-flex align-items-center event-wrap">
          <span class="material-symbols-sharp dot-icon">&#xe061;</span>
          <h5 class="mb-0 event">Birthday Event</h5>
          <div>
       
            <!-- <button class="btn border-0 badge-wrap expire-wrap">
              <span class="material-symbols-rounded clock-icon">&#xe8b5;</span>
              <span class="expire">Expire within 20 hours</span>
            </button> -->

            <!-- Cancelled Bookings -->
            <button class="btn p-0 border-0 badge-wrap">
              <span class="in-progress cancelled lh-badge">Cancelled</span>
            </button>

             <!-- Expired Bookings -->
            <!-- <button class="btn border-0 badge-wrap expire-wrap">
              <span class="material-symbols-rounded clock-icon">&#xe8b5;</span>
              <span class="expire">Expired</span>
            </button> -->

          </div>
        </div>

        <div class="mb-0 d-flex align-items-center requested-wrapper">
          <img src="https://lh3.googleusercontent.com/ogw/AKPQZvzlN2Mhph_WafyiahefQ1NCD98zcipm0ZSmrZMaVg=s32-c-mo" class="requested-by-image" alt="Submitted by image"> 
          <a href="#" class="requested-by">Requested by <span class="name">Marvin McKinney</span></a> 
          <span class="material-symbols-sharp dot-icon">&#xe061;</span>
          <span class="time">8 hours ago</span>
        </div>
      </div>

      <div class="details-wrapper">
        <div class="button-wrapper">
          <button type="button" class="btn details" @click="showModal = true">View Details</button>
        </div>
      </div>  

      </div>
      </div>

    <!-- No bookings found! -->
    <!-- <no-message :infoText="message" :infoTitle="title"></no-message> -->

    <booking-request-modal :show="showModal" @close-modal="closeModal" @accept-request="onModalAccepted" />

  </div>
</template>

<script>
import BookingRequestModal from './BookingRequestModal.vue';
import NoMessage from '../NoMessage.vue';

export default {
  setup()
  {


    return {}
  },
  components: {
    BookingRequestModal,
    NoMessage
  },
  data: () => ({
    title: 'No bookings requests yet',
    message: 'Oops! It looks like there are no customer bookings at the moment',
    showModal: false,
    showToast: false
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