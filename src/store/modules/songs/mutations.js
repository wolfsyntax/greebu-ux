export const SET_SONG_ARTIST_TYPE = (state, payload) => {
  state.artist_types = payload
}

export const SET_SONG_MOODS = (state, payload) => {
  state.moods = payload
}

export const SET_SONG_LANGUAGES = (state, payload) => {
  state.languages = payload
}

export const SET_SONG_DURATIONS = (state, payload) => {
  state.durations = payload
}

export const SET_SONG_PURPOSES = (state, payload) => {
  state.purposes = payload
}

export const SET_SONG_REQUEST = (
  state,
  payload = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    artists: [],
    // genre: null,
    sender: null,
    receiver: null,
    user_story: null,
    page_status: null,
    delivery_date: null,
    estimate_date: null,
    song_type_id: null,
    language_id: null,
    duration_id: null,
    purpose_id: null // What is the song for?
  }
) => {
  state.song = payload
}

export const SET_SONG = (state, payload) => {
  state.song = payload
}

export const SET_SONG_ARTIST = (state, payload) => {
  state.song_artists = payload
}

export const SET_SONG_LANGUAGE = (state, payload) => {
  state.song.language_id = payload?.id
  state.song_language = payload
}

export const SET_SONG_DURATION = (state, payload) => {
  state.song.duration_id = payload?.id
  state.song_duration = payload
}

export const SET_SONG_PURPOSE = (state, payload) => {
  state.song.purpose_id = payload?.id
  state.song_purpose = payload
}

export const SET_SONG_MOOD = (state, payload) => {
  state.song.song_type_id = payload?.id
  state.song_mood = payload
}

export const SET_SONG_GENRE = (state, payload = '') => {
  state.song_genre = payload
}
export const SET_CUSTOMIZED_SONG = (state, payload = []) => {
  state.customized_songs = payload
}

export const selectSongArtist = (state, payload = []) => {
  console.log('Selected Artist: ', payload)
  state.song.artists = payload
}

export const setSongPageStatus = (state, payload = 'info') => {
  state.song.page_status = payload || 'info'
}

export const RESET_SONG_FILTER = (
  state,
  payload = {
    artist_type: null,
    artist_genre: null,
    rating: null,
    sort: null
  }
) => {
  state.artist_filter = payload
}
// export const setSongGenre = (state, payload = "") => {
//   state.song.genre = payload;
// };
