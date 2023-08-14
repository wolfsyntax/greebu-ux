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
    <div class="container-fluid">
        <div class="container">
        <h2>Access Exclusive Benefits through Our <br>Artist Subscription:</h2>
        <p class="sub-heading">Discover Unique Perks and Content</p>

    <div class="w-100 d-flex align-items-center subscription-wrapper">
        <div class="benefits">
            <div class="d-flex justify-content-between group-item-title">
                <div class="date-hide">
                    <h3 class="date-title">DATE</h3>
                </div>
                <div class="d-flex d-flex justify-content-between date">
                    <h4>MONTHLY</h4>
                    <h4>YEARLY</h4>
                </div>
            </div>

            <div class="d-flex justify-content-between group-item">
                <div class="list"><h3>Accept Bookings</h3></div>
                <div class="d-flex d-flex justify-content-between check">
                    <span class="material-symbols-rounded">check</span> <span class="material-symbols-rounded">check</span>
                </div>
            </div>
            <div class="d-flex justify-content-between group-item">
                <div class="list"><h3>Create a custom song</h3></div>
                <div class="d-flex d-flex justify-content-between check">
                    <span class="material-symbols-rounded">check</span> <span class="material-symbols-rounded">check</span>
                </div>
            </div>
            <div class="d-flex justify-content-between group-item">
                <div class="list"><h3>Apply for Events</h3></div>
                <div class="d-flex d-flex justify-content-between check">
                    <span class="material-symbols-rounded">check</span> <span class="material-symbols-rounded">check</span>
                </div>
            </div>
            <div class="d-flex justify-content-between group-item">
                <div class="list"><h3>Accept Bookings</h3></div>
                <div class="d-flex d-flex justify-content-between check">
                    <span class="material-symbols-rounded">check</span> <span class="material-symbols-rounded">check</span>
                </div>
            </div>
            <div class="d-flex justify-content-between group-item">
                <div class="list"><h3>Create a custom Songs</h3></div>
                <div class="d-flex d-flex justify-content-between check">
                    <span class="material-symbols-rounded">check</span> <span class="material-symbols-rounded">check</span>
                </div>
            </div>
            <div class="d-flex justify-content-between group-item">
                <div class="list"><h3>Apply for Events</h3></div>
                <div class="d-flex d-flex justify-content-between check">
                    <span class="material-symbols-rounded">check</span> <span class="material-symbols-rounded">check</span>
                </div>
            </div>
        </div>

        <div class="subscription">
            <div class="yearly-subscription">
            <div class="d-flex justify-content-between yearly">
                <div>
                    <h3>YEARLY unlimited access subscription</h3>
                    <div class="d-flex align-tems-center cost">
                        <h4><span>₱</span>123/ yr</h4>
                        <h5>Save 30%</h5>
                    </div>
                    <p>Per month, billed each year (123)</p>
                </div>
                <div>
                    <div v-if="isLoggedIn">
                        <a href="/subscription">Get Started</a>
                    </div>
                    <div v-else>
                        <a href="#"
                    @click="openModal" 
                    data-bs-toggle="modal" data-bs-target="#mustSignUp"> 
                        Get Started</a>
                    </div>

                </div>
            </div>
        </div>   
        <div class="monthly-subscription">
            <div class="d-flex justify-content-between monthly">
                <div>
                    <h3>Monthly unlimited access subscription</h3>
                    <div class="d-flex align-tems-center cost">
                        <h4><span>₱</span>123/ m</h4>
                    </div>
                    <p>Per month, billed each year (123)</p>
                </div>
                <div>
                    <div v-if="isLoggedIn">
                        <a href="/subscription">Get Started</a>
                    </div>
                    <div v-else>
                        <a href="#"
                    @click="openModal" 
                    data-bs-toggle="modal" data-bs-target="#mustSignUp"> 
                        Get Started</a>

                    </div>
                </div>
            </div>
        </div>
        </div>
    </div> <!-- end of subscription-wrapper -->
    </div> <!-- end of container -->
    </div>
  </section>

  <MustSignupModal />
</template>

<script>
// import { reactive } from 'vue';
// import { router } from '@inertiajs/vue3';

import { mapGetters } from "vuex";
import MustSignupModal from '/src/components/Artist/MustSignupModal.vue';

export default {
  components: {
    MustSignupModal
  },
data() {
  return {
  }
},
computed: {
    ...mapGetters(["isLoggedIn"]),
  },
// props: {
//         pricing: Object
//     },
methods: {
    openModal(data){
        this.$root.$emit("bv::show::modal", "#mustSignUp");
      },
    }
}
</script>

<style scoped>
</style>
