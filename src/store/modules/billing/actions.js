/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios'

export const paymentIntent = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/posts`,
          payload
        )
        .then((response) => {
          const {
            data: { status, message, result },
            status: statusCode
          } = response

          if (statusCode === 200 && status === 200) {
            resolve({ status, message, data: result })
          }

          reject({ message, data: result, status })
        })
        .catch((err) => {
          const {
            data: { status, message, result }
          } = err

          let data = result

          if (status === 422 || status === 500) {
            data = result?.errors || []
          }

          reject({ msg: message, data, status })
        })
    }, 1000)
  })
}

export const paymentMethod = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization =
      'Bearer ' + (rootState.bearerToken || localStorage.api_token)

    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/posts`,
          payload
        )
        .then((response) => {
          const {
            data: { status, message, result },
            status: statusCode
          } = response

          if (statusCode === 200 && status === 200) {
            resolve({ status, message, data: result })
          }

          reject({ message, data: result, status })
        })
        .catch((err) => {
          const {
            data: { status, message, result }
          } = err

          let data = result

          if (status === 422 || status === 500) {
            data = result?.errors || []
          }

          reject({ msg: message, data, status })
        })
    }, 1000)
  })
}
