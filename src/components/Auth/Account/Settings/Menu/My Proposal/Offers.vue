<template>
  <div>
    <div class="customized-songs-wrapper">

      <div class="d-flex align-items-center justify-content-between event-description">

        <div class="d-flex align-items-center left-wrap organizer-offers-details-wrap">
          <div>
            <img src="/assets/organizer-account/profile-img.webp" class="offer-img" alt="Requested by image"> 
          </div>

          <div>
            <h5 class="from"><span>From:</span> KC event organizer KC event organizer KC event organizer KC event organizer KC event organizer KC event organizer</h5>
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
            <button type="button" class="btn details" @click="showModal = true">View Details</button>
          </div>
        </div>  
      
      </div>
 
      
    </div>
    <view-proposal-modal :show="showModal" @close-modal="closeModal" @accept-request="onModalAccepted" />
  </div>
</template>

<script>
import ViewProposalModal from './ViewProposalModal.vue';
export default {
  setup()
  {


    return {}
  },
  components: {
    ViewProposalModal,
  },
  data: () => ({
    
    showModal: false,
    showToast: false
  }),
  methods: {
    closeModal()
    {
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