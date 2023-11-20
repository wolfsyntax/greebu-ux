<template>
  <div class="modal fade artist-modal" id="artistModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header border-0">
          <CloseModalButton />
        </div>
        <div class="modal-body">

            <div class="d-flex align-items-start artist-wrap">
              <div class="artist-image-wrap">
                <img :src="artist?.avatar" class="artist-image" alt="artist image">
              </div>

              <div class="text-start about-artist-wrap">
                <div class="artist-bio">

                  <div class="name-wrap">
                    <h3 class="two-lines artist-name">{{ artist?.artist_name }}</h3>
                    <h5 class="mb-0 two-lines artist-type">{{ artist?.artist_type }}</h5>
                  </div>

                  <div class="rating-reviews-wrap">
                    <p class="mb-0 d-flex d-flex align-items-center">
                      <span class="material-symbols-sharp star-icon">&#xe838;</span> 
                      <span class="ratings">{{ artist?.ratings }} 4.95 </span> 
                      <span class="reviews">({{ artist?.reviews }} reviews)</span>
                    </p>
                  </div>

                  <div class="d-flex d-flex align-items-center genres-wrap">
                    <button type="button" class="btn btn-primary" v-for="genre in artist?.genres" :key="genre">
                      <span class="badge">{{ genre }}</span>
                    </button>
                  </div>

                  <div class="d-flex align-items-center follow-wrap">
                    <div class="followers">
                      <h6>{{ artist?.follower || 0 }}</h6>
                      <div>
                        <p>Followers</p>
                      </div>
                    </div>

                    <div class="following">
                      <h6>{{ artist?.following || 0 }}</h6>
                      <div>
                        <p>Following</p>
                      </div>
                    </div>

                    <div class="playlist">
                      <h6>{{ artist?.song_requests || 0 }}</h6>
                      <div>
                        <p>Playlist</p>
                      </div>
                    </div>
                  </div>

                  <!-- <p class="content">{{ artist?.bio }}</p> -->
                  <div>
                    <a :href="`/artists/${artist?.id}`" class="view-profile" @click="fetchProfile()" >View Profile</a>
                  </div>

                </div> <!-- end of artist-bio -->
              </div>
            </div> <!-- end of artist-wrap -->

            <div class="sample-song-wrap">
              <h3 class="text-start sample-songs">Sample Songs</h3>

              <div class="d-flex align-items-center justify-content-between songs-list-wrap">

                <div class="d-flex align-items-center song-details-wrap">
                  <div>
                    <!-- <img :src="artist?.avatar" class="artist-song-cover" alt="artist image"> -->
                    <img src="/assets/artist-account/song-cover1.webp" class="artist-song-cover" alt="artist image">
                  </div>
                  <div class="text-start">
                    <!-- <h5 class="artist-song" >{{ artist?.songName }}</h5>
                    <p class="artist-band" >{{ artist?.name }}</p> -->
                    <h5 class="two-lines artist-song">Golden age of 80s</h5>
                    <p class="two-lines artist-band">Idlepitch</p>
                  </div>
                </div>

                <div class="d-flex align-items-center play-wrap">
                  <div>
                    <button class="btn p-0 border-0 d-flex align-items-center justfy-content-center play-btn">
                      <span class="material-symbols-sharp play-icon">&#xe037;</span>
                    </button>
                  </div>
                  <div class="like">
                    <button class="btn d-flex align-items-center p-0 border-0 likes">
                      <span class="material-symbols-sharp heart-icon">&#xe87d;</span>
                      238
                    </button>
                  </div>
                </div>

              </div> <!-- end of sample-songs-list -->
            </div> <!-- sample-song-wrap -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import CloseModalButton from '../CloseModalButton.vue';

export default {
  created () {
    this.setArtistProfile();
  },
  components: { CloseModalButton },
  props: {
    // selectedArtist: {
    //   type: Object,
    //   required: true
    // },
  },
  data()
  {
    return {
    }
  },
  computed: {
    ...mapState({
      artist: state => state.artist.artist,
      account: (state) => state.account,
      custom_genre: (state) => state.custom_genre,
      genres: (state) => state.artist.genres,
    })
  },
  methods: {
    ...mapMutations(['setArtistProfile', ]),
    fetchProfile() {
      this.setArtistProfile(this.artist);
      // this.fetchArtistById(this.$route.params?.id)
      //   .then(res => {
      //     const { status: statusCode, data: { status } } = res
      //     if (statusCode === 203) {
      //       if (status === 404) this.$router.push({name: 'page-error-404'})
      //       else this.$router.push({name: 'page-error-500'});
      //     }
      //   });
    }
  },
  
};
</script>
  
<style scoped>
@import '@/assets/css/artist-ui.css';
</style>
