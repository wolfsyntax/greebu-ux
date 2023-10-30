<template>
  <div class="my-bookings">
    <div class="content">
      <my-bookings />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import MyBookings from './My Bookings/Index.vue'

export default {
  components: {
    MyBookings
  },
  setup()
  {


    return {}
  }
}
</script>

<style lang="scss" scoped></style>