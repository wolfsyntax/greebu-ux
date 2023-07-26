<template>
  <BlankHeader />
  <section class="forgot-password">
    <div class="container">

     
      <div  v-if="submitted" class="verify-password">
                <div class="card">
                    <div class="card-header">
                        <a href="/login">
                            <span class="material-symbols-outlined">&#xe5c4;</span>
                        </a>
                    </div>
                    <div class="card-body text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="77" height="77" viewBox="0 0 77 77" fill="none">
                        <g clip-path="url(#clip0_4669_114118)">
                          <path d="M18.1306 28.4105H19.6544V23.0761C19.6544 16.886 21.7646 11.2592 25.1645 7.16254C28.5839 3.04331 33.3125 0.5 38.5095 0.5C43.7076 0.5 48.4352 3.04331 51.8546 7.16254C55.2544 11.2592 57.3642 16.8866 57.3642 23.0761V28.4105H58.8885C60.1584 28.4105 61.3113 29.0184 62.1516 29.9639C62.9914 30.9319 63.5 32.26 63.5 33.723V70.1869C63.5 71.6505 62.9723 72.9787 62.1516 73.9467C61.3113 74.9147 60.1584 75.5 58.8885 75.5H18.111C16.841 75.5 15.6881 74.8921 14.8479 73.9467C14.0081 72.9787 13.5 71.6505 13.5 70.1869V33.723C13.5 32.26 14.0277 30.9319 14.8479 29.9639C15.6876 28.9959 16.841 28.4105 18.111 28.4105H18.1306ZM22.9175 28.4105H54.1217V23.0761C54.1217 17.8766 52.3632 13.172 49.5102 9.75102C46.6772 6.352 42.7889 4.23654 38.5095 4.23654C34.2307 4.23654 30.3424 6.35261 27.5095 9.75163C24.6765 13.1726 22.8979 17.8772 22.8979 23.0767V28.4111L22.9175 28.4105ZM58.9086 32.1477H18.1306C17.7592 32.1477 17.4074 32.3277 17.1732 32.6207C16.9194 32.9131 16.7631 33.2958 16.7631 33.7236V70.1875C16.7631 70.6154 16.9194 71.0207 17.1732 71.2917C17.427 71.584 17.7592 71.7635 18.1306 71.7635H58.9086C59.28 71.7635 59.6313 71.5834 59.866 71.2917C60.1198 70.9987 60.2766 70.616 60.2766 70.1875V33.723C60.2766 33.2951 60.1198 32.8899 59.866 32.6195C59.6117 32.3271 59.28 32.1471 58.9086 32.1477Z" fill="#8690A2"/>
                          <path d="M36.5698 53.8864C36.2614 54.7293 36.1038 55.8712 36.1038 57.3055L40.3323 57.3049C40.3552 56.4358 40.4665 55.729 40.6585 55.1889C40.8505 54.6548 41.183 54.1311 41.6484 53.6282L43.0643 52.1835C44.5082 50.6692 45.2304 49.1196 45.2304 47.5424C45.2304 45.6363 44.648 44.1495 43.4776 43.0912C42.3007 42.0279 40.6585 41.5 38.5445 41.5C36.4712 41.5 34.8347 42.045 33.6236 43.1394C32.4124 44.2337 31.7951 45.7736 31.7715 47.7573H36.599C36.6226 46.962 36.8146 46.323 37.1757 45.8512C37.5419 45.3806 37.9965 45.1444 38.5439 45.1444C39.7729 45.1444 40.3845 46.0037 40.3845 47.7158C40.3845 48.2712 40.2446 48.8205 39.9591 49.3655C39.6737 49.9106 39.1091 50.6125 38.2527 51.4602C37.4434 52.2305 36.8845 53.0374 36.5698 53.8864Z" fill="#8690A2"/>
                          <path d="M36.4013 60.2914C35.906 60.7253 35.6613 61.296 35.6613 61.9875C35.6613 62.6625 35.8997 63.2241 36.3778 63.6684C36.8553 64.1188 37.4898 64.3441 38.2877 64.3441C39.097 64.3441 39.7379 64.1188 40.2154 63.6684C40.6928 63.2235 40.9319 62.6619 40.9319 61.9875C40.9319 61.3009 40.6877 60.7412 40.1982 60.2962C39.7093 59.8501 39.0748 59.631 38.2883 59.631C37.5254 59.631 36.8959 59.8501 36.4013 60.2914Z" fill="#8690A2"/>
                        </g><defs><clipPath id="clip0_4669_114118"><rect width="76" height="76" fill="white" transform="translate(0.5 0.5)"/></clipPath></defs>
                      </svg>
                        <div class="content">
                          <h5 class="card-title">Forgot Password</h5>
                          <p class="card-text">Please enter Email Address used during Sign Up</p>
                        <form @submit.prevent="submit">
                        <div class="form-group">
                          <div v-if="errors?.email" class="text-danger">{{ errors.email.shift() }}</div>
                          <input
                          ref="emailInput"
                          id="email"
                          type="email"
                          class="form-control"
                          name="email"
                          v-model="form.email"
                          required
                          autocomplete="off"
                          placeholder="Email Address"
                          @input="onInputChange"
                        />
                        <span class="material-symbols-rounded" :class="{ 'active': isInputActive }">&#xe158;</span>
                        </div>
                        <div class="btn-wrapper">
                        <button type="submit" class="btn btn-primary next" :disabled="emailValidate" @click="submitResetPassword">Reset Password</button>
                        </div>
                        </form>
                      </div> <!-- end of content -->
                    </div>
                </div>
            </div> <!-- end of verify-password -->
           
              <div v-if="!submitted" class="verify-email">
                <div class="card">
                    <!-- <div class="card-header">
                        <a href="/login">
                            <span class="material-symbols-outlined">&#xe5c4;</span>
                        </a>
                    </div> -->
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
                          <h5 class="card-title">Check your Email</h5>
                          <p class="card-text">Please open the link to reset your password in your email we sent to</p>
                          <p class="email-add">{{ this.form.email }}</p>
                        <div class="btn-wrapper">
                        <button type="button" class="btn btn-primary next" :disabled="resendResetPassword > 0" @click="startResendResetPassword">
                          <template v-if="resendResetPassword > 0">
                            Resend Link ({{ resendResetPassword }}s)
                          </template>
                          <template v-else>
                            Resend Link
                          </template>
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
import BlankHeader from "@/components/Home/BlankHeader.vue";

export default {
  components: {
    BlankHeader
  },
  setup()
  {

  },
  data()
  {
    return {
      errors: null,
      isInputActive: false,
      submitted: true,
      resendResetPassword: 0, 
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
    },
    submitResetPassword(){
       this.submitted = false;

       if(!this.resendResetPassword){
        this.resendResetPassword = 60;

        const interval = setInterval(() => {
          this.resendResetPassword--;
          if(this.resendResetPassword <= 0){
            clearInterval(interval);
          }
        }, 1000)
      }
    }, 
    onInputChange() {
      this.isInputActive = this.form.email.length > 0;
    },
    onClickOutside(event) {
      const emailInput = this.$refs.emailInput;
      if (emailInput && !emailInput.contains(event.target)) {
        this.isInputActive = false;
      }
    },
    startResendResetPassword(){
      if(!this.resendResetPassword){
        this.resendResetPassword = 60;

        const interval = setInterval(() => {
          this.resendResetPassword--;
          if(this.resendResetPassword <= 0){
            clearInterval(interval);
          }
        }, 1000)
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickOutside);
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),

    emailValidate() {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return (
            this.form.email === '' ||
            !emailRegex.test(this.form.email)
          );
    },
  }
}
</script>