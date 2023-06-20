<template>
  <div>
    <section class="home-slider">
      <div class="container">
        <div id="home-carousel" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="@/assets/home-slider-1.webp" class="d-block w-100"
                alt="Book your Events/Artist, Create your song now let's make magic in music!">
              <div class="carousel-caption d-none d-md-block">
                <h1>Book your Events/Artist, Create your song now let's make magic in music!</h1>
                <p>Custom tunes for any mood, and booking the best artists just got easier with our website!</p>
                <a href="#" class="btn btn-primary btn-lg">Create a song</a>
              </div>
            </div>
            <div class="carousel-item">
              <img src="@/assets/home-slider-2.webp" class="d-block w-100"
                alt="Find a perfect artists to make a custom song and create amazing memories to your event">
              <div class="carousel-caption d-none d-md-block">
                <h3>Find a perfect artists to make a custom song and create amazing memories to your event</h3>
                <p>Custom tunes for any mood, and booking the best artists just got easier with our website!</p>
                <a href="#" class="btn btn-primary btn-lg">Find Artist</a>
              </div>
              <div class="animate-section">
                <div class="animate-left">
                  <img src="@/assets/slider-2-animation-1.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="@/assets/slider-2-animation-2.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="@/assets/slider-2-animation-3.webp" class="d-block w-100" alt="Singing">
                  <img src="@/assets/slider-2-animation-4.webp" class="d-block w-100" alt="Playing guitar">
                </div>
                <div class="animate-right">
                  <img src="@/assets/slider-2-animation-4.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="@/assets/slider-2-animation-3.webp" class="d-block w-100" alt="Singing">
                  <img src="@/assets/slider-2-animation-2.webp" class="d-block w-100" alt="Playing guitar">
                  <img src="@/assets/slider-2-animation-1.webp" class="d-block w-100" alt="Playing guitar">
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img src="@/assets/home-slider-3.webp" class="d-block w-100"
                alt="Need a Professional Equipment for your Event?">
              <div class="carousel-caption d-none d-md-block">
                <h3>Need a Professional Equipment for your Event?</h3>
                <p>We offer a wide range of equipment rental options, including sound systems, lighting, staging, and
                  more.</p>
                <a href="#" class="btn btn-primary btn-lg">Our Services</a>
              </div>
            </div>
            <div class="carousel-item">
              <img src="@/assets/home-slider-4.webp" class="d-block w-100"
                alt="Noo worries if you're unsure how to create an event - we've got you covered! Come and easily create your own event with us today.">
              <div class="carousel-caption d-none d-md-block content-4">
                <h3>No worries if you're unsure how to create an event - we've got you covered! Come and easily create
                  your own event with us today.</h3>
                <p>We offer a wide range of equipment rental options, including sound systems, lighting, staging, and
                  more.</p>
                <a href="#" class="btn btn-primary btn-lg">Get Started</a>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#home-carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#home-carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>

    <section class="custom-song">
      <div class="container">
        <h2>A Custom Song in 3 Simple Steps</h2>
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
              <div class="carousel-item active" data-bs-interval="3500">
                <div class="row">
                  <div class="col-lg-6 col-xl-5 col-xxl-5">
                    <div class="carousel-caption d-none d-md-block step1">
                      <h3>Share your Story</h3>
                      <p>Tell us who the song is for or what it’s all about. Artist just need a little inspiration to make
                        it trully custom and unique.</p>
                      <a href="#" class="btn btn-primary btn-lg">Create a song</a>
                    </div>
                  </div>
                  <div class="col-lg-6 col-xl-7 col-xxl-7">
                    <div class="customg-song-img">
                      <img src="@/assets/custom-song.webp" class="d-block w-100" alt="Custom song">
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
                      <a href="#" class="btn btn-primary btn-lg">Create a song</a>
                    </div>
                  </div>
                  <div class="col-lg-6 col-xl-7 col-xxl-7">
                    <div class="customg-song-img">
                      <img src="@/assets/custom-song.webp" class="d-block w-100" alt="Custom song">
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
                      <a href="#" class="btn btn-primary btn-lg">Create a song</a>
                    </div>
                  </div>
                  <div class="col-lg-6 col-xl-7 col-xxl-7">
                    <div class="customg-song-img">
                      <img src="@/assets/custom-song.webp" class="d-block w-100" alt="Custom song">
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
                <a href="#" class="btn btn-primary btn-lg">Find Artists</a>
              </div>
            </div>
            <div class="col-lg-6 col-xl-6 col-xxl-6">
              <div id="availableArtist" class="carousel slide" data-bs-interval="3000" data-bs-ride="carousel">
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
                    <img src="@/assets/available-artist-slider-1.webp" class="d-block w-100"
                      alt="Choose available artist">
                  </div>
                  <div class="carousel-item">
                    <img src="@/assets/available-artist-slider-2.webp" class="d-block w-100"
                      alt="Choose available artist">
                  </div>
                  <div class="carousel-item">
                    <img src="@/assets/available-artist-slider-3.webp" class="d-block w-100"
                      alt="Choose available artist">
                  </div>
                </div>
              </div>
            </div>
          </div> <!-- end of row -->
          <div class="row book-your-event">
            <div class="col-lg-6 col-xl-6 col-xxl-6">
              <div id="bookYourEvent" class="carousel slide" data-bs-interval="3000" data-bs-ride="carousel">
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
                    <img src="@/assets/book-event-slider-1.webp" class="d-block w-100"
                      alt="Choose available artist">
                  </div>
                  <div class="carousel-item">
                    <img src="@/assets/book-event-slider-2.webp" class="d-block w-100"
                      alt="Choose available artist">
                  </div>
                  <div class="carousel-item">
                    <img src="@/assets/book-event-slider-3.webp" class="d-block w-100"
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
                <a href="#" class="btn btn-primary btn-lg">Book Now</a>
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
            <img :src="occasion.image" class="img-fluid" :alt="occasion.altText">
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
                      <video :src="review.video" ref="videos" @click="toggleVideo(index)"></video>
                      <div class="play-button" v-if="!review.playing" @click="toggleVideo(index)">
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

    <section class="reminder">
      <div class="container">
        <div class="content">
          <h2>Send yourself a reminder</h2>
          <p>Let us know the date and we’ll send an email reminder a couple weeks before your event.</p>
          <a href="#" class="btn btn-primary btn-lg">Schedule Now</a>
        </div>
        <div class="hidden-img">
          <img src="@/assets/send-yourself-a-reminder.webp" class="img-fluid" alt="...">
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data()
  {
    return {
      occasions: [
        {
          image: '../../assets/birthdays.webp',
          altText: 'birthdays',
          typeOfOccasion: 'Birthdays',
          numberOfSong: 100
        },
        {
          image: '../../assets/weddings.webp',
          altText: 'weddings',
          typeOfOccasion: 'Weddings',
          numberOfSong: 100
        },
        {
          image: '../../assets/valentines.webp',
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
    }
  },
  methods: {
    toggleVideo(index)
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
    changeVideo(index)
    {
      const videos = this.$refs.videos;
      const activeVideo = videos[this.activeIndex];

      if (activeVideo) {
        activeVideo.pause();
        this.reviews[this.activeIndex].playing = false;
      }

      this.activeIndex = index;
    }
  }
}
</script>

<style scoped></style>





