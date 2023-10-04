<template>
  <div class="modal fade modal-lg" id="createEventModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="staticBackdropLabel">Create an Event</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="eventModalDismiss"></button>
        </div>
        <div class="modal-body">
          <event-form @next-step="nextStep" v-if="step === 'detail'" />
          <event-lookup @next-step="finalStep" v-if="step === 'lookup'" />
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import EventForm from '/src/components/Auth/Events/FormModal.vue';
import EventLookup from '/src/components/Auth/Events/LookModal.vue';
import EventSuccess from '/src/components/Auth/Events/SuccessModal.vue';

export default {
  setup()
  {

  },
  components: {
    EventForm,
    EventLookup,
    EventSuccess,
  },
  data: () => ({
    step: 'detail',
  }),
  mounted()
  {
    const myModal = document.getElementById('createEventModal');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.$store.commit('RESET_EVENT_FORM')
      this.step = 'detail';
    });

    myModal.addEventListener('shown.bs.modal', () =>
    {
      this.$store.commit('RESET_EVENT_FORM')
      this.step = 'detail';
    });
  },
  beforeUnmount() {
    // this.$store.commit('RESET_EVENT_FORM')
  },
  methods: {
    nextStep()
    {
      this.step = 'lookup';
      console.log('method-nexStep: ', this.step);
    },
    finalStep(val = 'skip')
    {
      if (val === 'detail') this.step = 'detail';
      else if (val === 'success') {
        this.step = 'success';
        this.$emit('close', val);
        this.$refs.eventModalDismiss.click();
      }
      console.log('Modal [finalStep]: ', val)
      // this.$emit('close', val);
    }
  }
}
</script>
<style scoped >
textarea {
  /* height: 100px !important; */
  resize: none !important;
}
</style>