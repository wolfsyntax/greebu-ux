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

        <div class="text-start reason-wrap">
          <div class="form-group" v-for="(cancelReason, i) in reasons" :key="i" @click="reason = cancelReason">
            <input class="form-check-input" type="radio" v-model="reason" :value="cancelReason" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              {{ cancelReason }}
            </label>
          </div>
          
          <div class="form-group">
            <input class="form-check-input" type="radio" v-model="reason" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Others
            </label>
          </div>
                    
          <div class="text-end group-btn-wrap">
            <button class="btn cancel" @click="show = false">Cancel</button>

            <button class="btn confirm" @click="submit" v-if="showConfirmBtn">Confirm</button>
            <button class="btn disabled confirm" v-else><LoadingIndicator /></button>

          </div>
        </div>
      </div> <!-- end of modal-body -->
    </div>
  </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
import LoadingIndicator from '/src/components/LoadingIndicator.vue';

export default {
  props: {
    show: Boolean,
    proposal: Object,
  },
  components: {
    LoadingIndicator
  },
  data() {
    return {
      showConfirmBtn: true,
      reason: 'Sudden Scheduling Conflict',
    }
  },
  mounted() {
    
  },
  computed: {
    ...mapState({
      reasons: state => state.cancelReasons,
    })
  },
  methods: {
    ...mapActions([
      'cancelMyProposal',
    ]),
    submit() {
      this.showConfirmBtn = false;
      if (this.proposal?.id) {
        
        this.cancelMyProposal({id: this.proposal?.id, cancel_reason: this.reason})
          .then(res => {
            console.log(`Cancel Response for ${ this.proposal?.id }: `, res);
            const { status } = res;
            if (status == 200) this.$emit('close-modal', '');;
            this.showConfirmBtn = true;
          });

      }
    }
  },
};
  </script>
  
  <style>/* Styles for your modal */</style>
  