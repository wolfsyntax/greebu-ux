<template>
  <layout>

  <section class="register">
    <div class="container-fluid" v-if="!$route.query.id">
      <div id="registerCarouselBanner" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#registerCarouselBanner" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#registerCarouselBanner" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#registerCarouselBanner" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="5000">
          </div>
          <div class="carousel-item" data-bs-interval="5000">
          </div>
          <div class="carousel-item" data-bs-interval="5000">
          </div>
        </div>
      </div>

      <div class="register-form">
        <div class="logo">
          <a href="/"><img src="/assets/geebu-logo.svg" width="175" height="46" alt="Logo"></a>
        </div>
        <div class="card">
          <div class="card-header">
            <h2>Create Account</h2>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>

          <div class="card-body">
            <form @submit.prevent="submit"> 
                                               <!-- Choose account type -->
              <div class="row row-checkbox">
                <div class="col-md-12">
                  <h3>Account Type</h3>
                  <p>Please choose your Account Type to create an account.</p>
                </div>

                <div class="col-md-12">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="customers" checked>
                    <label class="form-check-label" for="accountType">
                    I want to create a song
                    </label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="artists" >
                    <label class="form-check-label" for="accountType">
                    I'm an Artist
                    </label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="organizer" >
                    <label class="form-check-label" for="accountType">
                    I'm an Organizer
                    </label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="service-provider" >
                    <label class="form-check-label" for="accountType">
                    Offers Services
                    </label>
                  </div>
                  <div v-for="error in errors?.account_type" :key="error" class="text-danger">{{ error }}</div>
                </div>
              </div>

                                 <!-- User inputs -->
              <div class="form-group">
                <label for="email">Email Address</label>
                <input id="email" :type="form.login_type" class="form-control" name="email" v-model="form.email" required autocomplete="email" autofocus>
                <div v-for="error in errors?.email" :key="error" class="text-danger">{{ error }}</div>
              </div>

              <div class="form-group">
                <label for="name">First Name</label>
                <input id="name" type="text" class="form-control " name="name" v-model="form.first_name" required autocomplete="first-name">
                <div v-for="error in errors?.first_name" :key="error" class="text-danger">{{ error }}</div>
              </div>

              <div class="form-group">
                <label for="name">Last Name</label>
                <input id="name" type="text" class="form-control " name="name" v-model="form.last_name" required autocomplete="last-name" autofocus>
                <div v-for="error in errors?.last_name" :key="error" class="text-danger">{{ error }}</div>
              </div>

              <div class="form-group">
                <label for="username">Username</label>
                <input id="email" type="text" class="form-control" name="username" v-model="form.username" required autocomplete="username">
                <div v-for="error in errors?.username" :key="error" class="text-danger">{{ error }}</div>
              </div>

              <div class="form-group">
                <label for="username">Mobile number</label>
                <input id="email" type="text" class="form-control" name="phone" v-model="form.phone" required autocomplete="phone">
                <div v-for="error in errors?.phone" :key="error" class="text-danger">{{ error }}</div>
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" name="password" v-model="form.password" required autocomplete="new-password">
                <div v-for="error in errors?.password" :key="error" class="text-danger">{{ error }}</div>
              </div>

              <div class="form-group">
                <label for="password-confirm">Confirm Password</label>
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" v-model="form.password_confirmation" required autocomplete="new-password">
                <!-- <div v-if="errors?.password_confirmation" class="text-danger">{{ errors.password_confirmation.shift() }}</div> -->
              </div>

              <div class="form-check form-checkbox">
                <input type="checkbox" class="form-check-input" v-model="agree_term" id="agreed_id"/>
                <label class="form-check-label" for="agreed_id">
                &nbsp; I agree to all the <a href="/terms">Terms</a> and <a href="/policy">Privacy policy</a></label>
              </div>

              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="submit" :disabled="!agree_term">Create Account</button>
              </div>
            </form>
          </div>
        </div>
        <social-button />
      </div>
    </div>
    <verify-card :phone="form.phone" v-else/>
    <!-- <div class="container-fluid" v-else>
      <form @submit.prevent="confirm">
        <div class="">
          <div class="row">
            <div class="col">
              <label for="username">Verification Code</label>
                <input id="verifyCode" max="6" type="text" class="form-control" name="verifyCode" v-model="verifyCode" required autocomplete="off">  
                <span v-if="verifyMessage" class="text-danger">{{ verifyMessage }}</span>
            </div>
            
            <button @click.prevent="resendCode">Resend Code {{ $filters.timer(countdown) }}</button>
          </div>
        </div>
        <button type="submit">Confirm</button>
      </form>
    </div> -->
  </section>

  </layout>
</template>
<script>
import Layout from '/src/components/Layouts/AuthLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";
import Verify from '@/components/Auth/Verify.vue';
import SocialButton from '@/components/Auth/SocialLogin.vue';
export default {
  components: {
    layout: Layout,
    'social-button': SocialButton,
    'verify-card': Verify
  },
  data()
  {
    return {
      step: 'register',
      verifyCode: null,
      verifyMessage: null,
      
      form: {
        first_name: null,
        last_name: null,
        email: null,
        username: null,
        password: null,
        password_confirmation: null,
        phone: null,
        account_type: 'customers',
        login_type: 'email',
        isDisabled: false,
      },
      errors: {},
      countdown: 180,
      countdown_enabled: false,
      rate_countdown_enable: false,
      rate_countdown: 600,
      agree_term: false,
    }
  },
  props: {
    // errors: Object,
  },
  setup()
  {

  },
  mounted() {

  },
  computed: {
    //...mapGetters([''])
    //...mapState({})
  },
  methods: {
    ...mapActions(['signup', 'resendOTPCode', 'verifyOTP']),
    async submit()
    {

      this.isDisabled = true;
      await this.signup(this.form)
        .then((response) => { 

          this.isDisabled = false;
          const { status: statusCode, data: {status, result} } = response;
          console.log('Register response: ', response)
          if (statusCode === 201)
          {

            this.step = '';
            // setTimeout(() => this.countdown--, 100);
            this.$router.push({ path: this.$route.path, query: { id: result?.user_id } });

            
            //this.$router.push("/login");
            // this.$vs.notification({
            //   color: 'success',
            //   position: 'top-right',
            //   title: 'Signup',
            //   text: `${data.message}`
            // })
          } else if (statusCode === 203) {
            this.errors = result?.errors || {};
            console.log('Status with Error: ', response, '\nErrors: ', this.errors);
          }
        })
        .catch(err =>
        {
          // this.$vs.notification({
          //   color: 'danger',
          //   position: 'top-right',
          //   title: 'Server Status',
          //   text: `${err.message}`
          // })
        })

    },
    resendCode()
    {
      if (!this.countdown_enabled) {
        this.countdown_enabled = true;
        // resend request
        this.resendOTPCode(this.$route.query.id)
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
    confirm()
    {

      this.verifyMessage = '';

      this.verifyOTP({ id: this.$route.query.id, code: this.verifyCode })
        .then(response =>
        {
          const { status: statusCode, data: {status, message, result} } = response
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
  },
  watch: {
    step(value)
    {
      if (value === '')
      {
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