import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Multiselect from '@vueform/multiselect'

import router from './router';
import i18n from './plugins/i18n';
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import 'bootstrap-vue/dist/bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import App from './App.vue';

// Fontawesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faTrash, } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faYoutube, faSpotify, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(faUserSecret, faTrash, faTwitter, faYoutube, faSpotify, faInstagram)

import './style.css'

createApp(App)
  .use(i18n)
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .use(BootstrapVueIcons)
  .component('multi-select', Multiselect)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
