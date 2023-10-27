<template>
    <div>

    <div class="title-wrapper">
    <h3 class="title">Managed Subscriptions</h3>
    </div>

    <div class="d-flex align-items-center justify-content-between subscriptions-wrap">
        <div>
            <h4 class="title orange-text">Free Trial</h4>
            <p class="description">You are in a Free Plan, but your trial ends in 15 days. Explore subscription options now.</p>
            <div class="d-flex align-items-center subs-type-wrap">
                <span class="material-symbols-rounded timer-icon">&#xe425;</span>
                <p class="mb-0 subs-type">Your free trial ends in 3 days.</p>
            </div>
            <h5 class="mb-0 billing">Next Billing Date: <span>September 6,2023</span></h5>
        </div>
        <div>
            <button class="btn upgrade-btn">Upgrade Plan </button>
        </div>
    </div>

    <div class="d-flex align-items-center justify-content-between subscriptions-wrap">
        <div>
            <h4 class="title">Payment Method</h4>
            <div class="d-flex align-items-center payment-wrap">
                <img src="/assets/subscription/gcash-logo.webp" class="gcash-logo" alt="GCash logo">
                <p class="mb-0 phone-num">+639********</p>
            </div>
        </div>
        <div>
            <button class="btn upgrade-btn">Change payment method</button>
            <button class="btn invoice-btn">Payment Invoice</button>
        </div>
    </div>

    <div class="subscriptions-wrap">
        <h4 class="title">Cancel Subscription</h4>
        <p class="description">If you choose to cancel the subscription will be cancelled at the end of the billing period (date subscribed)</p>
        <button class="btn cancel-btn">Cancel Subscription</button>
        
    </div>


    </div>
  </template>
    
  <script>
  import { mapActions, mapState } from 'vuex';

  
  export default {
  components: {

  },
  setup()
  {


    return {}
  }
}
  </script>
  
  <style>
  /* Styles for your modal */
  </style>
  