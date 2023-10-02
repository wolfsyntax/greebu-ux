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

          <div class="songs-wrap" v-for="song in origSongArray" :key="song">
            <img :src="song.image" class="song-img" alt="Song cover image">

            <div class="d-flex align-items-center justify-content-between">

              <div>
                <h5 class="song-name">{{ song.song_name }}</h5>
                <div>
                  <p class="mb-0 release">Latest Release - Album</p>
                </div>
              </div>

              <div>
                <button class="p-0 d-flex align-items-center btn likes" @click="toggleLike">
                  <span class="material-symbols-outlined heart-icon"
                  :style="{ color: isClicked ? '#FF6B00' : '' }">
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
  data: () => ({
    modalType: 'song',
    isClicked: false,

    navItems: ['Original Songs', 'Album', 'Covered Songs'],
    activeItem: 'Original Songs',
    origSongArray: [
      {
        image: '/assets/artist-account/song-cover1.webp',
        song_name: 'Loving You',
        likes: 23
      },
      {
        image: '/assets/artist-account/song-cover2.webp',
        song_name: 'Loving In Stereo',
        likes: 23
      },
      {
        image: '/assets/artist-account/song-cover1.webp',
        song_name: 'Loving In Stereo',
        likes: 23
      },
      {
        image: '/assets/artist-account/song-cover2.webp',
        song_name: 'Loving In Stereo',
        likes: 23
      },
      {
        image: '/assets/artist-account/song-cover1.webp',
        song_name: 'Loving In Stereo',
        likes: 23
      },
      {
        image: '/assets/artist-account/song-cover2.webp',
        song_name: 'Loving In Stereo',
        likes: 23
      },
      {
        image: '/assets/artist-account/song-cover1.webp',
        song_name: 'Loving In Stereo',
        likes: 23
      },
      {
        image: '/assets/artist-account/song-cover2.webp',
        song_name: 'Loving In Stereo',
        likes: 23
      },
    ]

  }),
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    toggle(type = 'song') {

      this.modelType = type;

      new Modal(document.getElementById('albumSongInfo'), {
        keyboard: false
      }).show();

    },
    toggleLike(){
      this.isClicked = !this.isClicked;
      console.log(this.isClicked);
    }
    
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    ...mapGetters(['isLoggedIn',])
  },
  setup() {


    return {}
  },
  mounted() {

  }
}
</script>

<style scoped>
@import '@/assets/css/artist-ui.css';
</style>
