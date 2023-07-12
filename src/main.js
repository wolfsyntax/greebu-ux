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

import App from './App.vue';

// Fontawesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faTrash, } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faYoutube, faSpotify, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(faUserSecret, faTrash, faTwitter, faYoutube, faSpotify, faInstagram)

import moment from 'moment'

import './style.css'
import 'vuesax/dist/vuesax.css';

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase/init';

import Pusher from './plugins/pusher';

const app = createApp(App)
  .use(i18n)
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .use(Vuesax, {})
  .use(Pusher, {
    apiKey: import.meta.env.VITE_PUSHER_APP_KEY,
    appId: import.meta.env.VITE_PUSHER_APP_ID,
    secret: import.meta.env.VITE_PUSHER_APP_SECRET,
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  })

  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
  // .use(BootstrapVueIcons)
  .component('multiselect', Multiselect)
  .component('font-awesome-icon', FontAwesomeIcon)


app.config.globalProperties.$filters = {
  timeAgo(date) {
  return moment(date).fromNow()
  },
}

app.config.globalProperties.$assets = import.meta.env.VITE_ASSET_URL;

app.mount('#app');

import "bootstrap/dist/js/bootstrap.js"
