<template>
<div class="modal fade modal-lg" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="staticBackdropLabel">Create an Event</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="eventModalDismiss"></button>
      </div>
      <div class="modal-body" >
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
              <input type="date" v-model="form.start_date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off" :min="$moment().add(5, 'days').format('YYYY-MM-DD')" />
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
              <LoadingVue :infoText="buttonName" v-if="isLoading"/>
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
export default {
  props: {
    eventDate: 'string',
  },
  setup () {
    

    return {}
  },
  data: () => ({
    buttonName: 'Submit',
    agreeFee: false,
  }),
  computed: {
    ...mapState({
      form: state => state.booking.form,
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
  methods: {
    ...mapActions([
      'createBooking',
    ]),
    submit() {
      this.createBooking()
    }
  },
  mounted() {
    // const myModal = document.getElementById('bookingModal');

    // myModal.addEventListener('shown.bs.modal', () =>
    // {
    //   this.$store.commit('resetBooking');
    // });

    // myModal.addEventListener('hide.bs.modal', () =>
    // {
    //   this.$store.commit('resetBooking');
    // });
  },
}
</script>

<style scoped>
@import '@/assets/css/artist-ui.css';
</style>