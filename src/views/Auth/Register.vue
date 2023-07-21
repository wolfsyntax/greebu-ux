<template>
  <layout>

  <section class="register">
    <div class="container-fluid">
      <div id="registerCarouselBanner" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#registerCarouselBanner" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#registerCarouselBanner" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#registerCarouselBanner" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
          </div>
          <div class="carousel-item">
          </div>
          <div class="carousel-item">
          </div>
        </div>
      </div>

      <div class="register-form">
        <div class="logo">
          <a href="/"><img src="/assets/geebu-logo.svg" width="175" height="46" alt="Logo"></a>
        </div>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="submit"> 
                                               <!-- Choose account type -->
           <div v-if="showRadioButtons">                                  
              <div class="row row-checkbox">
                <div class="col-md-12">
                  <h3 class="account-type">Account Type</h3>
                  <p class="account-description">Please choose your Account Type to create an account.</p>
                </div>

                <div class="col-md-12">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="customers" >
                    <label :class="{ 'selected': form.account_type === 'customers' }" class="form-check-label" for="accountType">
                    I want to create a song
                    </label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="artists" >
                    <label :class="{ 'selected': form.account_type === 'artists' }" class="form-check-label" for="accountType">
                    I'm an Artist
                    </label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="organizer">
                    <label :class="{ 'selected': form.account_type === 'organizer' }" class="form-check-label" for="accountType">
                    I'm an Organizer
                    </label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="service-provider" >
                    <label :class="{ 'selected': form.account_type === 'service-provider' }" class="form-check-label" for="accountType">
                    Offers Services
                    </label>
                  </div>
                  <div v-if="errors?.account_type" class="text-danger">{{ errors.account_type.shift() }}</div>
                  <div class="d-grid gap-2 btn-account-type">
                    <button class="btn btn-primary" @click.prevent="submitAccountType" :disabled="!isAccountTypeSelected">Next</button>
                  </div>
                  <div class="have-account">
                      <p class="text-center">Already have an Account?</p><a href="/login">Log In</a>
                  </div>
                </div>
              </div>
              </div>

            <div v-if="!showRadioButtons">
              <div class="card-header">
              <h2>Create Account</h2>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
                                 <!-- User inputs -->
              <div class="form-group">
                <label for="email">Email Address</label>
                <input id="email" :type="form.login_type" class="form-control" name="email" v-model="form.email" required autocomplete="email" autofocus>
                <div v-if="errors?.email" class="text-danger">{{ errors.email.shift() }}</div>
              </div>

              <div class="form-group">
                <label for="name">First Name</label>
                <input id="name" type="text" class="form-control " name="name" v-model="form.first_name" required autocomplete="first-name">
                <div v-if="errors?.first_name" class="text-danger">{{ errors.first_name.shift() }}</div>
              </div>

              <div class="form-group">
                <label for="name">Last Name</label>
                <input id="name" type="text" class="form-control " name="name" v-model="form.last_name" required autocomplete="last-name" autofocus>
                <div v-if="errors?.last_name" class="text-danger">{{ errors.last_name.shift() }}</div>
              </div>

              <div class="form-group">
                <label for="username">Username</label>
                <input id="email" type="text" class="form-control" name="username" v-model="form.username" required autocomplete="username">
                <div v-if="errors?.username" class="text-danger">{{ errors.username.shift() }}</div>
              </div>

              <div class="form-group">
                <label for="phone-number">Phone Number</label>
                <input id="phone-number" type="number" class="form-control" name="phone" v-model="form.phone" required autocomplete="phone">
                <div v-if="errors?.phone" class="text-danger">{{ errors.phone.shift() }}</div>
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" name="password" v-model="form.password" required autocomplete="new-password">
                <div v-if="errors?.password" class="text-danger">{{ errors.password.shift() }}</div>
              </div>

              <div class="form-group">
                <label for="password-confirm">Confirm Password</label>
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" v-model="form.password_confirmation" required autocomplete="new-password">
                <div v-if="errors?.password_confirmation" class="text-danger">{{ errors.password_confirmation.shift() }}</div>
              </div>

              <div class="form-check form-checkbox">
                <input type="checkbox" class="form-check-input" v-model="agree_term" id="agreed_id"/>
                <label class="form-check-label" for="agreed_id">
                &nbsp; I agree to all the <a href="/terms">Terms</a> and <a href="/policy">Privacy policy</a></label>
              </div>

              <div class="d-grid gap-2 btn-sign-up">
                <button class="btn btn-primary" type="submit" :disabled="!agree_term">Create Account</button>
              </div>

              <social-button />

              </div> 
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>

  </layout>
</template>
<script>
import Layout from '/src/components/Layouts/AuthLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";
import SocialButton from '@/components/Auth/SocialLogin.vue';
export default {
  components: {
    layout: Layout,
    'social-button': SocialButton,
  },
  data()
  {
    return {
     
      form: {
        first_name: null,
        last_name: null,
        email: null,
        username: null,
        phone: null,
        password: null,
        password_confirmation: null,
        
        // account_type: 'customers',
        account_type: '',
        login_type: 'email',
        isDisabled: false,
       
      },
      errors: {},
      agree_term: false,

      showRadioButtons: true,
    }
  },
  props: {
    // errors: Object,
  },
  setup()
  {

  },
  mounted() {
    
  },
  computed: {
    //...mapGetters([''])
    //...mapState({})
    isAccountTypeSelected() {
      return this.form.account_type !== '';
    }
  },
  // created() {
  //   console.log(this.form.account_type);
  // },
  methods: {
    // toggleRadioButtons() {
    //   this.showRadioButtons = false;
    // },
    submitAccountType() {
      if (this.form.account_type) {
        this.showRadioButtons = false;
      }
    },
    ...mapActions(['signup']),
    submit()
    {
      // const loader = this.$vs.loading({
      //   text: 'Loading...',
      // })
      this.isDisabled = true;
      this.signup(this.form)
        .then((response) => { 
          // loader.close();
          this.isDisabled = false;
          const { status,data } = response;

          if (status === 201)
          {
            this.$router.push("/phoneverification");
            // this.$vs.notification({
            //   color: 'success',
            //   position: 'top-right',
            //   title: 'Signup',
            //   text: `${data.message}`
            // })
          } else if (status === 203) {
            this.errors = data?.results?.errors || {};
          }
        })
        .catch(err =>
        {
          // this.$vs.notification({
          //   color: 'danger',
          //   position: 'top-right',
          //   title: 'Server Status',
          //   text: `${err.message}`
          // })
        })

    }
  },
}
</script>