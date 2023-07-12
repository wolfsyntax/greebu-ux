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

    <section class="artists">
      <div class="container">

        <h3>Artists</h3>
        <p>Collaborate with a professional independent artist to turn your story into one-of-a-kind custom song</p>
        <div class="row top-row">
          <div class="col-6">
            <a href="#" class="btn btn-primary filter"><i class="material-icons"><span class="material-symbols-outlined next">sort</span></i>Filter</a>
          </div>
          <div class="col-6">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search artist by Name" aria-label="Search artist by Name" aria-describedby="button-addon2">
              <button class="btn btn-success border-rad" type="button" id="button-addon2">
                <i class="material-icons"><span class="material-symbols-outlined next">search</span></i>
              </button>
            </div>
          </div>
          <div class="col-3">
            <h5>Type of Artist</h5>
            <select class="form-select" aria-label="Default select example">
              <option v-for="artist_type in artist_types" :key="artist_type.id">
              {{  artist_type.title }}
              </option>
            </select>
          </div>
          <div class="col-3">
            <h5>Music Genre</h5>
            <select class="form-select" aria-label="Default select example">
              <option v-for="{title, id} in genres" :key="id">
                {{ title }}
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
        </div>

        <!-- Show Artists -->
        <div id="ShowArtists" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item" v-for="(slide, index) in showArtists" :key="index"
              :class="{ active: index === activeSlide }">
              <div class="row">
                <div class="col-4" v-for="(artist, itemIndex) in artists" :key="itemIndex">
                  <card :artist="artist" />
                </div>
              </div> <!-- end of row -->
            </div>
          </div> <!-- end of carousel inner -->
        </div> <!-- end of carousel -->

        <div class="button-wrapper">
          <a href="/artist" class="btn btn-primary btn-lg">EXPLORE ALL ARTIST</a>
        </div>
                                                          
      </div> <!-- end of container  -->   
      
       <!-- hidden audio controls -->
       <div class="audio-controls-fixed" v-show="showControls">
        <div class="d-flex align-items-center audio-menu">
          <div class="artist">
            <div class="card">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="showArtists[currentIndex].image" class="img-fluid" alt="Artist Image" />
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

    </section>
    <reminder />
    <faq />
  </layout>
</template>

<script>
import Layout from '@/components/Layouts/Layout.vue';
import Reminder from '@/components/Home/Reminder.vue';
import Card from '@/components/Artist/Card.vue';
import Faq from '@/components/Home/FAQ.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    layout: Layout,
    faq: Faq,
    reminder: Reminder,
    card: Card,
  },
  setup()
  {

  },
  data()
  {
    return {
      showArtists: [
        {
          name: 'Idlepitch',
          typeOfArtist: 'Full Band Artist',
          genre: 'Rock',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649068/trending-bicolano-artist-1_igoz8j.png',
          ratings: 4.95,
          reviews: 234,
        },
        {
          name: 'Dante Magno',
          typeOfArtist: 'Songwriter',
          genre: 'Hip-hop/Rap',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647609/MORE_THAN_WORDS_ti4mor.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649067/trending-bicolano-artist-2_ljhog8.png',
          ratings: 4.95,
          reviews: 230,
        },
        {
          name: 'James Natividad',
          typeOfArtist: 'Solo Artist',
          genre: 'Pop',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411555/the-script-the-man-who-cant-be-moved_ajmg2q.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649066/trending-bicolano-artist-3_s0ocyh.png',
          ratings: 4.95,
          reviews: 229,
        },
        {
          name: 'Kevin Flores',
          typeOfArtist: 'Duo Artist',
          genre: 'Reggae',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411551/white-lion-till-death-do-us-part_hj97pv.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png',
          ratings: 4.95,
          reviews: 228,
        },
        {
          name: 'Mark Escueta Mike Elgar Nathan Azarcon',
          typeOfArtist: 'Trio Artist',
          genre: 'Metal',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411546/rivermaya-elesi_xj8lcy.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-5_lxhfkw.png',
          ratings: 4.91,
          reviews: 227,
        },
        {
          name: 'The Emps',
          typeOfArtist: 'Full Band Artist',
          genre: 'R&B/Soul',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411536/thinking-out-loud_-ed-sheeran_abhtbv.mp4',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465778/samples/imagecon-group.jpg',
          rating: 4.90,
          reviews: 200,
        },
        {
          name: 'Sarah Heart',
          typeOfArtist: 'Solo Artist',
          genre: 'Country Rock',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411951/please-forgive-me-bryan-adams_bnyj1o.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg',
          ratings: 4.90,
          reviews: 123,
        },
        {
          name: 'Ricardo Sy',
          typeOfArtist: 'Songwriter',
          genre: 'Metal',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411918/total-eclipse-of-the-heart_d6wjes.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465774/samples/people/jazz.jpg',
          ratings: 4.90,
          reviews: 113,
        },
        {
          name: 'GG Artists',
          typeOfArtist: 'Full Band Artist',
          genre: 'Metal',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411869/merrow-rock-skyline-pigeon-elton-john_h0chm4.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687096461/our-team-slider-1_rqwdxm.webp',
          ratings: 4.90,
          reviews: 113,
        }
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
      query: {
        type: 'Solo Artist',
      }
    };
  },
  mounted()
  {
    this.artistOptions()
    this.fetchArtists({
      type: '', genre: '', availability: '',
      language: '',
      city: '', province: '',
      page: '', per_page: 9,
      filterBy: '', sortBy: '', search: '',
    })
      .then(response =>
      {
        console.log('Artist.vue: ', response)
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
      genres: (state) => state.artist.genres,
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
    toggleControls(index)
    {
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


    // getSlideItems(index)
    // {
    //   const slideStartIndex = index * 6;
    //   const slideEndIndex = slideStartIndex + 6;
    //   const slideItems = this.showArtists.slice(slideStartIndex, slideEndIndex);

    //   return slideItems;
    // },

    playNext()
    {
      if (this.currentIndex < this.showArtists.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      // this.activeSlide = Math.floor(this.currentIndex / 6);
      this.playSong(this.currentIndex);
    },

    playPrevious()
    {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.showArtists.length - 1;
      }
      // this.activeSlide = Math.floor(this.currentIndex / 6);
      this.playSong(this.currentIndex);
    },

    playSong(index)
    {
      if (this.audioPlayer) {
        this.audioPlayer.src = this.showArtists[index].song;
        this.audioPlayer.load();
        this.audioPlayer.play();
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
    currentVolume()
    {
      this.updateVolume();
    },
  }
};
</script>