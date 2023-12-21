<template>
  <layout>

    <section class="library">
      <div class="container">

        <div class="d-flex align-items-center justify-content-between top-wrapper">
            <h2 class="mb-0 top-level-title">Library</h2>
            <button class="d-flex align-items-center upload-song" @click="toggle()">
              <span class="material-symbols-outlined upload-icon">&#xf09b;</span>
              Upload Song</button>
      <!-- <button class="btn btn-primary btn-lg" @click="toggle('album')">Upload Song</button> -->
      </div>

      <ul class="nav nav-tabs">
        <li
          v-for="item in navItems"
          :key="item"
          :class="{ 'active': activeItem === item }"
          @click="activeItem = item">
          {{ item }}
          <!-- <span class="total" v-if="item === 'Original Songs' && origSongArray.length > 0">{{ origSongArray.length }}</span> -->
        </li>
      </ul>


      <div v-if="activeItem === 'Original Songs'" class="tab-pane active">

        <NoLibrary :title="NoSongsBoxTitle" :NoNoSongsBoxBtn="true" v-if="origSongArray.length === 0" />

        <div class="row songs-row-wrap" v-else>

          <div class="songs-wrap" v-for="song in origSongArray" :key="song.id">
            <div class="position-relative cover-img-wrap mb-3" 
            @mouseover="mouseOver(song.id)" @mouseleave="mouseLeave(song.id)">
              <img :src="song.image" class="song-img" alt="Song cover image">

              <div class="m-0 play-wrap">

                <button class="btn p-0" @click="togglePlay(song)" v-if="showPlayButton[song.id]">
                  <span class="material-symbols-sharp play-icon" v-if="!isPlaying(song)">&#xe037;</span>
                  <span class="material-symbols-sharp pause-icon" v-else>&#xe034;</span>
                </button>
                 <!-- Display the animated GIF when the song is playing and not mouseover  -->
                <img
                src="/assets/artist-account/animated-song-play.gif"
                class="animated-song-play"
                alt="Animated song play"
                v-if="isPlaying(song) && !showPlayButton[song.id]">

              </div>

            </div>

            <div class="d-flex align-items-center justify-content-between">

              <div>
                <h5 class="song-name">{{ song.song_name }}</h5>
                <div>
                  <p class="mb-0 release">Latest Release - Album</p>
                </div>
              </div>

              <div>
                <button class="p-0 d-flex align-items-center btn likes" @click="toggleLike(song)">
                  <span class="material-symbols-outlined heart-icon"
                  :style="{ color: isLiked(song.id) ? '#FF6B00' : '#B8BBCF' }">
                  &#xe87d;</span>
                  {{ song.likes }}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div> <!-- end of Original Songs tab-->

      <div v-else-if="activeItem === 'Album'" class="tab-pane">

        <NoLibrary :title="NoSongsBoxTitle" :NoNoSongsBoxBtn="true" v-if="origSongArray.length === 0" />

        <div class="row-album" v-if="showAlbums">
            <div class="card-album" @click="showSongList" v-for="album in MyAlbum">
              <img :src="album.image" class="album-img" alt="album cover image">
              <div class="album-wrap">
                <h4 class="album-title two-lines">{{ album.album_name }}</h4>
                  <p class="mb-0 d-flex align-items-center album-year">{{ album.date_released }}<span class="material-symbols-rounded dot-icon">&#xe061;</span>Album</p>
              </div>
            </div>
        </div>

        <div class="song-list-wrap" v-if="showSongAlbums">

          <div class="d-flex align-items-start justify-content-between active-song-wrap">

              <div class="d-flex align-items-start song-details-wrap">
                <div>
                  <img src="/assets/artist-account/song-cover-img.webp" class="album-img" alt="song cover image">
                </div>

                <div class="text-start">
                    <div class="title-wrap">
                      <h3 class="song-title">Music Garden</h3>
                      <h4 class="mb-0 band-name">Idlepitch</h4>
                    </div>

                    <div>
                      <p class="description">Lorem ipsum dolor sit amet consectetur. Egestas mattis lectus ut nunc id fringilla. Nunc est aliquet lorem augue 
                        accumsan massa neque elementum. Urna bibendum sed in odio purus laoreet velit pellentesque malesuada. </p>
                        
                      <div class="d-flex align-items-center song-action-btn">
                        <button class="btn play-btn"><span class="material-symbols-sharp">&#xe1c4;</span>Play</button>
                        <button class="btn add-btn"><span class="material-symbols-sharp">&#xe145;</span>Add Song</button>
                      </div>

                    </div>
                </div>

              </div>

              <div>
                <button class="btn d-flex align-items-center more-btn">
                  <span class="material-symbols-rounded more-icon">&#xe5d3;</span>
                </button>
              </div>
          </div> <!-- end of active song wrap -->

          <div class="song-wrap-tbl">

            <div class="row-title-tbl">
              <div>Title of Song</div>
              <div class="">Album</div>
              <div class="">Genre</div>
              <div class="">Time</div>
              <div class="">Likes</div>
            </div>

            <div class="row-content-tbl">
              
                <div class="d-flex align-items-center song-details-wrap-col">
                  <div>
                    <img src="/assets/artist-account/song-cover1.webp" class="artist-song-cover" alt="artist image">
                  </div>
                  <div class="text-start">
                    <h5 class="two-lines artist-song">You are the one</h5>
                    <p class="mb-0 two-lines artist-band">Idlepitch</p>
                  </div>
                </div>
              
                <div>
                  <h5 class="mb-0 album-name">Golden age of 80s</h5>
                </div>
              
                <div>
                  <button type="button" class="btn btn-primary p-0 border-0 genre-btn">
                    <span class="badge song-genre">Country Rock</span>
                  </button>
                </div>
              
                <div>
                  <h6 class="mb-0 song-duration">2:45</h6>
                </div>
             
                <div>
                  <div class="tbl-likes-wrap">
                    <button class="btn d-flex align-items-center p-0 border-0 likes-btn">
                      <span class="material-symbols-sharp heart-icon">&#xe87d;</span>
                      238
                    </button>
                  </div>
                </div>
              
            </div> <!--end of row-content-tbl -->

            <div class="row-content-tbl">
              
              <div class="d-flex align-items-center song-details-wrap-col">
                <div>
                  <img src="/assets/artist-account/song-cover1.webp" class="artist-song-cover" alt="artist image">
                </div>
                <div class="text-start">
                  <h5 class="two-lines artist-song">You are the one</h5>
                  <p class="mb-0 two-lines artist-band">Idlepitch</p>
                </div>
              </div>
            
              <div>
                <h5 class="mb-0 album-name">Golden age of 80s</h5>
              </div>
            
              <div>
                <button type="button" class="btn btn-primary p-0 border-0 genre-btn">
                  <span class="badge song-genre">Country Rock</span>
                </button>
              </div>
            
              <div>
                <h6 class="mb-0 song-duration">2:45</h6>
              </div>
           
              <div>
                <div class="tbl-likes-wrap">
                  <button class="btn d-flex align-items-center p-0 border-0 likes-btn">
                    <span class="material-symbols-sharp heart-icon">&#xe87d;</span>
                    238
                  </button>
                </div>
              </div>
            
          </div> <!--end of row-content-tbl -->

          </div>

          <div id="carouselOtherAlbums" class="carousel slide">
            <div class="carousel-inner">
              <div class="d-flex align-items-center justify-content-between top-wrap">
                <div>
                  <h3 class="mb-0 other-albums">Other Albums</h3>
                </div>
                <div>
                  <button class="prev-btn" type="button" data-bs-target="#carouselOtherAlbums" data-bs-slide="prev">
                    <span class="material-symbols-sharp prev-icon">&#xe8e4;</span>
                  </button>
                  <button class="next-btn" type="button" data-bs-target="#carouselOtherAlbums" data-bs-slide="next">
                    <span class="material-symbols-sharp next-icon">&#xe8e4;</span>
                  </button>
                </div>
              </div>
              <div class="carousel-item" v-for="(album, index) in Math.ceil(MyAlbum.length / 5)" :key="index"
              :class="{ active: index === activeSlide }">
                <div class="card-album" v-for="(album, itemIndex) in getSlideItems(index)" :key="itemIndex">
                  <img :src="album.image" class="album-img" alt="album cover image">
                  <div class="album-wrap">
                    <h4 class="album-title two-lines">{{ album.album_name }}</h4>
                      <p class="mb-0 d-flex align-items-center album-year">{{ album.date_released }}<span class="material-symbols-rounded dot-icon">&#xe061;</span>Album</p>
                  </div>
              </div>
              </div>
            </div>
          </div> <!-- end of carousel slide -->

        </div>
        
      </div>

      <div v-else-if="activeItem === 'Covered Songs'" class="tab-pane">

        <!-- <NoLibrary :title="NoSongsBoxTitle" :NoNoSongsBoxBtn="true" v-if="origSongArray.length === 0" /> -->

         <div class="row songs-row-wrap">

          <div class="songs-wrap" v-for="song in origSongArray" :key="song.id">
            <div class="position-relative cover-img-wrap mb-3" 
            @mouseover="mouseOver(song.id)" @mouseleave="mouseLeave(song.id)">
              <img :src="song.image" class="song-img" alt="Song cover image">

              <div class="m-0 play-wrap">

                <button class="btn p-0" @click="togglePlay(song)" v-if="showPlayButton[song.id]">
                  <span class="material-symbols-sharp play-icon" v-if="!isPlaying(song)">&#xe037;</span>
                  <span class="material-symbols-sharp pause-icon" v-else>&#xe034;</span>
                </button>
                <!-- Display the animated GIF when the song is playing and not mouseover -->
                <img
                src="/assets/artist-account/animated-song-play.gif"
                class="animated-song-play"
                alt="Animated song play"
                v-if="isPlaying(song) && !showPlayButton[song.id]">

              </div>

            </div>

            <div class="d-flex align-items-center justify-content-between">

              <div>
                <h5 class="song-name">{{ song.song_name }}</h5>
                <div>
                  <p class="mb-0 release">Latest Release - Album</p>
                </div>
              </div>

              <div>
                <button class="p-0 d-flex align-items-center btn likes" @click="toggleLike(song)">
                  <span class="material-symbols-outlined heart-icon"
                  :style="{ color: isLiked(song.id) ? '#FF6B00' : '#B8BBCF' }">
                  &#xe87d;</span>
                  {{ song.likes }}
                </button>
              </div>

            </div>
          </div>
        </div>
  
      </div>

   

    </div>
    </section>

    <info-modal :usage="modelType" />
  </layout>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import InfoModal from '@/components/Artist/Library/InfoModal.vue';
import Layout from '/src/components/Layouts/Layout.vue';
import { Modal } from "bootstrap";
import NoLibrary from '/src/components/NoLibrary.vue';

export default {
  components: {
    InfoModal,
    layout: Layout,
    NoLibrary
  },
  data()
  {
    return {
      modalType: 'song',

    navItems: ['Original Songs', 'Album', 'Covered Songs'],
    activeItem: 'Original Songs',
    origSongArray: [
      {
        id: 1,
        artistId: 1,
        image: '/assets/artist-account/song-cover1.webp',
        song_name: 'Please forgive me',
        music: 'https://res.cloudinary.com/daorvtlls/video/upload/v1697615328/Siakol___Tropa_Lyrics_Dina_Tayo_pabata_hanggat_Hindi_nahahalata___Siakolsonglyrics_tropalyrics_ndrbhu.mp4',
        likes: 0
      },
      {
        id: 2,
        artistId: 2,
        image: '/assets/artist-account/song-cover2.webp',
        song_name: 'Smells like teen spirit',
        music: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411546/rivermaya-elesi_xj8lcy.mp3',
        likes: 23
      },
      
    ],
    NoSongsBoxTitle: 'No Song Uploaded',


    likedSongs: [],
    audioPlayers: {}, // Object to store audio players for each song
    playingSongId: null, // Store the currently playing song ID
    showPlayButton: {}, // Object to store the visibility of the play button

    showAlbums: true,
    showSongAlbums: false,

    MyAlbum: [
      {id: 1, image: '/assets/artist-account/album-default-cover.webp', album_name: 'Album Title', date_released: 2014},
      {id: 2, image: '/assets/artist-account/album-default-cover.webp', album_name: '2000s Hits', date_released: 2004},
      {id: 3, image: '/assets/artist-account/album-default-cover.webp', album_name: '2010s Hits', date_released: 2010},
      {id: 4, image: '/assets/artist-account/album-default-cover.webp', album_name: 'Album Title', date_released: 2014},
      {id: 5, image: '/assets/artist-account/album-default-cover.webp', album_name: '2000s Hits', date_released: 2004},
      {id: 6, image: '/assets/artist-account/album-default-cover.webp', album_name: '2010s Hits', date_released: 2010},
      {id: 7, image: '/assets/artist-account/album-default-cover.webp', album_name: 'Album Title', date_released: 2014},
      {id: 8, image: '/assets/artist-account/album-default-cover.webp', album_name: '2000s Hits', date_released: 2004},
      {id: 9, image: '/assets/artist-account/album-default-cover.webp', album_name: '2010s Hits', date_released: 2010},
      {id: 10, image: '/assets/artist-account/album-default-cover.webp', album_name: '1990s Hits', date_released: 1999},
    ],
    activeSlide: 0
   
    }
  },

  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    toggle(type = 'song') {

      this.modelType = type;

      new Modal(document.getElementById('albumSongInfo'), {
        keyboard: false
      }).show();

    },
    toggleLike(song) {
      const likedIndex = this.likedSongs.findIndex((liked) => liked.songId === song.id);

      if (likedIndex === -1) {
        // If the song is not liked yet, add it to the likedSongs array
        this.likedSongs.push({ songId: song.id });
        song.likes++;
      } else {
        // If the song is already liked, remove it from the likedSongs array and decrease the likes
        this.likedSongs.splice(likedIndex, 1);
        song.likes--;
      }
    },
    isLiked(songId) {
      return this.likedSongs.some((liked) => liked.songId === songId);
    },
    togglePlay(song) {
      if (this.playingSongId === song.id) {
        // If the clicked song is already playing, pause it
        const audioPlayer = this.audioPlayers[song.id];
        audioPlayer.pause();
        this.playingSongId = null;
      } else {
        // If a different song is playing, pause it first (if any)
        if (this.playingSongId !== null) {
          const previouslyPlayingAudio = this.audioPlayers[this.playingSongId];
          previouslyPlayingAudio.pause();
        }

        // Create or retrieve the audio player for the clicked song
        if (!this.audioPlayers[song.id]) {
          this.audioPlayers[song.id] = new Audio(song.music);
        }

        // Start playing the clicked song
        const audioPlayer = this.audioPlayers[song.id];
        audioPlayer.play();
        this.playingSongId = song.id;
      }
    },
    isPlaying(song) {
      return this.playingSongId === song.id;
    },
    mouseOver(songId) {
      this.showPlayButton = {
        ...this.showPlayButton,
        [songId]: true,
      };
    },
    mouseLeave(songId) {
      this.showPlayButton = {
        ...this.showPlayButton,
        [songId]: false,
      };
    },
    showSongList(){
      this.showAlbums = false;
      this.showSongAlbums = true;
    },
    getSlideItems(index)
    {
      const slideStartIndex = index * 5;
      const slideEndIndex = slideStartIndex + 5;
      const slideItems = this.MyAlbum.slice(slideStartIndex, slideEndIndex);

      return slideItems;
    },

    
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    ...mapGetters(['isLoggedIn',]),
  },
  mounted() {
  },
  
}
</script>

<style scoped>
@import '@/assets/css/artist-ui.css';
</style>
