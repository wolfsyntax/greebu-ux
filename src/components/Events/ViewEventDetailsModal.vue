<template>

<div class="modal fade come-from-modal right" id="eventDetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center justify-content-end">
          <!-- <button class="d-flex align-items-center btn new-tab">
            <span class="material-symbols-rounded new-tab-icon">&#xe89e;</span>
            Open event in a new window
          </button> -->

          <button class="btn close-modal-btn" data-bs-dismiss="modal" aria-label="Close">
            <span class="material-symbols-rounded close-icon">&#xe5cd;</span>
          </button>
           
        </div>
        <div class="modal-body">
          
          <div class="d-flex align-items-center justify-content-between event-title-wrap">

            <div>
              <h3 class="title">{{ event.event_name }}</h3>
              <p class="d-flex align-items-center posted">{{ event.is_public ? 'Public' : 'Private' }} Event
                <span class="material-symbols-rounded dot">&#xe061;</span>
                 Posted {{ $filters.diffForHumans($moment(event?.created_at).format('YYYY-MM-DD hh:mm:ss a')) }}</p>
            </div>
            
            <a href="/proposal" v-if="userRole === 'artists'" class="send" :disabled="!event.accept_proposal ">Send Proposal</a>

          </div>

          <div class="event-background-img-wrap">
            <img :src="event.cover_photo || '/assets/organizer-account/post-img.webp'" class="event-background-img" alt="Event image">
          </div>

          <div class="event-details-wrapper">
            <h5 class="event-details">Event details</h5>

            <div class="d-flex align-items-center justify-content-between">

              <div class="d-flex">
              <span class="material-symbols-rounded">&#xe935;</span>
              <div>
                <h6>{{ $moment(`${event?.start_date}`).format('MMMM Do, YYYY') }} - {{ $moment(`${event?.end_date}`).format('MMMM Do, YYYY') }}</h6>
                <p>{{ $moment(`${$moment().format('YYYY-MM-DD')} ${event?.start_time}`).format('h:mm a') }} - {{ $moment(`${$moment().format('YYYY-MM-DD')} ${event?.end_time}`).format('h:mm a') }}</p>
              </div>
            </div>

            <div class="d-flex">
              <span class="material-symbols-rounded">&#xe0c8;</span>
              <div>
                <h6>{{ event.venue_name }}</h6>
                <p>{{ event?.location || event.city || '' }}</p>
              </div>
            </div>
            </div>

          </div>

          <div class="about-event-wrap">
            <h5 class="about">About the Event</h5>
            <p class="description">{{ event?.description  }}</p>
          </div>

          <div class="looking-for-wrap">
              <h5 class="looking-for">Looking for</h5>
              <span class="badge type-artist" style="text-transform: capitalize;">{{ event.look_for }}</span>
              <span class="badge type-artist" style="text-transform: capitalize;" v-for="(e, index) in event.look_types" :key="index">{{ e }}</span>
             
          </div>

          <div class="requirements-wrap">
            <h5 class="requirements">Requirements</h5>
            <p class="description">{{ event?.requirement || 'N/A'}}</p>
            <!-- <ol>
              <li>Lorem ipsum dolor sit amet consectetur. </li>
              <li>Lorem ipsum dolor sit amet consectetur. </li>
              <li>Lorem ipsum dolor sit amet consectetur. </li>
            </ol> -->
          </div>

          <div class="organizer-details-wrapper">
            <h5 class="organizer-details">Organized by</h5>

            <div class="d-flex align-items-center justify-content-between">

              <div class="d-flex align-items-center">
                <img :src="event?.organizer_avatar || '/assets/organizer-account/profile-img.webp'" class="organizer-img" alt="Organizer profile image">
                <div>
                  <h5 class="organizer-name">{{ event?.organizer_name }}</h5>
                  <p class="company">{{ event?.company_name || 'N/A'}}</p>
                </div>
              </div>

              <a href="/dashboard" class="view-profile">View Profile</a>

            </div>

          </div>

        </div> <!-- end of modal-body -->
      </div>
    </div>
  </div>



</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
  },

  setup () {

    return {}
  },
  data: () => ({
   
  }),
  props: {
    
  },
  computed: {
    ...mapGetters(["isLoggedIn", 'userInfo', 'info', 'userRole']),
    ...mapState({
      event: state => state.events.event,
    })
  },
  mounted()
  {
    console.log('Selected Event: ', this.event)
  },
  methods: {
	},

}
</script>

<style scoped>

</style>