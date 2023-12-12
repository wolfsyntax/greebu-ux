<template>
  <layout>
    <section class="register">
      <div
        class="container-fluid"
        v-if="!$route.query.status || $route.query.status === false"
      >
        <div
          id="registerCarouselBanner"
          class="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#registerCarouselBanner"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#registerCarouselBanner"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#registerCarouselBanner"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active"></div>
            <div class="carousel-item"></div>
            <div class="carousel-item"></div>
          </div>
        </div>

        <div class="register-form">
          <div class="logo">
            <router-link to="/"
              ><img
                src="/assets/geebu-logo.svg"
                width="175"
                height="46"
                alt="Logo"
            /></router-link>
          </div>
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="validate">
                <!-- Choose account type -->
                <div v-if="showRadioButtons">
                  <div class="row row-checkbox">
                    <div class="col-md-12">
                      <h3 class="account-type">Account Type</h3>
                      <p class="account-description">
                        Please choose your Account Type to create an account.
                      </p>
                    </div>

                    <div class="col-md-12">
                      <div
                        class="form-check"
                        @click="form.account_type = 'customers'"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          name="accountType"
                          id="accountTypeCustomer"
                          v-model="form.account_type"
                          value="customers"
                        />
                        <label
                          @click="form.account_type = 'customers'"
                          :class="{
                            selected: form.account_type === 'customers',
                          }"
                          class="form-check-label"
                          for="accountTypeCustomer"
                        >
                          I'm a Customer
                        </label>
                      </div>

                      <div
                        class="form-check"
                        @click="form.account_type = 'artists'"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          name="accountType"
                          id="accountTypeArtists"
                          v-model="form.account_type"
                          value="artists"
                        />
                        <label
                          @click="form.account_type = 'artists'"
                          :class="{ selected: form.account_type === 'artists' }"
                          class="form-check-label"
                          for="accountTypeArtists"
                        >
                          I'm an Artist
                        </label>
                      </div>

                      <div
                        class="form-check"
                        @click="form.account_type = 'organizer'"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          name="accountType"
                          id="accountTypeOrganizer"
                          v-model="form.account_type"
                          value="organizer"
                        />
                        <label
                          @click="form.account_type = 'organizer'"
                          :class="{
                            selected: form.account_type === 'organizer',
                          }"
                          class="form-check-label"
                          for="accountTypeOrganizer"
                        >
                          I'm an Organizer
                        </label>
                      </div>

                      <div
                        class="form-check"
                        @click="form.account_type = 'service-provider'"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          name="accountType"
                          id="accountTypeServiceProvider"
                          v-model="form.account_type"
                          value="service-provider"
                        />
                        <label
                          :class="{
                            selected: form.account_type === 'service-provider',
                          }"
                          class="form-check-label"
                          for="accountTypeServiceProvider"
                        >
                          Offers Services
                        </label>
                      </div>

                      <div
                        v-for="error in errors?.account_type"
                        :key="error"
                        class="text-danger"
                      >
                        {{ error }}
                      </div>
                      <div class="d-grid gap-2 btn-account-type">
                        <button
                          class="btn btn-primary"
                          @click.prevent="submitAccountType"
                          :disabled="!isAccountTypeSelected"
                        >
                          Next
                          <span class="material-symbols-rounded forward-icon">
                            &#xe941;
                          </span>
                        </button>
                      </div>

                      <div class="have-account">
                        <p class="text-center">Already have an Account?</p>
                        <router-link to="/login">Log In</router-link>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="!showRadioButtons">
                  <div class="card-header">
                    <h2>Create your account</h2>
                    <p>Get started in seconds - sign up today</p>
                  </div>

                  <div class="alert alert-danger" role="alert" v-if="message">
                    {{ message }}
                  </div>

                  <!-- User inputs -->
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input
                      id="email"
                      :type="form.login_type"
                      class="form-control"
                      name="email"
                      v-model="form.email"
                      autocomplete="email"
                      autofocus
                    />
                    <div
                      v-for="error in errors?.email"
                      :key="error"
                      class="text-danger"
                    >
                      {{ error }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="name">First Name</label>
                    <input
                      id="first_name"
                      type="text"
                      class="form-control"
                      name="name"
                      v-model="form.first_name"
                      autocomplete="first-name"
                    />
                    <div
                      v-for="error in errors?.first_name"
                      :key="error"
                      class="text-danger"
                    >
                      {{ error }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="name">Last Name</label>
                    <input
                      id="last_name"
                      type="text"
                      class="form-control"
                      name="name"
                      v-model="form.last_name"
                      autocomplete="last-name"
                      autofocus
                    />
                    <div
                      v-for="error in errors?.last_name"
                      :key="error"
                      class="text-danger"
                    >
                      {{ error }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      class="form-control"
                      name="username"
                      v-model="form.username"
                      autocomplete="username"
                    />
                    <div
                      v-for="error in errors?.username"
                      :key="error"
                      class="text-danger"
                    >
                      {{ error }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="phone">Mobile number</label>

                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1"
                        >+63</span
                      >
                      <input
                        id="phone"
                        type="text"
                        class="form-control"
                        name="phone"
                        v-model="form.phone"
                        @blur="getFormattedPhone"
                        autocomplete="phone"
                        @beforeinput="handleBeforeInput"
                        placeholder=""
                      />
                    </div>

                    <div
                      v-for="error in errors?.phone"
                      :key="error"
                      class="text-danger phone-error"
                    >
                      {{ error }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      name="password"
                      v-model="form.password"
                      autocomplete="new-password"
                    />
                    <div
                      v-for="error in errors?.password"
                      :key="error"
                      class="text-danger"
                    >
                      {{ error }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="password-confirm">Confirm Password</label>
                    <input
                      id="password-confirm"
                      type="password"
                      class="form-control"
                      name="password_confirmation"
                      v-model="form.password_confirmation"
                      autocomplete="new-password"
                    />
                    <!-- <div v-if="errors?.password_confirmation" class="text-danger">{{ errors.password_confirmation.shift() }}</div> -->
                    <div
                      v-for="error in errors?.password_confirmation"
                      :key="error"
                      class="text-danger"
                    >
                      {{ error }}
                    </div>
                  </div>

                  <div class="form-check form-checkbox">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      v-model="agree_term"
                      id="agreed_id"
                    />
                    <label class="form-check-label" for="agreed_id">
                      &nbsp; I agree to all the <a href="/terms">Terms</a> and
                      <a href="/policy">Privacy policy</a>
                    </label>
                  </div>

                  <div class="d-grid gap-2 btn-sign-up">
                    <button
                      class="btn btn-primary"
                      type="submit"
                      :disabled="!agree_term && !isDisabled"
                    >
                      <span v-if="isLoading">
                        <i class="busy-submitting"></i>Create Account
                      </span>
                      <span v-else>Create Account</span>
                    </button>
                  </div>

                  <social-button
                    :account_type="form.account_type"
                    @request="setMessage"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <verify-card v-else />
    </section>
  </layout>
</template>
<script>
import SocialButton from "@/components/Auth/SocialLogin.vue";
import Verify from "@/components/Auth/Verify.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Layout from "/src/components/Layouts/AuthLayout.vue";

import Joi from "joi";

export default {
  components: {
    layout: Layout,
    "social-button": SocialButton,
    "verify-card": Verify,
  },
  data() {
    return {
      step: "register",
      verifyCode: null,
      verifyMessage: null,
      message: "",
      phone: "",
      errors: {},
      countdown: 180,
      countdown_enabled: false,
      rate_countdown_enable: false,
      rate_countdown: 600,
      agree_term: false,
      isDisabled: false,
      showRadioButtons: true,
      isLoading: false,
      isSignup: true,
      schema: null,
    };
  },
  props: {
    // errors: Object,
  },
  setup() {},
  mounted() {
    console.log("Register.vue mounted ", this.form.phone);

    if (this.form?.phone !== "") this.getFormattedPhone();
    this.schema = Joi.object({
      first_name: Joi.string()
        .min(2)
        .max(255)
        .required()
        .label("First name")
        .messages({
          "string.min": "First name must be at least 2 characters.",
          "string.max": "First name must not be grater than 255 characters.",
          "string.empty": `First name is required.`,
        }),
      last_name: Joi.string()
        .min(2)
        .max(255)
        .required()
        .label("Last name")
        .messages({
          "string.min": "Last name must be at least 2 characters.",
          "string.max": "Last name must not be grater than 255 characters.",
          "string.empty": `Last name is required.`,
        }),
      email: Joi.string()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: false /*['com', 'net']*/ },
        })
        .label("Email")
        .messages({
          "string.email": "Email must be a valid email address.",
          "string.empty": `Email is required.`,
        }),
      username: Joi.string()
        .min(2)
        .max(255)
        .required()
        .label("Username")
        .messages({
          "string.min": "Username must be at least 2 characters.",
          "string.max": "Username must not be grater than 255 characters.",
          "string.empty": `Username is required.`,
        }),
      phone: Joi.string()
        .required()
        .label("Phone number")
        .pattern(new RegExp("^9[0-9]{9}$"))
        .messages({
          "string.empty": `Phone number is required.`,
          "string.pattern.base": "Phone number is invalid.",
        }),
      password: Joi.string().required().min(8).label("Password").messages({
        "string.min": "Password must be at least 8 characters.",
        "string.empty": `Password is required.`,
      }),
      // password_confirmation: Joi.ref('password'),
      // password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
      password_confirmation: Joi.any()
        .valid(Joi.ref("password"))
        // .error(err => new Error('Password confirmation does not match.'))
        .required()
        // .options({ language: { any: { allowOnly: 'must match password' } } })
        .messages({
          "string.min": "Password confirmation must be at least 8 characters.",
          "any.required": `Password confirmation is required.`,
          "any.only": "Password confirmation does not match.",
        }),
      // .options({
      //   language: {
      //     any: {
      //       allowonly: '!!passwords do not match',
      //     }
      //   }
      // }),
    }).with("password", "password_confirmation");
  },
  computed: {
    ...mapGetters(["userInfo", "info", "token", "isLoggedIn"]),
    ...mapState({
      form: (state) => state.signupForm,
    }),
    isAccountTypeSelected() {
      return this.form.account_type !== "";
    },
  },
  created() {
    // this.setSignupForm();
    console.log("Register.vue created", this.form.phone);
    // console.log(this.form.account_type);
  },
  methods: {
    getFormattedPhone() {
      this.phone = this.form?.phone || "";

      console.log("Phone number: ", this.form.phone);
      // if(/^\+[1-9]\d{1,14}$/.test(this.form.phone)) {
      if (this.form?.phone !== "" && this.form?.phone !== null) {
        if (this.form.phone.startsWith("09")) {
          this.phone = `${this.form.phone.substring(1)}`;
        } else if (this.form.phone.startsWith("+630")) {
          this.phone = this.form.phone.substring(4);
        } else if (this.form.phone.startsWith("+63")) {
          this.phone = this.form.phone.substring(3);
        } else if (this.form.phone.startsWith("9")) {
          this.phone = this.form.phone;
        }

        this.form.phone = this.phone;
        console.log("[GET] Formatted Phone number: ", this.form.phone);
      }
      // }

      return this.phone;
    },
    onBlurPhone() {
      this.form.phone = this.getFormattedPhone();
    },
    handleBeforeInput(event) {
      const valueBeforeInput = event.target.value;

      event.target.addEventListener(
        "input",
        () => {
          if (event.target.value.length > 10) {
            event.target.value = valueBeforeInput;
            // this.errors.phone = [
            //   'The Phone number is invalid.',
            // ];
          } else this.errors.phone = [];
        },
        { once: true }
      );
    },
    submitAccountType() {
      if (this.form.account_type) {
        this.showRadioButtons = false;
      }
      this.errors = [];
      this.clearSignupForm();
    },
    ...mapActions([
      "signup",
      "resendCode",
      "verifyOTP",
      "phoneOTP",
      "validateInfo",
    ]),
    ...mapMutations(["setSignupForm", "clearSignupForm"]),
    setMessage(msg) {
      this.message = msg;
    },
    validate() {
      this.isDisabled = true;
      this.errors = [];
      this.isLoading = true;
      this.getFormattedPhone();
      console.log("Registration Form Data: ", this.form);

      const validation = this.schema
        .validateAsync(this.form, {
          abortEarly: false,
          allowUnknown: true,
        })
        .then(async (validated) => {
          this.isLoading = false;

          console.log("Valid Form data ", this.form);

          await this.validateInfo(this.form)
            .then((response) => {
              console.log("Validate Registration response: ", response);
              this.$nextTick(() => {
                // setTimeout(() =>
                // {
                this.isDisabled = false;
                // }, 3000)
              });

              const { status } = response;

              if (status === 200) {
                this.$router.push({
                  path: this.$route.path,
                  query: { status: true },
                });
              }
            })
            .catch((err) => {
              console.log("Validate Registration error: ", err);
              const {
                result: { errors },
              } = err;
              this.errors = errors || {};
            })
            .finally((o) => {
              this.isLoading = false;
            });
        })
        .catch((err) => {
          this.isLoading = false;

          err.details.forEach((error) => {
            this.errors[error.path[0]] = [error.message];
          });
        });
    },
    async submit() {
      this.isDisabled = true;
      this.isLoading = true;
      this.form.phone = this.formatPhone;

      console.log("Form: ", this.form);
      await this.signup(this.form)
        .then((response) => {
          console.log("Register response: ", response);
          this.$nextTick(() => {
            setTimeout(() => {
              this.isDisabled = false;
            }, 3000);
          });

          const {
            status: statusCode,
            data: { status, result },
          } = response;

          if (statusCode === 201) {
            // Send OTP
            // this.phoneOTP(result?.user_id);

            this.step = "";
            // setTimeout(() => this.countdown--, 100);

            this.$router.push({
              path: this.$route.path,
              query: { id: result?.user_id },
            });

            // this.$router.push("/");
            // this.$store.commit('setShowOnboardingMessage', true);

            // this.$router.push({ path: '/', query: { onboarding: true } });
            //window.location.href = '/accounts?modal=true';

            //this.$router.push("/login");
            // this.$vs.notification({
            //   color: 'success',
            //   position: 'top-right',
            //   title: 'Signup',
            //   text: `${data.message}`
            // })
          } else if (statusCode === 203) {
            this.errors = result?.errors || {};
            console.log(
              "Status with Error: ",
              response,
              "\nErrors: ",
              this.errors
            );
            this.isLoading = false;
          }
        })
        .catch((err) => {
          // this.$vs.notification({
          //   color: 'danger',
          //   position: 'top-right',
          //   title: 'Server Status',
          //   text: `${err.message}`
          // })
          console.log("Registration Error: ", err);
        });
    },
    resendCode() {
      if (!this.countdown_enabled) {
        this.countdown_enabled = true;
        // resend request
        this.resendCode(this.$route.query.id)
          .then((response) => {
            const { status } = response;
            console.log("Resend Code Response: ", response);
          })
          .catch((err) => {
            this.countdown_enabled = false;
            this.countdown = 180;
          });
      }
    },
    confirm() {
      this.verifyMessage = "";
      this.error = {};

      this.verifyOTP({ id: this.$route.query.id, code: this.verifyCode })
        .then((response) => {
          const {
            status: statusCode,
            data: { status, message, result },
          } = response;
          if (statusCode === 200 && status === 200) this.$router.push("/login");
          // if (statusCode === 200 && status === 200) this.$router.push("/");
          else if (statusCode === 203) {
            if (status === 422) {
              this.verifyMessage =
                "The provided OTP code is invalid. Please try again with the correct code.";
            } else if (status === 500) {
              // this.verifyMessage = 'Too Many Attempts.';
              this.verifyMessage = `You have already surpassed the limit for resending the OTP code to your number Please wait ${this.$filters.timer(
                this.rate_countdown
              )} minutes to re send a new OTP code`;
            }
          }
          console.log("Verify OTP Response: ", response);
        })
        .catch((err) => {});
    },
  },
  watch: {
    form: {
      handler(cur, prev) {},
      immediate: true,
    },
    phone(cur) {
      if (cur.length !== 10) {
        this.errors.phone = [
          // 'The Phone number is invalid.',
        ];
      }
    },
    step(value) {
      if (value === "") {
        this.rate_countdown_enabled = true;
      }
    },
    countdown_enabled(value) {
      if (value) {
        setTimeout(() => {
          this.countdown--;
        }, 1000);
      }
    },
    countdown: {
      handler(value) {
        if (value > 0 && this.countdown_enabled) {
          setTimeout(() => {
            this.countdown--;
          }, 1000);
        } else {
          this.countdown_enabled = false;
          this.countdown = 180;
        }
      },
      immediate: true,
    },
    rate_countdown_enabled(value) {
      if (value) {
        setTimeout(() => {
          this.rate_countdown--;
        }, 1000);
      }
    },
    rate_countdown: {
      handler(value) {
        if (value > 0 && this.countdown_enabled) {
          setTimeout(() => {
            this.rate_countdown--;
          }, 1000);
        } else {
          this.rate_countdown_enabled = false;
          this.rate_countdown = 600;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.form-group .text-danger {
  margin-top: -1rem !important;
  margin-bottom: 1rem !important;
  position: relative !important;
  top: 0rem !important;
}

.form-group .input-group {
  margin-bottom: 0rem !important;
  padding-bottom: 0rem !important;
}
</style>
