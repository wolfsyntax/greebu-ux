<template>
  <div class="request-song-modal" v-if="show">
    <div class="modal-content">
      <div class="d-flex justify-content-between title-wrapper">
        <div>
          <h3 class="title">Request Application</h3>
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
          <div class="d-flex align-items-center">
            <img src="/assets/artist-account/band-member-2.webp" class="customer-image" alt="Requester image">
            <div>
              <h5 class="name">Idlepitch</h5>
              <p class="username">Artist</p>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <button class="btn decline">Decline</button>
            <button class="btn accept" @click="acceptRequest">Acccept</button>
          </div>
        </div> <!-- end of action-wrapper -->

        <div class="mb-4 d-flex align-items-center note-wrapper">
          <span class="material-symbols-rounded info-icon">&#xe88e;</span>
          <p class="note">Idlepitch band has submitted an application request for your event</p>
        </div>

        <div class="mb-4 d-flex align-items-center applied-event-wrap">

          <div>
            <img src="/assets/organizer-account/post-img.webp" class="event-img" alt="Event cover image">
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
                <h5 class="time">Saturday, 8:00 am - 12:00 pm</h5>
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

        <h4 class="mb-4 text-start artist-details">Artist Details</h4>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div>
            <h5>Name of the band</h5>
            <p>Idleaput</p>
          </div>

          <div class="right">
            <h5>Number of members</h5>
            <p>8</p>
          </div>
        </div>

        <div class="text-start genre-wrap">
          <h5>Genre:</h5>
          <span class="badge">Rock</span>
          <span class="badge">Jazz</span>
        </div>

        <div class="text-start cover-letter-wrap">
         <h5>Cover letter</h5>
         <p class="mb-0">I hope this letter finds you in good health and high spirits. I am writing to you as a passionate event organizer 
          who has been captivated by your exceptional talent and musical prowess. It is with great excitement that I present 
          to you a proposal for an upcoming event, [Event Name], where we would be honored to have you as the headline artist.</p>
        </div>

        <div class="text-start music-sample-wrap">
         <h5>Music Sample</h5>
         
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
    acceptRequest() {
      // this.$emit('close-modal')
      this.$emit('accept-request');
      // this.hideModal();
    }
  },
};
</script>

<style>/* Styles for your modal */</style>
