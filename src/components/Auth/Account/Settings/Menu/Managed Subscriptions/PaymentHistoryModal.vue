<template>
    <div class="modal fade" id="paymentHistory" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Payment History</h3>
            <CloseModalButton />
          </div>
  
          <div class="modal-body">
  
            <div class="d-flex align-items-center justify-content-between search-download-wrap">
                <div class="position-relative d-flex align-items-center search-container" >
                    <button class="btn p-0 border-0 d-flex align-items-center">
                        <span class="material-symbols-rounded search-icon">&#xe8b6;</span>
                    </button>
                    <input type="text" class="search-input" placeholder="Search by amount, payment method...">
                </div>

                <div>
                    <button class=" d-flex align-items-center border-0 download-btn">
                        <span class="material-symbols-outlined download-icon">&#xe2c0;</span>
                        Download
                    </button>
                </div>
            </div>

            <table class="table">
                <thead class="tr-top-wrap">
                    <tr>
                    <th scope="col">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault"></label>
                      </div>
                    </th>
                    <th scope="col">PAYMENT ID</th>
                    <th scope="col">SUBSCRIPTION</th>
                    <th scope="col">PAYMENT DATE</th>
                    <th scope="col">AMOUNT</th>
                    <th scope="col">P. METHOD</th>
                    <th scope="col">NEXT PAYMENT</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault"></label>
                          </div>
                        </th>
                        <td>06c1774-7f3d...</td>
                        <td>Monthly</td>
                        <td>10/24/23</td>
                        <td>₱2,500.00</td>
                        <td>

                          <div class="d-flex align-items-center payment-wrap">
                              <img src="/assets/subscription/gcash-logo.webp" class="payment-logo" alt="Payment logo">
                              <p class="mb-0 payment-num">{{ formattedPhoneNumber }}</p>
                          </div>
                          
                        </td>
                        <td>11/24/23</td>
                        <td>
                          <div class="d-flex align-items-center status-wrap">
                            <span class="material-symbols-rounded check-icon">&#xe86c;</span>
                            <p class="mb-0">Succeeded</p>
                          </div>
                        </td>
                        <td>

                          <div class="dropdown-center dropdown-action">
                            <button class="btn dropdown-toggle p-0 border-0" 
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <span class="material-symbols-rounded more-icon">&#xe5d4;</span>
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <button class="btn p-0 border-0 view-details" @click="invoiceDetails">View details</button>
                              </li>
                              <li>
                                <button class="btn p-0 border-0 download-pdf">Download PDF</button>
                              </li>
                              <li>
                                <button class="btn p-0 border-0">Print</button>
                              </li>
                            </ul>
                          </div>

                        </td>
                    </tr>
                </tbody>
            </table>

          </div>
  
  
        </div>
      </div>
    </div>
    <InvoiceDetailsModal />
  </template>
  
<script >
import { mapActions, mapState } from 'vuex';
import InvoiceDetailsModal from './InvoiceDetailsModal.vue';
import CloseModalButton from '/src/components/CloseModalButton.vue';
import { Modal } from 'bootstrap';
  
export default {
  components: {
    InvoiceDetailsModal,
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
  invoiceDetails(){
    new Modal(document.getElementById('invoiceDetails'), {
    keyboard: false,
    backdrop: 'false',
  }).show();
}
  
  },
  mounted() {

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