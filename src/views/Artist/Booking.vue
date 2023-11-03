
<template>
  <div>
    <input type="date" v-model="event_date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off" :min="$moment().add(5, 'days').format('YYYY-MM-DD')" />
    <!-- <button data-bs-toggle="modal" data-bs-target="#bookingModal">Create Event</button> -->
    <book-modal :eventDate="event_date" />
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<!-- Modal -->
<!-- <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div> -->
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import BookModal from './BookingModal.vue';
import { Modal } from 'bootstrap';

export default {
  setup () {
    

    return {}
  },
  data: () => ({
    event_date: null,
  }),
  components: {
    BookModal,
  },
  mounted() {
    this.event_date = this.$moment().format('DD-MM-YYYY');

  },
  methods: {
    ...mapMutations([
      'resetBooking',
    ]),
    bookNow() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>