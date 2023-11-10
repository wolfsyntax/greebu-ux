<template>
    <div class="modal fade" id="invoiceDetails" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Invoice</h3>
            <CloseModalButton />
          </div>
  
          <div class="modal-body">
  
            <div class="billed-wrap">
                <div class="d-flex align-items-center justify-content-between group-item">
                    <div>
                        <h5 class="opacity-0">Billed to</h5>
                        <h5>Billed to</h5>
                    </div>
                    <div>
                        <h5>Invoice Number:</h5>
                        <h5 class="bold-text">Nº: 000027</h5>
                    </div>
                </div>

                <div class="d-flex align-items-center justify-content-between group-item">
                    <div>
                        <h5 class="bold-text">Mauro Sicard</h5>
                        <h5>(+69) 856 - 0989</h5>
                    </div>
                    <div>
                        <h5>Date of payment</h5>
                        <h5 class="bold-text">October 26, 2023</h5>
                    </div>
                </div>

                <div class="d-flex align-items-center justify-content-between group-item">
                    <div>
                        <h5 class="text-uppercase">7#M.CASTRO STREET</h5>
                        <h5 class="text-uppercase">BRGY.TINAGO NAGA CITY</h5>
                    </div>
                    <div>
                        <h5>Next payment</h5>
                        <h5 class="bold-text">November 26,2023</h5>
                    </div>
                </div>
            </div> <!-- end of billed-wrap -->

            <table class="table">
                <thead class="tr-top-wrap">
                    <tr>
                    <th scope="col">DESCRIPTION</th>
                    <th scope="col">QTY</th>
                    <th scope="col">P. METHOD</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Monthly Subscription</td>
                        <td>1</td>
                        <td>
                            <div class="d-flex align-items-center payment-wrap">
                              <img src="/assets/subscription/gcash-logo.webp" class="payment-logo" alt="GCash logo">
                              <p class="mb-0">{{ formattedPhoneNumber }}</p>
                          </div>
                        </td>
                        <td>₱ 2,500</td>
                        <td>₱ 2,500</td>
                    </tr>
                </tbody>
            </table>

          </div>
  
          <div class="modal-footer">
            <div class="amount-wrap">
                <h5>Total amount:</h5>
                <h2 class="mb-0">₱ 2,500.00</h2>
            </div>
            
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script >
  import { mapActions, mapState } from 'vuex';
  import CloseModalButton from '/src/components/CloseModalButton.vue';
  import Loading from '/src/components/Loading.vue';
  
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
      phoneNumber: '+639272343323',
    }),
    methods: {
      
    
    },
    mounted() {
  
      // this.modal = document.getElementById('deleteConfirmation');
  
      // this.modal.addEventListener('hide.bs.modal', () => {
      //   console.log('Hide delete confirmation');
      // }).addEventListener('shown.bs.modal', () => {
      //   console.log('Show delete confirmation');
      // });
  
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
  
  <style lang="scss" scoped>
  
  </style>