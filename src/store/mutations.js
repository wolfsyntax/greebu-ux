var mutations = {
    SET_AUTH(state, payload) {
      state.role = payload?.profile?.roles[0].name || 'customers';
      state.user = payload.user;
  },
    
  SET_TOKEN(state, payload) {
      state.bearerToken = payload
  },
  SET_PROFILE(state, payload)
  {
      state.profile = payload;    
  }
}

export default mutations
