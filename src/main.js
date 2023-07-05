import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Vuesax from 'vuesax'

import Multiselect  from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css';

import router from './router';
import i18n from './plugins/i18n';
import store from './store'

import 'bootstrap';

// import 'bootstrap-vue/dist/bootstrap-vue'
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import App from './App.vue';

// Fontawesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faTrash, } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faYoutube, faSpotify, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(faUserSecret, faTrash, faTwitter, faYoutube, faSpotify, faInstagram)

import moment from 'moment'

// import { UniversalSocialauth } from 'universal-social-auth'
import vue3GoogleLogin from 'vue3-google-login';

import './style.css'
import 'vuesax/dist/vuesax.css';

// import VueSocialauth from 'vue-social-auth'
// const options = {
//   providers: {
//     // apple: {
//     //   nonce: '**************',
//     //   state: '**************',
//     //   clientId: '**************',
//     //   redirectUri: 'https://myapp.com/login/github/callback'
//     // },
//     google: {
//       clientId: '***************',
//       redirectUri: `${import.meta.env.VITE_FACEBOOK_REDIRECT_URI}/login/google/callback`
//     },
//     facebook: {
//       clientId: '************',
//       redirectUri: `${import.meta.env.VITE_FACEBOOK_REDIRECT_URI}/login/facebook/callback`
//     },
//   }
// }

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'

const app = createApp(App)
  .use(i18n)
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .use(Vuesax, {})

  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
  // .use(VueSocialauth, {
  //   providers: {
  //     google: {
  //       clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  //       clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
  //       redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  //     },
  //     facebook: {
  //       clientId: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
  //       clientSecret: import.meta.env.VITE_FACEBOOK_CLIENT_SECRET,
  //       redirectUri: import.meta.env.VITE_FACEBOOK_REDIRECT_URI,
  //     }
  //   }
  // })
  // .use(BootstrapVueIcons)
  .component('multiselect', Multiselect)
  .component('font-awesome-icon', FontAwesomeIcon)


app.config.globalProperties.$filters = {
  // $Oauth: Oauth,
  // $axios: axios,
  timeAgo(date) {
  return moment(date).fromNow()
  },
}

app.mount('#app');

import "bootstrap/dist/js/bootstrap.js"