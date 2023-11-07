
<template>
  <div>{{ appointment_date }} {{ sched }}
    <v-calendar :options="calendarOptions" />
    <!-- <button data-bs-toggle="modal" data-bs-target="#bookingModal">Create Event</button> -->
    <book-modal :eventDate="event_date" />
    
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import BookModal from './BookingModal.vue';
import { Modal } from 'bootstrap';

// import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';

export default {
  setup () {
    

    return {}
  },
  data(){
    return {
      event_date: null,
      appointment_date: null,
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        eventConstraint: {
          start: this.$moment().add(5, 'days').format('YYYY-MM-DD'),
          // end: '2100-01-01'
        },

        // firstDay: 1, // 1 = Monday, 0 = Default (Sunday)
        selectable: true,
        selectAllow: this.selectAllow,
        select: this.selectDate,
        events: this.sched,
      }
    };
  },
  computed: {
    ...mapState({
      sched: state => state.booking.schedules
    })
  },
  components: {
    BookModal, 
  },
  mounted() {
    this.event_date = this.$moment().format('DD-MM-YYYY');

    const myModal = document.getElementById('bookingModal');

    // myModal.addEventListener('shown.bs.modal', () =>
    // {
    //   this.$store.commit('resetBooking');
    // });

    myModal.addEventListener('hide.bs.modal', () =>
    {
      // this.event_date = null;
      this.$store.commit('resetBooking');
    });

  },
  methods: {
    ...mapMutations([
      'resetBooking',
    ]),
    selectAllow({allDay, endStr, startStr, start}) {
      console.log('Select Info: ', allDay, endStr, startStr);
      console.log('Select Allow: ', this.$moment().diff(startStr));

      var startDate = this.$moment().add(5, 'days').format('YYYY-MM-DD');
      return this.$moment(startStr).diff(startDate) > 0;

    },
    selectDate: function(info) {
      console.log('Select Date: ', info)
    },
    handleDateClick: function(arg) {
      
      this.event_date = arg.dateStr;
      this.$store.commit('resetBooking');
      var startDate = this.$moment().add(5, 'days').format('YYYY-MM-DD');
      
      if (this.$moment(this.event_date).diff(startDate) > 0) {
        new Modal(document.getElementById('bookingModal'), {
          keyboard: false,
          backdrop: 'static',
        }).show();
      }


    },
    bookNow() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>