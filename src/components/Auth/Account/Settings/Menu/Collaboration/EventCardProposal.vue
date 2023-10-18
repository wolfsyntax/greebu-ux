<template>
  <div class="customized-songs-wrapper">
    <div class="d-flex align-items-center justify-content-between event-description">
      <div class="d-flex align-items-center left-wrap organizer-offers-details-wrap">
        <div>
          <img src="/assets/artist-account/artist-profile-1.webp" class="offer-img" alt="Artist image"> 
        </div>
        <div>
          <h5 class="from"><span>To: </span> Idleapitch</h5>
          <h6 class="d-flex align-items-center venue">Full band
          <span class="material-symbols-rounded dot-icon">&#xe061;</span>Naga City, Camarines Sur</h6>
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

  <view-proposal-modal :show="showModal" @close-modal="closeModal" @accept-request="onModalAccepted" />

</template>

<script>
import ViewProposalModal from './ViewProposalModal.vue';

export default {
  components: {
    ViewProposalModal,
  },
  data () {
    return {
       showModal: false,
    }
  },
  props: {
    proposal: { 
      type: Object,
      default: {},
      required: true
    },
  },
  watch: {
  },
  methods: {
    closeModal()
    {
      this.showModal = false;
    },
  },
}
</script>

<style scoped>
</style>