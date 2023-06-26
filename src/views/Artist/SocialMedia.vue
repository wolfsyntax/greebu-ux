<template></template>
<script>
import Layout from '@/components/Layouts/AuthLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    layout: Layout,
  },
  data()
  {
    return {
      form: {
        email: null,
        password: null,
      }
    }
  },
  setup()
  {

  },
  props: {
    errors: Object,
  },
  methods: {
    ...mapActions([
      'signin'
    ]),
    submit()
    {

      this.signin(this.form).then((response) =>
      {

        const { status } = response;

        var user = this.$store.state.user;
        var role = this.$store.state.role;

        if (role === 'artists') {
          this.$router.push("/artist");
        }

      });

    }
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      users: (state) => state.user,
    }),
  }
}
</script>
<style scoped></style>
