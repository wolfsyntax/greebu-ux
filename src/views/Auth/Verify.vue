<template>
  <BlankHeader />

  <section class="social-phone-verification">
    <div class="container">
      
      <div v-if="step === 1" class="social-verify-phone">
        <div class="card">
          <div class="card-header">
            <a href="/register">
              <span class="material-symbols-outlined">&#xe5c4;</span>
            </a>
          </div>

          <div class="card-body text-center">
            <svg class="phone" xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
              <path d="M53.0259 2.92014C53.9911 2.92014 54.7761 3.70514 54.7761 4.67033V71.2435C54.7761 72.2087 53.9911 72.9937 53.0259 72.9937H22.889C21.9238 72.9937 21.1388 72.2087 21.1388 71.2435V4.67033C21.1388 3.70514 21.9238 2.92014 22.889 2.92014H53.0259ZM53.0259 0.41748H22.889C20.5398 0.41748 18.6361 2.322 18.6361 4.67033V71.2435C18.6361 73.5926 20.5406 75.4963 22.889 75.4963H53.0259C55.3751 75.4963 57.2788 73.5918 57.2788 71.2435V4.67033C57.2788 2.322 55.3751 0.41748 53.0259 0.41748Z" fill="#8690A2"/>
              <path d="M27.2594 2.0791C27.2594 4.43494 28.8085 6.36198 30.7014 6.36198H45.2135C47.1063 6.36198 48.6554 4.43494 48.6554 2.0791H27.2594ZM40.345 4.17132H32.4482C32.218 4.17132 32.0311 3.98446 32.0311 3.75421C32.0311 3.52397 32.218 3.3371 32.4482 3.3371H40.345C40.5752 3.3371 40.7621 3.52397 40.7621 3.75421C40.7621 3.98446 40.576 4.17132 40.345 4.17132ZM42.886 4.33483C42.5656 4.33483 42.3054 4.07455 42.3054 3.75421C42.3054 3.43387 42.5656 3.1736 42.886 3.1736C43.2063 3.1736 43.4666 3.43387 43.4666 3.75421C43.4666 4.07455 43.2063 4.33483 42.886 4.33483Z" fill="#8690A2"/>
            </svg>

            <div class="content">
              <h5 class="card-title">Phone number verification required for further access</h5>
              <p class="card-text">By verifying your phone number, we can add an extra level of protection against unauthorized access to your account.</p>
              <div class="btn-wrapper">
                <button type="button" class="btn btn-primary next" @click="verifyPhone">
                  Verify Phone Number
                  <span class="material-symbols-rounded forward-icon">&#xe941;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="step === 2" class="social-verify-phone">
        <div class="card">
          <div class="card-header">
            <a href="/register">
              <span class="material-symbols-outlined">&#xe5c4;</span>
            </a>
          </div>

          <div class="card-body text-center">
            <svg class="phone" xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
              <path d="M53.0259 2.92014C53.9911 2.92014 54.7761 3.70514 54.7761 4.67033V71.2435C54.7761 72.2087 53.9911 72.9937 53.0259 72.9937H22.889C21.9238 72.9937 21.1388 72.2087 21.1388 71.2435V4.67033C21.1388 3.70514 21.9238 2.92014 22.889 2.92014H53.0259ZM53.0259 0.41748H22.889C20.5398 0.41748 18.6361 2.322 18.6361 4.67033V71.2435C18.6361 73.5926 20.5406 75.4963 22.889 75.4963H53.0259C55.3751 75.4963 57.2788 73.5918 57.2788 71.2435V4.67033C57.2788 2.322 55.3751 0.41748 53.0259 0.41748Z" fill="#8690A2"/>
              <path d="M27.2594 2.0791C27.2594 4.43494 28.8085 6.36198 30.7014 6.36198H45.2135C47.1063 6.36198 48.6554 4.43494 48.6554 2.0791H27.2594ZM40.345 4.17132H32.4482C32.218 4.17132 32.0311 3.98446 32.0311 3.75421C32.0311 3.52397 32.218 3.3371 32.4482 3.3371H40.345C40.5752 3.3371 40.7621 3.52397 40.7621 3.75421C40.7621 3.98446 40.576 4.17132 40.345 4.17132ZM42.886 4.33483C42.5656 4.33483 42.3054 4.07455 42.3054 3.75421C42.3054 3.43387 42.5656 3.1736 42.886 3.1736C43.2063 3.1736 43.4666 3.43387 43.4666 3.75421C43.4666 4.07455 43.2063 4.33483 42.886 4.33483Z" fill="#8690A2"/>
            </svg>

            <div class="content">
              <h5 class="card-title">Phone verification</h5>
              <p class="card-text">In order to protect the security of your account, please type your phone number. We will send you a text message with a verification code that you'll need to enter on the next screen</p>

              <div v-for="error in errors?.phone" :key="error" class="alert alert-danger" role="alert">
                <div class="left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#EF4444"/>
                  </svg>
                  <p class="err-msg">{{ error }}</p>
                </div>

                <div class="right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M4 4L12 12" stroke="#ABADC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

              <form @submit.prevent="submitForm" v-if="page === 'request'">
                <div class="form-group">
                  <input ref="phoneInput" id="phone" type="text" class="form-control" name="phone" v-model="form.phone"
                    required autocomplete="off" placeholder="+63" @input="onInput"
                  />
                  <!-- <div v-if="errors?.phone" class="text-danger">{{ errors.phone.shift() }}</div> -->
                </div>

                <div class="btn-wrapper">
                  <button type="submit" class="btn btn-primary next" >
                    <!-- <button type="button" class="btn btn-primary next"
                      @click="submitForm" :disabled="!isValidPhoneNumber"
                    > -->
                    Submit
                    <span class="material-symbols-rounded forward-icon">
                      &#xe941;
                    </span>
                  </button>
                </div>
              </form>
              <!-- <verify-card v-else /> -->
            </div> 
          </div>
        </div>
      </div>

      <div v-if="step === 3" class="check-message">
        <div class="card">
          <div class="card-header">
            <a href="/register">
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
              <p class="phone-number">{{ info.phonemask || '+639xxxxxxxxx' }}</p>
              <!-- Incorrect Code! -->
              <div v-if="wrongCode" class="alert alert-danger" role="alert">
                <div class="left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#EF4444"/>
                  </svg>

                  <p class="err-msg">The provided OTP code is invalid. Please try again with the correct code.</p>
                </div>

                <div class="right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M4 4L12 12" stroke="#ABADC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

              <!-- Phone Number is Required! -->
              <div v-if="codeIsRequired" class="alert alert-danger" role="alert">
                <div class="left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#EF4444"/>
                  </svg>

                  <p class="err-msg">Please indicate verification code for further access.</p>
                </div>

                <div class="right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M4 4L12 12" stroke="#ABADC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

              <form @submit.prevent="submitCode"> 
                <div class="phone-screen">
                  <input v-for="(code, index) in codes"
                    :key="index" type="text" class="verification-box"
                    maxlength="1" v-model="codes[index]" @input="handleInput(index)"
                    @keydown="handleKeyDown($event, index)" ref="inputs"
                  >
                </div>

                <button class="resend-code" :class="{ 'orange-text': resendCode === 0 }" :disabled="resendCode > 0" @click="startResendCode">
                  <template v-if="resendCode > 0">
                    Resend Code ({{ resendCode }}s)
                  </template>
                  
                  <template v-else>
                    Resend Code
                  </template>
                </button>

                <div class="btn-wrapper">
                  <button type="submit" class="btn btn-primary next"
                    :disabled="!isInputComplete"
                  >
                    Submit
                    <span class="material-symbols-rounded forward-icon">
                      &#xe941;
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div v-if="step === 4" class="successfully-signup">
        <div class="card">
          <!-- <div class="card-header">
            <a href="/login">
              <span class="material-symbols-outlined">&#xe5c4;</span>
            </a>
          </div> -->

          <div class="card-body text-center">
            <img src="/assets/login-signup/signup-success-badge.webp" class="success-badge" alt="Congratulations, you have successfully Sign Up!">
            
            <div class="content">
              <h5 class="card-title">Congratulations, you have successfully <span class="signup">Sign Up!</span></h5>
              <p class="card-text">Now that you have successfully signed up, feel free to take a moment to familiarize yourself with the various features and functionalities we offer.</p>
              <div class="btn-wrapper">
                <button type="submit" class="btn btn-primary"  @click="backToLogin">
                  Let’s Get Started
                  <span class="material-symbols-rounded forward-icon">
                    &#xe941;
                  </span>
                </button>
              </div>
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
import BlankHeader from "@/components/Home/BlankHeader.vue";

export default {
  components: {
    BlankHeader,
    'verify-card': Verify
  },
  setup()
  {

  },
  data()
  {
    return {
      step: 1,
      showError: false,
      codes: ['', '', '', '', '', ''],
      resendCode: 0,
      wrongCode: false,
      codeIsRequired: false,
      timerId: null,  

      page: 'request',
      errors: null,
      message: "The provided OTP code is invalid. Please try again with the correct code.",
      form: {
        phone: null,
      }
    }
  },
  methods: {
    ...mapActions([
      'sendOTPCode', 'requestCode', 'resendCode', 'validateCode',
    ]),
    submit()
    {
      this.sendOTPCode(this.form)
        .then(response =>
          {
            const { status: statusCode, data: { result, status} } = response;

            console.log('Send OTP Code: ', response)

            if (statusCode === 200) {
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
    },
    verifyPhone()
    {
      this.step = 2;
    },
    onInput() {
      this.form.phone = this.form.phone.replace(/[^+\d]/g, '').replace(/\+{2,}/g, '+');

      if (this.form.phone.length > 15) {
        this.form.phone = this.form.phone.slice(0, 15);
      }
    },
    submitForm() {

      this.showError = false; 

      if (!/^(0|\+)(?!\+|0)/.test(this.form.phone)) {
        this.showError = true;
        // Hide the error message smoothly after 5 seconds
        setTimeout(() => {
          this.showError = false;
        }, 5000);

        return; 
      }

      // console.log("Submitting form with phone number:", this.form.phone);
      this.requestCode(this.form)
        .then(response =>
        {
          const { status: statusCode, data: {message, status, result: {errors}} } = response;
          console.log('Phone number send otp: ', response)
          if (statusCode === 200) {
            this.step = 3;
          } else if (statusCode === 203) {
            this.showError = true;
            
            if (status === 422) {
              this.errors = errors || null
              this.message = message;
            } else if (status === 500) {
              this.errors.phone.push('Too many attempts. Please try again after 10 minutes.')
            }
          }
        })

      // this.startResendCode();

      // this.timerId = setTimeout(() => {
      //   this.startResendCode();
      //   this.codeIsRequired = true;
      //   this.timerId = null;

      //   // Set a timer to hide the alert after 5 seconds
      //   setTimeout(() => {
      //     this.codeIsRequired = false;
      //   }, 5000);
      // }, 55000); 
    },

    handleInput(index) {
      if (this.codes[index].length === 1) {
        // Move to the next input field when the current one has a single character
        if (index < this.codes.length - 1) {
          this.$refs.inputs[index + 1].focus();
        }
      }
    },
    handleKeyDown(event, index) {

      const charCode = event.which ? event.which : event.keyCode;

      if (charCode < 48 || charCode > 57) {
        // Prevent input if it's not a number or the Backspace key
        if (charCode !== 8) {
          event.preventDefault();
        }
      } else if (charCode === 8 && index > 0 && !this.codes[index]) {
        // Handle Backspace key to clear the current input and move focus to the previous input
        this.$refs.inputs[index - 1].focus();
        this.codes[index - 1] = '';
      }
    },
    startResendCode(){
      if(!this.resendCode){
        this.resendCode = 60;

        const interval = setInterval(() => {
          this.resendCode--;

          if(this.resendCode <= 0){
            clearInterval(interval);
          }

        }, 1000)
      }
    },
    submitCode(){

      // this.submitted = true;
      const correctCode = '123456'; // sample CORRECT code
      const enteredCode = this.codes.join('');
      
      this.wrongCode = false;

      this.validateCode({ code: enteredCode })
        .then(response =>
        {
          const { status: statusCode, data: { status, message, result } } = response;

          console.log('Verify Code [submit] response: ', response);

          if (statusCode === 201)
          {
            if (status === 200)
            {
              this.wrongCode = false;
              this.codes = ['', '', '', '', '', ''];
              this.step = 4;

            } else {
              this.wrongCode = true;
            }
          }
        })

      // if (enteredCode === correctCode) {
      //   // code is correct
      //   this.wrongCode = false;
      //   console.log('Correct verification code:', enteredCode);

      //   // Clear the inputted codes after submitting
      //   this.codes = ['', '', '', '', '', ''];

      //   // this.verifyEmail = false;
      //   this.step = 4;

      //   //   setTimeout(() => {
      //   //   window.location.href = '/login';
      //   // }, 10000);

      // }else{

      //   // incorrect code
      //   this.wrongCode = true;

      //   // Set a timer to hide the alert after 5 seconds
      //   setTimeout(() => {
      //     this.wrongCode = false;
      //   }, 5000);

      //   this.codes = ['', '', '', '', '', ''];

      // }

    },

    setOrangeTextColor() {
      this.$refs.resendButton.classList.add('orange-text');
    },

    backToLogin(){
      window.location.href = '/';
    },

  },
  computed: {
    ...mapGetters(["info", "token"]),
    isValidPhoneNumber() {
      // Check if the phone number starts with '0' and has 10 or more digits after that
      // or if it starts with '+' and has 10 or more digits after that
      return (
        this.form.phone &&
        (/^0\d{10,}$/.test(this.form.phone.replace(/\D/g, '')) ||
        /^\+\d{10,}$/.test(this.form.phone.replace(/[^\d+]/g, '')))
      );
    },

    isInputComplete(){
      return this.codes.every(code => code.length === 1);
    }

  }
}
</script>


<style scoped>

</style>