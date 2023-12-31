import axios from 'axios'

export const fetchEventOptions = ({ commit, rootState }) => {
  return new Promise((resolve, reject) => {
    // axios.defaults.headers.common["Authorization"] =
    //   "Bearer " + (rootState.bearerToken || localStorage.api_token);

    setTimeout(async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/events/create`
        )
        .then((response) => {
          const {
            status: statusCode,
            data: { status, message, result }
          } = response

          if (statusCode === 200 && status === 200) {
            console.log('Fetch Event Option: ', response)
            const {
              event_types,
              event_artist_type,
              event_service_type,
              event_pricing
            } = result

            commit('SET_EVENT_OPTIONS', event_types || [])
            commit('SET_LOOK_FORM', { event_artist_type, event_service_type })
            resolve({ status: statusCode, message, result })
          }

          reject({ message, status: statusCode, result })
        })
    }, 1500)
  })
}

export const fetchEventList = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    let url = ''

    if (
      rootState.bearerToken !== '' &&
      Object.keys(rootState.profile).length !== 0
    ) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + (rootState.bearerToken || localStorage.api_token)

      url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/events?search=${
        encodeURIComponent(state.eventFilter.search) || ''
      }`
    } else {
      url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/events-list?search=${
        encodeURIComponent(state.eventFilter.search) || ''
      }`
    }

    if (state.eventFilter?.city !== '') {
      url = `${url}&city=${encodeURIComponent(state.eventFilter.city) || ''}`
    }

    if (state.eventFilter?.sortBy !== '') {
      url = `${url}&sortBy=${state.eventFilter.sortBy || 'DESC'}`
    }

    if (
      state.eventFilter?.cost === 'free' ||
      state.eventFilter?.cost === 'paid'
    ) {
      url = `${url}&cost=${state.eventFilter.cost || 'both'}`
    } else {
      url = `${url}&cost=both`
    }

    if (state.eventFilter?.event_type !== '') {
      url = `${url}&event_type=${
        encodeURIComponent(state.eventFilter.event_type) || ''
      }`
    }

    console.log('Event Request URL: ', url)
    setTimeout(async () => {
      await axios
        .get(url)
        .then((response) => {
          console.log('Fetch Events: ', response)

          const { status: statusCode, data } = response

          if (statusCode === 200) {
            const {
              status,
              message,
              result: { events }
            } = data
            commit('SET_EVENT_LIST', events)
            console.log('Fetch Event Form: ', events)
            // commit('SET_EVENT_FORM', event);
            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    }, 1500)
  })
}

export const fetchEvents = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    const url = ''
    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/events/${state.form.id}/look`,
          formData
        )
        .then((response) => {
          console.log('Fetch Events: ', response)

          const { status: statusCode, data } = response

          if (statusCode === 200) {
            const {
              status,
              message,
              result: { event }
            } = data
            console.log('Fetch Event Form: ', event)
            // commit('SET_EVENT_FORM', event);
            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    }, 1000)
  })
}

export const verifyEvent = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)
    console.log('Verify Event [form]: ', state.form)
    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/events/verify`,
          state.form,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response) => {
          console.log('Event form Validation: ', response)
          const { status: statusCode, data } = response
          if (statusCode === 200) {
            const {
              status,
              message,
              result: { event }
            } = data
            if (status === 201) {
              event.look_for = 'artist'
            }

            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    }, 1000)
  })
}

export const createEvent = (
  { dispatch, commit, rootState, state },
  payload
) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    if (payload === 'skip') {
      delete state.form.look_for
      delete state.form.look_type
      delete state.form.requirement
    }

    state.form.mode = 'store'
    console.log('Create Event form: ', state.form)
    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/events`,
          state.form,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response) => {
          console.log('Create Event: ', response)
          const { status: statusCode, data } = response
          if (statusCode === 200) {
            const {
              status,
              message,
              result: { event }
            } = data

            commit('RESET_EVENT_FORM', event)
            dispatch('fetchEventList')

            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    }, 1000)
  })
}

export const updateMyEvent = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    if (!payload) reject({ status: 404, message: '', result: [] })
    else {
      const url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/events/${payload}/update`

      state.form.mode = 'update'
      console.log('Update Form:: ', state.form)
      setTimeout(async () => {
        await axios
          .post(url, state.form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            const { status: statusCode, data } = response
            console.log('Update Event info: ', response)
            if (statusCode === 200) {
              const { result } = data
              console.log('Update Event result: ', result)
              commit('SET_EVENT_FORM', result?.event || {})
              commit('SET_EVENT', result?.event || {})

              resolve(data)
            }

            reject(data)
          })
          .catch((err) => {
            console.log('Form Error: ', err)
            const { data } = err
            reject(data)
          })
      }, 1000)
    }
  })
}

export const updateEvent = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    console.log('Update Form data for step 2: ', state.form)
    const { look_for, look_type, requirement } = state.form
    const formData = { look_for, look_type, requirement }
    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/events/${state.form.id}/look`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response) => {
          console.log('Update Event: ', response)

          const { status: statusCode, data } = response

          if (statusCode === 200) {
            const {
              status,
              message,
              result: { event }
            } = data

            commit('SET_EVENT_FORM', event)
            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    }, 1000)
  })
}

export const removeEvent = (
  { dispatch, commit, rootState, state },
  payload
) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    if (state.eventId === '' || state.eventId === null) { reject({ status: 404, message: 'No Event selected', result: [] }) }

    const url = `${
      import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    }/api/events/${state.eventId}`
    console.log('Cancel event url: ', url)
    setTimeout(async () => {
      await axios
        .post(url, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          const { status: statusCode, data } = response
          if (statusCode === 200) {
            const {
              status,
              message,
              result: { event }
            } = data

            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    }, 1000)
  })
}

export const fetchEvent = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    if (!payload) reject({ status: 404, message: '', result: [] })
    else {
      const url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/events/${payload}`

      console.log('\n\nEvent Url: ', url)
      setTimeout(async () => {
        await axios
          .get(url)
          .then((response) => {
            const { status: statusCode, data } = response

            if (statusCode === 200) {
              console.log('Fetch Event info: ', response)
              const { result } = data
              console.log('Fetch Event result: ', result)
              commit('SET_EVENT_FORM', result?.event || {})
              commit('SET_EVENT', result?.event || {})

              resolve(data)
            }

            reject(data)
          })
          .catch((err) => {
            const { data } = err
            reject(data)
          })
      }, 1500)
    }
  })
}

export const myOngoingEvents = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)
    commit('SET_EVENT', {})

    let url = `${
      import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    }/api/events/ongoing`

    if (rootState.role === 'artists') {
      url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/artist-proposal/accepted/ongoing`
    }

    setTimeout(async () => {
      await axios
        .get(url)
        .then((response) => {
          console.log('Fetch My Ongoing Events: ', response)

          const { status: statusCode, data } = response

          if (statusCode === 200) {
            const {
              status,
              message,
              result: { events }
            } = data
            commit('SET_ONGOING_EVENTS', events || [])
            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    }, 1500)
  })
}

export const myUpcomingEvents = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)
    commit('SET_EVENT', {})

    let url = `${
      import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    }/api/events/upcoming`

    if (rootState.role === 'artists') {
      url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/artist-proposal/accepted/upcoming`
    }

    setTimeout(async () => {
      await axios
        .get(url)
        .then((response) => {
          const { status: statusCode, data } = response
          console.log('Fetch My Upcoming Events: ', response)
          if (statusCode === 200) {
            const {
              status,
              message,
              result: { events }
            } = data

            commit('SET_UPCOMING_EVENTS', events || [])
            console.log('Upcoming Events: ', events)
            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    }, 1500)
  })
}

export const myPastEvents = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    commit('SET_EVENT', {})

    let url = `${
      import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    }/api/events/past`

    if (rootState.role === 'artists') {
      url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/artist-proposal/accepted/past`
    }

    setTimeout(async () => {
      await axios
        .get(url)
        .then((response) => {
          console.log('Fetch My Past Events: ', response)

          const { status: statusCode, data } = response

          if (statusCode === 200) {
            const {
              status,
              message,
              result: { events }
            } = data
            commit('SET_PAST_EVENTS', events || [])
            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    }, 1500)
  })
}

export const ongoingEvents = ({ commit, rootState, state }) => {
  return new Promise(async (resolve, reject) => {
    let url = `${
      import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    }/api/events-ongoing?search=${
      encodeURIComponent(state.eventFilter.search) || ''
    }`

    if (rootState.bearerToken) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + (rootState.bearerToken || localStorage.api_token)

      url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/events-ongoing/auth?search=${
        encodeURIComponent(state.eventFilter.search) || ''
      }`
    }

    if (state.eventFilter?.city !== '') {
      url = `${url}&city=${encodeURIComponent(state.eventFilter.city) || ''}`
    }

    if (state.eventFilter?.sortBy !== '') {
      url = `${url}&sortBy=${state.eventFilter.sortBy || 'DESC'}`
    }

    if (
      state.eventFilter?.cost === 'free' ||
      state.eventFilter?.cost === 'paid'
    ) {
      url = `${url}&cost=${state.eventFilter.cost || 'both'}`
    } else {
      url = `${url}&cost=both`
    }

    if (state.eventFilter?.event_type !== '') {
      url = `${url}&event_type=${
        encodeURIComponent(state.eventFilter.event_type) || ''
      }`
    }

    url = `${url}&per_page=${state.ongoingPagination?.per_page || 8}&page=${
      state.ongoingPagination?.page || 1
    }`

    console.log('Event page [ongoing]: ', url)
    // setTimeout(async () => {
    await axios
      .get(url)
      .then((response) => {
        console.log('Fetch Ongoing Events: ', response)

        const { status: statusCode, data } = response

        if (statusCode === 200) {
          const {
            status,
            message,
            result: { events, pagination }
          } = data
          commit('setOngoingEvents', events || [])
          commit(
            'setOngoingPagination',
            pagination || {
              total: 0,
              last_page: 1,
              per_page: 8,
              offset: 8
            }
          )
          resolve(data)
        }

        reject(data)
      })
      .catch((err) => {
        const { data } = err
        reject(data)
      })
    // }, 500);
  })
}

export const upcomingEvents = ({ commit, rootState, state }) => {
  return new Promise(async (resolve, reject) => {
    let url = `${
      import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    }/api/events-upcoming?search=${
      encodeURIComponent(state.eventFilter.search) || ''
    }`

    if (rootState.bearerToken) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + (rootState.bearerToken || localStorage.api_token)

      url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/events-upcoming/auth?search=${
        encodeURIComponent(state.eventFilter.search) || ''
      }`
    }

    if (state.eventFilter?.city !== '') {
      url = `${url}&city=${encodeURIComponent(state.eventFilter.city) || ''}`
    }

    if (state.eventFilter?.sortBy !== '') {
      url = `${url}&sortBy=${state.eventFilter.sortBy || 'ASC'}`
    }

    if (
      state.eventFilter?.cost === 'free' ||
      state.eventFilter?.cost === 'paid'
    ) {
      url = `${url}&cost=${state.eventFilter.cost || 'both'}`
    } else {
      url = `${url}&cost=both`
    }

    if (state.eventFilter?.event_type !== '') {
      url = `${url}&event_type=${
        encodeURIComponent(state.eventFilter.event_type) || ''
      }`
    }

    url = `${url}&per_page=${state.upcomingPagination?.per_page || 8}&page=${
      state.upcomingPagination?.page || 1
    }`

    console.log('Event page [upcoming]: ', url)

    // setTimeout(async () => {
    await axios
      .get(url)
      .then((response) => {
        const { status: statusCode, data } = response
        console.log('Fetch Upcoming Events: ', response)
        if (statusCode === 200) {
          const {
            status,
            message,
            result: { events, pagination }
          } = data

          commit('setUpcomingEvents', events || [])
          commit(
            'setUpcomingPagination',
            pagination || {
              total: 0,
              last_page: 1,
              per_page: 8,
              offset: 8
            }
          )
          console.log('Upcoming Events: ', events)
          resolve(data)
        }

        reject(data)
      })
      .catch((err) => {
        const { data } = err
        reject(data)
      })
    // }, 500);
  })
}

export const pastEvents = ({ commit, rootState, state }) => {
  return new Promise(async (resolve, reject) => {
    let url = `${
      import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    }/api/events-past?search=${
      encodeURIComponent(state.eventFilter.search) || ''
    }`

    if (rootState.bearerToken) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + (rootState.bearerToken || localStorage.api_token)

      url = `${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/events-past/auth?search=${
        encodeURIComponent(state.eventFilter.search) || ''
      }`
    }

    if (state.eventFilter?.city !== '') {
      url = `${url}&city=${encodeURIComponent(state.eventFilter.city) || ''}`
    }

    if (state.eventFilter?.sortBy !== '') {
      url = `${url}&sortBy=${state.eventFilter.sortBy || 'DESC'}`
    }

    if (
      state.eventFilter?.cost === 'free' ||
      state.eventFilter?.cost === 'paid'
    ) {
      url = `${url}&cost=${state.eventFilter.cost || 'both'}`
    } else {
      url = `${url}&cost=both`
    }

    if (state.eventFilter?.event_type !== '') {
      url = `${url}&event_type=${
        encodeURIComponent(state.eventFilter.event_type) || ''
      }`
    }

    url = `${url}&per_page=${state.pastPagination?.per_page || 4}&page=${
      state.pastPagination?.page || 1
    }`

    console.log('Event page [past]: ', url)
    // setTimeout(async () => {
    await axios
      .get(url)
      .then((response) => {
        console.log('Fetch Past Events: ', response)

        const { status: statusCode, data } = response

        if (statusCode === 200) {
          const {
            status,
            message,
            result: { events, pagination }
          } = data
          commit('setPastEvents', events || [])
          commit(
            'setPastPagination',
            pagination || {
              total: 0,
              last_page: 1,
              per_page: 8,
              offset: 8
            }
          )
          resolve(data)
        }

        reject(data)
      })
      .catch((err) => {
        const { data } = err
        reject(data)
      })
    // }, 100);
  })
}

export const fetchEventOrganizer = ({ commit, rootState, state }) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    if (!rootState.bearerToken) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ message: 'No Event selected', status: 403, result: [] })
    }

    const url = `${
      import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
    }/api/organizer/${state.event.organizer_id}`

    console.log('Event Organizer request url: ', url)

    await axios
      .get(url)
      .then((response) => {
        console.log('Fetch Organizer Details: ', response)

        const { status: statusCode, data } = response

        if (statusCode === 200) {
          const { status, result } = data
          if (status === 200) {
            const { organizer, members } = result

            commit('setEventStaff', members)
            commit('setEventCreator', organizer)

            resolve(data)
          }
        }

        reject(data)
      })
      .catch((err) => {
        const { data } = err
        reject(data)
      })
  })
}
