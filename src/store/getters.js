var getters = {
  userInfo: state => state.profile,
  token: state => state.bearerToken,
  userRole: state => state.role,
  isLoggedIn: (state) => state.bearerToken && Object.keys(state.profile).length !== 0, //
}

export default getters
