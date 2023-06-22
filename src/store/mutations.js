var mutations = {
    setAuth(state, payload) {
      state.profile = payload.profile;
      console.log('Profile: ', payload.profile)
      state.role = payload?.profile?.roles[0].name || 'customers';
      state.user = payload.user;
    },
    setToken(state, payload) {
        state.bearerToken = payload
    },
}

export default mutations
