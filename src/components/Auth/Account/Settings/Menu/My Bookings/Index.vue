<template>
  <div class="my-bookings">
    <div class="d-flex align-items-center justify-content-between title-wrapper">
      <h3 class="title">Bookings</h3>

      <div v-if="showToast" class="d-flex justify-content-between toast-accepted-request">
        <div class="d-flex accepted-wrapper">
          <span class="material-symbols-rounded check-circle">&#xe86c;</span>
          <div>
            <h5 class="accepted">You accepted request</h5>
            <p class="description">You can now work on the customer's customized song.</p>
          </div>
        </div>

        <div class="close-toast">
          <span class="material-symbols-rounded close-icon" @click="closeAcceptedToast">&#xe5cd;</span>
        </div>
      </div>
    </div> <!-- end of title-wrapper -->

    <div class="d-flex align-items-center customized-songs-tabs">
      <li class="d-flex align-items-center" 
        v-for="booking in myBookings" 
        :key="booking.name"
        :class="{ 'active-option': selectedBooking === booking.name }"
        @click="showCustomizeContent(booking)"
      >
        <h5 class="tab-title">{{ booking.name }}</h5>
      </li>
    </div>
    
    <pending-request v-if="selectedBooking === 'Pending Request'"/>
    <accepted-bookings v-if="selectedBooking === 'Accepted Bookings'" />
    <denied-bookings v-if="selectedBooking === 'Denied Bookings'"/>
    <completed-bookings v-if="selectedBooking === 'Completed Bookings'"/>
    
  </div>
</template>
  
<script>

import {mapActions, mapState} from 'vuex';
import CompletedBookings from './CompletedBookings.vue';
import DeniedBookings from './DeniedBookings.vue';
import AcceptedBookings from './AcceptedBookings.vue';
import PendingRequest from './PendingRequest.vue';

export default {
  components: {
    CompletedBookings,
    DeniedBookings,
    AcceptedBookings, 
    PendingRequest, 
  },
  props: {

  },
  data() {
    return {
      myBookings: [
        { name: 'Pending Request'},
        { name: 'Accepted Bookings'},
        { name: 'Denied Bookings'},
        { name: 'Completed Bookings'},
      ],
      selectedBooking: 'Pending Request', // Default selected option
      showModal: false,
      showToast: false
    }
  },      
  computed: {
    
  },
  methods: {
    ...mapActions([
      'fetchMyProposals'
    ]),
    showCustomizeContent(booking) {
      console.log('showCustomizeContent: ', booking)
      this.selectedBooking = booking.name;
    },
    closeModal(){
      this.showModal = false;
    },
    onModalAccepted(){
      this.showToast = true;

      setTimeout(() => { this.showToast = false; }, 7000);

      this.showModal = false;
    },
    closeAcceptedToast(){
      this.showToast = false;
    },
    showToastDiv(){
      this.showToast = true;
    }
  },
  mounted() {
    
    // this.fetchMyProposals();  
    // this.fetchMyProposals('accepted');  
    // this.fetchMyProposals('declined');  
    
  },
  watch: {
    selectedCustomized(val) {
      // var payload = 'pending';
      
      // if (['Accepted Proposals', 'Denied Proposals', 'Submitted Proposals', ].includes(val)) {
        
      //   if (val === 'Accepted Proposals') payload = 'accepted';
      //   else if (val=== 'Denied Proposals') payload = 'declined';

      //   this.fetchMyProposals(payload)
      //   .then(res => console.log('Tab click option (response): ', res));
      // }
      
    }
  }
};
</script>

<style>
/* Styles for your modal */
</style>
