<template>
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

            <!-- Cancelled Booking -->
            <!-- <button class="btn p-0 border-0 badge-wrap">
              <span class="in-progress cancelled lh-badge">Cancelled</span>
            </button> -->

              <!-- Accepted Booking -->
            <!-- <button class="btn p-0 border-0 badge-wrap">
              <span class="in-progress in-progress lh-badge">10 days to go</span>
            </button> -->

             <!-- Denied Booking -->
            <!-- <button class="btn p-0 border-0 badge-wrap">
              <span class="in-progress cancelled lh-badge">Denied</span>
            </button> -->

            <!-- Completed Booking -->
            <button class="btn p-0 border-0 badge-wrap">
              <span class="in-progress completed lh-badge">Completed</span>
            </button>

             <!-- Expired Booking -->
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
   

  <booking-request-modal :show="showModal" @close-modal="closeModal" @accept-request="onModalAccepted" />

</template>

<script>
import BookingRequestModal from './BookingRequestModal.vue';

export default {
  components: {
    BookingRequestModal,
  },
  data () {
    return {
       showModal: false,
    }
  },
  props: {
    // proposal: { 
    //   type: Object,
    //   default: {},
    //   required: true
    // },
  },
  watch: {
  },
  methods: {
    // showModal() {
    // this.$store.commit('setProposal', this.proposal);
    // this.$emit('view', this.proposal);
    // },
    closeModal()
    {
      this.showModal = false;
    },
  },
}
</script>

<style scoped>
</style>