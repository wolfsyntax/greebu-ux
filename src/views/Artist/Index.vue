<template>
  
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
                  <div class="card">
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
                            <i class="spotify"></i><p>Full Band Artist</p>
                          </div>
                          <div class="mt-3 social-media">
                            <i class="youtube"></i><p>youtube.com/@idlepitch</p>
                          </div>
                          
                      </div>
                  </div>
              </div>
              <!-- left wrapper end -->
              <!-- middle wrapper start -->
              <div class="col-md-8 col-xl-6 middle-wrapper">
                  <div class="row">
                      <div class="col-md-12 grid-margin">
                          <div class="card rounded">
                              <div class="card-header">
                                  <div class="d-flex align-items-center justify-content-between">
                                      <div class="d-flex align-items-center">
                                          <img class="img-xs rounded-circle" src="https://res.cloudinary.com/daorvtlls/image/upload/v1687927639/artist-profile-1_uhpekp.webp" alt="">
                                          <div class="ml-2">
                                              <p>Mike Popescu</p>
                                              <p class="tx-11 text-muted">1 min ago</p>
                                          </div>
                                      </div>
                                      <div class="dropdown">
                                          <button class="btn p-0" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal icon-lg pb-3px">
                                                  <circle cx="12" cy="12" r="1"></circle>
                                                  <circle cx="19" cy="12" r="1"></circle>
                                                  <circle cx="5" cy="12" r="1"></circle>
                                              </svg>
                                          </button>
                                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                              <a class="dropdown-item d-flex align-items-center" href="#">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-meh icon-sm mr-2">
                                                      <circle cx="12" cy="12" r="10"></circle>
                                                      <line x1="8" y1="15" x2="16" y2="15"></line>
                                                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                                  </svg> <span class="">Unfollow</span></a>
                                              <a class="dropdown-item d-flex align-items-center" href="#">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-right-up icon-sm mr-2">
                                                      <polyline points="10 9 15 4 20 9"></polyline>
                                                      <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
                                                  </svg> <span class="">Go to post</span></a>
                                              <a class="dropdown-item d-flex align-items-center" href="#">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2 icon-sm mr-2">
                                                      <circle cx="18" cy="5" r="3"></circle>
                                                      <circle cx="6" cy="12" r="3"></circle>
                                                      <circle cx="18" cy="19" r="3"></circle>
                                                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                                  </svg> <span class="">Share</span></a>
                                              <a class="dropdown-item d-flex align-items-center" href="#">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy icon-sm mr-2">
                                                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                  </svg> <span class="">Copy link</span></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="card-body">
                                  <p class="mb-3 tx-14">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus minima delectus nemo unde quae recusandae assumenda.</p>
                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1687927639/artist-profile-1_uhpekp.webp" alt="">
                              </div>
                              <div class="card-footer">
                                  <div class="d-flex post-actions">
                                      <a href="javascript:;" class="d-flex align-items-center text-muted mr-4">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart icon-md">
                                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                          </svg>
                                          <p class="d-none d-md-block ml-2">Like</p>
                                      </a>
                                      <a href="javascript:;" class="d-flex align-items-center text-muted mr-4">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square icon-md">
                                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                          </svg>
                                          <p class="d-none d-md-block ml-2">Comment</p>
                                      </a>
                                      <a href="javascript:;" class="d-flex align-items-center text-muted">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share icon-md">
                                              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                              <polyline points="16 6 12 2 8 6"></polyline>
                                              <line x1="12" y1="2" x2="12" y2="15"></line>
                                          </svg>
                                          <p class="d-none d-md-block ml-2">Share</p>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                  </div>
              </div>
              <!-- middle wrapper end -->
              <!-- right wrapper start -->
              <div class="d-none d-xl-block col-xl-3 right-wrapper">
                  <div class="row">
                      <div class="col-md-12 grid-margin">
                          <div class="card rounded">
                              <div class="card-body">
                                  <h6 class="card-title">latest photos</h6>
                                  <div class="latest-photos">
                                      <div class="row">
                                          <div class="col-md-4">
                                              <figure>
                                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                              </figure>
                                          </div>
                                          <div class="col-md-4">
                                              <figure>
                                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                              </figure>
                                          </div>
                                          <div class="col-md-4">
                                              <figure>
                                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                              </figure>
                                          </div>
                                          <div class="col-md-4">
                                              <figure>
                                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                              </figure>
                                          </div>
                                          <div class="col-md-4">
                                              <figure>
                                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                              </figure>
                                          </div>
                                          <div class="col-md-4">
                                              <figure>
                                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                              </figure>
                                          </div>
                                          <div class="col-md-4">
                                              <figure class="mb-0">
                                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                              </figure>
                                          </div>
                                          <div class="col-md-4">
                                              <figure class="mb-0">
                                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                              </figure>
                                          </div>
                                          <div class="col-md-4">
                                              <figure class="mb-0">
                                                  <img class="img-fluid" src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="">
                                              </figure>
                                          </div>
                                      </div>
                                  </div>
                              </div>
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
      <p><strong>User:</strong> {{  profile }}</p>
      <p><strong>Member:</strong> {{ members }}</p>
    </div>
  </section>

</template>
<script>
import Layout from '@/components/Layouts/ArtistLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    layout: Layout,
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

