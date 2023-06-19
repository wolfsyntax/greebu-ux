<template>
  <div>

    <section class="featured-artists">
      <div class="container">
        <h2>Company Featured Artists</h2>
        <p class="sub-heading">Collaborate with a professional independent artist to turn your story into one of a kind
          custom song.</p>

        <div class="trending">
          <h4>Trending Bicolano Artists</h4>
          <p>Trending Pop Artists</p>
        </div>

        <div id="trendingArtists" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item" v-for="(slide, index) in Math.ceil(trendingArtists.length / 3)" :key="index"
              :class="{ active: index === activeSlide }">
              <div class="row">
                <div class="col-4" v-for="(artist, itemIndex) in getSlideItems(index)" :key="itemIndex">
                  <div class="card">
                    <img :src="artist.image" class="card-img-top img-fluid" alt="Trending Artist" />
                    <div class="middle">
                      <a href="#"> View Profile</a>
                    </div>
                    <div class="card-body">
                      <div class="artist">
                        <h5 class="card-title">{{ artist.name }}</h5>
                        <h6 class="card-text">{{ artist.typeOfArtist }}</h6>
                        <p><img :src="artist.ratingImage"> {{ artist.ratings }} <span>({{ artist.reviews }}
                            reviews)</span></p>
                      </div>
                      <div class="audio-btn">
                        <div class="play-btn">
                          <div class="play-btn">
                            <div class="play-btn">
                              <i :class="{
                                'bi bi-play-circle-fill play-icon': !showControls || (showControls && currentIndex !== itemIndex),
                                'bi bi-pause-circle-fill play-icon': showControls && currentIndex === itemIndex
                              }" @click="toggleControls(itemIndex)"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> <!-- end of row -->
            </div>
          </div> <!-- end of carousel inner -->
          <div class="prev-next">
            <button class="carousel-control-prev" type="button" data-bs-target="#trendingArtists" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#trendingArtists" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div> <!-- end of carousel -->

        <!-- Popular Hip-Hop Artists -->
        <div class="trending">
          <h4>Popular Hip-Hop Artists</h4>
          <p>Trending Pop Artists</p>
        </div>
        <div id="HipHopArtists" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item" v-for="(slide, index) in Math.ceil(trendingArtists.length / 3)" :key="index"
              :class="{ active: index === activeSlide }">
              <div class="row">
                <div class="col-4" v-for="(artist, itemIndex) in getSlideItems(index)" :key="itemIndex">
                  <div class="card">
                    <img :src="artist.image" class="card-img-top img-fluid" alt="Trending Artist" />
                    <div class="middle">
                      <a href="#"> View Profile</a>
                    </div>
                    <div class="card-body">
                      <div class="artist">
                        <h5 class="card-title">{{ artist.name }}</h5>
                        <h6 class="card-text">{{ artist.typeOfArtist }}</h6>
                        <p><img :src="artist.ratingImage"> {{ artist.ratings }} <span>({{ artist.reviews }}
                            reviews)</span></p>
                      </div>
                      <div class="audio-btn">
                        <div class="play-btn">
                          <div class="play-btn">
                            <div class="play-btn">
                              <i :class="{
                                'bi bi-play-circle-fill play-icon': !showControls || (showControls && currentIndex !== itemIndex),
                                'bi bi-pause-circle-fill play-icon': showControls && currentIndex === itemIndex
                              }" @click="toggleControls(itemIndex)"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> <!-- end of row -->
            </div>
          </div> <!-- end of carousel inner -->
          <div class="prev-next">
            <button class="carousel-control-prev" type="button" data-bs-target="#HipHopArtists" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#HipHopArtists" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div> <!-- end of carousel -->

        <div class="button-wrapper">
          <a href="/artist" class="btn btn-primary btn-lg">EXPLORE ALL ARTIST</a>
        </div>



      </div> <!-- end of container -->

      <!-- hidden audio controls -->
      <div class="audio-controls-fixed" v-show="showControls">
        <div class="d-flex align-items-center audio-menu">
          <div class="artist">
            <div class="card">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="trendingArtists[currentIndex].image" class="img-fluid" alt="Artist Image" />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{{ trendingArtists[currentIndex].name }}</h5>
                    <p class="card-text">{{ trendingArtists[currentIndex].typeOfArtist }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="audio-controls">
            <audio ref="audioPlayer" controls style="display: none;"></audio>
            <div class="main-controls">
              <button @click="playPrevious" class="btn btn-primary prev"></button>
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

  </div>
</template>

<script>
export default {
  data()
  {
    return {
      trendingArtists: [
        {
          name: 'Idlepitch',
          typeOfArtist: 'Full Band Artist',
          genre: 'Rock',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649068/trending-bicolano-artist-1_igoz8j.png',
          ratings: 4.95,
          reviews: 234,
          ratingImage: './img/rating-star-small.svg'
        },
        {
          name: 'Melissa Go Melissa',
          typeOfArtist: 'Songwriter',
          genre: 'Hip-hop/Rap',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647609/MORE_THAN_WORDS_ti4mor.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649067/trending-bicolano-artist-2_ljhog8.png',
          ratings: 4.95,
          reviews: 230,
          ratingImage: './img/rating-star-small.svg'
        },
        {
          name: 'James Natividad',
          typeOfArtist: 'Solo Artist',
          genre: 'Pop',
          song: 'https://res.cloudinary.com/dmf10fesn/video/upload/v1548882863/audio/Post_Malone_-_Wow._playvk.com.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649066/trending-bicolano-artist-3_s0ocyh.png',
          ratings: 4.95,
          reviews: 229,
          ratingImage: './img/rating-star-small.svg'
        },
        {
          name: 'Kevin Flores',
          typeOfArtist: 'Duo Artist',
          genre: 'Reggae',
          song: 'https://res.cloudinary.com/dmf10fesn/video/upload/v1548887340/audio/Kwesi-Arthur-Chill-Prod-by-Dannyedtracks.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png',
          ratings: 4.95,
          reviews: 228,
          ratingImage: './img/rating-star-small.svg'
        },
        {
          name: 'Enter SandMan Enter SandMan Enter SandMan ',
          typeOfArtist: 'Trio Artist',
          genre: 'Metal',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647609/MORE_THAN_WORDS_ti4mor.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-5_lxhfkw.png',
          ratings: 4.91,
          reviews: 227,
          ratingImage: './img/rating-star-small.svg'
        },
        {
          name: 'Paolo Cruz',
          typeOfArtist: 'Full Band Artist',
          genre: 'R&B/Soul',
          song: 'https://res.cloudinary.com/dmf10fesn/video/upload/v1548884988/audio/Kendrick-Lamar-HUMBLE.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465778/samples/imagecon-group.jpg',
          rating: 4.90,
          reviews: 200,
          ratingImage: './img/rating-star-small.svg'
        },
        {
          name: 'Sarah Heart',
          typeOfArtist: 'Full Band Artist',
          genre: 'Country Rock',
          song: 'https://res.cloudinary.com/dmf10fesn/video/upload/v1548884577/audio/Drake_-_Gods_Plan_NaijaExclusive.net.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg',
          ratings: 4.90,
          reviews: 123,
          ratingImage: './img/rating-star-small.svg'
        },
        {
          name: 'Ricardo Sy',
          typeOfArtist: 'Songwriter',
          genre: 'Metal',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647623/Metallica_-_Nothing_Else_Matters_Official_Music_Video_gicqbe.mp3',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465774/samples/people/jazz.jpg',
          ratings: 4.90,
          reviews: 113,
          ratingImage: './img/rating-star-small.svg'
        }
      ],
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
      muted: false
    };
  },
  mounted()
  {
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
    playIconClass()
    {
      return this.isPlaying ? './img/play-pause.svg' : './img/play-black.svg';
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


    getSlideItems(index)
    {
      const slideStartIndex = index * 3;
      const slideEndIndex = slideStartIndex + 3;
      const slideItems = this.trendingArtists.slice(slideStartIndex, slideEndIndex);

      return slideItems;
    },

    playNext()
    {
      if (this.currentIndex < this.trendingArtists.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.activeSlide = Math.floor(this.currentIndex / 3);
      this.playSong(this.currentIndex);
    },

    playPrevious()
    {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.trendingArtists.length - 1;
      }
      this.activeSlide = Math.floor(this.currentIndex / 3);
      this.playSong(this.currentIndex);
    },

    playSong(index)
    {
      if (this.audioPlayer) {
        this.audioPlayer.src = this.trendingArtists[index].song;
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

<style scoped></style>
