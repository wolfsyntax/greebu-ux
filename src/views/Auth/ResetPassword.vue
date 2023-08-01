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
                      <span class="material-symbols-rounded">
                        {{ showLockOpen ? '&#xe897;' : '&#xe898;' }}
                      </span>
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
                          <button type="submit" class="btn btn-primary"  
                          @mouseenter="showLockOpen = false;"
                          @mouseleave="showLockOpen = true"
                          :disabled="!isFormValid"
                           @click="submitResetPassword" 
                           >
                           Continue
                           <span class="material-symbols-rounded forward-icon">
                          &#xe941;
                        </span>
                          </button>
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
                          <button type="submit" class="btn btn-primary" 
                          @click="backToLogin"
                          >
                          Login
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
  }
}
</script>