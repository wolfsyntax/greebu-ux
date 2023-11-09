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

        <div class="text-center no-song-uploaded-wrap" v-if="origSongArray.length === 0">
          <div class="no-song-uploaded">
            <svg class="empty" xmlns="http://www.w3.org/2000/svg" width="100" height="99" viewBox="0 0 100 99" fill="none">
            <path d="M80.9085 35.7125H19.2172L6.6875 58.2002V86.2663H93.4285V58.2002L80.9085 35.7125ZM61.0795 58.4516C61.0795 64.5327 56.1488 69.4634 50.058 69.4634C43.9672 69.4634 39.0365 64.5327 39.0365 58.4516H11.8599L21.8952 39.309H78.2111L88.2465 58.4516H61.0795ZM49.0525 12.6641H52.8327V26.2572H49.0525V12.6641ZM23.3991 19.4125L26.072 16.7396L35.6838 26.3513L33.0108 29.0243L23.3991 19.4125ZM65.0382 26.3575L74.6499 16.7457L77.3229 19.4187L67.7112 29.0304L65.0382 26.3575Z" fill="#ABADC6"/>
          </svg>
          <h5>No Song Uploaded</h5>
          <button class="d-flex align-items-center upload-song" @click="toggle()">
            <span class="material-symbols-outlined upload-icon">&#xf09b;</span>
            Upload Song</button>
          </div>
        </div>

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

      </div> <!-- end of Original Songs tab-->

      <div v-else-if="activeItem === 'Album'" class="tab-pane">
        <!-- No Song Uploaded -->
        <!-- <div class="text-center no-song-uploaded-wrap">
          <div class="no-song-uploaded">
            <svg class="empty" xmlns="http://www.w3.org/2000/svg" width="100" height="99" viewBox="0 0 100 99" fill="none">
            <path d="M80.9085 35.7125H19.2172L6.6875 58.2002V86.2663H93.4285V58.2002L80.9085 35.7125ZM61.0795 58.4516C61.0795 64.5327 56.1488 69.4634 50.058 69.4634C43.9672 69.4634 39.0365 64.5327 39.0365 58.4516H11.8599L21.8952 39.309H78.2111L88.2465 58.4516H61.0795ZM49.0525 12.6641H52.8327V26.2572H49.0525V12.6641ZM23.3991 19.4125L26.072 16.7396L35.6838 26.3513L33.0108 29.0243L23.3991 19.4125ZM65.0382 26.3575L74.6499 16.7457L77.3229 19.4187L67.7112 29.0304L65.0382 26.3575Z" fill="#ABADC6"/>
          </svg>
          <h5>No Song Uploaded</h5>
          <button class="d-flex align-items-center upload-song" @click="toggle()">
            <span class="material-symbols-outlined upload-icon">&#xf09b;</span>
            Upload Song</button>
          </div>
        </div> -->

        <div class="row-album" v-if="showAlbums">

            <div class="card-album" @click="showSongList">
              <img src="/assets/artist-account/album-default-cover.webp" class="album-img" alt="album cover image">
              <div class="album-wrap">
                <h4 class="album-title two-lines">Album Title</h4>
                  <p class="mb-0 d-flex align-items-center album-year">2014<span class="material-symbols-rounded dot-icon">&#xe061;</span>Album</p>
              </div>
            </div>
            <div class="card-album" @click="showSongList">
              <img src="/assets/artist-account/album-default-cover.webp" class="album-img" alt="album cover image">
              <div class="album-wrap">
                <h4 class="album-title two-lines">Album Title</h4>
                  <p class="mb-0 d-flex align-items-center album-year">2014<span class="material-symbols-rounded dot-icon">&#xe061;</span>Album</p>
              </div>
            </div>

        </div>

        <div class="song-list-wrap" v-else>

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

          <table class="table">
                <thead class="tr-top-wrap">
                    <tr>
                    <th scope="col">Title of Song</th>
                    <th scope="col">Album</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Time</th>
                    <th scope="col">Likes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>06c1774-7f3d...</td>
                        <td>Monthly</td>
                        <td>10/24/23</td>
                        <td>₱2,500.00</td>
                        <td>₱2,500.00</td>
                       
                    </tr>
                </tbody>
            </table>

        </div>
        
        
        
      </div>

      <div v-else-if="activeItem === 'Covered Songs'" class="tab-pane">
        <h3>Covered Songs</h3>
  
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

export default {
  components: {
    InfoModal,
    layout: Layout,
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
    likedSongs: [],
    audioPlayers: {}, // Object to store audio players for each song
    playingSongId: null, // Store the currently playing song ID
    showPlayButton: {}, // Object to store the visibility of the play button

    showAlbums: true,
   
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
    }

    
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
