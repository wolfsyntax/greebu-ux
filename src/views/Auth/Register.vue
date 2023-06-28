<template>
  <layout>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 py-5">
          <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
              <form @submit.prevent="submit">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="customers" checked>
                      <label class="form-check-label" for="accountType">
                          I want to create a song
                      </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="artists" >
                        <label class="form-check-label" for="accountType">
                            I'm an Artist
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="organizer" >
                        <label class="form-check-label" for="accountType">
                            I'm an Organizer
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="service-provider" >
                        <label class="form-check-label" for="accountType">
                            Offers Services
                        </label>
                    </div>
                    <div v-if="errors?.account_type">{{ errors.account_type[0] }}</div>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-12">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="loginType" id="loginType" v-model="form.login_type" value="email" checked>
                      <label class="form-check-label" for="loginType">
                          Email
                      </label>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="loginType" id="loginType" v-model="form.login_type" value="phone" >
                      <label class="form-check-label" for="loginType">
                          Phone
                      </label>
                    </div>
                    <div v-if="errors?.login_type">{{ errors.login_type[0] }}</div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12">
                    <label for="email" class="text-md-end">Email Address</label>
                    <input id="email" :type="form.login_type" class="form-control" name="email" v-model="form.email" required autocomplete="email" autofocus>
                    <div v-if="errors?.email">{{ errors.email[0] }}</div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12">
                    <label for="name" class="text-md-end">First Name</label>
                    <input id="name" type="text" class="form-control " name="name" v-model="form.first_name" required autocomplete="first-name">
                    <div v-if="errors?.first_name">{{ errors.first_name[0] }}</div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12">
                    <label for="name" class="text-md-end">Last Name</label>
                    <input id="name" type="text" class="form-control " name="name" v-model="form.last_name" required autocomplete="last-name" autofocus>
                    <div v-if="errors?.last_name">{{ errors.last_name[0] }}</div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12">
                    <label for="username" class="text-md-end">Username</label>
                    <input id="email" type="text" class="form-control" name="username" v-model="form.username" required autocomplete="username">
                    <div v-if="errors?.username">{{ errors.username[0] }}</div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12">
                    <label for="password" class="text-md-end">Password</label>
                    <input id="password" type="password" class="form-control" name="password" v-model="form.password" required autocomplete="new-password">
                    <div v-if="errors?.password">{{ errors.password[0] }}</div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12">
                    <label for="password-confirm" class="text-md-end">Confirm Password</label>
                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" v-model="form.password_confirmation" required autocomplete="new-password">
                    <div v-if="errors?.password_confirmation">{{ errors.password_confirmation[0] }}</div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12">
                    <input type="checkbox" v-model="agree_term" id="agreed_id"/>
                    <label class="form-check-label" for="agreed_id">&nbsp; I agree to all the <Link href="/">Terms</Link> and <Link href="/">policy</Link></label>
                  </div>
                </div>
                
                <div class="row mb-0">
                  <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary" :disabled="!agree_term && !isDisabled">
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from '@/components/Layouts/AuthLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    layout: Layout,
  },
  data()
  {
    return {
      form: {
        first_name: null,
        last_name: null,
        email: null,
        username: null,
        password: null,
        password_confirmation: null,
        
        account_type: 'customers',
        login_type: 'email',
        isDisabled: false,
      },
      errors: {},
      agree_term: false,
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
  },
  methods: {
    ...mapActions(['signup']),
    submit()
    {
      const loader = this.$vs.loading()
      this.isDisabled = true;
      this.signup(this.form)
        .then((response) => { 
          loader.close();
          this.isDisabled = false;
          const { status,data } = response;

          if (status === 201)
          {
            this.$router.push("/login");
            this.$vs.notification({
              color: 'success',
              position: 'top-right',
              title: 'Signup',
              text: `${data.message}`
            })
          } else if (status === 203) {
            this.errors = data?.results?.errors || {};
          }
        })
        .catch(err =>
        {
          // console.log('Test1: ', err)
          loader.close();
          //this.$router.push("");
          this.$vs.notification({
            color: 'danger',
            position: 'top-right',
            title: 'Signup',
            text: `Server Error`
          })
        });

    }
  },
}
</script>