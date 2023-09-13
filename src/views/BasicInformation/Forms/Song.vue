
<template>
  <div class="w-100">
    <div class="progress">
      <div class="progress-bar" :style="{ width: subProgressWidthSong }"></div>
    </div>
<!-- {{ language }}<br/><br/>
{{ mood }}<br/><br/>
{{ duration }}<br/><br/> -->
    <div class="d-flex justify-content-center content-sub">
      <div v-for="(subStep, subIndex) in subStepsSong" :key="subIndex" :class="['step-item', { 'active': subIndex === currentSubStepSong }]">
        <div class="substep-title">{{ subStep.title }}</div>
      </div>
    </div>
    
    <!-- SONG SubSteps -->
    <div class="justify-content-center p-0">
      <div class="row" >
        <div class="col-12" v-if="currentSubStepSong === 0">
          <div class="select-artist ">
            <div class="d-flex align-items-center back-to-info" @click="previousStep">
              <span class="material-symbols-outlined">&#xe5c4;</span>
              <h5 class="back">Back</h5>
            </div>
            <div class="text-center title-wrapper">
              <h2 class="title">Select your artist</h2>
              <p class="sub-title">These artists are available now! Tap an artist to hear a sample song that showcases their style and voice.</p>
            </div>
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
                <div class="col-3" v-for="(artist, itemIndex) in artists" :key="itemIndex">
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
              <button type="button" class="btn btn-primary back" @click="previousStep" :disabled="page === 0">Back</button>
              <button type="button" class="btn btn-primary next" :disabled="!choosenArtist" @click="subNextStepSong">Next</button>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 offset-md-3" v-if="currentSubStepSong === 1">
          <!-- <div class=""> -->
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">How the song make them feel?</h2>
                <form @submit.prevent="subNextStepSong">
                  <div class="form-group">
                    <label for="mood">Select mood</label>
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span :style="selectedMood ? { color: '#121212' } : {}">{{ mood ? mood.name : 'Select Mood' }}</span>
                        <img :src="expandMore.img" :alt="expandMore.altText">
                      </button>

                      <ul class="dropdown-menu">
                        <li v-for="option in moods" :key="option.id" @click="selectMood(option)">{{ option.name }}</li>
                      </ul>
                    </div>
                  </div> 

                  <div class="button-wrapper">
                    <button type="button" class="btn btn-primary back" @click="subPreviousStepSong" :disabled="currentSubStepSong === 0">Back</button>
                    <button type="submit" class="btn btn-primary next" :disabled="!mood">Next</button>
                  </div>
                </form>
              </div>
            </div>
          <!-- </div> -->
        </div>

        <div class="col-md-6 offset-md-3" v-if="currentSubStepSong === 2">
          <div class="card ">
            <div class="card-body ">
              <h2 class="card-title">More Details</h2>
              <form class="w-100" @submit.prevent="nextStep">
                <div class="form-group">
                  <label for="language">Select Language</label>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span :style="language ? { color: '#121212' } : {}">{{ language ? language.name : 'Select Language' }}</span>
                      <img :src="expandMore.img" :alt="expandMore.altText">
                    </button>

                    <ul class="dropdown-menu">
                      <li v-for="language in languages" :key="language.id" @click="selectLanguage(language)">{{ language.name }}</li>
                    </ul>
                  </div>
                </div>
              
                <div class="form-group">
                  <label for="language">Duration of Song</label>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span :style="duration ? { color: '#121212' } : {}">{{ duration ? duration.title : 'Select Duration of Song' }}</span>
                      <img :src="expandMore.img" :alt="expandMore.altText">
                    </button>

                    <ul class="dropdown-menu">
                      <li v-for="duration in durations" :key="duration.id" @click="selectSongDuration(duration)">{{ duration.title }}</li>
                    </ul>
                  </div>
                </div> 

                <div class="button-wrapper">
                  <button type="button" class="btn btn-primary back" @click="subPreviousStepSong" :disabled="page === 0">Back</button>
                  <button type="submit" class="btn btn-primary next" :disabled="!(language && duration)">Next</button>
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
      moodIndex: 0,
      occasion: null,
      language: null,
      duration: null,
      // artists: [],
      selectedMood: null,
      // selectLanguage: null,
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
      form: {
        artists: null,
        genre_id: null,
        song_type_id: null,
        language_id: null,
        duration_id: null,
        purpose_id: null,
      }
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
      'fetchArtists', 'artistOptions', 'fetchSongForm', 'storeArtist', 'songStepTwo', 'storeMood', 'storeLanguage', 'storeDuration',
      ]),
    selectMood(value)
    {
      this.mood = value;
      this.storeMood(value);
    },    
    subPreviousStepSong()
    {
      // this.$emit('step', 0);
      if (this.currentSubStepSong > 0) {
        this.currentSubStepSong--;
      }
      this.language = this._getSongLanguage;
      this.mood = this._getSongMood;
      this.duration = this._getSongDuration;
    },
    fetchForm()
    {

    },
    nextStep()
    {
      // if (this.currentStep < this.steps.length - 1) {
      //   this.currentStep++;
      // }
      // var newForm = Object.assign(this.form, {
      //   language_id: this.language,
      //   duration_id: this.duration,
      // })

      this.$emit('step', 2)
      // this.$emit('stepData', this.form)
      

      this.songStepTwo()

      this.submitted = true;
    },    
    subNextStepSong()
    {
      
      if (this.currentSubStepSong < this.subStepsSong.length - 1) {
        this.currentSubStepSong++;
        // this.$emit('stepData', this.form)
      }

      if (this.currentSubStepSong === 2) {

        console.log('Setting Mood 3: ', this.mood)
        // var newObj = Object.assign(this.form, { song_type_id: this.mood });
        this.storeMood(this.mood);
        // this.storeSong(newObj)
      } else if (this.currentSubStepSong === 3) {
        console.log('Language and Duration: ', this.form)
        // var newObj = Object.assign(this.form, { language_id: this.language, duration_id: this.duration });
        // this.storeLanguage(this.language);
        // this.storeDuration(this.duration);
      }
    },
    playButton()
    {

    },
    submit()
    {

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
      this.$emit('step', 0)
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
    selectLanguage(language)
    {
      this.language = language;
      this.storeLanguage(language);
    },
    selectSongDuration(duration)
    {
      this.duration = duration;
      this.storeDuration(duration)
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
        
      })

    this.fetchArtists(payload)
    .then(response =>
      {
        // console.log('Artist Option: ', response)
    })

    this.form = this.song;
    this.language = this._getSongLanguage;
    this.mood = this._getSongMood;
    this.duration = this._getSongDuration;
    console.log('Song.vue mounted', this.mood);
  },
  computed: {
    ...mapGetters(["userInfo", "token", "_getSongArtists", "_getSongLanguage", "_getSongDuration", "_getSongPurpose", "_getSongMood"]),
    ...mapState({
      artists: (state) => state.artist.artists,
      artist_types: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      moods: state => state.songs.moods,
      languages: state => state.songs.languages,
      durations: state => state.songs.durations,
      purposes: state => state.songs.purposes,
      song: state => state.songs.song,
      // song_artists: state => state.songs.song_artists,
      // song_language: state => state.songs.song_language,
      // song_duration: state => state.songs.song_duration,
      // song_purpose: state => state.songs.song_purpose,
      // song_mood: state => state.songs.song_mood,
    }),
    subProgressWidthSong()
    {
      return ((this.currentSubStepSong + 1) / this.subStepsSong.length) * 100 + '%';
    },
  },
  watch: {
    currentSubStepSong(value, prev)
    {

      if (prev === 0) {
        // this.$emit('stepData', { artists: this.choosenArtist })
        this.storeArtist(this.choosenArtist)
      } else if (prev === 1) {
        // console.log(`Current Watch[${prev}]: `,this.form)
        // this.form['song_type_id'] = this.mood

        // console.log(`New Watch[${prev}]: `, this.form)
        // this.storeSong(this.form);

      } else if (prev === 2) {

        // this.$emit('stepData', {
        //   language_id: this.language?.id || null,
        //   duration_id: this.duration?.id || null,
        // })

      }

    },
    search(newValue)
    {
      var payload = {}
      if (this.artist_type) payload.artist_type = this.artist_type
      if (this.genre) payload.genre = this.genre
      if (this.sort) payload.sortBy = this.sort;
      if (newValue) payload.search = newValue
      payload.list_type = 'customers';

      this.fetchArtists(payload)
    },
    sort(newValue)
    {
      var payload = {}
      if (this.artist_type) payload.artist_type = this.artist_type;
      if (this.genre) payload.genre = this.genre;
      if (newValue) payload.sortBy = this.sort;
      if (this.search) payload.search = newValue;

      payload.list_type = 'customers';

      this.fetchArtists(payload)
    },
    artist_type(newValue)
    {
      var payload = {}
      if (newValue) payload.artist_type = newValue
      if (this.genre) payload.genre = this.genre
      if (this.search) payload.search = this.search
      if (this.sort) payload.sortBy = this.sort;
      
      payload.list_type = 'customers';

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