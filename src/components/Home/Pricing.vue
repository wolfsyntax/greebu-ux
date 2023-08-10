<template>


  <!-- <section class="plans-and-pricing">
      <div class="container">
          <h2>Lorem ipsum dolor sit amet consectetur.</h2>
          <p class="sub-heading">Lorem ipsum dolor sit amet consectetur. Lorem tellus donec est id elit amet. Tristique et egestas lectus egestas.</p>
          <div class="row">
              <div class="col-4 d-flex align-items-stretch" v-for="price in pricing" :key="price.id">
                  <div class="card">
                      <div class="card-body text-center">
                          <h3 class="card-title">{{ price.cost_text }}</h3>
                          <p class="description">{{ price.description }}</p>
                          <h5 class="price"><span class="peso">₱</span>{{ price.price}}<span class="month">/month</span></h5>
                          <a href="#" class="btn btn-primary btn-lg">Get Started <i class="bi bi-arrow-right"></i></a>
                          <li v-for="inclusion in price.inclusions" :key="inclusion.id">
                          <i class="bi bi-check-circle-fill"></i> {{  inclusion }}
                          </li>
                      </div>
                  </div>
              </div>
          </div>
     </div>
  </section> -->

  <section class="artist-subscription">
    <div class="container">
        <h2>Access Exclusive Benefits through Our <br>Artist Subscription:</h2>
        <p class="sub-heading">Discover Unique Perks and Content</p>

        <!-- <div class="select">

            <div class="monthly">
            <h3 class="type">Monthly</h3>
            <div class="d-flex justify-content-between group-item">
            <h4><span class="peso">₱</span>123/m</h4> <p class="desc">Limited Access</p>
            </div>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Accept Bookings</p>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Create a custom Songs</p>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Apply for Events</p>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Accept Bookings</p>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Create a custom Songs</p>
            <p class="benefits last"><span class="material-symbols-rounded">done</span>Apply for Events</p>
            <div class="flex-item">
            <button type="button" class="monthly-plan btn" @click="selectedPlan()">Get Started</button>
            </div>
            </div>

            <div class="yearly">
            <div class="d-flex justify-content-between">
            <h3 class="type">YEARLY</h3> <button type="button" class="save">Save 30%</button>
            </div>
            <div class="d-flex justify-content-between group-item">
            <h4><span class="peso">₱</span>123/m</h4> <p class="desc">Limited Access</p>
            </div>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Accept Bookings</p>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Create a custom Songs</p>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Apply for Events</p>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Accept Bookings</p>
            <p class="benefits"><span class="material-symbols-rounded">done</span>Create a custom Songs</p>
            <p class="benefits last"><span class="material-symbols-rounded">done</span>Apply for Events</p>
            <div class="flex-item">
            <button type="button" class="yearly-plan btn" @click="selectedPlan()">Get Started</button>
            </div>
            </div>
        </div>  -->


    </div>
  </section>


</template>

<script>
// import { reactive } from 'vue';
// import { router } from '@inertiajs/vue3';
export default {
data() {
  return {
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
// props: {
//         pricing: Object
//     },
}
</script>

<style scoped>
</style>
