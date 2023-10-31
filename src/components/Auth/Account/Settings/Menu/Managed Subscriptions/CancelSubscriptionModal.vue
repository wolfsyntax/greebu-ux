<template>
    <div class="modal fade" id="cancelSubscription" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Confirm Subscription Cancellation</h3>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            <button type="button" class="btn ms-auto border-0 p-0 cancel-btn" id="close-modal-btn" data-bs-dismiss="modal" aria-label="Close">
              <span class="material-symbols-rounded cancel-icon">&#xe5c9;</span>
            </button>
  
          </div>
  
          <div class="modal-body">
  
            <div class="cancel-content-wrap">
                <h4>Are you sure you want to cancel your subscription?</h4>
                <p>Please note the following:</p>
                <ul>
                    <li>You will lose access to [Service Name] starting [End Date], which is the end of your current billing cycle.</li>
                    <li>Any unused portion of your subscription will not be refunded.</li>
                    <li>You may lose access to premium features and benefits associated with your subscription.</li>
                </ul>

            </div>

          </div>
  
          <div class="modal-footer">
            
            <button type="button" class="btn btn-secondary delete" @click="confirm">
              <Loading :infoText="buttonName" v-if="isLoading"/>
              <span v-else>{{ buttonName }}</span>
            </button>
            <button type="button" class="btn btn-primary cancel" data-bs-dismiss="modal" @click="cancel">Cancel</button>
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
      buttonName: 'Confirm Cancellation',
      isLoading: false,
      modal: null,
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
    
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>