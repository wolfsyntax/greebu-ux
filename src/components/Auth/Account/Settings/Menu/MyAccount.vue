<template>
  <div>
    <div class="content" >
      <div class="user-description">
        <h3 class="title d-flex align-items-center">My Profile</h3>
        <!-- <p class="msg">Rest assured that the songs will be delivered by the end of the day.</p> -->
      </div>

      <div class="personal-details">
        <h4 class="title">Personal Details</h4>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="firstName">First name</label>
            <input type="text" class="form-control" id="firstName" aria-describedby="First name" 
              v-model="form.first_name" autocomplete="off" placeholder="First name">
            <small v-if="errors.first_name" class="text-danger">{{ errors.first_name.shift() }}</small>
          </div>

          <div class="form-group">
            <label for="lastName">Last name</label>
            <input type="text" class="form-control" id="lastName" aria-describedby="Last name"
              v-model="form.last_name" autocomplete="off" placeholder="Last name">
            <small v-if="errors.last_name" class="text-danger">{{ errors.last_name.shift() }}</small>
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" aria-describedby="Username"
              v-model="form.username" autocomplete="off" placeholder="Username">
            <small v-if="errors.username" class="text-danger">{{ errors.username.shift() }}</small>
          </div>

          <div class="form-group">
            <div class="d-flex align-items-center change-label">
              <label for="email">Email Address</label>
              <button type="button" class="btn btn-primary" @click="showCurrentEmailAddressModal">Change</button>
            </div>
            <input type="email" class="form-control disabled-field" id="email" aria-describedby="Email"
              v-model="formattedEmail" autocomplete="email" placeholder="Email" disabled>
            <!-- <small v-if="errors.email" class="text-danger">{{ errors.email.shift() }}</small> -->
          </div>

          <div class="form-group">
            <div class="d-flex align-items-center change-label">
              <label for="phone">Phone Number</label> 
              <button type="button" class="btn btn-primary" @click="showPhoneNumberModal">Change</button>
            </div>
            <input type="text" class="form-control disabled-field" id="phone" aria-describedby="Phone"
              v-model="formattedPhone" autocomplete="phone" placeholder="Phone" disabled>
            <!-- <small v-if="errors.phone" class="text-danger">{{ errors.phone.shift() }}</small> -->
          </div>

          <div class="button-wrapper">
            <button type="submit" class="btn btn-primary save">Save Changes</button>
          </div>
        </form>

        <div class="password-wrapper">
          <h4 class="title">Password</h4>
          <p class="sub-title">Lorem ipsum dolor sit amet consectetur.</p>
          <!-- Button trigger modal -->

          <button type="button" class="btn btn-primary" @click="showCurrentPasswordModal">
            Change Password
          </button>
        </div> <!-- end of password-wrapper -->
      </div> <!-- end of personal-details -->
    </div>

    <current-email @closeModal="closeCurrentEmailAddressModal" />
    <update-email @closeModal="closeNewEmailAddressModal" />
    <verify-email @closeModal="closeShowVerifyEmailAddressModal"/>

    <current-phone id="currentPhoneModal" @closeModal="closePhoneNumberModal" />
    <update-phone />

    

  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

import CurrentEmail from './My Account/CurrentEmail.vue';
import CurrentPhone from './My Account/CurrentPhone.vue';
import VerifyEmail from './My Account/VerifyEmail.vue';

import UpdateEmail from './My Account/UpdateEmail.vue';
import UpdatePhone from './My Account/UpdatePhone.vue';

import { Modal } from "bootstrap"

export default {
  components: {
    CurrentEmail, 
    CurrentPhone,
    UpdateEmail,
    UpdatePhone,
    VerifyEmail,
  },
  data () {
    return {
      form: {
        first_name: '',
        last_name: '',
        username: '',
      },
      formattedEmail: '',
      formattedPhone: '',

      verifyCode: [null, null, null, null, null, null],
      verifyMessage: null,
      countdown: 180,
      countdown_enabled: false,
      rate_countdown_enable: false,
      rate_countdown: 600,
      phone_num: null,
      errors: [],

      showInputPassword: false,
      showInputNewPassword: false,
      showInputConfirmPassword: false,
      showCurrentPassword: false,
      showNewPassword: false,
      showSuccessPasswordResetMessage: false,
      //  Change Phone Number
      showPhoneNumber: false,
      showNewPhoneNumber: false,
      showOTPCode: false,
      showSuccessPhoneNumeberMessage: false,
      //  Change Email Address
      showEmailAddress: false,
      showNewEmailAddress: false,
      showVerifyEmailAddress: false,
      showSuccessEmailAddressMessage: false,

      mcCurrentEmail: null,
      mcCurrentPhone: null,
    }
  },
  watch: {
    user(val)
    {
      this.form = {
        first_name: val?.first_name ?? '',
        last_name: val?.last_name ?? '',
        username: val?.username ?? '',
      };

      this.formattedEmail = val?.emailmask;
      this.formattedPhone = val?.phonemask;
    }
  },
  setup()
  {


    return {}
  },
  mounted()
  {

    this.mcCurrentEmail = new Modal(document.getElementById('currentEmailModal'), {
      keyboard: false
    });

    this.mcCurrentPhone = new Modal(document.getElementById('currentPhoneModal'), {
      keyboard: false
    });

    this.form = {
      first_name: this.user?.first_name ?? '', 
      last_name: this.user?.last_name ?? '', 
      username: this.user?.username ?? '', 
    };

    this.formattedEmail = this.user?.emailmask;
    this.formattedPhone = this.user?.phonemask;
    console.log('My Profile')
  },
  computed: {
    ...mapGetters(["isPhoneVerified", "info", 'myAccount', 'userRole',]),
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {

    //  Change Email Address
    showCurrentEmailAddressModal()
    {
      this.mcCurrentEmail.show();

      this.showEmailAddress = true;
    },
    closeCurrentEmailAddressModal()
    {
      console.log('Close Email')
      new Modal(document.getElementById('updateEmail'), {
        keyboard: false
      }).show();

      this.showEmailAddress = false;
    },
    showNewEmailAddressModal()
    {
      this.showEmailAddress = false;
      this.showNewEmailAddress = true;
    },
    closeNewEmailAddressModal()
    {
      this.showEmailAddress = false;
      this.showNewEmailAddress = false;
    },
    showVerifyEmailAddressModal()
    {
      this.showVerifyEmailAddress = true;
      this.showEmailAddress = false;
      this.showNewEmailAddress = false;
    },
    closeShowVerifyEmailAddressModal()
    {
      this.showVerifyEmailAddress = false;
      this.showEmailAddress = false;
      this.showNewEmailAddress = false;
    },
    //  Change Phone Number
    showPhoneNumberModal()
    {
      this.mcCurrentPhone.show();
      this.showPhoneNumber = true;
    },
    closePhoneNumberModal()
    {
      new Modal(document.getElementById('updatePhone'), {
        keyboard: false
      }).show();

      // this.showPhoneNumber = false;
    },
    showNewPhoneNumberModal()
    {
      this.showNewPhoneNumber = true;
      this.showPhoneNumber = false;
    },
    closeNewPhoneNumberModal()
    {
      this.showNewPhoneNumber = false;
      this.showPhoneNumber = false;
    },
    showOTPCodeModal()
    {
      this.showOTPCode = true;
      this.showNewPhoneNumber = false;
      this.showPhoneNumber = false;
    },
    closeOTPCodeModal()
    {
      this.showOTPCode = false;
      this.showNewPhoneNumber = false;
      this.showPhoneNumber = false;
    },
    showSuccessPhoneNumeberMessageModal()
    {
      this.showSuccessPhoneNumeberMessage = true;
      this.showPhoneNumber = false;
      this.showOTPCode = false;
      this.showNewPhoneNumber = false;
    },

    //  Change Password
    showCurrentPasswordModal()
    {
      this.showCurrentPassword = true;
      document.body.style.overflow = 'hidden';
    },
    closeCurrentPasswordModal()
    {
      this.showCurrentPassword = false;
      document.body.style.overflow = 'auto';
    },
    showNewPasswordModal()
    {
      this.showNewPassword = true;
    },
    showSuccessMessageModal()
    {
      this.showSuccessPasswordResetMessage = true;
      this.showNewPassword = false;
      this.showCurrentPassword = false;
    },
    closeNewPasswordModal()
    {
      this.showNewPassword = false;
      this.showCurrentPassword = false;
      this.showSuccessPasswordResetMessage = false;
      document.body.style.overflow = 'auto';
    },
    toggleCurrentPasswordVisibility()
    {
      this.showInputPassword = !this.showInputPassword;
      const passwordInput = this.$refs.passwordInput;
      if (passwordInput) {
        passwordInput.type = this.showInputPassword ? "text" : "password";
      }
    },
    toggleNewPasswordVisibility()
    {
      this.showInputNewPassword = !this.showInputNewPassword;
      const newPasswordInput = this.$refs.newPasswordInput;
      if (newPasswordInput) {
        newPasswordInput.type = this.showInputNewPassword ? "text" : "password";
      }
    },
    toggleShowConfirmPasswordVisibility()
    {
      this.showInputConfirmPassword = !this.showInputConfirmPassword;
      const passwordInput = this.$refs.passwordInput;
      if (passwordInput) {
        passwordInput.type = this.showInputConfirmPassword ? "text" : "password";
      }
    },
    loginWithNewPass()
    {
      this.$router.push('/login');
      document.body.style.overflow = 'auto';
    },
  }
}
</script>

<style scoped>
.modal {
  --bs-modal-zindex: 1055;
  --bs-modal-width: 500px;
  --bs-modal-padding: 1rem;
  --bs-modal-margin: 0.5rem;
  --bs-modal-color: ;
  --bs-modal-bg: var(--bs-body-bg);
  --bs-modal-border-color: var(--bs-border-color-translucent);
  --bs-modal-border-width: var(--bs-border-width);
  --bs-modal-border-radius: var(--bs-border-radius-lg);
  --bs-modal-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  --bs-modal-inner-border-radius: calc(
      var(--bs-border-radius-lg) - (var(--bs-border-width))
  );
  --bs-modal-header-padding-x: 1rem;
  --bs-modal-header-padding-y: 1rem;
  --bs-modal-header-padding: 1rem 1rem;
  --bs-modal-header-border-color: var(--bs-border-color);
  --bs-modal-header-border-width: var(--bs-border-width);
  --bs-modal-title-line-height: 1.5;
  --bs-modal-footer-gap: 0.5rem;
  --bs-modal-footer-bg: ;
  --bs-modal-footer-border-color: var(--bs-border-color);
  --bs-modal-footer-border-width: var(--bs-border-width);
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--bs-modal-zindex);
  display: none;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: var(--bs-modal-margin);
  pointer-events: none;
}
.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(0, -50px);
}
@media (prefers-reduced-motion: reduce) {
  .modal.fade .modal-dialog {
      transition: none;
  }
}
.modal.show .modal-dialog {
  transform: none;
}
.modal.modal-static .modal-dialog {
  transform: scale(1.02);
}
.modal-dialog-scrollable {
  height: calc(100% - var(--bs-modal-margin) * 2);
}
.modal-dialog-scrollable .modal-content {
  max-height: 100%;
  overflow: hidden;
}
.modal-dialog-scrollable .modal-body {
  overflow-y: auto;
}
.modal-dialog-centered {
  display: flex;
  align-items: center;
  min-height: calc(100% - var(--bs-modal-margin) * 2);
}
.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: var(--bs-modal-color);
  pointer-events: auto;
  background-color: var(--bs-modal-bg);
  background-clip: padding-box;
  border: var(--bs-modal-border-width) solid var(--bs-modal-border-color);
  border-radius: var(--bs-modal-border-radius);
  outline: 0;
}
.modal-backdrop {
  --bs-backdrop-zindex: 1050;
  --bs-backdrop-bg: #000;
  --bs-backdrop-opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--bs-backdrop-zindex);
  width: 100vw;
  height: 100vh;
  background-color: var(--bs-backdrop-bg);
}
.modal-backdrop.fade {
  opacity: 0;
}
.modal-backdrop.show {
  opacity: var(--bs-backdrop-opacity);
}
.modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: var(--bs-modal-header-padding);
  border-bottom: var(--bs-modal-header-border-width) solid
      var(--bs-modal-header-border-color);
  border-top-left-radius: var(--bs-modal-inner-border-radius);
  border-top-right-radius: var(--bs-modal-inner-border-radius);
}
.modal-header .btn-close {
  padding: calc(var(--bs-modal-header-padding-y) * 0.5)
      calc(var(--bs-modal-header-padding-x) * 0.5);
  margin: calc(-0.5 * var(--bs-modal-header-padding-y))
      calc(-0.5 * var(--bs-modal-header-padding-x))
      calc(-0.5 * var(--bs-modal-header-padding-y)) auto;
}
.modal-title {
  margin-bottom: 0;
  line-height: var(--bs-modal-title-line-height);
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: var(--bs-modal-padding);
}
.modal-footer {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: calc(var(--bs-modal-padding) - var(--bs-modal-footer-gap) * 0.5);
  background-color: var(--bs-modal-footer-bg);
  border-top: var(--bs-modal-footer-border-width) solid
      var(--bs-modal-footer-border-color);
  border-bottom-right-radius: var(--bs-modal-inner-border-radius);
  border-bottom-left-radius: var(--bs-modal-inner-border-radius);
}
.modal-footer > * {
  margin: calc(var(--bs-modal-footer-gap) * 0.5);
}
@media (min-width: 576px) {
  .modal {
    --bs-modal-margin: 1.75rem;
    --bs-modal-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
  .modal-dialog {
    max-width: var(--bs-modal-width);
    margin-right: auto;
    margin-left: auto;
  }
  .modal-sm {
    --bs-modal-width: 300px;
  }
}
@media (min-width: 992px) {
  .modal-lg,
  .modal-xl {
    --bs-modal-width: 800px;
  }
}
@media (min-width: 1200px) {
  .modal-xl {
    --bs-modal-width: 1140px;
  }
}
.modal-fullscreen {
  width: 100vw;
  max-width: none;
  height: 100%;
  margin: 0;
}
.modal-fullscreen .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}
.modal-fullscreen .modal-footer,
.modal-fullscreen .modal-header {
  border-radius: 0;
}
.modal-fullscreen .modal-body {
  overflow-y: auto;
}
@media (max-width: 575.98px) {
  .modal-fullscreen-sm-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal-fullscreen-sm-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal-fullscreen-sm-down .modal-footer,
  .modal-fullscreen-sm-down .modal-header {
    border-radius: 0;
  }
  .modal-fullscreen-sm-down .modal-body {
    overflow-y: auto;
  }
}
@media (max-width: 767.98px) {
  .modal-fullscreen-md-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal-fullscreen-md-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal-fullscreen-md-down .modal-footer,
  .modal-fullscreen-md-down .modal-header {
    border-radius: 0;
  }
  .modal-fullscreen-md-down .modal-body {
    overflow-y: auto;
  }
}
@media (max-width: 991.98px) {
  .modal-fullscreen-lg-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal-fullscreen-lg-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal-fullscreen-lg-down .modal-footer,
  .modal-fullscreen-lg-down .modal-header {
    border-radius: 0;
  }
  .modal-fullscreen-lg-down .modal-body {
    overflow-y: auto;
  }
}
@media (max-width: 1199.98px) {
  .modal-fullscreen-xl-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal-fullscreen-xl-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal-fullscreen-xl-down .modal-footer,
  .modal-fullscreen-xl-down .modal-header {
    border-radius: 0;
  }
  .modal-fullscreen-xl-down .modal-body {
    overflow-y: auto;
  }
}
@media (max-width: 1399.98px) {
    .modal-fullscreen-xxl-down {
      width: 100vw;
      max-width: none;
      height: 100%;
      margin: 0;
    }
    .modal-fullscreen-xxl-down .modal-content {
      height: 100%;
      border: 0;
      border-radius: 0;
    }
    .modal-fullscreen-xxl-down .modal-footer,
    .modal-fullscreen-xxl-down .modal-header {
      border-radius: 0;
    }
    .modal-fullscreen-xxl-down .modal-body {
      overflow-y: auto;
    }
}

</style>