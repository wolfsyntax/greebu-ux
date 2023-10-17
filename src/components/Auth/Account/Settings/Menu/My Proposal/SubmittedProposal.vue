<template>
  <div>

    <!-- <div class="customized-songs-wrapper">
      <div class="d-flex align-items-center justify-content-between event-description">

        <div class="d-flex align-items-center left-wrap organizer-offers-details-wrap">
          <div>
            <img src="/assets/organizer-account/profile-img.webp" class="offer-img" alt="Requested by image"> 
          </div>

          <div>
            <h5 class="from"><span>To:</span> KC event organizer KC event organizer KC event Organizer event
              <span class="cancelled">Cancelled</span>
            </h5>
            <h6 class="d-flex align-items-center venue">Event Organizer
            <span class="material-symbols-rounded dot-icon">&#xe061;</span>
            Naga City, Camarines Sur</h6>
            <p class="d-flex align-items-center mb-0 star-ratings">
              <span class="material-symbols-rounded star-icon">&#xe838;</span>
              4.95 <span class="reviews">(234 reviews)</span>
            </p>
          </div>
        </div>

        <div class="details-wrapper">
          <div class="button-wrapper">
            <button type="button" class="btn details" @click="showModal = true">View Proposal</button>
          </div>
        </div>  
      
      </div>
    </div>

    <proposal-modal :show="showModal" @close-modal="closeModal" @accept-request="onModalAccepted" /> -->

  </div>

  <div v-for="(proposal, index) in proposals" :key="index">
    <event-card :proposal="proposal" @view="toggleProposal" />
    <proposal-modal :show="showModal" :option="optionType"
      @close-modal="closeModal" @accept-request="onModalAccepted" 
    />
  </div> 

</template>

<script>
import { mapState, mapActions } from 'vuex';

import EventCard from './EventCardProposal.vue';
import ProposalModal from './ProposalModal.vue';

export default {
  setup()
  {


    return {}
  },
  components: {
    EventCard,
    ProposalModal,
  },
  data: () => ({
    
    showModal: false,
    showToast: false,
    showProposalModal: false,
    optionType: 'pending'
  }),
  computed: {
    ...mapState({
      proposals: state => state.artistProposal.pendingProposals,
    })
  },
  mounted() {
    if (this.proposals.length === 0) {
      this.fetchMyProposals();
    }
  },
  methods: {
    ...mapActions(['fetchMyProposals', ]),
    toggleProposal(proposal) {
      console.log('Toggle Proposal: ', proposal)
      
      this.showModal = true;
    },
    closeModal()
    {
      this.fetchMyProposals();
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