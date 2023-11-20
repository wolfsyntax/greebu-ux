<template>
  <div class="card">
    <img :src="artist.avatar" class="card-img-top img-fluid" loading="lazy" alt="Trending Artist" @error="imageUrlAlt" />
    <div class="middle">
      <button class="btn btn-primary" @click="openModal" data-bs-toggle="modal" data-bs-target="#artistModal"> View Details</button>
    </div>
    <div class="card-body">
      <div class="artist">
        <h5 class="card-title">{{ artist.artist_name }}</h5>
        <h6 class="card-text">{{ artist.artist_type }}</h6>
        <p class="d-flex align-items-center artist-reviews-wrap">
          <span class="material-symbols-sharp star-icon">&#xe838;</span>
           {{ artist.ratings }} <span class="reviews">({{ artist.reviews }} reviews)</span>
          </p>

          <!-- <button type="button" class="btn" @click="toggleControls(artist)">
            <span class="material-symbols-sharp play-icon" v-if="!switchIcon">&#xe037;</span>
            <span class="material-symbols-sharp play-icon" v-else>&#xe034;</span>
          </button> -->

      </div>
      <div class="audio-btn">
        <div class="play-btn">
          <div class="play-btn">
            <div class="play-btn">
              <i :class="{
                'bi bi-play-circle-fill play-icon': !showControls || (showControls && currentIndex !== itemIndex),
                'bi bi-pause-circle-fill play-icon': showControls && currentIndex === itemIndex
              }" @click="toggleControls(artist)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-if="cardType !== 'page'" class="btn btn-primary select" @click="selectArtist(artist)" :class="{ 'selected': artist === chosenArtist }" >
      {{ changeSelectArtist(artist) }}
    </button>    
    <!-- <h3><b>Artist details</b> - {{ artist }}</h3>   -->
  </div>
  <artistdetails :selectedArtist="artist"></artistdetails>
</template>
<script>
import Layout from '/src/components/Layouts/Layout.vue';
import ArtistDetails from '/src/components/Artist/ArtistDetails.vue';

export default {
 components: {
    artistdetails: ArtistDetails
  },
  setup() {
    
  },
  data() {
    return {
      showControls: false,
      defaultImage: "https://res.cloudinary.com/daorvtlls/image/upload/v1686649067/trending-bicolano-artist-2_ljhog8.png",
      switchIcon: 'play'
    }
  },
  props: {
    cardType: { 
      type: String,
      default: 'page',
      required: true
    },
    artist: Object,
    cardIndex: Number,
    switchIcon: Boolean,
    //switchPlayIcon: String
   // pauseSong: Object
  },
  methods: {
    openModal(){
      
      this.$store.commit('SET_ARTIST', this.artist);

      // this.$root.$emit("bv::show::modal", "#artistModal");
    },
    imageUrlAlt(event)
    {
      event.target.src = "https://res.cloudinary.com/daorvtlls/image/upload/v1686649067/trending-bicolano-artist-2_ljhog8.png"
    },
    toggleControls(index = null)
    {
      this.$store.commit('SET_FILTERED_ARTIST', this.artist);
      console.log('Toggle Play: ', this.artist);
      this.$emit('play', index, this.cardIndex, this.switchIcon);
     // this.$emit('change-icon', this.switchIcon);
    }
  },
}
</script>

<style scoped>
#ShowArtists .card{
  margin-bottom: 2rem;
}
/* Large (lg) and Extra large (xl) */
@media (min-width: 992px) and (max-width: 1399.98px) {
  #ShowArtists .card{
  margin-bottom: 1.5rem;
}
}

</style>