<template>
    <div>
      <section class="artist-details-modal">
        <div class="container">
        </div>

                         <!-- MODAL / VIEW ARTIST -->

    <div class="modal fade artist-modal" id="artistModal" tabindex="-1" aria-labelledby="artistModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="selectedArtist">
            <div class="row top-row">
              <div class="d-flex align-items center artist-wrap">
              <div class="artist-image-wrap">
                <img :src="selectedArtist['avatar']" class="artist-image" alt="artist image">
              </div>
              <div class="about-artist-wrap">
                <div class="artist-bio">
                  <h2 >{{ selectedArtist['artist_name'] }}</h2>
                  <h5>{{ selectedArtist['artist_type'] }}</h5>
                  <div class="follow" v-if="selectedArtist">
                    <div class="followers">
                      <h6>{{ selectedArtist['follower'] || 0 }}</h6>
                      <div>
                        <p>Followers</p>
                      </div>
                    </div>
                    <div class="following">
                      <h6>{{ selectedArtist['following'] || 0 }}</h6>
                      <div>
                        <p>Following</p>
                      </div>
                    </div>
                    <div class="playlist">
                      <h6>{{ selectedArtist['song_requests'] || 0 }}</h6>
                      <div>
                        <p>Playlist</p>
                      </div>
                    </div>
                  </div>
                  <div class="genres">
                    <p>Genres:</p>
                    <span class="badge" >{{ selectedArtist['genre'] }}</span>
                  </div>
                  <div class="rating-reviews">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.4721 1.62471C11.6383 1.11332 12.3617 1.11332 12.5279 1.62471L14.5695 7.90825C14.6439 8.13695 14.857 8.2918 15.0974 8.2918H21.7044C22.2421 8.2918 22.4656 8.97987 22.0306 9.29592L16.6855 13.1794C16.491 13.3207 16.4096 13.5712 16.4839 13.7999L18.5255 20.0835C18.6917 20.5949 18.1064 21.0201 17.6714 20.7041L12.3263 16.8206C12.1317 16.6793 11.8683 16.6793 11.6737 16.8206L6.32864 20.7041C5.89362 21.0201 5.30832 20.5949 5.47448 20.0835L7.51612 13.7999C7.59043 13.5712 7.50903 13.3207 7.31448 13.1794L1.96938 9.29592C1.53437 8.97987 1.75794 8.2918 2.29564 8.2918H8.90255C9.14302 8.2918 9.35614 8.13695 9.43045 7.90825L11.4721 1.62471Z" fill="#FF6B00"/></svg>
                    <p >{{ selectedArtist['ratings'] }} <span class="reviews" v-if="selectedArtist">({{ selectedArtist['reviews'] }} reviews)</span></p>
                  </div>
                  <p class="content">{{ selectedArtist['bio'] }}</p>
                  <a :href="`/artists/${selectedArtist['id']}`" class="view-profile">View Profile</a>
                </div> <!-- end of artist-bio -->
              </div>
            </div>
            </div> <!-- end of row -->
            <h3 class="sample-songs">Sample Songs</h3>
            <div class="d-flex justify-content-between sample-songs-list">
              <div class="right" v-if="selectedArtist">
                <img :src="selectedArtist.avatar" class="artist-cover" alt="artist image">
                <div>
                  <h5 class="artist-song" v-if="selectedArtist">{{ selectedArtist.songName }}</h5>
                  <p class="artist-band" v-if="selectedArtist">{{ selectedArtist.name }}</p>
                </div>
              </div>
              <div class="left">
                <p class="song-duration">2:45</p>
                <div class="like">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_3054_29369)">
                    <path d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z" fill="#8690A2"/>
                  </g><defs><clipPath id="clip0_3054_29369"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
                  <p>238</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      </section>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        selectedArtist: {
      type: Object,
      required: true
    },
  },
    data()
    {
      return {
      }
    },
    methods: {

  },
  
  };
  </script>
  
  <style scoped>

</style>