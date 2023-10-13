// var Pusher = require("pusher");
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import store from "../store";
export default (app, { apiKey, ...options }) => {
  app.config.globalProperties.$pusher = new Pusher(apiKey, options);
  var url = new URL(
    `${import.meta.env.VITE_BASE_URL || "https://api-dev.geebu.ph"}`
  );

  var wsHost = `${url?.protocol || "http"}://${
    url?.hostname || "api-dev.geebu.ph"
  }`;
  console.log(
    "\nPusher websocket: ",
    new URL(`${import.meta.env.VITE_BASE_URL}`)
  );
  app.config.globalProperties.$echo = new Echo({
    broadcaster: "pusher",
    key: apiKey,
    cluster: options?.cluster || import.meta.env.VITE_PUSHER_CLUSTER,
    wsHost: wsHost,
    wsPort: 6001,
    forceTLS: true,
    authEndpoint: `${
      import.meta.env.VITE_BASE_URL || "https://api-dev.geebu.ph"
    }/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${store.state.bearerToken}`,
      },
    },
  });
};

/*

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

app.config.globalProperties.$pusher = window.Pusher = Pusher;

app.config.globalProperties.$echo = window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true
});
*/
