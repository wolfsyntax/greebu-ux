<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div id="ShowArtistLists">
      <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-3"
          v-for="(artist, itemIndex) in artists"
          :key="itemIndex"
        >
          <div class="card">
            <img
              :src="artist.avatar"
              class="card-img-top img-fluid"
              loading="lazy"
              alt="Trending Artist"
            />
            <div class="middle">
              <button
                class="btn btn-primary"
                @click="openModal(artist)"
                data-bs-toggle="modal"
                v-if="isLoggedIn"
                data-bs-target="#artistModal"
              >
                View Details
              </button>
              <button
                class="btn btn-primary"
                @click="openModal"
                data-bs-toggle="modal"
                v-else
                data-bs-target="#mustSignUp"
              >
                View Details
              </button>
            </div>
            <div class="card-body">
              <div>
                <div class="artist">
                  <h5 class="card-title">{{ artist.artist_name }}</h5>
                  <h6 class="card-text">{{ artist.artist_type }}</h6>
                  <h6 class="card-text no-artist" v-if="!artist.artist_type" style="opacity: 0;">no artist type</h6>
                  <p class="d-flex align-items-center artist-reviews-wrap">
                    <span class="material-symbols-sharp star-icon"
                      >&#xe838;</span
                    >
                    {{ artist.ratings }}
                    <span class="reviews">({{ artist.reviews }} reviews)</span>
                  </p>

                </div>
                <div class="audio-btn">
                  <div class="play-btn">
                    <button
                      type="button"
                      class="btn border-0"
                      @click="playArtistSong(itemIndex)"
                      v-if="showPlayButton(itemIndex)"
                    >
                      <span class="material-symbols-sharp">&#xe1c4;</span>
                    </button>
                    <button
                      type="button"
                      class="btn border-0"
                      @click="pauseArtistSong(itemIndex)"
                      v-else
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="equilizer"
                        viewBox="0 0 128 128"
                      >
                        <g>
                          <title>Audio Equilizer</title>
                          <rect
                            class="bar"
                            transform="translate(0,0)"
                            y="15"
                          ></rect>
                          <rect
                            class="bar"
                            transform="translate(25,0)"
                            y="15"
                          ></rect>
                          <rect
                            class="bar"
                            transform="translate(50,0)"
                            y="15"
                          ></rect>
                          <rect
                            class="bar"
                            transform="translate(75,0)"
                            y="15"
                          ></rect>
                          <rect
                            class="bar"
                            transform="translate(100,0)"
                            y="15"
                          ></rect>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="button-wrapper">
        <div v-if="showSeeMoreBtn">
          <button
            type="button"
            @click="$emit('paginate')"
            class="btn btn-primary see-more-btn"
          >
            SEE MORE ARTISTS
          </button>
        </div>
        <div v-else>
          <BirdLoader />
        </div>
      </div>
    </div>
  </div>
  <!-- end of container -->

  <div v-show="isAudioPlayerVisible" id="audioPlayerGroup">
    <div class="row">
      <div class="col">
        <div class="d-flex align-items-center artist-info-block">
          <div>
            <img
              :src="getCurrentArtistImage()"
              class="artist-avatar"
              alt="Artist Image"
              style="max-width: 100%; max-height: 200px"
            />
          </div>
          <div>
            <h5 class="mb-0 song-name">
              {{
                currentSongTitle ||
                (artists && artists.length > 0
                  ? getCurrentArtist().song_title
                  : "")
              }}
            </h5>
            <p class="mb-0 band-name">
              {{
                currentArtistType ||
                (artists && artists.length > 0
                  ? getCurrentArtist().artist_type
                  : "")
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div>
          <audio-player
            ref="audioPlayer"
            :audio-list="artists ? artists.map((elm) => elm.song) : []"
            :before-play="handleBeforePlay"
            @play="handlePlay"
            @pause="handlePause"
          />
        </div>
      </div>
      <div class="col">
        <div class="d-flex align-items-center right-block">
          <button type="button" class="btn border-0 p-0" @click="hideAudioBox">
            <span class="material-symbols-sharp">&#xe5cd;</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div>
          <pre>{{ artists }}</pre>
        </div> -->

  <artist-details :selected-artist="selectedArtist"></artist-details>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ArtistDetails from '/src/components/Artist/ArtistDetails.vue'
import AudioPlayer from '@liripeng/vue-audio-player'
import BirdLoader from '/src/components/BirdLoader.vue'

export default {
  components: {
    'artist-details': ArtistDetails,
    AudioPlayer,
    BirdLoader
  },
  setup () {},
  data () {
    return {
      currentAudioName: '',
      currentArtistType: '',
      currentSongTitle: '',
      currentAudioImage: '',

      playingIndex: null,
      showAudioPlayer: false,
      isAudioPlayerVisible: false,
      loading: true,
      selectedArtist: null
    }
  },
  props: {
    artists: {
      type: Array,
      default: () => []
    },
    showSeeMoreBtn: Boolean
  },
  watch: {},
  mounted () {},
  computed: {
    ...mapState({
      user: (state) => state.user,
      filterArtist: (state) => state.artist.filterArtist
      // artists: (state) => state.artist.artists,
    }),
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['fetchArtists', 'artistOptions']),
    getCurrentArtist () {
      if (this.currentAudioName && this.artists) {
        // Find the artist associated with the current song
        return (
          this.artists.find(
            (artist) => artist.song === this.currentAudioName
          ) || {}
        )
      }
      // Return an empty object if there is no current song or artists
      return {}
    },
    getCurrentArtistImage () {
      // Check if the artists array is available and not empty
      if (this.artists && this.artists.length > 0) {
        // Find artist associated with the current song if available
        const currentArtist = this.currentAudioName
          ? this.artists.find((artist) => artist.song === this.currentAudioName)
          : this.artists[0]

        // Return avatar if the artist is found
        return currentArtist ? currentArtist.avatar || '' : ''
      }

      // Default to an empty string if there no artists
      return ''
    },
    handleBeforePlay (next) {
      this.currentAudioName =
        this.artists[this.$refs.audioPlayer.currentPlayIndex].song
      next()
    },
    playArtistSong (index) {
      this.showAudioPlayer = true
      this.$refs.audioPlayer.currentPlayIndex = index
      this.$nextTick(() => {
        this.$refs.audioPlayer.play()
        this.title = this.artists[this.$refs.audioPlayer.currentPlayIndex].song
      })
      this.playingIndex = index
      this.isAudioPlayerVisible = true
    },
    pauseArtistSong (index) {
      this.$refs.audioPlayer.pause()
      this.playingIndex = null
    },
    showPlayButton (index) {
      return this.playingIndex !== index
    },
    isPlaying (index) {
      return this.playingIndex === index
    },
    hideAudioBox () {
      if (this.$refs.audioPlayer) {
        this.$refs.audioPlayer.pause()
      }
      this.isAudioPlayerVisible = false
    },
    handlePlay () {
      // Update playingIndex when the audio-player emits play event
      this.playingIndex = this.$refs.audioPlayer.currentPlayIndex
      //  this.isAudioPlayerVisible = true; // Show the audio player
    },
    handlePause () {
      // Update playingIndex when the audio-player emits pause event
      this.playingIndex = null
      //  this.isAudioPlayerVisible = true; // Show the audio player
    },
    // handleEnded() {
    //   this.isAudioPlayerVisible = true;
    // },

    openModal (artist) {
      // this.selectedArtist = artist; // Set the selected artist
      this.selectedArtist = this.isLoggedIn ? artist : null
    }
  }
}
</script>

<style scoped>
#ShowArtistLists .card-body .no-artist{
  margin-bottom: 0.43rem!important; /* artists with no artist_type */
}
/* Audio Player Group */

#audioPlayerGroup {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7.25rem;
  box-sizing: border-box;
  background: var(--white);
  border-radius: 0 0 4px 4px;
  border-top: 2px solid var(--bg-black1);
  z-index: 99;
  display: grid;
  align-items: center;
}
#audioPlayerGroup .artist-info-block {
  gap: 1rem;
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
}
#audioPlayerGroup .artist-avatar {
  width: 3.5rem;
  height: 3.5rem;
}
#audioPlayerGroup .song-name {
  color: #121212;
  font-size: 0.875rem;
  font-weight: 600;
}
#audioPlayerGroup .band-name {
  color: #aaa;
  font-size: 0.6875rem;
  font-weight: 400;
  letter-spacing: -0.00688rem;
}
#audioPlayerGroup .right-block {
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
}
#audioPlayerGroup .right-block button {
  margin-left: 92%;
}
#audioPlayerGroup .right-block button span {
  width: 24px;
  height: 24px;
  color: #aaa;
}
#audioPlayerGroup .right-block button:hover span {
  color: var(--orange);
}

#ShowArtistLists {
  position: relative;
}
#ShowArtistLists .row {
  width: 99.99%;
  margin: 1.25rem auto 5rem;
}
#ShowArtistLists .card {
  position: relative;
  border-radius: 0.69969rem;
  background: var(--white);
  box-shadow: 0px 0px 19px 0px rgba(18, 18, 18, 0.1);
  border: none;
  display: inline-flex;
  padding: 1.25rem;
  max-width: 100%;
  margin-bottom: 2rem;
}
#ShowArtistLists .card .card-img-top {
  position: relative;
  width: 19.375rem;
  height: 18.08744rem;
  margin-bottom: 1.438rem;
  left: 0;
  transition: 0.5s ease;
  backface-visibility: hidden;
}
#ShowArtistLists .middle {
  width: 100%;
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
#ShowArtistLists .middle button {
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  letter-spacing: 0.46px;
  color: var(--white);
  padding: 0.75rem 3rem;
  border: solid 2px var(--white);
  text-decoration: none;
  background-color: transparent;
}
#ShowArtistLists .card:hover .middle {
  opacity: 1;
}
#ShowArtistLists .card .card-body {
  width: 100%;
  padding: 0px 0.2rem 0px;
}
#ShowArtistLists .card .artist {
  width: 80%;
  float: left;
  text-align: left;
}
#ShowArtistLists .card .card-title {
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.5rem;
  letter-spacing: 0.05em;
  color: var(--black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#ShowArtistLists .card .card-text {
  font-weight: 600;
  font-size: 1rem;
  line-height: 100%;
  letter-spacing: 0.05em;
  color: var(--gray6);
  margin-bottom: 0.875rem;
}
#ShowArtistLists .card .artist-reviews-wrap {
  gap: 0.4rem;
  font-weight: 800;
  font-size: 1rem;
  line-height: 0.688rem;
  color: var(--p-color3);
  margin-bottom: 0;
  text-align: left;
}
#ShowArtistLists .card p .star-icon {
  font-size: 1.5rem;
  color: var(--orange);
  font-variation-settings: "FILL" 1, "wght" 800, "GRAD" 0, "opsz" 48;
}
#ShowArtistLists .card .artist-reviews-wrap .reviews {
  font-weight: 400;
  font-size: 1rem;
  line-height: 0.875rem;
  color: var(--gray6);
}
#ShowArtistLists .audio-btn {
  width: 20%;
  float: right;
}
#ShowArtistLists .audio-btn .play-btn {
  text-align: right;
  margin-top: 1rem;
}
#ShowArtistLists .audio-btn .play-btn button {
  padding: 0;
}
#ShowArtistLists .audio-btn .play-btn span {
  font-size: 3.5em;
  line-height: 0.25rem;
  color: var(--orange);
  cursor: pointer;
  font-variation-settings: "FILL" 1, "wght" 800, "GRAD" 0, "opsz" 48;
  transition: font-variation-setings 0.25s;
}
#ShowArtistLists .audio-btn .play-btn:hover span {
  color: var(--btn-hovered);
  transition: font-variation-setings 0.25s;
}

/* Equalizer */

#ShowArtistLists .equilizer {
  height: 2.2rem;
  width: 2.2rem;
  transform: rotate(180deg);
  margin-top: -1.7rem;
}

#ShowArtistLists .equilizer .bar {
  fill: var(--orange);
  width: 1.1rem;
  animation: equalize 4s 0s infinite;
}

#ShowArtistLists .equilizer .bar:nth-child(1) {
  animation-delay: -1.9s;
}

#ShowArtistLists .equilizer .bar:nth-child(2) {
  animation-delay: -2s;
}

#ShowArtistLists .equilizer .bar:nth-child(3) {
  animation-delay: -2.3s;
}

#ShowArtistLists .equilizer .bar:nth-child(4) {
  animation-delay: -2.4s;
}

#ShowArtistLists .equilizer .bar:nth-child(5) {
  animation-delay: -2.1s;
}

@keyframes equalize {
  0% {
    height: 60px;
  }
  4% {
    height: 50px;
  }
  8% {
    height: 40px;
  }
  12% {
    height: 30px;
  }
  16% {
    height: 20px;
  }
  20% {
    height: 30px;
  }
  24% {
    height: 40px;
  }
  28% {
    height: 10px;
  }
  32% {
    height: 40px;
  }
  36% {
    height: 60px;
  }
  40% {
    height: 20px;
  }
  44% {
    height: 40px;
  }
  48% {
    height: 70px;
  }
  52% {
    height: 30px;
  }
  56% {
    height: 10px;
  }
  60% {
    height: 30px;
  }
  64% {
    height: 50px;
  }
  68% {
    height: 60px;
  }
  72% {
    height: 70px;
  }
  76% {
    height: 80px;
  }
  80% {
    height: 70px;
  }
  84% {
    height: 60px;
  }
  88% {
    height: 50px;
  }
  92% {
    height: 60px;
  }
  96% {
    height: 70px;
  }
  100% {
    height: 80px;
  }
}

/* MEDIA QUERIES */

/* Large (lg) and Extra large (xl) */
@media (min-width: 992px) and (max-width: 1399.98px) {
  #ShowArtistLists .card {
    padding: 1.25rem 1.25rem 0.5rem;
    margin-bottom: 1.5rem;
  }
  #ShowArtistLists .card .card-img-top {
    height: 13.625rem;
    margin-bottom: 0.625rem;
  }
  #ShowArtistLists .middle button {
    font-size: 0.87rem;
    line-height: 1rem;
  }
  /* Equalizer */

  #ShowArtistLists .equilizer {
    height: 2rem;
    width: 2rem;
    margin-top: -1.5rem;
  }
  #ShowArtistLists .card .card-body {
    padding: 0.5rem 0.375rem 0.5rem;
  }
  #ShowArtistLists .card .card-title {
    font-size: 0.875rem !important;
    font-style: normal !important;
    font-weight: 600 !important;
    line-height: normal !important;
    line-height: 100%;
    letter-spacing: 0.0625rem;
    width: 95%;
  }
  #ShowArtistLists .card .card-text {
    font-size: 0.6875rem !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: normal !important;
    letter-spacing: -0.00688rem;
    margin-bottom: 0.63rem;
  }
  #ShowArtistLists .card .artist-reviews-wrap {
    gap: 0.2rem;
    font-size: 0.775rem !important;
  }
  #ShowArtistLists .card p .star-icon {
    font-size: 1rem;
  }
  #ShowArtistLists .card .artist-reviews-wrap .reviews {
    font-size: 0.75rem;
  }
  #ShowArtistLists .audio-btn .play-btn i {
    font-size: 2.3rem;
  }
  #ShowArtistLists .audio-btn .play-btn span {
    font-size: 2.5em;
  }
}
</style>
