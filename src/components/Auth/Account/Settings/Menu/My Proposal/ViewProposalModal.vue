<template>
  <div class="request-song-modal" v-if="show">
    <div class="modal-content">
      <div class="d-flex justify-content-between title-wrapper">
        <div>
          <h3 class="title">Proposal Details</h3>
          <p class="sub-title">Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        <div>
          <button @click="$emit('close-modal')" ref="proposalClose" class="close-button">
            <span class="material-symbols-rounded">&#xe5cd;</span>
          </button>
        </div>
      </div> <!-- end of title-wrapper -->

      <div class="text-center modal-body request-application-wrap">
        <div class="d-flex align-items-center justify-content-between action-wrapper">

          <div class="d-flex align-items-center organizer-offers-details-wrap">
            <img src="/assets/artist-account/band-member-2.webp" class="customer-image" alt="Organizer image">
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
        <div class="d-flex align-items-center applied-event-wrap" v-else>
          <div>
            <img :src="proposal?.cover_photo" class="event-img" alt="Event cover image">
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
                <h5 class="date">{{ $moment(`${proposal?.start_date}`).format('MMMM DD, YYYY') }} - {{ $moment(`${proposal?.end_date}`).format('MMMM DD, YYYY') }}</h5>
                <h5 class="time" v-if="$moment(proposal?.start_date).isSame(proposal?.end_date)">
                  {{ $moment(`${proposal?.start_date}`).format('dddd') }}, {{ $moment(proposal?.start_time).format('h:mm a') }} - {{ $moment(proposal?.end_time).format('h:mm a') }} 
                </h5>
                <h5 class="time" v-else>{{ $moment(`${proposal?.start_date}`).format('dddd') }}, {{ $moment(proposal?.start_time).format('h:mm a') }} - {{ $moment(`${proposal?.end_date}`).format('dddd') }}, {{ $moment(proposal?.end_time).format('h:mm a') }}</h5>
              </div>
            </div>

            <div class="d-flex align-items-start event-venue-wrap">
              <div>
                <span class="material-symbols-sharp location-icon">&#xe0c8;</span>
              </div>

              <div>
                <h5 class="venue">{{ proposal?.venue_name }}</h5>
                <h5 class="place" style="text-transform: capitalize;">{{ proposal?.location }}</h5>
              </div>
            </div>
          </div>          
        </div>
        
        <div class="d-flex justify-content-between action-wrapper song-info-wrapper" v-if="!['pending', 'accepted', 'declined',].includes(option)">
          <div class="left">
            <h5>Name of Event</h5>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>

          <div class="right">
            <h5>Type  of Event</h5>
            <p>Birthday Event</p>
          </div>
        </div>
        <div class="" v-else>
<h4 class="text-start artist-details">Artist Details</h4>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
          <div class="left">
            <h5>Name of the band</h5>
            <p>{{ proposal.artist_name }}</p>
          </div>

          <div class="right">
            <h5 class="text-center">Number of members</h5>
            <p class="text-center">{{ proposal.total_member }}</p>
          </div>
        </div>

        <div class="text-start genre-wrap">
          <h5>Genre:</h5>
          <span class="badge" v-for="(genre, index) in proposal?.genres" :key="index">{{ genre }}</span>
        </div>

        <div class="text-start cover-letter-wrap my-5">
         <h5>Cover letter</h5>
         <p class="mb-0 text-justify">{{ proposal?.cover_letter }}</p>
        </div>

        <div class="text-start music-sample-wrap" v-if="proposal?.sample_song">
         <h5>Music Sample</h5>

         <div class="d-flex align-items-center justify-content-between artist-music-details">

          <div class="d-flex align-items-center song-wrap">
            <img src="/assets/artist-account/song-cover1.webp" alt="Proposal form of song cover image">

            <div>
              <h5 class="song-name">Lupang Hinirang.mp3</h5>
              <h6>Idlepitch</h6>
              <span class="badge">3:12</span>
            </div>
          </div>

          <div>
            <button class="btn d-flex align-items-center p-0 play-wrap">
              <span class="material-symbols-sharp play-icon">&#xe037;</span>
              Play
            </button>
          </div>

         </div>
         
        </div> <!-- end of music-sample-wrap -->          
        </div><!-- 2-->
        <div class="d-flex justify-content-between action-wrapper song-info-wrapper" v-if="!['pending', 'accepted', 'declined',].includes(option)">
          <div class="left">
            <h5>Location of Event</h5>
            <p>Naga City, Camarines Sur</p>
          </div>

          <div class="right">
            <h5>Talent fee offered</h5>
            <p>2,000 - 3,000</p>
          </div>
        </div>

        <div class="d-flex justify-content-between action-wrapper song-info-wrapper" v-if="!['pending', 'accepted', 'declined',].includes(option)">
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
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    show: Boolean,
    option: String,
  },
  data() {
    return {
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
    cancel() {
      this.cancelMyProposal(this.proposal.id)
        .then(res => {
          this.$emit('close-modal');
          // this.$refs.proposalClose.click()
        })
        
      
    },
    acceptRequest(){
      // this.$emit('close-modal')
      this.$emit('accept-request');
      // this.hideModal();
    }
  },
};
</script>

<style scoped>
.btn-denied {
  background: var(--warning-light);
  color: var(--warning);
}
/* Styles for your modal */
</style>
