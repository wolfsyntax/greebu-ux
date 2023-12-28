<template>
  <div class="modal fade" id="eventCancellation" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0">
        <div class="d-flex justify-content-between title-wrapper">
          <div>
            <h3 class="title">Select cancellation Reason</h3>
            <p class="sub-title">Please select a cancellation reason in order to cancel the event</p>
          </div>

          <div>
            <button @click="$emit('close-modal')" class="p-0 border-0 close-btn" data-bs-dismiss="modal" ref="cancelReason">
              <span class="material-symbols-rounded close-icon">&#xe5c9;</span>
            </button>
          </div>
        </div> <!-- end of title-wrapper -->

        <div class="modal-body text-center p-0">

          <div class="text-start reason-wrap">
            <div class="form-group" v-for="(cancelReason, i) in reasons" :key="i" @click="reason = cancelReason">
              <input class="form-check-input" type="radio" v-model="reason" :value="cancelReason" id="flexCheckDefault">
              <label class="form-check-label" style="text-transform: capitalize;" for="flexCheckDefault">{{ cancelReason }}</label>
            </div>

            <div class="form-group" @click="reason = 'others'">
              <input class="form-check-input" type="radio" v-model="reason" value="others" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">Others</label>
            </div>

            <div class="text-end group-btn-wrap">
              <button class="btn cancel" data-bs-dismiss="modal">Cancel</button>
              <button class="btn confirm" @click="submit">Confirm</button>
            </div>
          </div>

        </div> <!-- end of modal-body -->
      </div>
    </div>
  </div>  
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    show: { 
      type: Boolean,
      default: false,
      required: true
    },
    
  },
  setup () {
    

    return {}
  },
  data: () => ({
    reason: 'change of plan',
  }),
  computed: {
    ...mapState({
      reasons: state => state.events.cancelReason,
    })
  },
  created() {
    this.reason = 'change of plan';
  },
  mounted() {
    const myModal = document.getElementById('eventCancellation');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.reason = 'change of plan';
    });

    myModal.addEventListener('shown.bs.modal', () =>
    {
      this.reason = 'change of plan';
    });

  },
  methods: {
    ...mapActions(['removeEvent', ]),
    submit() {
      
      this.removeEvent({reason: this.reason})
        .then(res => {
          console.log('Remove event response: ', res)
        })
        .finally(res => {
          this.$emit('confirm');
          this.$refs.cancelReason.click();
          
        });
        this.isLoading = true;
    }
  },
  watch: {
    show(cur, prev) {
      console.log('Show Cancellation Reason: ', cur);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>