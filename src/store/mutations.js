var mutations = {
  SET_AUTH(state, payload)
  {
    // state.role = payload?.profile?.roles[0].name || 'customers';
    // state.user = payload.user;
    state.user = payload;
  },
    
  SET_TOKEN(state, payload) {
    state.bearerToken = payload
  },
  SET_PROFILE(state, payload)
  {
    state.profile = payload;    
  },
  SET_ACCOUNT(state, payload)
  {
    console.log('[vuex:mutation] account: ', payload)
    //payload.genres = payload?.genres.map(function (g) { return g['title']  });
    state.account = payload;    
    // state.account.genre = payload.genre.map(function (g) { return g['title']  });
  },
  SET_PLANS(state, payload)
  {
    state.plans = payload;    
  },
  SET_COUNTRIES(state, payload)
  {
    state.countries = payload;
  },
  SET_ROLE(state, payload)
  {
    state.role = payload;
  },
  SET_ROLES(state, payload)
  {
    state.roles = payload;
  },
  SET_PHONE(state, payload)
  {
    state.phone = payload;
  },
  CLEAR_STATE(state)
  {
    state.profile = {};
    state.user = {};
    state.bearerToken = '';
    state.role = '';
    state.roles = [];
    state.phone = null;
    state.account = {};
  },
  SET_PHONE_ISMODIFIED(state)
  {
    state.isPhoneModify = state
  },
  setShowOnboardingMessage(state, value) {
    state.showOnboardingMessage = value;
  }
}

export default mutations
