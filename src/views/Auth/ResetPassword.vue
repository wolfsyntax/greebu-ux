<template>
  <div class="container my-5 py-5">
    <form @submit.prevent="submit" >
      
      <div class="form-group">
          <label for="password">Email</label>
          <input id="email" type="email" class="form-control" name="email" v-model="form.email" required autocomplete="off">
          <!-- <div v-if="errors?.email" class="text-danger">{{ errors.email}}</div> -->
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" class="form-control" name="password" v-model="form.password" required autocomplete="new-password">
        <!-- <div v-if="errors?.password" class="text-danger">{{ errors.password }}</div> -->
      </div>

      <div class="form-group">
        <label for="password-confirm">Confirm Password</label>
        <input id="password-confirm" type="password" class="form-control" name="password_confirmation" v-model="form.password_confirmation" required autocomplete="new-password">
        <!-- <div v-if="errors?.password_confirmation" class="text-danger">{{ errors.password_confirmation }}</div> -->
      </div>

      <div class="alert alert-danger" role="alert" v-if="errors">
        <section v-for="error in errors" :key="error">
          <ul v-for="e in error" :key="e">
            <li >
              {{  e }}
            </li>
          </ul>
        </section>
      </div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="submit">Reset Password</button>
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
        password: null,
        password_confirmation: null,
        //token: null,
      }
    }
  },
  methods: {
    ...mapActions([
      'resetPassword',
    ]),
    submit()
    {
      // $route.params.token
      // this.form.token = this.$route.params.token
      this.errors = null;
      
      if (this.form.token) {
        this.resetPassword(this.form)
          .then(response =>
          {
            const { status: statusCode, data: { result, status, message } } = response;
            if (statusCode === 203 && status === 422) {
              this.errors = result?.errors
            } else if (statusCode === 203) {
              console.log('Status [203]: ', message);
            } else if (statusCode === 200) {
              this.$router.push({name: 'login'});
            }
            console.log('Reset password response: ', response)
          })
      } else {
        console.log('Token is required.');
      }
    }
  },
  mounted()
  {
    this.form.token = this.$route.params.token
  },
  computed: {
    ...mapGetters(["userInfo", "token"])
  }
}
</script>