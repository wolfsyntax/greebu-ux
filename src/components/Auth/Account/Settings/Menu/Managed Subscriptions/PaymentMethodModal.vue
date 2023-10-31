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
            <button type="button" class="btn ms-auto border-0 p-0 cancel-btn" data-bs-dismiss="modal" aria-label="Close">
              <span class="material-symbols-rounded cancel-icon">&#xe5c9;</span>
            </button>
  
          </div>
  
          <div class="modal-body">
  
            <form @submit.prevent="submit">
                <div v-for="option in paymentType" :key="option.id" 
                    :class="['form-check', { 'selected': option.id === selectedOption }]"
                    :style="{ marginBottom: isLastFormCheck(index) ? '6rem!important' : '1.12rem' }">
                    <div class="payment-wrap">
                        <input class="form-check-input" type="radio" :name="'flexRadioDefault' + option.id" 
                        :id="'flexRadioDefault' + option.id" :checked="option.id === selectedOption" @change="selectOption(option.id)">
                    <label class="d-flex align-items-center justify-content-between form-check-label" :for="'flexRadioDefault' + option.id">
                        <div class="option-wrapper">
                            <h4>{{ option.title }}</h4>
                            <p class="sub-content" v-if="option.id === selectedOption">{{ option.subTitle }}</p>
                        </div>
                        <div class="price-wrapper">
                            <p class="price">+ ₱ {{ option.price }}</p>
                        </div>
                    </label>
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
  import Loading from '../../../../../Loading.vue';
  
export default {
components: {
    Loading
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
        price: 0
    },
    {
        id: 2,
        title: 'Gcash',
        subTitle: 'Pay with your Gcash Account',
        price: 500
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

#paymentMethod form .form-check {
    padding: 0.94rem 1.55rem;
    border-radius: 0.5625rem;
    border: 1.5px solid #E4E7EC;
    /* margin-bottom: 1.12rem; */
    display: block;
}
#paymentMethod form .form-check .payment-wrap {
    display: flex;
    align-items: center;
}
#paymentMethod form .form-check .form-check-input {
    margin-left: -0.5em;
    margin-right: 1.2rem;
    width: 1.25em;
    height: 1.25em;
    margin-top: 0;
    border-radius: 0.875rem;
    border: 1px solid #e4e7ec;
    background: transparent;
}
#paymentMethod form .form-check .form-check-input:checked[type="radio"] {
    background-image: url("/assets/create-song/checked-input.svg");
    border: 0;
    background-color: transparent;
}
#paymentMethod form .form-check label {
    width: 100%;
}
#paymentMethod form .form-check .option-wrapper {
    float: left;
    width: 80%;
}
#paymentMethod form .form-check label h4{
    color: #475467;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 0.75rem; 
    letter-spacing: 0.02344rem;
}
#paymentMethod form .form-check .price-wrapper {
    float: right;
    width: 20%;
    text-align: right;
}
#paymentMethod form .button-wrapper{
    margin-top: 4rem;
}
#paymentMethod form .button-wrapper button{
    color: var(--white);
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.125rem; 
    padding: 1rem 10rem;
    border-radius: 0.375rem;
    background-color: var(--orange);
    border: none;
}
// #paymentMethod form .form-check.selected {
//     border: 2px solid var(--orange) !important;
//     border-radius: 0.75rem;
//     background: #fffaf7;
// }
// #paymentMethod form .form-check.selected * {
//     color: var(--orange) !important;
// }

</style>