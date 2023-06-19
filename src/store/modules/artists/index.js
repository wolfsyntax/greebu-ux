import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import state from './state';

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
    contract,
    user,
  }
});