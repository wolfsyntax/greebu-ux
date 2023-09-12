// var Pusher = require("pusher");
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import store from '../store';
export default (app, { apiKey, ...options }) =>
{
  app.config.globalProperties.$pusher = new Pusher(apiKey, options);

  app.config.globalProperties.$echo = new Echo({
    broadcaster: 'pusher',
    key: apiKey,
    cluster: options?.cluster || import.meta.env.VITE_PUSHER_CLUSTER,
    forceTLS: true,
    authEndpoint: `${import.meta.env.VITE_BASE_URL}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${store.state.bearerToken}`,
      }
    }
}); 
}

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