import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import createMutationsSharer from 'vuex-shared-mutations'
import createCache from 'vuex-cache';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import state from './state';

import artist from './modules/artists';
import customer from './modules/customers';
import organizer from './modules/organizers';
import services from './modules/services';
import songs from './modules/songs';

const ls = new SecureLS({ isCompression: false });

export default new Vuex.Store({
    plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    }),
    createMutationsSharer({
      predicate: (mutation, state) => {
        const predicate = [
          'SET_AUTH', 'SET_TOKEN', 'SET_PROFILE', 'SET_ROLE', 'SET_ROLES', 'SET_PLANS', 'SET_COUNTRIES',
          'SET_GENRES', 'SET_ARTIST_TYPES', 'SET_ARTIST_GENRES', 'SET_MEMBERS', 'SET_ARTIST',
        ];
        // Conditionally trigger other plugins subscription event here to
        // have them called only once (in the tab where the commit happened)
        // ie. save certain values to localStorage
        // pluginStateChanged(mutation, state)

        return predicate.indexOf(mutation.type) >= 0;
      }
    }),
    createCache({
      timeout: 1 * 60 * 60 * 1000 
    })
  ],
  state,
  mutations,
  actions,
  getters,
  modules: {
    artist,
    customer,
    // organizer,
    // services,
    songs,
  },
  strict: false,
});