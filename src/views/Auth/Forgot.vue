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
                      <span class="material-symbols-rounded">
                        {{ showLockOpen ? '&#xe897;' : '&#xe898;' }}
                      </span>
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
                        <button type="submit" class="btn btn-primary next" 
                        @mouseenter="showLockOpen = false"
                        @mouseleave="showLockOpen = true"
                        :disabled="emailValidate"
                         @click="submitResetPassword">
                        Reset 
                        <span class="material-symbols-rounded forward-icon">
                          &#xe941;
                        </span>
                      </button>
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
                        <button type="button" class="btn btn-primary next" 
                        :disabled="resendResetPassword > 0"
                         @click="startResendResetPassword">
                          <template v-if="resendResetPassword > 0">
                            Resend Link ({{ resendResetPassword }}s)
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
      showLockOpen: true,
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

<style scoped>
</style>