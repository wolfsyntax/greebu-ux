<template>
  <div class="request-song-modal" v-if="show">
    <div class="modal-content">
      <div class="d-flex justify-content-between title-wrapper">
        <div>
          <h3 class="title">Requested Song</h3>
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
            <img :src="`${song?.creator?.avatar || '/assets/artist-account/band-member-2.webp'}`" class="customer-image" alt="Requester image">
            <div>
              <h5 class="name">{{ song.creator?.name }}</h5>
              <!-- For Submission tab - View Details modal -->
              <!-- <h5 class="name"><span class="req">Requested by: </span>Alvin Makahiya</h5> -->

              <p class="username">{{ song.creator?.email }}</p>
            </div>
          </div>

          <div class="d-flex align-items-center">

            <button class="btn decline">Decline</button>
            <button class="btn accept" @click="acceptRequest">Acccept</button>

            <!-- SHOW THIS IF THE ARTIST ACCEPTED THE CUSTOMIZED SONG REQUEST  -->
            <!-- <button class="btn accepted">Decline</button> -->

            <!-- SHOW THIS IF THE ARTIST DENIED THE CUSTOMIZED SONG REQUEST  -->
            <!-- <button class="btn cancelled">Request Denied</button> -->

            <!-- For Submission tab - View Details modal -->
            <!-- <button class="btn d-flex align-items-center approval">
              <span class="material-symbols-rounded">&#xe8b5;</span>
              Pending
            </button> -->

          </div>
        </div> <!-- end of action-wrapper -->

        <div class="d-flex align-items-center note-wrapper">
          <span class="material-symbols-rounded info-icon">&#xe88e;</span>
          <p class="note">Clients will only pay if the requested customized song is accepted.</p>
        </div>

        <!-- <div class="d-flex align-items-center justify-content-between req-song-wrap">
          <div class="d-flex align-items-center text-start song-info-wrap">
            <div>
              <img src="/assets/organizers/organizers-banner-bg.webp" class="song-cover-img" alt="Song album cover"> 
            </div>
            <div>
              <h5 class="two-lines title">Your Song Title Your Song Title Your Song Title Your Song Title Your Song Title Your Song Title</h5>
              <h6>Genre: <span> Rock</span></h6>
              <h6 class="mb-0">Lenght: <span> 3 minutes</span></h6>
            </div>
            </div>

            <div class="action-wrap">
                <button type="button" class="btn d-flex align-items-center float-end for-revision-btn">
                  <span class="material-symbols-rounded">&#xe5d5;</span>
                  For Revision
                </button>

                 Completed tab - View Details modal 
                <button type="button" class="btn d-flex align-items-center float-end completed-btn">
                  <span class="material-symbols-rounded">&#xe876;</span>
                  Completed
                </button>
            </div>
        </div> -->

        <!-- <div class="d-flex align-items-center note-wrapper">
          <p class="note">Alvin Makahiya is requesting a song revision</p>
        </div> -->

        <div class="story-wrapper">
          <h4 class="title">Story Details</h4>
          <p class="message">{{ song.user_story }}</p>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>Where did the song come from?</h5>
            <p>{{ song.sender }}</p>
          </div>

          <div class="right">
            <h5>To whom is the song for?</h5>
            <p>{{ song.receiver }}</p>
          </div>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>What is the song for?</h5>
            <p>{{ song.purpose }}</p>
          </div>


          <div class="right">
            <h5>Type  of Song (Mood)</h5>
            <p>{{ song.mood }}</p>
          </div>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>Language</h5>
            <p>{{ song.language }}</p>
          </div>

          <div class="right">
            <h5>Duration of Song?</h5>
            <p>{{ song.duration }}</p>
          </div>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper" v-if="song.delivery_date">
          <div class="left">
            <h5>Delivery Date</h5>
            <p class="d-flex align-items-center"><span class="material-symbols-rounded date">&#xebcc;</span>{{ song.delivery_date }}</p>
          </div>

          <div class="right hidden-song-info">
            <h5>Delivery Date</h5>
            <p>June 12,2023</p>
          </div>
        </div>

        <div class="story-wrapper">
          <h4 class="title">Client Details</h4>
          <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
            <div class="left">
              <h5>Name</h5>
              <p>{{ song.fullname }}</p>
            </div>
          </div>
          <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
            <div class="left">
              <h5>Email Address</h5>
              <p>{{ song.email }}</p>
            </div>
          </div>
        </div>
      </div> <!-- end of modal-body -->
    </div>
  </div>
</template>

<script>

export default {
  props: {
    show: Boolean,
    song: Object
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
