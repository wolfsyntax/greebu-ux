
<template>
  <div class="w-100">
    <div class="progress">
      <div class="progress-bar" :style="{ width: subProgressWidthSong }"></div>
      
    </div>
<!-- {{ language }}<br/><br/>
{{ mood }}<br/><br/>
{{ duration }}<br/><br/> -->
    <div class="d-flex justify-content-center content-sub">
      <div v-for="(subStep, subIndex) in subStepsSong" :key="subIndex" :class="['step-item', { 'active': subIndex === currentSubStepSong }]">
        <div class="substep-title">{{ subStep.title }}</div>
      </div>
    </div>
    
    <!-- SONG SubSteps -->
    <div class="justify-content-center p-0">
      <div class="row" >
        <div class="col-12" v-if="currentSubStepSong === 0">
          <div class="select-artist ">
            <div class="d-flex align-items-center back-to-info" @click="previousStep">
              <span class="material-symbols-outlined">&#xe5c4;</span>
              <h5 class="back">Back</h5>
            </div>
            <div class="text-center title-wrapper">
              <h2 class="title">Select your artist</h2>
              <p class="sub-title">These artists are available now! Tap an artist to hear a sample song that showcases their style and voice.</p>
            </div>
            <div class="row top-row">
              <div class="col-6">
                <a href="#" class="btn btn-primary filter"><i class="material-icons"><span class="material-symbols-outlined next">sort</span></i>Filter</a>
              </div>

              <div class="col-6">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search artist by Name" v-model="search" aria-label="Search artist by Name" aria-describedby="button-addon2">
                  <button class="btn btn-success border-rad" type="button" id="button-addon2">
                    <i class="material-icons"><span class="material-symbols-outlined next">search</span></i>
                  </button>
                </div>
              </div>
              
              <div class="  col-3">
                <h5>Type of Artist</h5>
                <select class="form-select" v-model="artist_type" aria-label="Default select example">
                  <option value="" selected></option>
                  <option v-for="artist_type in artist_types" :key="artist_type.id" :value="artist_type.title">{{ artist_type.title }}</option>
                </select>
              </div>

              <div class="col-3">
                <h5>Music Genre</h5>
                <select class="form-select" v-model="genre" aria-label="Default select example">
                  <option value="" selected></option>
                  <option v-for="( title, id ) in genres" :key="id" :value="title.toLowerCase()">{{ title }}</option> 
                </select>
              </div>

              <div class="col-3">
                <h5>Sort by Ratings</h5>
                <select class="form-select" v-model="rating" aria-label="Default select example">
                  <option selected>Select rating</option>
                  <option value="1">5</option>
                  <option value="2">4</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div class="col-3">
                <h5>Sort by Alphabetical</h5>
                <select class="form-select" v-model="sort" aria-label="Default select example">
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
              </div>
            </div>

            <!-- Show Artists -->
            <div class="">
              <div class="row select-aritst-row">
                <div class="col-3" v-for="(artist, itemIndex) in artists" :key="itemIndex">
                  <div class="card">
                    <img :src="artist.avatar" class="card-img-top img-fluid" loading="lazy" alt="Trending Artist" />
                    <div class="middle">
                      <button class="btn btn-primary" @click="openModal(artist)" data-bs-toggle="modal" data-bs-target="#artistModal"> View Details</button>
                    </div>

                    <div class="card-body">
                      <div class="artist">
                        <h5 class="card-title">{{ artist.artist_name }}</h5>
                        <h6 class="card-text">{{ artist.artist_type }}</h6>
                        <p><img src="https://res.cloudinary.com/daorvtlls/image/upload/v1687321042/rating-star-small_axozjd.svg" alt="Rating Star"> {{ artist.ratings }} <span>({{ artist.reviews }} reviews)</span></p>
                      </div>

                      <div class="audio-btn">
                        <div class="play-btn">
                          <div class="play-btn">
                            <div class="play-btn">
                              <i :class="{
                                'bi bi-play-circle-fill play-icon': !showControls || (showControls && currentIndex !== itemIndex),
                                'bi bi-pause-circle-fill play-icon': showControls && currentIndex === itemIndex
                              }" @click="toggleControls(artist, itemIndex)"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>   
                    <button class="btn btn-primary select" @click="artist.selected = !artist.selected; selectArtist(artist)" :class="{ 'selected': artist.selected }" >
                      {{ artist.selected ? 'Selected' : 'Select' }}
                    </button>
                  </div>              
                </div>
              </div>
            </div>

            <div class="button-wrapper">
              <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="page === 0">Back</button>
              <button type="button" class="btn btn-primary next" :disabled="!Object.keys(chosenArtist).length" @click="subNextStepSong">Next</button>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 offset-md-3" v-if="currentSubStepSong === 1">
          <!-- <div class=""> -->
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">How the song make them feel?</h2>
                <form @submit.prevent="subNextStepSong">
                  <div class="form-group">
                    <label for="mood">Select mood</label>
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span :style="selectedMood ? { color: '#121212' } : {}">{{ mood ? mood.name : 'Select Mood' }}</span>
                        <img :src="expandMore.img" :alt="expandMore.altText">
                      </button>

                      <ul class="dropdown-menu">
                        <li v-for="option in moods" :key="option.id" @click="selectMood(option)">{{ option.name }}</li>
                      </ul>
                    </div>
                  </div> 

                  <div class="button-wrapper">
                    <button type="button" class="btn btn-primary back" @click="subPreviousStepSong" :disabled="currentSubStepSong === 0">Back</button>
                    <button type="submit" class="btn btn-primary next" :disabled="!mood">Next</button>
                  </div>
                </form>
              </div>
            </div>
          <!-- </div> -->
        </div>

        <div class="col-md-6 offset-md-3" v-if="currentSubStepSong === 2">
          <div class="card ">
            <div class="card-body ">
              <h2 class="card-title">More Details</h2>
              <form class="w-100" @submit.prevent="nextStep">
                <div class="form-group">
                  <label for="language">Select Language</label>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span :style="language ? { color: '#121212' } : {}">{{ language ? language.name : 'Select Language' }}</span>
                      <img :src="expandMore.img" :alt="expandMore.altText">
                    </button>

                    <ul class="dropdown-menu">
                      <li v-for="language in languages" :key="language.id" @click="selectLanguage(language)">{{ language.name }}</li>
                    </ul>
                  </div>
                </div>
              
                <div class="form-group">
                  <label for="language">Duration of Song</label>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span :style="duration ? { color: '#121212' } : {}">{{ duration ? duration.title : 'Select Duration of Song' }}</span>
                      <img :src="expandMore.img" :alt="expandMore.altText">
                    </button>

                    <ul class="dropdown-menu">
                      <li v-for="duration in durations" :key="duration.id" @click="selectSongDuration(duration)">{{ duration.title }}</li>
                    </ul>
                  </div>
                </div> 

                <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="subPreviousStepSong" :disabled="page === 0">Back</button>
                  <button type="submit" class="btn btn-primary next" :disabled="!(language && duration)">Next</button>
                </div>
              </form>
            </div>
          </div>
        </div> <!-- end of currentSubStepSong -->
      </div> <!-- end of col-md-6 -->
    </div>
    <div class="audio-controls-fixed" v-show="showControls">
      <div class="d-flex align-items-center audio-menu">
        <div class="artist">
          <div class="card">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="filterArtist?.avatar" class="img-fluid" alt="Artist Image" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ filterArtist?.artist_name }}</h5>
                  <p class="card-text">{{ filterArtist?.artist_type }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="audio-controls">
          <audio ref="audioPlayer" controls style="display: none;"></audio>
          <div class="main-controls">
            <button @click="playPrevious" class="btn btn-primary prev">
            </button>
            <button @click="togglePlayPause" class="btn btn-primary play">
              <img :src="playIconClass" alt="play icon" />
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
          <i class="bi bi-x" @click="stopAudio"></i>
        </div>
      </div>
    </div>     
  </div> <!-- end of index == 1 -->
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Card from '/src/components/Artist/Card.vue';

export default {
  setup()
  {

    return {}
  },
  components: {
    Card,
  },
  data()
  {
    return {
      artist: {},
      audioPlayer: null,
      showVolumeSlider: false,
      currentVolume: 100,
      currentTime: '0:00',
      duration: '0:00',
      currentIndex: -1,
      isPlaying: false,
      isMuted: false,
      progressBarWidth: '0%',
      // STEP 2 - SONG
      moodOptions: [
        { id: 1, name: 'Happy' },
        { id: 2, name: 'Surprise' },
        { id: 3, name: 'Romance' }
      ],
      languageOptions: [
        { id: 1, name: 'English' },
        { id: 2, name: 'Tagalog' },
        { id: 3, name: 'Taglish' },
        { id: 4, name: 'Bikol' }
      ],
      songDurationOptions: [
        { id: 1, time: '5 minutes' },
        { id: 2, time: '10 minutes' },
        { id: 3, time: '15 minutes' }
      ],
      genre: null,
      rating: null,
      artist_type: null,
      sort: null,
      search: null,
      mood: null,
      moodIndex: 0,
      occasion: null,
      language: null,
      duration: null,
      // artists: [],
      selectedMood: null,
      // selectLanguage: null,
      selectedSongDuration: null,
      currentSubStepSong: 0,
      expandMore: {
        img: '/assets/expand-more.svg',
        altText: 'expand icon to see list of items in the dropdown menu'
      },
      activeSlide: 0,
      lastActiveSlide: 0,
      subStepsSong: [
        { title: 'Select your artist' },
        { title: 'Select mood' },
        { title: 'Select language' }
      ],
      
      showControls: false,
      chosenArtist: {},
      // form: {
      //   artists: null,
      //   genre_id: null,
      //   song_type_id: null,
      //   language_id: null,
      //   duration_id: null,
      //   purpose_id: null,
      // }
    }
  },
  props: {
    page: {
      type: Number,
      default: 0,
      required: true
    },
  },  
  methods: {
    ...mapActions([
      'fetchArtists', 'artistOptions', 'fetchSongForm', 'storeArtist', 'songStepTwo', 'storeMood', 'storeLanguage', 'storeDuration',
    ]),
    updateProgressBar()
    {
      const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
      this.progressBarWidth = `${progress}%`;
    },
    formatTime(time)
    {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
    playNext()
    {
      if (this.currentIndex < this.artists.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      // this.activeSlide = Math.floor(this.currentIndex / 6);
      this.$store.commit('SET_FILTERED_ARTIST',this.artists[this.currentIndex]);
      this.playSong();
    },
    playSong()
    {
      
      if (this.audioPlayer) {
        console.log('Current Playing song: ', this.filterArtist?.song);
        this.audioPlayer.src = this.filterArtist?.song;
        this.audioPlayer.load();
        var audioPlay = this.audioPlayer.play()
          .then(res =>
          {
            
          })
          .catch(err =>
          {
            audioPlay;
          })
      }
      // Update current time and duration when the metadata is loaded
      this.audioPlayer.addEventListener('loadedmetadata', () =>
      {
        this.duration = this.formatTime(this.audioPlayer.duration);
      });

      // Update current time during playback
      this.audioPlayer.addEventListener('timeupdate', () =>
      {
        this.currentTime = this.formatTime(this.audioPlayer.currentTime);
        this.updateProgressBar();
      });

      console.log('Audio Player: ', this.audioPlayer);
    },
    stopAudio()
    {
      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.showControls = false;
      }
    },
    updateVolume()
    {
      if (this.audioPlayer) {
        this.audioPlayer.volume = this.currentVolume / 100;
      }
    },
    toggleMute() {
      
      if (this.audioPlayer) {
        this.audioPlayer.muted = !this.audioPlayer.muted;
        this.isMuted = this.audioPlayer.muted;
      }

      if (this.currentVolume === 0) {
        this.currentVolume = this.previousVolume;
      } else {
        this.previousVolume = this.currentVolume;
        this.currentVolume = 0;
      }
    },
    playPrevious()
    {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.artists.length - 1;
      }
      // this.activeSlide = Math.floor(this.currentIndex / 6);
      this.$store.commit('SET_FILTERED_ARTIST',this.artists[this.currentIndex]);

      this.playSong();
    },
    playButton(val, cardIndex)
    {
      
      if (this.audioPlayer) {
        console.log('Audio Player is initialized')
        if (this.showControls) {
          if (this.audioPlayer.paused) {
            this.audioPlayer.play();
            this.isPlaying = true;
          } else {
            this.audioPlayer.pause();
            this.isPlaying = false;
          }
        } else {
          this.currentIndex = cardIndex;
          this.playSong();
          this.showControls = true;
          this.isPlaying = true;
        }
      }
    },
    togglePlayPause()
    {
      if (this.audioPlayer) {
        if (this.audioPlayer.paused) {
          this.audioPlayer.play();
        } else {
          this.audioPlayer.pause();
        }
      }
    },
    toggleControls(artist, index = null)
    {
      console.log(`Toggle Controls ${index}: `, artist);
      this.$store.commit('SET_FILTERED_ARTIST', artist);
      this.playButton(artist, index);
    },
    selectMood(value)
    {
      this.mood = value;
      this.storeMood(value);
    },    
    subPreviousStepSong()
    {
      // this.$emit('step', 0);
      if (this.currentSubStepSong > 0) {
        this.currentSubStepSong--;
      }
      this.language = this._getSongLanguage;
      this.mood = this._getSongMood;
      this.duration = this._getSongDuration;
    },
    fetchForm()
    {

    },
    nextStep()
    {
      // if (this.currentStep < this.steps.length - 1) {
      //   this.currentStep++;
      // }
      // var newForm = Object.assign(this.form, {
      //   language_id: this.language,
      //   duration_id: this.duration,
      // })
      this.$store.commit('SET_SONG_GENRE', this.genre);
      this.$emit('step', 2)
      this.$store.commit('setSongPageStatus', 'story');
      // this.$emit('stepData', this.form)
      
      console.log('Update song request')
      this.songStepTwo()

      this.submitted = true;
    },    
    subNextStepSong()
    {
      
      if (this.currentSubStepSong < this.subStepsSong.length - 1) {
        this.stopAudio();
        this.currentSubStepSong++;
        // this.$emit('stepData', this.form)
      }

      if (this.currentSubStepSong === 2) {

        console.log('Setting Mood 3: ', this.mood)
        // var newObj = Object.assign(this.form, { song_type_id: this.mood });
        this.storeMood(this.mood);
        // this.storeSong(newObj)
      } else if (this.currentSubStepSong === 3) {
        console.log('Language and Duration: ', this.form)
        // var newObj = Object.assign(this.form, { language_id: this.language, duration_id: this.duration });
        // this.storeLanguage(this.language);
        // this.storeDuration(this.duration);
      }
    },
    submit()
    {

    },
    previous()
    {
      this.$emit('step', 1);
    },
    selectArtist(artist)
    {
      this.$store.commit('selectSongArtist', artist);
      this.chosenArtist = artist.selected ? artist : {};
      console.log('Selected Artist: ', this.chosenArtist, artist);
    },
    // changeSelectArtist(artist)
    // {
    //   return this.chosenArtist === artist ? 'Selected' : 'Select';
    // },
    previousStep()
    {
      this.$emit('step', 0)
      if (this.currentStep > 0) {
        this.currentStep--;
      } else if (this.currentStep === 0) {
        this.$router.push('/subscription');
      }
    },
    openModal(artist)
    {
      this.$emit('view', artist)
    }, 
    selectLanguage(language)
    {
      console.log('Selected Language: ', language)
      this.language = language;
      this.storeLanguage(language);
    },
    selectSongDuration(duration)
    {
      console.log('Selected Language')
      this.duration = duration;
      this.storeDuration(duration)
    },
  },
  mounted()
  {
    var payload = {}
    this.$store.commit('SET_FILTERED_ARTIST');

    this.rating = this.artist_filter.rating;
    this.sort = this.artist_filter.sort;
    this.chosenArtist = this.form.artists || {};
    this.$store.commit('setSongPageStatus', 'song');

    // if (this.form?.artists) this.chosenArtist = this.form?
    if (this.artist_type) payload.artist_type = this.artist_type;
    else this.artist_type = this.artist_filter.artist_type;

    if (this.genre) payload.genre = this.genre;
    else this.genre = this.artist_filter.genre;

    if (this.search) payload.search = this.search
    
    this.artistOptions()
    this.fetchSongForm()
      .then(response =>
      {
        
      })

    this.fetchArtists(payload)
    .then(response =>
      {
        // console.log('Artist Option: ', response)
    })

    this.form = this.song;
    this.language = this._getSongLanguage;
    this.mood = this._getSongMood;
    this.duration = this._getSongDuration;
    console.log('Song.vue mounted', this.mood);

    this.audioPlayer = this.$refs.audioPlayer;
    
    this.audioPlayer.addEventListener('play', () =>
    {
      this.isPlaying = true;
    });
    
    this.audioPlayer.addEventListener('pause', () =>
    {
      this.isPlaying = false;
    });
  },
  computed: {
    volumeIcon()
    {
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
    playIconClass()
    {
      return this.isPlaying ? 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321874/play-pause_ofcx4e.svg' : 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321874/play-black_ftgyx3.svg';
    },
    ...mapGetters(["userInfo", "token", "_getSongArtists", "_getSongLanguage", "_getSongDuration", "_getSongPurpose", "_getSongMood"]),
    ...mapState({
      artists: (state) => state.artist.artists.map(val => ({...val, selected: false})),
      artist_types: (state) => state.artist.artist_types,
      filterArtist: state => state.artist.filterArtist,
      genres: (state) => state.artist.genres,
      moods: state => state.songs.moods,
      languages: state => state.songs.languages,
      durations: state => state.songs.durations,
      purposes: state => state.songs.purposes,
      form: state => state.songs.song,
      artist_filter: state => state.songs.artist_filter,
      // song_artists: state => state.songs.song_artists,
      // song_language: state => state.songs.song_language,
      // song_duration: state => state.songs.song_duration,
      // song_purpose: state => state.songs.song_purpose,
      // song_mood: state => state.songs.song_mood,
    }),
    subProgressWidthSong()
    {
      return ((this.currentSubStepSong + 1) / this.subStepsSong.length) * 100 + '%';
    },
  },
  watch: {
    filterArtist(val, prev)
    {

      if (val.id !== prev?.id) 
      {
        this.currentTime = '0:00';
        this.duration = '0:00';
        this.progressBarWidth = '0%';

        if (this.audioPlayer) {
          console.log('Current Playing song: ', val?.song);
          this.playSong();
        }
      }

    },
    chosenArtist(cur, prev) {
      if (Object.keys(prev).length) prev.selected = !prev.selected
    },
    showControls(val)
    {
      this.currentTime = '0:00';
      this.duration = '0:00';
      this.progressBarWidth = '0%';
    },
    currentSubStepSong(value, prev)
    {

      if (prev === 0) {
        // this.$emit('stepData', { artists: this.chosenArtist })
        this.storeArtist(this.chosenArtist)
      } else if (prev === 1) {
        // console.log(`Current Watch[${prev}]: `,this.form)
        // this.form['song_type_id'] = this.mood

        // console.log(`New Watch[${prev}]: `, this.form)
        // this.storeSong(this.form);

      } else if (prev === 2) {

        // this.$emit('stepData', {
        //   language_id: this.language?.id || null,
        //   duration_id: this.duration?.id || null,
        // })

      }

    },
    search(newValue)
    {
      var payload = {}
      if (this.artist_type) payload.artist_type = this.artist_type
      if (this.genre) payload.genre = this.genre
      if (this.sort) payload.sortBy = this.sort;
      if (newValue) payload.search = newValue
      payload.list_type = 'customers';

      this.fetchArtists(payload)
    },
    sort(newValue)
    {
      this.$store.commit('RESET_SONG_FILTER', {
        artist_type: this.artist_type,
        artist_genre: this.genre,
        rating: this.rating,
        sort: this.sort,
      })

      var payload = {}
      if (this.artist_type) payload.artist_type = this.artist_type;
      if (this.genre) payload.genre = this.genre;
      if (newValue) payload.sortBy = this.sort;
      if (this.search) payload.search = newValue;

      payload.list_type = 'customers';

      this.fetchArtists(payload)
    },
    artist_type(newValue)
    {
      this.$store.commit('RESET_SONG_FILTER', {
        artist_type: this.artist_type,
        artist_genre: this.genre,
        rating: this.rating,
        sortBy: this.sort,
      })

      var payload = {}
      if (newValue) payload.artist_type = newValue
      if (this.genre) payload.genre = this.genre
      if (this.search) payload.search = this.search
      if (this.sort) payload.sortBy = this.sort;
      
      payload.list_type = 'customers';

      this.fetchArtists(payload)
    },
    genre(newValue)
    {
      this.$store.commit('RESET_SONG_FILTER', {
        artist_type: this.artist_type,
        artist_genre: this.genre,
        rating: this.rating,
        sortBy: this.sort,
      })

      console.log('Genre filter: ', newValue)
      var payload = {}
      // this.$store.commit('setSongGenre', newValue)
      if (this.artist_type) payload.artist_type = this.artist_type
      if (newValue) payload.genre = newValue
      if (this.search) payload.search = this.search

      payload.list_type = 'customers';
      
      this.fetchArtists(payload)
    }
  }
}
</script>


  <style scoped></style>