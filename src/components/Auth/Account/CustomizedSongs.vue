<template>
    <div class="">

        <div class="d-flex align-items-center justify-content-between title-wrapper">
            <h3 class="title">Customized Songs</h3>

            <div v-if="showToast" class="d-flex justify-content-between toast-accepted-request">
              <div class="d-flex accepted-wrapper">
                  <span class="material-symbols-rounded check-circle">&#xe86c;</span>
                <div>
                  <h5 class="accepted">You accepted request</h5>
                  <p class="description">You can now work on the customer's customized song.</p>
                </div>
              </div>
              <div class="close-toast">
                <span class="material-symbols-rounded close-icon" @click="closeAcceptedToast">&#xe5cd;</span>
              </div>
            </div>
          </div> <!-- end of title-wrapper -->


        <div class="d-flex align-items-center customized-songs-tabs">
            <li class="d-flex align-items-center" 
                v-for="customize in customizedSongs" 
                :key="customize.name"
                :class="{ 'active-option': selectedCustomized === customize.name }"
                @click="showCustomizeContent(customize)">
              <h5 class="tab-title">{{ customize.name }}</h5>
            </li>
        </div>
         
        <div class="customized-songs-wrapper" v-show="selectedCustomized === 'Requested'" v-for="request in requestedSongs">
            <div class="event-description">
                <h5 class="event">{{ request.event }}</h5>
                <div class="d-flex align-items-center requested-wrapper">
                    <img :src=request.profile_image class="requested-by-image" alt="Requested by image"> 
                    <a href="#" class="requested-by">Requested by <span class="name">{{ request.name }}</span></a> <span class="time">{{ request.time }} hours ago</span>
                </div>
                <div class="d-flex">
                    <span class="material-symbols-rounded info-icon">&#xe88e;</span>
                    <p class="note">Clients will only pay if the requested customized song is already been accepted by chosen Artist.</p>
                </div>
            </div>
            <div class="details-wrapper">
                <div class="button-wrapper">
                    <button type="button" class="btn details" @click="showModal = true">View Details</button>
                    <RequestedSongModal 
                    :show="showModal" 
                    @close-modal="closeModal"
                    @accept-request="onModalAccepted"
                    />
                </div>
            </div>
        </div>



        <div class="customized-songs-wrapper"  v-show="selectedCustomized === 'For Submission'" v-for="request in requestedSongs">
          <div class="event-description">
                <h5 class="event">{{ request.event }} <span class="in-progress">In Progress</span></h5>
                <div class="d-flex align-items-center requested-wrapper">
                    <img :src=request.profile_image class="requested-by-image" alt="Requested by image"> 
                    <a href="#" class="requested-by">Requested by <span class="name">{{ request.name }}</span></a> <span class="time">{{ request.time }} hours ago</span>
                </div>
                <div class="d-flex">
                    <span class="material-symbols-rounded info-icon">&#xe88e;</span>
                    <p class="note">Clients will only pay if the requested customized song is already been accepted by chosen Artist.</p>
                </div>
            </div>
            <div class="details-wrapper">
                <div class="button-wrapper">
                    <button type="button" class="btn details" @click="showModal = true">View Details</button>
                    <RequestedSongModal 
                    :show="showModal" 
                    @close-modal="closeModal"
                    @accept-request="onModalAccepted"
                    />
                    <button type="button" class="btn upload">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clip-path="url(#clip0_5729_89038)"><path d="M7.49984 13.3333H12.4998V8.33333H15.8332L9.99984 2.5L4.1665 8.33333H7.49984V13.3333ZM4.1665 15H15.8332V16.6667H4.1665V15Z" fill="white"/>
                      </g><defs><clipPath id="clip0_5729_89038"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
                      
                      <!-- <span class="material-symbols-outlined">upload</span> -->
                      Upload
                    </button>
                </div>
            </div>
        </div>

        <div class="customized-songs-wrapper"  v-show="selectedCustomized === 'For Revision'">
          <h3>For Revision</h3>
        </div>

        <div class="customized-songs-wrapper"  v-show="selectedCustomized === 'Completed'">
          <h3>Completed</h3>
        </div>

    </div>
  </template>
  
  <script>
 import RequestedSongModal from '@/components/Auth/Account/RequestedSongModal.vue';

  export default {
    components: {
      RequestedSongModal
    },
    props: {
      
    },
    data() {
          return {
        customizedSongs: [
        { name: 'Requested'},
        { name: 'For Submission'},
        { name: 'For Revision'},
        { name: 'Completed'},
    ],
    selectedCustomized: 'Requested', // Default selected option
    requestedSongs: [
    { event: 'Birthday Song', profile_image: 'https://lh3.googleusercontent.com/a-/AD_cMMSLi2SfUJdD4SS2bXaL5NxayPEdYmT3NNso4i_pkSNZ=s64-p-k-rw-no', name: 'John Flores', time: 3, },
    { event: 'Wedding Song', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12, },
    { event: 'Wedding Song', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12, },
    ],
    showModal: false,
    showToast: false
    }
    },      
    computed: {
  },
    methods: {
    showCustomizeContent(option) {
      this.selectedCustomized = option.name;
    },
    closeModal(){
      this.showModal = false;
    },
    onModalAccepted(){
      this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 7000);
    this.showModal = false;
    },
    closeAcceptedToast(){
      this.showToast = false;
    },
    showToastDiv(){
      this.showToast = true;
    }
    },
  };
  </script>
  
  <style>
  /* Styles for your modal */
  </style>
  