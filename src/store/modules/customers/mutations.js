var mutations = {
    setAuth(state, payload) {
        state.profile = payload
    },
    setToken(state, payload) {
        state.bearerToken = payload
    },
}

export default mutations
