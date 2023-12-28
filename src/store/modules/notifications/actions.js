/* eslint-disable camelcase */
import axios from 'axios'

// Fetch notifications
export const fetchNotifications = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    if (
      !(rootState.bearerToken && Object.keys(rootState.profile).length !== 0)
    ) {
      resolve({ status: 403, message: '', result: [] })
    }

    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)
    console.log(
      `\nFetch notification at ${
        import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
      }/api/notifications?role=${rootState.role}\n\n`
    )

    setTimeout(() => {
      axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/notifications?role=${rootState.role}`
        )
        .then((response) => {
          const {
            data,
            data: { status },
            status: statusCode
          } = response

          if (status === 200 && statusCode === 200) {
            const {
              result: { profile_notification }
            } = data
            commit('SET_NOTIFICATIONS', profile_notification)
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

// Mark As Read
export const markNotificationAsRead = (
  { commit, rootState, state, dispatch },
  payload = 'user'
) => {
  const url = `${
    import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
  }/api/notifications/${state.notification.id}/mark-read?role=${
    rootState.role
  }&type=${payload}`

  console.log('Notification ID: ', url)

  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(() => {
      axios
        .post(url)
        .then((response) => {
          console.log('Mark notif with ID: ', response)
          const {
            data,
            data: { status },
            status: statusCode
          } = response

          if (status === 200 && statusCode === 200) {
            dispatch('fetchNotifications')
            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          console.log('Mark as read error: ', err)
          const { data } = err

          reject(data)
        })
    }, 1000)
  })
}

// Mark All Read
export const markAllNotificationAsRead = (
  { commit, rootState, state, dispatch },
  payload = 'user'
) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(() => {
      axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/notifications/mark-all-read?role=${
            rootState.role
          }&type=${payload}`
        )
        .then((response) => {
          const {
            data,
            data: { status },
            status: statusCode
          } = response

          if (status === 200 && statusCode === 200) {
            dispatch('fetchNotifications')
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
