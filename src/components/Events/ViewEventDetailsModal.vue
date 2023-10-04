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
              <h3 class="title">Sneaker Con Bay Area</h3>
              <p class="d-flex align-items-center posted">Public Event
                <span class="material-symbols-rounded dot">&#xe061;</span>
                 Posted 3 hours ago</p>
            </div>

            <a href="/proposal" v-if="userRole === 'artists'" class="send">Send Proposal</a>

          </div>

          <div class="event-background-img-wrap">
            <img src="/assets/organizer-account/post-img.webp" class="event-background-img" alt="Event image">
          </div>

          <div class="event-details-wrapper">
            <h5 class="event-details">Event details</h5>

            <div class="d-flex align-items-center justify-content-between">

              <div class="d-flex">
              <span class="material-symbols-rounded">&#xe935;</span>
              <div>
                <h6>March 25, 2023</h6>
                <p>Saturday, 8:00 am - 12:00 pm</p>
              </div>
            </div>

            <div class="d-flex">
              <span class="material-symbols-rounded">&#xe0c8;</span>
              <div>
                <h6>Momotz Restobar</h6>
                <p>Naga City, Camarines Sur Philippines</p>
              </div>
            </div>
            </div>

          </div>

          <div class="about-event-wrap">
            <h5 class="about">About the Event</h5>
            <p class="description">Lorem ipsum dolor sit amet consectetur. Blandit gravida neque hac malesuada sit arcu sed hendrerit posuere. 
              Et tempus ut enim tortor congue augue mauris. Leo semper quam venenatis nisi.</p>
          </div>

          <div class="looking-for-wrap">
              <h5 class="looking-for">Looking for</h5>
              <span class="badge type-artist">Artist</span>
              <span class="badge type-artist">Full Band Artist</span>
              <span class="badge type-artist">Solo Band Artist</span>
              <span class="badge type-artist">Artist</span>
              <span class="badge type-artist">Full Band Artist</span>
              <span class="badge type-artist">Solo Band Artist</span>
              <span class="badge type-artist">Artist</span>
              <span class="badge type-artist">Full Band Artist</span>
              <span class="badge type-artist">Solo Band Artist</span>
          </div>

          <div class="requirements-wrap">
            <h5 class="requirements">Requirements</h5>
            <p class="description">Lorem ipsum dolor sit amet consectetur. Blandit gravida neque hac malesuada sit arcu sed hendrerit posuere.</p>
            <ol>
              <li>Lorem ipsum dolor sit amet consectetur. </li>
              <li>Lorem ipsum dolor sit amet consectetur. </li>
              <li>Lorem ipsum dolor sit amet consectetur. </li>
            </ol>
          </div>

          <div class="organizer-details-wrapper">
            <h5 class="organizer-details">Organized by</h5>

            <div class="d-flex align-items-center justify-content-between">

              <div class="d-flex align-items-center">
                <img src="/assets/organizer-account/profile-img.webp" class="organizer-img" alt="Organizer profile image">
                <div>
                  <h5 class="organizer-name">Corona Event Organizer</h5>
                  <p class="company">Idlepitch</p>
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
  },
  mounted()
  {
  
  },
  methods: {
	},

}
</script>

<style scoped>

</style>