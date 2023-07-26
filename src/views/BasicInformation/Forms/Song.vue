<template>
  <div class="w-100">
    <div class="progress">
      <div class="progress-bar" :style="{ width: subProgressWidthSong }"></div>
    </div>

    <div class="d-flex justify-content-center content-sub">
      <div v-for="(subStep, subIndex) in subStepsSong" :key="subIndex" :class="['step-item', { 'active': subIndex === currentSubStepSong }]">
        <div class="substep-title">{{ subStep.title }}</div>
      </div>
    </div>

    <!-- SONG SubSteps -->
    <div >
      <div class="row" >
        <div class="col-12" v-if="currentSubStepSong === 0">
          <div class="select-artist">
            <h2 class="title">Select your artist</h2>
            <p class="sub-title">These artists are available now! Tap an artist to hear a sample song that showcases their style and voice.</p>
            <div class="row top-row">
              <div class="col-6">
                <a href="#" class="btn btn-primary filter"><i class="material-icons"><span class="material-symbols-outlined next">sort</span></i>Filter</a>
              </div>

              <div class="col-6">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search artist by Name" v-model="search" aria-label="Search artist by Name" aria-describedby="button-addon2">
                  <button class="btn btn-success border-rad" type="button" id="button-addon2">
                    <i class="material-icons"><span class="material-symbols-outlined next">search</span></i>
                  </button>
                </div>
              </div>
              
              <div class="  col-3">
                <h5>Type of Artist</h5>
                <select class="form-select" v-model="artist_type" aria-label="Default select example">
                  <option value="" selected></option>
                  <option v-for="artist_type in artist_types" :key="artist_type.id" :value="artist_type.id">{{ artist_type.title }}</option>
                </select>
              </div>

              <div class="col-3">
                <h5>Music Genre</h5>
                <select class="form-select" v-model="genre" aria-label="Default select example">
                  <option value="" selected></option>
                  <option v-for="{ title, id } in genres" :key="id" :value="id">{{ title }}</option> 
                </select>
              </div>

              <div class="col-3">
                <h5>Sort by Ratings</h5>
                <select class="form-select" v-model="rating" aria-label="Default select example">
                  <option selected>Select rating</option>
                  <option value="1">5</option>
                  <option value="2">4</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div class="col-3">
                <h5>Sort by Alphabetical</h5>
                <select class="form-select" v-model="sort" aria-label="Default select example">
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
              </div>
            </div>

            <!-- Show Artists -->
            <div class="">
              <div class="row select-aritst-row">
                <div class="col-4" v-for="(artist, itemIndex) in artists" :key="itemIndex">
                  <div class="card">
                    <img :src="artist.avatar" class="card-img-top img-fluid" loading="lazy" alt="Trending Artist" />
                    <div class="middle">
                      <button class="btn btn-primary" @click="openModal(artist)" data-bs-toggle="modal" data-bs-target="#artistModal"> View Details</button>
                    </div>

                    <div class="card-body">
                      <div class="artist">
                        <h5 class="card-title">{{ artist.artist_name }}</h5>
                        <h6 class="card-text">{{ artist.artist_type }}</h6>
                        <p><img src="https://res.cloudinary.com/daorvtlls/image/upload/v1687321042/rating-star-small_axozjd.svg" alt="Rating Star"> {{ artist.ratings }} <span>({{ artist.reviews }} reviews)</span></p>
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
                    <button class="btn btn-primary select" @click="selectArtist(artist)" :class="{ 'selected': artist === choosenArtist }" >
                      {{ changeSelectArtist(artist) }}
                    </button>                 
                  </div>
                </div>
              </div>
            </div>

            <div class="button-wrapper">
              <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
              <button type="button" class="btn btn-primary next" :disabled="!choosenArtist" @click="subNextStepSong">Next</button>
            </div>
          </div>
        </div>
        <div class="col-md-12" v-if="currentSubStepSong === 1">
          <div >
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
                        <li v-for="option in moods" :key="option.id" @click="selectMood(option)">{{ option.name }}</li>
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
        </div>
        <div class="col-md-12" v-if="currentSubStepSong === 2">
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
                      <li v-for="language in languageOptions" :key="language.id" @click="selectLanguage(language)">{{ language.name }}</li>
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
                      <li v-for="duration in songDurationOptions" :key="duration.id" @click="selectSongDuration(duration)">{{ duration.time }}</li>
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
    </div>
    
  </div> <!-- end of index == 1 -->
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Card from '../../../components/Artist/Card.vue';
export default {
  setup()
  {

    return {}
  },
  components: {
    Card,
  },
  data()
  {
    return {
      // STEP 2 - SONG
      moodOptions: [
        { id: 1, name: 'Happy' },
        { id: 2, name: 'Surprise' },
        { id: 3, name: 'Romance' }
      ],
      languageOptions: [
        { id: 1, name: 'English' },
        { id: 2, name: 'Tagalog' },
        { id: 3, name: 'Taglish' },
        { id: 4, name: 'Bikol' }
      ],
      songDurationOptions: [
        { id: 1, time: '5 minutes' },
        { id: 2, time: '10 minutes' },
        { id: 3, time: '15 minutes' }
      ],
      genre: null,
      rating: null,
      artist_type: null,
      sort: null,
      search: null,
      mood: null,
      language: null,
      duration: null,
      // artists: [],
      selectedMood: null,
      selectLanguage: null,
      selectedSongDuration: null,
      currentSubStepSong: 0,
      expandMore: {
        img: '/assets/expand-more.svg',
        altText: 'expand icon to see list of items in the dropdown menu'
      },
      activeSlide: 0,
      lastActiveSlide: 0,
      subStepsSong: [
        { title: 'Select your artist' },
        { title: 'Select mood' },
        { title: 'Select language' }
      ],
      showControls: false,
      choosenArtist: null,
    }
  },
  props: {
    page: {
      type: Number,
      default: 0,
      required: true
    },
  },  
  methods: {
    ...mapActions([
      'fetchArtists', 'artistOptions', 'fetchSongForm',
    ]),
    selectMood(mood)
    {
      this.selectedMood = mood;
    },    
    subPreviousStepSong()
    {

    },
    fetchForm()
    {

    },
    subNextStepSong()
    {
      if (this.currentSubStepSong < this.subStepsSong.length - 1) {
        this.currentSubStepSong++;
      }
    },
    playButton()
    {

    },
    submit()
    {
      this.$emit('step', 2)
      this.$emit('stepData', this.form)
    },
    previous()
    {
      this.$emit('step', 1);
    },
    selectArtist(artist)
    {
      this.choosenArtist = artist;
      // this.selectedUser = artist === this.selectedUser ? null : artist;
    },
    changeSelectArtist(artist)
    {
      return this.choosenArtist === artist ? 'Selected' : 'Select';
    },
    previousStep()
    {
      if (this.currentStep > 0) {
        this.currentStep--;
      } else if (this.currentStep === 0) {
        this.$router.push('/subscription');
      }
    },
    openModal(artist)
    {
      this.$emit('view', artist)
    }, 
  },
  mounted()
  {
    var payload = {}

    if (this.artist_type) payload.artist_type = this.artist_type
    if (this.genre) payload.genre = this.genre
    if (this.search) payload.search = this.search

    this.artistOptions()
    this.fetchSongForm()
      .then(response =>
      {
        console.log('Fetch Song Form: ', response)
      })

    this.fetchArtists(payload)
      .then(response =>
        {
          console.log('Artist Option: ', response)
        })
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      artists: (state) => state.artist.artists,
      artist_types: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      moods: state => state.songs.moods,
      languages: state => state.songs.langs,
      durations: state => state.songs.durations,
      purposes: state => state.songs.purposes,
    }),
    subProgressWidthSong()
    {
      return ((this.currentSubStepSong + 1) / this.subStepsSong.length) * 100 + '%';
    },
  },
  watch: {
    search(newValue)
    {
      var payload = {}
      if (this.artist_type) payload.artist_type = this.artist_type
      if (this.genre) payload.genre = this.genre
      if (this.sort) payload.sortBy = this.sort;
      if (newValue) payload.search = newValue

      this.fetchArtists(payload)
    },
    sort(newValue)
    {
      var payload = {}
      if (this.artist_type) payload.artist_type = this.artist_type;
      if (this.genre) payload.genre = this.genre;
      if (newValue) payload.sortBy = this.sort;
      if (this.search) payload.search = newValue;

      this.fetchArtists(payload)
    },
    artist_type(newValue)
    {
      var payload = {}
      if (newValue) payload.artist_type = newValue
      if (this.genre) payload.genre = this.genre
      if (this.search) payload.search = this.search
      if (this.sort) payload.sortBy = this.sort;
      this.fetchArtists(payload)
    },
    genre(newValue)
    {
      var payload = {}
      if (this.artist_type) payload.artist_type = this.artist_type
      if (newValue) payload.genre = newValue
      if (this.search) payload.search = this.search

      this.fetchArtists(payload)
    }
  }
}
</script>


  <style scoped></style>