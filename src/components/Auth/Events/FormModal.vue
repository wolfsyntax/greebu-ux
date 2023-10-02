<template>
  <div>
    <form class="required-fields" @submit.prevent="submit">
      <div class="upload-file-wrapper" v-if="cover">
        <div class="uploaded-image-wrapper" >
          <div >
            <img ref="uploadedImage" class="uploaded-image" :src="cover" alt="banner-modal" />
          </div>
        
          <button class="remove-image" @click="removeBanner" >
            <span class="material-symbols-outlined">&#xe5cd;</span> 
          </button>
        </div>
      </div>
      <drag-drop @dragCover="setCover" v-else/>
      
      <div v-for="err in error?.cover_photo" :key="err" class="text-danger">{{ err }}</div>
      <div class="row py-2">
        <div class="col">
          <div class="form-group">
            <label for="eventType">Event Type</label>
            <select v-model="form.event_type" class="form-select" style="text-transform: capitalize;">
              <option v-for="(event_type, index) in eventTypes" :key="index" :value="event_type">
                {{ event_type }}
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
      
      
      <div class="row my-2">
        <div class="col">
          <label for="eventType">Venue Address</label>
          <div class="row">
            <div class="row my-2">
              <div class="col-12">
                <input type="text" v-model="form.street_address" class="form-control" placeholder="Unit/Floor No. Premises/Bldg. Name, House/Bldg. No., Street Name" />
              </div>
            </div>
            <div class="row my-2">
              <div class="col-12 col-md-4">
                <input type="text" v-model="form.barangay" class="form-control" placeholder="Village/Subdivision, District, Barangay" />
              </div>
              <div class="col-12 col-md-4">
                <input type="text" v-model="form.city" class="form-control" placeholder="Town/City">
              </div>
              <div class="col-12 col-md-4">
                <input type="text" v-model="form.province" class="form-control" placeholder="Province">
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row py-2">
        <div class="col">
          <div class="form-group">
            <label for="eventType">Audience</label>
            <select v-model="form.audience" class="form-select">
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
            <label for="eventType">End Date</label>
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
            <textarea v-model="form.description" maxlength="500" rows="7" class="form-control about-artist" placeholder="Write description" required>
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
    cover: '',
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
      'fetchEventOptions', 'createEvent', 'verifyEvent',
    ]),
    setCover(val)
    {
      this.form.cover_photo = val;
      this.cover = URL.createObjectURL(val);
      console.log('Set Cover:: ', val);
    },
    removeBanner()
    {
      this.cover = '';
      this.form.cover_photo = '';
    },
    submit()
    {
      this.isLoading = true;
      console.log('Emit: ', this.form);

      this.verifyEvent()
        .then(res =>
        {
          console.log('Next Step: ', res);
          this.isLoading = false;
          this.$emit('next-step')
        })
        .catch(err =>
        {
          console.log('Event Verify [error]: ', err)
          const { status, message, result: { errors, form } } = err;
          this.isLoading = false;
          this.error = errors;

        })

    },
    
  },
  mounted()
  {
    this.cover = this.form.cover_photo ? URL.createObjectURL(this.form.cover_photo) : '';

    this.fetchEventOptions();
    const myModal = document.getElementById('eventsModal');
    myModal.addEventListener('shown.bs.modal', () =>
    {
      this.$store.commit('RESET_EVENT_FORM')
      // this.form.event_type = this.eventTypes[0];
      this.step = 'detail';
      if (this.form.cover_photo) {
        // this.cover = URL.createObjectURL(this.form.cover_photo);
      }
    });

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.$store.commit('RESET_EVENT_FORM')
      this.step = 'detail';
      this.cover = '';
      
    });
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

        if(val) this.form.event_type = val[0];
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

.upload-file-wrapper .upload-file-content{
    border-radius: 0.25rem;
    background: #EFEFFC;
    padding: 2rem 0;
}

.upload-file-wrapper .upload-file-content svg {
  margin-bottom: 1.5rem;
}

.upload-file-wrapper .upload-file-content .drag-files {
  color: var(--black-color);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.upload-file-wrapper .upload-file-content .image-type{
  color: rgba(0, 0, 0, 0.40);
  font-size: 0.75rem;
  font-weight: 400;
  margin-bottom: 1.25rem;
}

.upload-file-content  .select-files-wrapper label {
  color: var(--orange);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: transparent;
  padding: 0.75rem 1rem;
  border-radius: 0.3125rem;
  border: 1px solid var(--orange);
}

.upload-file-content  .select-files-wrapper label:hover{
    background-color: var(--orange);
    color: var(--white);
}

.upload-file-wrapper .uploaded-image-wrapper .uploaded-image{
  height: 21.313rem;
  width: 100%;
  border-radius: 0.25rem;
  position: relative;
  -o-object-fit: cover;
  object-fit: cover;
  backface-visibility: hidden;
}

.upload-file-wrapper .uploaded-image-wrapper .remove-image{
  margin: 0;
  position: absolute;
  top: 3%;
  left: 92%;
  border: 0;
  background-color: transparent;
}

.upload-file-wrapper .uploaded-image-wrapper .remove-image span{
  cursor: pointer;
  color: var(--white);
  margin: 0;
  position: absolute;
  top: 3%;
  left: 89.5%;
  background: #00000075;
  border-radius: 100px;
  padding: 2px;
  font-size: 16px;
  border: 0.1px solid #ffffff91;
}

.upload-file-wrapper .uploaded-image-wrapper .remove-image:hover span{
  border: 0.1px solid var(--white);
}

</style>