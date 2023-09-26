<template>
  <div>
    <SubscriptionModal />
    <div v-if="!isLoggedIn"></div>
    <div  v-else>

      <div class="onboarding-message" v-if="userRole === 'customers'" >
        <div v-if="showOnboardingMessage">
      <input type="checkbox" id="modal-toggle" class="modal-toggle" checked style="display: none;">

        <div class="modal">
          <div class="modal-content">
            <h2 class="title">Welcome Aboard!</h2>
            <p class="description">Welcome to Geebu! We're thrilled to have you on board. Get ready to embark on an exciting journey of Music and 
              Events, and explore a world of possibilities. Whether you're a seasoned user or just starting out, we're here to support 
              you every step of the way. Let's dive in and make the most of your experience with Geebu together!"</p>
              <label for="modal-toggle" class="close-modal-button" @click="$router.push('/account/profile')">Let's Get Started!</label>
          </div>
        </div>
      </div>
    </div>

      <div class="" v-if="userRole === 'artists'">
      <div class="onboarding-message" v-if="showOnboardingMessage">
      <input type="checkbox" id="modal-toggle" class="modal-toggle" checked style="display: none;">

        <div class="modal">
          <div class="modal-content">
            <h2 class="title">Welcome Aboard!</h2>
            <p class="description">In order to access the full range of features within the app, it is necessary to subscribe to the artist plan. 
              You can still browse the app and explore its interface, but your access to certain features will be limited until you 
              upgrade to the subscription.</p>
              <label for="modal-toggle" class="close-modal-button" 
              @click="openSubscriptionModal"
              data-bs-toggle="modal" data-bs-target="#selectPlanModal"> 
              View Subscription</label>
          </div>
        </div>
      </div>
    </div>

    <div class="onboarding-message" v-if="userRole === 'organizer'" >
        <div v-if="showOnboardingMessage">
      <input type="checkbox" id="modal-toggle" class="modal-toggle" checked style="display: none;">

        <div class="modal">
          <div class="modal-content">
            <h2 class="title">Welcome Aboard!</h2>
            <p class="description organizer-description">Welcome to Geebu! Your Trusted Partner in Event Creation and Management. Where you can able to:</p>
            <ul class="offers">
              <li>Create Event</li>
              <li>Send proposal for Artist</li>
              <li>Accept proposal from Artist</li>
              <li>Hire Artist for your Events</li>
              <li>Post Upcoming Events</li>
              <li>Post Handled Events </li>
            </ul>
              <label for="modal-toggle" class="close-modal-button" @click="$router.push('/account/profile')">Let's Get Started!</label>
          </div>
        </div>
      </div>
    </div>
    </div>  <!-- end of v-else -->

    <section class="home-slider">
      <div class="container">
        <div id="home-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5500">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/assets/home/home-slider-1.webp" class="d-block w-100"
                alt="Book your Events/Artist, Create your song now let's make magic in music!">
              <div class="carousel-caption d-none d-md-block">

                <h1>Book your Events/Artist, Create your song now let's make magic in music!</h1>
                <p>Custom tunes for any mood, and booking the best artists just got easier with our website!</p>

                <div v-if="isLoggedIn"><a href="/create-song" class="btn btn-primary btn-lg">Create your song</a></div>
                <div v-else>
                  <a href="#" class="btn btn-primary btn-lg" @click="openSignupModal"
                  data-bs-toggle="modal" data-bs-target="#mustSignUp">
                    Create your song
                  </a>
                </div>

              </div>
            </div>
            <div class="carousel-item">
              <img src="/assets/home/home-slider-2.webp" class="d-block w-100"
                alt="Find a perfect artists to make a custom song and create amazing memories to your event">
              <div class="carousel-caption d-none d-md-block">
                <h3>Find a perfect artists to make a custom song and create amazing memories to your event</h3>
                <p>Custom tunes for any mood, and booking the best artists just got easier with our website!</p>

                <div v-if="isLoggedIn"><a href="/artist" class="btn btn-primary btn-lg">Find your artist</a></div>
                <div v-else>
                  <a href="#" class="btn btn-primary btn-lg"
                  @click="openSignupModal"
                  data-bs-toggle="modal" data-bs-target="#mustSignUp">
                  Find your artist</a>
                </div>

              </div>
              <div class="animate-section">
                <div class="animate-left">
                  <img src="/assets/home/slider-2-animation-1.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="/assets/home/slider-2-animation-2.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="/assets/home/slider-2-animation-3.webp" class="d-block w-100" alt="Singing">
                  <img src="/assets/home/slider-2-animation-4.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="/assets/home/slider-2-animation-5.webp" class="d-block w-100" alt="Singing">
                  <img src="/assets/home/slider-2-animation-6.webp" class="d-block w-100" alt="Playing guitar">
                </div>
                <div class="animate-right">
                  <img src="/assets/home/slider-2-animation-7.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="/assets/home/slider-2-animation-8.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="/assets/home/slider-2-animation-9.webp" class="d-block w-100" alt="Singing">
                  <img src="/assets/home/slider-2-animation-10.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="/assets/home/slider-2-animation-11.webp" class="d-block w-100" alt="Singing">
                  <img src="/assets/home/slider-2-animation-12.webp" class="d-block w-100" alt="Playing guitar">
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img src="/assets/home/home-slider-3.webp" class="d-block w-100"
                alt="Need a Professional Equipment for your Event?">
              <div class="carousel-caption d-none d-md-block">
                <h3>Need a Professional Equipment for your Event?</h3>
                <p>We offer a wide range of equipment rental options, including sound systems, lighting, staging, and
                  more.</p>

                <div v-if="isLoggedIn"><a href="/services" class="btn btn-primary btn-lg">Our Services</a></div>
                <div v-else>
                  <a href="#" class="btn btn-primary btn-lg"
                  @click="openSignupModal"
                  data-bs-toggle="modal" data-bs-target="#mustSignUp">
                  Our Services</a>
                </div>

              </div>
            </div>
            <div class="carousel-item">
              <img src="/assets/home/home-slider-4.webp" class="d-block w-100"
                alt="Noo worries if you're unsure how to create an event - we've got you covered! Come and easily create your own event with us today.">
              <div class="carousel-caption d-none d-md-block content-4">
                <h3>No worries if you're unsure how to create an event - we've got you covered! Come and easily create
                  your own event with us today.</h3>
                <p>We offer a wide range of equipment rental options, including sound systems, lighting, staging, and
                  more.</p>

                <div v-if="isLoggedIn"><a href="/partners" class="btn btn-primary btn-lg">Get Started</a></div>
                <div v-else>
                  <a href="#" class="btn btn-primary btn-lg"
                  @click="openSignupModal"
                  data-bs-toggle="modal" data-bs-target="#mustSignUp">
                  Get Started</a>
                </div>

              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#home-carousel" data-bs-slide="prev">
            <i class="material-icons"><span class="material-symbols-outlined prev">&#xE5CB;</span></i>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#home-carousel" data-bs-slide="next">
            <i class="material-icons"><span class="material-symbols-outlined next">&#xE5CC;</span></i>
          </button>
        </div>
      </div>
    </section>

    <section class="geebu-presentation">
      <div class="container">
        <div class="row">
          <h2 class="text-center title">Unlock the Rhythm of Your Celebrations!</h2>
          <div class="col-6">
          <p class="content">Experience the Ultimate Fusion of Creativity and Entertainment with Geebu Create Your Custom Song, Tailored Exclusively 
            for Your Special Event or Party. Connect with Talented Artists Ready to Elevate Your Celebrations to Unforgettable Heights. 
            Get Started Today and Let the Music Speak the Language of Your Joy!"</p>
            <ul>
              <li v-for="feature in geebuFeatures">{{ feature }}</li>
            </ul>
            <router-link to="/login" class="btn btn-primary btn-lg learn-more">Learn more</router-link>
        </div>
        <div class="col-6">
          <div class="video-container">
            <video width="778" height="440.693"
             ref="videoPlayer" @click="togglePresentationVideo" :poster=videoThumbnail>
             <source :src="presentationVideo"
                type="video/mp4">
            </video>
            <div class="play-button" v-if="!isPlaying" @click="togglePresentationVideo">
              <img src="/assets/video-play-icon.svg" alt="Click to play the video">
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>

    <section class="custom-song" ref="customSongSection">
      <div class="container">
        <h2 class="title">A Custom Song in 3 Simple Steps</h2>
        <div class="row">
          <div id="custom-song-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#custom-song-carousel" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"><span class="number1">1</span></button>
              <!-- <p>-</p> -->
              <button type="button" data-bs-target="#custom-song-carousel" data-bs-slide-to="1" aria-label="Slide 2"><span
                  class="number2">2</span></button>
              <button type="button" data-bs-target="#custom-song-carousel" data-bs-slide-to="2" aria-label="Slide 3"><span
                  class="number3">3</span></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-ride="carousel" data-bs-interval="3500">
                <div class="row">
                  <div class="col-lg-6 col-xl-5 col-xxl-5">
                    <div class="carousel-caption d-none d-md-block step1">
                      <h3>Share your Story</h3>
                      <p>Tell us who the song is for or what it’s all about. Artist just need a little inspiration to make
                        it trully custom and unique.</p>
                      <a href="/create-song" class="btn btn-primary btn-lg">Create your song</a>
                    </div>
                  </div>
                  <div class="col-lg-6 col-xl-7 col-xxl-7">
                    <div class="customg-song-img">
                      <img src="/assets/home/your-song.webp" class="d-block w-100" loading="lazy" alt="Custom song">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="3500">
                <div class="row">
                  <div class="col-lg-6 col-xl-5 col-xxl-5">
                    <div class="carousel-caption d-none d-md-block step2">
                      <h3>Find an artist. Create your song</h3>
                      <p>Select the artist you want. Then pick your preffered genre, tempo, and mood so that they can get
                        started.</p>
                      <a href="/artists" class="btn btn-primary btn-lg">Find Your Artist</a>
                    </div>
                  </div>
                  <div class="col-lg-6 col-xl-7 col-xxl-7">
                    <div class="customg-song-img">
                      <img src="/assets/home/your-song.webp" class="d-block w-100" loading="lazy" alt="Custom song">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="3500">
                <div class="row">
                  <div class="col-lg-6 col-xl-5 col-xxl-5">
                    <div class="carousel-caption d-none d-md-block step3">
                      <h3>Make your music</h3>
                      <p>Any story can inspire a song. Let us guide you through the creation process and make a song.</p>
                      <a href="/create-song" class="btn btn-primary btn-lg">Create your song</a>
                    </div>
                  </div>
                  <div class="col-lg-6 col-xl-7 col-xxl-7">
                    <div class="customg-song-img">
                      <img src="/assets/home/your-song.webp" class="d-block w-100" loading="lazy" alt="Custom song">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> <!-- end of row -->
      </div>
    </section>

    <section class="discover-artist">
      <div class="container">
        <h2>Discover the Easy Way to Book Your Dream Artist </h2>
        <p class="sub-heading">Lorem ipsum dolor sit amet consectetur. Hac vulputate ut adipiscing diam malesuada ultrices
          id.</p>
        <div class="wrapper">
          <div class="row available-artist">
            <div class="col-lg-6 col-xl-6 col-xxl-6">
              <div class="content">
                <h3>Choose available artist to perform in your event</h3>
                <p>Our platform allows you to choose from a wide selection of available artists who are ready to make your
                  event unforgettable. </p>
                <ul>
                  <li>Lorem ipsum dolor sit amet consectetur.</li>
                  <li>Lorem ipsum dolor sit amet consectetur.</li>
                  <li>Lorem ipsum dolor sit amet consectetur.</li>
                </ul>
                <a href="/artists" class="btn btn-primary btn-lg">Find your artist</a>
              </div>
            </div>
            <div class="col-lg-6 col-xl-6 col-xxl-6">
              <div id="availableArtist" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#availableArtist" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#availableArtist" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#availableArtist" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="/assets/home/available-artist-slider-1.webp" class="d-block w-100" loading="lazy"
                      alt="Choose available artist">
                  </div>
                  <div class="carousel-item">
                    <img src="/assets/home/available-artist-slider-2.webp" class="d-block w-100" loading="lazy"
                      alt="Choose available artist">
                  </div>
                  <div class="carousel-item">
                    <img src="/assets/home/available-artist-slider-3.webp" class="d-block w-100" loading="lazy"
                      alt="Choose available artist">
                  </div>
                </div>
              </div>
            </div>
          </div> <!-- end of row -->
          <div class="row book-your-event">
            <div class="col-lg-6 col-xl-6 col-xxl-6">
              <div id="bookYourEvent" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#bookYourEvent" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#bookYourEvent" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#bookYourEvent" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="/assets/home/book-event-slider-1.webp" class="d-block w-100" loading="lazy"
                      alt="Choose available artist">
                  </div>
                  <div class="carousel-item">
                    <img src="/assets/home/book-event-slider-2.webp" class="d-block w-100" loading="lazy"
                      alt="Choose available artist">
                  </div>
                  <div class="carousel-item">
                    <img src="/assets/home/book-event-slider-3.webp" class="d-block w-100" loading="lazy"
                      alt="Choose available artist">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-xl-6 col-xxl-6">
              <div class="content">
                <h3>Set and book your event</h3>
                <p>With our platform, you can easily set and book your event, ensuring that everything runs smoothly from
                  start to finish.</p>
                <ul>
                  <li>Lorem ipsum dolor sit amet consectetur.</li>
                  <li>Lorem ipsum dolor sit amet consectetur.</li>
                  <li>Lorem ipsum dolor sit amet consectetur.</li>
                </ul>
                <a href="/events" class="btn btn-primary btn-lg">Book Now</a>
              </div>
            </div>
          </div> <!-- end of row -->
        </div>
      </div>
    </section>

    <section class="songs-for-occasion">
      <div class="container">
        <h2>Songs for every Occasion</h2>
        <p class="sub-heading">Lorem ipsum dolor sit amet consectetur. Hac vulputate ut adipiscing diam malesuada ultrices
          id.</p>
        <div class="row">
          <div class="col-4" v-for="occasion in occasions">
            <img :src="occasion.image" class="img-fluid" loading="lazy" :alt="occasion.altText">
            <div class="content">
              <h5>{{ occasion.typeOfOccasion }}</h5>
              <p>{{ occasion.numberOfSong }} Playlists</p>
            </div>
          </div>
        </div>
        <div class="button-wrapper">
          <a href="/events" class="btn btn-primary btn-lg">See All Occasion</a>
        </div>
      </div>
    </section>

    <section class="testimonials">
      <div class="container">
        <h2>Customer’s Reviews & Reactions</h2>
        <p class="sub-heading">Lorem ipsum dolor sit amet consectetur. Hac vulputate ut adipiscing diam malesuada ultrices
          id.</p>

        <div id="testimonialsSlider" class="carousel slide" data-bs-ride="carousel" data-bs-interval="500000">
          <ol class="carousel-indicators">
            <li v-for="(review, index) in reviews" :key="index" data-bs-target="#testimonialsSlider"
              :data-bs-slide-to="index" :class="{ 'active': index === activeIndex }" @click="changeVideo(index)"></li>
          </ol>
          <div class="carousel-inner">
            <div v-for="(review, index) in reviews" :key="index"
              :class="['carousel-item', { 'active': index === activeIndex }]" data-bs-interval="500000">
              <div class="row">
                <div class="col-6">
                  <div class="video-container">
                    <div class="video">
                      <video :src="review.video" ref="videos" @click="toggleTestimonialVideo(index)"></video>
                      <div class="play-button" v-if="!review.playing" @click="toggleTestimonialVideo(index)">
                        <i class="material-icons"><span class="material-symbols-outlined">play_arrow</span></i>
                      </div>
                    </div>
                  </div>
                </div> <!-- end of col-6-->
                <div class="col-6">
                  <div class="carousel-caption d-none d-md-block">
                    <p>{{ review.testimonial }}</p>
                    <h6>{{ review.user }}</h6>
                  </div>
                </div>
              </div> <!-- end of row -->
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>


</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import SubscriptionModal from '/src/components/Artist/SubscriptionModal.vue';
import MustSignupModal from '/src/components/Artist/MustSignupModal.vue';

export default {
  components: {
    SubscriptionModal,
    MustSignupModal
  },
      data() {
          return {
      occasions: [
        {
          image: '/assets/home/birthdays.webp',
          altText: 'birthdays',
          typeOfOccasion: 'Birthdays',
          numberOfSong: 100
        },
        {
          image: '/assets/home/weddings.webp',
          altText: 'weddings',
          typeOfOccasion: 'Weddings',
          numberOfSong: 100
        },
        {
          image: '/assets/home/valentines.webp',
          altText: 'valentines',
          typeOfOccasion: 'Valentines',
          numberOfSong: 100
        }

      ],
      reviews: [
        {
          video: 'https://video.wixstatic.com/video/8fd47a_61de9ebf0ad64f0fa93d72e4279551f7/1080p/mp4/file.mp4',
          testimonial: '“Pellentesque maecenas vitae vehicula eget. Ultricies ac id massa maecenas nulla arcu lacus. Turpis porttitor.”',
          user: 'Courtney Henry - Our Client'
        },
        {
          video: 'https://repitsocial.com/wp-content/uploads/2023/04/repitsocial-featured-video.mp4',
          testimonial: '“Pellentesque maecenas vitae vehicula eget. Ultricies ac id massa maecenas nulla arcu lacus. Turpis porttitor.”',
          user: 'Courtney Henry - Our Client'
        },
        {
          video: 'https://res.cloudinary.com/daorvtlls/video/upload/v1686648918/Figma_in_5__Auto_Layout_hddmey.mp4',
          testimonial: '“Figma in Five: Auto-Layout”',
          user: 'Roger'
        }
      ],
      activeIndex: 0,
      geebuFeatures: ['Create a Song','Booked Artist for Special Occasions and Events','Post Events','Hire Artist for your Events',
      'Post your Original and Cover Songs','Listen to Artist songs'],
      presentationVideo: '/assets/videos/geebu-presentation.mp4',
      isPlaying: false,
      videoThumbnail: '/assets/home/presentation-thumbnail-image.webp',
      observer: null,
    //  showPlayButton: false,
    // showModal: true,
    showOnboardingMessage: false,
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", 'userInfo', 'info', 'userRole']),
    ...mapState({}),
  },
  beforeDestroy() {
    // this.showOnboardingMessage = true;
  },
  created() {
   // this.checkAndShowModal();
       // Show the modal after a delay if the flag is set
    //    if (this.$store.state.showOnboardingMessage) {
    //   setTimeout(() => {
    //     this.showOnboardingMessage = true;
    //   }, 1000);
    // }

    if (this.$route.query.onboarding === 'true') {
      setTimeout(() => {
        this.showOnboardingMessage = true;
      }, 1000);
    }


  },
  mounted() {
    // Show the modal after a delay of 1 second

  },
  methods: {
    // closeModal() {
    //   this.showModal = false;
    // },
    openSubscriptionModal(data){
        this.$root.$emit("bv::show::modal", "#selectPlanModal");
      },
    openSignupModal(data){
        this.$root.$emit("bv::show::modal", "#mustSignUp");
      },
    checkAndShowModal() {
       // // show modal very 15 days
      // const lastShown = localStorage.getItem('modalLastShown');
      // const currentTime = new Date().getTime();
      // // show modal very 15 days
      // if (!lastShown || currentTime - lastShown >= 15 * 24 * 60 * 60 * 1000) {
      //   this.show = true;
      //   localStorage.setItem('modalLastShown', currentTime);
      // }

      // const lastShown = localStorage.getItem('modalLastShown');
      // const currentTime = new Date().getTime();
                            // 14400000 = 4 hrs
                            // 60000 milliseconds = 1 minute
      // if (!lastShown || currentTime - lastShown >= 10000) { 
      //   this.showOnboardingMessage = true;
      //   localStorage.setItem('modalLastShown', currentTime);
      // }

    },
    toggleTestimonialVideo(index)
    {
      const videos = this.$refs.videos;
      const video = videos[index];

      if (video.paused) {
        video.play();
        this.reviews[index].playing = true;
      } else {
        video.pause();
        this.reviews[index].playing = false;
      }
    },
    pauseVideoOnScroll() {
      const video = this.$refs.videoPlayer;
      if (video && this.isPlaying) {
        video.pause();
        this.isPlaying = false;
      }
    },
    togglePresentationVideo()
    {
      const video = this.$refs.videoPlayer;
      if(video){
       if(this.isPlaying){
        video.pause();
       }else{
        video.play();
       }
       this.isPlaying = !this.isPlaying;
      }
    },
    changeVideo(index)
    {
      const videos = this.$refs.videos;
      const activeVideo = videos[this.activeIndex];

      if (activeVideo) {
        activeVideo.pause();
        this.reviews[this.activeIndex].playing = false;
      }

      this.activeIndex = index;
    },
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.target === this.$refs.customSongSection) {
          this.pauseVideoOnScroll();
        }
      });
    });
    this.observer.observe(this.$refs.customSongSection);
    //this.observer.observe(this.$el);

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }

    window.removeEventListener('scroll', this.handleScroll);
  },
    handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY >= 1) {
        this.pauseVideoOnScroll();
      }
    },
  
}
</script>

<style scoped>
</style> 




