<template>
  <div class="">
    <button class="btn btn-secondary" @click="resendEmail()">Resend Email Verification</button>
  </div>
</template>

<script>
import Layout from '/src/components/Layouts/AuthLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  setup()
  {


    return {}
  },
  components: {

  },
  data: () => ({}),
  prop: {

  },
  methods: {
    ...mapActions(['resendEmail']),
  },
  computed: {

  },
  mounted() {
    
  },

}
</script>

<style lang="scss" scoped></style>