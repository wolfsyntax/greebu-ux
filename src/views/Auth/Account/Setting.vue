<template>
  <section class="account-settings">
    <div class="container">
      <div class="user-message">
        <h2 class="title">Welcome back {{ form.first_name }}!</h2>
        <p class="sub-title">You are on the Free Plan.</p>
      </div>

      <div class="row">
      <div class="col-md-3">
        <div class="sidebar">
          <li class="d-flex align-items-center" 
          v-for="sidebar in sidebarOptions" 
          :key="sidebar.name"
          :class="{ 'active-option': selectedOption === sidebar.name }"
          @click="showSidebarContent(sidebar)">
            <span class="material-symbols-rounded">{{ sidebar.icon }}</span>
            <h5>{{ sidebar.name }}</h5>
          </li>
        </div>
      </div>
      <div class="col-md-9">
        <div class="content" v-show="selectedOption === 'My Account'">
          <div class="user-description">
            <h3 class="title">My Profile</h3>
            <p class="msg">Rest assured that the songs will be delivered by the end of the day.</p>
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
                  <label for="email">Username</label>
                  <input type="text" class="form-control" id="username" aria-describedby="Username"
                    v-model="form.username" autocomplete="off" placeholder="Username">
                  <small v-if="errors.username" class="text-danger">{{ errors.username.shift() }}</small>
                </div>

                <div class="form-group">
                  <label for="address">Address</label>
                  <input type="text" class="form-control" id="address" aria-describedby="Address"
                    autocomplete="Address" >
                  <!-- <small v-if="errors.email" class="text-danger">{{ errors.email.shift() }}</small> -->
                </div>
            
                <div class="form-group">
                  <div class="d-flex align-items-center change-label">
                    <label for="username">Email Address</label>
                    <button type="button" class="btn btn-primary">Change</button>
                  </div>
                  <input type="email" class="form-control disabled-field" id="email" aria-describedby="Email"
                    v-model="formattedEmail" autocomplete="email" placeholder="Email" disabled>
                  <small v-if="errors.email" class="text-danger">{{ errors.email.shift() }}</small>
                </div>

                <div class="form-group">
                  <div class="d-flex align-items-center change-label">
                    <label for="email">Phone Number</label> 
                    <button type="button" class="btn btn-primary">Change</button>
                  </div>
                  <input type="text" class="form-control disabled-field" id="phone" aria-describedby="Phone"
                    v-model="formattedPhone" autocomplete="phone" placeholder="Phone" disabled>
                  <small v-if="errors.phone" class="text-danger">{{ errors.phone.shift() }}</small>
                </div>
            
                <div class="button-wrapper">
                  <button type="submit" class="btn btn-primary save">Save Changes</button>
                </div>
          </form>

          <div class="password-wrapper">
            <h4 class="title">Password</h4>
            <p class="sub-title">Lorem ipsum dolor sit amet consectetur.</p>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
              Change Password
            </button>
          </div> <!-- end of password-wrapper -->

          <!-- <div class="row my-3">
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
            </div> -->

          </div> <!-- end of personal-details -->


                                       <!-- Modal for CHANGE PASSWORD  -->

          <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="text-center modal-body">
                    <span class="material-symbols-rounded lock">&#xe897;</span>
                   <h3 class="create">Create new password</h3>
                    <p class="proceed">To proceed with changing your password, please enter your current password for verification.</p>

                    <form>
                      <div class="form-group">
                      <label for="password">Current password</label>
                      <input type="password" class="form-control" id="password" aria-describedby="Password"
                        autocomplete="Password">
                     </div>

                      <div class="button-verify-wrapper">
                        <button type="button" class="btn btn-secondary submit" 
                        data-bs-toggle="modal" data-bs-target="#confirmPasswordModal">Continue</button>
                      </div>
                    </form>

                  </div> <!-- end of modal body -->
                </div>
              </div>
            </div>

            <div class="modal fade" id="confirmPasswordModal" tabindex="-1" aria-labelledby="confirmPasswordLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="text-center modal-body">
                    <span class="material-symbols-rounded lock">&#xe897;</span>
                   <h3 class="create">Create new password</h3>
                    <p class="proceed">Your new password must be different from previous used passwords</p>

                    <form>
                      <div class="form-group new-password">
                      <label for="password">New password</label>
                      <input type="password" class="form-control" id="password" aria-describedby="Password"
                        autocomplete="Password">
                     </div>
                     <div class="form-group">
                      <label for="password">Confirm password</label>
                      <input type="password" class="form-control" id="password" aria-describedby="Password"
                        autocomplete="Password">
                     </div>

                      <div class="button-verify-wrapper">
                        <button type="button" class="btn btn-secondary submit" data-bs-dismiss="modal">Submit</button>
                      </div>
                    </form>

                  </div> <!-- end of modal body -->
                </div>
              </div>
            </div>



        </div> <!-- end of My Account tab -->

        <div class="content"  v-show="selectedOption === 'Customized Songs'">
          <div class="user-description">
            <h3 class="title">Customized Songs</h3>
          </div>

          <div class="d-flex align-items-center customized-tabs">
            <li class="d-flex align-items-center" 
            v-for="customize in customizedSongs" 
            :key="customize.name"
            :class="{ 'active-option': selectedCustomized === customize.name }"
            @click="showCustomizeContent(customize)">
              <h5>{{ customize.name }}</h5>
            </li>
         </div>
         
         <div class="content"  v-show="selectedCustomized === 'All'">
          <h3>All</h3>
        </div>

        <div class="content"  v-show="selectedCustomized === 'Requested'">
          <h3>Requested</h3>
        </div>

        <div class="content"  v-show="selectedCustomized === 'For Submission'">
          <h3>RFor Submission</h3>
        </div>

        <div class="content"  v-show="selectedCustomized === 'For Revision'">
          <h3>For Revision</h3>
        </div>

        <div class="content"  v-show="selectedCustomized === 'Completed'">
          <h3>Completed</h3>
        </div>

        </div> <!-- end of Customized Songs -->


        <div class="content"  v-show="selectedOption === 'My Bookings'">
          <h3>My Bookings</h3>
        </div>
        <div class="content"  v-show="selectedOption === 'My Proposal'">
          <h3>My Proposal</h3>
        </div>
        <div class="content"  v-show="selectedOption === 'Notifications'">
          <h3>Notifications</h3>
        </div>
        <div class="content"  v-show="selectedOption === 'Manage Subscriptions'">
          <h3>Manage Subscriptions</h3>
        </div>
        <div class="content"  v-show="selectedOption === 'Others'">
          <h3>Others</h3>
        </div>
      </div>
    </div> <!-- end of row -->

    </div>
   </section>
    

  <!-- <section class="phone-verification" v-else>
    <div class="container">
      <div class="check-message">
        <div class="card"> -->

          <!-- <div class="card-header py-2">&nbsp;
            <a href="" v-if="$route.path === '/login'" @click="$store.commit('CLEAR_STATE')">
              <span class="material-symbols-outlined">&#xe5c4;</span>
            </a>
          </div> -->

          <!-- <div class="card-body text-center">
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
    </div>
  </section>  -->
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Verify from '@/components/Auth/Verify.vue';

export default {
  components: {
  },
  setup () {
    return {
    }
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
      errors: [],

    sidebarOptions: [
        { icon: 'account_circle', name: 'My Account'},
        { icon: 'library_music	', name: 'Customized Songs'},
        { icon: 'event_available', name: 'My Bookings'},
        { icon: 'music_note', name: 'My Proposal'},
        { icon: 'notifications', name: 'Notifications'},
        { icon: 'subscriptions', name: 'Manage Subscriptions'},
        { icon: 'page_info', name: 'Others'}
    ],
    selectedOption: 'My Account', // Default selected option
    customizedSongs: [
        { name: 'All'},
        { name: 'Requested'},
        { name: 'For Submission'},
        { name: 'For Revision'},
        { name: 'Completed'},
    ],
    selectedCustomized: 'All', // Default selected option
    }
  },
  methods: {
    showSidebarContent(option) {
      this.selectedOption = option.name;
    },
    showCustomizeContent(option) {
      this.selectedCustomized = option.name;
    },
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
    formattedPhone() {
      const visibleDigits = this.form.phone.slice(0, 3) + '*****' + this.form.phone.slice(10);
      return visibleDigits;
    },
    formattedEmail() {
      const visibleDigits = this.form.email.slice(0, 3) + '*****' + this.form.email.slice(15);
      return visibleDigits;
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