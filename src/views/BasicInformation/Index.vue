<template>
  <layout>

  <section class="basic-information">
    <div class="container">

    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="progress">
          <div class="progress-bar" :style="{ width: progressWidth }"></div>
        </div>
        <div class="d-flex justify-content-center mb-3">
          <div v-for="(step, index) in steps" :key="index" :class="['step-item', { 'active': index === currentStep }]">
            <div class="step-title">{{ step.title }}</div>
          </div>
        </div>

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
                  <button type="button" class="btn btn-primary next" @click="nextStep">Next</button>
                </div>
               </form>
            </div>
          </div>
        </div> <!-- end of step1 row -->

        <div class="row step2" v-if="currentStep === 1">
          <div class="step-content" v-for="(step, index) in steps" :key="index" :class="{'active': index === currentStep}">
          <div v-if="index === 1">
            <div class="progress">
              <div class="progress-bar" :style="{ width: subProgressWidth }"></div>
            </div>
            <div class="d-flex justify-content-center">
              <div v-for="(subStep, subIndex) in subSteps" :key="subIndex" :class="['step-item', { 'active': subIndex === currentSubStep }]">
                <div class="step-title">{{ subStep.title }}</div>
              </div>
            </div>
                                                           <!-- SONG substeps -->
            <div v-if="currentSubStep === 0">
                <div class="col-12">
                  <h2 class="title">Select your artist</h2>
                  <p class="sub-title">These artists are available now! Tap an artist to hear a sample song that showcases their style and voice.</p>
                      <div class="button-wrapper">
                      <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                      <button type="button" class="btn btn-primary next" @click="subNextStep">Next</button>
                    </div>
                </div>
            </div>
            <div v-if="currentSubStep === 1">
              <div class="card">
                  <div class="card-body">
                    <h2 class="card-title">How the song make them feel?</h2>
                    <form @submit.prevent="submit">
                        <div class="form-group">
                          <label for="mood">Select mood</label>
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <span :style="selectedMood ? { color: '#FF6B00' } : {}">{{ selectedMood ? selectedMood.name : 'Select mood' }}</span>
                              <img :src="expandMore.img" :alt="expandMore.altText">
                            </button>
                            <ul class="dropdown-menu">
                              <li v-for="option in moodOptions" :key="option.id" @click="selectMood(option)">
                                {{ option.name }}
                              </li>
                            </ul>
                          </div>
                        </div> 
                        <div class="button-wrapper">
                        <button type="button" class="btn btn-primary back" @click="subPreviousStep" :disabled="currentStep === 0">Back</button>
                        <button type="button" class="btn btn-primary next" @click="subNextStep" :disabled="!selectedMood">Next</button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
            <div v-if="currentSubStep === 2">
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title">More Details substep</h2>
                  <form @submit.prevent="submit">
                      <div class="form-group">
                        <label for="language">Select Language</label>
                          <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span :style="selectedLanguage ? { color: '#FF6B00' } : {}">{{ selectedLanguage ? selectedLanguage.name : 'Select Language' }}</span>
                            <img :src="expandMore.img" :alt="expandMore.altText">
                          </button>
                          <ul class="dropdown-menu">
                            <li v-for="language in languageOptions" :key="language.id" @click="selectLanguage(language)">
                              {{ language.name }}</li>
                          </ul>
                        </div>
                      </div> 
                      <div class="form-group">
                        <label for="language">Duration of Song</label>
                          <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span :style="selectedSongDuration ? { color: '#FF6B00' } : {}">{{ selectedSongDuration ? selectedSongDuration.time : 'Select Duration of Song' }}</span>
                            <img :src="expandMore.img" :alt="expandMore.altText">
                          </button>
                          <ul class="dropdown-menu">
                            <li v-for="duration in songDurationOptions" :key="duration.id" @click="selectSongDuration(duration)">
                              {{ duration.time }}</li>
                          </ul>
                        </div>
                      </div> 
                      <div class="button-wrapper">
                      <button type="button" class="btn btn-primary back" @click="subPreviousStep" :disabled="currentStep === 0">Back</button>
                      <button type="button" class="btn btn-primary next" @click="nextStep" :disabled="!(selectedLanguage && selectedSongDuration)">Next</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div class="row step3" v-if="currentStep === 2">
                   Step 3 - STORY   -  Occasion Details
                   <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="previousStep">Back</button>
                  <button type="button" class="btn btn-primary next" @click="nextStep">Next</button>
                </div>
        </div>

        <div class="row step4" v-if="currentStep === 3">
                          Step 4 - REVIEW
                          <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="previousStep">Back</button>
                  <button type="button" class="btn btn-primary next" @click="nextStep">Next</button>
                </div>
        </div>

      </div>
    </div> <!-- end of top row -->

        <!-- <div class="row step2" v-if="currentStep === 1">


          <div class="col-12">
            <h2 class="title">Select your artist</h2>
            <p class="sub-title">These artists are available now! Tap an artist to hear a sample song that showcases their style and voice.</p>
                <div class="button-wrapper">
                <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                <button type="button" class="btn btn-primary next" @click="nextStep">Next</button>
              </div>
          </div>
        </div> -->


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
          subSteps: [
          { title: 'Select your artist'},
            { title: 'Select mood' },
            { title: 'Select language' }
          ],

      currentStep: 0,
      currentSubStep: 0,
      selectedMood: null,
      moodOptions: [
      { id: 1, name: 'Happy' },
      { id: 2, name: 'Surprise' },
      { id: 3, name: 'Anger' }
        ],
      selectedLanguage: null,
      languageOptions: [
        { id: 1, name: 'English' },
        { id: 2, name: 'Tagalog' },
        { id: 3, name: 'Taglish' },
        { id: 4, name: 'Bikol' }
        ],
      selectedSongDuration: null, 
      songDurationOptions: [
      { id: 1, time: '5 minutes' },
      { id: 2, time: '10 minutes' },
      { id: 3, time: '15 minutes' }
      ],
      expandMore: {
        img: 'src/assets/expand-more.svg',
        altText: 'expand icon to see list of items in the dropdown menu'
      },
      currentStep: 0

        };
      },
      computed: {
        progressWidth() {
          return ((this.currentStep + 1) / this.steps.length) * 100 + '%';
        },
        subProgressWidth() {
          return ((this.currentSubStep + 1) / this.subSteps.length) * 100 + '%';
        }
      },
      methods: {
        nextStep() {
          if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
          }
        },
        subNextStep(){
          if (this.currentSubStep < this.subSteps.length - 1) {
            this.currentSubStep++;
          } 
        },
        previousStep() {
          if (this.currentStep > 0) {
            this.currentStep--;
          }else if (this.currentStep === 0) {
            this.$router.push('/subscription');
          }
        },
        subPreviousStep(){
          if (this.currentSubStep > 0) {
            this.currentSubStep--;
          } 
        },
        previousStep1(){
         if (this.currentStep === 0) {
            window.location.href = '/create-song';
        }
      },
      selectMood(mood) {
      this.selectedMood = mood;
      },
      selectLanguage(language) {
      this.selectedLanguage = language;
      },
      selectSongDuration(duration){
        this.selectedSongDuration = duration;
      }
      },
   components: {
     layout: Layout,
   }
 }
 </script>

 <style scoped>
    .progress {
      height: 10px;
      background-color: #ddd;
      border-radius: 10px;
    }
    
    .progress-bar {
      background-color: orange;
      border-radius: 10px;
    }
    
    .step-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
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
      justify-content: space-between;
    }
</style>


