<template>
  <div>
    <h5>What are you looking for?</h5>
    <form @submit.prevent="submit" class="event-lookup">
      <div class="form-group">
        <label for="lookingFor">Looking for</label>
        <select class="form-select" v-model="form.look_for">
          <option selected>Select Category</option>
          <option value="artist">Artist</option>
          <option value="service">Service</option>
        </select>
      </div>

      <div class="form-group">
        <label for="lookingFor">Type</label>
          <select class="form-select" v-model="form.look_type">
            <option selected>Select Category</option>
            <option value="artist">Artist</option>
            <option value="service">Service</option>
          </select>
      </div>
      <div class="form-group">
        <label for="eventRequirement">Description / Requirement</label>
        <textarea id="eventRequirement" v-model="form.requirement" maxlength="500" class="form-control about-artist" placeholder="Write description" required>
        </textarea>
        <div v-for="err in error?.description" :key="err" class="text-danger">{{ err }}</div>
      </div>

      <div class="text-end">
        <button type="button" class="btn btn-outline-geebu mx-1">Skip</button>
        <button type="submit" class="btn btn-geebu mx-1" >
          <span >
            <i class="busy-submitting" v-if="isLoading"></i>Submit
          </span>
        </button>
      </div>
    </form>    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  setup () {
    

    return {}
  },
  computed: {
    ...mapState({
      form: state => state.events.form,
      eventTypes: state => state.events.event_types,
    })
  },
}
</script>

<style scoped>
.event-lookup {

}

.event-lookup .form-group {
  margin: 0 0.5rem;
}
</style>