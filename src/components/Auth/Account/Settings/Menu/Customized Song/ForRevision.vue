<template>
  <div>
    <div class="customized-songs-wrapper" v-for="(request, index) in requestedSongs" :key="index">

      <div class="d-flex align-items-center justify-content-between event-description">

        <div class="d-flex align-items-center left-wrap fr-left">

          <div>
            <img :src=request.song_cover class="song-cover" alt="Song album cover"> 
          </div>

          <div>
            <h5 class="event">{{ request.event }} <span class="for-revision lh-badge">For Revision</span></h5>
            <div class="d-flex align-items-center requested-wrapper">
              <img :src=request.profile_image class="requested-by-image" alt="Requested by image"> 
              <a href="#" class="requested-by">Requested by <span class="name">{{ request.name }}</span></a> 
              <span class="material-symbols-sharp dot-icon">&#xe061;</span>
              <span class="time">{{ request.time }} hours ago</span>
            </div>
            <h6>Genre: <span>{{ request.genre }}</span></h6>
            <h6 class="mb-0">Lenght: <span>{{ request.duration }} minutes</span></h6>
          </div>

        </div>

        <div class="details-wrapper">
        <div class="button-wrapper">
          <button type="button" class="btn details" @click="showModal = true">View Details</button>
          <requested-song-modal :show="showModal" 
            @close-modal="closeModal" @accept-request="onModalAccepted" 
          />
          <button type="button" class="btn upload">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_5729_89038)"><path d="M7.49984 13.3333H12.4998V8.33333H15.8332L9.99984 2.5L4.1665 8.33333H7.49984V13.3333ZM4.1665 15H15.8332V16.6667H4.1665V15Z" fill="white"/>
              </g>
              <defs><clipPath id="clip0_5729_89038"><rect width="20" height="20" fill="white"/></clipPath></defs>
            </svg>
            Upload
          </button>
        </div>
      </div>

      </div>

    </div>
  </div>
</template>

<script>
import RequestedSongModal from './RequestedSongModal.vue';
export default {
  components: {
    RequestedSongModal,
  },
  setup()
  {


    return {}
  },
    data: () => ({
    requestedSongs: [
      { event: 'Birthday Song', song_cover: '/assets/organizers/organizers-banner-bg.webp', profile_image: 'https://lh3.googleusercontent.com/a-/AD_cMMSLi2SfUJdD4SS2bXaL5NxayPEdYmT3NNso4i_pkSNZ=s64-p-k-rw-no', name: 'John Flores', time: 3, genre: 'Rock', duration: 3 },
      { event: 'Wedding Song', song_cover: '/assets/organizers/organizers-banner-bg.webp', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12,genre: 'Metal', duration: 5 }
    ],
    showModal: false,
    showToast: false
  }),
  methods: {
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