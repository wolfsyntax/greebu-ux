<template>

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
              <button @click="$emit('play-previous')" class="btn btn-primary prev">
              </button>
              <button @click="$emit('toggle-play-pause')" class="btn btn-primary play">
                <img :src="playIconClass">
              </button>
              <button @click="$emit('play-next')" class="btn btn-primary next"></button>
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
              <button @click="$emit('toggle-mute')" class="btn btn-primary volume">
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
            <i class="bi bi-x" @click="$emit('stop-audio')"></i>
          </div>
        </div>
      </div> 

  </template>
  <script>
  
  export default {
   components: {
     
    },
    setup() {
      
    },
    data() {
      return {
       // showControls: false,
        currentVolume: 0,
      }
    },
    props: {
      showControls: {
        type: Boolean,
        required: true
      },
      artist:{
        type: Object,
        required: true
      },
      currentTime: {
        type: Number,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
    // currentVolume: {
    //   type: Number,
    //   required: true
    // },
    showVolumeSlider: {
      type: Boolean,
      required: true
    },
    updateVolume: {
      type: Number,
      required: true
    }
    },
    computed: {
    // ...mapState({
    //   artists: (state) => state.artist.artists,
    // }),
    },
    methods: {
      updateVolume(event) {
      this.$emit('update:currentVolume', event.target.value);
    },
    // toggleShowAudio(){
    //   this.$emit('show-modal', !this.showControls)
    // }
  }
  }
  </script>
  
  <style scoped>
 
  
  </style>