<template>
  <div>
    <form @submit.prevent="submit"></form>
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
      //  'updateUserProfile', 
    ]),
    submit()
    {
      this.$emit('form', this.form)
    }
  },
  computed: {
    ...mapGetters(["profileForm"]),
    ...mapState({
      account: state => state.account
    }),
  },
  watch: {

  }
}
</script>

<style lang="scss" scoped></style>