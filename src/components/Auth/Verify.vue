<template>
  <BlankHeader />

  <section class="phone-verification">
    <div class="container">
      <div class="check-message">
        <div class="card">
          <div class="card-header py-2">&nbsp;
            <a href="" v-if="$route.path === '/login'" @click="$store.commit('CLEAR_STATE')">
              <span class="material-symbols-outlined">&#xe5c4;</span>
            </a>
          </div>

          <div class="card-body text-center">
            <svg class="phone" xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
              <path d="M53.0259 2.92014C53.9911 2.92014 54.7761 3.70514 54.7761 4.67033V71.2435C54.7761 72.2087 53.9911 72.9937 53.0259 72.9937H22.889C21.9238 72.9937 21.1388 72.2087 21.1388 71.2435V4.67033C21.1388 3.70514 21.9238 2.92014 22.889 2.92014H53.0259ZM53.0259 0.41748H22.889C20.5398 0.41748 18.6361 2.322 18.6361 4.67033V71.2435C18.6361 73.5926 20.5406 75.4963 22.889 75.4963H53.0259C55.3751 75.4963 57.2788 73.5918 57.2788 71.2435V4.67033C57.2788 2.322 55.3751 0.41748 53.0259 0.41748Z" fill="#8690A2"/>
              <path d="M27.2594 2.0791C27.2594 4.43494 28.8085 6.36198 30.7014 6.36198H45.2135C47.1063 6.36198 48.6554 4.43494 48.6554 2.0791H27.2594ZM40.345 4.17132H32.4482C32.218 4.17132 32.0311 3.98446 32.0311 3.75421C32.0311 3.52397 32.218 3.3371 32.4482 3.3371H40.345C40.5752 3.3371 40.7621 3.52397 40.7621 3.75421C40.7621 3.98446 40.576 4.17132 40.345 4.17132ZM42.886 4.33483C42.5656 4.33483 42.3054 4.07455 42.3054 3.75421C42.3054 3.43387 42.5656 3.1736 42.886 3.1736C43.2063 3.1736 43.4666 3.43387 43.4666 3.75421C43.4666 4.07455 43.2063 4.33483 42.886 4.33483Z" fill="#8690A2"/>
            </svg>

            <div class="content">
              <h5 class="card-title">Check your text messages</h5>
              <p class="card-text">Enter verification code we sent to</p>
              <p class="phone-number">{{  info.phonemask }}</p>

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
                  <input v-for="(code, index) in verifyCode"
                    :key="index" ref="inputField" type="text"
                    class="verification-box" maxlength="1" v-model="verifyCode[index]"
                    @input="handleInput(index)"
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

      <!-- VERIFY EMAIL LINK -->

      <!-- <div v-if="!verifyEmail && !submit" class="verify-email">
        <div class="card">
            <div class="card-body text-center">
              <svg class="inbox" xmlns="http://www.w3.org/2000/svg" width="77" height="76" viewBox="0 0 77 76" fill="none">
                <g clip-path="url(#clip0_4593_108262)">
                  <path d="M68.8084 65.4325H8.10727C4.14306 65.4325 0.917969 62.2066 0.917969 58.2424V17.6727C0.917969 13.7085 4.14306 10.4834 8.10727 10.4834H68.8084C72.7726 10.4834 75.9977 13.7085 75.9977 17.6727V58.2433C75.9977 62.2066 72.7726 65.4325 68.8084 65.4325ZM8.10727 13.8194C5.98335 13.8194 4.25484 15.5479 4.25484 17.6727V58.2433C4.25484 60.368 5.98335 62.0957 8.10727 62.0957H68.8084C70.9331 62.0957 72.6608 60.368 72.6608 58.2433V17.6727C72.6608 15.5488 70.9331 13.8203 68.8084 13.8203L8.10727 13.8194Z" fill="#8690A2"/>
                  <path d="M38.458 41.2702C37.5054 41.2702 36.5527 41.065 35.6651 40.6554L1.88672 25.053L3.28654 22.0239L37.0641 37.6263C37.95 38.0351 38.9652 38.0359 39.852 37.6263L73.5578 22.0573L74.9576 25.0863L41.2518 40.6545C40.3634 41.065 39.4115 41.2702 38.458 41.2702Z" fill="#8690A2"/>
                </g>
                <defs>
                  <clipPath id="clip0_4593_108262">
                    <rect width="76" height="76" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                </defs>
              </svg>
                <div class="content">
                  <h5 class="card-title">Please verify your Email</h5>
                  <p class="card-text">You’re almost there! We sent a confirmation email to:</p>
                  <p class="email-add">kenzi.lawson@example.com</p>
                  <p class="check-email">Check your email and click on the confirmation link to complete your signup</p>
                <div class="btn-wrapper">
                <button type="button" class="btn btn-primary next" 
                :disabled="resendVerifyEmail > 0"
                  @click="startResendEmailLink"
                  >
                  <template v-if="resendVerifyEmail > 0">
                    Resend Link ({{ resendVerifyEmail }}s)
                  </template>
                  <template v-else>
                    Resend Link
                    <span class="material-symbols-rounded forward-icon">
                      &#xe941;
                    </span>
                  </template>
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div> -->

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
     // codes: [],
     // submitted: true,
    //  verifyEmail: true,
     // verifyCode: null,
       verifyCode: [null, null, null, null, null, null], // Initialize with null values
      verifyMessage: null,
      countdown: 180,
      countdown_enabled: false,
      rate_countdown_enable: false,
      rate_countdown: 600,
      phone_num: null,
    }
  },
  computed: {
    computedLength() {
      return this.verifyCode.filter(code => code !== null).length;
    },
    isAllFieldsFilled() {
      return this.verifyCode.every(code => code !== null);
    },
    ...mapGetters(["userInfo", "info", "token", "isLoggedIn", 'userRole'])
  },
  mounted() {
    this.phone_num = this.phone || this.info?.phone;
  },
  setup () {
    

    return {}
  },
  methods: {
    ...mapActions(['resendCode', 'verifyOTP', 'validateCode']),
    // ...mapMutations([
    //   'CLEAR_STATE',
    // ]),
    async resendMyCode()
    {
      if (!this.countdown_enabled) {
        this.countdown_enabled = true;
        // resend request
        // await this.resendOTPCode(this.$route.query.id)
        await this.resendCode({userId:  this.$route.query.id})
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
      const enteredCode = this.verifyCode.join('');
      this.validateCode({ code: enteredCode, userId:  this.$route.query.id})
        .then(response =>
        {
          console.log('Verify.vue validator response: ', response)
          const { status, message, result } = response
          
          if (status === 200) {
            // if (status === 200) {

              //console.log('Redirect to home');
             // this.$router.push({name: 'home'});

              this.$router.push({ path: '/', query: { onboarding: 'true' } });


              //this.$router.push({ name: 'home', query: { id: result?.user_id } });

             // this.$router.push({ path: this.$route.path === '', query: { id: result?.user_id } });

              //this.$router.push({ path: this.$route.path, query: { id: result?.user_id } });
              
              // if (this.userRole === 'customers') {
              //   this.$router.push("/");
              // } else {
              //   this.$store.commit('CLEAR_STATE');
              //   this.$router.push("/login");
              // }

            // } else {
              
            // }

          } 
          
        })
        .catch(err =>
        {
          console.log('OTP Verification Error: ', err)
          
          // if (status === 422) {
          //   this.verifyMessage = 'The provided OTP code is invalid. Please try again with the correct code.';
          // } else if (status === 500) {
          //   // this.verifyMessage = 'Too Many Attempts.';
          //   this.verifyMessage = `You have already surpassed the limit for resending the OTP code to your number Please wait ${this.$filters.timer(this.rate_countdown)} minutes to re send a new OTP code`;
          // }
        })
      
    },
    handleInput(index) {
      if (this.verifyCode[index].length === 1 && index < this.verifyCode.length - 1) {
        this.$nextTick(() => {
          this.$refs.inputField[index + 1].focus();
        });
      }
    },
    // isAllFieldsFilled() {
    //   return this.verifyCode.every(code => code !== null);
    // },
    // handleKeyDown(event, index) {
    //   const charCode = event.which ? event.which : event.keyCode;
    //   if (charCode < 48 || charCode > 57) {
    //     // Prevent input if it's not a number or the Backspace key
    //     if (charCode !== 8) {
    //       event.preventDefault();
    //     }
    //   } else if (charCode === 8 && index > 0 && !this.codes[index]) {
    //     // Handle Backspace key to clear the current input and move focus to the previous input
    //     this.$refs.inputs[index - 1].focus();
    //     this.codes[index - 1] = '';
    //   }
    // },
    // verifyPhone(){
    //   this.submitted = false;
    // }, 
    submitCode(){
      // this.submitted = true;
      this.verifyEmail = false;
      // if (!this.isLoggedIn) {
      //   await this.verifyOTP({ id: this.$route.query.id, code: this.verifyCode })
      //     .then(response =>
      //     {
      //       const { status: statusCode, data: { status, message, result } } = response
      //       if (statusCode === 200 && status === 200) this.$router.push("/login");
      //       else if (statusCode === 203) {
      //         if (status === 422) {
      //           this.verifyMessage = 'The provided OTP code is invalid. Please try again with the correct code.';
      //         } else if (status === 500) {
      //           // this.verifyMessage = 'Too Many Attempts.';
      //           this.verifyMessage = `You have already surpassed the limit for resending the OTP code to your number Please wait ${this.$filters.timer(this.rate_countdown)} minutes to re send a new OTP code`;
      //         }
      //       }
      //       console.log('Verify OTP Response: ', response)
      //     })
      //     .catch(err =>
      //     {

      //     })
      // } else {
      //   await this.verifyOTPF({ id: this.userInfo?.id, code: this.verifyCode })
      //     .then(response =>
      //     {
      //       const { status: statusCode, data: { status, message, result } } = response
      //       if (statusCode === 200 && status === 200) this.$router.push("/login");
      //       else if (statusCode === 203) {
      //         if (status === 422) {
      //           this.verifyMessage = 'The provided OTP code is invalid. Please try again with the correct code.';
      //         } else if (status === 500) {
      //           // this.verifyMessage = 'Too Many Attempts.';
      //           this.verifyMessage = `You have already surpassed the limit for resending the OTP code to your number Please wait ${this.$filters.timer(this.rate_countdown)} minutes to re send a new OTP code`;
      //         }
      //       }
      //       console.log('Verify OTP Response: ', response)
      //     })
      //     .catch(err =>
      //     {

      //     })
      // }
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