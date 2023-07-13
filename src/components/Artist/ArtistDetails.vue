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
          <div class="modal-body">
            <div class="row top-row">
              <div class="col-md-5" v-if="selectedArtist">
                <img :src="selectedArtist.image" class="artist-image" alt="artist image">
              </div>
              <div class="col-md-7">
                <div class="artist-bio">
                  <h2 v-if="selectedArtist">{{ selectedArtist.name }}</h2>
                  <h5 v-if="selectedArtist">{{ selectedArtist.typeOfArtist }}</h5>
                  <div class="follow">
                    <div class="followers">
                      <h6>1,254</h6>
                      <div>
                        <p>Followers</p>
                      </div>
                    </div>
                    <div class="following">
                      <h6>1,254</h6>
                      <div>
                        <p>Following</p>
                      </div>
                    </div>
                    <div class="playlist">
                      <h6>385</h6>
                      <div>
                        <p>Playlist</p>
                      </div>
                    </div>
                  </div>
                  <div class="genres">
                    <p>Genres:</p>
                    <span class="badge" v-if="selectedArtist">{{ selectedArtist.genre }}</span>
                  </div>
                  <div class="rating-reviews">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.4721 1.62471C11.6383 1.11332 12.3617 1.11332 12.5279 1.62471L14.5695 7.90825C14.6439 8.13695 14.857 8.2918 15.0974 8.2918H21.7044C22.2421 8.2918 22.4656 8.97987 22.0306 9.29592L16.6855 13.1794C16.491 13.3207 16.4096 13.5712 16.4839 13.7999L18.5255 20.0835C18.6917 20.5949 18.1064 21.0201 17.6714 20.7041L12.3263 16.8206C12.1317 16.6793 11.8683 16.6793 11.6737 16.8206L6.32864 20.7041C5.89362 21.0201 5.30832 20.5949 5.47448 20.0835L7.51612 13.7999C7.59043 13.5712 7.50903 13.3207 7.31448 13.1794L1.96938 9.29592C1.53437 8.97987 1.75794 8.2918 2.29564 8.2918H8.90255C9.14302 8.2918 9.35614 8.13695 9.43045 7.90825L11.4721 1.62471Z" fill="#FF6B00"/></svg>
                    <p v-if="selectedArtist">{{ selectedArtist.ratings }} <span class="reviews" v-if="selectedArtist">({{ selectedArtist.reviews }} reviews)</span></p>
                  </div>
                  <p class="content">Lorem ipsum dolor sit amet consectetur. Quam sit elit lectus gravida urna.</p>
                  <a href="/artist" class="view-profile">View Profile</a>
                </div> <!-- end of artist-bio -->
              </div>
            </div> <!-- end of row -->
            <h3 class="sample-songs">Sample Songs</h3>
            <div class="d-flex justify-content-between sample-songs-list">
              <div class="right" v-if="selectedArtist">
                <img :src="selectedArtist.image" class="artist-cover" alt="artist image">
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

  /* artist modal */
.artist-details-modal .artist-modal .modal-content{
  border-radius: 0.625rem;
  background: #FFF;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.artist-details-modal .artist-modal .btn-close{
  background-image: url("/assets/create-song/close-modal.svg");
  background-size: cover;
}
.artist-details-modal .artist-modal .btn-close:hover{
  background-image: url("/assets/create-song/close-modal-hover.svg");
  background-size: cover;
}
.artist-details-modal .artist-modal .modal-body{
  padding: 1rem 4rem 4rem;
}
.artist-details-modal .artist-modal .modal-header{
  border-bottom: none;
  padding-right: 2rem;
  padding-top: 2rem;
}
.artist-details-modal .artist-modal .modal-body .artist-image{
  width: 24.875rem;
  height: 25.0625rem;
  border-radius: 0.625rem;
  position: relative;
  -o-object-fit: cover;
  object-fit: cover;
  backface-visibility: hidden;
}
.artist-details-modal .artist-modal .modal-body .top-row{
  margin-bottom: 2.5rem;
}
.artist-details-modal .artist-modal .modal-body .artist-bio h2{
  color: var(--color-dark-dark, #23262F);
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 0.5rem;
}
.artist-details-modal .artist-modal .modal-body .artist-bio h5{
  color: var(--color-dark-dark, #23262F);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 1.25rem;
}
.artist-details-modal .artist-modal .follow{
  display: flex;
  position: relative;
  margin-bottom: 1.25rem;
}
.artist-details-modal .artist-modal .follow h6{
  color: var(--tail-grids-black-color, #212B36);
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
  margin-bottom: 0;
}
.artist-details-modal .artist-modal .follow .followers {
  padding-right: 1.12rem;
}
.artist-details-modal .artist-modal .follow .following {
  border-right: 1px solid #E7E7E7;
  border-left: 1px solid #E7E7E7;
  padding: 0 1.12rem;
  height: 2.26rem
}
.artist-details-modal .artist-modal .follow .playlist {
  padding-left: 1.12rem;
}
.artist-details-modal .artist-modal .follow p{
  color: #637381;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  margin-bottom: 0;
}
.artist-details-modal .artist-modal .genres{
  display: flex;
  align-items: center;
  margin-bottom: 1.38rem;
}
.artist-details-modal .artist-modal .genres p{
  color: #637381;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin-bottom: 0;
  margin-right: 0.75rem;
}
.artist-details-modal .artist-modal .genres .badge{
  color: var(--orange);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
  background-color: var(--light-orange);
  margin-right: 0.5rem;
}
.artist-details-modal .artist-modal .rating-reviews{
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
}
.artist-details-modal .artist-modal .rating-reviews p{
  color: var(--p-color3);
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 0.69381rem;
  margin-bottom: 0;
  margin-left: 0.25rem;
}
.artist-details-modal .artist-modal .rating-reviews p .reviews{
  color: #8C8C8C;
  font-weight: 400;
  line-height: 0.84375rem;
}
.artist-details-modal .artist-modal .modal-body .artist-bio .content{
  color: #B8BBCF;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.625rem;
  margin-bottom: 2.5rem;
}
.artist-details-modal .artist-modal .modal-body .artist-bio .view-profile{
  color: var(--white);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
  padding: 1rem 3rem;
  background-color: var(--orange);
  border: 0;
  text-decoration: none;
  border-radius: .5rem;
}
.artist-details-modal .artist-modal .modal-body .sample-songs{
  color: var(--black);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 120%;
  margin-bottom: 1.25rem;
}
.artist-details-modal .artist-modal .modal-body .sample-songs-list {
  padding: 0.87rem 1rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0px 0px 24px 0px rgba(56, 29, 219, 0.07);
  margin-bottom: 0.94rem;
}
.artist-details-modal .artist-modal .modal-body .sample-songs-list .right,
.artist-details-modal .artist-modal .modal-body .sample-songs-list .left{
  display: flex;
  align-items: center;
}
.artist-details-modal .artist-modal .modal-body .sample-songs-list .artist-cover{
  width: 3.9375rem;
  height: 3.9375rem;
  border-radius: 0.625rem;
  position: relative;
  -o-object-fit: cover;
  object-fit: cover;
  backface-visibility: hidden;
  margin-bottom: 0rem;
  margin-right: 0.87rem;
}
.artist-details-modal .artist-modal .modal-body .sample-songs-list .right .artist-song{
  color: var(--black);
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.02rem;
  margin-bottom: 0.31rem;
}
.artist-details-modal .artist-modal .modal-body .sample-songs-list .right .artist-band{
  color: var(--black);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.0175rem;
  margin-bottom: 0;
}
.artist-details-modal .artist-modal .modal-body .sample-songs-list .left p{
  color: var(--black);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0175rem;
  margin-bottom: 0;
}
.artist-details-modal .artist-modal .modal-body .sample-songs-list .left .song-duration{
  margin-right: 1.5rem;
}
.artist-details-modal .artist-modal .modal-body .sample-songs-list .left svg{
  margin-right: 0.25rem;
}
.artist-details-modal .artist-modal .modal-body .sample-songs-list .left .like{
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

</style>