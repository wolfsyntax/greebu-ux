/* eslint-disable camelcase */
/* eslint-disable no-async-promise-executor */
import axios from 'axios'
// import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";

import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth'

// import { GoogleAuthProvider, FacebookAuthProvider } from "@firebase/auth";
import { useFirebaseAuth } from 'vuefire'

const actions = {
  signin ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('SET_AUTH', {})
      commit('SET_ACCOUNT', {})
      commit('SET_TOKEN', '')
      commit('SET_PROFILE', {})
      commit('SET_ROLE', '')
      // Clearing for other modules
      commit('SET_GENRES', null)
      commit('SET_ARTIST_TYPES', null)
      commit('SET_ARTIST_CATEGORY', null)
      commit('SET_ARTIST_GENRES', null)
      commit('SET_MEMBERS', null)
      commit('SET_ARTIST', {})
      commit('SET_ARTISTS', null)
      commit('SET_PAGINATION', {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 1
      })

      commit('SET_PROPOSALS')
      commit('SET_PROPOSALS')

      commit('SET_PENDING_PROPOSALS')
      commit('SET_ACCEPTED_PROPOSALS')
      commit('SET_DECLINED_PROPOSALS')

      commit('SET_PAST_EVENTS')
      commit('SET_ONGOING_EVENTS')
      commit('SET_UPCOMING_EVENTS')

      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/login`,
            payload
          )
          .then((response) => {
            const {
              data: { status, result },
              status: statusCode
            } = response

            console.log('\n\nSign-In Response: ', response)

            if (statusCode === 200) {
              const { profile, user, token, roles, account } = result

              commit('SET_AUTH', user || {})
              commit('SET_ACCOUNT', account || {})
              commit('SET_TOKEN', token || '')
              commit('SET_PROFILE', profile || {})
              commit('SET_ROLE', profile?.role || '')
              commit('SET_ROLES', roles || [])

              localStorage.api_token = token
              dispatch('fetchProfile')
            } else if (statusCode === 203 && status === 403) {
              const { profile, user, token } = result

              commit('SET_AUTH', user || {})
              commit('SET_PROFILE', profile || {})
              commit('SET_ROLE', profile?.role || '')

              localStorage.api_token = token
            }

            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }, 3000)
    })
  },
  signup ({ commit, dispatch }, payload) {
    commit('CLEAR_STATE')

    commit('SET_PROPOSALS')
    commit('SET_PROPOSALS')

    commit('SET_PENDING_PROPOSALS')
    commit('SET_ACCEPTED_PROPOSALS')
    commit('SET_DECLINED_PROPOSALS')

    commit('SET_PAST_EVENTS')
    commit('SET_ONGOING_EVENTS')
    commit('SET_UPCOMING_EVENTS')
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/register`,
          payload,
          {
            Accept: 'application/json'
          }
        )
        .then((response) => {
          const { status: statusCode, data } = response

          console.log('\n\nSign-Up Response: ', response)

          if (statusCode === 201) {
            const {
              result: { user, profile, roles, token }
            } = data

            commit('SET_AUTH', user || {})
            commit('SET_PHONE', user?.phone)
            commit('SET_ROLE', profile?.role || '')
            commit('SET_ROLES', [])

            commit('SET_TOKEN', '')
            commit('SET_PROFILE', {})

            if (profile?.role === 'customers' && user?.phone_verified_at) {
              commit('SET_TOKEN', token || '')
              commit('SET_PROFILE', profile || {})
              dispatch('fetchProfile')
            } else if (user?.phone_verified_at) {
              commit('SET_AUTH', user || {})
              commit('SET_PHONE', user?.phone)
              commit('SET_ROLE', profile?.role || '')
              commit('SET_ROLES', roles || [])

              commit('SET_TOKEN', token || '')
              commit('SET_PROFILE', profile || {})

              dispatch('fetchProfile')
            }
          }
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  signupV2 ({ commit, dispatch, state }, payload) {
    return new Promise(async (resolve, reject) => {
      state.signupForm.verification_code = payload.code || ''

      state.signupForm.phone = state.signupForm.phone.startsWith('+63')
        ? state.signupForm.phone
        : `+63${state.signupForm.phone}`

      commit('CLEAR_STATE')

      commit('SET_PROPOSALS')
      commit('SET_PROPOSALS')

      commit('SET_PENDING_PROPOSALS')
      commit('SET_ACCEPTED_PROPOSALS')
      commit('SET_DECLINED_PROPOSALS')

      commit('SET_PAST_EVENTS')
      commit('SET_ONGOING_EVENTS')
      commit('SET_UPCOMING_EVENTS')

      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/v2/register`,
          state.signupForm,
          {
            Accept: 'application/json'
          }
        )
        .then((response) => {
          const { status: statusCode, data } = response
          console.log('Signup Ver 2.0: ', response)
          if (statusCode === 201) {
            const {
              result: { user, profile, roles, token }
            } = data

            console.log('User data: ', user)
            console.log('Profile data: ', profile)

            commit('SET_AUTH', user || {})
            commit('SET_PHONE', user?.phone)
            commit('SET_ROLE', profile?.role || '')
            commit('SET_ROLES', [])

            commit('SET_TOKEN', '')
            commit('SET_PROFILE', {})

            if (profile?.role === 'customers' && user?.phone_verified_at) {
              commit('SET_TOKEN', token || '')
              commit('SET_PROFILE', profile || {})
              commit('setSignupForm')
              // dispatch("fetchProfile");
            } else if (user?.phone_verified_at) {
              commit('setSignupForm')
              commit('SET_AUTH', user || {})
              commit('SET_PHONE', user?.phone)
              commit('SET_ROLE', profile?.role || '')
              commit('SET_ROLES', roles || [])

              commit('SET_TOKEN', token || '')
              commit('SET_PROFILE', profile || {})

              // dispatch("fetchProfile");
            }
            console.log('[Signup] Resolve API Request')
            resolve(data)
          } else if (statusCode === 203) {
            console.log('Encountered Error upon registration: ', data)
            reject(data)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  validateInfo ({ commit, state }, payload) {
    // payload.phone = payload.phone.startsWith("+63")
    //   ? payload.phone
    //   : `+63${payload.phone}`;

    const {
      first_name,
      last_name,
      email,
      username,
      phone,
      password,
      password_confirmation,
      account_type
    } = payload

    const form = {
      first_name,
      last_name,
      email,
      username,
      phone: phone.startsWith('+63') ? phone : `+63${phone}`,
      password,
      password_confirmation,
      account_type
    }

    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/validate-info`,
          form,
          {
            Accept: 'application/json'
          }
        )
        .then((response) => {
          const { status: statusCode, data } = response

          if (statusCode === 200) {
            const {
              result: { phone }
            } = data
            commit('setPhoneMask', phone || '')

            console.log('Valid form data for registration: ', data)
            resolve(data)
          } else if (statusCode === 203) {
            console.log('Encountered Error upon registration: ', data)
            reject(data)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  signout ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + (state.bearerToken || localStorage.api_token)
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/logout`
        )
        .then((response) => {
          console.log('\n\nSign-Out Response: ', response)

          const { status, data } = response
          if (status === 200 && data.status === 200) {
            if (state.role === 'organizer') {
              commit('CLEAR_ORGANIZER_STATE')
              commit('RESET_EVENT_FORM')
            }

            commit('SET_NOTIFICATIONS')
            commit('CLEAR_ARTIST')
            commit('SET_AUTH', {})
            commit('SET_TOKEN', '')
            commit('SET_PROFILE', {})
            commit('SET_ROLE', '')
            // Clearing for other modules
            commit('SET_GENRES', null)
            commit('SET_ARTIST_TYPES', null)
            commit('SET_ARTIST_CATEGORY', null)
            commit('SET_ARTIST_GENRES', null)
            commit('SET_MEMBERS', null)
            commit('SET_ARTIST', {})
            commit('SET_ARTISTS', null)
            commit('SET_ACCOUNT', {})
            commit('SET_PAGINATION', {
              current_page: 1,
              last_page: 1,
              per_page: 10,
              total: 1
            })

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
          }
          resolve(response)
        })
        .catch((err) => {
          console.error('Signout Error ', err)
          const { response } = err
          if (response.status === 401) {
            commit('SET_AUTH', {})
            commit('SET_TOKEN', '')
            commit('SET_PROFILE', {})
            commit('CLEAR_ARTIST')

            resolve(response)
          }
          reject(err)
        })
    })
  },

  plansOptions ({ commit }, payload = 'artists') {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/subscriptions/plan/${payload}`
        )
        .then((response) => {
          console.log('\n\nPlan Options Response: ', response)

          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  fetchCountry ({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/country`
        )
        .then((response) => {
          console.log('\n\nFetch Country Response: ', response)

          const { data } = response
          commit('SET_COUNTRIES', data.result?.countries || [])

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  socialAuth ({ commit }, { provider, formData }) {
    return new Promise((resolve, reject) => {
      commit('SET_AUTH', {})
      commit('SET_TOKEN', '')
      commit('SET_PROFILE', {})
      commit('SET_ROLE', '')
      // Clearing for other modules
      commit('SET_GENRES', null)
      commit('SET_ARTIST_TYPES', null)
      commit('SET_ARTIST_CATEGORY', null)
      commit('SET_ARTIST_GENRES', null)
      commit('SET_MEMBERS', null)
      commit('SET_ARTIST', {})
      commit('SET_ARTISTS', null)
      commit('SET_ACCOUNT', {})
      commit('SET_PAGINATION', {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 1
      })

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
      commit('CLEAR_ARTIST')

      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/auth/${provider}/firebase`,
            formData
          )
          .then((response) => {
            const {
              status: statusCode,
              data: {
                result: { profile, user, token, account }
              }
            } = response
            console.log('SocialAuth Response: ', response)
            if (statusCode === 200) {
              commit('SET_AUTH', user)
              commit('SET_TOKEN', token)
              commit('SET_PROFILE', profile)
              commit('SET_ROLE', profile?.role || '')
              commit('SET_ACCOUNT', account)

              localStorage.api_token = token
            }

            resolve(response?.data)
          })
          .catch((err) => {
            reject(err)
          })
      }, 1000)
    })
  },
  socialAuthV2 ({ commit, dispatch }, { provider, formData, auth_type }) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/auth/${provider}/firebase`,
          formData
        )
        .then((response) => {
          const {
            status: statusCode,
            data: { result }
          } = response

          console.log('[vuex] socialAuthV2: ', response)

          if (statusCode === 200) {
            const { user } = result
            if (Object.prototype.hasOwnProperty.call(result, 'token')) {
              const { profile, roles, token } = result

              commit('SET_AUTH', user || {})
              commit('SET_PHONE', user?.phone)
              commit('SET_ROLE', profile?.role || '')
              commit('SET_ROLES', [])

              commit('SET_TOKEN', '')
              commit('SET_PROFILE', {})

              if (profile?.role === 'customers' && user?.phone_verified_at) {
                commit('SET_TOKEN', token || '')
                commit('SET_PROFILE', profile || {})
                commit('setSignupForm')
                // dispatch("fetchProfile");
              } else if (user?.phone_verified_at) {
                commit('setSignupForm')
                commit('SET_AUTH', user || {})
                commit('SET_PHONE', user?.phone)
                commit('SET_ROLE', profile?.role || '')
                commit('SET_ROLES', roles || [])

                commit('SET_TOKEN', token || '')
                commit('SET_PROFILE', profile || {})

                // dispatch("fetchProfile");
              }

              dispatch('fetchProfile')
            } else {
              commit('setSocialForm', user)
            }

            resolve(response.data)
          }

          reject(response?.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  socialMediaAuth ({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      const auth = useFirebaseAuth()

      let provider = null
      switch (payload) {
        case 'facebook':
          provider = new FacebookAuthProvider()
          break
        default:
          provider = new GoogleAuthProvider()
          break
      }

      signInWithPopup(auth, provider)
        .then((result) => {
          console.log('Sign-In With PopUp Response: ', result)

          resolve(result)
        })
        .catch((reason) => {
          reject(reason)
        })
    })
  },
  forgotPassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/password/email`,
            payload
          )
          .then((response) => {
            console.log('Forgot Password Response: ', response)

            const {
              data: { status }
            } = response

            if (status === 200) { /* empty */ }

            resolve(response)
          })
          .catch((err) => {
            console.error('Forgot Password Error ', err)
            reject(err)
          })
      }, 1000)
    })
  },
  resetPassword ({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      // setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/password/reset`,
          payload
        )
        .then((response) => {
          console.log('Reset Password Response: ', response)

          const {
            status: statusCode
          } = response

          if (statusCode === 200) { /* empty */ }
          console.log('Status: ', response)
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
      // }, 1000);
    })
  },
  sendOTPCode ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + (state.bearerToken || localStorage.api_token)

      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/phone/send`,
            payload
          )
          .then((response) => {
            console.log('\n\nSend OTP Response: ', response)

            const {
              data: { status, result }
            } = response

            if (status === 200) {
              const { user } = result
              commit('SET_AUTH', user || {})
            }

            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }, 1000)
    })
  },
  resendOTPCode ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        await axios
          .get(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/phone/resend/${payload}`
          )
          .then((response) => {
            console.log('\n\nResend OTP Response: ', response)

            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }, 1500)
    })
  },
  verifyOTP ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/phone/verify/${payload?.id}`,
            {
              code: payload?.code
            }
          )
          .then((response) => {
            console.log('\n\nVerify OTP Response: ', response)

            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }, 1000)
    })
  },
  verifyOTPF ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + (state.bearerToken || localStorage.api_token)

      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/phone/verify?role=${state.role}`,
            {
              code: payload?.code
            }
          )
          .then((response) => {
            console.log('Verify OTP-F Response: ', response)

            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }, 1000)
    })
  },
  phoneOTP ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/sms-otp/${payload}`
          )
          .then((response) => {
            console.log('Phone OTP Response: ', response)

            const {
              status: statusCode
            } = response

            if (statusCode === 200) { /* empty */ }
            console.log('Status: ', response)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }, 1000)
    })
  },
  // Version 2
  requestCode ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);
      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/user/${state.user?.id}/send-otp`,
            payload
          )
          .then((response) => {
            console.log('\n\nRequest Code Response: ', response)
            const {
              status: statusCode,
              data: { result }
            } = response

            if (statusCode === 200) {
              const { user } = result
              commit('SET_AUTH', user || {})
            }

            resolve(response)
          })
          .catch((err) => {
            console.log('Error response: ', err)
            reject(err)
          })
      }, 1000)
    })
  },
  requestCodeV2 ({ commit, state }, { phone, code }) {
    return new Promise(async (resolve, reject) => {
      const formData = state.socialForm
      formData.phone = phone || ''
      formData.code = code || '000000'

      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/auth/${state.socialForm.provider || 'google'}/store`,
          formData
        )
        .then((response) => {
          console.log('\n\n[vuex] Request Code V2 Response: ', response)
          const {
            status: statusCode
          } = response

          if (statusCode === 200) {
            // const { user } = result;
            // commit("SET_AUTH", user || {});
          }

          resolve(response)
        })
        .catch((err) => {
          console.log('Error response: ', err)
          reject(err)
        })
    })
  },
  resendCodeV2 ({ commit, state }, { phone }) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/v2/twilio-auth/resend-otp`,
            { phone },
            {
              Accept: 'application/json'
            }
          )
          .then((response) => {
            console.log('\n\nResend Code response: ', response)
            const {
              data: { status }
            } = response

            if (status === 200) { /* empty */ }

            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }, 1500)
    })
  },
  resendCode ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      setTimeout(async () => {
        await axios
          .get(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/user/${payload?.userId || state.user?.id}/resend-otp`
          )
          .then((response) => {
            console.log('\n\nResend Code response: ', response)
            const {
              data: { status, result }
            } = response

            if (status === 200) {
              const { user } = result
              commit('SET_AUTH', user || {})
            }

            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }, 1500)
    })
  },
  validateCode ({ commit, state, dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);
      console.log(
        'Validate Code url: ',
        `${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/user/${
          payload?.userId
        }/verify?role=${state.role}`
      )
      // setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/user/${payload?.userId || state.user?.id}/verify?role=${
            state.role
          }`,
          {
            code: payload?.code
          }
        )
        .then((response) => {
          console.log('\n\n::Validate Code:: ', response)

          const { status: statusCode, data } = response

          if (statusCode === 201) {
            const {
              status,
              result: { user, profile, roles, token, account }
            } = data

            if (status === 200) {
              commit('SET_AUTH', user || {})
              commit('SET_TOKEN', token || '')
              commit('SET_PROFILE', profile || {})
              commit('SET_ACCOUNT', account || {})
              commit('SET_ROLE', profile?.role || '')
              commit('SET_ROLES', roles || null)

              dispatch('fetchProfile')
            }

            resolve(data)
          }

          reject(data)
        })
        .catch((err) => {
          reject(err)
        })
      // }, 1000);
    })
  },
  validateCodeV2 ({ commit, state, dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      const formData = state.socialForm
      formData.code = payload?.code || '000000'
      formData.phone = payload?.phone || ''

      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/auth/${state.socialForm?.provider || 'google'}/store`,
          formData
        )
        .then((response) => {
          console.log('\n\n::Validate Code:: ', response)

          const { status: statusCode, data } = response

          if (statusCode === 200) {
            const {
              status,
              result: { user, profile, roles, token, account }
            } = data

            if (status === 200) {
              commit('SET_AUTH', user || {})
              commit('SET_TOKEN', token || '')
              commit('SET_PROFILE', profile || {})
              commit('SET_ACCOUNT', account || {})
              commit('SET_ROLE', profile?.role || '')
              commit('SET_ROLES', roles || null)

              dispatch('fetchProfile')
            }

            resolve(response)
          }

          reject(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // Resend Email verification
  resendEmail ({ commit, state }) {
    return new Promise((resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      setTimeout(async () => {
        await axios
          .post(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/email/resend/${state.user?.id}`
          )
          .then((response) => {
            console.log('\n\nResend Code Response: ', response)
            const {
              data: { status }
            } = response
            console.log('Email Resend: ', response)
            if (status === 200) { /* empty */ }

            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }, 1000)
    })
  },
  test2 ({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + (state.bearerToken || localStorage.api_token)
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/test-request`
        )
        .then((response) => {
          console.log('\n\nTest2 Response: ', response)
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  fetchCityList ({ commit, rootState }, payload = '') {
    return new Promise((resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
      setTimeout(async () => {
        await axios
          .get(
            `${
              import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
            }/api/events/create?city=${payload}`
          )
          .then((response) => {
            const {
              status: statusCode,
              data: { status, message, result }
            } = response

            if (statusCode === 200 && status === 200) {
              const { city } = result

              if (city) commit('SET_CITY', city)

              resolve({ status: statusCode, message, result })
            }

            // eslint-disable-next-line prefer-promise-reject-errors
            reject({ message, status: statusCode, result })
          })
      }, 1500)
    })
  },
  fetchUserInfo ({ commit, rootState, dispatch }) {
    return new Promise((resolve, reject) => {
      if (rootState.bearerToken !== '' && localStorage.api_token !== '') {
        axios.defaults.headers.common.Authorization =
          'Bearer ' + (rootState.bearerToken || localStorage.api_token)
        setTimeout(async () => {
          await axios
            .get(
              `${
                import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
              }/api/user`
            )
            .then((response) => {
              const { status: statusCode, data } = response

              if (statusCode === 203) {
                commit('CLEAR_ORGANIZER_STATE')
                commit('SET_AUTH', {})
                commit('SET_TOKEN', '')
                commit('SET_PROFILE', {})
                commit('SET_ROLE', '')
                commit('SET_ACCOUNT', {})

                dispatch('signout')
                reject(data)
              }
              resolve(data)
            })
        }, 1000)
      }
    })
  },
  fetchEmailByToken ({ commit, rootState, dispatch }, token) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || 'http://localhost:8000'
          }/api/email-token/${token}`
        )
        .then((res) => {
          const { status: statusCode, data } = res

          if (statusCode === 200) {
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch((err) => {
          const { data } = err
          reject(data)
        })
    })
  }
}

export default actions
