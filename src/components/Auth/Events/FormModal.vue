<template>
  <div>
    <form class="required-fields" @submit.prevent="submit">
      <drag-drop @dragCover="setCover" />
      <div class="row py-2">
        <div class="col">
          <div class="form-group">
            <label for="eventType">Event Type</label>
            <select v-model="form.event_type" class="form-select" >
              <option v-for="(event_type, index) in eventTypes" :key="index" :value="event_type.id" >
                {{ event_type.name }}
              </option>
            </select>

            <div v-for="err in error?.event_type" :key="err" class="text-danger">{{ err }}</div>
          </div>          
        </div>
      </div>

      <div class="row py-2">
        <div class="col">
          <div class="form-group">
            <label for="eventType">Name of Event</label>
            <input type="text" v-model="form.event_name" placeholder="Name of Event" class="form-control city" required autocomplete="off"/>
            <div v-for="err in error?.event_name" :key="err" class="text-danger">{{ err }}</div>
          </div>
        </div>
      </div>
      
      
      <div class="row py-2">
        <div class="col">
          <div class="form-group">
            <label for="eventType">Location</label>
            <input type="text" v-model="form.location" placeholder="Location" class="form-control city" required autocomplete="off"/>
            <div v-for="err in error?.location" :key="err" class="text-danger">{{ err }}</div>
        </div>
        </div>
      </div>
      
      <div class="row py-2">
        <div class="col">
          <div class="form-group">
            <label for="eventType">Audience</label>
            <select v-mode="form.audience" class="form-select">
              <option value="false" selected>Private Event</option>
              <option value="true">Public Event</option>
            </select>
            <div v-for="err in error?.audience" :key="err" class="text-danger">{{ err }}</div>
          </div>
        </div>
      </div>

      <div class="row py-2">
        <div class="col">
          <div class="form-group">
            <label for="eventType">Start Date</label>
            <input type="date" v-model="form.start_date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off" :min="$moment().add(5, 'days').format('YYYY-MM-DD')" />
            <div v-for="err in error?.start_date" :key="err" class="text-danger">{{ err }}</div>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="eventType">End Date</label>{{ startDate }}
            <input type="date" v-model="form.end_date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off" :min="$moment().add(5, 'days').format('YYYY-MM-DD')" />
            <div v-for="err in error?.end_date" :key="err" class="text-danger">{{ err }}</div>
          </div>
        </div>
      </div>

      <div class="row py-2">
        <div class="col">
          <div class="form-group">
            <label for="eventType">Start Time</label>
            <input type="time" v-model="form.start_time" class="form-control " required autocomplete="off"/>

            <div v-for="err in error?.start_time" :key="err" class="text-danger">{{ err }}</div>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="eventType">End Time</label>
            <input type="time" v-model="form.end_time" class="form-control " required autocomplete="off"/>

            <div v-for="err in error?.end_time" :key="err" class="text-danger">{{ err }}</div>
          </div>
        </div>
      </div>
      
      <div class="row py-2">
        <div class="col">
          <div class="form-group">
            <label for="eventDetails">Event Details</label>
            <textarea v-model="form.description" maxlength="500" class="form-control about-artist" placeholder="Write description" required>
            </textarea>
            <div v-for="err in error?.description" :key="err" class="text-danger">{{ err }}</div>
          </div>
        </div>
      </div>

      <div class="text-end">
        <button type="button" class="btn btn-outline-geebu mx-1" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-geebu mx-1" >
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
      this.$emit('next-step')
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
    }
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

.btn-geebu {
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
}
</style>