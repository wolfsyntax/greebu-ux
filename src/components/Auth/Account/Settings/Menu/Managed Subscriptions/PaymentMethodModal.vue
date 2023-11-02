<template>
    <div class="modal fade" id="paymentMethod" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <div>
                <h3 class="modal-title">Payment Method</h3>
                <p class="mb-0 modal-sub-title">Choose the new payment method you want to use</p>
            </div>
            <CloseModalButton />
          </div>
  
          <div class="modal-body">
  
            <form @submit.prevent="submit">
                <div v-for="(option, index) in paymentType" :key="option.id" 
                    :class="['form-check', { 'selected': option.id === selectedOption }]">
                    <!-- :style="{ marginBottom: isLastFormCheck(index) ? '6rem!important' : '1.12rem' }"> -->
                    <div class="d-flex align-items-start payment-wrap">
                        <input class="form-check-input" type="radio" :name="'flexRadioDefault' + option.id" 
                        :id="'flexRadioDefault' + option.id" :checked="option.id === selectedOption" @change="selectOption(option.id)">
                    <label class="d-flex align-items-start justify-content-between form-check-label" :for="'flexRadioDefault' + option.id">
                        <div class="option-wrapper">
                            <h4 class="card-name">{{ option.title }}</h4>
                            <p class="mb-0 sub-content">{{ option.subTitle }}</p>                          
                        </div>
                        <div class="payment-wrapper">
                             <img :src="option.paymentLogo"
                                class="payment-logo" 
                                :class="{ 'first-image': index === 0 }" alt="Payment logo"> 
                        </div>
                    </label>
                    </div>
                   
                    <div class="card-wrap" v-if="option.id === selectedOption && index === 0">

                        <div class="form-group">
                            <div class="d-flex align-items-center input-container">
                                <input type="text" name="card-num" placeholder="Card number" required />
                                <img src="/assets/subscription/card-num-icon.svg" class="card-num-icon" alt="Card number icon">
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center">
                            <div class="w-50 d-flex align-items-center input-container">
                                <input type="text" name="card-date" placeholder="MM / YY" required />
                                <img src="/assets/subscription/card-date-icon.svg" class="card-num-icon" alt="Card date icon">
                            </div>

                            <div class="w-50 d-flex align-items-center input-container">
                                <input type="text" name="card-cvv" placeholder="CVV" required />
                                <img src="/assets/subscription/card-lock-icon.svg" class="card-num-icon" alt="Card lock icon">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="d-flex align-items-center input-container">
                                <input type="text" name="card-holder" placeholder="Name of Card Holder" required />
                            </div>
                        </div>

                    </div>
                </div>

                <div class="text-center button-wrapper">
                    <button type="button" class="btn btn-primary">Select</button>
                </div>

            </form>

          </div>
  
          <div class="modal-footer">
            
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script >
  import { mapActions, mapState } from 'vuex';
  import CloseModalButton from '../../../../../CloseModalButton.vue';
  import Loading from '../../../../../Loading.vue';
  
export default {
components: {
    Loading,
    CloseModalButton
},  
created () {
},
watch: {
},
props: {
},
data: () => ({
    paymentType: [
    {
        id: 1,
        title: 'Credit/Debit Cards',
        subTitle: 'Pay with your Credit / Debit Card',
        paymentLogo: '/assets/subscription/credit-debit-logos.svg',
    },
    {
        id: 2,
        title: 'Gcash',
        subTitle: 'Pay with your Gcash Account',
        paymentLogo: '/assets/subscription/gcash-logo.webp',
    }
    ],
    selectedOption: 1
}),
methods: {
    selectOption(optionId) {
        this.selectedOption = optionId;
    },
    isLastFormCheck(index) {
        return index === this.paymentType.length - 1;
    },

},
mounted() {
},
computed: {
}
}
</script>
  
<style lang="scss" scoped>

// #paymentMethod form .form-check.selected {
//     border: 2px solid var(--orange) !important;
//     border-radius: 0.75rem;
//     background: #fffaf7;
// }
// #paymentMethod form .form-check.selected * {
//     color: var(--orange) !important;
// }

</style>