<template>
  
  <div class="text-center no-song-uploaded-wrap">
    <div class="no-song-uploaded">
      <svg class="empty" xmlns="http://www.w3.org/2000/svg" width="100" height="99" viewBox="0 0 100 99" fill="none">
      <path d="M80.9085 35.7125H19.2172L6.6875 58.2002V86.2663H93.4285V58.2002L80.9085 35.7125ZM61.0795 58.4516C61.0795 64.5327 56.1488 69.4634 50.058 69.4634C43.9672 69.4634 39.0365 64.5327 39.0365 58.4516H11.8599L21.8952 39.309H78.2111L88.2465 58.4516H61.0795ZM49.0525 12.6641H52.8327V26.2572H49.0525V12.6641ZM23.3991 19.4125L26.072 16.7396L35.6838 26.3513L33.0108 29.0243L23.3991 19.4125ZM65.0382 26.3575L74.6499 16.7457L77.3229 19.4187L67.7112 29.0304L65.0382 26.3575Z" fill="#ABADC6"/>
    </svg>
    <h5>{{ title }}</h5>

    <!-- Organizer Library -->

    <!-- <router-link to="/artists" class="btn d-flex align-items-center upload-song router-btn" v-if="showFeaturedArtistBtn">Find an Artist</router-link> -->
    <button class="d-flex align-items-center upload-song" v-if="showFeaturedArtistBtn" @click="$router.push('/artists')">Find an Artist</button>
    <button class="d-flex align-items-center upload-song" v-if="showEventVideosBtn">
      <span class="material-symbols-outlined upload-icon">&#xf09b;</span>
      Upload Video
    </button>
    <button class="d-flex align-items-center upload-song" v-if="showCreatedEventsBtn">
      <span class="material-symbols-outlined upload-icon">&#xe145;</span>
      Create an event
    </button>

    <!-- Artist Library -->
  
    <button class="d-flex align-items-center upload-song" v-if="NoNoSongsBoxBtn" @click="toggle()">
      <span class="material-symbols-outlined upload-icon">&#xf09b;</span>
      Upload Song
    </button>

    </div>
  </div>

  <info-modal :usage="modelType" />

  </template>
    
  <script>
  import { Modal } from "bootstrap";
  import {mapActions, mapState} from 'vuex';
  import InfoModal from '@/components/Artist/Library/InfoModal.vue';

  export default {
    components: {
      InfoModal
    },
    props: {
       title: String,
       NoNoSongsBoxBtn: Boolean,

       showFeaturedArtistBtn: Boolean,
       showEventVideosBtn: Boolean,
       showCreatedEventsBtn: Boolean,
    },
    data() {
      return {
        modalType: 'song',
      }
    },      
    computed: {
      
    },
    methods: {
      toggle(type = 'song') {

      this.modelType = type;

      new Modal(document.getElementById('albumSongInfo'), {
        keyboard: false
      }).show();

      },
    },
   
  };
  </script>
  
  <style>

  </style>
  