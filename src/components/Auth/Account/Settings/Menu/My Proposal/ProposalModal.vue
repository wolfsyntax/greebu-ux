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
            <img :src="proposal.organizer_avatar" class="customer-image" alt="Oganizer image">
            <div>
              <h5 class="from"><span>To:</span> {{ proposal.organizer_name }}</h5>
              <h6 class="d-flex align-items-center venue">Event Organizer</h6>
            </div>
          </div>
                    <!-- Accepted Proposal tab - View Proposal modal -->
            <div class="d-flex align-items-center">
              <button class="btn decline" v-if="proposal?.status === 'pending' && proposal?.cancelled_at === null" @click="cancel" >Cancel Proposal</button>
              <button class="btn btn-denied" v-if="proposal?.status === 'pending' && proposal?.cancelled_at">Cancelled</button>
              <button class="btn cancelled" v-if="proposal?.status === 'declined' && proposal?.declined_at">Declined</button>
            </div>

          </div> 
  
          <div class="d-flex align-items-center note-wrapper" v-if="proposal?.status === 'pending' && proposal?.cancelled_at === null">
            <span class="material-symbols-rounded">&#xe28e;</span>
            <p class="note">Your proposal is being reviewed</p>
          </div>
  
          <div class="text-start cancelled-proposal-wrap" v-if="proposal?.status === 'pending' && proposal?.cancelled_at">
            <h4 class="title">Cancellation Reason:</h4>
            <h4 class="mb-0 reason">Financial Setback</h4>
          </div>

          <div class="d-flex align-items-center applied-event-wrap">
  
            <div>
              <img :src="proposal.cover_photo" class="event-img" alt="Event cover image">
            </div>
  
            <div class="text-start event-details-wrap">
  
              <div class="event-title-wrap">
                <h3 class="event-title">{{ proposal.event_name }}</h3>
                <div class="d-flex align-items-center ">
                  <h5 class="mb-0">{{ proposal.is_public }} Posted</h5>
                  <span class="material-symbols-rounded dot-icon">&#xe061;</span>
                  <h5 class="mb-0">{{ $filters.diffForHumans($moment(proposal?.created_at).format('YYYY-MM-DD hh:mm:ss a')) }}</h5>
                </div>
              </div>
  
              <div class="d-flex align-items-start event-start-end-wrap">
                <div>
                  <span class="material-symbols-sharp calendar-icon">&#xe935;</span>
                </div>
                <div>
                  <!-- <h5 class="date">{{ $moment(`${proposal?.start_date}`).format('MMMM DD, YYYY') }} - {{ $moment(`${proposal?.end_date}`).format('MMMM DD, YYYY') }}</h5> -->
                  <h5 class="time" v-if="$moment(proposal?.start_date).isSame(proposal?.end_date)">
                    {{ $moment(`${proposal?.start_date}`).format('dddd') }}, {{ $moment(proposal?.start_time).format('h:mm a') }} - {{ $moment(proposal?.end_time).format('h:mm a') }}
                  </h5>
                  <h5 v-else>
                    {{ $moment(`${proposal?.start_date}`).format('dddd') }}, {{ $moment(proposal?.start_time).format('h:mm a') }} - {{ $moment(`${proposal?.end_date}`).format('dddd') }}, {{ $moment(proposal?.end_time).format('h:mm a') }}
                  </h5>
                  <!-- <h5 class="time" v-else>{{ $moment(`${proposal?.start_date}`).format('dddd') }}, {{ $moment(proposal?.start_time).format('h:mm a') }} - {{ $moment(`${proposal?.end_date}`).format('dddd') }}, {{ $moment(proposal?.end_time).format('h:mm a') }}</h5> -->
                </div>
              </div>
  
              <div class="d-flex align-items-start event-venue-wrap">
                <div>
                  <span class="material-symbols-sharp location-icon">&#xe0c8;</span>
                </div>
                <div>
                  <h5 class="venue">{{ proposal.venue_name }}</h5>
                  <h5 class="place">{{ proposal.location }}</h5>
                </div>
              </div>
  
            </div>
  
          </div> <!-- end of applied-event-wrap -->
  
          <h4 class="text-start artist-details">Artist Details</h4>
  
          <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
            <div class="left">
              <h5>Name of the band</h5>
              <p>{{ proposal.artist_name }}</p>
            </div>
  
            <div class="right">
              <h5 class="text-center">Number of members</h5>
              <p class="text-center">{{ proposal.total_member || 0 }}</p>
            </div>
          </div>
  
          <div class="text-start genre-wrap">
            <h5>Genre:</h5>
            <span class="badge" v-for="(genre, index) in proposal?.genres" :key="index">{{ genre }}</span>
          </div>
  
          <div class="text-start cover-letter-wrap">
           <h5>Cover letter</h5>
           <p class="mb-0 text-justify">
            {{ proposal.cover_letter }}
           </p>
          </div>

        </div> <!-- end of modal-body -->
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  // import CancellationModal from './CancellationModal.vue';

  export default {
    components: {
    // CancellationModal,
  },
    props: {
      show: Boolean
    },
    data() {
      return {
        // showCancelModal: false,
      }
    },
    computed: {
      ...mapState({
        proposal: state => state.proposal,
      })
    },
    methods: {
      ...mapActions([
        'cancelMyProposal'
      ]),
      closeModal()
    {
      this.showCancelModal = false;
    },
      acceptRequest() {
        // this.$emit('close-modal')
        this.$emit('accept-request');
        // this.hideModal();
      },
      cancel() {
        console.log('cancel proposal is clicked.')
        this.$emit('close-modal', '');
        // this.cancelMyProposal(this.proposal.id)
        //   .then(res => {
            
        //     // this.$refs.proposalClose.click()
        //   })
        
      
      },
      acceptRequest(){
        // this.$emit('close-modal')
        this.$emit('accept-request');
        // this.hideModal();
      }
    },
  };
  </script>
  
<style>
/* Styles for your modal */
</style>
  