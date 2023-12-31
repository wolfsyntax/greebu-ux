<template>
  <div
    class="modal fade come-from-modal right"
    id="eventDetailsModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center justify-content-end">
          <!-- <button class="d-flex align-items-center btn new-tab">
            <span class="material-symbols-rounded new-tab-icon">&#xe89e;</span>
            Open event in a new window
          </button> -->

          <button
            class="btn close-modal-btn"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span class="material-symbols-rounded close-icon">&#xe5cd;</span>
          </button>
        </div>
        <div class="modal-body">
          <div
            class="d-flex align-items-start justify-content-between event-title-wrap"
          >
            <div>
              <h3 class="title text-capitalize">{{ event.event_name }}</h3>
              <p class="d-flex align-items-center posted">
                {{ event.is_public ? "Public" : "Private" }} Event
                <span class="material-symbols-rounded dot">&#xe061;</span>
                Posted
                {{
                  $filters.diffForHumans(
                    $moment(event?.created_at).format("YYYY-MM-DD hh:mm:ss a")
                  )
                }}
              </p>
            </div>
            <div>
              <a
                :href="`/proposal/${event.id}/apply`"
                v-if="
                  userRole === 'artists' && usage === 'view' && view !== 'past'
                "
                class="send"
                :disabled="!event.accept_proposal"
                >Send Proposal</a
              >
            </div>
          </div>

          <div class="event-background-img-wrap">
            <img
              :src="
                event.cover_photo || '/assets/organizer-account/post-img.webp'
              "
              class="event-background-img"
              alt="Event image"
            />
          </div>

          <div class="event-details-wrapper">
            <h5 class="event-details">Event details</h5>

            <div
              class="d-flex align-items-start justify-content-between date-venue-wrap"
            >
              <div class="d-flex w-50">
                <span class="material-symbols-rounded">&#xe935;</span>
                <div>
                  <h6>
                    {{
                      $moment(`${event?.start_date}`).format("MMMM D, YYYY")
                    }}
                    - {{ $moment(`${event?.end_date}`).format("MMMM D, YYYY") }}
                  </h6>
                  <p>
                    {{
                      $moment(
                        `${$moment().format("YYYY-MM-DD")} ${event?.start_time}`
                      ).format("h:mm a")
                    }}
                    -
                    {{
                      $moment(
                        `${$moment().format("YYYY-MM-DD")} ${event?.end_time}`
                      ).format("h:mm a")
                    }}
                  </p>
                </div>
              </div>

              <div class="d-flex w-50">
                <span class="material-symbols-rounded">&#xe0c8;</span>
                <div>
                  <h6 class="text-capitalize">{{ event.venue_name }}</h6>
                  <p class="text-capitalize">
                    {{ event?.location || event.city || "" }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="about-event-wrap">
            <h5 class="about">About the Event</h5>
            <p class="description">{{ event?.description }}</p>
          </div>

          <div class="looking-for-wrap">
            <h5 class="looking-for">Looking for</h5>
            <span class="badge type-artist text-capitalize">{{
              event.look_for
            }}</span>
            <span
              class="badge type-artist text-capitalize"
              v-for="(e, index) in event.look_types"
              :key="index"
              >{{ e }}</span
            >
          </div>

          <div class="looking-for-wrap" v-if="event?.artist">
            <h5 class="looking-for">Performer</h5>
            <div
              v-for="(artist, index) in event?.artist.slice(0, 1)"
              :key="index"
            >
              <!-- <div>
              <pre>{{ artist }}</pre>
            </div> -->
              <div
                class="artist-container"
                @mouseover="showArtistInfo(artist)"
                @mouseleave="hideArtistInfo"
              >
                <span class="badge type-artist text-capitalize">
                  {{ artist?.name }}
                </span>
                <artist-info
                  v-if="isArtistInfoVisible"
                  :artist="currentArtist"
                ></artist-info>
              </div>
            </div>
          </div>

          <div class="requirements-wrap">
            <h5 class="requirements">Requirements</h5>
            <p class="description">{{ event?.requirement || "N/A" }}</p>
          </div>

          <div class="organizer-details-wrapper">
            <h5 class="organizer-details">Organized by</h5>

            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <img
                  :src="
                    event?.organizer_avatar ||
                    '/assets/organizer-account/profile-img.webp'
                  "
                  class="organizer-img"
                  alt="Organizer profile image"
                />
                <div>
                  <h5 class="organizer-name text-capitalize">
                    {{ event?.organizer_name }}
                  </h5>
                  <p class="company text-capitalize">
                    {{ event?.organizer_company || "N/A" }}
                  </p>
                </div>
              </div>

              <a
                :href="`/events/${event?.organizer_id}`"
                class="view-profile"
                @click="fetchProfile()"
                >View Profile</a
              >
            </div>
          </div>
          <!-- <p><b>Organizer</b> - {{ account }}</p>
          <p><b>Event</b> - {{ event }}</p> -->
        </div>
        <!-- end of modal-body -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ArtistPopOver from '/src/components/Events/ArtistPopOver.vue'

export default {
  components: {
    'artist-info': ArtistPopOver
  },
  setup () {
    return {}
  },
  data: () => ({
    isArtistInfoVisible: false,
    currentArtist: null
  }),
  props: {
    usage: {
      type: String,
      default: 'view',
      required: false
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userInfo', 'info', 'userRole']),
    ...mapState({
      event: (state) => state.events.event,
      view: (state) => state.events.viewType,
      users: (state) => state.user,
      profile: (state) => state.profile
      // account: state => state.account,
    })
  },
  created () {
    // this.setArtistProfile();
  },

  mounted () {
    console.log('Selected Event: ', this.event)
  },
  methods: {
    ...mapActions(['fetchEventOrganizer']),
    fetchProfile () {
      // this.setArtistProfile(this.account);
      this.fetchEventOrganizer(this.$route.params?.id).then((res) => {
        const {
          status: statusCode,
          data: { status }
        } = res
        if (statusCode === 203) {
          if (status === 404) this.$router.push({ name: 'page-error-404' })
          else this.$router.push({ name: 'page-error-500' })
        }
      })
    },
    showArtistInfo (artist) {
      this.isArtistInfoVisible = true
      this.currentArtist = artist
    },
    hideArtistInfo () {
      setTimeout(() => {
        this.isArtistInfoVisible = false
      }, 5000)
      this.currentArtist = null
    }
  }
}
</script>

<style scoped>
.artist-container {
  position: relative;
  width: 50%;
}
.artist-container .type-artist {
  cursor: pointer;
}
</style>
