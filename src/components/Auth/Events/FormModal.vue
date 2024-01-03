<template>
  <div>
    <form class="required-fields" @submit.prevent="submit">
      <!-- <div class="upload-file-wrapper" v-if="cover">
        <div class="uploaded-image-wrapper" >
          <div>
            <img ref="uploadedImage" class="uploaded-image" :src="cover" alt="banner-modal" />
          </div>

          <button type="button" class="remove-image" @click.prevent="removeBanner">
            <span class="material-symbols-outlined">&#xe5cd;</span>
          </button>
        </div>
      </div>

      <drag-drop @dragCover="setCover" v-else/>
      <div v-for="err in error?.cover_photo" :key="err" class="text-center text-danger">{{ err }}</div> -->

      <div class="form-group">
        <label for="eventType">Event Type</label>
        <select
          v-model="form.event_type"
          class="form-select"
          style="text-transform: capitalize"
        >
          <option
            v-for="(event_type, index) in eventTypes"
            :key="index"
            :value="event_type"
          >
            {{ event_type }}
          </option>
        </select>
        <div v-for="err in error?.event_type" :key="err" class="text-danger">
          {{ err }}
        </div>
      </div>

      <div class="form-group">
        <label for="eventType">Name of Event</label>
        <input
          type="text"
          v-model="form.event_name"
          class="form-control"
          placeholder="Name of Event"
          required
          autocomplete="off"
        />
        <div v-for="err in error?.event_name" :key="err" class="text-danger">
          {{ err }}
        </div>
      </div>

      <div class="form-group">
        <label for="eventType">Venue Name</label>
        <input
          type="text"
          v-model="form.venue_name"
          class="form-control"
          placeholder="Venue Name"
          required
          autocomplete="off"
        />
        <div v-for="err in error?.venue_name" :key="err" class="text-danger">
          {{ err }}
        </div>
      </div>

      <div class="form-group">
        <label for="eventType">Venue Address</label>
        <div class="filter-location-wrap">
          <input
            type="text"
            v-model="form.street_address"
            class="form-control location-input"
            placeholder="Unit/Floor No. Bldg.Name,House/Bldg.No.,"
            required
            autocomplete="off"
          />
          <div v-for="err in error?.location" :key="err" class="text-danger">
            {{ err }}
          </div>
          <span class="material-symbols-rounded location-icon">&#xe0c8;</span>
        </div>

        <div class="d-flex justify-content-between venue-sub-groups">
          <div>
            <input
              type="text"
              v-model="form.barangay"
              class="form-control location-input"
              placeholder="Village/Subdivision, Barangay"
              required
              autocomplete="off"
            />
          </div>

          <div>
            <input
              type="text"
              v-model="form.city"
              class="form-control location-input"
              placeholder="Town/City"
              required
              autocomplete="off"
            />
          </div>

          <div>
            <input
              type="text"
              v-model="form.province"
              class="form-control location-input"
              placeholder="Province"
              required
              autocomplete="off"
            />
          </div>
        </div>
        <div
          v-for="err in error?.street_address"
          :key="err"
          class="text-danger"
        >
          {{ err }}
        </div>
      </div>

      <div class="form-group">
        <label for="eventType">Audience</label>
        <select v-model="form.audience" class="form-select">
          <option value="false" selected>Private Event</option>
          <option value="true">Public Event</option>
        </select>
        <div v-for="err in error?.audience" :key="err" class="text-danger">
          {{ err }}
        </div>
      </div>

      <div class="d-flex align-items-center start-end-wrap">
        <div class="form-group">
          <label for="eventType">Start Date</label>

          <input
            type="date"
            v-model="form.start_date"
            placeholder="YYYY-MM-DD"
            class="form-control"
            required
            autocomplete="off"
            :min="$moment().format('YYYY-MM-DD')"
          />
          <div v-for="err in error?.start_date" :key="err" class="text-danger">
            {{ err }}
          </div>
        </div>

        <div class="form-group">
          <label for="eventType">End Date</label>
          <input
            type="date"
            v-model="form.end_date"
            placeholder="YYYY-MM-DD"
            class="form-control"
            required
            autocomplete="off"
            :min="$moment().format('YYYY-MM-DD')"
          />
          <div v-for="err in error?.end_date" :key="err" class="text-danger">
            {{ err }}
          </div>
        </div>
      </div>

      <div class="d-flex align-items-center start-end-wrap">
        <div class="form-group">
          <label for="eventType">Start Time</label>
          <input
            type="time"
            v-model="form.start_time"
            class="form-control"
            required
            autocomplete="off"
            :min="$moment().add(3, 'hours').format('h:mm a')"
            @change="validateStartTime"
          />
          <div v-if="error?.start_time" class="text-danger">
            {{ error.start_time }}
          </div>
          <!-- <div v-if="error?.start_time" class="text-danger">
            <div v-for="err in error?.start_time" :key="err" class="text-danger">
            {{ err }}
            </div>
          </div> -->
        </div>

        <div class="form-group">
          <label for="eventType">End Time</label>
          <input
            type="time"
            v-model="form.end_time"
            class="form-control"
            required
            autocomplete="off"
          />
          <div v-for="err in error?.end_time" :key="err" class="text-danger">
            {{ err }}
          </div>
        </div>
      </div>

      <div class="row py-2" v-if="errorTime">
        <div class="col text-danger">
          {{ errorTime }}
        </div>
      </div>

      <div class="form-group">
        <label for="eventDetails">Event Details</label>
        <textarea
          v-model="form.description"
          maxlength="500"
          rows="7"
          class="form-control about-artist"
          placeholder="Write description"
          required
        >
        </textarea>
        <div v-for="err in error?.description" :key="err" class="text-danger">
          {{ err }}
        </div>
        <p v-show="form.description" class="text-end char-count">
          Maximum 500 characters ( {{ remainingChars }} left)
        </p>
      </div>

      <div class="text-end action-btn-wrap">
        <button type="button" class="btn cancel" @click="back">Back</button>

        <button
          type="submit"
          class="btn next"
          :disabled="!validInput"
          v-if="showSubmitButtonForm2"
        >
          Next
        </button>
        <button type="button" class="btn disabled next" v-else>
          <LoadingIndicator />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
// eslint-disable-next-line import/no-absolute-path
import DragDrop from '/src/components/DragDrop.vue'
// eslint-disable-next-line no-unused-vars
import Multiselect from '@vueform/multiselect'
// eslint-disable-next-line import/no-absolute-path
import LoadingVue from '/src/components/Loading.vue'
// eslint-disable-next-line no-unused-vars
import Compressor from 'compressorjs'
// eslint-disable-next-line import/no-absolute-path
import LoadingIndicator from '/src/components/LoadingIndicator.vue'

export default {
  props: {
    // formData: {
    //   type: Object,
    //   default: {},
    //   required: false
    // },
    accessType: {
      type: String,
      default: 'create',
      required: false
    }
  },
  setup () {
    return {}
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    DragDrop,
    // eslint-disable-next-line vue/no-unused-components
    LoadingVue,
    LoadingIndicator
  },
  data: () => ({
    showSubmitButtonForm2: true,
    error: [],
    cover: '',
    isComplete: false,
    errorTime: ''
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
    ...mapActions(['fetchEventOptions', 'createEvent', 'verifyEvent']),
    setCover (val, files) {
      if (val) {
        // eslint-disable-next-line semi
        const maxSizeBytes = 1024 * 1024; // 1 MB
        // eslint-disable-next-line semi
        const mediumSizeBytes = 500 * 1024; // 500 KB
        // eslint-disable-next-line semi
        const largeSizeBytes = 1500 * 1024; // 1.5 MB
        // eslint-disable-next-line semi
        const skipCompressionSizeBytes = 100 * 1024; // 100 KB
        // eslint-disable-next-line semi
        let quality;
        if (files.size < skipCompressionSizeBytes) {
          // If the file size is less than 100KB, skip compression
          // eslint-disable-next-line semi
          quality = 1; // Set to 1 to keep original quality
        } else if (files.size < mediumSizeBytes) {
          // eslint-disable-next-line semi
          quality = 0.8;
        } else if (files.size < maxSizeBytes) {
          // eslint-disable-next-line semi
          quality = 0.2;
        } else if (files.size <= largeSizeBytes) {
          // eslint-disable-next-line semi
          quality = 0.4;
        } else {
          // eslint-disable-next-line semi
          quality = 0.2;
        }
        // eslint-disable-next-line no-unused-vars
        const compressor = new Compressor(val, {
          quality,
          success: (result) => {
            // eslint-disable-next-line semi
            const formData = new FormData();
            // eslint-disable-next-line semi
            formData.append('files', result, result.name);
            // eslint-disable-next-line semi
            this.form.cover_photo = result;
            // eslint-disable-next-line semi
            this.form.cover = URL.createObjectURL(result);
            // eslint-disable-next-line semi
            this.cover = URL.createObjectURL(result);
          // eslint-disable-next-line comma-dangle
          },
        })
      }
    },
    removeBanner () {
      this.form.cover = ''
      this.form.cover_photo = ''
      this.cover = ''
    },
    back () {
      this.$emit('next-step', 'cover')
      this.$emit('prev')
      console.log('Back')
    },
    submit () {
      // eslint-disable-next-line semi
      this.showSubmitButtonForm2 = false;

      // eslint-disable-next-line semi
      console.log('Emit: ', this.form);
      if (this.accessType !== 'create') {
        console.log('Form modal submit: ', typeof this.form.cover_photo)
        if (typeof this.form.cover_photo === 'string')
          // eslint-disable-next-line curly, semi
          delete this.form.cover_photo;
        // eslint-disable-next-line semi
        delete this.form.lat;
        // eslint-disable-next-line semi
        delete this.form.long;
        // eslint-disable-next-line semi
        this.form.mode = 'update';
      }
      this.verifyEvent()
        .then((res) => {
          // eslint-disable-next-line semi
          console.log('Next Step: ', res);
          // eslint-disable-next-line semi
          this.$emit('next-step');
          // eslint-disable-next-line semi
          this.$emit('next');
          // eslint-disable-next-line semi
          this.showSubmitButtonForm2 = true;
        })
        .catch((err) => {
          // eslint-disable-next-line semi
          console.log('Event Verify [error]: ', err);
          // eslint-disable-next-line no-unused-vars
          const {
            status,
            // eslint-disable-next-line no-unused-vars
            message,
            // eslint-disable-next-line no-unused-vars
            result: { errors, form }
          } = err
          if (status === 500) {
            if (typeof errors === 'string' && errors === 'Unauthenticated.')
              // eslint-disable-next-line curly
              this.$store.dispatch('signout')
          }
          this.error = errors
        })
    },
    validateStartTime () {
      const minimumStartTime = this.$moment().add(3, 'hours')
      const selectedStartTime = this.$moment(this.form.start_date + ' ' + this.form.start_time)

      if (selectedStartTime.isBefore(minimumStartTime)) {
        this.$set(this.error, 'start_time', 'Start time must be at least 3 hours before the event.')
      } else {
        this.$set(this.error, 'start_time', null)
      }
    }
  },
  created () {},
  mounted () {
    // this.cover = this.form.cover_photo ? URL.createObjectURL(this.form.cover_photo) : '';

    console.log('Event Data: ', this.formData, this.form)
    if (
      this.form?.event_type !== '' &&
      this.form?.event_name !== '' &&
      this.form?.street_address !== '' &&
      this.form?.barangay !== '' &&
      this.form?.city !== '' &&
      this.form?.province !== '' &&
      this.form?.description !== '' &&
      this.form?.start_date !== '' &&
      this.form?.start_time !== '' &&
      this.form?.end_date !== '' &&
      this.form?.end_time !== '' &&
      this.form?.cover_photo !== ''
    )
      // eslint-disable-next-line curly
      this.isComplete = true

    this.fetchEventOptions()

    document
      .getElementById(
        this.accessType === 'create' ? 'createEventModal' : 'editEventModal'
      )
      .addEventListener('shown.bs.modal', () => {
        console.log('Event Form: ', this.form)
        this.step = 'detail'
      })
    // const myModal = document.getElementById('eventsModal');
    // myModal.addEventListener('shown.bs.modal', () =>
    // {
    //   this.$store.commit('RESET_EVENT_FORM')
    //   // this.form.event_type = this.eventTypes[0];
    //   this.step = 'detail';
    // });

    // myModal.addEventListener('hide.bs.modal', () =>
    // {
    //   this.$store.commit('RESET_EVENT_FORM')
    //   this.step = 'detail';
    //   this.cover = '';

    // });
    const currentDateTime = this.$moment()
    this.form.start_date = currentDateTime.format('YYYY-MM-DD')
    this.form.end_date = currentDateTime.format('YYYY-MM-DD')
    const minimumStartTime = currentDateTime.add(3, 'hours').format('HH:mm')
    this.form.start_time = minimumStartTime
    const minimumEndTime = currentDateTime.add(1, 'hour').format('HH:mm')
    this.form.end_time = minimumEndTime
  },
  computed: {
    ...mapGetters(['eventCover']),
    ...mapState({
      form: (state) => state.events.form,
      eventTypes: (state) => state.events.event_types
    }),
    startDate () {
      return this.$moment().format('DD-MM-YYYY')
    },
    remainingChars () {
      return 500 - (this.form.description ? this.form.description.length : 0)
    },
    eventEnd () {
      return `${this.form.end_date} ${this.form.end_time}`
    },
    eventStart () {
      return `${this.form.start_date} ${this.form.start_time}`
    },
    validInput () {
      if (this.isComplete) {
        if (this.$moment(this.eventEnd).isAfter(this.eventStart)) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.errorTime = ''
          return true
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.errorTime = `The end date and time must be a date after or equal to ${this.eventStart}.`
        }
      }

      return false
    }
  },
  watch: {
    form: {
      handler (val) {
        console.log('[FormModal.vue] Form data updated: ', val)
        this.isComplete = false
        if (
          val.event_type !== '' &&
          val.event_name !== '' &&
          val.street_address !== '' &&
          val.barangay !== '' &&
          val.city !== '' &&
          val.province !== '' &&
          val.description !== '' &&
          val.start_date !== '' &&
          val.start_time !== '' &&
          val.end_date !== '' &&
          val.end_time !== '' &&
          val.cover_photo !== ''
        )
          // eslint-disable-next-line curly
          this.isComplete = true

        if (
          val.start_date !== '' &&
          val.start_time !== '' &&
          val.end_date !== '' &&
          val.end_time !== ''
        ) {
          this.errorTime = ''

          if (!this.$moment(this.eventEnd).isAfter(this.eventStart)) {
            this.errorTime = `The end date and time must be a date after or equal to ${this.eventStart}.`
          }
        } else if (val.start_date === '' && val.end_date === '') {
          this.form.start_date = this.$moment()
            .format('YYYY-MM-DD')
          this.form.end_date = this.$moment()
            .format('YYYY-MM-DD')
        }

        if (this.accessType !== 'create') {
          this.form.cover = val.cover_photo

          this.cover =
            typeof val.cover_photo === 'string'
              ? val.cover_photo
              : val?.cover_photo
                ? URL.createObjectURL(val.cover_photo)
                : ''
        } else {
          // this.cover = val.cover_photo ? URL.createObjectURL(val.cover_photo) : '';
          const pattern = new RegExp(
            '^([a-zA-Z]+:\\/\\/)?' + // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
              '(\\#[-a-z\\d_]*)?$', // fragment locator
            'i'
          )

          if (pattern.test(val.cover_photo)) {
            this.cover = val.cover_photo
          } else if (val.cover_photo === '') {
            this.cover = ''
          } else {
            this.cover = URL.createObjectURL(val.cover_photo)
          }
        }
        // if (this.accessType === 'create') this.cover = val.cover_photo ? URL.createObjectURL(val.cover_photo) : '';
        // else if (this.accessType === 'edit') {
        //   this.form.cover = val.cover_photo;
        //   // this.form.cover_photo = val.cover_photo;

        //   this.cover = val.cover_photo;
        //   console.log('Event cover photo: ', val);
        // }
      },
      deep: true
    },
    eventTypes: {
      handler (val) {
        if (val) this.form.event_type = val[0]
      },
      deep: true
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/artist-ui.css";
</style>
