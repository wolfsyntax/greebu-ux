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
  <div>
    <div v-for="(proposal, index) in proposals" :key="index">
      <event-card :proposal="proposal" @view="toggleProposal" />
      <proposal-modal :show="showModal" :option="optionType"
        @close-modal="closeModal" @accept-request="onModalAccepted" 
      />
    </div>
    <cancel-reason :proposal="proposal" :show="showCancelModal" @close-modal="closeCancel" />
    <success-modal @close="closeModal" header="Proposal successfully cancelled!" body="Your proposal has been successfully cancelled."  /> 
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import EventCard from './EventCardProposal.vue';
import ProposalModal from './ProposalModal.vue';
import CancelReason from './../../CancelReason.vue';
import SuccessModal from '/src/components/Auth/Proposal/SuccessProposalModal.vue';

import { Modal } from 'bootstrap';
export default {
  setup()
  {


    return {}
  },
  components: {
    EventCard,
    ProposalModal,
    SuccessModal,
    CancelReason,
  },
  data: () => ({
    
    showModal: false,
    modalObj: null,
    showCancelModal: false,
    showToast: false,
    showProposalModal: false,
    optionType: 'pending',
    proposal: {}
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

    this.modalObj = new Modal(document.getElementById('sentProposalModal'), {
      keyboard: false,
      backdrop: 'static',
    }); 
  },
  methods: {
    ...mapActions(['fetchMyProposals', 'cancelMyProposal', ]),
    toggleProposal(proposal) {
      this.proposal = proposal;
      this.showModal = true;
    },
    
    closeCancel(val = 'none') {
      
      this.showCancelModal = false;
      this.fetchMyProposals();
      if (val === '') {
        this.modalObj.show();        
      }
    },
    closeModal(val = 'none')
    {
      this.showModal = false;
      
      if (val !== 'none') {
        this.showCancelModal = true;
        console.log(`Show cancel reason modal for proposal with ID of `, this.proposal.id)
      } else this.showCancelModal = false;

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
  },
  watch: {
    
  }
}
</script>

<style lang="scss" scoped></style>