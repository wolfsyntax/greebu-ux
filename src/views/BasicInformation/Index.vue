<template>
  <layout>

  <section class="basic-information">
    <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{ width: progressWidth }"></div>
        </div>
        <div class="d-flex justify-content-center mb-3">
          <div v-for="(step, index) in steps" :key="index" :class="['step-item', { 'active': index === currentStep }]">
            <div class="step-title">{{ step.title }}</div>
          </div>
        </div>
                                                          <!-- STEP 1 - INFO -->
        <div class="step1" v-if="currentStep === 0">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Basic Information</h2>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur. Nec augue ultrices sit ultricies enim tellus tempus in.</p>
              
              <form @submit.prevent="submit">
                  <div class="form-group">
                    <label for="name" class="form-label">First Name</label>
                    <input id="name" type="text" class="form-control" name="name" v-model="first_name" required autocomplete="first-name" placeholder="Please type your First name">
                  </div>
                  <div class="form-group">
                    <label for="name">Last Name</label>
                    <input id="name" type="text" class="form-control" name="name" v-model="last_name" required autocomplete="last-name" placeholder="Please type your Last name">
                  </div>
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input id="email" type="email" class="form-control" name="email"  v-model="email" required autocomplete="email"  @input="validateEmail" placeholder="Please type your Email Address">
                  </div>
                  <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="previousStep1" :disabled="currentStep === 0">Back</button>
                  <button type="button" class="btn btn-primary next" @click="nextStep" :disabled="isButtonInfo">Next</button>
                  <!-- <button type="button" class="btn btn-primary next" @click="nextStep">Next</button> -->
                </div>
               </form>
            </div>
          </div>
        </div>
                                                  <!--      Step 3 - STORY   -  Occasion Details -->
        <div class="step3" v-if="currentStep === 2">

          <div class="step-content" v-for="(step, index) in steps" :key="index" :class="{'active': index === currentStep}">
          <div v-if="index === 2">
            <div class="progress">
              <div class="progress-bar" :style="{ width: subProgressWidthStory }"></div>
            </div>
            <div class="d-flex justify-content-center content-sub">
              <div v-for="(subStep3, subIndex) in subStepsStory" :key="subIndex" :class="['step-item', { 'active': subIndex === currentSubStepStory }]">
                <div class="substep-title">{{ subStep3.title }}</div>
              </div>
            </div>
                                                           <!-- STORY SubSteps -->
            <div v-if="currentSubStepStory === 0">
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title">Occasion Details</h2>
                  <form @submit.prevent="submit">
                      <div class="form-group">
                        <label for="language">What is the song for?</label>
                          <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span :style="selectedOccasion ? { color: '#FF6B00' } : {}">{{ selectedOccasion ? selectedOccasion.name : 'Select Occasion' }}</span>
                            <img :src="expandMore.img" :alt="expandMore.altText">
                          </button>
                          <ul class="dropdown-menu">
                            <li v-for="occasion in songOccasionOptions" :key="occasion.id" @click="selectOccasion(occasion)">
                              {{ occasion.name }}</li>
                          </ul>
                        </div>
                      </div> 
                      <div class="form-group">
                        <label for="language">To whom is the  song for?</label>
                        <input id="name" type="text" class="form-control" name="name" v-model="song_for" required autocomplete="song-for"  placeholder="e.g Jacob Jones">
                      </div> 
                      <div class="form-group">
                        <label for="language">Where did the song come from?</label>
                        <input id="name" type="text" class="form-control" name="name" v-model="come_from" required autocomplete="come-from"  placeholder="e.g Jane Cooper">
                      </div> 
                      <div class="button-wrapper">
                      <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                      <button type="button" class="btn btn-primary next" @click="nextStep" :disabled="!selectedOccasion || (isButtonOccasion)">Next</button>
                      <!-- <button type="button" class="btn btn-primary next" @click="subNextStepStory">Next</button> -->
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div v-if="currentSubStepStory === 1">
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title your-story">Tell us your story</h2>
                  <p class="card-text">In this section, you’ll provide your artist with all the inspiration they’ll need to craft your custom song.</p>
                  <form @submit.prevent="submit">
                      <div class="form-group">
                        <label for="story">Write your Story</label>
                        <textarea v-model="story" class="form-control"></textarea>
                      </div> 
                      <div class="button-wrapper">
                      <button type="button" class="btn btn-primary back" @click="subPreviousStepStory" :disabled="currentStep === 0">Back</button>
                      <button type="button" class="btn btn-primary next" @click="nextStep" :disabled="!selectedOccasion || (isButtonOccasion)">Next</button>
                      <!-- <button type="button" class="btn btn-primary next" @click="nextStep">Next</button> -->
                    </div>
                  </form>
                </div>
              </div>
          </div> <!-- end of currentSubStepStory === 1 -->
          </div>
          </div>
        </div> <!-- end of step3 -->
      </div> <!-- end of col-md -->

                                              <!-- STEP 2 - SONGS -->
      <div class="col-12">
        <div class="step2" v-if="currentStep === 1">
          <div class="step-content" v-for="(step, index) in steps" :key="index" :class="{'active': index === currentStep}">
          <div v-if="index === 1">
            <div class="progress">
              <div class="progress-bar" :style="{ width: subProgressWidthSong }"></div>
            </div>
            <div class="d-flex justify-content-center content-sub">
              <div v-for="(subStep, subIndex) in subStepsSong" :key="subIndex" :class="['step-item', { 'active': subIndex === currentSubStepSong }]">
                <div class="substep-title">{{ subStep.title }}</div>
              </div>
            </div>
                                                           <!-- SONG SubSteps -->
            <div v-if="currentSubStepSong === 0">
              <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                  <div class="select-artist">
                    <h2 class="title">Select your artist</h2>
                  <p class="sub-title">These artists are available now! Tap an artist to hear a sample song that showcases their style and voice.</p>
                    <div class="button-wrapper">
                    <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                    <button type="button" class="btn btn-primary next" @click="subNextStepSong">Next</button>
                  </div>
                  </div>
                </div>
                <div class="col-1"></div>
              </div>
            </div>
            <div class="col-md-6 offset-md-3">
              <div v-if="currentSubStepSong === 1">
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
                        <button type="button" class="btn btn-primary back" @click="subPreviousStepSong" :disabled="currentStep === 0">Back</button>
                        <button type="button" class="btn btn-primary next" @click="subNextStepSong" :disabled="!selectedMood">Next</button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
            <div v-if="currentSubStepSong === 2">
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title">More Details</h2>
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
                      <button type="button" class="btn btn-primary back" @click="subPreviousStepSong" :disabled="currentStep === 0">Back</button>
                      <button type="button" class="btn btn-primary next" @click="nextStep" :disabled="!(selectedLanguage && selectedSongDuration)">Next</button>
                    </div>
                  </form>
                </div>
              </div>
            </div> <!-- end of currentSubStepSong -->
            </div> <!-- end of col-md-6 -->
          </div> <!-- end of index == 1 -->
        </div> <!-- end of step-content-->
        </div>
      </div>

      <div class="col-12">
                                                      <!--     Step 4 - REVIEW -->

         <div class="step4" v-if="currentStep === 3">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="review-content">
                <div class="title">
                <h3>Basic Information</h3>
                  <button type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_964_20368)">
                    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#B8BBCF"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_964_20368">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                Edit Info
                 </button>
              </div>
                <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                  <button type="button" class="btn btn-primary next">Submit</button>
                  </div>
              </div>


            </div>
                <div class="col-1"></div>
          </div>      
        </div>
      </div>

    </div> <!-- end of top row -->


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
          subStepsSong: [
             { title: 'Select your artist'},
            { title: 'Select mood' },
            { title: 'Select language' }
          ],
          subStepsStory: [
            { title: 'Occasion details'},
            { title: 'Your story' },
          ],

      currentStep: 0,
      currentSubStepSong: 0, // Step 2 - SONG
      currentSubStepStory: 0,  // Step 3 - STORY
      selectedMood: null,
      // STEP 1 - INFO
      first_name: '',
      last_name: '',
      email: '',
      // STEP 2 - SONG
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
      // STEP 3 - STORY
      song_for: '',
      come_from: '',
      selectedOccasion: null, 
      songOccasionOptions: [
      { id: 1, name: 'Birthday' },
      { id: 2, name: 'Graduation' },
      { id: 3, name: 'Wedding' }
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
        subProgressWidthSong() {
          return ((this.currentSubStepSong + 1) / this.subStepsSong.length) * 100 + '%';
        },
        subProgressWidthStory() {
          return ((this.currentSubStepStory + 1) / this.subStepsStory.length) * 100 + '%';
        },
        isButtonInfo() {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return (
            this.first_name === '' ||
            this.last_name === '' ||
            !emailRegex.test(this.email)
          );
    },
        isButtonOccasion(){
          return this.song_for === '' || this.come_from === ''; 
        }
      },
      methods: {
        nextStep() {
          if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
          }
        },
        subNextStepSong(){
          if (this.currentSubStepSong < this.subStepsSong.length - 1) {
            this.currentSubStepSong++;
          } 
        },
        subNextStepStory(){
          if (this.currentSubStepStory < this.subStepsStory.length - 1) {
            this.currentSubStepStory++;
          } 
        },
        previousStep() {
          if (this.currentStep > 0) {
            this.currentStep--;
          }else if (this.currentStep === 0) {
            this.$router.push('/subscription');
          }
        },
        subPreviousStepSong(){
          if (this.currentSubStepSong > 0) {
            this.currentSubStepSong--;
          } 
        },
        subPreviousStepStory(){
          if (this.currentSubStepStory > 0) {
            this.currentSubStepStory--;
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
      },
      selectOccasion(occasion){
        this.selectedOccasion = occasion;
      }
      },
   components: {
     layout: Layout,
   }
 }
 </script>

 <style scoped>
    .active .step-title {
          color: #FF6B00;
    }
    .step-item.active .substep-title { /* sub step */
      color: #FF6B00;
      font-weight: 700;
    }
    .substep-title{
      margin-top: 1rem;
      font-weight: 600;
      font-size: 1rem;
      font-style: normal;
      line-height: 1.5rem;
      color: #B8BBCF;
    }
    .progress {
      height: 0.75rem;
      background-color: #EFF3FD;
      border-radius: 10px;
    }
    
    .progress-bar {
      background-color: #FF6B00;
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
    .step-title{
      margin-top: 1rem;
      color: #B8BBCF;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem;
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


