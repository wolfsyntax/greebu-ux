<template>
  <layout>
    <section class="artist-banner">
      <div class="container-fluid">
          <div id="artistBanner" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="carousel-caption d-none d-md-block">
                <h2>EXPLORE our Community of artist</h2>
                <p>Custom tunes for any mood, and booking the best artists just got easier with our website!</p>
                <a href="/create-song" class="btn btn-primary btn-lg">Create a song</a>
              </div>
            </div>
            <div class="carousel-item">
              <div class="carousel-caption d-none d-md-block">
                <h2>EXPLORE our Community of artist</h2>
                <p>Custom tunes for any mood, and booking the best artists just got easier with our website!</p>
                <a href="/create-song" class="btn btn-primary btn-lg">Create a song</a>
              </div>
            </div>
            <div class="carousel-item">
              <div class="carousel-caption d-none d-md-block">
                <h2>EXPLORE our Community of artist</h2>
                <p>Custom tunes for any mood, and booking the best artists just got easier with our website!</p>
                <a href="/create-song" class="btn btn-primary btn-lg">Create a song</a>
              </div>
            </div>
            <div class="carousel-item">
              <div class="carousel-caption d-none d-md-block">
                <h2>EXPLORE our Community of artist</h2>
                <p>Custom tunes for any mood, and booking the best artists just got easier with our website!</p>
                <a href="/create-song" class="btn btn-primary btn-lg">Create a song</a>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#artistBanner" data-bs-slide="prev">
            <i class="material-icons"><span class="material-symbols-outlined prev">&#xE5CB;</span></i>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#artistBanner" data-bs-slide="next">
            <i class="material-icons"><span class="material-symbols-outlined next">&#xE5CC;</span></i>
          </button>
        </div>
      </div>
    </section>

    <section class="artists" id="artists">
      <div class="container">

        <div class="top-level-wrap">
          <h3 class="top-level-tite">Artists</h3>
          <p class="mb-0 sub-heading">Collaborate with a professional independent artist to turn your story into one-of-a-kind custom song</p>
        </div>

        <!-- <div class="row top-row">
          <div class="col-6">
            <a href="#" class="btn btn-primary filter"><i class="material-icons"><span class="material-symbols-outlined next">sort</span></i>Filter</a>
          </div>
          <div class="col-6">
            <div class="input-group">
              <input type="text" class="form-control" v-model="search" placeholder="Search artist by Name" aria-label="Search artist by Name" aria-describedby="button-addon2">
              <button class="btn btn-success border-rad" type="button" id="button-addon2">
                <i class="material-icons"><span class="material-symbols-outlined next">search</span></i>
              </button>
            </div>
          </div>
          <div class="col-3">
            <h5 class="artist-dropdown-filter">Type of Artist</h5>
            <select class="form-select" v-model="artist_type" aria-label="Default select example">
              <option value="" selected></option>
              <option v-for="artist_type in artist_types" :key="artist_type.id" :value="artist_type.id">
              {{  artist_type.title }}
              </option>
            </select>
          </div>
          <div class="col-3">
            <h5 class="artist-dropdown-filter">Music Genre </h5>
            <select class="form-select" v-model="genre" aria-label="Default select example">
              <option value="" selected></option>
              <option v-for="gen in genres" :key="gen.id" :value="gen.title">
                {{ gen.title }}
                </option> 
            </select>
          </div>
          <div class="col-3">
            <h5>Gender</h5>
            <select class="form-select" aria-label="Default select example">
              <option selected>Male</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-3">
            <h5>Availability</h5>
            <select class="form-select" aria-label="Default select example">
              <option selected>Available</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div> -->

        <FilterResults>
          <template #top-filter>
              <div>
                <button class="border-0 d-flex align-items-center btn filter-btn">
                  <span class="material-symbols-rounded sort-icon">&#xe164;</span>
                  Filter
                </button>
              </div>

              <div class="search">
                <input type="text" class="form-control" placeholder="Search artists" v-model="search" aria-label="Search artists" aria-describedby="button-addon2">
                <button class="btn border-0 search-btn">
                  <span class="material-symbols-rounded search-icon">&#xe8b6;</span>
                </button>
              </div>
          </template>

          <template #bottom-filter>
            <div class="form-group">
              <label>Type of Event</label>
              <select class="form-select" v-model="artist_type" aria-label="Default select example">
                <option value="" selected></option>
                <option v-for="artist_type in artist_types" :key="artist_type.id" :value="artist_type.id">
                {{  artist_type.title }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Location</label>
              <select class="form-select" v-model="genre" aria-label="Default select example">
                <option value="" selected></option>
                <option v-for="gen in genres" :key="gen.id" :value="gen.title">
                  {{ gen.title }}
                  </option> 
              </select>
            </div>

            <div class="form-group">
              <label>Location</label>
              <select class="form-select" aria-label="Default select example">
                <option value="" selected>&emsp;</option>
                <option>Naga City</option>
                <option>Legazpi City</option>
              </select>
            </div>

          </template>
          </FilterResults>

    

        <!-- Show Artists -->
        <div id="ShowArtists" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item" v-for="(slide, index) in artists" :key="index"
              :class="{ active: index === activeSlide }">
              <!-- <div class="carousel-item"> -->
              <div class="row">
                <div class="col-3" v-for="(artist, itemIndex) in artists" :key="itemIndex">
                  <card :artist="artist" @play="playButton" :cardIndex="itemIndex"/>
                </div>
              </div> 
            </div>
          </div> 
        </div> 

        <!-- Show this button if there are more than 12 entries -->

        <div class="button-wrapper">
          <button class="btn btn-primary see-more-btn">SEE MORE ARTIST</button>
        </div>
                                                          
      </div> <!-- end of container  -->   
      
       <!-- hidden audio controls -->
       <div class="audio-controls-fixed" v-show="showControls">
        <div class="d-flex align-items-center audio-menu">
          <div class="artist">
            <div class="card">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="artist?.avatar" class="img-fluid" alt="Artist Image" />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{{ artist?.artist_name }}</h5>
                    <p class="card-text">{{ artist?.artist_type }}</p>
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
                <img :src="playIconClass">
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
    </section>
    <reminder />
    <faq />
  </layout>
</template>

<script>

import Layout from '/src/components/Layouts/Layout.vue';
import Reminder from '/src/components/Home/Reminder.vue';
import Card from '/src/components/Artist/Card.vue';
import Faq from '/src/components/Home/FAQ.vue';
import FilterResults from "/src/components/FilterResults.vue";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    layout: Layout,
    faq: Faq,
    reminder: Reminder,
    card: Card,
    FilterResults
  },
  setup()
  {

  },
  data()
  {
    return {
      showArtists: [
        {
          id: 1,
          name: 'Idlepitch',
          typeOfArtist: 'Full Band Artist',
          genre: 'Rock',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
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
      progressBarWidth: '0%',
      showVolumeSlider: false,
      currentVolume: 100,
      showVolumeSlider: true,
      muted: false,

      artist_type: null,
      genre: null,
      search: '',
      artist: null,
      artistIndex: 0,
    };
  },
  mounted()
  {
    this.SET_FILTERED_ARTIST({});
    //this.$store.commit('CLEAR_ARTIST')
    this.artistOptions()

    var payload = {}
    if (this.artist_type) payload.artist_type = this.artist_type
    if (this.genre) payload.genre = this.genre
    if (this.search) payload.search = this.search
    
    this.fetchArtists(payload)
      .then(response =>
      {
        console.log('Artist.vue: ', response);
      })
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
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      artists: (state) => state.artist.artists,
      artist_types: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genreList,
      filterArtist: state => state.artist.filterArtist,
    }),
    playIconClass()
    {
      return this.isPlaying ? 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321874/play-pause_ofcx4e.svg' : 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321874/play-black_ftgyx3.svg';
    },
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

  },
  methods: {
    ...mapActions([
      'fetchArtists', 'artistOptions',
    ]),
    ...mapMutations([
      'SET_FILTERED_ARTIST'
    ]),
    playButton(val, cardIndex)
    {

      this.artist = val;

      if (this.audioPlayer) {
        console.log('audioPlayer is initialized')
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
    playNext()
    {
      if (this.currentIndex < this.artists.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      // this.activeSlide = Math.floor(this.currentIndex / 6);
      this.SET_FILTERED_ARTIST(this.artists[this.currentIndex]);
      this.playSong();
    },

    playPrevious()
    {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.artists.length - 1;
      }
      // this.activeSlide = Math.floor(this.currentIndex / 6);
      this.SET_FILTERED_ARTIST(this.artists[this.currentIndex]);

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
    toggleMute()
    {
      if (this.audioPlayer) {
        this.audioPlayer.muted = !this.audioPlayer.muted;
        this.isMuted = this.audioPlayer.muted;
      }
    },
    formatTime(time)
    {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    },

    updateProgressBar()
    {
      const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
      this.progressBarWidth = `${progress}%`;
    },
    updateVolume()
    {
      if (this.audioPlayer) {
        this.audioPlayer.volume = this.currentVolume / 100;
      }
    },
    toggleMute()
    {
      if (this.currentVolume === 0) {
        this.currentVolume = this.previousVolume;
      } else {
        this.previousVolume = this.currentVolume;
        this.currentVolume = 0;
      }
    },


  },

  watch: {
    showControls(val)
    {
      this.currentTime = '0:00';
      this.duration = '0:00';
      this.progressBarWidth = '0%';
    },
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
    currentVolume()
    {
      this.updateVolume();
    },
    search(newValue)
    {
      var payload = {}
      if (this.artist_type) payload.artist_type = this.artist_type
      if (this.genre) payload.genre = this.genre
      if (newValue) payload.search = newValue

      this.fetchArtists(payload)
    },
    artist_type(newValue)
    {
      var payload = {}
      if (newValue) payload.artist_type = newValue
      if (this.genre) payload.genre = this.genre
      if (this.search) payload.search = this.search
      this.fetchArtists(payload)
    },
    genre(newValue)
    {
      var payload = {}
      if (this.artist_type) payload.artist_type = this.artist_type
      if (newValue) payload.genre = newValue
      if (this.search) payload.search = this.search

      this.fetchArtists(payload)
    }
  }
};
</script>