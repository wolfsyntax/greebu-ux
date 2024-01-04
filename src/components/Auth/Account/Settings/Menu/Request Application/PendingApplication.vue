<template>
  <div>
    <show-toast-msg
      :message="message"
      :description="description"
      @hide-toast="showToastComponent = false"
      v-if="showToastComponent"
    />
  </div>
  <div>
    <div class="" v-for="(pending, index) in pendingProposal" :key="index">
      <request-card
        :pending="pending"
        @request-toggle="toggle"
        :cardType="'pending'"
      />
    </div>
    <h5 v-if="pendingProposal.length === 0" class="text-center">
      No Pending Proposal found!
    </h5>

    <request-application-modal
      :show="showModal"
      @close-modal="closeModal"
      @accept-request="onModalAccepted"
      @accept-req="showToastMessage"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import RequestApplicationModal from './RequestApplicationModal.vue'
import RequestCard from './Card.vue'
import ShowToastMsg from '/src/components/ShowToastMsg.vue'

export default {
  setup () {
    return {}
  },
  components: {
    RequestApplicationModal,
    RequestCard,
    'show-toast-msg': ShowToastMsg
  },
  data: () => ({
    showModal: false,

    message: 'You accepted the request proposal',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    showToastComponent: false
  }),
  computed: {
    ...mapState({
      pendingProposal: (state) => state.organizer.pendingProposals
    })
  },
  methods: {
    ...mapActions(['fetchArtistProposal']),
    closeModal () {
      this.$store.commit('setProposal')
      this.showModal = false
    },
    hideToast () {
      this.showToastComponent = false
    },
    showToastMessage () {
      this.showModal = false
      this.showToastComponent = true
      setTimeout(() => {
        this.showToastComponent = false
      }, 5000)
    },
    toggle () {
      this.showModal = true
    },
    onModalAccepted () {
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 7000)
      this.showModal = false
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped></style>
