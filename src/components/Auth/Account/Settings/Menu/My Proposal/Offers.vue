<template>
  <div>

    <div class="customized-songs-wrapper">
      <div class="d-flex align-items-center justify-content-between event-description">

        <div class="d-flex align-items-center left-wrap expand-left-wrap">
          <div class="song-cover-wrap">
            <img src="/assets/organizer-account/profile-img.webp" class="offer-img" alt="Song album cover"> 
          </div>

          <div class="song-details-wrap">

            <div class="d-flex align-items-center event-wrap">
              <h5 class="mb-0 event"><span>From:</span> KYC Flores Event Organizer KYC Flores Event Organizer </h5>
                <div>
                  <button class="btn p-0 badge-wrap">
                    <span class="in-progress cancelled lh-badge">Cancelled</span>
                  </button>
                </div>
            </div>

            <div>
              <h6 class="d-flex align-items-center venue">Event Organizer
              <span class="material-symbols-rounded dot-icon">&#xe061;</span>Naga City, Camarines Sur</h6>
              <p class="d-flex align-items-center mb-0 star-ratings">
                <span class="material-symbols-rounded star-icon">&#xe838;</span>
                4.95 <span class="reviews">(234 reviews)</span>
              </p>
            </div>

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