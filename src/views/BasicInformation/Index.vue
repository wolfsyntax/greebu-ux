<template>
  <layout>

  <section class="basic-information">
    <div class="container">

    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="d-flex justify-content-center">
          <div v-for="(step, index) in steps" :key="index" :class="['step-item', { 'active': index === currentStep }]">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-title">{{ step.title }}</div>
          </div>
        </div>
        <!-- <div class="step-content" v-for="(step, index) in steps" :key="index" :class="{'active': index === currentStep}">
          <h3>{{ step.title }}</h3>
          <p>{{ step.content }}</p>
        </div> -->

        <div class="row step1" v-if="currentStep === 0">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Basic Information</h2>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur. Nec augue ultrices sit ultricies enim tellus tempus in.</p>
              
              <form @submit.prevent="submit">
                  <div class="form-group">
                    <label for="name">First Name</label>
                    <input id="name" type="text" class="form-control" name="name" placeholder="Please type your First name">
                  </div>
                  <div class="form-group">
                    <label for="name">Last Name</label>
                    <input id="name" type="text" class="form-control" name="name" placeholder="Please type your Last name">
                  </div>
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input id="email" type="email" class="form-control" name="email" placeholder="Please type your Email Address">
                  </div>
                  <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="previousStep1" :disabled="currentStep === 0">Back</button>
                  <button type="button" class="btn btn-primary next" @click="nextStep" :disabled="currentStep === steps.length - 1">Next</button>
                </div>
               </form>
            </div>
          </div>
        </div> <!-- end of step1 row -->

        <div class="row step3" v-if="currentStep === 2">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">How the song make them feel?</h2>
              <form @submit.prevent="submit">
                  <div class="form-group">
                    <label for="mood">Select mood</label>
                    <input id="mood" type="text" class="form-control" name="mood" placeholder="Happy">
                  </div>
                  <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                  <button type="button" class="btn btn-primary next" @click="nextStep" :disabled="currentStep === steps.length - 1">Next</button>
                </div>
               </form>
            </div>
          </div>
        </div>

        <div class="row step4" v-if="currentStep === 3">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">More Details</h2>
              <form @submit.prevent="submit">
                  <div class="form-group">
                    <label for="mood">Select Language</label>
                    <select class="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">English</option>
                    <option value="2">Bikol</option>
                    <option value="3">Tagalog</option>
                  </select>
                  </div>
                  <div class="form-group">
                    <label for="mood">Duration of Song</label>
                    <select class="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">5 minutes</option>
                    <option value="2">10 minutes</option>
                    <option value="3">15 minutes</option>
                  </select>
                  </div>
                  <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                  <button type="button" class="btn btn-primary next" @click="nextStep" :disabled="currentStep === steps.length - 1">Next</button>
                </div>
               </form>
            </div>
          </div>
        </div>

      </div>
    </div> <!-- end of top row -->

        <div class="row step2" v-if="currentStep === 1">
          <div class="col-12">
            <h2 class="title">Select your artist</h2>
            <p class="sub-title">These artists are available now! Tap an artist to hear a sample song that showcases their style and voice.</p>
                <div class="button-wrapper">
                <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                <button type="button" class="btn btn-primary next" @click="nextStep" :disabled="currentStep === steps.length - 1">Next</button>
              </div>
          </div>

        </div>


        <!-- <div class="button-container">
          <button class="btn btn-primary" @click="previousStep" :disabled="currentStep === 0">Back</button>
          <button class="btn btn-primary" @click="nextStep" :disabled="currentStep === steps.length - 1">Next</button>
        </div> -->
        
      <!-- </div>
    </div> -->


    </div>
  </section>
      
   
  </layout>

  </template>
 <script>
 import Layout from '@/components/Layouts/Layout.vue';
 export default {
   setup()
   {
 
   },
   data()
  {
    return {
      steps: [
            { title: 'INFO', content: 'INFO' },
            { title: 'SONG', content: 'SONG' },
            { title: 'STORY', content: 'STORY' },
            { title: 'REVIEW', content: 'REVIEW' }
          ],
          currentStep: 0
        };
      },
      methods: {
        nextStep() {
          if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
          }
        },
        previousStep() {
          if (this.currentStep > 0) {
            this.currentStep--;
          }else if (this.currentStep === 0) {
            this.$router.push('/subscription');
          }
        },
        previousStep1(){
         if (this.currentStep === 0) {
            window.location.href = '/create-song';
        }
      }
      },
   components: {
     layout: Layout,
   }
 }
 </script>

 <style scoped>
    .step-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .step-item::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 100%;
      height: 2px;
      width: 100%;
      background-color: #ddd;
      transform: translateY(-50%);
    }
    
    .step-item:last-child::after {
      display: none;
    }
    
    .step-number {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #ddd;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    
    .step-title {
      margin-top: 8px;
    }
    
    .active .step-number {
      background-color: orange;
    }
    
    .step-content {
      display: none;
    }
    
    .step-content.active {
      display: block;
    }
    
    .button-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
</style>


