<template>
  <!-- icon with outlined, rounded and sharp will work only on this file using this cdn  -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
  <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" /> -->

  <section class="artist-profile">
    <div class="container">
      <div class="profile-page tx-13">
          <div class="row">
              <div class="col-12 grid-margin">
                  <div class="profile-header">
                      <div class="cover">
                          <div class="gray-shade"></div>
                          <figure>
                              <img src="https://res.cloudinary.com/daorvtlls/image/upload/v1687927640/artist-cover-photo-min_fleelu.webp" class="img-fluid" alt="profile cover">
                          </figure>
                          <div class="row cover-body d-flex justify-content-between align-items-center">
                              <div class="col-9">
                                <div class="profile-info">
                                  <div class="position-relative">
                                  <img class="profile-pic" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="profile">
                                  <!-- https://res.cloudinary.com/daorvtlls/image/upload/v1687927639/artist-profile-1_uhpekp.webp -->
                                    <div class="camera">
                                      
                                      <i class="material-icons"><span class="material-symbols-outlined">&#xE412;</span></i>
                                    </div>
                                  </div>
                                  <div class="profile-wrapper">
                                    <div class="name-artist">
                                      <h3 class="profile-name">Idlepitch</h3>
                                      <h5 class="type-of-artist">Full Band</h5>
                                    </div>
                                    <div class="folow">
                                      <p class="followers">1,254 <br> <span>Followers</span></p> <span class="divider"></span>
                                      <p class="followers">1,254 <br> <span>Following</span></p> <span class="divider"></span>
                                      <p class="followers">385 <br> <span>Playlist</span></p>
                                    </div>
                                    <div class="music-genre">
                                      <h5 class="title">Genres:</h5> 
                                      <span class="badge">Country Rock</span> <span class="badge">Electronic</span> <span class="badge">Rock</span> <span class="badge">Reggae</span>
                                    </div>
                                    </div>
                                  </div>
                              </div>
                              <div class="col-3">
                                                              <!-- <h3 class="profile-name">Amiah Burton</h3> -->
                              <div class="d-none d-md-block text-end edit">
                                <a href="/events" class="btn btn-primary btn-lg">Edit Profile</a>
                              </div>
                              </div>
                          </div>
                      </div>
                      <div class="header-links">
                          <ul class="nav">
                              <li class="nav-item" v-for="item in navItems" :key="item">
                                <a class="nav-link" :class="{ active: item === activeItem }" @click="setActiveItem(item)">
                                  {{ item }}
                                <!-- This badge will show if the number of songs, videos, and photos in the tab is more than zero -->
                                <span v-if="shouldShowBadge(item)" :class="[ 'badge', item === activeItem ? 'orange-badge' : 'text-bg-secondary' ]">{{ getCount(item) }}</span>
                                </a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>

          <div class="row profile-body" v-if="activeItem === 'Post'">
              <!-- left wrapper start -->
              <div class="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
                  <div class="card artist-info">
                      <div class="card-body">
                          <div class="d-flex align-items-center justify-content-between mb-2">
                              <h5 class="card-title mb-0">Information</h5>
                              <div class="edit">
                                  <a href="">Edit</a>
                              </div>
                          </div>
                          <h5 class="about">About</h5>
                          <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris</p>
                          <div class="mt-3 social-media">
                            <i class="material-icons"><span class="material-symbols-outlined calendar">calendar_month</span></i><p class="band-name">IDLEPITCH</p>
                          </div>
                          <div class="mt-3 social-media">
                            <img src="@/assets/social icons/_Spotify.svg" loading="lazy" alt="spotify icon">
                            <p>Full Band Artist</p>
                          </div>
                            <div class="mt-3 social-media">
                              <img src="@/assets/social icons/_YouTube.svg" loading="lazy" alt="spotify icon">
                              <p>youtube.com/@idlepitch</p>
                          </div>
                      </div>
                  </div>

                  <div class="card band-members">
                      <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between header">
                          <div class="d-flex title">
                            <img src="@/assets/artist-account/band-members-icon.svg" loading="lazy" alt="band members icon">
                            <h5 class="card-title mb-0">Band Members</h5>
                          </div>
                          <div class="see-all">
                              <a href="">See all</a>
                          </div>
                        </div>
                                  <!-- Band Members list -->
                         <div class="members-list">
                            <div class="member-profile">
                              <img src="https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png" 
                              loading="lazy" alt="member profile">
                              <div class="member-info">
                              <a href="#">Wade warren</a>
                              <p>Vocalist</p>
                              </div>
                            </div>
                            <div class="more">
                              <a href="#">
                                <i class="material-icons"><span class="material-symbols-outlined">more_vert</span></i>
                              </a>
                            </div>
                         </div>      
                         <div class="members-list">
                            <div class="member-profile">
                              <img src="https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png" 
                              loading="lazy" alt="member profile">
                              <div class="member-info">
                              <a href="#">Brooklyn Simmons</a>
                              <p>Drummer</p>
                              </div>
                            </div>
                            <div class="more">
                              <a href="#">
                                <i class="material-icons"><span class="material-symbols-outlined">more_vert</span></i>
                              </a>
                            </div>
                         </div>    
                    </div>  <!-- end of card-body -->     
                  </div>      
              </div>
              <!-- left wrapper end -->

              <!-- middle wrapper start -->
              <div class="col-md-8 col-xl-6 middle-wrapper">
                <div class="row post">
                  <div class="col-md-12">
                    <div class="card">
                    <div class="card-body">
                      <div class="write-something">
                          <img src="https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png" 
                          loading="lazy" alt="member profile">
                          
                          <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postSomething">
                              Write something...
                            </button>

                      </div>
                      <!-- <hr> -->
                      <div class="post-features">
                        <div class="post-icon">
                          <i class="material-icons"><span class="material-symbols-outlined">sentiment_satisfied</span></i>
                             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postSomething">
                              Feeling
                            </button>
                        </div>
                        <div class="post-icon">
                          <i class="material-icons"><span class="material-symbols-outlined">image</span></i>
                          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postSomething">
                            Photo/Video
                            </button>
                        </div>
                        <div class="post-icon">
                          <i class="material-icons"><span class="material-symbols-outlined">library_music</span></i>
                          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postSomething">
                           Music
                            </button>
                        </div>
                      </div>
                    </div> <!-- end of card-body -->
                  </div>
                  </div>    
                  </div> <!-- end of row post -->
                                              <!-- Modal -->
                  <div class="modal fade" id="postSomething" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          ...
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>

                                       <!-- Artist Posts -->
                  <div class="row artist-post">
                      <div class="col-md-12 grid-margin">
                          <div class="card">
                              <div class="card-header">
                                  <div class="d-flex align-items-center justify-content-between">
                                      <div class="d-flex align-items-center user-posted-info">
                                          <img class="img-xs rounded-circle" src="https://res.cloudinary.com/daorvtlls/image/upload/v1687927639/artist-profile-1_uhpekp.webp" alt="">
                                          <div class="group-posted">
                                              <a href="#" class="name">Mike Popescu</a>
                                              <p class="ago">1 min ago</p>
                                          </div>
                                      </div>
                                      <div class="dropdown">
                                        <i class="material-icons"><span class="material-symbols-outlined">more_vert</span></i>
                                      </div>
                                  </div>
                              </div>
                              <div class="card-body">
                                  <p class="mb-3">Travel and you will born for a second time️️</p>
                                  <div class="posted-img">
                                    <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465778/samples/imagecon-group.jpg" loading="lazy" alt="posted image">
                                  </div>
                              </div>
                              <div class="card-footer d-flex align-items-center justify-content-between">
                                  <div class="d-flex post-actions">
                                    <div class="post-icon">
                                    <i class="material-icons"><span class="material-symbols-outlined">favorite</span></i>
                                      <p>Like</p>
                                    </div>
                                    <div class="post-icon">
                                      <i class="material-icons"><span class="material-symbols-outlined">chat_bubble</span></i>
                                      <p>Comment</p>
                                    </div>
                                  </div>
                                  <div class="comments">
                                    <p>243 comments</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>              <!-- middle wrapper end -->

                                                        <!-- right wrapper start -->
              <div class="d-none d-xl-block col-xl-3 right-wrapper">
                  <div class="row">
                      <div class="col-md-12 grid-margin">
                        <div class="card past-events">
                          <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between header">
                              <div class="d-flex title">
                                <i class="material-icons"> <span class="material-symbols-outlined">event_available</span></i>
                                <h5 class="card-title mb-0">Past Events</h5>
                              </div>
                              <div class="see-all">
                                  <a href="">See all</a>
                              </div>
                            </div>
                                      <!-- Band Members list -->
                            <div class="events-list">
                                <div class="events-info">
                                  <img src="https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png" 
                                  loading="lazy" alt="member profile">
                                  <div class="member-info">
                                  <a href="#">Gig for a cause</a>
                                  <p>Idlepitch</p>
                                  <p class="text-orange">June 24.2023</p>
                                  <p class="text-orange">Saturday, 8:00 am - 12:00 pm</p>
                                  </div>
                                </div>
                                <div class="more">
                                  <a href="#">
                                    <i class="material-icons"><span class="material-symbols-outlined">more_vert</span></i>
                                  </a>
                                </div>
                            </div>    
                            <div class="events-list">
                                <div class="events-info">
                                  <img src="https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png" 
                                  loading="lazy" alt="member profile">
                                  <div class="member-info">
                                  <a href="#">Gig for a cause</a>
                                  <p>Idlepitch</p>
                                  <p class="text-orange">June 24.2023</p>
                                  <p class="text-orange">Saturday, 8:00 am - 12:00 pm</p>
                                  </div>
                                </div>
                                <div class="more">
                                  <a href="#">
                                    <i class="material-icons"><span class="material-symbols-outlined">more_vert</span></i>
                                  </a>
                                </div>
                            </div>   
                        </div>  <!-- end of card-body -->     
                      </div>  

                      </div>
                      <div class="col-md-12 grid-margin">
                          <div class="card rounded">
                              <div class="card-body">
                                  <h6 class="card-title">suggestions for you</h6>
                                  <div class="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                      <div class="d-flex align-items-center hover-pointer">
                                          <img class="img-xs rounded-circle" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                          <div class="ml-2">
                                              <p>Mike Popescu</p>
                                              <p class="tx-11 text-muted">12 Mutual Friends</p>
                                          </div>
                                      </div>
                                      <button class="btn btn-icon">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus" data-toggle="tooltip" title="" data-original-title="Connect">
                                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                              <circle cx="8.5" cy="7" r="4"></circle>
                                              <line x1="20" y1="8" x2="20" y2="14"></line>
                                              <line x1="23" y1="11" x2="17" y2="11"></line>
                                          </svg>
                                      </button>
                                  </div>
                                  <div class="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                      <div class="d-flex align-items-center hover-pointer">
                                          <img class="img-xs rounded-circle" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                          <div class="ml-2">
                                              <p>Mike Popescu</p>
                                              <p class="tx-11 text-muted">12 Mutual Friends</p>
                                          </div>
                                      </div>
                                      <button class="btn btn-icon">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus" data-toggle="tooltip" title="" data-original-title="Connect">
                                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                              <circle cx="8.5" cy="7" r="4"></circle>
                                              <line x1="20" y1="8" x2="20" y2="14"></line>
                                              <line x1="23" y1="11" x2="17" y2="11"></line>
                                          </svg>
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- right wrapper end -->
          </div>
          <div class="row profile-body" v-if="activeItem === 'About'">
            <h2>About po</h2>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Songs'">
            <h2>Songs po</h2>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Videos'">
            <h2>Videos po</h2>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Photos'">
            <h2>Photos po</h2>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Events'">
            <h2>Events po</h2>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Reviews'">
            <h2>Reviews po</h2>
          </div>
          
          
      </div>
    </div>
  </section>

  <section class="artist-data">
    <div class="container">
      <p><strong>Artist:</strong> {{ artist }}</p> 
      <div>
        <p class="user"><strong>User:</strong> {{  profile }}</p>
      </div>
      <p><strong>Member:</strong> {{ members }}</p>
    </div>
  </section>
  <post />
</template>
<script>
// import Layout from '@/components/Layouts/ArtistLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    // layout: Layout,
    // post: Post,

  },
  data()
  {
    return {
      form: {
        
      },
      errors: {

      },
      navItems: ['Post', 'About', 'Songs', 'Videos', 'Photos', 'Events', 'Reviews'],
      activeItem: 'Post',
      post: ['Post 1', 'Post 2','Post 1', 'Post 2','Post 1', 'Post 2'],
      songs: ['https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
      'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
    ],
      videos:['https://video.wixstatic.com/video/8fd47a_61de9ebf0ad64f0fa93d72e4279551f7/1080p/mp4/file.mp4'],
      photos:['@/assets/home/birthdays.webp', '@/assets/home/birthdays.webp', '@/assets/home/birthdays.webp', '@/assets/home/birthdays.webp', '@/assets/home/birthdays.webp']

    }
  },
  setup()
  {

  },
  props: {
    
  },
  mounted()
  {
    this.fetchArtistOptions().then(response =>
    {

    })
  },
  methods: {
    ...mapActions([
      'retrieveArtists', 'fetchArtistOptions',
    ]),
    submit()
    {

      // this.signin(this.form).then((response) =>
      // {

      //   const { status } = response;

      //   var user = this.$store.state.user;
      //   var role = this.$store.state.role;

      //   if (role === 'artists') {
      //     this.$router.push("/artist");
      //   }

      // });
      

    },
    setActiveItem(item) {
    this.activeItem = item;
  },
  shouldShowBadge(item) {
    return item === 'Post' && this.post.length > 0 ||
           item === 'Songs' && this.songs.length > 0 ||
           item === 'Videos' && this.videos.length > 0 ||
           item === 'Photos' && this.photos.length > 0;
  },
    getCount(item) {
      switch (item) {
        case 'Post':
          return this.post.length;
        case 'Songs':
          return this.songs.length;
        case 'Videos':
          return this.videos.length;
        case 'Photos':
          return this.photos.length;
        default:
          return 0;
      }
    }

  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      users: (state)    => state.user,
      profile: (state)  => state.profile,
      role: (state)     => state.role,
      artist: (state)   => state.artist.artist,
      members: (state)  => state.artist.members,
    }),
  }
}
</script>

<style>
@import '@/assets/css/artist-ui.css';
</style>

