<template>
  <div>
    <show-toast-msg
      :message="message"
      :description="description"
      @hide-toast="showToastComponent = false"
      v-if="showToastComponent"
    />
  </div>

  <div v-for="(proposal, index) in proposals" :key="index">
    <event-card :proposal="proposal" @view="toggleProposal" />
  </div>
  <proposal-modal :show="showModal" :option="optionType"
      @close-modal="closeModal" @accept-request="onModalPending" @show-toast-msg="showToastMessage"
    />
</template>

<script>

import { mapState, mapActions } from 'vuex'

import EventCard from './EventCardProposal.vue'
import ProposalModal from './ProposalModal.vue'
import ShowToastMsg from '/src/components/ShowToastMsg.vue'

export default {
  setup () {
    return {}
  },
  components: {
    EventCard,
    ProposalModal,
    ShowToastMsg
  },
  data: () => ({
    showModal: false,
    showFromOrganizerModal: false,
    optionType: 'pending',

    message: 'You accepted the request proposal',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    showToastComponent: false

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
    showToastMessage () {
      this.showToastComponent = true
    },
    onModalPending () {
      this.showToastComponent = true
      this.showModal = false
    }
  },
  mounted () {
    if (this.proposals.length === 0) {
      this.fetchMyProposals('pending')
    }
  },
  computed: {
    ...mapState({
      proposals: state => state.artistProposal.pendingProposals
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
