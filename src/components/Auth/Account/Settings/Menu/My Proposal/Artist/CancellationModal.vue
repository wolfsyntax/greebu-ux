<template>
    <div class="request-song-modal" v-if="show">
      <div class="modal-content">
        <div class="d-flex justify-content-between title-wrapper">
          <div>
            <h3 class="title">Select cancellation Reason</h3>
            <p class="sub-title">Please select a cancellation reason in order to cancel the proposal to organizer</p>
          </div>
          
          <div>
            <button @click="$emit('close-modal')" class="close-button" ref="closeReqApp">
              <span class="material-symbols-rounded">&#xe5cd;</span>
            </button>
          </div>
        </div> <!-- end of title-wrapper -->
  
        <div class="text-center modal-body">
          
          <form>

            <div class="text-start reason-wrap">
              <div class="form-group">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Sudden Scheduling Conflict
                </label>
              </div>

              <div class="form-group">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Personal Emergency
                </label>
              </div>

              <div class="form-group">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Health Issues
                </label>
              </div>


              <div class="form-group">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Technical or Equipment Failure
                </label>
              </div>

              <div class="form-group">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Conflict to previous commitment
                </label>
              </div>

              <div class="form-group">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  No Transportation
                </label>
              </div>
           
              <div class="form-group">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Change of Mind
                </label>
              </div>

              <div class="form-group">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Others
                </label>
              </div>

              <div class="text-end group-btn-wrap">
                <button class="btn cancel">Cancel</button>
                <button class="btn confirm">Confirm</button>
              </div>

          </div>

          </form>
            
       

  
        </div> <!-- end of modal-body -->
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    props: {
      show: Boolean
    },
    data() {
      return {
      }
    },
    computed: {

    },
    methods: {
    },
  };
  </script>
  
  <style>/* Styles for your modal */</style>
  