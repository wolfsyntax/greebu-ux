<template>
  <div>
    <form @submit.prevent="submit" v-if="page === 'request'">
      <div class="form-group">
        <label for="phone">Phone</label>
        <input id="phone" type="text" class="form-control" name="phone" v-model="form.phone" required autocomplete="off">
        <div v-if="errors?.phone" class="text-danger">{{ errors.phone.shift() }}</div>
      </div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="submit" >Verify Phone Number</button>
      </div>
    </form>
    <verify-card v-else />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Verify from '@/components/Auth/Verify.vue';

export default {
  components: {
    'verify-card': Verify
  },
  setup()
  {

  },
  data()
  {
    return {
      page: 'request',
      errors: null,
      message: null,
      form: {
        phone: null,
      }
    }
  },
  methods: {
    ...mapActions([
      'sendOTPCode', 
    ]),
    submit()
    {
      this.sendOTPCode(this.form)
        .then(response =>
        {
          const { status: statusCode, data: { result, status} } = response;
          console.log('Send OTP Code: ', response)
          if (statusCode === 200) 
          {
            this.page = '';
            console.log('Send OTP Code response: ', response?.data)
          } else {
            if (status === 500) {
              this.errors.push({ phone: typeof (result?.errors) === 'string' ? result?.errors : '' });
            }
          }
        })
        .catch(error =>
        {
          
        });
    }
  },
  computed: {
    ...mapGetters(["userInfo", "token"])
  }
}
</script>