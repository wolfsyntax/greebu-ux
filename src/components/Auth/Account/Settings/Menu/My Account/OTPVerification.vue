<template>
  <div class="modal update-my-account-modal" id="accountOTPhoneVerify" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
    <div class="modal-dialog">
      <div class="modal-content">
        <button class="close-button" data-bs-dismiss="modal" aria-label="Close" ref="modalClose"><span class="material-symbols-rounded">&#xe5cd;</span></button>
        <div class="text-center modal-body">
          <svg class="phone-icon" xmlns="http://www.w3.org/2000/svg" width="77" height="76" viewBox="0 0 77 76" fill="none">
            <path d="M53.5266 2.92062C54.4917 2.92062 55.2767 3.70562 55.2767 4.67082V71.244C55.2767 72.2092 54.4917 72.9942 53.5266 72.9942H23.3896C22.4244 72.9942 21.6394 72.2092 21.6394 71.244V4.67082C21.6394 3.70562 22.4244 2.92062 23.3896 2.92062H53.5266ZM53.5266 0.417969H23.3896C21.0404 0.417969 19.1367 2.32249 19.1367 4.67082V71.244C19.1367 73.5931 21.0412 75.4968 23.3896 75.4968H53.5266C55.8757 75.4968 57.7794 73.5923 57.7794 71.244V4.67082C57.7794 2.32249 55.8757 0.417969 53.5266 0.417969Z" fill="#8690A2"/>
            <path d="M27.7598 2.08008C27.7598 4.43591 29.3089 6.36296 31.2018 6.36296H45.7138C47.6067 6.36296 49.1558 4.43591 49.1558 2.08008H27.7598ZM40.8453 4.1723H32.9486C32.7184 4.1723 32.5315 3.98543 32.5315 3.75519C32.5315 3.52494 32.7184 3.33808 32.9486 3.33808H40.8453C41.0756 3.33808 41.2624 3.52494 41.2624 3.75519C41.2624 3.98543 41.0764 4.1723 40.8453 4.1723ZM43.3864 4.33581C43.066 4.33581 42.8057 4.07553 42.8057 3.75519C42.8057 3.43485 43.066 3.17457 43.3864 3.17457C43.7067 3.17457 43.967 3.43485 43.967 3.75519C43.967 4.07553 43.7067 4.33581 43.3864 4.33581Z" fill="#8690A2"/>
          </svg>
          <h3 class="enter-phone">Enter OTP code</h3>
          <p class="confirmation">We sent an SMS with your confirmation code to </p>
          <h5 class="hidden-phone">{{ user.phonemask }}</h5>

          <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#EF4444"/>
            </svg>
            {{ error }}
            <svg xmlns="http://www.w3.org/2000/svg" style="right:20px; top: 20px; position: absolute;" width="16" height="16" viewBox="0 0 16 16" fill="none" @click="error = ''" aria-label="Close">
              <path d="M4 12L12 4M4 4L12 12" stroke="#ABADC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <form>
            <p class="err-msg">{{ verifyMessage }}</p>
            <div class="phone-screen">
              <input v-for="(code, index) in verifyCode" :key="index" ref="inputField" type="text" 
                class="verification-box" maxlength="1" v-model="verifyCode[index]" 
                @input="handleInput(index)" @keydown.delete="handleDelete(index)"
              >
            </div>
            <button class="resend-code" @click.prevent="resendMyCode">Resend Code {{ $filters.timer(countdown) }}</button>
            <div class="button-verify-wrapper">
              <button type="button" class="btn btn-secondary submit" 
                :disabled="!isAllFieldsFilled"
                @click="showSuccessPhoneNumberMessageModal"
              >
                Submit
              </button>
            </div>
          </form>
        </div>         
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  setup()
  {


    return {}
  },
  data: () => ({
    error: '',
    verifyCode: [null, null, null, null, null, null],
    showSuccessPhoneNumberMessage: false,
    showPhoneNumber: false,
    showOTPCode: false,
    showNewPhoneNumber: false,
    countdown: 180,
    countdown_enabled: false,
    rate_countdown_enable: false,
    rate_countdown: 600,
  }),
  mounted()
  {
    
  },
  computed: {
    ...mapGetters(["isPhoneVerified", "info", 'myAccount', 'userRole',]),
    ...mapState({
      user: (state) => state.user,
    }),
    isAllFieldsFilled()
    {
      return this.verifyCode.every(code => code !== null);
    },
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
  },
  methods: {
    ...mapActions([
      'validateCode', 'resendAction'
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
    showSuccessPhoneNumberMessageModal()
    {
      this.showSuccessPhoneNumberMessage = true;
      this.showPhoneNumber = false;
      this.showOTPCode = false;
      this.showNewPhoneNumber = false;
    },    
    handleDelete(pos)
    {
      this.verifyCode[pos] = "";
      if (pos >= 1) this.$refs.inputField[pos - 1].focus();
    },
    handleInput(pos)
    {
      if (this.verifyCode[pos].length === 1 && pos < this.verifyCode.length - 1) {
        this.$nextTick(() =>
        {
          this.$refs.inputField[pos + 1].focus();
        });
      }      
    }
  }
}
</script>

<style lang="scss" scoped></style>