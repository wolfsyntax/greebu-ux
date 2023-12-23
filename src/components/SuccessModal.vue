<template>
  <div
    class="modal fade"
    id="profileSuccessModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-body text-center p-0">
          <img
            src="/assets/artist-account/check-circle.svg"
            class="check-cirle"
            alt="check circle"
          />
          <h3 class="event-created">Successfully Save!</h3>
          <p class="message">{{ message }}</p>
          <button class="bnt close-modal-button" data-bs-dismiss="modal">
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // infoText: String,
    message: {
      type: String,
      default: "Profile has already been saved and updated",
      required: false,
    },
  },
};
</script>
