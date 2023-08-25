<template>
  <div>
    <div class="row">
        <div class="review-content">
          <div class="title">
            <h3>Basic Information</h3>
            <button type="button" @click="editBasicInfo">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_964_20368)">
                  <path
                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                    fill="#B8BBCF" />
                </g>
                <defs>
                  <clipPath id="clip0_964_20368">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Edit Info
            </button>
          </div>
          <div class="d-flex justify-content-between group-item top-item">
            <h4>First Name</h4>
            <p>{{ song?.first_name }}</p>
          </div>
          <div class="d-flex justify-content-between group-item">
            <h4>Last name</h4>
            <p>{{ song.last_name }}</p>
          </div>
          <div class="d-flex justify-content-between group-item last-item">
            <h4>Email Address</h4>
            <p>{{ song.email }}</p>
          </div>

          <div class="title">
            <h3>Song</h3>
            <button type="button" @click="editSong(1)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_964_20368)">
                  <path
                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                    fill="#B8BBCF" />
                </g>
                <defs>
                  <clipPath id="clip0_964_20368">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Edit Info
            </button>
          </div>
          <div class="d-flex justify-content-between group-item top-item">
            <h4>Genre</h4>
            <p v-if="selectedArtist">{{ selectedArtist.genre }}</p>
          </div>
          <div class="d-flex justify-content-between group-item">
            <h4>Type of Artist</h4>
            <p v-if="selectedArtist">{{ selectedArtist.typeOfArtist }}</p>
          </div>
          <div class="d-flex justify-content-between group-item">
            <h4>Type of Song (Moods)</h4>
            <p>{{ song?.mood || 'No selected mood' }} </p>
          </div>
          <div class="d-flex justify-content-between group-item">
            <h4>Language</h4>
            <p>{{ song?.language || 'No selected language' }}</p>
          </div>
          <div class="d-flex justify-content-between group-item last-item">
            <h4>Duration of Song</h4>
            <p>{{ selectedSongDuration ? selectedSongDuration.time : 'No selected song' }}</p>
          </div>

          <div class="title">
            <h3>Story</h3>
            <button type="button" @click="editStory">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_964_20368)">
                  <path
                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                    fill="#B8BBCF" />
                </g>
                <defs>
                  <clipPath id="clip0_964_20368">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Edit Info
            </button>
          </div>
          <div class="d-flex justify-content-between group-item top-item">
            <h4>What is the song for?</h4>
            <p>{{ selectedOccasion ? selectedOccasion.name : 'No selected occasion' }}</p>
          </div>
          <div class="d-flex justify-content-between group-item">
            <h4>To whom is the song for?</h4>
            <p>{{ song?.receiver }}</p>
          </div>
          <div class="d-flex justify-content-between group-item">
            <h4>Where did the song come from?</h4>
            <p>{{ song?.sender }}</p>
          </div>
          <div class="d-flex justify-content-between group-item">
            <h4>Your story</h4>
          </div>
          <div class="your-story-content">
            <p>{{ song?.user_story }}</p>
          </div>
          <div class="double-check">
            <h5>Please double-check the spelling and, where necessary, the pronunciation, and ensure that your story makes
              sense.</h5>
          </div>
          <div class="understand">
            <input type="checkbox" class="form-check-input" v-model="understand" id="understand">
            <p>I understand changes cannot be made after checkout – all of my information is good to go!</p>
          </div>
          <div class="button-wrapper">
            <button type="button" class="btn btn-primary back" @click="previousStep">Back</button>
            <button type="button" class="btn btn-primary next" @click="submitSelectedArtist"
              :disabled="!understand">Submit</button>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup() {


    return {}
  },
  data() {
    return{
      understand: false
    }
  },
  methods: {
    ...mapActions([
      'fetchSongRequest', 'songStepFinal',
    ]),
    submit() {

    },
    editBasicInfo() {
      this.$emit('step', 0)
    },
    editSong() {
      this.$emit('step', 1)
    },
    editStory() {
      this.$emit('step', 1)
    },
    previousStep() {
      this.$emit('step', 2)
    },
    submitSelectedArtist() {
      this.$router.push('/deliveryform');
    },
  },
  mounted() {
    this.fetchSongRequest(this.song?.id);
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      artists: (state) => state.artist.artists,
      artist_types: (state) => state.artist.artist_types,
      song: state => state.songs.song,
    }),
  },
  watch: {

  }
}
</script>


<style scoped></style>