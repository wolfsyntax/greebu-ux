import Vuex from 'vuex'

import SecureLS from 'secure-ls'
import createCache from 'vuex-cache'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

import artist from './modules/artists'
import booking from './modules/booking'
import customer from './modules/customers'
import events from './modules/events'
import notifications from './modules/notifications'
import organizer from './modules/organizers'
import posts from './modules/posts'
import userProfile from './modules/profiles'
import artistProposal from './modules/proposals'
import songs from './modules/songs'

const ls = new SecureLS({ isCompression: false })

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      // storage: window.sessionStorage,
      storage: {
        getItem: (key) => window.sessionStorage.getItem(key) || ls.get(key),
        setItem: (key, value) =>
          window.sessionStorage.setItem(key, value) || ls.set(key, value),
        removeItem: (key) =>
          window.sessionStorage.removeItem(key) || ls.remove(key)

        // getItem: key => cookies.get(key),
        // setItem: (key, value) => cookies.set(key, value),
        // removeItem: key => cookies.remove(key)
      }
    }),
    createMutationsSharer({
      predicate: (mutation, state) => {
        const predicate = [
          'SET_AUTH',
          'SET_TOKEN',
          'SET_PROFILE',
          'SET_ROLE',
          'SET_ROLES',
          'SET_PLANS',
          'SET_COUNTRIES',
          'SET_GENRES',
          'SET_ARTIST_TYPES',
          'SET_ARTIST_CATEGORY',
          'SET_ARTIST_GENRES',
          'SET_MEMBERS',
          'SET_ARTIST'
        ]
        // Conditionally trigger other plugins subscription event here to
        // have them called only once (in the tab where the commit happened)
        // ie. save certain values to localStorage
        // pluginStateChanged(mutation, state)

        return predicate.indexOf(mutation.type) >= 0
      }
    }),
    createCache({
      timeout: 10000 // 1 * 60 * 60 * 1000
    })
  ],
  state,
  mutations,
  actions,
  getters,
  modules: {
    artist,
    booking,
    userProfile,
    events,
    customer,
    organizer,
    // services,
    artistProposal,
    notifications,
    songs,
    posts
  },
  strict: false
})
