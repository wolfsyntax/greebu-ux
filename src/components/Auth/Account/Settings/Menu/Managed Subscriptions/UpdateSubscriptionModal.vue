<template>
    <div class="modal fade" id="updateSubscription" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header p-0 border-0">
            <div>
                <h3 class="mb-0 modal-title">Update your Subscription</h3>
            </div>
            <CloseModalButton />
          </div>
  
          <div class="modal-body p-0">
            
            <form @submit.prevent="submit">
                <div class="plan-wrap">
                    <h4>Current Plan</h4>
                    <div class="d-flex align-items-center justify-content-between subscription-wrap">
                        <div>
                            <h5 class="account">Artist account</h5>
                            <p class="mb-0 description">Per month, billed each year (123)</p>
                        </div>
                        <div>
                            <h3 class="mb-0">₱ 500 /Monthly</h3>
                        </div>
                    </div>
                </div>

                <div class="mb-0 plan-wrap">
                    <h4>Available Plans</h4>
                    <div class="d-flex align-items-center justify-content-between subscription-wrap">
                        <div>
                            <h5 class="access">YEARLY unlimited access subscription</h5>
                            <div class="d-flex align-items-center price-wrap">
                                <h5 class="mb-0 price">₱123/ year</h5>
                                <button class="btn">Save 30%</button>
                            </div>
                            <p class="mb-0 description">Per month, billed each year (123)</p>
                        </div>
                        <div>
                            <button class="border-0 plan-btn" @click="showChangePlan">Change Plan</button>
                        </div>
                    </div>

                    <div class="d-flex align-items-center justify-content-between subscription-wrap">
                        <div>
                            <h5 class="monthly access">Monthly unlimited access subscription</h5>
                            <div class="price-wrap">
                                <h5 class="mb-0 price">₱123/ month</h5>
                            </div>
                            <p class="mb-0 description">Per month, billed each year (123)</p>
                        </div>
                        <div>
                            <button class="border-0 current-btn">Current Plan</button>
                        </div>
                    </div>
                </div>

            </form>
          </div>
  
          <div class="modal-footer p-0 border-0">
          </div>
        </div>
      </div>
    </div>
    <change-plan-modal></change-plan-modal>
  </template>
  
  <script >
  import { mapActions, mapState } from 'vuex';
  import CloseModalButton from '/src/components/CloseModalButton.vue';
  import ChangePlanModal from './ChangePlanModal.vue';
  import { Modal } from 'bootstrap';

export default {
components: {
    CloseModalButton,
    ChangePlanModal
},  
created () {
},
watch: {
},
props: {
},
data: () => ({
    showUpdate: true,
}),
mounted() {
},
methods: {
    showChangePlan(){
      new Modal(document.getElementById('changePlanSubscription'), {
        keyboard: false,
        backdrop: 'false',
      },).show();

    },
   
},
computed: {
}
}
</script>
  
<style lang="scss" scoped>
</style>