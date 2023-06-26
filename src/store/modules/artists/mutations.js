export const SET_GENRES = (state, payload) =>
{
  state.genres = payload
}

export const SET_ARTIST_TYPES = (state, payload) =>
{
  state.artist_types = payload
} 

export const SET_ARTIST_GENRES = (state, payload) => {
  state.artist_genres = payload
}

export const SET_MEMBERS = (state, payload) => {
  state.members = payload || [];
}

export const SET_ARTIST = (state, payload) =>
{
  console.log('Artist: ', payload)
  state.artist = payload
}
