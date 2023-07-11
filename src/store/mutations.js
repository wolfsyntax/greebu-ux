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
  }
}

export default mutations
