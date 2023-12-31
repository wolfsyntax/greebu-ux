/* eslint-disable no-async-promise-executor */
/* eslint-disable camelcase */
import axios from 'axios'

export const fetchArtistOptions = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/artists/create`,
          payload
        )
        .then((response) => {
          const { data, status } = response

          console.log('\n\nFetch Artist Options Response: ', response)

          if (status === 200 && data.status === 200) {
            const { result } = data

            const genre = result?.genres
            console.log('- Genre: ', genre)

            const exists =
              genre.filter(function (o) {
                return Object.prototype.hasOwnProperty.call(o, 'title')
              }).length > 0

            if (exists) {
              commit('SET_GENRES', genre)
            } else {
              commit('SET_GENRES', genre)
            }

            commit('SET_ARTIST_TYPES', result?.artist_types)
            commit('SET_ARTIST_GENRES', result?.artist_genre)
            commit('SET_MEMBERS', result?.members)
            commit('SET_ARTIST', result?.profile)
            commit('SET_ACCOUNT', result?.account)
          }

          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1500)
  })
}

export const updateArtistProfile = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/artists`,
          payload,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response) => {
          console.log('\n\nUpdate Artist Profile Response: ', response)

          const { data } = response
          // commit('setContracts', data)
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

export const addMember = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/artists/member`,
          payload,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response) => {
          console.log('\n\nAdd Member Response: ', response)

          const {
            status: statusCode,
            data: { result, status, message }
          } = response
          if (statusCode === 200 && status === 200) {
            const { members } = result
            commit('SET_MEMBERS', members)
            resolve({ status: statusCode, message, result })
          }
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message, status: statusCode, result })
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

export const addSocialMedia = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/artists/social-account`,
          payload
        )
        .then((response) => {
          console.log('\n\nAdd Social Media Response: ', response)

          const {
            data: { status, result }
          } = response

          if (status === 200) {
            commit('SET_ARTIST', result.artist_profile)
          }

          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}
export const removeSocialMedia = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .delete(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/artists/social-account/${payload}/destroy`
        )
        .then((response) => {
          console.log('\n\nRemove Social Media Response: ', response)

          const {
            data: { status, result }
          } = response
          if (status === 200) {
            commit('SET_ARTIST', result.artist_profile)
          }

          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

export const removeMember = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    state.members = state.members.filter((item) => item.id !== payload)
    // .filter((item) => item !== index)
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(() => {
      axios
        .delete(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/artists/member/${payload}`
        )
        .then((response) => {
          console.log('\n\nRemove Member Response: ', response)

          const {
            data: { result, status }
          } = response

          if (status === 200) {
            commit('SET_MEMBERS', result.members)
          }

          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

// Update
export const updateMember = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)
    console.log('\n\n\nupdateMember payload: ', payload)
    setTimeout(() => {
      axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/artists-member/${payload.memId}`,
          payload.form,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response) => {
          console.log('\n\nUpdate Member Response: ', response)

          const {
            status: statusCode,
            data: { status, result, message }
          } = response
          if (
            (statusCode === 200 && status === 200) ||
            (statusCode === 203 && status === 403)
          ) {
            const { members } = result
            commit('SET_MEMBERS', members)
            resolve({ status: statusCode, message, result })
          }
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message, status: statusCode, result })
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}

// Update
export const fetchArtists = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    let url = `${
      import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    }/api/artist-filter`
    if (rootState.bearerToken) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + (rootState.bearerToken || localStorage.api_token)
      url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/artists-filter`
    }

    url = `${url}?per_page=${
      payload?.per_page || 12
    }&search=${encodeURIComponent(
      payload?.search || ''
    )}&artist_type=${encodeURIComponent(
      payload?.artist_type || ''
    )}&artist_category=${encodeURIComponent(payload?.artist_category || '')}&language=${encodeURIComponent(payload?.language || '')}&city=${
      encodeURIComponent(payload?.city || '')
    }&province=${encodeURIComponent(payload?.province || '')}&sortBy=${
      payload?.sortBy || 'DESC'
    }`
    console.log(`\n\nArtist List url: ${url}`)
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          console.log('\n\nFetch Artists Response: ', response)

          const {
            data: {
              result: {
                data: artistList,
                current_page,
                last_page,
                per_page,
                total
              }
            }
          } = response
          // commit('SET_MEMBERS', data)
          commit('SET_ARTISTS', artistList)
          commit('SET_PAGINATION', {
            current_page,
            last_page,
            per_page,
            total
          })

          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1000)
  })
}
export const artistOptions = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/artist/forms`,
          payload
        )
        .then((response) => {
          console.log('\n\nArtist Options Response: ', response)

          const {
            status: statusCode,
            data: { result }
          } = response
          if (statusCode === 200) {
            const genre = result?.genres

            const exists =
              genre.filter(function (o) {
                return Object.prototype.hasOwnProperty.call(o, 'title')
              }).length > 0

            if (exists) {
              commit('SET_GENRES', genre)
            } else {
              commit('SET_GENRES', genre || [])
            }

            console.log('Artist Options: ', result)

            commit('SET_ARTIST_TYPES', result?.artist_types || [])
            commit('setArtistCategory', result?.artist_categories || [])
          }

          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1500)
  })
}

export const fetchArtistById = (
  { commit, rootState, state, dispatch },
  payload
) => {
  return new Promise(async (resolve, reject) => {
    // setTimeout(async () => {
    await axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
        }/api/artists/${payload}/info`
      )
      .then((response) => {
        console.log('\n\nFetch Artist By Name Response: ', response)

        const {
          data: {
            status,
            result: { artist, members }
          }
        } = response

        if (status === 200) {
          commit('setArtistProfile', artist)
          commit('setArtistMembers', members)

          commit('setArtistSchedules')
          commit('setArtistSongs')
          commit('setArtistOngoingEvents')
          commit('setArtistUpcomingEvents')
          commit('setArtistPastEvents')
          commit('setArtistVideos')
          commit('setArtistPhotos')
          commit('setArtistReviews')
          commit('setArtistBookings')
          commit('setArtistPosts')

          console.log('Artist ID: ', artist.id)

          dispatch('fetchArtistOngoingEvents', artist.id)
          dispatch('fetchArtistUpcomingEvents', artist.id)
          dispatch('fetchArtistPastEvents', artist.id)
        }

        // commit("SET_ARTIST_PROFILE", artist);
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
    // }, 1500);
  })
}

export const fetchArtistBySlug = (
  { commit, rootState, state, dispatch },
  payload
) => {
  return new Promise(async (resolve, reject) => {
    // commit("setArtistMembers", []);
    // commit("setArtistSchedules", []);
    // commit("setArtistSongs", []);
    // commit("setArtistOngoingEvents", []);
    // commit("setArtistUpcomingEvents", []);
    // commit("setArtistPastEvents", []);
    // commit("setArtistVideos", []);
    // commit("setArtistPhotos", []);
    // commit("setArtistReviews", []);
    // commit("setArtistBookings", []);
    // commit("setArtistPosts", []);

    // setTimeout(async () => {
    await axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
        }/api/artists/${payload}/details`
      )
      .then((response) => {
        console.log('\n\nFetch Artist By Slug Response: ', response)

        const {
          data: {
            status,
            result: { artist, members }
          }
        } = response

        if (status === 200) {
          commit('setArtistProfile', artist)
          commit('setArtistMembers', members)

          commit('setArtistSchedules')
          commit('setArtistSongs')
          commit('setArtistOngoingEvents')
          commit('setArtistUpcomingEvents')
          commit('setArtistPastEvents')
          commit('setArtistVideos')
          commit('setArtistPhotos')
          commit('setArtistReviews')
          commit('setArtistBookings')
          commit('setArtistPosts')

          dispatch('fetchArtistOngoingEvents', artist.id)
          dispatch('fetchArtistUpcomingEvents', artist.id)
          dispatch('fetchArtistPastEvents', artist.id)
        }

        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
    // }, 1500);
  })
}

export const fetchArtistOngoingEvents = (
  { commit, rootState, state },
  payload
) => {
  return new Promise(async (resolve, reject) => {
    // setTimeout(async () => {
    await axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
        }/api/artists/${payload}/ongoing-events`
      )
      .then((response) => {
        console.log('\n\nFetch Artist Ongoing Response: ', response)

        const {
          data: {
            result: { events }
          }
        } = response
        commit('setArtistOngoingEvents', events)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
    // }, 100);
  })
}

export const fetchArtistUpcomingEvents = (
  { commit, rootState, state },
  payload
) => {
  return new Promise(async (resolve, reject) => {
    // setTimeout(async () => {
    await axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
        }/api/artists/${payload}/upcoming-events`
      )
      .then((response) => {
        console.log('\n\nFetch Artist Upcoming Response: ', response)

        const {
          data: {
            result: { events }
          }
        } = response
        commit('setArtistUpcomingEvents', events)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
    // }, 500);
  })
}

export const fetchArtistPastEvents = (
  { commit, rootState, state },
  payload
) => {
  return new Promise(async (resolve, reject) => {
    // setTimeout(async () => {
    await axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
        }/api/artists/${payload}/past-events`
      )
      .then((response) => {
        console.log('\n\nFetch Artist Past Events Response: ', response)

        const {
          data: {
            result: { events }
          }
        } = response
        commit('setArtistPastEvents', events)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
    // }, 500);
  })
}

export const fetchMember = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/artists/${rootState.account.id}/member/${payload}`,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response) => {
          console.log('\n\nFetch Member detail response: ', response)
          const {
            status: statusCode,
            data: { result, status }
          } = response

          if (statusCode === 200 && status === 200) {
            const { member } = result
            commit('SET_MEMBER', member || {})
          }

          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    }, 1500)
  })
}
