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
                    <div class="d-flex justify-content-between align-items-center personalized-song"
                    @mouseover="startRotation" @mouseout="stopRotation"
                    >
                        <div class="song-wrapper">
                            <!-- <img src="/assets/create-song/vinyl-record.svg"
                            :style="imgStyle"
                            > -->
                            <div class="disk-icon">
                                <svg :style="imgStyle" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
  <path d="M36.2294 2.72937C17.6076 2.72937 2.49414 17.8428 2.49414 36.4647C2.49414 55.0865 17.6076 70.2 36.2294 70.2C54.8513 70.2 69.9647 55.0865 69.9647 36.4647C69.9647 17.8428 54.8513 2.72937 36.2294 2.72937ZM36.2294 35.5187C36.7521 35.5187 37.1754 35.942 37.1754 36.4647C37.1754 36.9874 36.7521 37.4106 36.2294 37.4106C35.7067 37.4106 35.2835 36.9874 35.2835 36.4647C35.2835 35.942 35.7067 35.5187 36.2294 35.5187Z" fill="black" fill-opacity="0.5"/>
  <path d="M35.7353 2C17.1134 2 2 17.1134 2 35.7353C2 54.3572 17.1134 69.4706 35.7353 69.4706C54.3572 69.4706 69.4706 54.3572 69.4706 35.7353C69.4706 17.1134 54.3572 2 35.7353 2ZM35.7353 34.7893C36.258 34.7893 36.6812 35.2126 36.6813 35.7353C36.6813 36.258 36.258 36.6812 35.7353 36.6813C35.2126 36.6813 34.7893 36.258 34.7893 35.7353C34.7893 35.2126 35.2126 34.7893 35.7353 34.7893Z" fill="black"/>
  <path d="M35.7354 23.455C28.9593 23.455 23.4551 28.9592 23.4551 35.7353C23.4551 42.5114 28.9593 48.0156 35.7354 48.0156C42.5115 48.0156 48.0157 42.5114 48.0157 35.7353C48.0157 28.9592 42.5115 23.455 35.7354 23.455ZM35.7354 34.9261C36.1829 34.9261 36.5446 35.2878 36.5446 35.7353C36.5446 36.1828 36.1829 36.5445 35.7354 36.5445C35.2879 36.5445 34.9262 36.1828 34.9262 35.7353C34.9262 35.2878 35.2879 34.9261 35.7354 34.9261Z" fill="#333333"/>
  <path d="M35.7367 2.32471C54.1828 2.32471 69.1471 17.289 69.1471 35.7352C69.1471 54.1814 54.1828 69.1457 35.7367 69.1457C17.2905 69.1457 2.32617 54.1814 2.32617 35.7352C2.32617 17.289 17.2905 2.32471 35.7367 2.32471Z" stroke="black" stroke-width="3.562"/>
  <path d="M52.798 35.7351C52.798 45.1539 45.1554 52.8022 35.7366 52.8022V68.8208C53.999 68.8208 68.8223 53.9975 68.8223 35.7351H52.798Z" fill="url(#paint0_radial_4978_61501)"/>
  <path d="M18.6747 35.7353C18.6747 26.3165 26.3173 18.6682 35.7361 18.6682V2.64966C17.4737 2.64966 2.65039 17.4729 2.65039 35.7353H18.6747Z" fill="url(#paint1_radial_4978_61501)"/>
  <path d="M35.734 23.4604C42.5115 23.4604 48.0086 28.9576 48.0086 35.7351C48.0086 42.5126 42.5115 48.0101 35.734 48.0101C28.9565 48.0101 23.459 42.5126 23.459 35.7351C23.459 28.9576 28.9565 23.4604 35.734 23.4604Z" stroke="black" stroke-width="3"/>
  <path d="M42.6581 28.8128C38.8373 24.9921 32.6336 24.9921 28.8128 28.8128C24.9921 32.6336 24.9921 38.8373 28.8128 42.6581C32.6336 46.4789 38.8373 46.4789 42.6581 42.6581C46.4789 38.8373 46.4789 32.6336 42.6581 28.8128ZM36.4044 35.0666C36.774 35.4362 36.774 36.0348 36.4044 36.4044C36.0348 36.774 35.4362 36.774 35.0666 36.4044C34.697 36.0348 34.697 35.4362 35.0666 35.0666C35.4362 34.697 36.0348 34.697 36.4044 35.0666Z" fill="url(#paint2_radial_4978_61501)"/>
  <path opacity="0.742574" d="M43.7497 27.7209C42.462 26.4331 40.9404 25.5229 39.3214 24.9849L39.0957 25.6618C40.612 26.1659 42.0361 27.0226 43.242 28.2286C44.7111 29.6977 45.6593 31.4898 46.0868 33.3782L46.7839 33.2211C46.3277 31.2051 45.3182 29.2894 43.7497 27.7209Z" fill="white"/>
  <path opacity="0.742574" d="M25.2705 33.9583L24.5614 33.8374C23.9711 37.3337 25.0243 41.0537 27.7205 43.7499C30.4094 46.4389 34.1167 47.4929 37.6048 46.913L37.4879 46.2079C34.2192 46.752 30.7478 45.7618 28.2282 43.2422C25.7022 40.7162 24.7173 37.2342 25.2705 33.9583Z" fill="white"/>
  <defs><radialGradient id="paint0_radial_4978_61501" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(68.8223 68.8208) rotate(-45) scale(20.7436 46.7902)">
      <stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient><radialGradient id="paint1_radial_4978_61501" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(2.65039 2.64966) rotate(135) scale(20.7436 46.7902)"><stop stop-color="white"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient><radialGradient id="paint2_radial_4978_61501" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(35.7355 35.7355) rotate(90) scale(28.1255 9.79007)">
      <stop stop-color="#F7F7F7"/><stop offset="1" stop-color="#E1E1E1"/></radialGradient></defs></svg>
                            </div>
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
        isRotating: false,
        rotation: 0,
    }
  },
  computed: {
    imgStyle(){
        return{
            transform: `rotate(${this.rotation}deg)`,
            transition: this.isRotating ? 'transform 1s linear' : 'none',
        }
    }
  },
  methods: {
    backRequest(){
        window.location.href = '/deliveryform';
    },
    submitRequest(){
        window.location.href = '/successfully-sent';
    },
    startRotation(){
        this.isRotating = true;
        this.rotateImage();
    },
    stopRotation(){
        this.isRotating = false;
    },
    rotateImage(){
        if(this.isRotating){
            this.rotation += 5; // rotation speed
            requestAnimationFrame(this.rotateImage);
        }
    }
  }
  }
  </script>

<style>
</style>