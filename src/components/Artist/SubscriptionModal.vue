<template>
    <div>

<div v-if="!isLoggedIn"></div>
    <div  v-else>
      <div class="" v-if="userRole === 'artists'">
      <!-- Modal -->
      <div class="modal" id="selectPlanModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" 
      data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="createProfile()"></button> -->
              <button type="button" class="btn-close" @click="createProfile()"></button>
            </div>
            <div class="modal-body text-center">
              <h2 class="title">Upgrade to Subscription</h2>
              <p class="description">With the upgraded artist subscription, you'll gain access to a wide range 
                of exclusive features designed to support your career and expand your reach.</p>
                <div class="select">
                  <div class="free">
                    <h3 class="type">FREE</h3>
                    <div class="d-flex justify-content-between group-item">
                    <h4><span class="peso">₱</span>0</h4> <p class="desc">15 days free trial</p>
                   </div>
                   <p class="benefits"><span class="material-symbols-rounded">done</span>Accept Bookings</p>
                   <p class="benefits"><span class="material-symbols-rounded">done</span>Create a custom Songs</p>
                   <p class="benefits"><span class="material-symbols-rounded">done</span>Apply for Events</p>
                   <p class="benefits"><span class="material-symbols-rounded">done</span>Accept Bookings</p>
                   <p class="benefits"><span class="material-symbols-rounded">done</span>Create a custom Songs</p>
                   <p class="benefits last"><span class="material-symbols-rounded">done</span>Apply for Events</p>
                   <div class="flex-item">
                    <button type="button" class="current-plan btn" data-bs-dismiss="modal" disabled>Current Plan</button>
                   </div>
                  </div>
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
                </div> <!-- end of select -->

                <button type="button" class="btn create-profile" @click="createProfile()">Create your Profile</button>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div> <!-- end of v-else -->


    </div>
  </template>
  
  <script>
  import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

  export default {
    props: {
      
    },
    data() {
          return {
            
         }
    },      
    computed: {
    ...mapGetters(["isLoggedIn", 'userInfo', 'info', 'userRole']),
    ...mapState({}),
  },
    methods: {
    selectedPlan(){
      window.location.href = '/subscription';
    },
    createProfile(){
      // window.location.href = '/artist/profile';
      window.location.href = '/account/profile';
      // this.$router.push('/account/profile');
    },
      
    },
  };
  </script>
  
  <style>
  /* Styles for your modal */
  </style>
  