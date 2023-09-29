<template>
  <div class="modal fade modal-lg" id="eventsModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
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

export default {
  setup()
  {

  },
  components: {
    EventForm,
    EventLookup,
  },
  data: () => ({
    step: 'detail',
  }),
  mounted()
  {
    const myModal = document.getElementById('eventsModal');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.$store.commit('RESET_EVENT_FORM')
      this.step = 'detail';
    });
  },
  beforeUnmount() {
    this.$store.commit('RESET_EVENT_FORM')
  },
  methods: {
    nextStep()
    {
      this.step = 'lookup';
    },
    finalStep(val = 'skip')
    {
      this.$emit('close', val);
    }
  }
}
</script>