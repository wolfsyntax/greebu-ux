<template>
  <section class="container py-5" v-if="isPhoneVerified">
    <h1>Welcome back {{ info.fullname }}</h1>
    <div class="row align-items-start">
      
      <div class="col-md-3">
        One of three columns
      </div>
      <div class="col">
        <div class="py-5">
          <form @submit.prevent="submit">
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="firstName">First name</label>
                  <input type="text" class="form-control" id="firstName" aria-describedby="First name"
                    v-model="form.first_name" autocomplete="off" placeholder="First name">
                  <small v-if="errors.first_name" class="text-danger">{{ errors.first_name.shift() }}</small>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="lastName">Last name</label>
                  <input type="text" class="form-control" id="lastName" aria-describedby="Last name"
                    v-model="form.last_name" autocomplete="off" placeholder="Last name">
                  <small v-if="errors.last_name" class="text-danger">{{ errors.last_name.shift() }}</small>
                </div>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="email">Username</label>
                  <input type="text" class="form-control" id="username" aria-describedby="Username"
                    v-model="form.username" autocomplete="off" placeholder="Username">
                  <small v-if="errors.username" class="text-danger">{{ errors.username.shift() }}</small>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="username">Email</label>
                  <input type="email" class="form-control" id="email" aria-describedby="Email"
                    v-model="form.email" autocomplete="email" placeholder="Email">
                  <small v-if="errors.email" class="text-danger">{{ errors.email.shift() }}</small>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="email">Phone</label>
                  <input type="text" class="form-control" id="phone" aria-describedby="Phone"
                    v-model="form.phone" autocomplete="phone" placeholder="Phone">
                  <small v-if="errors.phone" class="text-danger">{{ errors.phone.shift() }}</small>
                </div>
              </div>
            </div>
            
            <div class="row my-3">
              <h6 class="fw-bold">Password</h6>
              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="currentPassword" class="my-2">Current Password</label>
                  <input type="password" class="form-control" id="currentPassword" aria-describedby="Current Password"
                    v-model="form.current_password" autocomplete="current-password"
                    placeholder="Current Password">
                  <div v-for="error in errors?.current_password" :key="error" class="text-danger">{{ error }}</div>
                </div>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="newPassword" class="my-2">New Password</label>
                  <input type="password" class="form-control" id="newPassword" aria-describedby="New Password"
                    v-model="form.password" autocomplete="new-password"
                    placeholder="New Password">
                  <div v-for="error in errors?.password" :key="error" class="text-danger">{{ error }}</div>
                </div>
              </div>
            </div>
            <div class="row my-3"> 
              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="currentPassword" class="my-2">Confirm Password</label>
                  <input type="password" class="form-control" id="currentPassword" aria-describedby="Current Password"
                    v-model="form.password_confirmation" autocomplete="current-password"
                    placeholder="Current Password">
                  <div v-for="error in errors?.password_confirmation" :key="error" class="text-danger">{{ error }}</div>
                </div>
              </div>
            </div>
            <div class="row py-3">
              <div class="col">
                <button type="submit" class="btn btn-primary mx-1">Save Changes</button>
                <button type="button" class="btn btn-success mx-1">Delete Account</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <section class="phone-verification" v-else>
    <div class="container">
      <div class="check-message">
        <div class="card">
          <!-- <div class="card-header py-2">&nbsp;
            <a href="" v-if="$route.path === '/login'" @click="$store.commit('CLEAR_STATE')">
              <span class="material-symbols-outlined">&#xe5c4;</span>
            </a>
          </div> -->

          <div class="card-body text-center">
            <svg class="phone" xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
              <path d="M53.0259 2.92014C53.9911 2.92014 54.7761 3.70514 54.7761 4.67033V71.2435C54.7761 72.2087 53.9911 72.9937 53.0259 72.9937H22.889C21.9238 72.9937 21.1388 72.2087 21.1388 71.2435V4.67033C21.1388 3.70514 21.9238 2.92014 22.889 2.92014H53.0259ZM53.0259 0.41748H22.889C20.5398 0.41748 18.6361 2.322 18.6361 4.67033V71.2435C18.6361 73.5926 20.5406 75.4963 22.889 75.4963H53.0259C55.3751 75.4963 57.2788 73.5918 57.2788 71.2435V4.67033C57.2788 2.322 55.3751 0.41748 53.0259 0.41748Z" fill="#8690A2"/>
              <path d="M27.2594 2.0791C27.2594 4.43494 28.8085 6.36198 30.7014 6.36198H45.2135C47.1063 6.36198 48.6554 4.43494 48.6554 2.0791H27.2594ZM40.345 4.17132H32.4482C32.218 4.17132 32.0311 3.98446 32.0311 3.75421C32.0311 3.52397 32.218 3.3371 32.4482 3.3371H40.345C40.5752 3.3371 40.7621 3.52397 40.7621 3.75421C40.7621 3.98446 40.576 4.17132 40.345 4.17132ZM42.886 4.33483C42.5656 4.33483 42.3054 4.07455 42.3054 3.75421C42.3054 3.43387 42.5656 3.1736 42.886 3.1736C43.2063 3.1736 43.4666 3.43387 43.4666 3.75421C43.4666 4.07455 43.2063 4.33483 42.886 4.33483Z" fill="#8690A2"/>
            </svg>

            <div class="content">
              <h5 class="card-title">Check your text messages</h5>
              <p class="card-text">Enter verification code we sent to</p>
              <p class="phone-number">{{ info.phonemask }}</p>

              <form @submit.prevent="confirm"> 
                <span v-if="verifyMessage" class="text-danger message">
                  <div class="alert alert-danger" role="alert">
                    <div class="left">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#EF4444"/>
                      </svg>

                      <p class="err-msg">{{ verifyMessage }}</p>
                    </div>

                    <div class="right">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 12L12 4M4 4L12 12" stroke="#ABADC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </span>

                <div class="phone-screen">
                  <input v-for="(code, index) in verifyCode" :key="index" ref="inputField" type="text" 
                    class="verification-box" maxlength="1" v-model="verifyCode[index]" 
                    @input="handleInput(index)" 
                    @keydown.delete="handleDelete(index)"
                  >
                </div>

                <button class="resend-code" @click.prevent="resendMyCode">Resend Code {{ $filters.timer(countdown) }}</button>

                <div class="btn-wrapper">
                  <button type="submit" :disabled="!isAllFieldsFilled">Confirm</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> 
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Verify from '@/components/Auth/Verify.vue';

export default {
  setup () {
    

    return {}
  },
  components: {
    'verify-card': Verify
  },
  data()
  {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        phone: '',
        password: '',
        current_password: '',
        password_confirmation: ''
      },
      verifyCode: [null, null, null, null, null, null],
      verifyMessage: null,
      countdown: 180,
      countdown_enabled: false,
      rate_countdown_enable: false,
      rate_countdown: 600,
      phone_num: null,
      errors: []
    }
  },
  methods: {
    ...mapActions([
      'accountSetting', 'resyncProfile', 'resendCode', 'validateCode',
    ]),
    async resendMyCode()
    {
      if (!this.countdown_enabled) {
        this.countdown_enabled = true;

        await this.resendCode()
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
      } else {

      }
    },
    confirm()
    {
      
    },
    handleInput(index)
    {
      if (this.verifyCode[index].length === 1 && index < this.verifyCode.length - 1) {
        this.$nextTick(() =>
        {
          this.$refs.inputField[index + 1].focus();
        });
      }
    },
    handleDelete(pos)
    {
      this.verifyCode[pos] = "";
      if (pos >= 1) this.$refs.inputField[pos - 1].focus();
    },
    submit()
    {
      this.accountSetting(this.form)
        .then(response =>
        {
          console.log('Updating account settings: ', response);
        });
    }
  },
  created() {
    
  },
  computed: {
    ...mapGetters(["isPhoneVerified", "info", 'myAccount',]),
    ...mapState({
      // user: (state) => state.user,
    }),
    isAllFieldsFilled()
    {
      return this.verifyCode.every(code => code !== null);
    },
  },
  mounted()
  {
    // this.resyncProfile();
    this.form = this.info
  },
  watch: {
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
  }
}
</script>

<style lang="scss" scoped>

</style>