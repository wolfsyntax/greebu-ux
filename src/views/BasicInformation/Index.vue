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
              <h2 class="card-title step1-title">Basic Information</h2>
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
                  <button type="button" class="btn btn-primary back" @click="previousStep1">Back</button>
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
                      <button type="button" class="btn btn-primary next" @click="subNextStepStory" :disabled="!selectedOccasion || (isButtonOccasion)">Next</button>
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
                        <textarea v-model="your_story" class="form-control"></textarea>
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
                
                <div class="col-12">
                  <div class="select-artist">
                    <h2 class="title">Select your artist</h2>
                  <p class="sub-title">These artists are available now! Tap an artist to hear a sample song that showcases their style and voice.</p>

                <div class="row top-row">
                  <div class="col-6">
                    <a href="#" class="btn btn-primary filter"><i class="material-icons"><span class="material-symbols-outlined next">sort</span></i>Filter</a>
                  </div>
                  <div class="col-6">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Search artist by Name" aria-label="Search artist by Name" aria-describedby="button-addon2">
                      <button class="btn btn-success border-rad" type="button" id="button-addon2">
                        <i class="material-icons"><span class="material-symbols-outlined next">search</span></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-3">
                    <h5>Type of Artist</h5>
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Solo Artist</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div class="col-3">
                    <h5>Music Genre</h5>
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Happy</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div class="col-3">
                    <h5>Sort by Ratings</h5>
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Select rating</option>
                      <option value="1">5</option>
                      <option value="2">4</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div class="col-3">
                    <h5>Sort by Alphabetical</h5>
                    <select class="form-select" aria-label="Default select example">
                      <option selected>A-Z</option>
                      <option value="1">A-Z</option>
                      <option value="2">Z-A</option>
                    </select>
                  </div>
                </div>

                                                              <!-- Show Artists -->
                <div id="ShowArtists" class="carousel slide">
                  <div class="carousel-inner">
                    <div class="carousel-item" v-for="(slide, index) in showArtists" :key="index"
                      :class="{ active: index === activeSlide }">
                      <div class="row select-aritst-row">
                        <div class="col-4" v-for="(artist, itemIndex) in showArtists" :key="itemIndex">
                          <div class="card">
                            <img :src="artist.image" class="card-img-top img-fluid" loading="lazy" alt="Trending Artist" />
                            <div class="middle">
                              <button class="btn btn-primary" @click="openModal(artist)" data-bs-toggle="modal" data-bs-target="#artistModal"> View Details</button>
                            </div>
                            <div class="card-body">
                              <div class="artist">
                                <h5 class="card-title">{{ artist.name }}</h5>
                                <h6 class="card-text">{{ artist.typeOfArtist }}</h6>
                                <p><img :src="ratingImage"> {{ artist.ratings }} <span>({{ artist.reviews }}
                                    reviews)</span></p>
                              </div>
                              <div class="audio-btn">
                                <div class="play-btn">
                                  <div class="play-btn">
                                    <div class="play-btn">
                                      <i :class="{
                                        'bi bi-play-circle-fill play-icon': !showControls || (showControls && currentIndex !== itemIndex),
                                        'bi bi-pause-circle-fill play-icon': showControls && currentIndex === itemIndex
                                      }" @click="toggleControls(itemIndex)"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- <span :class="{ 'selected-user': selectedArtist === artist }">{{ artist.id }}</span> -->
                             <button
                              class="btn btn-primary select"
                              @click="selectArtist(artist)"
                              :class="{ 'selected': artist === selectedArtist }"
                            >
                            <!-- {{ selectedArtist === artist ? 'Selected' : 'Select' }} -->
                            {{ changeSelectArtist(artist) }}
                          </button>
                          </div>
                        </div>
                      </div> <!-- end of row -->
                    </div>
                  </div> <!-- end of carousel inner -->
                </div> <!-- end of carousel -->

                    <div class="button-wrapper">
                    <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                    <button type="button" class="btn btn-primary next" :disabled="!selectedArtist" @click="subNextStepSong">Next</button>
                  </div>
                  </div>
                </div>
                
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
                        <!-- <button type="button" class="btn btn-primary next" @click="subNextStepSong">Next</button> -->
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
                      <!-- <button type="button" class="btn btn-primary next" @click="nextStep">Next</button> -->
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
                  <g clip-path="url(#clip0_964_20368)"><path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#B8BBCF"/></g>
                  <defs><clipPath id="clip0_964_20368"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
                Edit Info
                 </button>
              </div>
              <div class="d-flex justify-content-between group-item top-item"><h4>First Name</h4><p>{{ first_name }}</p></div>
              <div class="d-flex justify-content-between group-item"><h4>Last name</h4><p>{{ last_name }}</p></div>
              <div class="d-flex justify-content-between group-item last-item"><h4>Email Address</h4><p>{{ email }}</p></div>

              <div class="title">
                <h3>Song</h3>
                  <button type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_964_20368)"><path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#B8BBCF"/></g>
                  <defs><clipPath id="clip0_964_20368"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
                Edit Info
                 </button>
              </div>
              <div class="d-flex justify-content-between group-item top-item"><h4>Genre</h4>
                <p v-if="selectedArtist">{{ selectedArtist.genre }}</p>
              </div>
              <div class="d-flex justify-content-between group-item"><h4>Type of Artist</h4>
                <p v-if="selectedArtist">{{ selectedArtist.typeOfArtist }}</p>
              </div>
              <div class="d-flex justify-content-between group-item"><h4>Type of Song (Moods)</h4>
                <p>{{ selectedMood ? selectedMood.name : 'No selected mood' }} </p>
              </div>
              <div class="d-flex justify-content-between group-item"><h4>Language</h4><p>{{ selectedLanguage ? selectedLanguage.name : 'No selected language' }}</p></div>
              <div class="d-flex justify-content-between group-item last-item"><h4>Duration of Song</h4><p>{{ selectedSongDuration ? selectedSongDuration.time : 'No selected song' }}</p></div>

              <div class="title">
                <h3>Story</h3>
                  <button type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_964_20368)"><path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#B8BBCF"/></g>
                  <defs><clipPath id="clip0_964_20368"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
                Edit Info
                 </button>
              </div>
              <div class="d-flex justify-content-between group-item top-item"><h4>What is the song for?</h4><p>{{ selectedOccasion ? selectedOccasion.name : 'No selected occasion' }}</p></div>
              <div class="d-flex justify-content-between group-item"><h4>To whom is the song for?</h4><p>{{ song_for }}</p></div>
              <div class="d-flex justify-content-between group-item"><h4>Where did the song come from?</h4><p>{{ come_from }}</p></div>
              <div class="d-flex justify-content-between group-item"><h4>Your story</h4></div>
              <div class="your-story-content">
                <p>{{ your_story }}</p>
              </div>
              <div class="double-check">
                <h5>Please double-check the spelling and, where necessary, the pronunciation, and ensure that your story makes sense.</h5>
              </div>
              <div class="understand">
                <input type="checkbox" class="form-check-input"  v-model="understand" id="understand">
                <p>I understand changes cannot be made after checkout – all of my information is good to go!</p>
              </div>
                <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
                  <button type="button" class="btn btn-primary next" @click="submitSelectedArtist" :disabled="!understand">Submit</button>
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

    </div>  <!-- end of container -->

      <!-- hidden audio controls -->
      <div class="audio-controls-fixed" v-show="showControls">
          <div class="d-flex align-items-center audio-menu">
            <div class="artist">
              <div class="card">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img :src="showArtists[currentIndex].image" class="img-fluid artist-img" alt="Artist Image" />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ showArtists[currentIndex].name }}</h5>
                      <p class="card-text">{{ showArtists[currentIndex].typeOfArtist }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="audio-controls">
              <audio ref="audioPlayer" controls style="display: none;"></audio>
              <div class="main-controls">
                <button @click="playPrevious" class="btn btn-primary prev">
                  <!-- <i class="material-icons"><span class="material-symbols-outlined">skip_previous</span></i> -->
                </button>
                <button @click="togglePlayPause" class="btn btn-primary play">
                  <!-- <i :class="playIconClass"></i> -->
                  <img :src="playIconClass">
                </button>
                <button @click="playNext" class="btn btn-primary next"></button>
              </div>
              <div class="song-timeline">
                <div class="current-time">
                  {{ currentTime }}
                </div>
                <div class="timeline">
                  <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
                </div>
                <div class="duration">
                  {{ duration }}
                </div>
              </div>
            </div>

            <div class="stop-song">
              <!-- Volume -->
              <div class="volume-wrapper">
                <button @click="toggleMute" class="btn btn-primary volume">
                  <i :class="`bi ${volumeIcon}`"></i>
                </button>
                <div class="" style="display: none;">
                  <button @click="showVolumeSlider = !showVolumeSlider" class="btn btn-primary">
                    <i class="bi bi-volume-up"></i>
                  </button>
                </div>
                <div v-if="showVolumeSlider" class="volume-slider">
                  <input type="range" min="0" max="100" v-model="currentVolume" class="form-range" @input="updateVolume">
                </div>
              </div>
              <!-- x icon - stop the song and close the audio controls modal -->
              <i class="bi bi-x" @click="stopAudio"></i>
            </div>
          </div>
        </div> <!-- end of audio-controls -->
        <artistdetails
        :selectedArtist="selectedArtist"
        >
          
        </artistdetails>

        <!-- <user-modal :selectedArtist="selectedArtist" :showUserModal="showUserModal" @closeModal="closeModal" /> -->

  </section>
      
   
  </layout>

  </template>
 <script>
 import Layout from '/src/components/Layouts/Layout.vue';
 import ArtistDetails from '/src/components/Artist/ArtistDetails.vue';

 export default {
  components: {
     layout: Layout,
     artistdetails: ArtistDetails,
   },
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
      understand: false,
      submitted: false,
      // STEP 1 - INFO
      first_name: '',
      last_name: '',
      email: '',
      // STEP 2 - SONG
      moodOptions: [
      { id: 1, name: 'Happy' },
      { id: 2, name: 'Surprise' },
      { id: 3, name: 'Romance' }
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
      your_story: '',
      selectedOccasion: null, 
      songOccasionOptions: [
      { id: 1, name: 'Birthday' },
      { id: 2, name: 'Graduation' },
      { id: 3, name: 'Wedding' }
    ],
      expandMore: {
        img: '/assets/expand-more.svg',
        altText: 'expand icon to see list of items in the dropdown menu'
      },
      currentStep: 0,
                              // STEP 2 - SONG (SELECT YOUR ARTIST)        
      showArtists: [
        {
          id: 1,
          name: 'Idlepitch',
          typeOfArtist: 'Full Band Artist',
          genre: 'Rock',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
          songName: 'Smells like teen spirit',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649068/trending-bicolano-artist-1_igoz8j.png',
          ratings: 4.95,
          reviews: 234,
        },
        {
          id: 2,
          name: 'Dante Magno',
          typeOfArtist: 'Songwriter',
          genre: 'Hip-hop/Rap',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686647609/MORE_THAN_WORDS_ti4mor.mp3',
          songName: 'More than words',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649067/trending-bicolano-artist-2_ljhog8.png',
          ratings: 4.95,
          reviews: 230,
        },
        {
          id: 3,
          name: 'Sarah Heart',
          typeOfArtist: 'Solo Artist',
          genre: 'Country Rock',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411951/please-forgive-me-bryan-adams_bnyj1o.mp3',
          songName: 'Please forgive me',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg',
          ratings: 4.90,
          reviews: 123,
        },
        {
          id: 4,
          name: 'Ricardo Sy',
          typeOfArtist: 'Songwriter',
          genre: 'Metal',
          song: 'https://res.cloudinary.com/daorvtlls/video/upload/v1687411918/total-eclipse-of-the-heart_d6wjes.mp3',
          songName: 'Total eclipse of the heart',
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465774/samples/people/jazz.jpg',
          ratings: 4.90,
          reviews: 113,
        },
        
      ],
      ratingImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321042/rating-star-small_axozjd.svg',
      showControls: false,
      audioPlayer: null,
      currentIndex: 0,
      activeSlide: 0,
      lastActiveSlide: 0,
      isPlaying: false,
      isMuted: false,
      currentTime: '0:00',
      duration: '0:00',
      showVolumeSlider: false,
      currentVolume: 100,
      showVolumeSlider: true,
      muted: false,
      selectedArtist: null,
      isActive: false,
      showUserModal: false,


        };
      },
      mounted()
      {
        this.audioPlayer = this.$refs.audioPlayer;
        this.audioPlayer.addEventListener('play', () =>
        {
          this.isPlaying = true;
        });
        this.audioPlayer.addEventListener('pause', () =>
        {
          this.isPlaying = false;
        });
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
        },
        playIconClass()
        {
          return this.isPlaying ? 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321874/play-pause_ofcx4e.svg' : 'https://res.cloudinary.com/daorvtlls/image/upload/v1687321874/play-black_ftgyx3.svg';
        },
        volumeIcon()
        {
          if (this.currentVolume === 0) {
            return 'bi-volume-mute';
          } else if (this.currentVolume < 1) {
            return 'bi-volume-mute';
          } else if (this.currentVolume < 50) {
            return 'bi-volume-down';
          } else {
            return 'bi-volume-up';
          }
        },
      },
      methods: {
        selectArtist(artist){
          this.selectedArtist = artist;
          // this.selectedUser = artist === this.selectedUser ? null : artist;
        }, 
        changeSelectArtist(artist) {
          return this.selectedArtist === artist ? 'Selected' : 'Select';
        },
        openModal(artist){
        this.$root.$emit("bv::show::modal", "#artistModal");
        // this.showUserModal = true;
        this.selectedArtist = artist;
      },
        toggleControls(index)
          {
            if (this.audioPlayer) {
              if (this.showControls && this.currentIndex === index) {
                if (this.audioPlayer.paused) {
                  this.audioPlayer.play();
                  this.isPlaying = true;
                } else {
                  this.audioPlayer.pause();
                  this.isPlaying = false;
                }
              } else {
                this.currentIndex = index;
                this.playSong(this.currentIndex);
                this.showControls = true;
                this.isPlaying = true;
              }
              this.activeSlide = Math.floor(index / 3);
            }
          },
          togglePlayPause()
          {
            if (this.audioPlayer) {
              if (this.audioPlayer.paused) {
                this.audioPlayer.play();
              } else {
                this.audioPlayer.pause();
              }
            }
          },  
          playPrevious()
              {
                if (this.currentIndex > 0) {
                  this.currentIndex--;
                } else {
                  this.currentIndex = this.showArtists.length - 1;
                }
                // this.activeSlide = Math.floor(this.currentIndex / 6);
                this.playSong(this.currentIndex);
              },

              playSong(index)
              {
                if (this.audioPlayer) {
                  this.audioPlayer.src = this.showArtists[index].song;
                  this.audioPlayer.load();
                  this.audioPlayer.play();
                }
                // Update current time and duration when the metadata is loaded
                this.audioPlayer.addEventListener('loadedmetadata', () =>
                {
                  this.duration = this.formatTime(this.audioPlayer.duration);
                });

                // Update current time during playback
                this.audioPlayer.addEventListener('timeupdate', () =>
                {
                  this.currentTime = this.formatTime(this.audioPlayer.currentTime);
                  this.updateProgressBar();
                });
              },

              stopAudio()
              {
                if (this.audioPlayer) {
                  this.audioPlayer.pause();
                  this.showControls = false;
                }
              },
              toggleMute()
              {
                if (this.audioPlayer) {
                  this.audioPlayer.muted = !this.audioPlayer.muted;
                  this.isMuted = this.audioPlayer.muted;
                }
              },
              formatTime(time)
              {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60).toString().padStart(2, '0');
                return `${minutes}:${seconds}`;
              },

              updateProgressBar()
              {
                const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
                this.progressBarWidth = `${progress}%`;
              },
              updateVolume()
              {
                if (this.audioPlayer) {
                  this.audioPlayer.volume = this.currentVolume / 100;
                }
              },
              toggleMute()
              {
                if (this.currentVolume === 0) {
                  this.currentVolume = this.previousVolume;
                } else {
                  this.previousVolume = this.currentVolume;
                  this.currentVolume = 0;
                }
              },
            watch: {
              currentVolume()
              {
                this.updateVolume();
              },
            },
              playNext()
              {
                if (this.currentIndex < this.showArtists.length - 1) {
                  this.currentIndex++;
                } else {
                  this.currentIndex = 0;
                }
                // this.activeSlide = Math.floor(this.currentIndex / 6);
                this.playSong(this.currentIndex);
              },

        nextStep() {
          if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
          }
          this.submitted = true;
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
      submitSelectedArtist() {
            window.location.href = '/deliveryform';
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
      },
      },
 }
 </script>



