<template>
  <div v-for="(proposal, index) in proposals" :key="index">
    <event-card :proposal="proposal" @view="toggleProposal" />
    <view-proposal-modal :show="showModal" :option="optionType"
      @close-modal="closeModal" @accept-request="onModalAccepted" 
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import EventCard from './EventCardProposal.vue';
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
  data: () => ({
    optionType: 'accepted',
    showModal: false,
  }),
  computed: {
    ...mapState({
      proposals: state => state.artistProposal.acceptedProposals,
    })
  },
  mounted() {
    if (this.proposals.length === 0) {
      this.fetchMyProposals('accepted');
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
      this.showModal = false;
    },
  },
}
</script>

<style lang="scss" scoped></style>