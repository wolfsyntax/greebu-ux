<template>
  <div>
    <form @submit.prevent="submit">

      <drag-drop @dragCover="setCover" />

      <div v-for="err in error?.cover_photo" :key="err" class="text-danger">{{ err }}</div>

      <div class="form-group">
          <label for="eventType">Event Type</label>
          <select v-model="form.event_type" class="form-select" >
            <option v-for="(event_type, index) in eventTypes" :key="index" :value="event_type.id" >
                {{ event_type.name }}
              </option>
          </select>
          <div v-for="err in error?.event_type" :key="err" class="text-danger">{{ err }}</div>
      </div>

      <div class="form-group">
          <label for="eventType">Name of Event</label>
          <input type="text" v-model="form.event_name" class="form-control" placeholder="Name of Event" required autocomplete="off"/>
          <div v-for="err in error?.event_name" :key="err" class="text-danger">{{ err }}</div>
      </div>

      <div class="form-group">
          <label for="eventType">Location</label>
          <div class="location-wrap">
            <input type="text" v-model="form.location" class="form-control location-input" placeholder="Location" required autocomplete="off"/>
            <span class="material-symbols-rounded location-icon">&#xe0c8;</span>
          </div>
          <div v-for="err in error?.location" :key="err" class="text-danger">{{ err }}</div>
      </div>

      <div class="form-group">
          <label for="eventType">Audience</label>
          <select v-model="form.audience" class="form-select" >
            <option value="false" selected>Private Event</option>
              <option value="true">Public Event</option>
          </select>
          <div v-for="err in error?.audience" :key="err" class="text-danger">{{ err }}</div>
      </div>

      <div class="d-flex align-items-center start-end-wrap">

        <div class="form-group">
          <label for="eventType">Start Date</label>
          
          <input type="date" v-model="form.start_date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off" :min="$moment().add(5, 'days').format('YYYY-MM-DD')" />

          <!-- <input type="date" v-model="form.start_date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off" :min="$moment().add(5, 'days').format('YYYY-MM-DD')" /> -->
          <div v-for="err in error?.start_date" :key="err" class="text-danger">{{ err }}</div>
        </div>

        <div class="form-group">
          <label for="eventType">End Date</label>
          <input type="date" v-model="form.end_date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off" :min="$moment().add(5, 'days').format('YYYY-MM-DD')" />
          <div v-for="err in error?.end_date" :key="err" class="text-danger">{{ err }}</div>
        </div>

      </div>

      <div class="d-flex align-items-center start-end-wrap">

        <div class="form-group">
          <label for="eventType">Start Time</label>
          <input type="time" v-model="form.start_time" class="form-control " required autocomplete="off"/>
          <div v-for="err in error?.start_time" :key="err" class="text-danger">{{ err }}</div>
        </div>

        <div class="form-group">
          <label for="eventType">End Time</label>
          <input type="time" v-model="form.end_time" class="form-control " required autocomplete="off"/>
          <div v-for="err in error?.end_time" :key="err" class="text-danger">{{ err }}</div>
        </div>

      </div>

      <div class="form-group event-details-wrap">
          <label for="eventType">Event Details</label>
          <textarea v-model="form.description" maxlength="500" class="form-control about-artist" placeholder="Write description" required></textarea>
          <div v-for="err in error?.description" :key="err" class="text-danger">{{ err }}</div>
          <p v-show="form.description" class="text-end char-count">Maximum 500 characters ( {{ remainingChars }} left)</p> 
      </div>


      <div class="text-end action-btn-wrap">

        <button type="button" class="btn cancel" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn next">
          <span >
            <i class="busy-submitting" v-if="isLoading"></i>Next
          </span>
        </button>
      </div>

    </form>    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import DragDrop from '/src/components/DragDrop.vue';
export default {
  setup () {
    

    return {}
  },
  components: {
    DragDrop,
  },
  data: () => ({
    error: [],
    isLoading: false,
    // form: {
    //   cover_photo: '',
    //   event_type: '',
    //   event_name: '',
    //   venue: '',
    //   is_public: false,
    //   start_date: '',
    //   end_date: '',
    //   start_time: '',
    //   end_time: '',
    //   description: '',
    // }
  }),
  methods: {
    ...mapActions([
      'fetchEventOptions', 'createEvent',
    ]),
    setCover(val)
    {
      this.form.cover_photo = val;
      console.log('Set Cover:: ', val);
    },
    submit()
    {
      this.isLoading = true;
      this.createEvent()
        .then(res =>
        {
          console.log('Next Step: ', res);
          this.isLoading = false;
          this.$emit('next-step')
        })
        .catch(err =>
        {

          const { status, message, result: {errors, form} } = err;
          this.error = errors;

        })

    },
    
  },
  mounted()
  {
    this.fetchEventOptions()
  },
  computed: {
    ...mapState({
      form:       state => state.events.form,
      eventTypes: state => state.events.event_types,
    }),
    startDate()
    {
      return this.$moment().add(5, 'days').format('DD-MM-YYYY');
    },
    remainingChars(){
        return 500 - (this.form.description ? this.form.description.length : 0);
    },
  },
  watch: {
    eventTypes: {
      handler(val)
      {

        if(val) this.form.event_type = val[0].id;
      },
      deep: true,
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/artist-ui.css';

/* .btn-geebu {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.0175rem;
  border-radius: 0.3125rem;
  background: var(--orange);
  border: 0;
  margin: 3.5rem auto;
}

.btn-outline-geebu {
    --bs-btn-color: #FF6B00;
    --bs-btn-border-color: #FF6B00;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #FF6B00;
    --bs-btn-hover-border-color: #FF6B00;
    --bs-btn-focus-shadow-rgb: 13, 110, 253;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #FF6B00;
    --bs-btn-active-border-color: #FF6B00;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #FF6B00;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #FF6B00;
    --bs-gradient: none;
} */
</style>