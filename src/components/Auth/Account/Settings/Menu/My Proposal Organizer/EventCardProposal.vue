<template>
  <div class="customized-songs-wrapper">
    <div class="d-flex align-items-center justify-content-between event-description">

      <div class="left-wrap">
          <div class="d-flex align-items-center event-wrap">
            <span class="material-symbols-sharp dot-icon">&#xe061;</span>
            <h5 class="mb-0 event">Rock Revival Concert Series</h5>

                 <!-- CANCELLED PROPOSAL -->
            <!-- <div>
              <button class="btn p-0 badge-wrap">
                <span class="in-progress cancelled lh-badge">Cancelled</span>
              </button>
            </div> -->

          </div>

          <div class="mb-0 d-flex align-items-center requested-wrapper">
            <img src="https://lh3.googleusercontent.com/ogw/AKPQZvzlN2Mhph_WafyiahefQ1NCD98zcipm0ZSmrZMaVg=s32-c-mo" class="requested-by-image" alt="Submitted by image"> 
            <a href="#" class="requested-by">Submitted to <span class="name">Idlepitch</span></a> 
            <span class="material-symbols-sharp dot-icon">&#xe061;</span>
            <span class="time">8 hours ago</span>
          </div>
        </div>


      <div class="details-wrapper">
        <div class="button-wrapper">
          <button type="button" class="btn details" @click="showModal">View Proposal</button>
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
  .badge-cancelled {
    background: var(--warning-light);
    color: var(--warning);    
  }
</style>