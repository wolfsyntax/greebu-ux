<template>
  <div class="modal fade modal-lg" id="editEventModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="staticBackdropLabel">Edit an Event</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="eventModalDismiss"></button>
        </div>
        <div class="modal-body">

          <div class="stepper-wrapper">
            <div v-for="(s, index) in steppers" :key="index" 
            :class="{ 'step-active': index === currentStepper, 
            'step-completed': index < currentStepper }">
              <div class="stepper-item ">
    
                  <div class="step-counter" 
                  :class="{ 'active-num': index === currentStepper,
                  'step-completed-num': index < currentStepper }" >
                    {{ s }}
                  </div>

                  <div class="mb-0 step-name" v-if="index === 0" :class="{ 'step-active': index === currentStepper, 
            'step-completed': index < currentStepper }">Upload Event Cover</div>
                  <div class="mb-0 step-name" v-if="index === 1" :class="{ 'step-active': index === currentStepper, 
            'step-completed': index < currentStepper }">Event Information</div>
                  <div class="mb-0 step-name" v-if="index === 2" :class="{ 'step-active': index === currentStepper, 
            'step-completed': index < currentStepper }">Discover and Connect <br>(optional)</div>

              </div>
            
            </div>
          </div>

          <event-cover @next-step="nextDetailStep" accessType="edit" v-if="step === 'cover'"
          v-show="currentStepper === 0" @next="nextStepper" /> 
          <!-- :showGroupBtn="true" -->

          <event-form @next-step="nextStep" accessType="edit" v-if="step === 'detail'" 
          v-show="currentStepper === 1"  @prev="prevStepper" @next="nextStepper" />

          <event-lookup @next-step="finalStep" accessType="edit" v-if="step === 'lookup'"
          v-show="currentStepper === 2"  @prev="prevStepper" @next="nextStepper" />

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EventCover from '/src/components/Auth/Events/EventCover.vue';
import EventForm from '/src/components/Auth/Events/FormModal.vue';
import EventLookup from '/src/components/Auth/Events/LookModal.vue';
import EventSuccess from '/src/components/Auth/Events/SuccessModal.vue';
import { mapState } from 'vuex';

export default {
  setup()
  {
    return {
    
    }
  },
  components: {
    EventCover,
    EventForm,
    EventLookup,
    EventSuccess,
  },
  data: () => ({
    step: 'cover',

currentStepper: 0,
steppers: ['1', '2', '3'],
  }),
  mounted()
  {

    const myModal = document.getElementById('editEventModal');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      console.log('Resetting event form via edit modal');
      this.$store.commit('RESET_EVENT_FORM')
      this.step = 'cover';
      this.currentStepper = 0;
    });

    myModal.addEventListener('shown.bs.modal', () =>
    {
      
      // this.$store.commit('RESET_EVENT_FORM')
      this.currentStepper = 0;
      this.step = 'cover';
      console.log('Edit modal show', this.step);
      
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
    resetStepper() {
      this.currentStep = 0;
    },
    nextStepper() {
      if (this.currentStepper < this.steppers.length - 1) {
        this.currentStepper++;
      }
    },
    prevStepper() {
      if (this.currentStepper > 0) {
        this.currentStepper--;
      }
    },
    nextDetailStep(){ 
      this.step = 'detail';
      console.log('details-nexStep: ', this.step);
    },
    nextStep(val = 'lookup')
    {
      this.step = val;
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
    },
  }
}
</script>

<style scoped >
#editEventModal .stepper-wrapper {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: auto auto 2.5rem;
}
.stepper-item > div:not(:first-child),
#editEventModal .stepper-wrapper .step-active {
  color: #B8BBCF;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25rem; 
  text-align: center;
}
/* active classes */
#editEventModal .stepper-wrapper .step-active{
  color: var(--orange)!important;
}
#editEventModal .stepper-wrapper .step-completed{
  color: var(--orange)!important;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem; 
}

#editEventModal .stepper-item .active-num{
  border: 3px solid var(--orange)!important;
  color: var(--orange)!important;
}
#editEventModal .stepper-item .step-completed-num{
  border: 3px solid var(--orange)!important;
  color: var(--orange)!important;
}
#editEventModal .stepper-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

  /* @media (max-width: 768px) {
    font-size: 12px;
  } */
#editEventModal .stepper-item .step-counter{
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--white);
  border: 3px solid #B8BBCF;
  margin-bottom: 6px;
  font-size: 1.2rem;
  color: #B8BBCF;
}
@media (min-width: 992px) and (max-width: 1399.98px) {
  #editEventModal .stepper-wrapper {
    width: 85%;
    margin: auto auto 2rem;
}
#editEventModal .stepper-item .step-counter {
    width: 2.7rem;
    height: 2.7rem;;
    border: 2px solid #B8BBCF;
    margin-bottom: 4px;
    font-size: 1rem;
}
#editEventModal .stepper-wrapper .step-active {
  font-size: 0.875rem;
}
}
</style>