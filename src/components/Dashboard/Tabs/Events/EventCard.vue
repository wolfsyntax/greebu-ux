<template>
  <div class="card">
    <div class="bg-wrapper">
      <img :src="event.cover_photo" class="img-fluid card-bg" loading="lazy" alt="Event image">
      <div class="d-flex align-items-start organized-by">
        <img :src="event.organizer_avatar" class="float-start" alt="Organized by logo">
        <div class="organizer-wrap">
          <h5>{{ event.organizer_name }}</h5>
          <p class="mb-0">Organized by</p>
        </div>
      </div>

    </div> <!-- end of bg-wrapper -->
    <div class="card-body">
      <div class="d-flex align-items-center event-details-wrap">
        <div>
          <h6 class="mb-0 month text-uppercase">{{ $moment(event.start_date).format('MMM')}}</h6>
          <h3 class="mb-0 num">{{ $moment(event.start_date).format('DD')}}</h3>
        </div>

        <div>
          <h4 class="event-name">{{ event.event_name }}</h4>
          <h5 class="event-place">{{ event.location }}</h5>
          <h5 class="date-time" v-if="$moment(event?.start_date).isSame(event?.end_date)" >{{ $moment(event.start_date).format('dddd') }}, {{ startTime }} - {{ endTime }}</h5>
          <h5 class="date-time" v-else >{{ $moment(event.start_date).format('dddd') }}, {{ startTime }} - {{ $moment(event.end_date).format('dddd') }}, {{ endTime }}</h5>
        </div>
      </div>
      
      <div>
        <button class="mb-0 btn btn-primary view-details">View Details</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  },
  props: {
    event: Object,
  },
  computed: {
    startTime() {
      var d = this.$moment().format('YYYY-MM-DD');
      return this.$moment(`${d} ${this.event.start_time}`).format('h:mm a');
    },
    endTime() {
      var d = this.$moment().format('YYYY-MM-DD');
      return this.$moment(`${d} ${this.event.end_time}`).format('h:mm a');
    }

  }
}
</script>

<style lang="scss" scoped>

</style>