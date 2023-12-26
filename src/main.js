import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { createApp } from "vue";

import axios from "axios";
import VueAxios from "vue-axios";

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// import Vuesax from 'vuesax'

// import Multiselect  from '@vueform/multiselect'
import "@vueform/multiselect/themes/default.css";

import router from "./router";
import i18n from "./plugins/i18n";
import store from "./store";
import "bootstrap";

import App from "./App.vue";

// Fontawesome Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faYoutube,
  faSpotify,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faUserSecret,
  faTrash,
  faTwitter,
  faYoutube,
  faSpotify,
  faInstagram
);

import jQuery from "jquery";
import moment from "moment";

import "./style.css";
import "./vuesax.css";
// import 'vuesax/dist/vuesax.css';

import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase/init";

import Pusher from "./plugins/pusher";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import TreeItem from "./components/Organizer/TreeItem.vue";

import { createHead } from "@vueuse/head";
const head = createHead();

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import Compressor from 'compressorjs';
//import CircleImage from './components/CircleImage.vue'
import pako from 'pako';

import AudioPlayer from '@liripeng/vue-audio-player';

const app = createApp(App)
  .use(i18n)
  .use(VueAxios, axios)
  // .use(VueCookies, {
  //   expireTimes: "1h",
  //   path: "/",
  //   domain: "",
  //   secure: true,
  //   sameSite: "None"
  // })
  .use(store)
  .use(head)
  .use(router)
  .use(AudioPlayer)
  // .use(Vuesax, {})
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
  .use({
    install: function (Vue, options) {
      Vue.prototype.$jQuery = jQuery; // you'll have this.$jQuery anywhere in your vue project
    },
  })
  // .use(BootstrapVueIcons)
  // .component('multiselect', Multiselect)
  .component("compressor", Compressor)
  .component("cropper", Cropper)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("tree-item", TreeItem)
  //.component("circle-image", CircleImage)
  .component("v-calendar", FullCalendar)
  .component("n-progress", NProgress)
  .component("pako", pako)

app.config.globalProperties.$moment = moment;
app.config.globalProperties.$filters = {
  diffForHumans(date) {
    if (!date) date = moment();

    var text = moment.duration(moment().diff(moment(date))).humanize();

    if (!text.includes("ago")) text = `${text} ago`;

    return text;
  },
  timeAgo(date) {
    return moment(date).fromNow();
  },
  timer(sec) {
    return moment.utc(sec * 1000).format("mm:ss");
  },
};

app.config.globalProperties.$assets = import.meta.env.VITE_ASSET_URL;

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
