<template>
  <layout>

    <section class="library">
      <div class="container">

        <div class="top-wrapper">
            <h2 class="mb-0 top-level-title">Library</h2>
      </div>

      <ul class="nav nav-tabs">
        <li
          v-for="item in navItems"
          :key="item"
          :class="{ 'active': activeItem === item }"
          @click="activeItem = item">
          {{ item }}
          <!-- <span class="total" v-if="item === 'Featured Artist' && origSongArray.length > 0">{{ origSongArray.length }}</span> -->
        </li>
      </ul>

      <div v-if="activeItem === 'Featured Artist'" class="tab-pane active">

        <!-- <NoLibrary :title="FeaturedArtistTitle" :showFeaturedArtistBtn="true"/> -->

         <!-- Show Artists -->
         <div id="ShowArtistLists">
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-3" v-for="(artist, itemIndex) in artists" :key="itemIndex">

                  <div class="card">
                    <img :src="artist.avatar" class="card-img-top img-fluid" loading="lazy" alt="Trending Artist"/>
                    <div class="middle">
                      <button class="btn btn-primary" @click="openModal" data-bs-toggle="modal" data-bs-target="#artistModal">View Details</button>
                    </div>
                    <div class="card-body">

                      <div>

                        <div class="artist">
                          <h5 class="card-title">{{ artist.artist_name }}</h5>
                          <h6 class="card-text">{{ artist.artist_type }}</h6>
                          <p class="d-flex align-items-center artist-reviews-wrap">
                            <span class="material-symbols-sharp star-icon">&#xe838;</span>
                            {{ artist.ratings }} <span class="reviews">({{ artist.reviews }} reviews)</span>
                            </p>

                        </div>
                        <div class="audio-btn">
                          <div class="play-btn">
                            <!-- <button type="button" class="btn border-0" @click="playArtistSongs(itemIndex)">
                              <span class="material-symbols-sharp">&#xe1c4;</span>
                            </button> -->
                            <button type="button" class="btn border-0">
                              <span class="material-symbols-sharp">&#xe1c4;</span>
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>

                    <ArtistDetails/>
                  </div>

                </div>
              </div>
        </div>

      </div> <!-- end of Featured Artist tab-->

      <div v-else-if="activeItem === 'Events Video'" class="tab-pane">

        <NoLibrary :title="EventsVideoTitle" :showEventVideosBtn="true" />

      </div> <!-- end of Events Video tab-->

      <div v-else-if="activeItem === 'Created Events'" class="tab-pane">

        <NoLibrary :title="createdEventsTitle" :showCreatedEventsBtn="true" />

        <!-- <MyEvents /> -->
      </div>

    </div>
    </section>

    <info-modal :usage="modelType" />
  </layout>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import InfoModal from '@/components/Artist/Library/InfoModal.vue'
import Layout from '/src/components/Layouts/Layout.vue'
import NoLibrary from '/src/components/NoLibrary.vue'
import ArtistDetails from '/src/components/Artist/ArtistDetails.vue'

export default {
  components: {
    InfoModal,
    layout: Layout,
    NoLibrary,
    ArtistDetails
  },
  props: {
    artist: Object
  },
  data () {
    return {
      createdEventsTitle: 'No Song Uploaded Events',

      navItems: ['Featured Artist', 'Events Video', 'Created Events'],
      activeItem: 'Featured Artist',

      FeaturedArtistTitle: 'No featured artist to display',
      EventsVideoTitle: 'No videos to display'
      //  createdEventsTitle: 'No events to display',
    }
  },
  mounted () {
  },

  created () {

  },
  computed: {
    ...mapState({
      user: state => state.user,
      artists: (state) => state.artist.artists
    }),
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions([
      'fetchArtists', 'artistOptions'
    ]),

    openModal () {
      this.$store.commit('SET_ARTIST', this.artist)
    }

  }

}
</script>

<style scoped>

#ShowArtistLists{
  position: relative;
}

#ShowArtistLists .row{
  width: 99.99%;
  margin: 1.25rem auto 5rem;
}

#ShowArtistLists .card{
  position: relative;
  border-radius: 0.69969rem;
  background: var(--white);
  box-shadow: 0px 0px 19px 0px rgba(18, 18, 18, 0.1);
  border: none;
  display: inline-flex;
  padding: 1.25rem;
  max-width: 100%;
  margin-bottom: 2rem;
}
#ShowArtistLists .card .card-img-top{
  position: relative;
  width: 19.375rem;
  height: 18.08744rem;
  margin-bottom: 1.438rem;
  left: 0;
  transition: 0.5s ease;
  backface-visibility: hidden;
}
#ShowArtistLists .middle{
  width: 100%;
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
#ShowArtistLists .middle button{
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  letter-spacing: 0.46px;
  color: var(--white);
  padding: 0.75rem 3rem;
  border: solid 2px var(--white);
  text-decoration: none;
  background-color: transparent;
}
#ShowArtistLists .card:hover .middle {
    opacity: 1;
}
#ShowArtistLists .card .card-body{
  width: 100%;
  padding: 0px 0.2rem 0px;
}
#ShowArtistLists .card .artist {
  width: 80%;
  float: left;
  text-align: left;
}
#ShowArtistLists .card .card-title{
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.5rem;
  letter-spacing: 0.05em;
  color: var(--black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#ShowArtistLists .card .card-text{
  font-weight: 600;
  font-size: 1rem;
  line-height: 100%;
  letter-spacing: 0.05em;
  color: var(--gray6);
  margin-bottom: 0.875rem;
}
#ShowArtistLists .card .artist-reviews-wrap{
  gap: 0.4rem;
  font-weight: 800;
  font-size: 1rem;
  line-height: 0.688rem;
  color: var(--p-color3);
  margin-bottom: 0;
  text-align: left;
}
#ShowArtistLists .card p .star-icon{
  font-size: 1.5rem;
  color: var(--orange);
  font-variation-settings: "FILL" 1, "wght" 800, "GRAD" 0, "opsz" 48;
}
#ShowArtistLists .card .artist-reviews-wrap .reviews{
  font-weight: 400;
  font-size: 1rem;
  line-height: 0.875rem;
  color: var(--gray6);
}
#ShowArtistLists .audio-btn{
  width: 20%;
  float: right;
}
#ShowArtistLists .audio-btn .play-btn{
  text-align: right;
  margin-top: 1rem;
}
#ShowArtistLists .audio-btn .play-btn button{
  padding: 0;
}
#ShowArtistLists .audio-btn .play-btn span{
  font-size: 3.5em;
  line-height: 0.25rem;
  color: var(--orange);
  cursor: pointer;
  font-variation-settings: 'FILL' 1,'wght' 800,'GRAD' 0,'opsz' 48;
  transition: font-variation-setings 0.25s;
}
#ShowArtistLists .audio-btn .play-btn:hover span{
  color: var(--btn-hovered);
  transition: font-variation-setings 0.25s;
}
/* #ShowArtistLists .audio-btn .play-btn i{
  font-size: 3.5em;
  line-height: 0.25rem;
  color: var(--orange);
  cursor: pointer;
} */

                                                                  /* MEDIA QUERIES */

/* Large (lg) and Extra large (xl) */
@media (min-width: 992px) and (max-width: 1399.98px) {
#ShowArtistLists .card{
  padding: 1.25rem 1.25rem 0.5rem;
  margin-bottom: 1.5rem;
}
#ShowArtistLists .card .card-img-top{
  height: 13.625rem;
  margin-bottom: 0.625rem;
}
#ShowArtistLists .middle button{
  font-size: 0.87rem;
  line-height: 1rem;
}

#ShowArtistLists .card .card-body{
  padding: 0.5rem 0.375rem 0.5rem;
}
#ShowArtistLists .card .card-title{
  font-size: 0.875rem !important;
  font-style: normal !important;
  font-weight: 600 !important;
  line-height: normal !important;
  line-height: 100%;
  letter-spacing: 0.0625rem;
  width: 95%;
}
#ShowArtistLists .card .card-text{
  font-size: 0.6875rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
  letter-spacing: -0.00688rem;
  margin-bottom: 0.63rem;
}
#ShowArtistLists .card .artist-reviews-wrap{
  gap: 0.2rem;
  font-size: 0.775rem !important;
}
#ShowArtistLists .card p .star-icon{
  font-size: 1rem;
}
#ShowArtistLists .card .artist-reviews-wrap .reviews{
  font-size: 0.75rem;
}
#ShowArtistLists .audio-btn .play-btn i{
  font-size: 2.3rem;
}
#ShowArtistLists .audio-btn .play-btn span{
  font-size: 2.5em;
}

}

</style>
