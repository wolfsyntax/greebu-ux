<template>
  <BlankHeader />

    <!-- <div class="row">
      <div class="col">
        {{ form }}
        <div class="row row-checkbox container px-5">
          <div class="col-md-12 text-center">
            <h3>Select your Account Type</h3>
            <p>Please choose your Account Type to create an account.</p>
          </div>

          <div class="col-md-12">
            <div class="form-check form-control px-5 my-2" :hidden="$store.state.role === 'customers'">
              <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="customers" :checked="$store.state.role !== 'customers'">
              <label class="form-check-label" for="accountType">
              I want to create a song
              </label>
            </div>

            <div class="form-check form-control px-5 my-2" :hidden="$store.state.role === 'artists'">
              <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="artists" >
              <label class="form-check-label" for="accountType">
              I'm an Artist
              </label>
            </div>

            <div class="form-check form-control px-5 my-2" :hidden="$store.state.role === 'organizer'">
              <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="organizer" >
              <label class="form-check-label" for="accountType">
              I'm an Organizer
              </label>
            </div>

            <div class="form-check form-control px-5 my-2" :hidden="$store.state.role === 'service-provider'">
              <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.account_type" value="service-provider" >
              <label class="form-check-label" for="accountType">
              Offers Services
              </label>
            </div>
            
            <div v-if="errors?.account_type">{{ errors.account_type[0] }}</div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="row">
      <div class="col">
        <section class="plans-and-pricing">
          <div class="container">
            <h2>Lorem ipsum dolor sit amet consectetur.</h2>
            <p class="sub-heading">Lorem ipsum dolor sit amet consectetur. Lorem tellus donec est id elit amet. Tristique et egestas lectus egestas.</p>
            <div class="row">
              <div class="col-4 d-flex align-items-stretch" v-for="price in pricing" :key="price.id">
                  <div class="card">
                    <div class="card-body text-center">
                      <h3 class="card-title">{{ price.name }}</h3>
                      <p class="description">{{ price.description }}</p>
                      <h5 class="price"><span class="peso">₱</span>{{ price.cost_value }}<span class="month">/month</span></h5>
                      <a href="#" class="btn btn-primary btn-lg">Get Started <i class="bi bi-arrow-right"></i></a>
                      <li v-for="inclusion in price.inclusions" :key="inclusion.id">
                      <i class="bi bi-check-circle-fill"></i> {{ inclusion.inclusions }}
                      </li>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>
      </div>
    </div> -->

    <section class="subscription">
      <div class="container" v-if="step === 1">
        <div class="back">
          <!-- <button type="button" class="btn show-subscription-modal" @click="openSubscriptionModal"
              data-bs-toggle="modal" data-bs-target="#selectPlanModal"><span class="material-symbols-outlined arrow-back">&#xe5c4;</span></button> -->
              <a href="/account/setting">
                <span class="material-symbols-outlined arrow-back">&#xe5c4;</span>
              </a>
              <h2 class="main-title">Subscription</h2>
        </div>
        <div class="row">
          <div class="col-12 col-md-7">
            <div class="billing-information">
              <h4 class="title">Billing information</h4>
              <p class="sub-title">Lorem ipsum dolor sit amet consectetur. Viverra mus a placerat eget nibh leo phasellus tristique elementum.</p>
              <h4 class="step"><span class="one">1</span> Contact Details</h4>
              <div class="row ">
                <div class="col">
                  <div class="form-group">
                    <label for="name">First Name</label>
                    <input id="name" type="name" class="form-control" name="name"
                      required autocomplete="first-name">
                    <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                  </div>
                </div>

                <div class="col">
                  <div class="form-group">
                    <label for="name">Last Name</label>
                    <input id="name" type="name" class="form-control" name="name"
                      required autocomplete="last-name">
                    <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                  </div>
                </div>
              </div>

              <div class="row ">
                <div class="col">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" class="form-control" name="email"
                      required autocomplete="first-name">
                    <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="phone">
                    <div class="form-group phone-dropdown">
                    <label for="phone">Phone</label>
                    <select class="form-select" aria-label="Default select example">
                    <option selected>+63</option>
                    <option value="1">+64</option>
                    <option value="2">+65</option>
                    <option value="3">+66</option>
                    <!-- <option :value="country.id" v-for="country in phoneCode" :key="country.id">{{  country.label }}</option> -->
                  </select>
                  </div>
                  <div class="form-group phone-field">
                    <label for="phone"></label>
                    <input id="phone" type="text" class="form-control" name="phone"
                      required autocomplete="phone">
                    <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                  </div>
                  </div>
                </div>
              </div>

              <div class="row ">
                <div class="col">
                  <label>Address</label>
                  <div class="row address">
                    <div class="col">
                      <div class="form-group">
                        <input id="street" type="text" class="form-control" name="street"
                          required placeholder="Street">
                        <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <input id="city" type="text" class="form-control" name="city"
                          required placeholder="City">
                        <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <input id="province" type="text" class="form-control" name="province"
                          required placeholder="Province">
                        <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row country-postal-code">
                <div class="col">
                  <div class="form-group">
                    <label for="country">Country</label>
                    <select class="form-select" aria-label="Default select example">
                    <option selected>Philippines</option>
                    <option value="1">China</option>
                    <option value="1">Nigeria</option>
                      <!-- <option :value="country.id" v-for="country in countryList" :key="country.id">{{  country.code }}</option> -->
                    </select>
                    <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="postal">Postal Code</label>
                    <input id="postal" type="text" class="form-control" name="postal"
                      required autocomplete="postal">
                    <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                  </div>
                </div>
              </div>
              <h4 class="step"><span class="one">2</span> Payment Method</h4>
           

              <div class="row">
                <div class="col">
                  <div class="form-check form-control card-wrapper">
                    <div class="d-flex justify-content-between group-item">
                      <div class="choose-card">
                        <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.payment_type" value="card" >
                        <label class="form-check-label" for="accountType">
                          <h5>Credit/Debit Cards</h5>
                          <span class="text-muted">
                            Pay with your Credit / Debit Card
                          </span>
                        </label>
                      </div>
                      <div class="card-icons">
                        <img src="/assets/subscription/card-icons.svg" alt="Card icons">
                      </div>
                   </div>

                   <div class="card-details" v-if="form.payment_type === 'card'">
                      <!-- <div class="container" v-if="form.payment_type === 'card'"> -->
                        <div class="row">
                        <div class="col">
                          <div class="form-group">
                            <input id="card-number" type="text" class="form-control" name="card-number"
                              required placeholder="Card number">
                            <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.74 16.8214H10.24C9.826 16.8214 9.49 16.4865 9.49 16.074C9.49 15.6614 9.826 15.3266 10.24 15.3266H15.74C16.154 15.3266 16.49 15.6614 16.49 16.074C16.49 16.4865 16.154 16.8214 15.74 16.8214ZM8.5 9.53566C8.5 9.8117 8.275 10.0339 8 10.0339H4C3.723 10.0339 3.5 9.8117 3.5 9.53566V7.04431C3.5 6.77026 3.723 6.54604 4 6.54604H8C8.275 6.54604 8.5 6.77026 8.5 7.04431V9.53566ZM7.24 16.8214H4.24C3.826 16.8214 3.49 16.4865 3.49 16.074C3.49 15.6614 3.826 15.3266 4.24 15.3266H7.24C7.654 15.3266 7.99 15.6614 7.99 16.074C7.99 16.4865 7.654 16.8214 7.24 16.8214ZM21.5 4.05469H2.5C1.672 4.05469 1 4.72436 1 5.5495V18.5045C1 19.3306 1.672 19.9993 2.5 19.9993H21.5C22.329 19.9993 23 19.3306 23 18.5045V5.5495C23 4.72436 22.329 4.05469 21.5 4.05469Z" fill="#B8BBCF"/>
                          </svg>
                          </div>
                        </div>
                      </div>

                      <div class="row ">
                        <div class="col">
                          <div class="form-group">
                            <input id="exp" type="text" class="form-control" name="exp"
                              required placeholder="MM/DD">
                            <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7 2C6.44772 2 6 2.44772 6 3V4H5C3.89543 4 3 4.89543 3 6V8H21V6C21 4.89543 20.1046 4 19 4H18V3C18 2.44772 17.5523 2 17 2H16C15.4477 2 15 2.44772 15 3V4H9V3C9 2.44772 8.55228 2 8 2H7Z" fill="#B8BBCF"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 10H3V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10ZM6 13C6 12.4477 6.44772 12 7 12H9C9.55228 12 10 12.4477 10 13V14C10 14.5523 9.55228 15 9 15H7C6.44772 15 6 14.5523 6 14V13Z" fill="#B8BBCF"/>
                          </svg>
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group">
                            <input id="cvv" type="text" class="form-control" name="cvv"
                              required placeholder="CVV">
                            <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.37477 7.93128C8.37477 5.93447 10.0005 4.31042 11.9996 4.31042C13.9987 4.31042 15.6244 5.93447 15.6244 7.93128V9.73176H8.37477V7.93128ZM18.343 9.73176H17.4368V7.93129C17.4368 4.93652 14.9982 2.5 11.9996 2.5C9.00096 2.5 6.56238 4.93652 6.56238 7.93129V9.73176H5.65618C4.90584 9.73176 4.29688 10.3398 4.29688 11.0898V20.142C4.29688 20.892 4.90584 21.5 5.65618 21.5H18.343C19.0933 21.5 19.7023 20.892 19.7023 20.142V11.0898C19.7023 10.3398 19.0933 9.73176 18.343 9.73176ZM12.9058 15.8172V17.8791C12.9058 18.3786 12.4998 18.7839 11.9996 18.7839C11.4984 18.7839 11.0934 18.3786 11.0934 17.8791V15.8172C10.5533 15.5041 10.1872 14.9269 10.1872 14.2583C10.1872 13.2585 10.9982 12.4479 11.9996 12.4479C13 12.4479 13.812 13.2585 13.812 14.2583C13.812 14.9269 13.445 15.5041 12.9058 15.8172Z" fill="#B8BBCF"/>
                          </svg>
                          </div>
                        </div>
                      </div>

                      <div class="row ">
                        <div class="col">
                          <div class="form-group">
                            <input id="card-holder" type="text" class="form-control" name="card-holder"
                              required placeholder="Name of Card Holder">
                            <!-- <div v-if="errors?.password">{{ errors.password }}</div> -->
                          </div>
                        </div>
                      </div>
                   </div>
          
                  </div>
                </div>
              </div>
              
              <div class="row">
                <div class="col">
                    <div class="form-check form-control gcash-wrapper">
                      <div class="d-flex justify-content-between group-item">
                      <div class="choose-card">
                        <input class="form-check-input" type="radio" name="paymentType" id="paymentGCash" v-model="form.payment_type" value="gcash" >
                      <label class="form-check-label" for="paymentGCash">
                        <h5>GCash</h5>
                        <span class="text-muted">
                          Pay with your GCash Acccount
                        </span>
                      </label>
                      </div>
                      <div class="card-icons">
                        <img src="/assets/subscription/gcash-logo.webp" alt="GCash logo">
                      </div>
                   </div>
                   <div class="gcash-content" v-if="form.payment_type === 'gcash'">
                    <p class="description">You will be redirected to GCash after checkout. After you've performed the payment, you will be redirected back to the website.</p>
                   <a href="#" class="link-gcash">Add your Gcash Account </a>
                   </div>
                    </div>                  
                </div>
              </div>
            </div> <!-- end of billing-information -->
              
          </div> 
          
          <dv class="col-12 col-md-5">
           <div class="your-plan">
            <h4 class="title">Your Plan</h4>
            <p class="sub-title">Lorem ipsum dolor sit amet consectetur. Viverra mus a placerat eget nibh leo phasellus tristique elementum.</p>
            <div class="d-flex justify-content-between group-item">
              <h4 class="subsciption-selected">Monthly Subscription</h4>
              <p class="cost">₱123/month</p>
            </div>
            <div class="d-flex justify-content-between group-item-total">
              <p class="total">Total due</p>
              <h4 class="amount">₱ 3,000.00</h4>
            </div>
            <div class="button-wrapper">
              <button type="button" class="btn" @click="paymentMade()">Start Subscription</button>
            </div>
           </div>
          </dv>
        </div> <!-- end of row -->

        <!-- <div class="row mt-3">
          <dv class="col">

          </dv>
        </div> -->
      </div>  <!-- end of container-->
      <div class="container" v-if="step === 2">

            <div class="payment-made">
              <div class="text-center thank-you">
                <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                <path d="M23 30L28 35L38 25M53 30C53 42.4264 42.9264 52.5 30.5 52.5C18.0736 52.5 8 42.4264 8 30C8 17.5736 18.0736 7.5 30.5 7.5C42.9264 7.5 53 17.5736 53 30Z" stroke="#FF6B00" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
                <h2 class="title">Thank you for subscribing!</h2>
                <p class="sub-title">Your payment for subscription has been successfully done</p>
              </div>

              <div class="total-payment">
                <div class="text-center total">
                  <h4>Total payment</h4>
                   <h2>₱ 3,000.00</h2>
                   <svg xmlns="http://www.w3.org/2000/svg" width="719" height="2" viewBox="0 0 719 2" fill="none">
                    <path d="M0 1L719 0.999937" stroke="#8690A2" stroke-dasharray="14 14"/>
                  </svg>
                </div>

                <div class="d-flex justify-content-between group-item">
                  <div class="artist">
                    <div>
                      <img src="/assets/subscription/artist-profile.webp" alt="artist profile">
                    </div>
                    <div>
                      <h4>Idlepitch</h4>
                      <p>Idlepitch@gmail.com</p>
                    </div>
                  </div>

                  <div class="contact">
                   <p>+639123454122</p>
                   <p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
                   <p>4400</p>
                  </div>

                </div>

                <div class="d-flex justify-content-between type">
                  <div class="date">
                    <div><h5>Type of Subscription</h5></div>
                    <div><p>Monthly</p></div>
                  </div>
                  <div class="payment">
                    <div><h5>Type of Account</h5></div>
                    <div><p>Artist Account</p></div>
                  </div>
                </div>
                <div class="d-flex justify-content-between type">
                  <div class="date">
                    <div><h5>Date of Payment</h5></div>
                    <div><p>July 11,2023</p></div>
                  </div>
                  <div class="payment">
                    <div><h5>Source of payment</h5></div>
                    <div><p>Gcash</p></div>
                  </div>
                </div>
                <div class="d-flex justify-content-between type">
                  <div class="date">
                    <div><h5>Next Bill Date</h5></div>
                    <div><p>August 11,2023</p></div>
                  </div>
                  <div class="payment">
                  </div>
                </div>
          
              </div> <!-- edn of total-payment card/receipt -->

              <div class="button-wrapper">
                    <button type="button" class="btn btn-primary download">
                      <span class="material-symbols-rounded">download</span>Download</button>
                    <button type="button" class="btn btn-primary done" @click="createProfile()">Complete your profile</button>
                </div>


             </div>
       
      </div>
    </section>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
// import Layout from '/src/components/Layouts/Layout.vue';
import BlankHeader from "@/components/Home/BlankHeader.vue";

export default {
  components: {
    BlankHeader
  },
  data()
  {
    return {
      form: {
        payment_type: 'card',
        card_number: null,
        exp_month: null,
        exp_year: null,
        cvv: null,
        street_address: null,
        city: null,
        state: null,
        country: null,
        zipcode: null,
        name: null,
        email: null,
        phone: null,
        plan: null,
        account_type: null,
      },
      step: 'account_type',
      step: 1,
      errors: {},
      pricing: [
        {
          id: 1,
          price: '0',
          cost_text: 'Free',
          description: 'Lorem ipsum dolor sit consectetur.',
          inclusions: ['Create a Song with an Artist', 'Look For an Artist', 'Can view events']
        },
        {
          id: 2,
          price: '123',
          cost_text: 'Monthly',
          description: 'Lorem ipsum dolor sit consectetur.',
          inclusions: ['Accept Bookings', 'Create a song for clients', 'Apply for Events', 'Look for Services']
        },
        {
          id: 3,
          price: '123',
          cost_text: 'Yearly',
          description: 'Lorem ipsum dolor sit consectetur.',
          inclusions: ['Accept Bookings', 'Create a song for clients', 'Apply for Events', 'Look for Services']
        }
      ],
    }
  },
  setup()
  {

  },
  props: {

  },
  methods: {
    ...mapActions([
      'plansOptions', 'fetchCountry',
    ]),
    submit()
    {

    },
    paymentMade(){
      this.step = 2;
    },
    createProfile(){
      window.location.href = '/artist/profile';
    },
  },
  mounted()
  {
    this.fetchCountry()
    this.plansOptions().then(response =>
    {
      const { result, message, status } = response;

      this.pricing = result?.plans || [];
    })
  },
  computed: {
    ...mapState({
      countries: (state) => state.countries, 
    }),
    ...mapGetters(["countryList", "phoneCode"]),
  }
}
</script>
<style scoped></style>