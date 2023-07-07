import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import state from './state';

import artist from './modules/artists';
import customer from './modules/customers';
import organizer from './modules/organizers';
import services from './modules/services';

const ls = new SecureLS({ isCompression: false });

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
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
  },
  strict: true,
});