<template>
<div class="modal fade modal-lg" id="bookingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header border-0">
        <h4 class="modal-title" id="staticBackdropLabel">Request Booking</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="eventModalDismiss"></button>
      </div>
      <div class="modal-body border-0" >
        <form class="required-fields" @submit.prevent="submit">
          <div class="form-group">
            <label for="eventType">Event Type</label>
            <select v-model="form.event_type" class="form-select" style="text-transform: capitalize;">
              <option v-for="(event_type, index) in eventTypes" :key="index" :value="event_type">
                {{ event_type }}
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
            <label for="eventType">Venue Name</label>
            <input type="text" v-model="form.venue_name" class="form-control" placeholder="Venue Name" required autocomplete="off"/>
            <div v-for="err in error?.venue_name" :key="err" class="text-danger">{{ err }}</div>
          </div>

          <div class="form-group">
            <label for="eventType">Venue Address</label>
            <input type="text" v-model="form.street_address" class="form-control location-input" 
              placeholder="Unit/Floor No. Bldg.Name,House/Bldg.No.," required autocomplete="off"/>
            <div v-for="err in error?.location" :key="err" class="text-danger">{{ err }}</div>

            <div class="d-flex justify-content-between venue-sub-groups my-2">
              <div>
                <input type="text" v-model="form.barangay" class="form-control location-input" placeholder="Village/Subdivision, Barangay" required autocomplete="off"/>
              </div>

              <div>
                <input type="text" v-model="form.city" class="form-control location-input" placeholder="Town/City" required autocomplete="off"/>
              </div>

              <div>
                <input type="text" v-model="form.province" class="form-control location-input" placeholder="Province" required autocomplete="off"/>
              </div>

            </div> 
            <div v-for="err in error?.street_address" :key="err" class="text-danger">{{ err }}</div>
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
              <input type="date" v-model="form.start_date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off" :min="$moment(eventDate).format('YYYY-MM-DD')" />
              <div v-for="err in error?.start_date" :key="err" class="text-danger">{{ err }}</div>
            </div>

            <div class="form-group">
              <label for="eventType">End Date</label>
              <input type="date" v-model="form.end_date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off" :min="$moment(form.start_date).format('YYYY-MM-DD')" :max="$moment(form.start_date).add(1, 'days').format('YYYY-MM-DD')" />
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
        
          <div class="row py-2" v-if="errorTime">
            <div class="col text-danger">
              {{ errorTime }}
            </div>
          </div>

          <div class="form-group">
            <label for="eventDetails">Event Details</label>
            <textarea v-model="form.description" maxlength="500" rows="7" class="form-control about-artist" placeholder="Write description" required>
            </textarea>
            <div v-for="err in error?.description" :key="err" class="text-danger">{{ err }}</div>
            <p v-show="form.description" class="text-end char-count">Maximum 500 characters ( {{ remainingChars }} left)</p> 
          </div>

          <div class="form-check" @click="agreeFee = !agreeFee" >
            <input type="checkbox" v-model="agreeFee" class="form-check-input" />
            <label class="form-check-label" for="flexCheckDefault">Agree with the rate of the artist</label>
          </div>

          <div class="text-end action-btn-wrap">
            <button type="button" class="btn cancel" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn next" :disabled="!validInput">
              <loading :infoText="buttonName" v-if="isLoading" />
              <span v-else>{{ buttonName }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Loading from '/src/components/Loading.vue';

export default {
  watch: {
    "form.start_date": {
      handler(cur, prev) {
        console.log('Current Start Date => ', cur, prev)
        this.form.end_date = cur;
        
      },
      deep: true,
    }
  },
  components: {
    Loading,
  },
  props: {
    eventDate: 'string',
  },
  setup () {
    

    return {}
  },
  data: () => ({
    buttonName: 'Submit',
    agreeFee: false,
    error: null,
    isLoading: false,
    errorTime: null,
    isComplete: false,
  }),
  computed: {
    ...mapState({
      form: state => state.booking.form,
      eventTypes: state => state.events.event_types,
    }),
    eventEnd()
    {
      var endTime = this.form.end_time ? ` ${this.form.end_time}`: '';
      return `${this.form.end_date || this.form.start_date }${endTime}`;
    },
    eventStart()
    {
      var startTime = this.form.start_time ? ` ${this.form.start_time}`: '';
      return `${this.form.start_date || this.eventDate}${startTime}`;
    },
    remainingChars(){
      return 500 - (this.form.description ? this.form.description.length : 0);
    },
    validInput() {
      
      if (this.isComplete) {
        if (this.$moment(this.eventEnd).isAfter(this.eventStart)) {
          return true;
        } else {
          this.errorTime = `The end date and time must be a date after or equal to ${this.eventStart}.`;
        }
      } else {
        if (this.form.start_date && this.form.end_date) {
          console.log('::', this.$moment(this.eventEnd).isAfter(this.eventStart), this.$moment(this.eventEnd).isAfter(this.$moment(this.eventStart)));
          if (this.$moment(this.eventEnd).isAfter(this.eventStart)) {
            this.errorTime = '';
            return true;
          } else {
            
            this.errorTime = `The end date and time must be a date after or equal to ${this.eventStart}.`;
          }
        }
        console.log('[Not Complete] Valid Input: ', this.eventEnd, this.eventStart)
      }
      
      return false;
    }
  },
  methods: {
    ...mapActions([
      'createBooking', 'fetchEventOptions',
    ]),
    submit() {
      this.createBooking()
    }
  },
  mounted() {
    this.$store.commit('setBooking', {...this.form, start_date: this.eventDate});
    this.fetchEventOptions();
    const myModal = document.getElementById('bookingModal');

    myModal.addEventListener('shown.bs.modal', () =>
    {
      
      
      this.form.start_time = this.$moment().format('hh:mm');
      this.form.end_time = this.$moment().add(1, 'hour').format('hh:mm');
      console.log('Start time: ', this.form.start_time);
      this.form.start_date = this.$moment(this.eventDate).format('YYYY-MM-DD');
      this.form.end_date = this.$moment(this.eventDate).format('YYYY-MM-DD');
    });
  },
}
</script>

<style scoped>
@import '@/assets/css/artist-ui.css';
</style>