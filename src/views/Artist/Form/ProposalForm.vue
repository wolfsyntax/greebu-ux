<template>
  <layout>

    <section class="artist-proposal-form">
      <div class="container">
        <div class="justify-content-start back-wrapper">
          <button class="btn d-flex align-items-center back" @click="$router.push('/events')">
            <span class="material-symbols-outlined back-icon">&#xe5c4;</span>
            Back
          </button>
        </div>

        <div class="submit-proposal-wrap">
          <h2 class="top-level-title">Submit a porposal to {{  event.organizer_name }}</h2>
          <p class="top-level-sub-title">Lorem ipsum dolor sit amet consectetur. Nascetur enim cras mauris elementum montes ut tristique.</p>
        </div>

        <form @submit.prevent="submit" autocomplete="off">
          <div class="artist-details-wrap">
            <h3 class="title">Artist Details</h3>
            <div class="form-group">
              <label for="name">Name of the artist/Band</label>
              <p v-html="proposal.artist_name"></p>
            </div>

            <div class="form-group">
              <label for="name">Genre/ Type of music</label>
              <span class="badge" v-for="(propose, index) in proposal" :key="index">{{ propose }}</span>
            </div>

            <div class="form-group">
              <label for="name">Number of members</label>
              <input type="text" class="form-control" required autocomplete="off" v-model="proposal.total_member" />
            </div>
          </div>
          {{ proposal }} {{ account }}
          <div class="cover-letter-wrap">
            <h3>Cover letter</h3>
            <div class="form-group form-about-artist">
              <label for="letter">Write your cover letter</label><br>  
              <textarea maxlength="500" class="form-control about-artist" v-model="proposal.cover_letter"></textarea>
              <p v-show="proposal.cover_letter" class="char-count">Maximum 500 characters ( {{ remainingChars }} left)</p>
            </div>
          </div>

          <div class="music-sample-wrap">
            <h3>Music Sample</h3>

            <div class="upload-audio" v-if="uploadDragSongBox"
              @dragover="handleDragOverSong"
              @dragleave="handleDragLeaveSong"
              @drop="handleDropSong"
              :class="{ 'drag-over': isDragOver}"
            >
              <div class="text-center upload-file-content" >
                <svg xmlns="http://www.w3.org/2000/svg" width="73" height="74" viewBox="0 0 73 74" fill="none">
                  <path d="M26.6035 22.1539V50.8632C25.2924 50.2319 23.8357 49.9563 22.382 50.0645C20.7481 50.1703 19.1812 50.7473 17.8741 51.7243C16.5669 52.7013 15.5767 54.0358 15.0254 55.5633C14.474 57.0909 14.3856 58.7449 14.771 60.3216C15.1564 61.8983 15.9987 63.329 17.1943 64.4374C18.3899 65.5458 19.8866 66.2835 21.5001 66.5598C23.1135 66.836 24.7732 66.6387 26.2749 65.9922C27.7766 65.3456 29.0547 64.278 29.9518 62.9209C30.8488 61.5637 31.3257 59.9762 31.3238 58.3539V32.1162C31.3316 31.8203 31.4266 31.533 31.597 31.2898C31.7674 31.0466 32.0058 30.8581 32.2829 30.7473L53.0844 22.8381C53.2265 22.7782 53.3815 22.755 53.535 22.7708C53.6885 22.7865 53.8355 22.8407 53.9621 22.9281C54.0887 23.0156 54.1908 23.1335 54.2589 23.2707C54.3269 23.408 54.3586 23.5601 54.351 23.7129V40.6724C53.041 40.0377 51.5834 39.762 50.1295 39.8738C47.9619 40.0226 45.937 40.9982 44.4803 42.5955C43.0236 44.1928 42.2486 46.2874 42.3182 48.4392C42.3877 50.5909 43.2965 52.632 44.8534 54.1337C46.4103 55.6353 48.4941 56.4805 50.6668 56.4915C52.926 56.4697 55.084 55.5603 56.667 53.9631C58.2499 52.3659 59.1284 50.2115 59.1094 47.9731V11.0122C59.1103 10.5109 58.9889 10.0168 58.7556 9.57192C58.5223 9.12705 58.184 8.7446 57.7695 8.45711C57.355 8.16963 56.8765 7.98561 56.3748 7.92072C55.8731 7.85582 55.3629 7.91198 54.8878 8.0844L29.6354 17.7811C28.7448 18.1233 27.9791 18.7237 27.4382 19.5038C26.8974 20.2839 26.6065 21.2075 26.6035 22.1539Z" fill="#ABADC6"/>
                </svg>

                <h5 class="drag-files">Drag a file here</h5>
                <p class="or">or</p>
                <div class="select-files-wrapper">
                  <label for="files" class="btn btn-info">Select file</label>
                  <input type="file" class="upload-music"
                    id="files" style="display:none;" 
                    ref="musicInput" @change="handleMusicUpload" accept=".mp3,.mp4" 
                  />
                </div>
              </div>
            </div>

            <!-- Uploaded music -->
            <transition name="fade" mode="out-in">
              <div v-if="uploadedSongWrapper" class="uploaded-song-wrapper">
                <audio controls class="audio-controls-wrapper" ref="audioPlayer">
                  <source :src="uploadedMusic" type="audio/mpeg">
                  Your browser does not support the audio element.
                </audio>
                <div class="d-flex align-items-center justify-content-between song-wrapper">
                  <div class="d-flex align-items-center song-title-wrapper">
                    <img src="/assets/artist-account/mp3-icon.svg" alt="Music icon">
                    <div>
                      <h5 class="song-title">{{ songTitle }}</h5>
                      <p class="preview"><span class="badge file-size">{{ fileSize }}KB</span></p>
                    </div>
                  </div>

                  <div class="d-flex align-items-center remove-music-wrapper">
                    <img :src="playIcon" @click="togglePlay()" alt="Music icon">
                    <img src="/assets/artist-account/remove-song-icon.svg" @click="removeMusic" alt="Music icon">
                  </div>
                </div>  
              </div>
            </transition>

            <div v-if="defaultFileFormat"  class="d-flex align-items-center audio-file-format">
              <span class="material-symbols-outlined info">&#xe88e;</span>
              <p class="max-file-size">Please upload an MP3 or MP4 audio file with a maximum size of 10MB.</p>
            </div>
          </div>

          <div class="text-center">
            <button class="btn submit-proposal-btn">Submit</button>
          </div>
        </form>
      </div>
    </section>
  </layout>
</template>

<script>
import Layout from '/src/components/Layouts/Layout.vue';
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    layout: Layout
  },
  data() {
    return {
      form: {},
      uploadedMusic: null,
      uploadedSongWrapper: false,
      songTitle: 'My Awesome Song.mp3',
      fileSize: '', // Store file size here
      metadata: {},
      fileInfo: null,
      errorMessage: '',
      defaultFileFormat: true,
      isDragOver: false,
      uploadDragSongBox: true,
      playIcon: '/assets/play-circle.svg',
      validImage: false,
      validAudio: false,
      audioMagic: '',
      audioSize: 0,
      invalidAudio: false,
    }
  },
  methods: {
    handleDragOverSong(event) {
      event.preventDefault();
      this.isDragOver = true;
    },
    handleDragLeaveSong(event) {
      event.preventDefault();
      this.isDragOver = false; 
    },
    handleDropSong(event) {
      event.preventDefault();

      const file = event.dataTransfer.files[0];

      this.handleFiles(file);
      this.isDragOver = false;
    },
    fileCheck(file) {
      // magicAudio
      var fileReader = new FileReader();
      var self = this;

      this.tempMagic = '';

      fileReader.readAsArrayBuffer(file);
      fileReader.onloadend = function (e) {

        var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
        var header = "";

        for (var i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }

        self.tempMagic = header;
      };

    },
    handleMusicUpload(event) {
      const file = event.target.files[0];

      console.log('Handle Music Upload: ', file);
      this.targetMagic = 'audio';
      //this.fileCheck(file);
      if(file) this.fileCheck(file);

      const { type, name, size } = file;

      // this.error.song = [];

      this.validAudio = false;

      this.audioSize = size;

      if (type === 'audio/mpeg' && (name.endsWith('.mp3') || name.endsWith('.mp4')))
      {
        this.validAudio = true;
        this.invalidAudio = false;
      } else {
        
        this.invalidAudio = true;
        this.uploadedMusic = URL.createObjectURL(file);
        this.songTitle = file.name.replace(/\.[^/.]+$/, '');

        const sizeInBytes = file.size;
        const sizeInKilobytes = Math.floor(sizeInBytes / 1024);

        this.fileSize = sizeInKilobytes;
        this.uploadDragSongBox = false;
        this.uploadedSongWrapper = true;
      }

      this.handleFiles(file);
    },
    handleFiles(file) {
      if (file) {
        // Check if the file is an MP3 file
        if (file.type === 'audio/mpeg') {

          const sizeInBytes = file.size;
          const sizeInKilobytes = Math.floor(sizeInBytes / 1024);

          //  this.fileSize = sizeInKilobytes;
          if(sizeInBytes <= 10000000){
            this.uploadedMusic = URL.createObjectURL(file);
            this.songTitle = file.name; //.replace(/\.[^/.]+$/, '')
            this.proposal.sample_song = file;
            this.fileSize = sizeInKilobytes;
            this.errorMessage = '';
            this.uploadDragSongBox = false;
            this.uploadedSongWrapper = true;
            this.defaultFileFormat = false;

            const fileReader = new FileReader();
            fileReader.onloadend = (e) => {
              const arr = new Uint8Array(e.target.result).subarray(0, 4);

              const buffer = fileReader.result;
              const view = new DataView(buffer);
              if (
                view.getUint8(0) === 73 &&
                view.getUint8(1) === 68 &&
                view.getUint8(2) === 51
              ) {

                const title = String.fromCharCode(view.getUint8(6), view.getUint8(7));
                const artist = String.fromCharCode(view.getUint8(30), view.getUint8(31));
                const album = String.fromCharCode(view.getUint8(63), view.getUint8(64));
                const genre = String.fromCharCode(view.getUint8(90));
                const date = String.fromCharCode(view.getUint8(93), view.getUint8(94));


                this.metadata.title = title;
                this.metadata.artist = artist;
                this.metadata.album = album;
                this.metadata.genre = genre;
                this.metadata.date = date;

                if (!this.hasCompleteMetadata) {
                  //this.error.song = ['Missing metadata fields. Please check the file.'];
                  event.target.value = null;
                  this.clearErrorMessageAfterDelay();
                }} else {
                  //this.error.song = ['File format not supported or no metadata found.'];
                  event.target.value = null;
                  this.clearErrorMessageAfterDelay();
                }
            }
              
            fileReader.readAsArrayBuffer(file);

          } else {
            // this.error.song = ['File size exceeds 10MB. Please upload a smaller MP3 or MP4 file.'];
            event.target.value = null;
            this.clearErrorMessageAfterDelay();
          }

        } else {
          //this.error.song = ['Please upload an MP3 or MP4 file.']
          event.target.value = null;
          this.clearErrorMessageAfterDelay();
        }
      }
    },
    clearErrorMessage() {
      //this.error.song = [];
    },
    clearErrorMessageAfterDelay() {
      setTimeout(() => {
        this.clearErrorMessage();
        this.defaultFileFormat = true;
      }, 10000); 

      this.defaultFileFormat = false;
    },
    removeMusic()
    {
      this.metadata = {};
      this.validAudio = false;
      this.audioMagic = '';

      //this.error.song = [];
      this.uploadedMusic = '';
      this.songTitle = '';
      this.uploadDragSongBox = true;
      this.uploadedSongWrapper = false;
      this.defaultFileFormat = true;

      this.$refs.audioPlayer.pause();
      this.playIcon = '/assets/play-circle.svg';
    },
    togglePlay()
    {
      if (this.$refs.audioPlayer.paused) {
        this.playIcon = '/assets/stop-circle.svg';
        this.$refs.audioPlayer.play();
      } else {
        this.$refs.audioPlayer.pause();
        this.playIcon = '/assets/play-circle.svg'
      }
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn',]),
    ...mapState({
      event: state => state.events.event,
      members: (state) => state.artist.members,
      account: (state) => state.account,
      proposal: state => state.artist.proposal,
    }),
    remainingChars(){
      return 500 - (this.proposal.cover_letter ? this.proposal.cover_letter.length : 0);
    },
    checkAudio()
    {
      var flagAudio = true;

      if (!this.validAudio && this.audioMagic !== '') {
        // this.error.song = [
        //   'The Song should be in a mp3 or mp4 format.',
        // ]
        return false;
      }

      if (this.audioSize > 10000000) {
        // this.error.song = [
        //   'The Song maximum file size to upload is 10MB (10000 KB). Try to compress it to make it under 10MB.'
        // ]
        return false;
      }

      if (this.uploadedMusic !== '') {
        return true;
      }

      if (typeof this.proposal.sample_song === 'string' && this.uploadedMusic !== '') {
        return true;
      }

      if (typeof this.proposal.sample_song === 'object') {
        flagAudio = this.validAudio
        this.validAudio = this.audioSize <= 10000000 ? true : false;
        console.log(`Form Song [${this.audioSize}]: `, this.validAudio);
      }

      return this.validAudio && flagAudio;
    },

  },
  mounted() {

    console.log('Account: ', this.account);
    this.proposal = {
      artist_id: this.account?.id || '',
      artist_name: this.account?.artist_name || '+',
      genres: this.account?.genres || [],
      total_member: this.members.length,
      cover_letter: '',
      sample_song: '',
    };

  },
}
</script>

<style>
@import '@/assets/css/artist-ui.css';

</style>
