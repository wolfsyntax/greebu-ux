// export const stepOne = state => `${state.url}/step-one/`
// export const stepOne = (state,getters, rootState) => {}
// export const artistProfile = state => state.artist

export const _artist_types = state.artist_types
  .map(function (artist_type)
  {
    return {
      value: artist_type.id,
      text: artist_type.title,
    }
  })

export const _moods = state.moods
  .map(function (mood)
  {
    return {
      value: mood.id,
      text: mood.name,
    }
  })

export const _languages = state.languages
  .map(function (language)
  {
    return {
      value: language.id,
      text: language.name,
    }
  })

export const _durations = state.durations
  .map(function (data)
  {
    return {
      value: data.id,
      text: data.title,
    }
  })

export const _purposes = state.purposes
  .map(function (data)
  {
    return {
      value: data.id,
      text: data.name,
    }
  })