<template>
  <main>
    <header class="main-nav">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand logo" :href="home">
            <img src="@/assets/logo.svg" alt="logo">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item" v-for="(item, index) in navItems" :key="index">
              <a class="nav-link" :href="item.link">{{ item.page }}</a>
              </li>
            </ul>
            <div class="float-end nav-button" v-if="!isLoggedIn">
              <a :href="login" class="btn btn-primary log-in">Log In</a>
              <a :href="signUp" type="button" class="btn btn-secondary sign-up">Sign Up</a>
              <!-- <a method="post" as="button" :href="route('logout')" class="btn btn-secondary log-out"><i class="bi bi-box-arrow-right"></i></a> -->
              <!-- <Link method="post" as="button" :href="route('logout')">Logout</Link> -->
            </div>
            <div class="float-end nav-button" v-else>
              <a href="#" class="btn btn-primary log-in" @click.prevent="logout">Logout</a>
            </div>

          </div>
        </div>
        </nav>

      </header>
      <!-- <router-view></router-view> -->
      <slot />
      <footer class="footer">
        <div class="container">
            <div class="row">
              <div class="col-7">
                <div class="menu">
                  <div class="our-company">
                    <h4>Our Company</h4>
                    <ul>
                      <li><a :href="blog" target="_blank">Blog</a></li>
                      <li><a :href="support" target="_blank">Support</a></li>
                      <li><a :href="privacy" target="_blank">Privacy Policy</a></li>
                      <li><a :href="terms" target="_blank">Terms of Use</a></li>
                    </ul>
                  </div>
                  <div class="songs">
                    <h4>Songs</h4>
                    <ul>
                      <li><a :href="artist" target="_blank">Playlist</a></li>
                      <li><a :href="artist" target="_blank">Artist</a></li>
                    </ul>
                  </div>
                  <div class="for-artist">
                    <h4>For Artist</h4>
                    <ul>
                      <li><a :href="login" target="_blank">Artist Login</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-5">
                <div class="notify">
                  <div class="card" style="width: 31.5rem;">
                    <div class="card-body">
                      <h5 class="card-title">Keep me Notified</h5>
                      <div class="input-group mb-3 mt-4">
                            <input type="text" class="form-control" placeholder="Enter email" aria-label="Email address" aria-describedby="button-addon2">
                            <button class="btn btn-success border-rad" type="button" id="button-addon2">Subscribe</button>
                      </div>
                      <p class="card-text">Gravida sed justo, justo, id est et. Amet tristique convallis sed porttitor nullam eu ut. Duis et odio aliquam bibendum.
                        Metus et lectus id viverra fringilla magna morbi. </p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="footer-logo">
                <a href="/">
                  <img src="@/assets/logo.svg" width="211px" height="53px" alt="logo">
                </a>
              </div>
            </div>
            <div class="col-4">
              <div class="text-center copy">
                <p>All Rights Reserved © Jeffray Dy 2023</p>
              </div>
            </div>
            <div class="col-4">
              <div class="social-media-icons">
                <ul>
                  <li>
                    <a href="#"  target="_blank"><img src="@/assets/facebook.svg" width="25px" height="25px" alt="facebook logo"></a>
                  </li>
                  <li>
                    <a href="#"  target="_blank"><img src="@/assets/instagram.svg" width="25px" height="25px" alt="instagram logo"></a>
                  </li>
                  <li>
                    <a href="#"  target="_blank"><img src="@/assets/twitter.svg" width="25px" height="25px" alt="twitter logo"></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><img src="@/assets/youtube.svg" width="25px" height="25px" alt="youtube logo"></a>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {

  },
  setup() {
    
  },
  data()
  {
    return {
      navItems: [
        { page: 'Home', link: '/' },
        { page: 'Create a Song', link: '/create-song' },
        { page: 'Artist', link: '/artist' },
        { page: 'Events', link: '/events' },
        { page: 'Other Services', link: '/services' },
        { page: 'Partner With Us', link: '/partners' }
      ],
      home: '/',
      createSong: '/create-song',
      artist: '/artist',
      events: '/events',
      otherServices: '/services',
      partnerWithUs: '/partners',
      login: '/login',
      signUp: '/register',
      blog: '/blog',
      privacy: '/privacy',
      support: '/support',
      terms: '/terms',
      facebookPage: 'https://www.facebook.com/',
      instagramPage: 'https://www.instagram.com/',
      twitterPage: 'https://twitter.com/',
      youtubePage: 'https://www.youtube.com/',

    }
  },
  methods: {
    ...mapActions([
      'signout'
    ]),
    ...mapMutations([]),
    logout()
    {
      this.signout()
        .then(response =>
        {
          const { status } = response;
          if (status === 200 || status === 401) this.$router.push('/login');
          console.log('Logout Response: ', response)
        })
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({}),
  }
}
</script>

<style scoped>
/* .footer .container{
  margin-top: 100px;
  margin-bottom: 100px;
} */
.footer .container .menu {
  display: flex;
  float: left;
}

.footer .menu .our-company,
.footer .menu .songs,
.footer .menu .for-artist {
  padding: 0 60px;
}

.footer .container .row:nth-child(1) {
  border-bottom: 1px solid #B8BBCF;
  margin-bottom: 40px;
}

.footer .container .row:nth-child(2) {
  margin-bottom: 40px;
}

.footer .menu h4 {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #212121;
  margin-bottom: 15px;
}

.footer .menu ul li a {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #212121;
  opacity: 0.5;
  text-decoration: none;
}

.footer .menu ul li a:hover {
  color: #FF6B00;
  opacity: 1;
}

.footer .menu ul {
  padding-left: 0rem;
}

.footer .menu ul li {
  list-style-type: none;
  margin-bottom: 13px;
}

.footer ul li::marker {
  display: none;
}

.footer .notify {
  float: right;
  margin-top: -40px;
}

.footer .notify .card {
  background: #EFF3FD;
  border: none;
  margin-bottom: 30px;
}

.footer .card .card-body {
  padding: 30px 40px 45px;
}

.footer .card h5 {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #212121;
}

.footer .card p {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #616161;
}

.footer .card .input-group {
  margin-bottom: 18px;
}

.footer .input-group .form-control {
  height: 50px;
  background: #FFFFFF;
  border: 1px solid #D6D6D6;
  border-radius: 6px;
}

.footer .input-group .btn-success {
  background-color: #FF6B00;
  border-color: #FF6B00;
}

.social-media-icons {
  float: right;
}

.social-media-icons ul {
  display: flex;
}

.social-media-icons ul li {
  list-style-type: none;
  padding: 0 6px;
}

.social-media-icons a {
  opacity: 1;
}

.footer .copy,
.social-media-icons {
  margin-top: 20px;
}

.footer .copy p {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #212121;
  margin: 0rem;
}

@media (min-width: 1200px) and (max-width: 1399.98px) {

  .footer .menu .our-company,
  .footer .menu .songs,
  .footer .menu .for-artist {
    padding: 0 40px;
  }

  .footer .container .row[data-v-29a7c690]:nth-child(2) {
    margin-bottom: 20px;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {

  .footer .menu .our-company,
  .footer .menu .songs,
  .footer .menu .for-artist {
    padding: 0 30px;
  }

  .footer .container .row[data-v-29a7c690]:nth-child(2) {
    margin-bottom: 20px;
  }

  .footer .copy p[data-v-29a7c690] {
    font-size: 16px;
    line-height: 20px;
  }

  .footer .notify .card {
    width: 27rem !important;
  }

  .footer .menu h4[data-v-29a7c690] {
    font-size: 20px;
    line-height: 24px;
  }

  .footer .menu ul li a[data-v-29a7c690] {
    font-size: 18px;
    line-height: 20px;
  }

  .footer .card h5[data-v-29a7c690] {
    font-size: 20px;
    line-height: 24px;
  }
}</style>

