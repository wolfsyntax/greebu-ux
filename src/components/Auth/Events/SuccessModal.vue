<template>
  <div class="modal fade" id="eventsSuccessModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">&emsp;</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <g clip-path="url(#clip0_4710_61743)">
              <path d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM20 34L10 24L12.82 21.18L20 28.34L35.18 13.16L38 16L20 34Z" fill="#FF6B00" />
            </g>
            <defs>
              <clipPath id="clip0_4710_61743">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <h3 class="title">Event created!</h3>
          <p class="content">Your event is successfully created.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
h3 {
  color: #FF6B00;
}
</style>