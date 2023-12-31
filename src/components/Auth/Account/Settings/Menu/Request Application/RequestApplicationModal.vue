<template>
  <div class="request-song-modal" v-if="show">
    <div class="modal-content">
      <div class="d-flex justify-content-between title-wrapper">
        <div>
          <h3 class="title">Request Application</h3>
        </div>

        <div>
          <button
            @click="$emit('close-modal')"
            class="close-button"
            ref="closeReqApp"
          >
            <span class="material-symbols-rounded">&#xe5cd;</span>
          </button>
        </div>
      </div>
      <!-- end of title-wrapper -->

      <div class="text-center modal-body">
        <div
          class="d-flex align-items-center justify-content-between action-wrapper"
        >
          <div class="d-flex align-items-center">
            <img
              :src="proposal?.artist_avatar"
              class="customer-image"
              alt="Requester image"
            />
            <div>
              <h5 class="name">{{ proposal.artist_name }}</h5>
              <p class="username">Artist</p>
            </div>
          </div>

          <div
            class="d-flex align-items-center"
            v-if="proposal?.status === 'pending'"
          >
            <button
              type="submit"
              class="btn decline"
              :disabled="proposal?.cancelled_at"
              @click="decline"
              v-if="showDeclineBtn"
            >
              Decline
            </button>
            <button type="button" class="btn disabled decline" v-else>
              <LoadingIndicatorOrange />
            </button>

            <button
              type="submit"
              class="btn accept"
              :disabled="proposal?.cancelled_at"
              @click="accept"
              v-if="showAcceptBtn"
            >
              Acccept
            </button>
            <button type="button" class="btn disabled accept" v-else>
              <LoadingIndicator />
            </button>
          </div>

          <div
            class="d-flex align-items-center"
            v-if="proposal?.status === 'accepted'"
          >
            <button class="btn accept">Message</button>
          </div>

          <div
            class="d-flex align-items-center"
            v-if="proposal?.status === 'declined'"
          >
            <button class="btn cancelled">Declined</button>
          </div>
        </div>
        <!-- end of action-wrapper -->

        <div
          class="d-flex align-items-center note-wrapper"
          v-if="proposal?.status === 'pending'"
        >
          <span class="material-symbols-rounded info-icon">&#xea08;</span>
          <p class="note">
            {{ proposal.artist_name }} has submitted an application request for
            your event
          </p>
        </div>

        <div class="d-flex align-items-start applied-event-wrap">
          <div class="w-50">
            <img
              :src="proposal?.cover_photo"
              class="event-img"
              alt="Event cover image"
            />
          </div>

          <div class="w-50 text-start event-details-wrap">
            <div class="event-title-wrap">
              <h3 class="event-title">{{ proposal.event_name }}</h3>
              <div class="d-flex align-items-center">
                <h5 class="mb-0">{{ proposal.is_public }} Posted</h5>
                <span class="material-symbols-rounded dot-icon">&#xe061;</span>
                <h5 class="mb-0">
                  {{
                    $filters.diffForHumans(
                      $moment(proposal?.created_at).format(
                        "YYYY-MM-DD hh:mm:ss a"
                      )
                    )
                  }}
                </h5>
              </div>
            </div>

            <div class="d-flex align-items-start event-start-end-wrap">
              <div>
                <span class="material-symbols-sharp calendar-icon"
                  >&#xe935;</span
                >
              </div>
              <div>
                <h5 class="date">
                  {{
                    $moment(`${proposal?.start_date}`).format("MMMM DD, YYYY")
                  }}
                  -
                  {{ $moment(`${proposal?.end_date}`).format("MMMM DD, YYYY") }}
                </h5>
                <h5
                  class="time"
                  v-if="
                    $moment(proposal?.start_date).isSame(proposal?.end_date)
                  "
                >
                  {{ $moment(`${proposal?.start_date}`).format("dddd") }},
                  {{ $moment(proposal?.start_time).format("h:mm a") }} -
                  {{ $moment(proposal?.end_time).format("h:mm a") }}
                </h5>
                <h5 class="time" v-else>
                  {{ $moment(`${proposal?.start_date}`).format("dddd") }},
                  {{ $moment(proposal?.start_time).format("h:mm a") }} -
                  {{ $moment(`${proposal?.end_date}`).format("dddd") }},
                  {{ $moment(proposal?.end_time).format("h:mm a") }}
                </h5>
              </div>
            </div>

            <div class="d-flex align-items-start event-venue-wrap">
              <div>
                <span class="material-symbols-sharp location-icon"
                  >&#xe0c8;</span
                >
              </div>
              <div>
                <h5 class="venue">{{ proposal?.venue_name }}</h5>
                <h5 class="place" style="text-transform: capitalize">
                  {{ proposal?.location }}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <!-- end of applied-event-wrap -->

        <h4 class="text-start artist-details">Artist Details</h4>

        <div
          class="d-flex justify-content-between action-wrapper song-info-wrapper"
        >
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
          <span
            class="badge"
            v-for="(genre, index) in proposal?.genres"
            :key="index"
            >{{ genre }}</span
          >
        </div>

        <div class="text-start cover-letter-wrap">
          <h5>Cover letter</h5>
          <p class="mb-0 text-justify">{{ proposal?.cover_letter }}</p>
        </div>

        <div class="text-start music-sample-wrap" v-if="proposal?.sample_song">
          <h5>Music Sample</h5>

          <div
            class="d-flex align-items-center justify-content-between artist-music-details"
          >
            <div class="d-flex align-items-center song-wrap">
              <img
                src="/assets/artist-account/song-cover1.webp"
                alt="Proposal form of song cover image"
              />

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
        </div>
        <!-- end of music-sample-wrap -->
      </div>
      <!-- end of modal-body -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadingIndicator from '/src/components/LoadingIndicator.vue'
import LoadingIndicatorOrange from '/src/components/LoadingIndicatorOrange.vue'

export default {
  props: {
    show: Boolean
  },
  components: {
    LoadingIndicator,
    LoadingIndicatorOrange
  },
  data () {
    return {
      showAcceptBtn: true,
      showDeclineBtn: true
    }
  },
  computed: {
    ...mapState({
      proposal: (state) => state.proposal
    })
  },
  methods: {
    ...mapActions(['acceptProposal', 'declineProposal']),
    accept () {
      this.showAcceptBtn = false
      this.acceptProposal(this.proposal?.id || '').then((res) => {
        console.log('Accepted Response: ', res)
        this.$refs.closeReqApp.click()
        // this.$emit('accept-req');
        this.showAcceptBtn = true
        this.$emit('accept-req')
      })
    },
    decline () {
      this.showDeclineBtn = false
      this.declineProposal(this.proposal?.id || '').then((res) => {
        console.log('Declined Response: ', res)
        this.$refs.closeReqApp.click()
        this.showDeclineBtn = true
      })
    },
    acceptRequest () {
      // this.$emit('close-modal')
      this.$emit('accept-request')
      // this.hideModal();
    }
  }
}
</script>

<style>
/* Styles for your modal */
</style>
