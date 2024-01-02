<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <layout>
    <section class="artist-banner">
      <div class="container-fluid">
        <div id="artistBanner" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="carousel-caption d-none d-md-block">
                <h2>EXPLORE our Community of artist</h2>
                <p>
                  Custom tunes for any mood, and booking the best artists just
                  got easier with our website!
                </p>
                <a href="/create-song" class="btn btn-primary btn-lg"
                  >Create a song</a
                >
              </div>
            </div>
            <div class="carousel-item">
              <div class="carousel-caption d-none d-md-block">
                <h2>EXPLORE our Community of artist</h2>
                <p>
                  Custom tunes for any mood, and booking the best artists just
                  got easier with our website!
                </p>
                <a href="/create-song" class="btn btn-primary btn-lg"
                  >Create a song</a
                >
              </div>
            </div>
            <div class="carousel-item">
              <div class="carousel-caption d-none d-md-block">
                <h2>EXPLORE our Community of artist</h2>
                <p>
                  Custom tunes for any mood, and booking the best artists just
                  got easier with our website!
                </p>
                <a href="/create-song" class="btn btn-primary btn-lg"
                  >Create a song</a
                >
              </div>
            </div>
            <div class="carousel-item">
              <div class="carousel-caption d-none d-md-block">
                <h2>EXPLORE our Community of artist</h2>
                <p>
                  Custom tunes for any mood, and booking the best artists just
                  got easier with our website!
                </p>
                <a href="/create-song" class="btn btn-primary btn-lg"
                  >Create a song</a
                >
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#artistBanner"
            data-bs-slide="prev"
          >
            <i class="material-icons"
              ><span class="material-symbols-outlined prev">&#xE5CB;</span></i
            >
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#artistBanner"
            data-bs-slide="next"
          >
            <i class="material-icons"
              ><span class="material-symbols-outlined next">&#xE5CC;</span></i
            >
          </button>
        </div>
      </div>
    </section>

    <section class="artists" id="artists">
      <div class="container">
        <div class="top-level-wrap">
          <h3 class="top-level-tite">Artists</h3>
          <p class="mb-0 sub-heading">
            Collaborate with a professional independent artist to turn your
            story into one-of-a-kind custom song
          </p>
        </div>

        <FilterResults>
          <template #top-filter>
            <div>
              <button class="border-0 d-flex align-items-center btn filter-btn">
                <span class="material-symbols-rounded sort-icon">&#xe164;</span>
                Filter
              </button>
            </div>

            <div class="search">
              <input
                type="text"
                class="form-control"
                placeholder="Search artists"
                v-model="search"
                aria-label="Search artists"
                aria-describedby="button-addon2"
              />
              <button class="btn border-0 search-btn">
                <span class="material-symbols-rounded search-icon"
                  >&#xe8b6;</span
                >
              </button>
            </div>
          </template>

          <template #bottom-filter>
            <!-- <div class="form-group">
              <label>Type of artist</label>
              <select class="form-select" v-model="artist_type" aria-label="Default select example">
                <option value="" selected></option>
                <option v-for="artist_type in artist_types" :key="artist_type.id" :value="artist_type.id">
                {{  artist_type.title }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Artist category</label>
              <select class="form-select" v-model="genre" aria-label="Default select example">
                <option value="" selected></option>
                <option v-for="gen in genres" :key="gen.id" :value="gen.title">{{ gen.title }}</option>
              </select>
            </div> -->

            <div class="form-group">
              <label for="artistType">Type of artist</label>
              <select
                v-model="selectedArtistType"
                class="form-select"
                aria-label="Default select example"
              >
                <option value="" selected>
                  <!-- Select an artist type -->
                </option>
                <option
                  v-for="(type, index) in artistTypes"
                  :key="index"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="artistCategory">Artist category</label>
              <select
                v-model="selectedArtistCategory"
                class="form-select"
                aria-label="Default select example"
              >
                <!-- <option value="" selected disabled>
                  Select an Artist category
                </option> -->
                <option v-if="!selectedArtistCategoryVisible">Select type of artist first</option>
                <optgroup
                  v-if="selectedArtistCategoryVisible"
                >
                  <option
                    v-for="(category, index) in artistCategories[
                      selectedArtistType
                    ]"
                    :key="index"
                  >
                    {{ category }}
                  </option>
                </optgroup>
              </select>
            </div>

            <div class="form-group">
              <label>Location</label>
              <select class="form-select" aria-label="Default select example">
                <option value="" selected>&emsp;</option>
                <option>Naga City</option>
                <option>Legazpi City</option>
              </select>
            </div>

          </template>
          </FilterResults>
      </div>

      <card :artists="artists" @paginate="page++" :showSeeMoreBtn="showSeeMoreBtn" v-if="artists && artists.length > 0"></card>
      <div class="container" v-else>
        <NoEvent noArtist='showNoArtist'/>
      </div>

    </section>

    <reminder />
    <faq />
    <MustSignup />
  </layout>
</template>

<script>
import Layout from '/src/components/Layouts/Layout.vue'
import Reminder from '/src/components/Home/Reminder.vue'
import Card from '/src/components/Artist/Card.vue'
import Faq from '/src/components/Home/FAQ.vue'
import FilterResults from '/src/components/FilterResults.vue'
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
import MustSignup from '/src/components/Artist/MustSignupModal.vue'
import NoEvent from '/src/components/Events/NoEvent.vue'
export default {
  components: {
    layout: Layout,
    faq: Faq,
    reminder: Reminder,
    card: Card,
    FilterResults,
    MustSignup,
    NoEvent
  },
  setup () {
  },
  data () {
    return {
      showNoArtist: true,
      showSeeMoreBtn: true,
      artist_type: null,
      genre: null,
      search: '',
      artist: null,
      artistIndex: 0,
      // per_page: 16,
      page: 1,
      isLoading: false,
      // buttonName: 'SEE MORE ARTIST',
      someIcon: 'play',

      selectedArtistType: '',
      selectedArtistCategory: '',
      artistTypes: [
        { label: 'Visual Artists', value: 'visual' },
        { label: 'Performing Artists', value: 'performing' },
        { label: 'Literary Artists', value: 'literary' },
        { label: 'Digital Artists', value: 'digital' }
      ],
      artistCategories: { visual: ['Painter', 'Sculptors', 'Photographers', 'Mural painter'], performing: ['Disk Jockey', 'Solo artist', 'Band', 'Guitarist', 'Vocalist', 'Bassist', 'Drummer', 'Keyboardist', 'Dancers', 'Actors', 'Spoken Word Artists', 'Host', 'Cosplayers'], literary: ['Writers', 'Poets'], digital: ['Graphics Designers', 'Animators', 'Content writer', 'Copywriters', 'Content creator'] }
    }
  },
  mounted () {
    console.log('Artists:', this.artists)
    this.$store.commit('setArtistProfile')

    this.SET_FILTERED_ARTIST({})
    // this.$store.commit('CLEAR_ARTIST')
    this.artistOptions()
    this.page = 1
    const payload = {}
    if (this.artist_type) payload.artist_type = this.artist_type
    if (this.genre) payload.genre = this.genre
    if (this.search) payload.search = this.search

    this.fetchArtists(payload).then((response) => {
      console.log('Artist.vue: ', response)
    })
  },
  computed: {
    ...mapGetters(['userInfo', 'token', 'isLoggedIn', 'userRole']),
    ...mapState({
      artists: (state) => state.artist.artists,
      artist_types: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genreList,
      filterArtist: (state) => state.artist.filterArtist
    }),
    playIconClass () {
      return this.isPlaying
        ? '/assets/play-pause.svg'
        : '/assets/play-black.svg'
    },
    isPlayingSong () {
      return this.audioPlayer !== null
    },
    volumeIcon () {
      if (this.currentVolume === 0) {
        return 'bi-volume-mute'
      } else if (this.currentVolume < 1) {
        return 'bi-volume-mute'
      } else if (this.currentVolume < 50) {
        return 'bi-volume-down'
      } else {
        return 'bi-volume-up'
      }
    },
    selectedArtistCategoryVisible () {
      return (
        this.selectedArtistType &&
        this.artistCategories[this.selectedArtistType]
      )
    }
  },
  methods: {
    ...mapActions(['fetchArtists', 'artistOptions']),
    ...mapMutations(['SET_FILTERED_ARTIST'])
  },
  watch: {
    page (val) {
      this.showSeeMoreBtn = false
      const payload = {}
      payload.per_page = 12 * val

      if (this.artist_type) payload.artist_type = this.artist_type
      if (this.genre) payload.genre = this.genre
      if (this.search) payload.search = this.search

      this.fetchArtists(payload).then((response) => {
        this.showSeeMoreBtn = true
        console.log('Loaded Artists! : ', response)
      })
    },
    filterArtist (val, prev) {
      if (val.id !== prev?.id) {
        this.currentTime = '0:00'
        this.duration = '0:00'
        this.progressBarWidth = '0%'

        if (this.audioPlayer) {
          console.log('Current Playing song: ', val?.song)
          this.playSong()
        }
      }
    },
    currentVolume () {
      this.updateVolume()
    },
    search (newValue) {
      const payload = {}
      payload.per_page = 12 * this.page
      if (this.artist_type) payload.artist_type = this.artist_type
      if (this.genre) payload.genre = this.genre
      if (newValue) payload.search = newValue

      this.fetchArtists(payload)
    },
    artist_type (newValue) {
      const payload = {}
      payload.per_page = 12 * this.page

      if (newValue) payload.artist_type = newValue
      if (this.genre) payload.genre = this.genre
      if (this.search) payload.search = this.search
      this.fetchArtists(payload)
    },
    genre (newValue) {
      const payload = {}
      payload.per_page = 12 * this.page

      if (this.artist_type) payload.artist_type = this.artist_type
      if (newValue) payload.genre = newValue
      if (this.search) payload.search = this.search

      this.fetchArtists(payload)
    }
  }
}
</script>
