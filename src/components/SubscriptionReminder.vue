<template>
    <div class="modal fade" id="subscriptionReminder" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header p-0">
            <h3 class="modal-title"></h3>
            <button type="button" class="btn ms-auto border-0 p-0 cancel-btn" data-bs-dismiss="modal" aria-label="Close">
              <span class="material-symbols-rounded cancel-icon">&#xe5c9;</span>
            </button>
  
          </div>
  
          <div class="modal-body p-0">

            <div class="info-box-wrap">
                <h3>Subscription Renewal Reminder</h3>
                <div class="text-center msg-wrap">
                    <p class="msg">We're sending this message to remind you that Artist subscription wil expire on</p>
                    <h4 class="mb-0 date">MAY 22, 2023</h4>
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

            <div class="info-box-wrap">
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
                            <h5 class="update">Update payment details</h5>
                        </div>

                    </div>
                </div>
            </div>

            <p class="mb-0 continue">To continue enjoying uninterrupted access to the features and benefits of our application, 
                please renew your subscription before the expiration date.</p>

          </div>
  
        </div>
      </div>
    </div>

  </template>
  
<script >
import { mapActions, mapState } from 'vuex';
  
export default {
  components: {
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
  
  },
  mounted() {

  },
  computed: {
 
  }
}
</script>

<style lang="scss" scoped>

</style>