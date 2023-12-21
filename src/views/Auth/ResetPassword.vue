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

              <div class="alert alert-danger" role="alert" v-if="message">
                {{ message }}
              </div>

              <form @submit.prevent="submit">
                <p class="fs-5">{{ email }}</p>
                
                <div class="px-5">
                  <div class="input-group">
                    <input ref="passwordInput" name="password" v-model="form.password" type="password" class="form-control" placeholder="New Password" />
                    <span class="input-group-text fs-4 material-symbols-rounded toggle-password" :class="{ 'active': showPassword }" @click="togglePasswordVisibility">{{ showPassword ? "&#xe8f4" : "&#xe8f5" }}</span>
                  </div>
                  
                  <div
                    v-for="error in errors?.password"
                    :key="error"
                    class="text-danger text-start"
                  >
                    {{ error }}
                  </div>

                  <div class="input-group my-2">
                    <input ref="passwordConfirmInput" name="password" type="password" v-model="form.password_confirmation" class="form-control" placeholder="Confirm Password" />
                    <span class="input-group-text fs-4 material-symbols-rounded toggle-password" :class="{ 'active': showPasswordConfirm }" @click="togglePasswordConfirmVisibility">{{ showPasswordConfirm ? "&#xe8f4" : "&#xe8f5" }}</span>
                  </div>

                  <div
                    v-for="error in errors?.password_confirmation"
                    :key="error"
                    class="text-danger text-start"
                  >
                    {{ error }}
                  </div>
                </div>
                <div class="btn-wrapper px-5 mt-4">

                  <button type="submit" class="btn btn-primary w-100" :disabled="!isFormValid && isExpired" 
                    @mouseenter="showLockOpen = false;"
                    @mouseleave="showLockOpen = true"
                    @click="submitResetPassword" 
                    v-if="showContinueBtn"
                  >
                    Continue
                    <span class="material-symbols-rounded forward-icon">&#xe941;</span>
                  </button>

                  <button type="button" class="btn disabled btn-primary w-100" v-else>
                      <LoadingIndicator />
                  </button>

                </div>
              </form>
            </div> <!-- end of content -->
          </div>
        </div>
      </div> <!-- end of change-password -->

      <div v-if="!submitted" class="reset-successfully">
        <div class="card">
          <div class="card-body text-center">
            <svg class="check" xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78" fill="none">
              <path d="M33.3212 56.5175L60.56 29.2786L56.1325 24.9473L33.3212 47.7587L21.7712 36.2086L17.44 40.5399L33.3212 56.5175ZM39 77.5001C33.7383 77.5001 28.7654 76.4894 24.0812 74.4682C19.3971 72.4469 15.3065 69.6877 11.8094 66.1906C8.31229 62.6935 5.55312 58.6029 3.53187 53.9187C1.51062 49.2345 0.5 44.2616 0.5 38.9999C0.5 33.6741 1.51062 28.669 3.53187 23.9848C5.55312 19.3007 8.31229 15.2261 11.8094 11.761C15.3065 8.29604 19.3971 5.5529 24.0812 3.53164C28.7654 1.51038 33.7383 0.499756 39 0.499756C44.3258 0.499756 49.3308 1.51038 54.015 3.53164C58.6992 5.5529 62.7737 8.29604 66.2387 11.761C69.7037 15.2261 72.4469 19.3007 74.4681 23.9848C76.4894 28.669 77.5 33.6741 77.5 38.9999C77.5 44.2616 76.4894 49.2345 74.4681 53.9187C72.4469 58.6029 69.7037 62.6935 66.2387 66.1906C62.7737 69.6877 58.6992 72.4469 54.015 74.4682C49.3308 76.4894 44.3258 77.5001 39 77.5001Z" fill="#FF6B00"/>
            </svg>

            <div class="content">
              <h5 class="card-title">Your Password has been reset Successfully!</h5>
              <p class="card-text">You can now use your new password to log in to your account</p>

              <div class="btn-wrapper">
                <button type="submit" class="btn btn-primary" @click="backToLogin">
                  Login
                  <span class="material-symbols-rounded forward-icon">&#xe941;</span>
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
import Joi from "joi";
import LoadingIndicator from "/src/components/LoadingIndicator.vue";

export default {
  components: {
    BlankHeader,
    LoadingIndicator
  },
  setup() {

  },
  data() {
    return {
      showContinueBtn: true,
      errors: {
        password: '',
        password_confirmation:''
      },
      schema: null,
      message: '',
      submitted: true,
      isInputActive: false,
      showPassword: false,
      showPasswordConfirm: false,
      email: null,
      form: {
        password: '',
        password_confirmation: '',
      },
      isExpired: false,
      schema: null,
    }
  },
  methods: {
    ...mapActions([
      'resetPassword', 'fetchEmailByToken',
    ]),
    submit() {
      this.showContinueBtn = false;
      this.errors = [];

      if (this.form.token) {

        this.schema
        .validateAsync(this.form, {
          abortEarly: false,
          allowUnknown: true,
        })
        .then(async (validated) => {
          await this.resetPassword(this.form)
            .then(response => {
              const { status: statusCode, data: { result, status, message: msg } } = response;

              if (statusCode === 203 && status === 422) {
                this.showContinueBtn = true;
                this.errors = result?.errors
              } else if (statusCode === 203) {
                this.showContinueBtn = true;
                this.message = msg;
                console.log('Status [203]: ', msg);
              } else if (statusCode === 200) {
                this.$router.push({name: 'login'});
                this.showContinueBtn = true;
              }

              console.log('Reset password response: ', response)
            });

        })
        .catch((err) => {
          this.isLoading = false;
          console.log('Validation Error: ', err);
          this.showContinueBtn = true;
          err.details.forEach((error) => {
            console.log('Error message: ', error);
            this.errors[error.path[0]] = [error.message];
          });
        });

      } else {
        console.log('Token is required.');
        this.showContinueBtn = true;
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
      // this.submitted = false
      // console.log("Password reset request for: ", this.form.email);
      // console.log("Password: ", this.form.password);
      // console.log("Confirm password: ", this.form.password_confirmation);
    },
    backToLogin(){
      window.location.href = '/login';
    },
  },
  mounted() {
    
    this.form.token = this.$route.params.token;
    
    this.errors = {
      password: '',
      password_confirmation:''
    };

    this.schema = Joi.object({
      password: Joi.string().required().min(8).label("Password").messages({
        "string.min": "Password must be at least 8 characters.",
        "string.empty": `Password is required.`,
        "string.base": "Password must be a string."
      }),
      password_confirmation: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "string.min": "Password confirmation must be at least 8 characters.",
          "any.required": `Password confirmation is required.`,
          "any.only": "Password confirmation does not match.",
        }),
    }).with("password", "password_confirmation");

    document.addEventListener("click", this.onClickOutside);
    this.email = '';

    this.fetchEmailByToken(this.$route.params.token)
    .then(res => {
      
      const { status, result, message: msg } = res;

      if (status === 200) {
        const { mask } = result;
        this.email = mask;
        this.message = '';

      }  else if (status === 203) {

        const { mask } = result;

        this.email = mask;
        this.message = msg;
        console.log('[203] Reset Password mounted: ', result);
        this.isExpired = true;
      }
      

    }).catch(err => {
      const { status, result: { mask }, message: msg } = err;
      console.log('Password reset token error: ', err);
      this.email = mask;
      this.message = msg;

    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickOutside);
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    isFormValid() {
      return (
        this.form.password && this.form.password_confirmation === this.form.password
      );
    },
  }
}
</script>
<style scoped>
.error-password {
  position: relative !important;
  top: -0.75rem !important;
}

.error-confirmation {
  position: relative !important;
  top: -4.5rem !important;
  margin: 0 !important;
  padding: 0 !important;
}

.input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}
.input-group > .form-control,
.input-group > .form-select,
.input-group > .form-floating {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
}
.input-group > .form-control:focus,
.input-group > .form-select:focus,
.input-group > .form-floating:focus-within {
  z-index: 5;
}
.input-group .btn {
  position: relative;
  z-index: 2;
}
.input-group .btn:focus {
  z-index: 5;
}

.input-group-text {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  text-align: center;
  white-space: nowrap;
  background-color: var(--bs-tertiary-bg);
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
}

.input-group-lg > .form-control,
.input-group-lg > .form-select,
.input-group-lg > .input-group-text,
.input-group-lg > .btn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: var(--bs-border-radius-lg);
}

.input-group-sm > .form-control,
.input-group-sm > .form-select,
.input-group-sm > .input-group-text,
.input-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: var(--bs-border-radius-sm);
}

.input-group-lg > .form-select,
.input-group-sm > .form-select {
  padding-right: 3rem;
}

.input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),
.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3),
.input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-control,
.input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group.has-validation > :nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),
.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4),
.input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-control,
.input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
  margin-left: calc(var(--bs-border-width) * -1);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.input-group > .form-floating:not(:first-child) > .form-control,
.input-group > .form-floating:not(:first-child) > .form-select {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

</style>