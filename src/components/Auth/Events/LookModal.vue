<template>
  <div>
    <h5>What are you looking for?</h5>
    <form @submit.prevent="submit" class="event-lookup">
      <div class="form-group">
        <label for="lookingFor">Looking for</label>
        <select class="form-select" v-model="form.look_for">
          <option value="artist" selected>Artist</option>
          <option value="service">Service</option>
        </select>
        <div v-for="err in error?.look_for" :key="err" class="text-danger">{{ err }}</div>
      </div>

      <div class="form-group">
        <label for="lookingFor">Type</label>
          <select class="form-select" style="text-transform: capitalize;" v-model="form.look_type">
            <option selected>Select Category</option>
            <option :value="look" v-for="(look, index) in eventLookType" :key="index">{{ look }}</option>
          </select>
          <div v-for="err in error?.look_type" :key="err" class="text-danger">{{ err }}</div>
      </div>
      <div class="form-group">
        <label for="eventRequirement">Description / Requirement</label>
        <textarea id="eventRequirement" v-model="form.requirement" maxlength="500" class="form-control about-artist" placeholder="Write description" required>
        </textarea>
        <div v-for="err in error?.requirement" :key="err" class="text-danger">{{ err }}</div>
      </div>

      <div class="text-end">
        <!-- <button type="button" class="btn btn-outline-geebu mx-1" @click="$emit('next-step', 'skip')" ref="eventSkip">Skip</button> -->
        <button type="button" class="btn btn-outline-geebu mx-1" @click="$emit('next-step', 'detail')" ref="eventSkip">Back</button>
        <button type="submit" class="btn btn-geebu mx-1" @click="$emit('next-step', 'submit')">
          <span >
            <i class="busy-submitting" v-if="isLoading"></i>Submit
          </span>
        </button>
      </div>
      {{ form }}
    </form>    
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
  setup () {
    

    return {}
  },
  data: () => ({
    error: null,
    isLoading: false,
  }),
  mounted()
  {

  },
  computed: {
    ...mapGetters(['eventLookType',]),
    ...mapState({
      form: state => state.events.form,
      eventTypes: state => state.events.event_types,
    })
  },
  methods: {
    ...mapActions(['updateEvent',]),
    submit()
    {
      this.updateEvent()
        .then(res =>
        {
          this.$refs.eventSkip.click();
        }).catch(err =>
        {
          const { status, message, result: {errors} } = err;
          
          this.error = errors;
        })
    }
  },
  watch: {
    form: {
      handler(val)
      {
        if (val) {
          
        }
      },
      deep: true,
    }
  }
}
</script>

<style scoped>
.event-lookup {

}

.event-lookup .form-group {
  margin: 0 0.5rem;
}

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