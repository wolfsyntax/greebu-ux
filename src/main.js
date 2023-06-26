import 'bootstrap/dist/css/bootstrap.min.css';
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

import './style.css'
import 'vuesax/dist/vuesax.css';


const app = createApp(App)
  .use(i18n)
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .use(Vuesax, {})
  // .use(BootstrapVueIcons)
  .component('multiselect', Multiselect)
  .component('font-awesome-icon', FontAwesomeIcon)


app.config.globalProperties.$filters = {
  timeAgo(date) {
  return moment(date).fromNow()
  },
}

app.mount('#app');

import "bootstrap/dist/js/bootstrap.js"