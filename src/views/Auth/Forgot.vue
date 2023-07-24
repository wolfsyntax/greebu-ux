<template>
  <div class="container my-5 py-5">
    <form @submit.prevent="submit">

      <div class="form-group">
        <label for="password">Email</label>
        <input id="email" type="email" class="form-control" name="email" v-model="form.email" required autocomplete="off">
        <div v-if="errors?.email" class="text-danger">{{ errors.email.shift() }}</div>
      </div>

      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="submit">Send Password Reset Link</button>
      </div>
    </form>

  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {

  },
  setup()
  {

  },
  data()
  {
    return {
      errors: null,
      form: {
        email: null,
      }
    }
  },
  methods: {
    ...mapActions([
      'forgotPassword',
    ]),
    submit()
    {
      // $route.params.token
      this.forgotPassword(this.form)
        .then(response =>
        {
          console.log('Forgot password response: ', response)
        });
    }
  },
  computed: {
    ...mapGetters(["userInfo", "token"])
  }
}
</script>