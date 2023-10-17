<template>
  <div v-for="(proposal, index) in proposals" :key="index">
    <event-card :proposal="proposal" @view="toggleProposal" />
    <view-proposal-modal :show="showModal" :option="optionType"
      @close-modal="closeModal" @accept-request="onModalAccepted" 
    />
  <div>  
</template>

<script>
import ProposalModal from './ProposalModal.vue';
import ViewProposalModal from './ViewProposalModal.vue';
export default {
  components: {
    EventCard,
    ViewProposalModal,
  },
  setup()
  {


    return {}
  },
  components: {
    ProposalModal,
    ViewProposalModal
  },
  data: () => ({
    
    showModal: false,
    showFromOrganizerModal: false,
    showToast: false
  }),
  methods: {
    closeModal()
    {
      this.showModal = false;
    },
    closeFromOrganizerModal()
    {
      this.showFromOrganizerModal = false;
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