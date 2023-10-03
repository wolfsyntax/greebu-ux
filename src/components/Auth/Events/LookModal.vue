<template>
  <div>
    <h5>What are you looking for?</h5>
    <form @submit.prevent="submit" class="event-lookup">
      <div class="form-group">
        <label for="lookingFor">Looking for</label>
        <select class="form-select" v-model="look_for">
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
          >
            <template slot="singleLabel" slot-scope="{ option }" >
              <span style="text-transform: capitalize;">{{ option.text }}12</span>
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
          >
            <template slot="singleLabel" slot-scope="{ option }" >
              <span style="text-transform: capitalize;">{{ option.text }}12</span>
            </template>
          </multiselect>	
        </transition-group>
        
        <div v-for="err in error?.look_type" :key="err" class="text-danger">{{ err }}</div>
      </div>
      <div class="form-group">
        <label for="eventRequirement">Description / Requirement</label>
        <textarea id="eventRequirement" v-model="requirement" maxlength="500" rows="7" class="form-control about-artist" placeholder="Write description" required>
        </textarea>
        <div v-for="err in error?.requirement" :key="err" class="text-danger">{{ err }}</div>
      </div>
      
      <div class="text-end">
        <!-- <button type="button" class="btn btn-outline-geebu mx-1" @click="$emit('next-step', 'skip')" ref="eventSkip">Skip</button> -->
        <button type="button" class="btn btn-outline-geebu mx-1" @click="back">Back</button>
        <button type="button" class="btn btn-geebu mx-1" @click="submit">
          <span v-if="!canSkip">
            <i class="busy-submitting" v-if="isLoading"></i>Skip
          </span>
          <span v-else>
            <i class="busy-submitting" v-if="isLoading"></i>Submit
          </span>
        </button>
      </div>

    </form>    
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Multiselect from '@vueform/multiselect';

export default {
  setup () {
    

    return {}
  },
  data: () => ({
    error: null,
    isLoading: false,
    lookTypes: [],
    isSearchable: true,
    look_for: '',
    look_type: [],
    requirement: '',
  }),
  mounted()
  {
    this.look_for = 'artist';
    this.lookTypes = this.artistType
    document.getElementById('eventsModal').addEventListener('hide.bs.modal', () =>
    {
      this.$store.commit('RESET_EVENT_FORM')
      this.step = 'detail';
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
    }),
    canSkip()
    {
      return !( this.look_type == '' || this.requirement == '');
    },
  },
  methods: {
    ...mapActions(['createEvent', 'fetchEventOptions',]),
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
      this.$emit('next-step', 'detail')
      console.log('Back')
    },
    skip()
    {
      this.$emit('next-step', 'submit');
      console.log('Skip');
    },
    submit()
    {
      var action = !this.canSkip ? 'skip' : '';

      if (action !== 'skip') {
        this.form.look_for = this.look_for;
        this.form.look_type = this.look_type.join(",");
        this.form.requirement = this.requirement;
      }

      this.createEvent(action)
        .then(res =>
        {
          console.log(`${action} - Look: `, res);
          this.$emit('next-step', 'success')
        }).catch(err =>
        {
          const { status, message, result} = err;
          if (result?.errors) {
            this.error = result.errors;
          }
        })
    }
  },
  watch: {
    look_for: {
      handler(val)
      { 
        console.log('Look Type: ', val);
        this.look_type = this.lookTypes = [];
        if (val === 'artist') {
          this.lookTypes = this.artistType;
        } else if (val === 'service') {
          this.lookTypes = this.serviceType;
        }
        this.lookTypes = this.lookTypes.map(function (obj)
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
        console.log('LookTypes: ', this.lookTypes)
      },
      deep: true,
    },
    form: {
      handler(val)
      {
        if (val.look_for === 'artist') {
          
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