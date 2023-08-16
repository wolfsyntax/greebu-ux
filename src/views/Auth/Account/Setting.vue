<template>

<section class="account-settings">
    <div class="container">
      <div class="user-message">
        <h2 class="title">Welcome back Arlene Mccoy,</h2>
        <p class="sub-title">You are on the Free Plan.</p>
      </div>

      <!-- <div class="row">
      <div class="col-md-3">
        <div class="sidebar">
          <li class="d-flex align-items-center" 
          v-for="sidebar in sidebarOptions" 
          :key="sidebar.name"
          :class="{ 'active-option': selectedOption === sidebar.name }"
          @click="showContent(sidebar)">
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
            <form>
              
            </form>
          </div>

        </div>

        <div class="content"  v-show="selectedOption === 'Customized Songs'">
          <h3>My Customized Songs</h3>
        </div>
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
    </div> -->

    </div>
   </section>
   

  <section class="container py-5">
    <h1>Welcome back Arlene Mccoy</h1>
    <div class="row align-items-start">
      <div class="col-md-3">
        One of three columns
      </div>
      <div class="col">
        <div class="py-5">
          <form @submit.prevent="">
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="firstName">First name</label>
                  <input type="text" class="form-control" id="firstName" aria-describedby="First name"
                    v-model="form.first_name" autocomplete="off" placeholder="First name">
                  <small v-if="errors.first_name" class="text-danger">{{ errors.first_name.shift() }}</small>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="lastName">Last name</label>
                  <input type="text" class="form-control" id="lastName" aria-describedby="Last name"
                    v-model="form.last_name" autocomplete="off" placeholder="Last name">
                  <small v-if="errors.last_name" class="text-danger">{{ errors.last_name.shift() }}</small>
                </div>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="email">Username</label>
                  <input type="text" class="form-control" id="username" aria-describedby="Username"
                    v-model="form.username" autocomplete="off" placeholder="Username">
                  <small v-if="errors.username" class="text-danger">{{ errors.username.shift() }}</small>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="username">Email</label>
                  <input type="email" class="form-control" id="email" aria-describedby="Email"
                    v-model="form.email" autocomplete="email" placeholder="Email">
                  <small v-if="errors.email" class="text-danger">{{ errors.email.shift() }}</small>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="email">Phone</label>
                  <input type="text" class="form-control" id="phone" aria-describedby="Phone"
                    v-model="form.phone" autocomplete="phone" placeholder="Phone">
                  <small v-if="errors.phone" class="text-danger">{{ errors.phone.shift() }}</small>
                </div>
              </div>
            </div>
            
            <div class="row my-3">
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
            <div class="row py-3">
              <div class="col">
                <button type="submit" class="btn btn-primary mx-1">Save Changes</button>
                <button type="button" class="btn btn-success mx-1">Delete Account</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup () {
    

    return {
    //   sidebarOptions: [
    //     { icon: 'account_circle', name: 'My Account'},
    //     { icon: 'library_music	', name: 'Customized Songs'},
    //     { icon: 'event_available', name: 'My Bookings'},
    //     { icon: 'music_note', name: 'My Proposal'},
    //     { icon: 'notifications', name: 'Notifications'},
    //     { icon: 'subscriptions', name: 'Manage Subscriptions'},
    //     { icon: 'page_info', name: 'Others'}
    // ],
    selectedOption: 'My Account', // Default selected option
    }
  },
  data: () => ({
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
    errors: []
  }),
  methods: {
    ...mapActions([
      'accountSetting',
    ]),
    submit()
    {
      
    },
    // showContent(option) {
    //   this.selectedOption = option.name;
    // },
  },
  created() {
    
  },
  computed: {
    ...mapGetters(["isPhoneVerified"]),
    ...mapState({
      user: (state) => state.user,
    }),
  },
  mounted() {
    
  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>

</style>