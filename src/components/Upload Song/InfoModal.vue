<template>
  <div  class="modal fade modal-lg" id="albumSongInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header p-0 border-bottom-0">
          <h3 class="modal-title" v-if="step === 'song-information'">Song Information</h3>
          <h3 class="modal-title" v-if="step === 'upload-song'">Upload Song</h3>
          <h3 class="modal-title" v-if="step === 'upload-art-work'">Upload Artwork</h3>
          <h3 class="modal-title" v-if="step === 'upload-lyrics'">Upload Lyrics</h3>
          <button type="button" class="btn p-0 close-btn" data-bs-dismiss="modal" aria-label="Close" ref="closeModal">
            <span class="material-symbols-rounded close-icon">&#xe5cd;</span>
          </button>
        </div>
        <div class="modal-body p-0">

          <song-info @next-step="nextStep" v-if="step === 'song-information'" />
          <upload-song @next-step="secondStep" v-if="step === 'upload-song'" @back-to-song="backToSongInfo" />
          <upload-art-work @next-step="thirdStep" v-if="step === 'upload-art-work'" @back-to-song="backToSongUpload" />
          <upload-lyrics @next-step="fourthStep" v-if="step === 'upload-lyrics'" @back-to-song="backToUploadArtwork" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SongInfo from './Details/SongInfo.vue';
import UploadSong from './Details/UploadSong.vue';
import UploadArtWork from './Details/UploadArtWork.vue';
import UploadLyrics from './Details/UploadLyrics.vue';

export default {
  components:
  {
    SongInfo,  
    UploadSong,
    UploadArtWork,
    UploadLyrics
  },
  setup() {
    return {
    };
  },
  data: () => ({
    step: 'song-information',
  }),
  mounted()
  {
  },
  methods: {
    // showAlbumInfo(){
    //   this.showSong = false;
    //   this.showAlbum = true;
    // }
    nextStep(){
      this.step = 'upload-song';
      console.log('next step: ', this.step);
    },
    secondStep()
    {
      this.step = 'upload-art-work';
      console.log('next step: ', this.step);
    },
    thirdStep()
    {
      this.step = 'upload-lyrics';
      console.log('next step: ', this.step);
    },
    backToSongInfo(){ 
      this.step = 'song-information';
    },
    backToSongUpload(){
      this.step = 'upload-song';
    },
    backToUploadArtwork(){
      this.step = 'upload-art-work';
    }
  },
    
}
</script>

<style lang="scss" scoped>

</style>