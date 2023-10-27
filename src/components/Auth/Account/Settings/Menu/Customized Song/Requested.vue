<template>
  <div>
    <div class="customized-songs-wrapper" v-for="(request, index) in customizedSongs" :key="index">
      
      <div class="d-flex align-items-center justify-content-between event-description">
        
        <div class="left-wrap">
          <h5 class="text-truncate event">{{ request.purpose }} Song</h5>
          <div class="d-flex align-items-center requested-wrapper">
            <img :src=request.creator?.avatar class="requested-by-image" alt="Requested by image"> 
            <a href="#" class="requested-by">Requested by <span class="name">{{ request.creator.name }}</span></a> 
            <span class="material-symbols-sharp dot-icon">&#xe061;</span>
            <span class="time">{{ $filters.diffForHumans($moment(request?.created_at).format('YYYY-MM-DD hh:mm:ss a')) }}</span>
          </div>

          <!-- <div class="d-flex align-items-start event-note-wrap">
            <span class="material-symbols-rounded info-icon">&#xe88e;</span>
            <p class="note">Clients will only pay if you accept the requested customized song.</p>
          </div> -->
        </div>

        <div class="details-wrapper">
          <div class="button-wrapper">
            <button type="button" class="btn details" @click="viewDetail(request)">View Details</button>
          </div>
        </div> 

      </div>
      
    </div>
    <requested-song-modal :song="customSong" :show="showModal" @close-modal="closeModal" @accept-request="onModalAccepted" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import RequestedSongModal from './RequestedSongModal.vue';

export default {
  setup()
  {


    return {}
  },
  components: {
    RequestedSongModal,
  },
  data: () => ({
    requestedSongs: [
      { event: 'Birthday Song', profile_image: 'https://lh3.googleusercontent.com/a-/AD_cMMSLi2SfUJdD4SS2bXaL5NxayPEdYmT3NNso4i_pkSNZ=s64-p-k-rw-no', name: 'John Flores', time: 3, },
      { event: 'Wedding Song', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12, },
    ],
    showModal: false,
    showToast: false,
    customSong: {}
  }),
  mounted() {
    this.fetchCustomizedSong();
  },
  computed: {
    ...mapState({
      customizedSongs: state => state.songs.customized_songs,
    })
  },
  methods: {
    ...mapActions([
      'fetchCustomizedSong',
    ]),
    viewDetail(song) {
      this.showModal = true;
      this.customSong = song;
    },
    closeModal()
    {
      this.showModal = false;
    },
    onModalAccepted()
    {
      this.showToast = true;
      setTimeout(() =>
      {
        this.showToast = false;
      }, 7000);
      this.showModal = false;
    },    
  }
}
</script>

<style lang="scss" scoped></style>