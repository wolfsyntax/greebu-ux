<template>
  <div>
    Organizer
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup()
  {


    return {}
  },
  data: () => ({
    form: {}
  }),
  mounted()
  {
    this.fetchOrganizerOptions()
      .then(res =>
      {
        console.log('Account: ', this.account);
        console.log('Staff Roles: ', this.staff_roles);
        console.log('Event Types: ', this.event_types);
      });
  },
  props: {
    error: {
      type: Array,
      default: [],
      required: true
    },

  },
  methods: {
    ...mapActions([
      'fetchOrganizerOptions',
    ]),
    submit()
    {
      this.$emit('form', this.form)
    }
  },
  computed: {
    ...mapGetters(["profileForm"]),
    ...mapState({
      account: state => state.account,
      staff_roles: state => state.organizer.staffRoles,
      event_types: state => state.organizer.eventTypes,
    }),
  },
  watch: {

  }
}
</script>

<style scoped></style>