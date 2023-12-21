<template>
  <div class="request-song-modal" v-if="show">
    <div class="modal-content">
      <div class="d-flex justify-content-between title-wrapper">
        <div>
          <h3 class="title">My Proposal</h3>
        </div>

        <div>
          <button @click="$emit('close-modal')" class="close-button">
            <span class="material-symbols-rounded">&#xe5cd;</span>
          </button>
        </div>
      </div>
      <!-- end of title-wrapper -->

      <div class="text-center modal-body">
        <div
          class="d-flex align-items-center justify-content-between action-wrapper"
        >
          <div class="d-flex align-items-center organizer-offers-details-wrap">
            <img
              src="/assets/artist-account/band-member-2.webp"
              class="customer-image"
              alt="Oganizer image"
            />
            <div>
              <h5 class="from"><span>To:</span> KMKZ</h5>
              <h6 class="d-flex align-items-center mb-0 venue">Full Band</h6>
            </div>
          </div>

          <!-- Accepted Proposal -->
          <div class="d-flex align-items-center">
            <button class="btn accept" @click="$emit('show-toast-msg')">
              Accept
            </button>
          </div>

          <!-- NEW PROPOSAL -->
          <!-- <div class="d-flex align-items-center">
              <button class="btn decline" @click="showCancellation = true">Cancel Proposal</button>
            </div> -->

          <!-- DECLINED PROPOSAL -->
          <!-- <div class="d-flex align-items-center">
              <button class="btn cancelled">Declined</button>
            </div> -->

          <!-- CANCELLED PROPOSAL -->
          <!-- <div class="d-flex align-items-center">
              <button class="btn cancelled">Cancelled</button>
            </div> -->
        </div>
        <!-- end of action-wrapper -->

        <!-- CANCELLED PROPOSAL -->
        <div class="d-flex align-items-center note-wrapper">
          <span class="material-symbols-rounded">&#xe28e;</span>
          <p class="note">Your proposal is being reviewed</p>
        </div>

        <!-- <div class="d-flex align-items-center note-wrapper">
            <span class="material-symbols-rounded">&#xe86c;</span>
            <p class="note">Artist accepted your proposal</p>
          </div> -->

        <!-- CANCELLED PROPOSAL -->
        <!-- <div class="text-start cancelled-proposal-wrap">
            <h4 class="title">Cancellation Reason:</h4>
            <h4 class="mb-0 reason">Financial Setback</h4>
          </div> -->

        <h4 class="text-start event-title">Rock Revival Concert Series</h4>

        <div
          class="d-flex justify-content-between action-wrapper song-info-wrapper"
        >
          <div class="left">
            <h5>Event Date & Time</h5>
            <p class="d-flex align-items-center date-wrap">
              <span class="material-symbols-rounded date">&#xebcc;</span>
              June 12, 2023
            </p>
            <p class="d-flex align-items-center">
              <span class="material-symbols-rounded time">&#xe8b5;</span>
              2: 00 PM - 8:00 PM
            </p>
          </div>

          <div class="right">
            <h5>Location of Event</h5>
            <p>Naga City, Camarines Sur</p>
          </div>
        </div>

        <div
          class="d-flex justify-content-between action-wrapper song-info-wrapper"
        >
          <div class="left">
            <h5>Type of Event</h5>
            <p>Birthday Event</p>
          </div>

          <div class="right">
            <h5>Talent fee offered</h5>
            <p>2,000 - 3,000</p>
          </div>
        </div>

        <div class="text-start cover-letter-wrap">
          <h5>Cover letter</h5>
          <p class="mb-0 text-justify">
            I hope this letter finds you in good health and high spirits. I am
            writing to you as a passionate event organizer who has been
            captivated by your exceptional talent and musical prowess. It is
            with great excitement that I present to you a proposal for an
            upcoming event, [Event Name], where we would be honored to have you
            as the headline artist.
          </p>
        </div>
      </div>
      <!-- end of modal-body -->
    </div>
  </div>
  <cancellation-modal
    :showCancellation="showCancellation"
    @close-modal="closeCancellationModal"
  />
</template>

<script>
import { mapState, mapActions } from "vuex";
import CancellationModal from "./CancellationModal.vue";

export default {
  components: {
    CancellationModal,
  },
  props: {
    show: Boolean,
  },
  data() {
    return {
      showCancelModal: false,
      showCancellation: false,
    };
  },
  computed: {
    ...mapState({
      proposal: (state) => state.proposal,
    }),
  },
  methods: {
    ...mapActions(["cancelMyProposal"]),
    closeCancellationModal() {
      console.log("cancellation is clicked.");
      this.showCancellation = false;
      this.$emit("close-modal", "");
    },
    acceptRequest() {
      // this.$emit('close-modal')
      this.$emit("accept-request");
      // this.hideModal();
    },
    cancel() {
      //  console.log('cancel proposal is clicked.')
      // this.$emit('close-modal', '');
    },
    acceptRequest() {
      // this.$emit('close-modal')
      this.$emit("accept-request");
      // this.hideModal();
    },
    showToast() {
      this.isModalOpen = true;
      // You can set the message and description here or load them from an API.
      // Example:
      // this.message = "New message";
      // this.description = "New description";
      this.showToastComponent = true;
    },
  },
};
</script>

<style>
/* Styles for your modal */
</style>
