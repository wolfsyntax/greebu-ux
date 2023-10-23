<template>
  <div class="modal fade modal-lg" id="editEventModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="staticBackdropLabel">Edit an Event</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="eventModalDismiss"></button>
        </div>
        <div class="modal-body">
          <event-form @next-step="nextStep" accessType="edit" v-if="step === 'detail'" />
          <event-lookup @next-step="finalStep" accessType="edit" v-else-if="step === 'lookup'" />
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
import { mapState } from 'vuex';

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
    const myModal = document.getElementById('editEventModal');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      console.log('Resetting event form via edit modal');
      this.$store.commit('RESET_EVENT_FORM')
      this.step = 'detail';
    });

    myModal.addEventListener('shown.bs.modal', () =>
    {
      
      // this.$store.commit('RESET_EVENT_FORM')
      this.step = 'detail';
      console.log('Edit modal show', this.step)
    });
  },
  beforeUnmount() {
    // this.$store.commit('RESET_EVENT_FORM')
  },
  computed: {
    ...mapState({
      organizerEvent: state => state.events.event,
    })
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
        console.log('Final Step/Success Modal')
        this.$emit('close', val);
        this.$refs.eventModalDismiss.click();
      }

      // this.$emit('close', val);
    }
  }
}
</script>

<style scoped >
</style>