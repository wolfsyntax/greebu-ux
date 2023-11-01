<template>
    <div>

    <div class="title-wrapper">
    <h3 class="title">Managed Subscriptions</h3>
    </div>

    <div class="d-flex align-items-center justify-content-between subscriptions-wrap">
        <div>
            <h4 class="title orange-text">Free Trial</h4>
            <p class="description">You are in a Free Plan, but your trial ends in 15 days. Explore subscription options now.</p>
            <div class="d-flex align-items-center subs-type-wrap"> <!-- warning-wrap-->
                <span class="material-symbols-rounded timer-icon">&#xe425;</span>
                <p class="mb-0 subs-type">Your free trial ends in 15 days.</p>
                <!-- <p class="mb-0 subs-type">Your free trial of has ended.</p> -->
            </div>
            <h5 class="mb-0 billing">Next Billing Date: <span>September 6,2023</span></h5>
        </div>
        <div>
            <button class="btn upgrade-btn" @click="showSubscription">Upgrade Plan </button>
        </div>
    </div>

    <div class="d-flex align-items-center justify-content-between subscriptions-wrap">
        <div>
            <h4 class="title">Payment Method</h4>
            <div class="d-flex align-items-center payment-wrap">
                <img src="/assets/subscription/gcash-logo.webp" class="gcash-logo" alt="GCash logo">
                <p class="mb-0 phone-num">{{ formattedPhoneNumber }}</p>
            </div>
        </div>
        <div>
            <button class="btn upgrade-btn" @click="showPaymentMethod">Change payment method</button>
            <button class="btn invoice-btn" @click="showPaymentHistory">Payment Invoice</button>
        </div>
    </div>

    <div class="subscriptions-wrap">
        <h4 class="title">Cancel Subscription</h4>
        <p class="description">If you choose to cancel the subscription will be cancelled at the end of the billing period (date subscribed)</p>
        <button class="btn cancel-btn" @click="showCancelSubscription"
       >Cancel Subscription</button>
    </div>

    <!-- Display this information two days before the plan expires, but do not show it otherwise -->

    <div class="subscriptions-wrap">
        <button class="btn cancel-btn" @click="showSubscReminder">Subscription Renewal Reminder</button>
    </div>

    </div>
    <subscription-modal></subscription-modal>
    <payment-method-modal></payment-method-modal>
    <payment-history-modal></payment-history-modal>
    <cancel-subscription-modal></cancel-subscription-modal>
    <subscription-reminder></subscription-reminder>
  </template>
    
  <script>
  import { mapActions, mapState } from 'vuex';
  import CancelSubscriptionModal from './CancelSubscriptionModal.vue';
  import SubscriptionModal from '../../../../../Subscription/SubscriptionModal.vue';
  import PaymentHistoryModal from './PaymentHistoryModal.vue';
  import PaymentMethodModal from './PaymentMethodModal.vue';
  import SubscriptionReminder from '../../../../../SubscriptionReminder.vue'
  import { Modal } from 'bootstrap';
  
  export default {
  components: {
    CancelSubscriptionModal,
    SubscriptionModal,
    PaymentHistoryModal,
    PaymentMethodModal,
    SubscriptionReminder
  },
  setup()
  {
    return {
      phoneNumber: '+639272343323'
    }
  },
  methods: {
    showCancelSubscription(){
      new Modal(document.getElementById('cancelSubscription'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
      console.log('Modal', Modal);
    },
    showSubscription(){
      new Modal(document.getElementById('selectPlanModal'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
      console.log('Modal', Modal);
    },
    showPaymentMethod(){
      new Modal(document.getElementById('paymentMethod'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
      console.log('Modal', Modal);
    },
    showPaymentHistory(){
      new Modal(document.getElementById('paymentHistory'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
      console.log('Modal', Modal);
    },
    showSubscReminder(){
      new Modal(document.getElementById('subscriptionReminder'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
      console.log('Modal', Modal);
    }
  },
  computed: {
    formattedPhoneNumber(){
      const prefix = this.phoneNumber.slice(0, 4);
      const suffix = this.phoneNumber.slice(-3);
      const middle = '*'.repeat(this.phoneNumber.length -7);

      return prefix + middle + suffix;
    }
  }
}
  </script>
  
  <style>
  /* Styles for your modal */
  </style>
  