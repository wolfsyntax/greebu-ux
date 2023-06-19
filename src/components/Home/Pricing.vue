<template>
  <div>

    <section class="plans-and-pricing">
      <div class="container">
        <h2>Lorem ipsum dolor sit amet consectetur.</h2>
        <p class="sub-heading">Lorem ipsum dolor sit amet consectetur. Lorem tellus donec est id elit amet. Tristique et
          egestas lectus egestas.</p>
        <div class="row">
          <div class="content-left">
            <h3>Plans & Pricing</h3>
            <p>Lorem ipsum dolor sit amet consectetur. Commodo id pharetra ut risus consequat lectus nulla vel aliquam.
            </p>
          </div>
          <div class="content-right">
            <div class="m-4">
              <ul class="nav nav-tabs" id="myTab">
                <li class="nav-item">
                  <a href="#monthly-plan" class="nav-link active" data-bs-toggle="tab">Monthly</a>
                </li>
                <li class="nav-item">
                  <a href="#yearly-plan" class="nav-link" data-bs-toggle="tab">Yearly</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="tab-content">
            <div class="tab-pane fade show active" id="monthly-plan">
              <div class="col-4" v-for="price in pricing" :key="price.id">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">{{ price.cost_text }}</h3>
                    <h5>{{ price.name }}</h5>
                    <p class="card-text">{{ price.description }}</p>
                    <div class="features" v-for="inclusion in price.inclusions" :key="inclusion.id">
                      <p><i class="bi bi-check-lg"></i> {{ inclusion.inclusions }}</p>
                    </div>
                    <div class="button-wrapper fixed-bottom">
                      <a href="#" class="btn btn-primary btn-lg">Choose plan</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="yearly-plan">
              <div class="col-4" v-for="year in yearly">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">{{ year.price }}</h3>
                    <h5>{{ year.user }}</h5>
                    <p class="card-text">{{ year.content }}</p>
                    <div class="features" v-for="feature in year.features">
                      <p><i class="bi bi-check-lg"></i>{{ feature }}</p>
                    </div>
                    <div class="button-wrapper fixed-bottom">
                      <a href="#" class="btn btn-primary btn-lg">Choose plan</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div> <!-- end of tab-content -->
        </div> <!-- end of row -->

      </div>
    </section>

  </div>
</template>

<script>
// import { reactive } from 'vue';
// import { router } from '@inertiajs/vue3';
export default {
  data()
  {
    return {
      pricing: [
        {
          id: 1,
          price: 'Free',
          cost_text: 'Customer',
          description: 'Clients for Creating a Song can do a one time payment',
          inclusions: ['Create a Song with Artist', 'Look For an Artist']
        },
        {
          id: 2,
          price: '₱ 2,000',
          cost_text: 'Artist',
          description: 'Lorem ipsum dolor sit amet consectetur. Est egestas elit odio arcu at nibh nullam.',
          inclusions: ['Accept Booking', 'Create a song for client', 'Apply for Events', 'Look for Services']
        },
        {
          id: 3,
          price: '₱ 4,000',
          cost_text: 'Organizer',
          description: 'Lorem ipsum dolor sit amet consectetur. Est egestas elit odio arcu at nibh nullam.',
          inclusions: ['Create Event', 'Look for Artist', 'Look for Services']
        }
      ],
      yearly: [
        {
          price: 'Yearly',
          user: 'Customer',
          content: 'Clients for Creating a Song can do a one time payment',
          features: ['Create a Song with Artist', 'Look For an Artist']
        },
        {
          price: '₱ 2,000',
          user: 'Artist',
          content: 'Lorem ipsum dolor sit amet consectetur. Est egestas elit odio arcu at nibh nullam.',
          features: ['Accept Booking', 'Create a song for client', 'Apply for Events', 'Look for Services']
        },
        {
          price: '₱ 4,000',
          user: 'Artist',
          content: 'Lorem ipsum dolor sit amet consectetur. Est egestas elit odio arcu at nibh nullam.',
          features: ['Accept Booking', 'Create a song for client', 'Apply for Events', 'Look for Services']
        }
      ],

    }
  },
  props: {
    pricing: Object
  },
}
</script>
