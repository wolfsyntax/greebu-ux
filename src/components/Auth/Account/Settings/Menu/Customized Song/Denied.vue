<template>
    <div>
      <div class="customized-songs-wrapper" v-for="(request, index) in requestedSongs" :key="index">
  
        <div class="d-flex align-items-center justify-content-between event-description">

          <div class="left-wrap">
          
            <div class="d-flex align-items-center event-wrap">
                <h5 class="mb-0 event">Happy birthday to you. Happy birthday to you. Happy birthday to you. </h5>
                <div>
                  <button class="btn p-0 badge-wrap">
                    <span class="in-progress cancelled lh-badge">Request Denied</span>
                  </button>
                </div>
            </div>
        
            <div class="d-flex align-items-center requested-wrapper">
              <img :src=request.profile_image class="requested-by-image" alt="Requested by image"> 
              <a href="#" class="requested-by">Requested by <span class="name">{{ request.name }}</span></a> 
              <span class="material-symbols-sharp dot-icon">&#xe061;</span>
              <span class="time">{{ request.time }} hours ago</span>
            </div>

          </div>
  
          <div class="details-wrapper">
            <div class="button-wrapper">
              <button type="button" class="btn details" @click="showModal = true">View Details</button>
              <requested-song-modal :show="showModal" 
                @close-modal="closeModal" @accept-request="onModalAccepted" 
              />
              <button type="button" class="btn upload">Delete</button>
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