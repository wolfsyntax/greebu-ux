<template>
  <BlankHeader />

<section class="reset-password">
  <div class="container">
    <div v-if="submitted" class="change-password">
                <div class="card">
                    <div class="card-header">
                        <a href="/login">
                            <span class="material-symbols-outlined">&#xe5c4;</span>
                        </a>
                    </div>
                    <div class="card-body text-center">
                      <span class="material-symbols-rounded" :class="{ 'material-symbols-open': isIconOpen }">
                        {{ icon }}
                      </span>
                      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="77" height="77" viewBox="0 0 77 77" fill="none">
                        <g clip-path="url(#clip0_4669_114118)">
                          <path d="M18.1306 28.4105H19.6544V23.0761C19.6544 16.886 21.7646 11.2592 25.1645 7.16254C28.5839 3.04331 33.3125 0.5 38.5095 0.5C43.7076 0.5 48.4352 3.04331 51.8546 7.16254C55.2544 11.2592 57.3642 16.8866 57.3642 23.0761V28.4105H58.8885C60.1584 28.4105 61.3113 29.0184 62.1516 29.9639C62.9914 30.9319 63.5 32.26 63.5 33.723V70.1869C63.5 71.6505 62.9723 72.9787 62.1516 73.9467C61.3113 74.9147 60.1584 75.5 58.8885 75.5H18.111C16.841 75.5 15.6881 74.8921 14.8479 73.9467C14.0081 72.9787 13.5 71.6505 13.5 70.1869V33.723C13.5 32.26 14.0277 30.9319 14.8479 29.9639C15.6876 28.9959 16.841 28.4105 18.111 28.4105H18.1306ZM22.9175 28.4105H54.1217V23.0761C54.1217 17.8766 52.3632 13.172 49.5102 9.75102C46.6772 6.352 42.7889 4.23654 38.5095 4.23654C34.2307 4.23654 30.3424 6.35261 27.5095 9.75163C24.6765 13.1726 22.8979 17.8772 22.8979 23.0767V28.4111L22.9175 28.4105ZM58.9086 32.1477H18.1306C17.7592 32.1477 17.4074 32.3277 17.1732 32.6207C16.9194 32.9131 16.7631 33.2958 16.7631 33.7236V70.1875C16.7631 70.6154 16.9194 71.0207 17.1732 71.2917C17.427 71.584 17.7592 71.7635 18.1306 71.7635H58.9086C59.28 71.7635 59.6313 71.5834 59.866 71.2917C60.1198 70.9987 60.2766 70.616 60.2766 70.1875V33.723C60.2766 33.2951 60.1198 32.8899 59.866 32.6195C59.6117 32.3271 59.28 32.1471 58.9086 32.1477Z" fill="#8690A2"/>
                          <path d="M36.5698 53.8864C36.2614 54.7293 36.1038 55.8712 36.1038 57.3055L40.3323 57.3049C40.3552 56.4358 40.4665 55.729 40.6585 55.1889C40.8505 54.6548 41.183 54.1311 41.6484 53.6282L43.0643 52.1835C44.5082 50.6692 45.2304 49.1196 45.2304 47.5424C45.2304 45.6363 44.648 44.1495 43.4776 43.0912C42.3007 42.0279 40.6585 41.5 38.5445 41.5C36.4712 41.5 34.8347 42.045 33.6236 43.1394C32.4124 44.2337 31.7951 45.7736 31.7715 47.7573H36.599C36.6226 46.962 36.8146 46.323 37.1757 45.8512C37.5419 45.3806 37.9965 45.1444 38.5439 45.1444C39.7729 45.1444 40.3845 46.0037 40.3845 47.7158C40.3845 48.2712 40.2446 48.8205 39.9591 49.3655C39.6737 49.9106 39.1091 50.6125 38.2527 51.4602C37.4434 52.2305 36.8845 53.0374 36.5698 53.8864Z" fill="#8690A2"/>
                          <path d="M36.4013 60.2914C35.906 60.7253 35.6613 61.296 35.6613 61.9875C35.6613 62.6625 35.8997 63.2241 36.3778 63.6684C36.8553 64.1188 37.4898 64.3441 38.2877 64.3441C39.097 64.3441 39.7379 64.1188 40.2154 63.6684C40.6928 63.2235 40.9319 62.6619 40.9319 61.9875C40.9319 61.3009 40.6877 60.7412 40.1982 60.2962C39.7093 59.8501 39.0748 59.631 38.2883 59.631C37.5254 59.631 36.8959 59.8501 36.4013 60.2914Z" fill="#8690A2"/>
                        </g><defs><clipPath id="clip0_4669_114118"><rect width="76" height="76" fill="white" transform="translate(0.5 0.5)"/></clipPath></defs>
                      </svg> -->
                        <div class="content">
                          <h5 class="card-title">Change your password</h5>
                          <p class="card-text">Please enter your new password</p>
                        <form @submit.prevent="submit">
                        <div class="form-group">
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
                         <!-- <div v-if="errors?.email" class="text-danger">{{ errors.email}}</div> -->
                        </div>
                        <div class="form-group">
                          <input 
                          ref="passwordInput"
                          id="password" 
                          type="password" 
                          class="form-control" 
                          name="password" 
                          v-model="form.password" 
                          required 
                          autocomplete="new-password" 
                          placeholder="New Password"
                          />
                          <span
                          class="material-symbols-rounded toggle-password"
                          :class="{ 'active': showPassword }"
                          @click="togglePasswordVisibility"
                        >
                          {{ showPassword ? "&#xe8f4" : "&#xe8f5" }}
                        </span>
                          <!-- <div v-if="errors?.password" class="text-danger">{{ errors.password }}</div> -->
                        </div>
                        <div class="form-group last">
                          <input 
                          ref="passwordConfirmInput"
                          id="password-confirm"
                           type="password" 
                           class="form-control" 
                           name="password_confirmation" 
                          v-model="form.password_confirmation" 
                          required autocomplete="new-password" 
                          placeholder="Confirm Password"
                          />
                          <span
                          class="material-symbols-rounded toggle-password"
                          :class="{ 'active': showPasswordConfirm }"
                          @click="togglePasswordConfirmVisibility"
                        >
                        {{ showPasswordConfirm ? "&#xe8f4" : "&#xe8f5" }}
                        </span>
                          <!-- <div v-if="errors?.password_confirmation" class="text-danger">{{ errors.password_confirmation }}</div> -->
                        </div>
                        <div class="btn-wrapper">
                          <button type="submit" class="btn btn-primary"  @mouseover="toggleIcon" @mouseleave="toggleIcon" :disabled="!isFormValid" @click="submitResetPassword" >Continue</button>
                        </div>
                        </form>
                      </div> <!-- end of content -->
                    </div>
                </div>
            </div> <!-- end of change-password -->

            <div v-if="!submitted" class="reset-successfully">
              <div class="card">
                    <!-- <div class="card-header">
                        <a href="/login">
                            <span class="material-symbols-outlined">&#xe5c4;</span>
                        </a>
                    </div> -->
                    <div class="card-body text-center">
                      <svg class="check" xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78" fill="none">
                        <path d="M33.3212 56.5175L60.56 29.2786L56.1325 24.9473L33.3212 47.7587L21.7712 36.2086L17.44 40.5399L33.3212 56.5175ZM39 77.5001C33.7383 77.5001 28.7654 76.4894 24.0812 74.4682C19.3971 72.4469 15.3065 69.6877 11.8094 66.1906C8.31229 62.6935 5.55312 58.6029 3.53187 53.9187C1.51062 49.2345 0.5 44.2616 0.5 38.9999C0.5 33.6741 1.51062 28.669 3.53187 23.9848C5.55312 19.3007 8.31229 15.2261 11.8094 11.761C15.3065 8.29604 19.3971 5.5529 24.0812 3.53164C28.7654 1.51038 33.7383 0.499756 39 0.499756C44.3258 0.499756 49.3308 1.51038 54.015 3.53164C58.6992 5.5529 62.7737 8.29604 66.2387 11.761C69.7037 15.2261 72.4469 19.3007 74.4681 23.9848C76.4894 28.669 77.5 33.6741 77.5 38.9999C77.5 44.2616 76.4894 49.2345 74.4681 53.9187C72.4469 58.6029 69.7037 62.6935 66.2387 66.1906C62.7737 69.6877 58.6992 72.4469 54.015 74.4682C49.3308 76.4894 44.3258 77.5001 39 77.5001Z" fill="#FF6B00"/>
                      </svg>
                        <div class="content">
                          <h5 class="card-title">Your Password has been reset Successfully!</h5>
                          <p class="card-text">You can now use your new password to log in to your account</p>
                        <div class="btn-wrapper">
                          <button type="submit" class="btn btn-primary" @click="backToLogin" >Login</button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>

  </div>
</section>

 
    <!-- <form @submit.prevent="submit" >
      <div class="form-group">
          <label for="password">Email</label>
          <input id="email" type="email" class="form-control" name="email" v-model="form.email" required autocomplete="off">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" class="form-control" name="password" v-model="form.password" required autocomplete="new-password">
      </div>
      <div class="form-group">
        <label for="password-confirm">Confirm Password</label>
        <input id="password-confirm" type="password" class="form-control" name="password_confirmation" v-model="form.password_confirmation" required autocomplete="new-password">
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
    </form> -->


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
      submitted: true,
      isInputActive: false,
      showPassword: false,
      showPasswordConfirm: false,
      isIconOpen: false,
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
    togglePasswordVisibility(){
      this.showPassword = !this.showPassword;
      const passwordInput = this.$refs.passwordInput;
      if(passwordInput){
        passwordInput.type = this.showPassword ? "text" : "password";
      }
    },
    togglePasswordConfirmVisibility(){
      this.showPasswordConfirm = !this.showPasswordConfirm;
      const passwordConfirmInput = this.$refs.passwordConfirmInput;
      if(passwordConfirmInput){
        passwordConfirmInput.type = this.showPasswordConfirm ? "text" : "password";
      }
    },
    submitResetPassword(){
      this.submitted = false;

      console.log("Password reset request for: ", this.form.email);
      console.log("Password: ", this.form.password);
      console.log("Confirm password: ", this.form.password_confirmation);
    },
    backToLogin(){
      window.location.href = '/login';
    },
    toggleIcon() {
      this.isIconOpen = !this.isIconOpen;
    },

  },
  mounted()
  {
    this.form.token = this.$route.params.token;
    document.addEventListener("click", this.onClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickOutside);
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),

    isFormValid() {
      // return this.form.email && this.form.password && this.form.password_confirmation === this.form.password;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return (
            emailRegex.test(this.form.email) &&
            this.form.password && this.form.password_confirmation === this.form.password
          );
    },
    icon() {
      return this.isIconOpen ? 'lock_open' : 'lock';
    },
  }
}
</script>