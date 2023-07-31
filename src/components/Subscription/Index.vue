<template>
  <div class="container">
    <div class="row">
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
    </div>

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

    <section>
      <div class="container">
        <div class="row">
          <dv class="col-12 col-md-8">
            <div class="container">
              <div class="row my-2">
                <div class="col">
                  <div class="form-group">
                    <label for="password">First Name</label>
                    <input id="password" type="password" class="form-control" name="password"
                      required autocomplete="new-password">
                    <div v-if="errors?.password">{{ errors.password }}</div>
                  </div>
                </div>

                <div class="col">
                  <div class="form-group">
                    <label for="password">Last Name</label>
                    <input id="password" type="password" class="form-control" name="password"
                      required autocomplete="new-password">
                    <div v-if="errors?.password">{{ errors.password }}</div>
                  </div>
                </div>
              </div>

              <div class="row my-2">
                <div class="col">
                  <div class="form-group">
                    <label for="password">Email</label>
                    <input id="password" type="password" class="form-control" name="password"
                      required autocomplete="new-password">
                    <div v-if="errors?.password">{{ errors.password }}</div>
                  </div>
                </div>
              </div>

              <div class="row my-2">
                <div class="col">
                  <div class="form-group">
                    <label for="password">Phone</label>
                    <select>
                      <option :value="country.id" v-for="country in phoneCode" :key="country.id">{{  country.label }}</option>
                    </select>
                    <input id="password" type="password" class="form-control" name="password"
                      required autocomplete="new-password">
                    <div v-if="errors?.password">{{ errors.password }}</div>
                  </div>
                </div>
              </div>

              <div class="row my-2">
                <div class="col">
                  <label>Address</label>
                  <div class="row form-group">
                    <div class="col">
                      <div class="form-group">
                        <input id="password" type="password" class="form-control" name="password"
                          required placeholder="Street">
                        <div v-if="errors?.password">{{ errors.password }}</div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <input id="password" type="password" class="form-control" name="password"
                          required placeholder="City">
                        <div v-if="errors?.password">{{ errors.password }}</div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <input id="password" type="password" class="form-control" name="password"
                          required placeholder="Province">
                        <div v-if="errors?.password">{{ errors.password }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row my-2">
                <div class="col">
                  <div class="form-group">
                    <label for="password">Country</label>
                    <select class="form-select">
                      <option :value="country.id" v-for="country in countryList" :key="country.id">{{  country.code }}</option>
                    </select>
                    <div v-if="errors?.password">{{ errors.password }}</div>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="password">Postal Code</label>
                    <input id="password" type="password" class="form-control" name="password"
                      required autocomplete="new-password">
                    <div v-if="errors?.password">{{ errors.password }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="form-check form-control px-5 my-2" >
                    <input class="form-check-input" type="radio" name="accountType" id="accountType" v-model="form.payment_type" value="card" >
                    <label class="form-check-label" for="accountType">
                      <h5>Credit/Debit Cards</h5>
                      <span class="text-muted">
                        Pay with your Credit / Debit Card
                      </span>
                    </label>
                    <div class="container" v-if="form.payment_type === 'card'">
                      <div class="row">
                        <div class="col">
                          <div class="form-group">
                            <input id="password" type="password" class="form-control" name="password"
                              required placeholder="Card number">
                            <div v-if="errors?.password">{{ errors.password }}</div>
                          </div>
                        </div>
                      </div>

                      <div class="row my-2">
                        <div class="col">
                          <div class="form-group">
                            <input id="password" type="password" class="form-control" name="password"
                              required placeholder="MM/DD">
                            <div v-if="errors?.password">{{ errors.password }}</div>
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group">
                            <input id="password" type="password" class="form-control" name="password"
                              required placeholder="CVV">
                            <div v-if="errors?.password">{{ errors.password }}</div>
                          </div>
                        </div>
                      </div>

                      <div class="row my-2">
                        <div class="col">
                          <div class="form-group">
                            <input id="password" type="password" class="form-control" name="password"
                              required placeholder="Name of Card holder">
                            <div v-if="errors?.password">{{ errors.password }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="row">
                <div class="col">
                    <div class="form-check form-control px-5 my-2" >
                      <input class="form-check-input" type="radio" name="paymentType" id="paymentGCash" v-model="form.payment_type" value="gcash" >
                      <label class="form-check-label" for="paymentGCash">
                        <h5>GCash</h5>
                        <span class="text-muted">
                          Pay with your GCash Acccount
                        </span>
                      </label>
                    </div>                  
                </div>
              </div>
            </div>
          </dv>
          
          <dv class="col-12 col-md-4">
            Sub Total
          </dv>
        </div>

        <div class="row mt-3">
          <dv class="col">

          </dv>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Pricing from '@/components/Home/Pricing.vue';
export default {
  components: {
    //pricing: Pricing,
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

    }
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