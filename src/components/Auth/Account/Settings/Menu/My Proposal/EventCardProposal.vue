<template>
  <div class="customized-songs-wrapper">
    <div class="d-flex align-items-center justify-content-between event-description">
      <div class="d-flex align-items-center left-wrap organizer-offers-details-wrap">
        <div>
          <img :src="proposal.organizer_avatar" class="offer-img" alt="Organizer Avatar"> 
        </div>

        <div>
          <h5 class="from"><span>To:</span> {{ proposal.organizer_name }}</h5>
          <h6 class="d-flex align-items-center venue">Event Organizer
            <span class="material-symbols-rounded dot-icon">&#xe061;</span>
            {{ proposal.location }}
          </h6>
          <p class="d-flex align-items-center mb-0 star-ratings">
            <span class="material-symbols-rounded star-icon">&#xe838;</span>
            4.95 <span class="reviews">(234 reviews)</span>
          </p>
        </div>
      </div>

      <div class="details-wrapper">
        <div class="button-wrapper">
          <button type="button" class="btn details" @click="showModal">View Details</button>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>

export default {
  watch: {
  },
  methods: {
    showModal() {

      this.$store.commit('setProposal', this.proposal);
      this.$emit('view', this.proposal);
      
    }
  },
  data () {
    return {
      // showModal: false,
    }
  },
  props: {
    proposal: { 
      type: Object,
      default: {},
      required: true
    },
  },
  setup () {
    

    return {}
  }
}
</script>

<style scoped>
  .requested-by-image {
    border-radius: 50%;
    width: 3rem !important;
    height: 3rem !important;
  }
</style>