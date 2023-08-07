<template>
    <div v-if="show">
      <!-- Modal -->
      <div class="modal fade" id="selectPlanModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" 
              @click="$emit('close')"></button>
            </div>
            <div class="modal-body text-center">
              <li v-for="plan in subscriptionPlans">{{ plan }}</li>
              <h2 class="title">Upgrade to Subscription</h2>
              <p class="description">With the upgraded artist subscription, you'll gain access to a wide range 
                of exclusive features designed to support your career and expand your reach.</p>
                <div class="select">
                  <div class="free">
                    <h3 class="type">FREE</h3>
                    <div class="d-flex justify-content-between group-item">
                    <h4><span class="peso">₱</span>0</h4> <p class="desc">Limited Access</p>
                   </div>
                   <p class="benefits"><span class="material-symbols-rounded">done</span>Request Custom songs to Artist</p>
                   <p class="benefits"><span class="material-symbols-rounded">done</span>Request custom song to be edited</p>
                   <p class="benefits"><span class="material-symbols-rounded">done</span>Book an Artist to an events </p>
                   <p class="benefits last"><span class="material-symbols-rounded">done</span>Listen to Artist Songs</p>
                   <div class="flex-item">
                    <button type="button" class="current-plan btn" data-bs-dismiss="modal">Get Started</button>
                   </div>
                  </div>
                  <div class="monthly">
                    <h3 class="type">Monthly</h3>
                    <div class="d-flex justify-content-between group-item">
                    <h4><span class="peso">₱</span>₱123/ m</h4> <p class="desc">Limited Access</p>
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
                    <h4><span class="peso">₱</span>₱123/ m</h4> <p class="desc">Limited Access</p>
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
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        show: Boolean,
    },
    data()
  {
    return {
      subscriptionPlans: [
        { id: 1, name: 'Basic', price: '$9.99' },
        { id: 2, name: 'Pro', price: '$19.99' },
        { id: 3, name: 'Premium', price: '$29.99' },
      ],
    }
  },
    methods: {
      // closeModal() {
      //   this.$emit('close');
      // },
      selectedPlan(){
      window.location.href = '/subscription';
    },
    },
  };
  </script>
  
  <style>
  /* Styles for your modal */
  </style>
  