<template>
  <div class="request-song-modal" v-if="show">
    <div class="modal-content">
      <div class="d-flex justify-content-between title-wrapper">
        <div>
          <h3 class="title">Proposal Details</h3>
          <p class="sub-title">Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        <div>
          <button @click="$emit('close-modal')" class="close-button">
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

          <div class="d-flex align-items-center">
            <button class="btn decline">Decline</button>
            <button class="btn accept" @click="acceptRequest">Acccept</button>
          </div>

            <!-- SHOW THIS IF THE ARTIST DENIED THE PROPOSAL -->
            <!-- <div class="d-flex align-items-center">
              <button class="btn decline">Cancel Proposal</button>
            </div> -->


        </div> <!-- end of action-wrapper -->

        <div class="story-wrapper">
          <h4 class="title">Event Details</h4>
          <p class="message">I hope this letter finds you in good health and high spirits. I am writing to you as a passionate event organizer 
            who has been captivated by your exceptional talent and musical prowess. It is with great excitement that I present to you a proposal 
            for an upcoming event, [Event Name], where we would be honored to have you as the headline artist.
          </p>
          <p class="message">I hope this letter finds you in good health and high spirits. I am writing to you as a passionate event organizer who
             has been captivated by your exceptional talent and musical prowess. It is with great excitement that I present to you a proposal for 
             an upcoming event, [Event Name], where we would be honored to have you as the headline artist.
          </p>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>Name of Event</h5>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>

          <div class="right">
            <h5>Type  of Event</h5>
            <p>Birthday Event</p>
          </div>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>Location of Event</h5>
            <p>Naga City, Camarines Sur</p>
          </div>

          <div class="right">
            <h5>Talent fee offered</h5>
            <p>2,000 - 3,000</p>
          </div>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>June 12,2023</h5>
            <p class="d-flex align-items-center"><span class="material-symbols-rounded date">&#xebcc;</span>2: 00 PM</p>
          </div>

          <div class="right hidden-song-info">
            <h5>Delivery Date</h5>
            <p>June 12,2023</p>
          </div>
        </div>
      </div> <!-- end of modal-body -->
    </div>
  </div>
</template>

<script>

export default {
  props: {
    show: Boolean
  },
  data() {
    return {
    }
  },      
  computed: {
  },
  methods: {
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
