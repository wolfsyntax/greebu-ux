<template>
  <!-- <BlankHeader /> -->

  <section class="phone-verification">
    <div class="container">

       <div class="container-fluid" >123
    <form @submit.prevent="confirm">
      <div class="">
        <div class="row">
          <div class="col">
            {{  phone_num }}
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="username">Verification Code!</label>
              <input id="verifyCode" max="6" type="text" class="form-control" name="verifyCode" v-model="verifyCode" required autocomplete="off">  
              <span v-if="verifyMessage" class="text-danger">{{ verifyMessage }}</span>
          </div>
        
          <button @click.prevent="resendCode">Resend Code {{ $filters.timer(countdown) }}</button>
        </div>
      </div>
      <button type="submit">Confirm</button>
    </form>
  </div>

    </div>
  </section>







</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import BlankHeader from "@/components/Home/BlankHeader.vue";

export default {
  components: {
  BlankHeader
},
  data()
  {
    return {
      verifyCode: null,
      verifyMessage: null,
      countdown: 180,
      countdown_enabled: false,
      rate_countdown_enable: false,
      rate_countdown: 600,
      phone_num: null,
    }
  },
  props: {
    phone: { 
      type: String,
      default: null,
      required: true
    },

  },
  computed: {
    ...mapGetters(["userInfo", "info", "token", "isLoggedIn"])
    
  },
  mounted() {
    this.phone_num = this.phone || this.info?.phone;
  },
  setup () {
    

    return {}
  },
  methods: {
    ...mapActions(['resendOTPCode', 'verifyOTP', 'verifyOTPF']),
    async resendCode()
    {
      if (!this.countdown_enabled) {
        this.countdown_enabled = true;
        // resend request
        await this.resendOTPCode(this.$route.query.id)
          .then(response =>
          {
            const { status } = response;
            console.log('Resend Code Response: ', response);
          })
          .catch(err =>
          {
            this.countdown_enabled = false;
            this.countdown = 180;
          });
      }
    },
    async confirm()
    {

      this.verifyMessage = '';

      if (!this.isLoggedIn) {
        await this.verifyOTP({ id: this.$route.query.id, code: this.verifyCode })
          .then(response =>
          {
            const { status: statusCode, data: { status, message, result } } = response
            if (statusCode === 200 && status === 200) this.$router.push("/login");
            else if (statusCode === 203) {
              if (status === 422) {
                this.verifyMessage = 'The provided OTP code is invalid. Please try again with the correct code.';
              } else if (status === 500) {
                // this.verifyMessage = 'Too Many Attempts.';
                this.verifyMessage = `You have already surpassed the limit for resending the OTP code to your number Please wait ${this.$filters.timer(this.rate_countdown)} minutes to re send a new OTP code`;
              }
            }
            console.log('Verify OTP Response: ', response)
          })
          .catch(err =>
          {

          })
      } else {
        await this.verifyOTPF({ id: this.userInfo?.id, code: this.verifyCode })
          .then(response =>
          {
            const { status: statusCode, data: { status, message, result } } = response
            if (statusCode === 200 && status === 200) this.$router.push("/login");
            else if (statusCode === 203) {
              if (status === 422) {
                this.verifyMessage = 'The provided OTP code is invalid. Please try again with the correct code.';
              } else if (status === 500) {
                // this.verifyMessage = 'Too Many Attempts.';
                this.verifyMessage = `You have already surpassed the limit for resending the OTP code to your number Please wait ${this.$filters.timer(this.rate_countdown)} minutes to re send a new OTP code`;
              }
            }
            console.log('Verify OTP Response: ', response)
          })
          .catch(err =>
          {

          })
      }
    }
  },
  watch: {
    step(value)
    {
      if (value === '') {
        this.rate_countdown_enabled = true;
      }
    },
    countdown_enabled(value)
    {
      if (value) {
        setTimeout(() =>
        {
          this.countdown--;
        }, 1000);
      }
    },
    countdown: {
      handler(value)
      {

        if (value > 0 && this.countdown_enabled) {
          setTimeout(() =>
          {
            this.countdown--;
          }, 1000);
        } else {
          this.countdown_enabled = false;
          this.countdown = 180;
        }

      },
      immediate: true
    },
    rate_countdown_enabled(value)
    {
      if (value) {
        setTimeout(() =>
        {
          this.rate_countdown--;
        }, 1000);
      }
    },
    rate_countdown: {
      handler(value)
      {

        if (value > 0 && this.countdown_enabled) {
          setTimeout(() =>
          {
            this.rate_countdown--;
          }, 1000);
        } else {
          this.rate_countdown_enabled = false;
          this.rate_countdown = 600;
        }

      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>