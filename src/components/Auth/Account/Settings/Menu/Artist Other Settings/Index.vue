<template>
    <div>

    <div class="title-wrapper">
    <h3 class="title">Other Settings</h3>
    </div>

    <div class="accept-send-proposal-wrap">

        <div class="d-flex align-items-center toggle-switch-wrap">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            </div>
            <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept events?</label>
        </div>
        
        <div class="d-flex align-items-center toggle-switch-wrap">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            </div>
            <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept custom song?</label>
        </div>

        <div class="d-flex align-items-center toggle-switch-wrap">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            </div>
            <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept booking for special occassions?</label>
        </div>

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
  