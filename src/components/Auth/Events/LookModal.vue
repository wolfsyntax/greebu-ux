<template>
  <div>
    <form @submit.prevent="submit" class="event-lookup">

      <div class="form-group">
        <label for="lookingFor">Looking for</label>
        <select class="form-select" v-model="look_for" :disabled="!account.accept_proposal">
          <option value="artist" selected>Artist</option>
          <option value="service">Service</option>
          </select>
          <div v-for="err in error?.look_for" :key="err" class="text-danger">{{ err }}</div>
      </div>

      <div class="form-group">
        <label for="lookingFor">Type</label>
       
        <transition-group name="fade" tag="div" v-if="look_for === 'artist'">
          <multiselect  v-model="look_type" mode="tags"
            :close-on-select="false"
            :create-option="true" :options="async function (query) {
              return await fetchArtistType(query) || lookType
            }" :delay="0" 
            autocomplete="off" 
            ref="multiselect" 
            :filter-results="false"
            @open="onOpenOption"
            track-by="value"
            label="text"
            noOptionsText="Please input look type(s)"
            class=""
            :disabled="!account.accept_proposal"
          >
            <template slot="singleLabel" slot-scope="{ option }" >
              <span style="text-transform: capitalize;">{{ option.text }}</span>
            </template>
          </multiselect>	
        </transition-group>

        <transition-group name="fade" tag="div" v-else >
          <multiselect v-model="look_type" mode="tags"
            :close-on-select="false"
            :create-option="true" :options="async function (query) {
              return await fetchServiceType(query) || lookType
            }"  :delay="0" 
            autocomplete="off" 
            ref="multiselect" 
            :filter-results="false"
            @open="onOpenOption"
            track-by="value"
            label="text"
            noOptionsText="Please input look type(s)"
            class=""
            :disabled="!account.accept_proposal"
          >
            <template slot="singleLabel" slot-scope="{ option }" >
              <span style="text-transform: capitalize;">{{ option.text }}12</span>
            </template>
          </multiselect>	
        </transition-group>
        
        <div v-for="err in error?.look_type" :key="err" class="text-danger">{{ err }}</div>
      </div>

      <div class="form-group">
        <label for="lookingFor">Number of artist</label>
        <input type="number" id="number-of-artist" name="number_of_artist" v-model="total_participants" min="0" max="50" :disabled="!account.accept_proposal"/>
      </div>

      <div class="form-group event-details-wrap">
        <label for="eventRequirement">Description / Requirement</label>
        <textarea :disabled="!account.accept_proposal" id="eventRequirement" v-model="requirement" maxlength="500" rows="7" 
        class="form-control about-artist" placeholder="Write description" autocomplete="off">
        </textarea>
        <div v-for="err in error?.requirement" :key="err" class="text-danger">{{ err }}</div>
      </div>
      
      <div class="text-end action-btn-wrap">
        <!-- <button type="button" class="btn btn-outline-geebu mx-1" @click="$emit('next-step', 'skip')" ref="eventSkip">Skip</button> -->
        <button type="button" class="btn cancel" @click="back">Back</button>

        <!-- <button type="submit" class="btn next" :disabled="!canProceed" v-if="showSubmitButtonForm3">
          Submit
        </button>
        <button type="submit" class="btn next" v-else>
          <LoadingIndicator />
        </button> -->

        <button type="submit" class="btn next" :disabled="!canProceed">
          Submit
        </button>

      </div>

    </form>    
  </div>
</template>

<script>
import LoadingIndicator from "/src/components/LoadingIndicator.vue";
import { mapActions, mapGetters, mapState } from 'vuex';
import Multiselect from '@vueform/multiselect';

export default {
  props: {
    accessType: {
      type: String,
      default: 'create',
      required: false,
    },
  },
  components: {
    LoadingIndicator,
  },
  setup () {
    

    return {}
  },
  data: () => ({
    showSubmitButtonForm3: true,
    buttonName: 'Submit',
    error: null,
    lookTypes: [],
    isSearchable: true,
    look_for: '',
    look_type: [],
    requirement: '',
    total_participants: 0,
  }),
  mounted()
  {
    this.look_type = this.lookTypes = [];
    this.look_for = this.requirement = '';

    if (this.accessType === 'create') {
      this.look_for = 'artist';
      this.lookTypes = this.artistType;
    } else {
      console.log('Form via LookModal: ', this.form)
      this.look_for = this.form.look_for;
      this.requirement = this.form.requirement;
      console.log('Edit look form look type: ', this.form.look_types, this.look_for, this.requirement);
      this.look_type = this.form.look_types; 
      
    }

    document.getElementById(this.accessType === 'create' ? 'createEventModal' : 'editEventModal').addEventListener('hide.bs.modal', () =>
    {
      console.log('Reset event form via LookModal')
      this.$store.commit('RESET_EVENT_FORM')
      this.step = 'detail';
      this.lookTypes = [];
      this.look_for = '';
      this.total_participants = 0;
      this.look_type = [];
    });
  },
  components: {
    Multiselect,
  },
  computed: {
    ...mapGetters([]),
    ...mapState({
      form: state => state.events.form,
      eventTypes: state => state.events.event_types,
      artistType: state => state.events.event_artist_type,
      serviceType: state => state.events.event_service_type,
      account: state => state.account
    }),
    canProceed() {
      return ((this.look_for !== '' && this.look_type.length > 0 && this.total_participants > 0) || (this.total_participants === 0 && this.look_type.length === 0))
    },
    canSkip()
    {
      return !( this.look_type == '' || this.requirement == '');
    },
  },
  methods: {
    ...mapActions(['createEvent', 'fetchEventOptions', 'updateMyEvent', ]),
    onOpenOption()
    {
      
    },
    fetchArtistType(query)
    {
      return this.artistType.map(function (obj)
      {
        var words = obj.split(" ")

        return {
          value: obj,
          text: words.map((word) =>
          {
            return word[0].toUpperCase() + word.substring(1);
          }).join(" "),
        }
      })
    },
    fetchServiceType(query)
    {
      return this.serviceType.map(function (obj)
      {
        var words = obj.split(" ")

        return {
          value: obj,
          text: words.map((word) =>
          {
            return word[0].toUpperCase() + word.substring(1);
          }).join(" "),
        }
      })
    },
    back()
    {
      this.$emit('next-step', 'detail');
      this.$emit('prev');
      console.log('Back')
    },
    skip()
    {
      this.$emit('next-step', 'submit');
      console.log('Skip');
    },
    submit()
    {
      this.showSubmitButtonForm3 = false;

      var action = !this.canSkip ? 'skip' : '';

      if (action !== 'skip') {

        this.form.look_for = this.look_for;
        this.form.look_types = this.look_type;
        this.form.requirement = this.requirement;
        this.form.total_participants = this.total_participants || 1;

        console.log('Form to send: ', this.form);
      }
      
      if (this.accessType === 'create') {
        
        this.createEvent(action)
          .then(res =>
          {
            console.log(`${action} - Look: `, res);
            this.$emit('next-step', 'success')
            this.showSubmitButtonForm3 = true;
          }).catch(err =>
          {
            const { status, message, result} = err;
            if (result?.errors) {
              this.error = result.errors;
            }
          })
      } else {
        console.log('update event via LookModal.vue: ', this.form);
        if (typeof this.form.cover_photo === 'string') delete this.form.cover_photo;
        this.updateMyEvent(this.form.id)
          .then(res =>
          {

            this.$emit('next-step', 'success')
            this.showSubmitButtonForm3 = true;
          }).catch(err =>
          {
            const { status, message, result} = err;
            if (result?.errors) {
              this.error = result.errors;
            }
          });
      }
    }
  },
  watch: {
    look_for: {
      handler(val)
      { 
        
        //this.look_type = this.lookTypes = [];
        if (val === 'artist') {
          this.lookTypes = this.artistType;
        } else if (val === 'service') {
          this.lookTypes = this.serviceType;
        }

        if (val !== null || val !== '') {
          console.log(`Look ${val} Type: `, this.lookTypes);
          this.lookTypes = this.lookTypes.map(function (obj)
          {
            var words = obj?.split(" ") || [];

            return {
              value: obj,
              text: words.map((word) =>
              {
                return word[0].toUpperCase() + word.substring(1);
              }).join(" "),
            }
          });

        }
        console.log('LookTypes: ', this.lookTypes)
      },
      deep: true,
    },
    form: {
      handler(val)
      {
        console.log('Form via LookModal: ', this.form);
        this.look_for = val.look_for ?? 'artist'; 
        
        this.requirement = val.requirement ?? '';
        this.look_type = val.look_types ?? [];

      },
      deep: true,
    }
  }
}
</script>

<style scoped>
</style>