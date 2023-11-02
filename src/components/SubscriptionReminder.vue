<template>
    <div class="modal fade" id="subscriptionReminder" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header p-0">
            <h3 class="modal-title"></h3>
            <CloseModalButton />
          </div>
  
          <div class="modal-body p-0">

            <div class="info-box-wrap">
                <h3>Subscription Renewal Reminder</h3>
                <div class="text-center msg-wrap">
                    <p class="msg">We're sending this message to remind you that Artist subscription wil expire on</p>

                    <!-- show this if the subscription has ended -->
                    <!-- <p class="msg">We're sending this message to remind you that Artist Your Subscription Has Ended</p> -->

                    <h4 class="mb-0 date">MAY 22, 2023</h4>
                    <button class="btn renew-btn" @click="showSubscription">UPGRADE NOW</button> 

                    <!-- show the number of days since expiration -->
                    <!-- <h4 class="mb-0 date">5 DAYS SINCE EXPIRATION</h4>
                    <button class="btn renew-btn" @click="showSubscription">RENEW NOW</button> -->

                </div>
            </div>

            <div class="info-box-wrap">
                <h3>Your subscription Information</h3>
                <div class="details-wrap">
                    <div>
                        <h4 class="title">Mode of Payment</h4>
                    </div>
                    <div class="d-flex align-items-center justify-content-between ">
                        <h5>Subscription Name</h5>
                        <h5>Artist</h5>
                    </div>
                    <div class="d-flex align-items-center justify-content-between ">
                        <h5>Subscription Duration</h5>
                        <h5>30 Days</h5>
                    </div>
                    <div class="d-flex align-items-center justify-content-between ">
                        <h5>Subscription Cost</h5>
                        <h5>****************</h5>
                    </div>
                    <div class="d-flex align-items-center justify-content-between ">
                        <h5>Renewal Options</h5>
                        <h5>**************</h5>
                    </div>
                    <div class="d-flex align-items-center justify-content-between ">
                        <h5>Benefits and Features</h5>
                        <h5>+639784561237</h5>
                    </div>
                </div>
            </div>

            <!-- Display this if the artist is already a subscriber. -->

            <!-- <div class="info-box-wrap">
                <h3>Payment Details</h3>
                <div class="details-wrap">
                    <div>
                        <h4 class="title">Subscription Details</h4>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center border-0 mb-0">
                            <img src="/assets/subscription/gcash-logo-white-bg.webp" class="payment-logo" alt="Payment logo">
                            <p class="mb-0 phone-num">+639784561237</p>
                        </div>
                        <div>
                            <a href="/subscription" class="update">Update payment details</a>
                        </div>

                    </div>
                </div>
            </div> 

            <p class="mb-0 continue">To continue enjoying uninterrupted access to the features and benefits of our application, 
                please renew your subscription before the expiration date.</p> -->

          </div>
  
        </div>
      </div>
    </div>
    <subscription-modal></subscription-modal>
  </template>
  
<script >
import { mapActions, mapState } from 'vuex';
import SubscriptionModal from './Subscription/SubscriptionModal.vue';
import CloseModalButton from './CloseModalButton.vue';
import { Modal } from 'bootstrap';
  
export default {
  components: {
    SubscriptionModal,
    CloseModalButton
  },  
  created () {
  },
  watch: {
  },
  props: {
  },
data: () => ({
 
  }),
methods: {
  showSubscription(){
      new Modal(document.getElementById('selectPlanModal'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
      console.log('Modal', Modal);
    },
  },
  mounted() {

  },
  computed: {
 
  }
}
</script>

<style lang="scss" scoped>

</style>