<template>
  <div class="card">
    <div class="bg-wrapper">
      <img :src="event?.cover_photo" class="img-fluid card-bg" loading="lazy" alt="Event image">
      <div class="d-flex align-items-start organized-by">
        <img :src="event?.organizer_avatar" class="float-start" alt="Organized by logo">
        <div class="organizer-wrap">
          <h5>{{ event?.organizer_name }}</h5>
          <p class="mb-0">Organized by</p>
        </div>
      </div>
    </div> <!-- end of bg-wrapper -->

    <div class="card-body" >
      <div class="event-title-wrap">
        <h5 class="card-title">{{ event?.event_name }} </h5>
        <p class="mb-0 card-text">{{ event?.description }}</p>
      </div>

      <div class="place-time-wrap">
        <div class="location">
          <span class="material-symbols-outlined">&#xe0c8;</span>
          <p>{{ event?.location }}</p>
        </div>

        <div class="date">
          <span class="material-symbols-outlined">&#xebcc;</span>
          <p>{{ $moment(`${event?.start_date}`).format('MMMM Do, YYYY') }} - {{ $moment(`${event?.end_date}`).format('MMMM Do, YYYY') }}</p>
        </div>

        <div class="time">
          <span class="material-symbols-outlined">&#xe8b5;</span>
          <p>{{ $moment(`${$moment().format('YYYY-MM-DD')} ${event?.start_time}`).format('h:mm a') }} - {{ $moment(`${$moment().format('YYYY-MM-DD')} ${event?.end_time}`).format('h:mm a') }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="seeking-for" v-if="(userRole === 'artists' || userRole === 'organizer') && event.look_types.length > 0" >
            <h6 class="title">Seeking for</h6>
            <span class="badge type-artist text-capitalize" v-for="(look, index) in event.look_types.slice(0,1)" :key="index">{{ look.length > 10 ? look.substring(0,11) : look }}{{ (look.length >= 11) ? '...': ''}}</span>
            <span class="badge type-artist bg-transparent" v-if="event.look_types.length > 1">...</span>
          </div>

          <!-- set the opacity to 0 on this div when the created event has no Seeking for -->
          <div class="seeking-for" v-if="(userRole === 'artists' || userRole === 'organizer') && event.look_types.length === 0" >
            <h6 class="title" style="opacity: 0;">Seeking for</h6>
            <span class="badge type-artist text-capitalize" style="opacity: 0;">{{ 'acoustic band'.substring(0,11)}}...</span>
          </div>
        </div>

        <div class="col">
          <div class="seeking-for" v-if="event?.artist">
            <h6 class="title" style="" >Performer</h6>
            <p v-for="(artist, index) in event?.artist.slice(0,1)" :key="index" class="badge type-artist artist-popover text-capitalize">
              <span :id="`event-${event.id}`"  data-bs-toggle="popover" data-bs-placement="right"
                data-bs-html="true" @mouseover="show(artist, index)" data-bs-trigger="hover"
                :data-bs-footer="`123`" :data-bs-content='`
              <div class="border-0" id="card-performer">
                <div class="img-wrap">
                  <img src="/assets/artist-account/default-cover-photo.webp" class="cover" alt="artist cover image">
                  <div class="profile-wrap">
                    <img src="${artist.avatar}" class="img-fluid rounded-circle profile" alt="artist avatar">
                  </div>
                </div> 

                <div class="d-flex align-items-start justify-content-between details-wrap">
                  <div>
                    <h4 class="text-capitalize">${artist.name}</h4>
                    <h5 class="mb-0">${artist.artist_type}</h5>
                  </div>

                  <div>
                    <button class="btn border-0 follow">Follow</button>
                  </div>
                </div>

                <div class="about-wrap">
                  <p class="bio two-lines">I am an indie-country/pop artists who describes her style as a "dreamy storytelling."</p>
                  <div class="follow-wrap">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <h5>238</h5>
                        <h6>Following</h6>
                      </div>

                      <div class="d-flex align-items-center">
                        <h5>84</h5>
                        <h6>Followers</h6>
                      </div>
                    </div>
                  </div>

                  <div class="others-wrap">
                    <div class="d-flex align-items-center">
                      <img src="/assets/events/link.svg" class="img-fluid rounded-circle profile" alt="artist avatar">
                      <a href="https://open.spotify.com/" target="_blank">spotify.com</a>
                    </div>

                    <div class="d-flex align-items-center">
                      <img src="/assets/events/location.svg" class="img-fluid rounded-circle profile" alt="artist avatar">
                      <h6 class="text-truncate location">Naga city, Camarines Sur</h6>
                    </div>
                  </div> 

                  <div class="btn-wrap">
                    <a href="/artists/${artist?.id}" class="btn view-profile bg-orange">View Profile</a>
                  </div>
                </div> 
              </div>`'
              >{{ artist?.name.length > 10 ? artist?.name?.substring(0,11) : artist?.name }}{{ (artist?.name.length >= 11) ? '...' : ''}}</span>
            </p>
            <p v-if="event?.artist.length > 1" class="badge type-artist artist-popover bg-transparent">...</p>
          </div>
        </div>
      </div>

      <div v-if="isLoggedIn">
        <button class="btn btn-primary view-details" @click="toggle(pos)">View Details</button>
      </div>

      <div v-else>
        <button class="btn btn-primary view-details" @click="toggle">View Details</button>
      </div>

      <button class="btn btn-primary send-proposal" @click="sendProposal" v-if="userRole === 'artists' && !event?.is_visible && group != 'past'" :disabled="!canSendProposal">Send Proposal</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import ViewDetail from '/src/components/Events/ViewEventDetailsModal.vue';
import MustSignupModal from '/src/components/Artist/MustSignupModal.vue';
import { Popover } from 'bootstrap';
import jQuery from 'jquery';

export default {
  setup()
  {
    return {
      linkIcon: '/assets/events/link.svg',
    }
  },
  components: {
    ViewDetail,
    signupmodal: MustSignupModal,
  },
  props: {
    pos: {
      type: Number,
      default: -1,
      required: true
    },

    event: {
      type: Object,
      default: {},
      required: true
    },
    group: {
      type: String,
      default: 'ongoing',
      required: true,
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", 'userRole']),
    ...mapState({
      account: state => state.account,
      members: (state) => state.artist.members,
      artist: state => state.artist.artist,
    }),
    canSendProposal() {
      console.log(`Can Send Proposal for ${this.event.id}: `, this.event.accept_proposal);
      if (this.event.can_send) {
        
        return this.event.accept_proposal;
      } else {
        return false;
      }
      return this.event.can_send
    }
  },
  data: () => ({
    myPopover: null,
    selectedArtist: {},
  }),
  mounted()
  {
    // this.myPopover = Popover.getOrCreateInstance(`#event-${this.event?.id}`);
    // Popover.getOrCreateInstance(`#event-${this.event?.id}`)
    console.log('Event ID: ', `#event-${this.event?.id}`)
    const self = this;
    try {
      new Popover(`#event-${this.event?.id}`, {
        container: 'body',
        trigger: 'hover',
        placement: 'right',
        delay: {
          show: 0, hide: 5000,
        },
        template: `
        <div class="popover" role="tooltip">
          <div class="popover-arrow"></div>
          <div class="popover-inner">
            <div class="popover-body border-0 p-0"></div>
          </div>
        </div>`,
        sanitize: false
      });

    } catch (err) {

    }

    console.log('Card: ', this.event);
    // Array.from(document.querySelectorAll('span[data-bs-toggle="popover"]'))
    // .forEach(popoverNode => new Popover(popoverNode))
  },
  methods: {
    toggle(pos = -1)
    {
      if (pos > -1) {
        this.$store.commit('SET_EVENT', this.event);
      } else {
        this.$store.commit('SET_EVENT', {});
      }

      this.$emit('show', pos);

    },
    show(artist, index) {
      console.log('Mouse Over: ', artist, index)
      // const popUp = Popover.getOrCreateInstance(`#event-${this.event?.id}`);

      //   popUp.setContent({
      //     '.popover-body': 'another content'
      //   });

      // new Popover(`#artist${artist.artist_id}`, {
      //   container: 'body',
      //   delay: {
      //     show: 0, hide: 1500,
      //   },
      //   trigger: 'hover',
      // });
      // console.log('Show Artist ', artist)
        this.selectedArtist = artist;
    },
    sendProposal()
    {
      
      this.$store.commit('SET_EVENT', this.event);
      this.$store.commit('SET_PROPOSAL', {
        event_id: this.event.id || '',
        artist_id: this.account.id || '',
        artist_name: this.account.artist_name || '',
        genres: this.account.genres || [],
        total_member: this.members.length || 0,
        cover_letter: '',
        sample_song: '',
      })

      this.$router.push(`/proposal/${this.event.id}/apply`)
    },
  }
}
</script>

<style scoped>
</style>

