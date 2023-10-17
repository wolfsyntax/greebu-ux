<template>
    <div class="request-song-modal" v-if="show">
      <div class="modal-content">
        <div class="d-flex justify-content-between title-wrapper">
          <div>
            <h3 class="title">Proposal Details</h3>
            <p class="sub-title">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          
          <div>
            <button @click="$emit('close-modal')" class="close-button" ref="closeReqApp">
              <span class="material-symbols-rounded">&#xe5cd;</span>
            </button>
          </div>
        </div> <!-- end of title-wrapper -->
  
        <div class="text-center modal-body">
          <div class="d-flex align-items-center justify-content-between action-wrapper">

         <div class="d-flex align-items-center organizer-offers-details-wrap">
            <img src="/assets/artist-account/band-member-2.webp" class="customer-image" alt="Oganizer image">
            <div>
              <h5 class="from"><span>From:</span> KC event organizer</h5>
              <h6 class="d-flex align-items-center venue">Event Organizer</h6>
            </div>
          </div>
                    <!-- Accepted Proposal tab - View Proposal modal -->
            <div class="d-flex align-items-center">
              <button class="btn decline" @click="showCancelModal = true">Cancel Proposal</button>
            </div>

          </div> 
  
          <div class="d-flex align-items-center note-wrapper">
          <span class="material-symbols-rounded">&#xe28e;</span>
          <p class="note">Your proposal is being reviewed</p>
        </div>
  
          <div class="d-flex align-items-center applied-event-wrap">
  
            <div>
              <img src="/assets/organizers/organizers-banner-bg.webp" class="event-img" alt="Event cover image">
            </div>
  
            <div class="text-start event-details-wrap">
  
              <div class="event-title-wrap">
                <h3 class="event-title">Harmony Fest 2023</h3>
                <div class="d-flex align-items-center ">
                  <h5 class="mb-0">Public Event Posted</h5>
                  <span class="material-symbols-rounded dot-icon">&#xe061;</span>
                  <h5 class="mb-0">3 hours ago</h5>
                </div>
              </div>
  
              <div class="d-flex align-items-start event-start-end-wrap">
                <div>
                  <span class="material-symbols-sharp calendar-icon">&#xe935;</span>
                </div>
                <div>
                  <h5 class="date">March 25, 2023</h5>
                  <h5 class="time">
                    Saturday, 8:00 am - 12:00 pm
                  </h5>
                  <!-- <h5 class="time" v-else>{{ $moment(`${proposal?.start_date}`).format('dddd') }}, {{ $moment(proposal?.start_time).format('h:mm a') }} - {{ $moment(`${proposal?.end_date}`).format('dddd') }}, {{ $moment(proposal?.end_time).format('h:mm a') }}</h5> -->
                </div>
              </div>
  
              <div class="d-flex align-items-start event-venue-wrap">
                <div>
                  <span class="material-symbols-sharp location-icon">&#xe0c8;</span>
                </div>
                <div>
                  <h5 class="venue">Momotz Restobar</h5>
                  <h5 class="place">Naga City, Camarines Sur Philippines</h5>
                </div>
              </div>
  
            </div>
  
          </div> <!-- end of applied-event-wrap -->
  
          <h4 class="text-start artist-details">Artist Details</h4>
  
          <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
            <div class="left">
              <h5>Name of the band</h5>
              <p>Idlepitch</p>
            </div>
  
            <div class="right">
              <h5 class="text-center">Number of members</h5>
              <p class="text-center">2</p>
            </div>
          </div>
  
          <div class="text-start genre-wrap">
            <h5>Genre:</h5>
            <span class="badge">Rock</span>
          </div>
  
          <div class="text-start cover-letter-wrap">
           <h5>Cover letter</h5>
           <p class="mb-0 text-justify">
            I hope this letter finds you in good health and high spirits. I am writing to you as a passionate event organizer
           </p>
          </div>

          <cancellation-modal :show="showCancelModal" @close-modal="closeModal"  />

        </div> <!-- end of modal-body -->
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import CancellationModal from './CancellationModal.vue';

  export default {
    components: {
    CancellationModal,
  },
    props: {
      show: Boolean
    },
    data() {
      return {
        showCancelModal: false,
      }
    },
    computed: {

    },
    methods: {
      closeModal()
    {
      this.showCancelModal = false;
    },
      
      acceptRequest() {
        // this.$emit('close-modal')
        this.$emit('accept-request');
        // this.hideModal();
      }
    },
  };
  </script>
  
  <style>/* Styles for your modal */</style>
  