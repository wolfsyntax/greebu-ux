/* eslint-disable no-async-promise-executor */
/* eslint-disable n/handle-callback-err */
/* eslint-disable camelcase */
import axios from 'axios'

export const fetchSongForm = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/song-requests/create`
        )
        .then((response) => {
          const { data, status } = response
          console.log('Fetch Song Request form options: ', response)
          if (status === 200 && data.status === 200) {
            const { result } = data

            commit('SET_SONG_ARTIST_TYPE', result?.artist_types)
            commit('SET_SONG_MOODS', result?.mood)
            commit('SET_SONG_LANGUAGES', result?.languages)
            commit('SET_SONG_DURATIONS', result?.durations)
            commit('SET_SONG_PURPOSES', result?.purposes)
          }

          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1500)
  })
}

export const createSong = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    const {
      first_name,
      last_name,
      email,
      artists,
      song_type_id,
      language_id,
      duration_id,
      purpose_id,
      sender,
      receiver,
      user_story
    } = state.song
    console.log('Artist Info: ', artists)
    // var artist = {
    //   id:
    // };

    const form = {
      first_name,
      last_name,
      email,
      artists: [{ id: artists.id }],
      song_type_id,
      language_id,
      duration_id,
      purpose_id,
      sender,
      receiver,
      user_story
    }
    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/song-requests/${rootState.role}`,
          form
        )
        .then((response) => {
          const { data, status: statusCode } = response
          if (statusCode === 200) {
            const { status } = data

            if (status === 200) {
              // commit('SET_SONG_ARTIST_TYPE', result?.artist_types)
              // commit('SET_SONG_MOODS', result?.moods)
              // commit('SET_SONG_LANGUAGES', result?.languages);
              // commit('SET_SONG_DURATIONS', result?.durations)
              // commit('SET_SONG_PURPOSES', result?.purposes)
            }
            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

export const fetchCustomizedSong = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/song-requests/artists`
        )
        .then((response) => {
          const { data, status } = response
          console.log(`[Response:${status}] Fetch Customized Songs: `, data)
          if (status === 200) {
            const {
              result: { song_requests }
            } = data

            commit('SET_CUSTOMIZED_SONG', song_requests)

            resolve(data)
          }
        })
        .catch((err) => {})
    }, 1500)
  })
}

export const storeSong = ({ commit, rootState, state }, payload) => {
  return new Promise(async (resolve, reject) => {
    commit('SET_SONG', payload)
  })
}

export const storeArtist = ({ commit, rootState, state }, payload) => {
  return new Promise(async (resolve, reject) => {
    commit('SET_SONG_ARTIST', payload)
  })
}

export const songStepOne = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    let url = ''

    if (state?.song?.id) {
      url = `api/song-requests/info/${state.song?.id}`
    } else {
      url = 'api/song-requests/info'
    }
    console.log('Step One target: ', url)
    console.log('Step One Payload: ', payload)
    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/${url}?role=${rootState.role}`,
          payload
        )
        .then((response) => {
          const { data, status: statusCode } = response

          if (statusCode === 200) {
            const { result, status } = data

            if (status === 200) {
              commit('SET_SONG', result?.song_request)
            }
          }

          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

export const songStepTwo = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    const form = new FormData()
    console.log('Saving Step Two')
    console.log('Mood: ', state.song_mood.id)
    console.log('Language: ', state.song_language.id)
    console.log('Duration: ', state.song_duration.id)
    console.log('Artists: ', state.song_artists)

    // form.append("genre", state.song.genre);
    form.append('song_type_id', state.song_mood.id)
    form.append('language_id', state.song_language.id)
    form.append('duration_id', state.song_duration.id)
    form.append('artists[]', JSON.stringify(state.song_artists))
    console.log('Song request: ', state.song)
    console.log('Song form: ', form)
    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/song-requests/song/${state.song?.id}?role=${rootState.role}`,
          form,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          }
        )
        .then((response) => {
          const { data, status: statusCode } = response
          console.log('Response Step Two', response)
          if (statusCode === 200) {
            const { result, status } = data

            if (status === 200) {
              commit('SET_SONG', result?.song_request)
            }
          }

          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

export const songStepThree = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    const form = new FormData()
    form.append('purpose_id', state.song_purpose.id)
    form.append('sender', payload?.sender || '')
    form.append('receiver', payload?.receiver || '')
    form.append('user_story', payload?.user_story || '')

    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/song-requests/story/${state.song?.id}?role=${rootState.role}`,
          form
        )
        .then((response) => {
          const { data, status: statusCode } = response
          console.log('Step Three API')
          if (statusCode === 200) {
            const { result, status } = data

            if (status === 200) {
              commit('SET_SONG', result?.song_request)
            }
          }

          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

export const songStepFinal = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/song-requests/review/${state.song?.id}?role=${rootState.role}`,
          payload
        )
        .then((response) => {
          const { data, status: statusCode } = response
          console.log('Song Request form: ', response)

          if (statusCode === 200) {
            const { result, status } = data

            if (status === 200) {
              commit('SET_SONG', result?.song_request)
            }
          }

          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

export const storeMood = ({ commit, rootState, state }, payload) => {
  return new Promise(async (resolve, reject) => {
    commit('SET_SONG_MOOD', payload)
  })
}

export const storeLanguage = ({ commit, rootState, state }, payload) => {
  return new Promise(async (resolve, reject) => {
    commit('SET_SONG_LANGUAGE', payload)
  })
}

export const storeDuration = ({ commit, rootState, state }, payload) => {
  return new Promise(async (resolve, reject) => {
    commit('SET_SONG_DURATION', payload)
  })
}

export const storePurpose = ({ commit, rootState, state }, payload) => {
  return new Promise(async (resolve, reject) => {
    commit('SET_SONG_PURPOSE', payload)
  })
}

export const clearSongForm = ({ commit, rootState, state }) => {
  return new Promise(async (resolve, reject) => {
    commit('SET_SONG_ARTIST_TYPE', null)
    commit('SET_SONG_MOODS', null)
    commit('SET_SONG_LANGUAGES', null)
    commit('SET_SONG_DURATIONS', null)
    commit('SET_SONG_PURPOSES', null)
    commit('SET_SONG_MOOD', {})
    commit('SET_SONG_LANGUAGE', {})
    commit('SET_SONG_DURATION', {})
    commit('SET_SONG_PURPOSE', {})
    commit('SET_SONG_REQUEST', null)
    commit('SET_SONG', {
      first_name: null,
      last_name: null,
      email: null,
      genre_id: null,
      song_type_id: null,
      language_id: null,
      duration_id: null,
      purpose_id: null,
      sender: null,
      receiver: null,
      user_story: null,
      page_status: null
    })
    commit('SET_SONG_ARTIST', {})
  })
}

export const fetchSongRequest = (
  { commit, rootState, state },
  payload = null
) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/song-requests/${payload || state.song.id}?role=${
            rootState.role
          }`
        )
        .then((response) => {
          const {
            data: { status, result },
            status: statusCode
          } = response

          if (statusCode === 200 && status === 200) {
            commit('SET_SONG', result?.song_request)
          }

          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}
