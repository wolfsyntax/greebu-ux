<template>
  <main>
    <SubscriptionModal />
    <header class="main-nav">
      <nav class="navbar navbar-expand-lg navbar-light justify-content-end">
        <div class="container">
          <router-link :to="isLoggedIn ? '/dashboard' : '/'" class="navbar-brand logo">
            <img src="/assets/geebu-logo.svg" alt="Geebu logo">
          </router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0" >
              <li class="nav-item">
                <router-link to="/" v-if="['','customers',].includes(userRole)">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/library" v-if="['artists'].includes(userRole)">Library</router-link>
                <router-link to="/event-library" v-if="['organizer',].includes(userRole)">Library</router-link>
              </li>
              <li class="nav-item" v-if="[ 'artists', 'customers', 'organizer' ].includes(userRole)" >
                <router-link to="/create-song">Create a Song</router-link>
              </li>
              <li class="nav-item" >
                <router-link to="/artists">Artists</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/events">Events</router-link>
              </li>
              <li class="nav-item" v-if="['','customers',].includes(userRole)" >
                <router-link to="/services">Services</router-link>
              </li>

            </ul>

            <div class="float-end nav-button" v-if="!isLoggedIn">
              <router-link to="/login" class="btn btn-primary log-in">Log In</router-link>
              <router-link to="/register" class="btn btn-secondary sign-up">Sign Up</router-link>
            </div>

            <div class="float-end nav-button" v-else>
              <a href="#" class="btn btn-primary upgrade" @click="openModal" data-bs-toggle="modal" data-bs-target="#selectPlanModal" v-if="userRole === 'artists'">Upgrade Plan</a>

              <div class="dropdown dropstart">
                <button class="btn btn-secondary dropdown-toggle" @click="fetchNotifications" data-bs-auto-close="outside" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" >
                  <span class="material-symbols-outlined bell-icon">&#xe7f4;</span>
                </button>

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start p-0" id="dropdownNotif" data-bs-autoClose="false">
                  <li class="title-wrap"><span class="title m-0">Notifications</span></li>

                  <li class="sender-notif-wrap">
                    <div class="d-flex align-items-start notif-wrap">
                      <div class="img-wrap">
                        <img src="/assets/notifications-icon.svg" class="border-0 sender-img" alt="Notifications bell">
                      </div>
                      <div class="notif-msg-wrap">
                        <div class="msg-wrap">
                          <p class="m-0 sender-msg">
                            <span class="m-0 sender-name">REMINDER:</span>
                            Your free trial ends in 3 days. To avoid any interruption in your access, Subscribe now!
                            <!-- <span class="m-0 sender-name">Your Free Trial Has Expired.</span> -->
                            <!-- Upgrade now to regain access to GEEBU as an Artist -->
                          </p>
                        </div>
                        <div class="date-time-wrap">
                            <p class="mb-0 d-flex align-items-center justify-content-between">
                            <small>Yesterday at 9:42 AM</small>
                            <small class="float-end">05/03/2023</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li v-for="(content, index) in notifications" :key="index" class="sender-notif-wrap">
                    <div class="d-flex align-items-start notif-wrap">
                      <div class="img-wrap">
                        <img :src="content?.data?.sender_avatar" class="border-0 sender-img" alt="Sender Avatar">
                      </div>
                      <div class="notif-msg-wrap">
                        <div class="msg-wrap">
                          <p class="m-0 sender-msg" v-if="content?.data?.notification_type === 'artist-proposal'">
                            <span class="m-0 sender-name">{{ content?.data?.sender_name }}</span>&nbsp;{{ `${ content?.data?.header } ${content?.data?.misc?.event_name}`}}!
                          </p>
                        </div>
                        <div class="date-time-wrap">
                            <p class="mb-0 d-flex align-items-center justify-content-between">
                            <small>{{ $filters.diffForHumans($moment(content?.data?.time).format('YYYY-MM-DD hh:mm:ss a')) }}</small>
                            <small class="float-end">{{ $moment(content?.data?.time).format('MM/DD/YYYY') }}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>

                  <div class="d-flex align-items-center justify-content-between mb-0 action-wrap">
                      <button class="btn float-end mb-0 all-read" @click="markAsRead">Mark all as read</button>
                      <router-link to="/account/setting" class="btn all-notif " @click="$store.commit('setSettingMenu', 'Notifications')">See all notification</router-link>
                  </div>

                </ul>

              </div>

              <a href="#"><span class="material-symbols-outlined" v-if="userRole === 'customers'">&#xe8cc;</span></a>

              <div class="dropdown dropstart">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                  <img :src="myAccount?.avatar || myAvatar" alt="artist profile" @error="replaceByDefault" @click="$router.push('/dashboard')">
                  <span class="material-symbols-rounded">&#xe313;</span>
                </button>

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                  <li>
                    <div class="d-flex align-items-start artist-info">
                      <img :src="myAccount?.avatar || myAvatar" alt="artist profile" @error="replaceByDefault" >
                      <div class="artist-name">
                        <p class="two-lines name">{{  userInfo.business_name }}</p>
                        <!-- <p class="email">{{ userInfo.business_email }}</p> -->
                        <p class="email" style="text-transform: capitalize;">{{  userInfo.role }}</p>
                        <router-link to="/account/profile" class="dropdown-item view-profile">Edit Profile</router-link>
                      </div>
                    </div>
                  </li>

                  <li><hr class="dropdown-divider"></li>

                  <li >
                    <span class="material-symbols-outlined">&#xe853;</span>
                    <router-link to="/account/setting" class="dropdown-item" @click="$store.commit('setSettingMenu', 'My Account')">Account Settings</router-link>
                  </li>

                  <li v-if="[ 'customers', 'organizer', ].includes(userRole)">
                    <span class="material-symbols-outlined">&#xe158;</span>
                    <router-link to="/message" class="dropdown-item">Message</router-link>
                  </li>

                  <li v-if="[ 'artists', ].includes(userRole)">
                    <span class="material-symbols-outlined">&#xe030;</span>
                    <router-link to="/account/setting" @click="$store.commit('setSettingMenu', 'Customized Songs')" class="dropdown-item">Customized Songs</router-link>
                  </li>

                  <li v-if="[ 'customers', ].includes(userRole)">
                    <span class="material-symbols-outlined">&#xe030;</span>
                    <router-link to="/account/setting" @click="$store.commit('setSettingMenu', 'My Songs')" class="dropdown-item">My Songs</router-link>
                  </li>

                  <li v-if="['customers', 'artists', ].includes(userRole)">
                    <span class="material-symbols-outlined">&#xe614;</span>
                    <router-link to="/account/setting" @click="$store.commit('setSettingMenu', 'My Bookings')" class="dropdown-item">My Bookings</router-link>
                  </li>

                  <li v-if="['artists', ].includes(userRole)">
                    <span class="material-symbols-outlined">&#xf0fb;</span>
                    <router-link to="/account/setting" @click="$store.commit('setSettingMenu', 'Manage Subscriptions')" class="dropdown-item">My Subscription</router-link>
                  </li>

                  <li v-if="['customers', 'organizer',].includes(userRole)">
                    <span class="material-symbols-outlined">&#xe03d;</span>
                    <router-link to="/account/setting" @click="$store.commit('setSettingMenu', 'My Proposal')" class="dropdown-item">My Proposals</router-link>
                  </li>

                  <li>
                    <span class="material-symbols-outlined">&#xe887;</span>
                    <router-link to="#" class="dropdown-item">Help Center</router-link>
                  </li>

                  <li><hr class="dropdown-divider"></li>
                  <li class="logout-wrapper">
                    <span class="material-symbols-outlined">&#xe040;</span>
                    <a class="dropdown-item logout" href="#" @click.prevent="logout">Switch Account</a>
                  </li>

                  <li class="logout-wrapper">
                    <span class="material-symbols-rounded">&#xe9ba;</span>
                    <a class="dropdown-item logout" href="#" @click.prevent="logout">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <router-view></router-view>
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
                    Metus et lectus id viverra fringilla magna morbi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <div class="footer-logo">
              <a href="/">
                <img src="/assets/footer-logo-og.png" loading="lazy" alt="logo">
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
                  <a href="#"  target="_blank"><img src="/assets/facebook.svg" width="25px" height="25px" loading="lazy" alt="facebook logo"></a>
                </li>
                <li>
                  <a href="#"  target="_blank"><img src="/assets/instagram.svg" width="25px" height="25px" loading="lazy" alt="instagram logo"></a>
                </li>
                <li>
                  <a href="#"  target="_blank"><img src="/assets/twitter.svg" width="25px" height="25px" loading="lazy" alt="twitter logo"></a>
                </li>
                <li>
                  <a href="#" target="_blank"><img src="/assets/youtube.svg" width="25px" height="25px" loading="lazy" alt="youtube logo"></a>
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
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
// eslint-disable-next-line import/no-absolute-path
import SubscriptionModal from '/src/components/Artist/SubscriptionModal.vue'
import NProgress from 'nprogress'

export default {
  components: {
    SubscriptionModal
  },
  setup () {

  },
  data () {
    return {
      customersDropdown: [
        // change all icons name to &#x + Code point
        { icon: 'account_circle', name: 'Account Settings', link: '' },
        { icon: 'mail', name: 'Message', link: '' },
        { icon: 'library_music', name: 'My Songs', link: '/' },
        { icon: 'event_available', name: 'My Bookings', link: '/' },
        // { icon: 'queue_music', name: 'My Proposals', link: '/'},
        { icon: 'help', name: 'Help Center', link: '/' }
      ],
      login: '/login',
      home: '/',
      createSong: '/create-song',
      artist: '/artist',
      events: '/events',
      otherServices: '/services',
      partnerWithUs: '/partners',
      blog: '/blog',
      privacy: '/privacy',
      support: '/support',
      terms: '/terms',
      facebookPage: 'https://www.facebook.com/',
      instagramPage: 'https://www.instagram.com/',
      twitterPage: 'https://twitter.com/',
      youtubePage: 'https://www.youtube.com/'

    }
  },
  mounted () {
    console.log('Route Meta ', this.$route)
    console.log('Router Meta ', this.$router)

    this.$store.dispatch('fetchNotifications')
    // setInterval(() => {
    //   this.$store.dispatch("fetchNotifications");
    // }, 60000);
  },
  methods: {
    openModal (data) {
      this.$root.$emit('bv::show::modal', '#selectPlanModal')
    },
    ...mapActions([
      'signout', 'markAllNotificationAsRead', 'fetchNotifications'
    ]),
    ...mapMutations([
      'SET_ACCOUNT', 'SET_PROFILE', 'SET_AUTH',
      'SET_ARTIST_GENRES', 'SET_MEMBERS', 'SET_NOTIFICATIONS'
    ]),
    markAsRead () {
      this.markAllNotificationAsRead('profile')
    },
    async logout () {
      NProgress.start()

      await this.signout()
        .then(response => {
          const { status } = response
          console.log('Signout: ', response)

          if (status === 203) {
            this.$store.commit('CLEAR_STATE')
            // this.$store.commit('CLEAR_ARTIST');

            this.$router.push('/')

            setTimeout(() => {
              NProgress.done()
            }, 1000)
          } else if (status === 200 || status === 401) {
            this.$router.push('/')
            // this.$router.push('/login');
          } else if (this.$route.meta.requiresLogin == false) this.$router.go()
        })
    },
    replaceByDefault (e) {
      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&usqp=CAU'
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userInfo', 'info', 'userRole', 'myAccount', 'myAvatar']),
    ...mapState({
      users: (state) => state.user,
      notifications: state => state.notifications.notifications.slice(0, 5)
    })
  },
  created () {
    console.log('isLoggedIn:', this.isLoggedIn)
    console.log('userRole:', this.userRole)
  }
}
</script>

<style scoped>
.requested-by-image {
  width: 3rem !important;
  height: 3rem !important;
  border-radius: 100% !important;
  margin-right: 0.5rem !important;
}

.dropdown-notif li div {
  background: #fff !important;
}
.truncate-text {
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis ellipsis!important;
}
.footer .container{
  margin-top: 100px;
}
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
  margin-bottom: 3rem;
}

.footer .container .row:nth-child(2) {
  margin-bottom: 3rem;
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
.footer-logo a img{
  width: 201px;
  height: 53px;
}

@media (min-width: 992px) and (max-width: 1399.98px) {

  .footer .menu .our-company,
  .footer .menu .songs,
  .footer .menu .for-artist {
    padding: 0 40px;
  }
  .footer .menu h4{
    font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  margin-bottom: 0.94rem;
  }
  .footer .menu ul li a{
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 0.81rem;
  }
  .footer .card h5{
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem; /* 175% */
  }
  .footer .card p{
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .footer .copy p{
    font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  }
  .footer .copy, .social-media-icons{
    margin-top: 0.3rem;
  }
  .footer-logo a img{
    width: 9.4375rem;
    height: 2.5rem;
}
  .footer .container .row:nth-child(2) {
    margin-bottom: 0.99rem;
  }

}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .footer .card .card-body {
    padding: 1.8rem 1.8rem 2.8rem;
}
.footer .menu .our-company, .footer .menu .songs, .footer .menu .for-artist {
    padding: 0 1.7rem;
}
}
</style>
