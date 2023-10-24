<template>
  <div class="customized-songs-wrapper ">

    <div class="d-flex align-items-center justify-content-between event-description">

      <div class="left-wrap">
        <div class="d-flex align-items-center event-wrap">
          <span class="material-symbols-sharp dot-icon">&#xe061;</span>
          <h5 class="mb-0 event">
            {{ pending.event_name }}
            <!-- <span class="in-progress" v-if="cardType === 'accepted'">Ongoing</span> -->
            <!-- <small class="in-progress cancelled lh-badge" v-if="pending.cancelled_at">Cancelled</small> -->
          </h5>
          <div v-if="pending.cancelled_at">
            <button class="btn p-0 badge-wrap">
              <span class="in-progress cancelled lh-badge">Cancelled</span>
            </button>
          </div>
        </div>
      
        <div class="mb-0 d-flex align-items-center requested-wrapper">
          <img :src=pending.artist_avatar class="requested-by-image" alt="Submitted by image"> 
          <a href="#" class="requested-by">Submitted by <span class="name">{{ pending.artist_name }}</span></a> 
          <span class="material-symbols-sharp dot-icon">&#xe061;</span>
          <span class="time" v-if="cardType === 'pending'">{{ $filters.diffForHumans($moment(pending?.submitted_at).format('YYYY-MM-DD hh:mm:ss a')) }}</span>
          <span class="time" v-else-if="cardType === 'accepted'">{{ $filters.diffForHumans($moment(pending?.accepted_at).format('YYYY-MM-DD hh:mm:ss a')) }}</span>
          <span class="time" v-else-if="cardType === 'declined'">{{ $filters.diffForHumans($moment(pending?.declined_at).format('YYYY-MM-DD hh:mm:ss a')) }}</span>
        </div>
      </div>

      <div class="details-wrapper">
        <div class="button-wrapper">
          <button type="button" class="btn details" @click="toggle">View Details</button>
        </div>
      </div>  

    </div>
     
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  },
  props: {
    pending: { 
      type: Object,
      default: {},
      required: true
    },
    cardType: {
      type: String,
      default: 'pending',
      required: true,
    }
  },
  methods: {
    toggle()
    {
      this.$store.commit('setProposal', this.pending);
      this.$emit('request-toggle')
    }
  }
}
</script>

<style scoped>
</style>