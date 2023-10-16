<template>
  <div>

    <div class="d-flex align-items-center justify-content-between title-wrapper">
        <h3 class="title">Request Application</h3>

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

    <pending-application v-if="selectedCustomized === 'Pending Application'"/>
    <accepted v-if="selectedCustomized === 'Accepted'" />
    <denied v-if="selectedCustomized === 'Denied'"/>
    
  </div>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';
import Accepted from './Accepted.vue';
import Denied from './Denied.vue';
import PendingApplication from './PendingApplication.vue';

export default {
  components: {
    Accepted,
    Denied,
    PendingApplication,
  },
  props: {

  },
  data() {
    return {
      customizedSongs: [
        { name: 'Pending Application'},
        { name: 'Accepted'},
        { name: 'Denied'},
      ],
      selectedCustomized: 'Pending Application', // Default selected option
      showModal: false,
      showToast: false
    }
  },      
  computed: {
    acceptedProposal: state => state.organizer.acceptedProposals,
    declinedProposal: state => state.organizer.declinedProposals,
    pendingProposal: state => state.organizer.pendingProposals,
  },
  methods: {
    ...mapActions(['fetchArtistProposal']),
    showCustomizeContent(option) {
      this.selectedCustomized = option.name;

      if (option.name === 'Pending Application') {
        this.fetchArtistProposal({
          search: '',
          sortBy: 'DESC',
          filterBy: 'pending'
        });

      } else if (option.name === 'Accepted') {

        this.fetchArtistProposal({
          search: '',
          sortBy: 'DESC',
          filterBy: 'accepted'
        });

      } else if (option.name === 'Declined') {
        this.fetchArtistProposal({
          search: '',
          sortBy: 'DESC',
          filterBy: 'declined'
        });
      }

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
  mounted()
  {
    this.fetchArtistProposal({
      search: '',
      sortBy: 'DESC',
      filterBy: 'pending'
    });

    this.fetchArtistProposal({
      search: '',
      sortBy: 'DESC',
      filterBy: 'accepted'
    });

    this.fetchArtistProposal({
      search: '',
      sortBy: 'DESC',
      filterBy: 'declined'
    });
  }
};
</script>

<style scoped>

/* Styles for your modal */
</style>
