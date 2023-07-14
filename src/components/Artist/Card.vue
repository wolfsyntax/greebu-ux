<template>
  <div class="card">
    <img :src="artist.image" class="card-img-top img-fluid" loading="lazy" alt="Trending Artist" @error="imageUrlAlt" />
    <div class="middle">
      <!-- <button class="btn btn-primary" @click="openModal" data-bs-toggle="modal" data-bs-target="#artistModal"> View Details</button> -->
      <a href="/artist"> View Profile</a>
    </div>
    <div class="card-body">
      <div class="artist">
        <h5 class="card-title">From component - {{ artist.name }}</h5>
        <h6 class="card-text">{{ artist.typeOfArtist }}</h6>
        <p><img src="https://res.cloudinary.com/daorvtlls/image/upload/v1687321042/rating-star-small_axozjd.svg" alt="rating-star">
           {{ artist.ratings }} <span>({{ artist.reviews }} reviews)</span></p>
      </div>
      <div class="audio-btn">
        <div class="play-btn">
          <div class="play-btn">
            <div class="play-btn">
              <i :class="{
                'bi bi-play-circle-fill play-icon': !showControls || (showControls && currentIndex !== itemIndex),
                'bi bi-pause-circle-fill play-icon': showControls && currentIndex === itemIndex
              }" @click="artistsongtoplay(itemIndex)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <artistdetails></artistdetails> -->
</template>
<script>
import Layout from '/src/components/Layouts/Layout.vue';
import ArtistDetails from '/src/components/Artist/ArtistDetails.vue';

export default {
  props: {
    artist: Object
  },
  // props: ['name','image','typeOfArtist','ratings','reviews'],
  // props: {
  //   artist: {
  //     type: Array,
  //     required: true
  //   }
  // },
  // props: ['artist'],
 components: {
    layout: Layout,
    artistdetails: ArtistDetails
  },
  setup() {
    
  },
  data() {
    return {
      defaultImage: "https://res.cloudinary.com/daorvtlls/image/upload/v1686649067/trending-bicolano-artist-2_ljhog8.png",
    }
  },
  methods: {
    artistsongtoplay() {
      this.$emit('artistsongtoplay');
    },
    openModal(data){
        this.$root.$emit("bv::show::modal", "#artistModal");
      },
    imageUrlAlt(event)
    {
      console.log('Image Url: ', event)
      event.target.src = "https://res.cloudinary.com/daorvtlls/image/upload/v1686649067/trending-bicolano-artist-2_ljhog8.png"
    },
  },
}
</script>