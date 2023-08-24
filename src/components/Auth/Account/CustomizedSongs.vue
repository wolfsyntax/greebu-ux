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
                <div class="d-flex align-items-center">
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



        <div class="customized-songs-wrapper"  v-show="selectedCustomized === 'For Submission'">
          <h3>RFor Submission</h3>
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
    { event: 'Birthday Song', profile_image: 'https://lh3.google.com/u/0/ogw/AGvuzYY2s_5Bchy7XSS8t-sa6xFlZuh_RVoKuOI8xg45=s32-c-mo', name: 'John Flores', time: 3, },
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
  