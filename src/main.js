import { createApp } from 'vue';

import './style.css'

import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import router from './router';
import i18n from './plugins/i18n';

import App from './App.vue'

// Fontawesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret)

createApp(App)
  .use(router)
  .use(i18n)
  .use(bootstrap)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
