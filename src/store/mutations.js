var mutations = {
    SET_AUTH(state, payload) {
      //console.log('Profile: ', payload.profile)
      state.role = payload?.profile?.roles[0].name || 'customers';
      state.user = payload.user;
  },
    
  SET_TOKEN(state, payload) {
      state.bearerToken = payload
  },
  SET_PROFILE(state, payload)
  {
      state.profile = payload.profile;    
  }
}

export default mutations
