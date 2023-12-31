// export const stepOne = state => `${state.url}/step-one/`
export const stepOne = (state, getters, rootState) => {}
export const artistProfile = state => state.artist
export const artistGenre = state => state.artist_genres

export const formArtistGenres = state => state.genres?.concat(state.artist_genres?.filter(el => {
  return !state.genres.includes(el)
})) || state.genres

export const memberInfo = state => {
  return state.memIndex > -1 ? state.members[state.memIndex] : {}
}
