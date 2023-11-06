<template>
  <div class="request-song-modal" v-if="show">
    <div class="modal-content">
      <div class="d-flex justify-content-between title-wrapper">
        <div>
          <h3 class="mb-0 title">Booking request</h3>
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
            <img src="/assets/artist-account/artist-profile-1.webp" class="customer-image" alt="Booker's image">
            <div>
              <h5 class="from"><span>From:</span> Idlepitch</h5>
              <h6 class="d-flex align-items-center mb-0 venue">Full band</h6>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <button class="btn decline disabled">Decline</button>
            <button class="btn accept disabled" @click="acceptRequest">Acccept</button>
          </div>

            <!-- Pending Response - Waiting for approval button -->
            <!-- <div class="d-flex align-items-center">
              <button class="btn approval">Waiting for Approval</button>
            </div> -->

             <!-- Accepted Collaboration - Accepted button -->
            <!-- <div class="d-flex align-items-center">
              <button class="btn accept">Message</button>
            </div> -->

             <!-- Denied - Cancelled button -->
            <!-- <div class="d-flex align-items-center">
              <button class="btn cancelled">Cancelled</button>
            </div> -->


        </div> <!-- end of action-wrapper -->

            <!-- Expired Booking -->
        <!-- <div class="d-flex align-items-center note-wrapper expired-wrap">
          <span class="material-symbols-rounded">&#xe8b5;</span>
          <p class="note">This booking is no longer valid due to its expiration.</p>
        </div> -->

        <!-- Cancelled Booking -->
        <div class="d-flex align-items-center note-wrapper">
          <span class="material-symbols-rounded">&#xe14b;</span>
          <p class="note">Need to change the event address/ location</p>
        </div>

        <div class="text-start cancelled-proposal-wrap">
          <h4 class="title">Cancellation Reason:</h4>
          <h4 class="mb-0 reason">Financial Setback</h4>
        </div>

        <div class="text-start booking-box-wrap">
          <h4 class="event-name">Bubbly & Brunch Birthday Bash 2023</h4>
          <div class="d-flex align-items-center">
            <span class="material-symbols-rounded">&#xf233;</span>
            <p>Private event</p>
          </div>
          <div class="d-flex align-items-center">
            <span class="material-symbols-rounded">&#xebcc;</span>
            <p>June 12,2023</p>
          </div>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>Type of Event</h5>
            <p>Birthday Event</p>
          </div>

          <div class="right">
            <h5>Talent fee offered</h5>
            <p>2,000 - 3,000</p>
          </div>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>Venue Name</h5>
            <p>Momotz Resto Bar</p>
          </div>

          <div class="right">
            <h5>Venue Address</h5>
            <p>Naga City, Camarines Sur</p>
          </div>
        </div>

        <div class="text-start cover-letter-wrap">
          <h5>Cover letter</h5>
          <p class="mb-0 text-justify">I hope this letter finds you in good health and high spirits. 
            I am writing to you as a passionate event organizer who has been captivated by your exceptional 
            talent and musical prowess. It is with great excitement that I present to you a proposal for an 
            upcoming event, [Event Name], where we would be honored to have you as the headline artist.</p>
        </div>

        <h4 class="text-start client-details">Client Details</h4>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>Name</h5>
            <p>Marvin Mckinney</p>
          </div>
          <div class="right">
            <h5>Email Addres</h5>
            <p>MarvinMckinney123@gmail.com</p>
          </div>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>Phone Number</h5>
            <p>+6391458745125</p>
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