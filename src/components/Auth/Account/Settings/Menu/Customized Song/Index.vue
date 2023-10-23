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
        @click="showCustomizeContent(customize)"
      >
        <h5 class="tab-title">{{ customize.name }}</h5>
      </li>
    </div>

    <requested v-if="selectedCustomized === 'Requested'"/>
    <submission v-if="selectedCustomized === 'For Submission'" />
    <revision v-if="selectedCustomized === 'For Revision'"/>
    <completed v-if="selectedCustomized === 'Completed'"/>
    <denied v-if="selectedCustomized === 'Denied'"/>
    
  </div>
</template>
  
<script>
import Denied from './Denied.vue';
import Completed from './Completed.vue';
import Revision from './ForRevision.vue';
import Submission from './ForSubmission.vue';
import Requested from './Requested.vue';

export default {
  components: {
    Denied,
    Completed,
    Revision,
    Submission,
    Requested,
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
        { name: 'Denied'},
      ],
      selectedCustomized: 'Requested', // Default selected option
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

      setTimeout(() => { this.showToast = false; }, 7000);

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
