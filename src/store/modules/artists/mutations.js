export const SET_GENRES = (state, payload) =>
{
  state.genres = payload
  
  // state.genreList = payload.map(function (g) { return g['title'] })
  // console.log('Genre List: ', state.genreList)
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
  state.artist = payload
}

export const SET_ARTISTS = (state, payload) =>
{
  state.artists = payload
}

export const SET_PAGINATION = (state, {
    current_page,
    last_page,
    per_page,
    total,
  }) =>
{
  state.pagination = {
    current_page: current_page || 1,
    last_page: last_page || 1,
    per_page: per_page || 10,
    total: total || 1,
  }
}

export const SET_ARTIST_PROFILE = (state, payload) =>
{
  state.artist_profile = payload
}
