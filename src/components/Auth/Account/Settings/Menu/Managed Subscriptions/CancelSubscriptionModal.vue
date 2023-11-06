<template>
    <div class="modal fade" id="cancelSubscription" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Confirm Subscription Cancellation</h3>
            <CloseModalButton />
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
            <button type="button" class="btn btn-primary cancel" data-bs-dismiss="modal">Cancel</button>
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