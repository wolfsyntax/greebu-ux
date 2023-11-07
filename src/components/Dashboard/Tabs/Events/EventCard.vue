<template>

  <div class="card">
    <div class="bg-wrapper">

      <div class="event-action-wrap">

      <button class="btn p-0 more-wrap" type="button" data-bs-toggle="dropdown" aria-expanded="false" v-if="userRole === 'organizer' && !myEvent.is_cancelled">
        <span class="material-symbols-rounded">&#xe5d3;</span>
      </button>

        <ul class="dropdown-menu" v-if="userRole === 'organizer'" >
          <li v-if="editable === true" >
            <button :id="`eventEdit-${myEvent.id}`" data-bs-toggle="tooltip" data-bs-title="..." data-s-trigger="hover focus" :class="canEdit ? 'border-0': ''" class="d-flex align-items-center btn" @click="editEvent" :disabled="canEdit">
              <span class="material-symbols-rounded">
              &#xe3c9;
            </span>
            Edit event
            </button>
          </li>

          <li>
            <button :id="`eventCancel-${myEvent.id}`" data-bs-toggle="tooltip" data-bs-title="..." data-bs-trigger="hover focus" :class="canCancel ? 'border-0' : ''" class="d-flex align-items-center btn delete" @click="remove" :disabled="canCancel">
              <span class="material-symbols-rounded">
                &#xe872;
              </span>
              Cancel Event
            </button>
          </li>
          
        </ul>
      </div>

      <img :src="myEvent.cover_photo" class="img-fluid card-bg" loading="lazy" alt="Event image">
      <div class="d-flex align-items-start organized-by">
        <img :src="myEvent.organizer_avatar" class="float-start" alt="Organized by logo">
        <div class="organizer-wrap">
        <h5>{{ myEvent.organizer_name }}</h5>
        <p class="mb-0">Organized by</p>
        </div>
      </div>

      </div>

    <div class="card-body">
      <div class="d-flex align-items-center event-details-wrap">
        <div>
          <h6 class="mb-0 month text-uppercase">{{ $moment(myEvent.start_date).format('MMM')}}</h6>
          <h3 class="mb-0 num">{{ $moment(myEvent.start_date).format('DD')}}</h3>
        </div>

        <div>
          <h4 class="event-name two-lines">{{ myEvent.event_name }}</h4>
          <h5 class="event-place two-lines">{{ myEvent.location }}</h5>
          <h5 class="date-time" v-if="$moment(myEvent?.start_date).isSame(myEvent?.end_date)" >{{ $moment(myEvent.start_date).format('dddd') }}, {{ startTime }} - {{ endTime }}</h5>
          <h5 class="date-time" v-else >{{ $moment(myEvent.start_date).format('dddd') }}, {{ startTime }} - {{ $moment(myEvent.end_date).format('dddd') }}, {{ endTime }}</h5>
        </div>
      </div>  
      
      <div >
        <button class="mb-0 btn btn-primary view-details" @click="$emit('show-detail', myEvent, 'view')">View Details</button>
      </div>
    </div>
  </div>




</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { Tooltip } from 'bootstrap';

export default {
  setup () {
    

    return {}
  },
  props: {
    editable: { 
      type: Boolean,
      default: true,
      required: false
    },
    myEvent: Object,
    eventCategory: String,
  },
  methods: {
    ...mapActions([
      'myOngoingEvents', 'myUpcomingEvents', 'myPastEvents', 'fetchEvent',
    ]),
    editEvent() {
      // if (this.$moment($moment(myEvent.start_date).format('YYYY-MM-DD')).diff(this.$moment().format('YYYY-MM-DD'), 'days') > 2) {
        this.$store.commit('RESET_EVENT_FORM')
        
        // this.fetchEvent(this.myEvent.id)
        //   .then(res => this.$emit('show-detail', this.myEvent, 'edit'));
        this.$store.commit("SET_EVENT_FORM", this.myEvent);
        this.$emit('show-detail', this.myEvent, 'edit');
        this.fetchEvent(this.myEvent.id)
      // }
      
    },
    remove() {
      this.$store.commit('SET_EVENT_ID', this.myEvent.id);
      this.$emit('show-detail', this.myEvent, 'remove')
    }
  },
  mounted() {
    try {
      const editTtooltip = new Tooltip(`#eventEdit-${this.myEvent?.id}`, {
        html: true,
        placement: 'right',
        trigger: 'hover focus',
      })

      editTtooltip.setContent({ '.tooltip-inner': 'You may only edit the event details up to 3 days before the scheduled date.' })

      const cancelTooltip = new Tooltip(`#eventCancel-${this.myEvent?.id}`, {
        html: true,
        placement: 'right',
        trigger: 'hover focus',
      })

      cancelTooltip.setContent({'.tooltip-inner': 'You may only cancel the event up to 2 days before the scheduled date.'});
      
    } catch (err) {

    }

  },
  computed: {
    ...mapGetters(['userRole',]),
    canEdit() {
      return this.$moment(this.$moment(this.myEvent.start_date).format('YYYY-MM-DD')).diff(this.$moment().format('YYYY-MM-DD'), 'days') < 3;
    },
    canCancel() {
      return this.$moment(this.$moment(this.myEvent.start_date).format('YYYY-MM-DD')).diff(this.$moment().format('YYYY-MM-DD'), 'days') < 2
    },
    startTime() {
      var d = this.$moment().format('YYYY-MM-DD');
      return this.$moment(`${d} ${this.myEvent.start_time}`).format('h:mm a');
    },
    endTime() {
      var d = this.$moment().format('YYYY-MM-DD');
      return this.$moment(`${d} ${this.myEvent.end_time}`).format('h:mm a');
    }

  }
}
</script>

<style lang="scss" scoped>

</style>