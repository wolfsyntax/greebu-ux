<template>
  <div class="">
    <div class="d-flex align-items-center justify-content-between title-wrapper">
      <h3 class="title">My Proposal</h3>
      
    </div> <!-- end of title-wrapper -->

    <div class="d-flex align-items-center customized-songs-tabs">
      <li class="d-flex align-items-center" 
        v-for="proposal in myProposal" 
        :key="proposal.name"
        :class="{ 'active-option': selectedCustomized === proposal.name }"
        @click="showCustomizeContent(proposal)"
      >
        <h5 class="tab-title">{{ proposal.name }}</h5>
      </li>
    </div>
    
    <pending-proposals v-if="selectedCustomized === 'Pending Proposals'"/>
    <accepted-proposals v-if="selectedCustomized === 'Accepted Proposals'"/>
    <denied-proposals v-if="selectedCustomized === 'Denied Proposals'"/>
    
  </div>
</template>
  
<script>

import {mapActions, mapState} from 'vuex';

import DeniedProposals from './DeniedProposals.vue';
import AcceptedProposals from './AcceptedProposals.vue';
import PendingProposals from './PendingProposals.vue';

export default {
  components: {
    DeniedProposals,
    AcceptedProposals,
    PendingProposals, 
    
  },
  props: {

  },
  data() {
    return {
      myProposal: [
        { name: 'Pending Proposals'},
        { name: 'Accepted Proposals'},
        { name: 'Denied Proposals'},
      ],
      selectedCustomized: 'Pending Proposals', 
    }
  },      
  computed: {
    
  },
  methods: {
    ...mapActions([
      'fetchMyProposals'
    ]),
    showCustomizeContent(option) {
      console.log('showCustomizeContent: ', option)
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
    // closeModal() {
    //   this.isModalOpen = false;
    //   this.showToastComponent = false;
    // },
  },
  mounted() {
    
    this.fetchMyProposals();  
    this.fetchMyProposals('accepted');  
    this.fetchMyProposals('declined');  
    
  },
  watch: {
    selectedCustomized(val) {
      var payload = 'pending';
      
      if (['Accepted Proposals', 'Denied Proposals', 'Submitted Proposals', ].includes(val)) {
        
        if (val === 'Accepted Proposals') payload = 'accepted';
        else if (val=== 'Denied Proposals') payload = 'declined';

        this.fetchMyProposals(payload)
        .then(res => console.log('Tab click option (response): ', res));
      }
      
    }
  }
};
</script>

<style>
/* Styles for your modal */
</style>
