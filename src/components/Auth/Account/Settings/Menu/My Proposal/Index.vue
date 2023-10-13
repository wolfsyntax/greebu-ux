<template>
  <div class="">
    <div class="d-flex align-items-center justify-content-between title-wrapper">
      <h3 class="title">My Proposal</h3>

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
        v-for="proposal in myProposal" 
        :key="proposal.name"
        :class="{ 'active-option': selectedCustomized === proposal.name }"
        @click="showCustomizeContent(proposal)"
      >
        <h5 class="tab-title">{{ proposal.name }}</h5>
      </li>
    </div>

    <offers v-if="selectedCustomized === 'Offers'"/>
    <submitted-proposal v-if="selectedCustomized === 'Submitted Proposal'" />
    <accepted-proposals v-if="selectedCustomized === 'Accepted Proposals'"/>
    <denied-proposals v-if="selectedCustomized === 'Denied Proposals'"/>
    
  </div>
</template>
  
<script>

import DeniedProposals from './DeniedProposals.vue';
import AcceptedProposals from './AcceptedProposals.vue';
import SubmittedProposal from './SubmittedProposal.vue';
import Offers from './Offers.vue';

export default {
  components: {
    DeniedProposals,
    AcceptedProposals,
    SubmittedProposal, 
    Offers, 
  },
  props: {

  },
  data() {
    return {
      myProposal: [
        { name: 'Offers'},
        { name: 'Submitted Proposal'},
        { name: 'Accepted Proposals'},
        { name: 'Denied Proposals'},
      ],
      selectedCustomized: 'Offers', // Default selected option
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
