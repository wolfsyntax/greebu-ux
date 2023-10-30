<template>
  <div>
  </div>


    <event-card :proposal="proposal" @view="toggleProposal" />
    <proposal-modal :show="showModal" :option="optionType"
      @close-modal="closeModal" @accept-request="onModalAccepted" 
    />
 

</template>

<script>
import { mapState, mapActions } from 'vuex';

import EventCard from './EventCardProposal.vue';

export default {
  setup()
  {
    return {}
  },
  components: {
    EventCard,
  },
  data: () => ({
    
    showModal: false,
    showToast: false,
    showProposalModal: false,
    optionType: 'pending'
  }),
  computed: {
    // ...mapState({
    //   proposals: state => state.artistProposal.pendingProposals,
    // })
  },
  mounted() {
  },
  methods: {
    // ...mapActions(['fetchMyProposals', ]),
    
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