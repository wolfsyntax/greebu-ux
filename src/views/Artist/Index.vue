<template>
  <layout>
    <CreatePostModal />

  <section class="artist-profile">
    <div class="container">
      <div class="profile-page tx-13">
          <div class="row">
              <div class="col-12 grid-margin">
                  <div class="profile-header">
                      <div class="cover">
                          <div class="gray-shade"></div>
                          <figure>
                              <img :src="`${account.avatar || 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465779/samples/cloudinary-group.jpg'}`" class="img-fluid" alt="profile cover">
                          </figure>
                            <div class="cover-photo-camera">
                              <button type="submit" class="btn btn-success">
                                <span class="material-symbols-outlined">&#xE412;</span>
                              </button>
                            </div>
                          <div class="row cover-body d-flex justify-content-between align-items-center">
                              <div class="col-9">
                                <div class="profile-info">
                                  <div class="position-relative">
                                  <img class="profile-pic" :src="`${account?.avatar || 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg'}`" alt="profile">
                                  <!-- https://res.cloudinary.com/daorvtlls/image/upload/v1687927639/artist-profile-1_uhpekp.webp -->
                                    <div class="camera">
                                      <button type="submit" class="btn btn-success">
                                        <i class="material-icons"><span class="material-symbols-outlined">&#xE412;</span></i>
                                      </button>
                                    </div>
                                  </div>
                                  <div class="profile-wrapper">
                                    <div class="name-artist">
                                      <h3 class="profile-name">
                                        <!-- {{ profile.business_name }} -->
                                        {{ account.artist_name || Geebu }}
                                      </h3>
                                      <h5 class="type-of-artist">{{ account.artist_type || 'Full Band' }}</h5>
                                    </div>
                                    <!-- for future na muna ini -->
                                    <!-- <div class="folow">
                                      <p class="followers">1,254 <br> <span>Followers</span></p> <span class="divider"></span>
                                      <p class="followers">1,254 <br> <span>Following</span></p> <span class="divider"></span>
                                      <p class="followers">385 <br> <span>Playlist</span></p>
                                    </div> -->
                                    <div class="music-genre">
                                      <h5 class="title">Genres:</h5>
                                      <span class="badge" v-for="genre in account?.genres" :key="genre">{{ genre}}</span>
                                      <!-- <span class="badge">Country Rock</span> <span class="badge">Electronic</span> <span class="badge">Rock</span> <span class="badge">Reggae</span> -->
                                    </div>
                                    </div>
                                  </div>
                              </div>
                              <div class="col-3">
                                                              <!-- <h3 class="profile-name">Amiah Burton</h3> -->
                              <div class="d-none d-md-block text-end edit">
                                <a href="/account/profile" class="btn btn-primary btn-lg">Edit Profile</a>
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
                          <p class="description">
                            <!-- {{ profile.bio }} -->
                            {{  account.bio }}
                          </p>
                          <div class="mt-3 social-media">
                            <i class="material-icons"><span class="material-symbols-outlined calendar">calendar_month</span></i><p class="band-name">{{ account?.artist_name}}</p>
                          </div>
                          <div class="mt-3 social-media">
                            <img src="/assets/social icons/_Spotify.svg" loading="lazy" alt="spotify icon">
                            <p>{{ account?.spotify_profile }}</p>
                          </div>
                            <div class="mt-3 social-media">
                              <img src="/assets/social icons/_YouTube.svg" loading="lazy" alt="spotify icon">
                              <p>{{ account?.youtube_channel }}</p>
                          </div>
                      </div>
                  </div>

                  <div class="card band-members">
                      <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between header">
                          <div class="d-flex title">
                            <img src="/assets/artist-account/band-members-icon.svg" loading="lazy" alt="band members icon">
                            <h5 class="card-title mb-0">Band Members</h5>
                          </div>
                          <div class="see-all">
                              <a href="">See all</a>
                          </div>
                        </div>
                                  <!-- Band Members list -->
                          <div class="members-list" v-for="member in members" :key="member.id">
                              <div class="member-profile">
                                <img :src="member.avatar" 
                                loading="lazy" alt="member profile">
                                <div class="member-info">
                                <a href="#">{{  member.member_name }}</a>
                                <p>{{ member.role }}</p>
                                </div>
                              </div>
                              <div class="more">
                                <a href="#">
                                  <i class="material-icons"><span class="material-symbols-outlined">more_vert</span></i>
                                </a>
                              </div>
                          </div>    
                        <!-- <div class="members-list">
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
                                <i class="material-icons"><span class="material-symbols-outlined">&#xe5d4;</span></i>
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
                                <i class="material-icons"><span class="material-symbols-outlined">&#xe5d4;</span></i>
                              </a>
                            </div>
                         </div>     -->
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
                          <img :src="`${account?.avatar || 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png'}`" 
                          loading="lazy" alt="member profile">
                          
                          <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary"  
                            @click="openCreatePostModal" 
                            data-bs-toggle="modal" data-bs-target="#artistPost">
                              Write something...
                            </button>
                      </div>
                      <!-- <hr> -->
                      <div class="post-features">
                        <div class="post-icon">
                          <i class="material-icons"><span class="material-symbols-outlined">&#xe813;</span></i>
                             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#artistPost">
                              Feeling
                            </button>
                        </div>
                        <div class="post-icon">
                          <i class="material-icons"><span class="material-symbols-outlined">&#xe3f4;</span></i>
                          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#artistPost">
                            Photo/Video
                            </button>
                        </div>
                        <!-- @click="toggleContent('music')" -->
                        <div class="post-icon">
                          <i class="material-icons"><span class="material-symbols-outlined">&#xe030;</span></i>
                          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#artistPost">
                           Music
                            </button>
                        </div>
                      </div>
                    </div> <!-- end of card-body -->
                  </div>
                  </div>    
                  </div> <!-- end of row post -->


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
                                  <p class="mb-3">Travel and you will born for a second time️️ Travel and you will born for a second time️️ Travel and you will born for a second time️️ Travel and you will born for a second time️️
                                    Travel and you will born for a second time️️ Travel and you will born for a second time️️ Travel and you will born for a second time️️ Travel and you will born for a second time️️
                                  </p>
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
                                                  <!-- right wrapper bottom start -->
                      <div class="col-md-12 grid-margin">
                        <div class="card original-songs">
                          <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between header">
                              <div class="d-flex title">
                                <i class="material-icons"> <span class="material-symbols-outlined">album</span></i>
                                <h5 class="card-title mb-0">Original Songs</h5>
                              </div>
                              <div class="see-all">
                                  <a href="">See all</a>
                              </div>
                            </div>
                                      <!-- Song list -->
                             <div class="songs-list">
                                <div class="songs-info">
                                  <img src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465774/samples/people/jazz.jpg" 
                                  loading="lazy" alt="member profile">
                                  <div class="member-info">
                                  <a href="#">Loving In Stereo</a>
                                  <p>Idlepitch - Album</p>
                                  </div>
                                </div>
                                <div class="more">
                                  <a href="#">
                                    <i class="material-icons"><span class="material-symbols-outlined">more_vert</span></i>
                                  </a>
                                </div>
                            </div>   
                            <div class="songs-list">
                                <div class="songs-info">
                                  <img src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465774/samples/people/jazz.jpg" 
                                  loading="lazy" alt="member profile">
                                  <div class="member-info">
                                  <a href="#">Loving In Stereo</a>
                                  <p>Idlepitch - Album</p>
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
                  </div>
              </div>
              <!-- right wrapper end -->
          </div>
                                                                             <!-- About tab -->
          <div class="row about-tab" v-if="activeItem === 'About'">
            <div class="col-7">
              <h3 class="overview">Overview</h3>
              <p class="content">{{ aboutArtist }}</p>
              <h5 class="capacity">Our capacity:</h5>  
              <ol type="1" class="capacity-list">
                <li v-for="capacity in artistCapacity">
                    {{ capacity }}
                </li>
              </ol> 
              <div class="genres">
                <h4>Genres</h4>
                <div class="genres-list">
                  <span class="badge" v-for="genre in artistGenres">{{ genre }}</span>
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="social-media">
                <h4>Social Media</h4>
                <ul>
                  <li v-for="socialMedia in artistSocialMedia">
                    <img :src="socialMedia.img">{{ socialMedia.name }}
                  </li>
                </ul>
              </div>
              <div class="ratings">
                <h4>Ratings</h4>
                <div class="ratings-wrapper">
                  <span class="material-symbols-rounded">star</span>
                  <p>{{ artistRatings }}<span class="reviews">({{ artistReviews }} reviews)</span></p>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="band-members">
                <h4>Band Members</h4>
                <div class="card" v-for="bandMember in bandMembers">
                <img :src="bandMember.img" class="card-img-top" alt="band member">
                <div class="card-body">
                  <h5 class="card-title">{{ bandMember.name }}</h5>
                  <p class="card-text">{{ bandMember.role }}</p>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Songs'">
            <h2>Songs</h2>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Videos'">
            <h2>Videos</h2>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Photos'">
            <h2>Photos</h2>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Events'">
            <h2>Events</h2>
          </div>
          <div class="row profile-body" v-if="activeItem === 'Reviews'">
            <h2>Reviews</h2>
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
  <!-- <button @click="openModal">Open Modal</button>
    
  <div>
    <button @click="isModalVisible = true">Open Modal</button>
    
    <modal-component :show-modal="isModalVisible" @close="isModalVisible = false">

      <p>This is the modal content.</p>
    </modal-component>
  </div> -->
     
</layout>

</template>
<script>
// import Layout from '/src/components/Layouts/ArtistLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";
import Layout from '/src/components/Layouts/Layout.vue';
import CreatePostModal from '/src/components/Artist/CreatePostModal.vue';

export default {
  components: {
    layout: Layout,
    CreatePostModal
  },
  data()
  {
    return {
      form: {
        
      },
      errors: {

      },
      // Artist profile and Post tab
      navItems: ['Post', 'About', 'Songs', 'Videos', 'Photos'],
     // navItems: ['Post', 'About', 'Songs', 'Videos', 'Photos', 'Events', 'Reviews'],
      activeItem: 'Post',
      post: ['Post 1', 'Post 2','Post 1', 'Post 2','Post 1', 'Post 2'],
      songs: ['https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
      'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
    ],
      videos:['https://video.wixstatic.com/video/8fd47a_61de9ebf0ad64f0fa93d72e4279551f7/1080p/mp4/file.mp4'],
      photos:['/assets/home/birthdays.webp', '/assets/home/birthdays.webp', '/assets/home/birthdays.webp', '/assets/home/birthdays.webp', '/assets/home/birthdays.webp'],
      
      // About tab
      aboutArtist: 'Lorem ipsum dolor sit amet consectetur. Consectetur justo ornare et netus adipiscing nisi nisl tellus a. Venenatis sed augue ultricies vulputate in. Eu risus neque nisl libero eget in molestie felis sem. Pharetra sagittis eget ipsum pulvinar aliquet libero amet accumsan auctor.',
      artistCapacity: ['Mobile apps design', 'Website design & development', 'Packaging', 'Brand identity', 'Print design' ],
      artistGenres:['Reggae','Metal','Hip-hop/Rap','Country Acoustic','Electronic','Rock'],
      artistSocialMedia:[
        { img: '/src/assets/artist-account/spotify-icon-gray.svg', name: 'IDLEPITCH'},
        { img: '/src/assets/artist-account/youtube-icon-gray.svg', name: 'youtube.com/@idlepitch'}
      ],
      artistRatings: '4.95',
      artistReviews: '234',
      bandMembers: [
        { img: 'src/assets/artist-account/band-member-1.webp', name: 'John Doe', role: 'Vocalist'}, { img: 'src/assets/artist-account/band-member-2.webp', name: 'Jose Diaz', role: 'Guitarist'},
        { img: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-5_lxhfkw.png', name: 'John Doe', role: 'Vocalist'}, { img: 'src/assets/artist-account/band-member-2.webp', name: 'Jose Diaz', role: 'Guitarist'},
        { img: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg', name: 'Michelle Rose', role: 'Songwriter'},
      ],
      // isModalVisible: false,
      modalVisible: false,
      submissions: [], // Array to store all submissions
      editingIndex: -1,
    
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
      console.log('Fetch Artist Option [index]: ', response)
    })
    .catch(err => {
        // this.$vs.notification({
        //   color: 'danger',
        //   position: 'top-right',
        //   title: 'Server Status',
        //   text: `${err.message}`
        // })
    });

    this.fetchProfile();
    
  },
  methods: {
    ...mapActions([
      'fetchArtistOptions', 'fetchProfile',
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
    openCreatePostModal(data){
      this.$root.$emit("bv::show::modal", "#artistPost");
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
    },

    

  },
  computed: {
    ...mapGetters(["userInfo", "token",]),
    ...mapState({
      users: (state)    => state.user,
      profile: (state)  => state.profile,
      role: (state)     => state.role,
      artist: (state)   => state.artist.artist,
      members: (state) => state.artist.members,
      account: (state) => state.account,
    }),
  }
}
</script>

<style>
@import '@/assets/css/artist-ui.css';
</style>

