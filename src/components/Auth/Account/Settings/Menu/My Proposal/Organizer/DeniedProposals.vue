<template>
  <div v-for="(proposal, index) in proposals" :key="index">
    <event-card :proposal="proposal" @view="toggleProposal" />
    <proposal-modal :show="showModal" :option="optionType"
      @close-modal="closeModal" @accept-request="onModalAccepted"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import EventCard from './EventCardProposal.vue'
import ProposalModal from './ProposalModal.vue'
export default {
  setup () {
    return {}
  },
  components: {
    EventCard,
    ProposalModal
  },
  data: () => ({

    showModal: false,
    showFromOrganizerModal: false,
    showToast: false,
    optionType: 'declined'
  }),
  methods: {
    ...mapActions(['fetchMyProposals']),
    toggleProposal (proposal) {
      console.log('Toggle Proposal: ', proposal)

      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    closeFromOrganizerModal () {
      this.showFromOrganizerModal = false
    },
    onModalAccepted () {
      this.showToast = true
      // setTimeout(() =>
      // {
      //   this.showToast = false;
      // }, 7000);
      this.showModal = false
    }
  },
  computed: {
    ...mapState({
      proposals: state => state.artistProposal.declinedProposals
    })
  },
  mounted () {
    if (this.proposals.length === 0) {
      this.fetchMyProposals('declined')
    }
  }

}
</script>

<style lang="scss" scoped></style>
