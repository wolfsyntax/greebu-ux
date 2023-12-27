<template>
  <div class="card">
    <div class="bg-wrapper">
      <img
        :src="event?.cover_photo"
        class="img-fluid card-bg"
        loading="lazy"
        alt="Event image"
      />
      <div class="d-flex align-items-start organized-by">
        <img
          :src="event?.organizer_avatar"
          class="float-start"
          alt="Organized by logo"
        />
        <div class="organizer-wrap">
          <h5>{{ event?.organizer_name }}</h5>
          <p class="mb-0">Organized by</p>
        </div>
      </div>
    </div>
    <!-- end of bg-wrapper -->

    <div class="card-body">
      <div class="event-title-wrap">
        <h5 class="card-title">{{ event?.event_name }}</h5>
        <p class="mb-0 card-text">{{ event?.description }}</p>
      </div>

      <div class="place-time-wrap">
        <div class="location">
          <span class="material-symbols-outlined">&#xe0c8;</span>
          <p>{{ event?.location }}</p>
        </div>

        <div class="date">
          <span class="material-symbols-outlined">&#xebcc;</span>
          <p>
            {{ $moment(`${event?.start_date}`).format("MMMM Do, YYYY") }} -
            {{ $moment(`${event?.end_date}`).format("MMMM Do, YYYY") }}
          </p>
        </div>

        <div class="time">
          <span class="material-symbols-outlined">&#xe8b5;</span>
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

      <div class="row">
        <div class="col">
          <div
            class="seeking-for"
            v-if="
              (userRole === 'artists' || userRole === 'organizer') &&
              event.look_types.length > 0
            "
          >
            <h6 class="title">Seeking for</h6>
            <span
              class="badge type-artist text-capitalize"
              v-for="(look, index) in event.look_types.slice(0, 1)"
              :key="index"
              >{{ look.length > 10 ? look.substring(0, 11) : look
              }}{{ look.length > 11 ? "..." : "" }}</span
            >
            <span
              class="badge type-artist bg-transparent"
              v-if="event.look_types.length > 1"
              >...</span
            >
          </div>
          <!-- set the opacity to 0 on this div when the created event has no Seeking for -->
          <div
            class="seeking-for"
            v-if="
              (userRole === 'artists' || userRole === 'organizer') &&
              event.look_types.length === 0
            "
          >
            <h6 class="title" style="opacity: 0">Seeking for</h6>
            <span class="badge type-artist text-capitalize" style="opacity: 0"
              >{{ "acoustic band".substring(0, 11) }}...</span
            >
          </div>
        </div>

        <div class="col">
          <div class="seeking-for" v-if="event?.artist">
            <h6 class="title" style="">Performer</h6>

            <div
              v-for="(artist, index) in event?.artist.slice(0, 1)"
              :key="index"
            >
              <div
                class="artist-container"
                @mouseover="showArtistInfo(artist)"
                @mouseleave="hideArtistInfo"
              >
                <span class="badge type-artist text-capitalize">
                  {{
                    artist?.name.length > 10
                      ? artist?.name?.substring(0, 11)
                      : artist?.name
                  }}{{ artist?.name.length > 11 ? "..." : "" }}
                </span>
                <!-- <div>
                  <pre> {{ artist }} </pre>
                </div> -->

                <artist-info
                  v-if="isArtistInfoVisible"
                  :artist="currentArtist"
                ></artist-info>
              </div>
            </div>

            <p
              v-if="event?.artist.length > 1"
              class="badge type-artist artist-popover bg-transparent"
            >
              ...
            </p>
          </div>
        </div>
      </div>

      <div v-if="isLoggedIn">
        <button class="btn btn-primary view-details" @click="toggle(pos)">
          View Details
        </button>
      </div>

      <div v-else>
        <button class="btn btn-primary view-details" @click="toggle">
          View Details
        </button>
      </div>

      <button
        class="btn btn-primary send-proposal"
        @click="sendProposal"
        v-if="userRole === 'artists' && !event?.is_visible && group != 'past'"
        :disabled="!canSendProposal"
      >
        Send Proposal
      </button>
    </div>
  </div>
  <div>
    <!-- <pre>{{ userInfo }}</pre> -->
    <!-- <pre>{{ artist }}</pre> -->
    <!-- <pre>{{ account }}</pre> -->
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
// eslint-disable-next-line import/no-absolute-path
import ArtistPopOver from '/src/components/Events/ArtistPopOver.vue'

export default {
  setup () {
    return {
      linkIcon: '/assets/events/link.svg'
    }
  },
  components: {
    'artist-info': ArtistPopOver
  },
  props: {
    pos: {
      type: Number,
      default: -1,
      required: true
    },

    event: {
      type: Object,
      default: Function, // {}
      required: true
    },
    group: {
      type: String,
      default: 'ongoing',
      required: true
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userRole', 'userInfo']),
    ...mapState({
      account: (state) => state.account,
      members: (state) => state.artist.members,
      artist: (state) => state.artist.artist
    }),
    canSendProposal () {
      console.log(
        `Can Send Proposal for ${this.event.id}: `,
        this.event.accept_proposal
      )
      if (this.event.can_send) {
        return this.event.accept_proposal
      } else {
        return false
      }
      return this.event.can_send;
    }
  },
  data: () => ({
    isArtistInfoVisible: false,
    currentArtist: null
  }),
  mounted () {
    console.log('Card: ', this.event)
    console.log('Artist', this.artist)
  },
  methods: {
    toggle (pos = -1) {
      this.$store.commit('setEventView', this.group || 'ongoing')

      if (pos > -1) {
        this.$store.commit('SET_EVENT', this.event)
      } else {
        this.$store.commit('SET_EVENT', {})
      }

      this.$emit('show', pos)
    },
    showArtistInfo (artist) {
      this.isArtistInfoVisible = true
      this.currentArtist = artist
    },
    hideArtistInfo () {
      setTimeout(() => {
        this.isArtistInfoVisible = false
      }, 1000)
      this.currentArtist = null
    },
    sendProposal () {
      this.$store.commit('SET_EVENT', this.event)
      this.$store.commit('SET_PROPOSAL', {
        event_id: this.event.id || '',
        artist_id: this.account.id || '',
        artist_name: this.account.artist_name || '',
        genres: this.account.genres || [],
        total_member: this.members.length || 0,
        cover_letter: '',
        sample_song: ''
      })

      this.$router.push(`/proposal/${this.event.id}/apply`)
    }
  }
}
</script>

<style scoped>
.artist-container {
  position: relative;
  cursor: pointer;
}
</style>
