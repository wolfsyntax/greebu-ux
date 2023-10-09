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
          <div class="d-flex align-items-center ">
            <img src="/assets/artist-account/band-member-2.webp" class="customer-image" alt="Requester image">

            <div>
              <h5 class="name">Alvin Makahiya</h5>
              <p class="username">User12345</p>
            </div>

            <!-- <div>

              <h5 class="from"><span>From:</span> KC event organizer</h5>
              <h6 class="d-flex align-items-center venue">Event Organizer
              <span class="material-symbols-rounded dot-icon">&#xe061;</span>
              Naga City, Camarines Sur</h6>
              <p class="d-flex align-items-center mb-0 star-ratings">
                <span class="material-symbols-rounded star-icon">&#xe838;</span>
                4.95 <span class="reviews">(234 reviews)</span>
              </p>

              </div> -->

          </div>

          <div class="d-flex align-items-center">

            <button class="btn decline">Decline</button>
            <button class="btn accept" @click="acceptRequest">Acccept</button>

            <!-- SHOW THIS IF THE ARTIST ACCEPTED THE CUSTOMIZED SONG REQUEST  -->
            <!-- <button class="btn accepted">Decline</button> -->

            <!-- SHOW THIS IF THE ARTIST DENIED THE CUSTOMIZED SONG REQUEST  -->
            <!-- <button class="btn cancelled">Cancelled</button> -->

          </div>
        </div> <!-- end of action-wrapper -->

        <!-- <div class="d-flex align-items-center note-wrapper">
          <span class="material-symbols-rounded info-icon">&#xe88e;</span>
          <p class="note">Clients will only pay if the requested customized song is accepted.</p>
        </div> -->

        <div class="text-start event-organized-wrap">
          <h5>Event organized</h5>
          <span class="badge">Birthdays</span>
          <span class="badge">Weddings</span>
        </div>

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
            <h5>Language</h5>
            <p>English</p>
          </div>

          <div class="right">
            <h5>Duration of Song?</h5>
            <p>5 minutes</p>
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
