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

    <div class="tab-content">

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
            <div class="position-relative cover-img-wrap mb-3">
              <img :src="song.image" class="song-img" alt="Song cover image">

              <div class="m-0 play-wrap">
                <button class="btn p-0" @click="togglePlay(song)">
        <span class="material-symbols-sharp play-icon" v-if="!isPlaying(song)">&#xe037;</span>
        <span class="material-symbols-sharp pause-icon" v-else>&#xe034;</span>
      </button>
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

      <div v-else-if="activeItem === 'Album'" class="tab-pane">
        <h3>Album</h3>
      </div>

      <div v-else-if="activeItem === 'Covered Songs'" class="tab-pane">
        <h3>Covered Songs</h3>
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
        music: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411951/please-forgive-me-bryan-adams_bnyj1o.mp3',
        likes: 0
      },
      {
        id: 2,
        artistId: 2,
        image: '/assets/artist-account/song-cover2.webp',
        song_name: 'Smells like teen spirit',
        music: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
        likes: 23
      },
      
    ],
    likedSongs: [],
    audioPlayers: {}, // Object to store audio players for each song
    playingSongId: null, // Store the currently playing song ID
   
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
