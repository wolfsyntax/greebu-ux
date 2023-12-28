/* eslint-disable camelcase */
// export const stepOne = state => `${state.url}/step-one/`
// export const stepOne = (state,getters, rootState) => {}
// export const artistProfile = state => state.artist

export const _artist_types = state => state.artist_types
  .map(function (artist_type) {
    return {
      value: artist_type.id,
      text: artist_type.title
    }
  })

export const _moods = state => state.moods
  .map(function (mood) {
    return {
      value: mood.id,
      text: mood.name
    }
  })

export const _languages = state => state.languages
  .map(function (language) {
    return {
      value: language.id,
      text: language.name
    }
  })

export const _durations = state => state.durations
  .map(function (data) {
    return {
      value: data.id,
      text: data.title
    }
  })

export const _purposes = state => state.purposes
  .map(function (data) {
    return {
      value: data.id,
      text: data.name
    }
  })

export const _getSongArtists = state => state.song_artists
export const _getSongLanguage = state => state.song_language
export const _getSongDuration = state => state.song_duration
export const _getSongMood = state => state.song_mood
export const _getSongPurpose = state => state.song_purpose

// export const getSongArtist = (state, getters, rootState) => (id) =>
// {
//   return (rootState.artist.find(artist => artist.id === id))
// }
