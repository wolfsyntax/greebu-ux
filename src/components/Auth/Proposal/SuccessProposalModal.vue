<template>
    <div class="modal fade" id="sentProposalModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
  
          <div class="modal-body text-center p-0">
  
              <img src="/assets/artist-account/check-circle.svg" class="check-cirle" alt="check circle">
              <h3 class="event-created">{{ header }}</h3>
              <p class="message">{{ body }}</p>
              <!-- <button class="bnt close-modal-button" data-bs-dismiss="modal">Done</button> -->
              <a href="#" @click="$emit('close')" class="btn close-modal-button"  data-bs-dismiss="modal">Done</a>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
<script>
  export default {
    props: {
      header: { 
        type: String,
        default: 'Your proposal has been sent!',
        required: true
      },
      body: { 
        type: String,
        default: 'We will notify you when the artist has accepted your proposal.',
        required: true
      },

    },
  }
</script>

<style scoped>

</style>