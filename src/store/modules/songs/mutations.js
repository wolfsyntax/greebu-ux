export const SET_SONG_ARTIST_TYPE = (state, payload) =>
{
  state.artist_types = payload
}

export const SET_SONG_MOODS = (state, payload) =>
{
  state.moods = payload
} 

export const SET_SONG_LANGUAGES = (state, payload) =>
{
  state.languages = payload
} 

export const SET_SONG_DURATIONS = (state, payload) =>
{
  state.durations = payload
} 

export const SET_SONG_PURPOSES = (state, payload) =>
{
  state.purposes = payload
} 

export const SET_SONG_REQUEST = (state, payload) =>
{
  state.song = payload
}

export const SET_SONG = (state, payload) =>
{
  state.song = payload;
}
