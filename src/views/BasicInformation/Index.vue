<template>
  <layout>

    <section class="basic-information">
      <div class="container">
        <div class="row">
          <!-- <div class="col-md-6 offset-md-3"> -->
            <div class="col-6 m-auto">
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{ width: progressWidth }">
              </div>
            </div>

            <div class="d-flex justify-content-center mb-3">
              <div v-for="(step, index) in steps" :key="index"
                :class="['step-item', { 'active': index === currentStep }]">
                <div class="step-title">{{ step.title }}</div>
              </div>
            </div>
            <step-one class="step1" @step="stepper" :steps="steps" @stepData="updateForm" :page="currentStep"
              v-if="currentStep === 0" />
            <step-three class="step3" @step="stepper" :page="currentStep" @stepData="updateForm"
              v-if="currentStep === 2" />
          </div>
          <step-four class="step4" @step="stepper" :page="currentStep" @stepData="updateForm"
              v-if="currentStep === 3" />
              
          <!-- <div class="d-flex justify-content-center"  > -->
          <div class="step2 w-100" v-if="currentStep === 1">
            <div class="step-content active">
              <step-two style="width: 100vh;" @step="stepper" @view="openModal" :page="currentStep"
                @stepData="updateForm" />
            </div>

          </div>
          <!-- </div> -->
        </div>

      </div> <!-- end of container -->

      <!-- hidden audio controls -->
      <div class="audio-controls-fixed" v-show="showControls">
        <div class="d-flex align-items-center audio-menu">
          <div class="artist">
            <div class="card">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="showArtists[currentIndex].image" class="img-fluid artist-img" alt="Artist Image" />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{{ showArtists[currentIndex].name }}</h5>
                    <p class="card-text">{{ showArtists[currentIndex].typeOfArtist }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="audio-controls">
            <audio ref="audioPlayer" controls style="display: none;"></audio>
            <div class="main-controls">
              <button @click="playPrevious" class="btn btn-primary prev">
                <!-- <i class="material-icons"><span class="material-symbols-outlined">skip_previous</span></i> -->
              </button>
              <button @click="togglePlayPause" class="btn btn-primary play">
                <!-- <i :class="playIconClass"></i> -->
                <img :src="playIconClass" alt="">
              </button>
              <button @click="playNext" class="btn btn-primary next"></button>
            </div>
            <div class="song-timeline">
              <div class="current-time">
                {{ currentTime }}
              </div>
              <div class="timeline">
                <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
              </div>
              <div class="duration">
                {{ duration }}
              </div>
            </div>
          </div>

          <div class="stop-song">
            <!-- Volume -->
            <div class="volume-wrapper">
              <button @click="toggleMute" class="btn btn-primary volume">
                <i :class="`bi ${volumeIcon}`"></i>
              </button>
              <div class="" style="display: none;">
                <button @click="showVolumeSlider = !showVolumeSlider" class="btn btn-primary">
                  <i class="bi bi-volume-up"></i>
                </button>
              </div>
              <div v-if="showVolumeSlider" class="volume-slider">
                <input type="range" min="0" max="100" v-model="currentVolume" class="form-range" @input="updateVolume">
              </div>
            </div>
            <!-- x icon - stop the song and close the audio controls modal -->
            <i class="bi bi-x" @click="stopAudio"></i>
          </div>
        </div>
      </div> <!-- end of audio-controls -->
      <artistdetails :selectedArtist="selectedArtist">
      </artistdetails>

      <!-- <user-modal :selectedArtist="selectedArtist" :showUserModal="showUserModal" @closeModal="closeModal" /> -->

    </section>


  </layout>
</template>
<script>
import Layout from '/src/components/Layouts/Layout.vue';
import ArtistDetails from '/src/components/Artist/ArtistDetails.vue';
import { mapGetters, mapState, mapActions } from "vuex";
import StepOne from './Forms/Info.vue';
import StepTwo from './Forms/Song.vue';
import StepThree from './Forms/Story.vue';
import StepFour from './Forms/Review.vue';

export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    Layout,
    artistdetails: ArtistDetails,
  },
  setup() {
    // window.addEventListener('beforeunload', function (e) {
    //   e.preventDefault();
    //   e.returnValue = '';
    // });
  },
  data() {
    return {
      steps: [
        { title: 'INFO', content: 'INFO' },
        { title: 'SONG', content: 'SONG' },
        { title: 'STORY', content: 'STORY' },
        { title: 'REVIEW', content: 'REVIEW' }
      ],
      subStepsSong: [
        { title: 'Select your artist' },
        { title: 'Select mood' },
        { title: 'Select language' }
      ],
      subStepsStory: [
        { title: 'Occasion details' },
        { title: 'Your story' },
      ],
      currentStep: 0,
      currentSubStepSong: 0, // Step 2 - SONG
      currentSubStepStory: 0,  // Step 3 - STORY
      selectedMood: null,
      understand: false,
      submitted: false,
      form: {
        first_name: 'John',
        last_name: null,
        email: null,
        // artist_type_id: null,
        // genre_id: null,
        song_type_id: null, // mood
        language_id: null,
        duration_id: null,
        song_type_id: null,
        purpose_id: null,
        sender: null,
        receiver: null,
        user_story: null,
        page_status: null,
      },

      // STEP 1 - INFO
      first_name: '',
      last_name: '',
      email: '',


      selectedLanguage: null,

      selectedSongDuration: null,

      // STEP 3 - STORY
      song_for: '',
      come_from: '',
      your_story: '',
      selectedOccasion: null,
      songOccasionOptions: [
        { id: 1, name: 'Birthday' },
        { id: 2, name: 'Graduation' },
        { id: 3, name: 'Wedding' }
      ],
      expandMore: {
        img: '/assets/expand-more.svg',
        altText: 'expand icon to see list of items in the dropdown menu'
      },
      currentStep: 0,
      // STEP 2 - SONG (SELECT YOUR ARTIST)
      showArtists: [
        {
          id: 1,
          name: 'Idlepitch',
          typeOfArtist: 'Full Band Artist',
          genre: 'Rock',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
          songName: 'Smells like teen spirit',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649068/trending-bicolano-artist-1_igoz8j.png',
          ratings: 4.95,
          reviews: 234,
        },
      ],
      ratingImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321042/rating-star-small_axozjd.svg',
      showControls: false,
      audioPlayer: null,
      currentIndex: 0,
      activeSlide: 0,
      lastActiveSlide: 0,
      isPlaying: false,
      isMuted: false,
      currentTime: '0:00',
      duration: '0:00',
      showVolumeSlider: false,
      currentVolume: 100,
      showVolumeSlider: true,
      muted: false,
      selectedArtist: null,
      isActive: false,
      showUserModal: false,
    };
  },
  mounted() {
    var payload = {}

    if (this.artist_type) payload.artist_type = this.artist_type
    if (this.genre) payload.genre = this.genre
    if (this.search) payload.search = this.search

    this.fetchArtists(payload)
      .then(response => {
        console.log('Song Request Artists: ', response);
      })

    this.audioPlayer = this.$refs.audioPlayer;
    this.audioPlayer.addEventListener('play', () => {
      this.isPlaying = true;
    });

    this.audioPlayer.addEventListener('pause', () => {
      this.isPlaying = false;
    });
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      artists: (state) => state.artist.artists,
      artist_types: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      song: state => state.songs.song,
      song_artists: state => state.songs.song_artists,
      song_language: state => state.songs.song_language,
      song_duration: state => state.songs.song_duration,
      song_purpose: state => state.songs.song_purpose,
      song_mood: state => state.songs.song_mood,
    }),
    progressWidth() {
      return ((this.currentStep + 1) / this.steps.length) * 100 + '%';
    },
    subProgressWidthSong() {
      return ((this.currentSubStepSong + 1) / this.subStepsSong.length) * 100 + '%';
    },
    subProgressWidthStory() {
      return ((this.currentSubStepStory + 1) / this.subStepsStory.length) * 100 + '%';
    },

    isButtonOccasion() {
      return this.song_for === '' || this.come_from === '';
    },
    playIconClass() {
      return this.isPlaying ? 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321874/play-pause_ofcx4e.svg' : 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321874/play-black_ftgyx3.svg';
    },
    volumeIcon() {
      if (this.currentVolume === 0) {
        return 'bi-volume-mute';
      } else if (this.currentVolume < 1) {
        return 'bi-volume-mute';
      } else if (this.currentVolume < 50) {
        return 'bi-volume-down';
      } else {
        return 'bi-volume-up';
      }
    },
  },
  methods: {
    ...mapActions([
      'fetchArtists', 'artistOptions', 'storeSong', 'clearSongForm',
    ]),
    stepper(step) {
      console.log('Stepper: ', step)
      this.currentStep = step;
    },
    updateForm(form) {
      console.log('\n\nForm Data: ', form)
      console.log('UpdateForm (current): ', this.form)
      Object.assign(this.form, form);

      console.log('UpdateForm (new): ', this.form, '\n\n')
      // this.storeSong(this.form);
      // console.log('New (form): ', this.form)
    },
    selectArtist(artist) {
      this.selectedArtist = artist;
    },
    changeSelectArtist(artist) {
      return this.selectedArtist === artist ? 'Selected' : 'Select';
    },
    openModal(artist) {
      this.$root.$emit("bv::show::modal", "#artistModal");
      // this.showUserModal = true;
      this.selectedArtist = artist;
    },
    toggleControls(index) {
      if (this.audioPlayer) {
        if (this.showControls && this.currentIndex === index) {
          if (this.audioPlayer.paused) {
            this.audioPlayer.play();
            this.isPlaying = true;
          } else {
            this.audioPlayer.pause();
            this.isPlaying = false;
          }
        } else {
          this.currentIndex = index;
          this.playSong(this.currentIndex);
          this.showControls = true;
          this.isPlaying = true;
        }

        this.activeSlide = Math.floor(index / 3);

      }
    },
    togglePlayPause() {
      if (this.audioPlayer) {
        if (this.audioPlayer.paused) {
          this.audioPlayer.play();
        } else {
          this.audioPlayer.pause();
        }
      }
    },
    playPrevious() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.showArtists.length - 1;
      }

      // this.activeSlide = Math.floor(this.currentIndex / 6);
      this.playSong(this.currentIndex);
    },
    playSong(index) {
      if (this.audioPlayer) {
        this.audioPlayer.src = this.showArtists[index].song;
        this.audioPlayer.load();
        this.audioPlayer.play();
      }

      // Update current time and duration when the metadata is loaded
      this.audioPlayer.addEventListener('loadedmetadata', () => {
        this.duration = this.formatTime(this.audioPlayer.duration);
      });

      // Update current time during playback
      this.audioPlayer.addEventListener('timeupdate', () => {
        this.currentTime = this.formatTime(this.audioPlayer.currentTime);
        this.updateProgressBar();
      });
    },

    stopAudio() {
      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.showControls = false;
      }
    },
    toggleMute() {
      if (this.audioPlayer) {
        this.audioPlayer.muted = !this.audioPlayer.muted;
        this.isMuted = this.audioPlayer.muted;
      }
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
    updateProgressBar() {
      const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
      this.progressBarWidth = `${progress}%`;
    },
    updateVolume() {
      if (this.audioPlayer) {
        this.audioPlayer.volume = this.currentVolume / 100;
      }
    },
    toggleMute() {
      if (this.currentVolume === 0) {
        this.currentVolume = this.previousVolume;
      } else {
        this.previousVolume = this.currentVolume;
        this.currentVolume = 0;
      }
    },
    watch: {
      currentVolume() {
        this.updateVolume();
      },
    },
    playNext() {
      if (this.currentIndex < this.showArtists.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }

      // this.activeSlide = Math.floor(this.currentIndex / 6);
      this.playSong(this.currentIndex);
    },
    // nextStep() {
    //   if (this.currentStep < this.steps.length - 1) {
    //     this.currentStep++;
    //   }

    //   this.submitted = true;
    // },
    subNextStepSong() {
      if (this.currentSubStepSong < this.subStepsSong.length - 1) {
        this.currentSubStepSong++;
      }
    },
    subNextStepStory() {
      if (this.currentSubStepStory < this.subStepsStory.length - 1) {
        this.currentSubStepStory++;
      }
    },
    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      } else if (this.currentStep === 0) {
        this.$router.push('/subscription');
      }
    },
    subPreviousStepSong() {
      if (this.currentSubStepSong > 0) {
        this.currentSubStepSong--;
      }
    },
    subPreviousStepStory() {
      if (this.currentSubStepStory > 0) {
        this.currentSubStepStory--;
      }
    },
    previousStep() {
      if (this.currentStep === 0) {
        window.location.href = '/create-song';
      }
    },
    submitSelectedArtist() {
      window.location.href = '/deliveryform';
    },
    editBasicInfo() {
      // if(this.currentStep === 0){
      //   this.currentStep === 0;
      // }

      if (this.currentStep > 0) {
        this.currentStep = this.currentStep -= 3;
      }
    },
    editSong() {
      this.currentStep = 1;  // SONG STEPS
      this.currentSubStepSong = 0;  // SONG SUBSTEPS 
    },
    editStory() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    selectMood(mood) {
      this.selectedMood = mood;
    },
    selectLanguage(language) {
      this.selectedLanguage = language;
    },
    selectSongDuration(duration) {
      this.selectedSongDuration = duration;
    },
    selectOccasion(occasion) {
      this.selectedOccasion = occasion;
    },
  },
  beforeMount() {
    this.clearSongForm()
  },
}
</script>



