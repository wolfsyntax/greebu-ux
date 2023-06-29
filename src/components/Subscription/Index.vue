<template>
  <div>

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
      'plansOptions',
    ]),
    submit()
    {

    }
  },
  mounted()
  {
    this.plansOptions().then(response =>
    {
      const { result, message, status } = response;

      console.log('Plan Option subscription: ', response)
      this.pricing = result?.plans || [];
    })
  },
  computed: {
    ...mapState({

    }),
  }
}
</script>
<style scoped></style>