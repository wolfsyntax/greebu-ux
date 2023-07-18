<template>
    <layout>
    <div>
        <section class="order-summary">
          <div class="container">
            <div class="row">
              <div class="col-md-6 offset-md-3">
                <div class="card">  
                <div class="card-body">
                    <div class="back-to-delivery">
                        <a href="/deliveryform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6.2002 14.2L0.350195 8.35C0.29464 8.29445 0.255751 8.23889 0.233529 8.18333C0.211306 8.12778 0.200195 8.06667 0.200195 8C0.200195 7.93333 0.211306 7.87222 0.233529 7.81667C0.255751 7.76111 0.29464 7.70556 0.350195 7.65L6.2002 1.8C6.32242 1.67778 6.47797 1.61667 6.66686 1.61667C6.85575 1.61667 7.01131 1.67778 7.13353 1.8C7.26686 1.93334 7.33353 2.09167 7.33353 2.275C7.33353 2.45834 7.26686 2.61667 7.13353 2.75L1.88353 8L7.13353 13.25C7.26686 13.3833 7.33075 13.5417 7.3252 13.725C7.31964 13.9083 7.25575 14.0611 7.13353 14.1833C7.0002 14.3167 6.84186 14.3833 6.65853 14.3833C6.4752 14.3833 6.32242 14.3222 6.2002 14.2Z" fill="#454F59"/>
                            </svg>
                         Back
                        </a> 
                    </div>
                    <h2 class="card-title">Order Summary</h2>
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur.</p>
                    <div class="order-details">
                        <h3 class="title">Order Details</h3>
                        <div class="d-flex justify-content-between group-item">
                            <div>
                                <h4>Genre</h4><p>Country Accoustic/Folk</p>
                            </div>
                            <div class="right">
                                <h4>Lenght</h4><p>Three Minutes</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between group-item">
                            <div>
                                <h4>Artist</h4><p>Random Artist</p>
                            </div>
                            <div class="right">
                                <h4>Mood</h4><p>Happy</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between group-item last-item">
                            <div>
                                <h4>Delivery date</h4><p>May 25, 2023</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center personalized-song">
                        <div class="song-wrapper">
                            <img src="/assets/create-song/vinyl-record.svg">
                            <div>
                            <h4>Personalized song</h4><p>Personalized song</p>
                            </div>
                        </div>
                        <div class="right">
                            <h4>₱ 3,000.00</h4>
                        </div>
                    </div>

                    <form @submit.prevent="submit">
                    <div class="form-group">
                        <label for="discount">Gift Card / Discount code</label>
                        <div class="discount-coupon">
                        <div class="left">
                            <input id="text" type="text" class="form-control" name="discount">
                        </div>
                        <div class="right">
                            <button class="btn apply">Apply</button>
                        </div>
                        </div>
                     
                    </div>
                    <div class="d-flex justify-content-between sum">
                      <div><h4>Dicount</h4></div>
                      <div><p>-</p></div>
                    </div>
                    <div class="d-flex justify-content-between sum">
                      <div><h4>Subtotal</h4></div>
                      <div><p>₱ 3,000.00</p></div>
                    </div>
                    <div class="d-flex justify-content-between sum">
                      <div><h4>Transaction Fee</h4></div>
                      <div><p>₱ 100.00</p></div>
                    </div>
                    <div class="d-flex justify-content-between sum last">
                      <div><h4>Sales tax</h4></div>
                      <div><p>₱ 0.00</p></div>
                    </div>

                    <div class="d-flex justify-content-between total">
                      <div><h4>Total due</h4></div>
                      <div><p>₱ 3,100.00</p></div>
                    </div>
                
                    <div class="button-wrapper">
                        <button type="button" class="btn btn-primary back" @click="backRequest">Back</button>
                        <button type="button" class="btn btn-primary next" @click="submitRequest">Submit Request</button>
                    </div>
                </form>


                </div>
            </div>
          </div>
        </div>
        </div>
        </section>
    </div>

    </layout>
  </template>
  <script>
  import Layout from '/src/components/Layouts/Layout.vue';
  
  export default {
   components: {
      layout: Layout,
    },
    setup() {
      
    },
    data() {
    return {
    }
  },
  methods: {
    backRequest(){
        window.location.href = '/deliveryform';
    },
    submitRequest(){
        window.location.href = '/successfully-sent';
    }
  }
  }
  </script>

<style>
</style>