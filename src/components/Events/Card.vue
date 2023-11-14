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

      <div class="seeking-for" v-if="(userRole === 'artists' || userRole === 'organizer') && event.look_types.length > 0" >
        <h6 class="title">Seeking for</h6>
        <span class="badge type-artist" v-for="(look, index) in event.look_types" :key="index">{{ look }}</span>
      </div>

      <!-- set the opacity to 0 on this div when the created event has no Seeking for -->
      <div class="seeking-for" v-if="(userRole === 'artists' || userRole === 'organizer') && event.look_types.length === 0" >
        <h6 class="title" style="opacity: 0;">Seeking for</h6>
        <span class="badge type-artist" style="opacity: 0;">acoustic band</span>
      </div>
      <div class="seeking-for" v-if="event?.artist">
        <h6 class="title" style="" >Performer</h6>
        <!-- <p v-for="(artist, index) in event?.artist" :key="index" class="badge type-artist artist-popover">
          <span :id="`event-${event.id}`"  data-bs-toggle="popover" data-bs-placement="right" 
              data-bs-html="true" 
              @mouseover="show(artist, index)"
              data-bs-trigger="hover"
              :data-bs-footer="`123`"
              :data-bs-content='`
                <div class="card card-popover mb-3 border-0" >
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${artist.avatar}" class="img-fluid rounded-circle" alt="artist avatar">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${artist.name}</h5>
                        <p class="card-text">${artist.artist_type}</p>
                      </div> 
                    </div>
                  </div>
                  <a class="btn view-profile bg-orange">View Profile</a>
                </div>
              `'
    
            >{{ artist?.name }}</span>
        </p> -->


        <p v-for="(artist, index) in event?.artist" :key="index" class="badge type-artist artist-popover">
          <span :id="`event-${event.id}`"  data-bs-toggle="popover" data-bs-placement="right" 
              data-bs-html="true" 
              @mouseover="show(artist, index)"
              data-bs-trigger="hover"
              :data-bs-footer="`123`"
              :data-bs-content='`
                <div class="border-0" id="card-performer">
                    <div class="img-wrap">
                      <img src="/assets/artist-account/default-cover-photo.webp" class="cover" alt="artist cover image">

                      <div class="profile-wrap">
                        <img src="${artist.avatar}" class="img-fluid rounded-circle profile" alt="artist avatar">
                      </div>  

                     </div> 

                     <div class="d-flex align-items-start justify-content-between details-wrap">

                        <div>
                          <h4>${artist.name}</h4>
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
                            <a class="btn view-profile bg-orange">View Profile</a>
                          </div> 

                       </div> 
                </div>
              `'
    
            >{{ artist?.name }}</span>
        </p>


      </div>
      <div v-if="isLoggedIn">
        <button class="btn btn-primary view-details" @click="toggle(pos)">View Details</button>
      </div>

      <div v-else>
        <button class="btn btn-primary view-details" @click="toggle">View Details</button>
      </div>
      <button class="btn btn-primary send-proposal" @click="sendProposal" v-if="userRole === 'artists' && !event?.is_visible" :disabled="canSendProposal">Send Proposal</button>
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
  },
  computed: {
    ...mapGetters(["isLoggedIn", 'userRole']),
    ...mapState({
      account: state => state.account,
      members: (state) => state.artist.members,
    }),
    canSendProposal() {
      if (!this.event.accept_proposal) return true;
      if(this.event?.can_send) return false;
      return true; 
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
    }
  }
}
</script>

<style scoped>
</style>

