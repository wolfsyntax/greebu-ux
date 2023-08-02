import axios from "axios";
// import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";

import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth'

import { useCurrentUser, useFirebaseAuth } from 'vuefire';


var actions = {
  signin({ commit }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {

      commit('SET_AUTH', {})
      commit('SET_TOKEN', '')
      commit('SET_PROFILE', {})
      commit('SET_ROLE', '')
      // Clearing for other modules
      commit('SET_GENRES', null)
      commit('SET_ARTIST_TYPES', null)
      commit('SET_ARTIST_GENRES', null)
      commit('SET_MEMBERS', null)
      commit('SET_ARTIST', {})
      commit('SET_ARTISTS', null)
      commit('SET_PAGINATION', {current_page: 1, last_page: 1, per_page: 10, total: 1, })

      // commit('SET_SONG_ARTIST_TYPE', null)
      // commit('SET_SONG_MOODS', null)
      // commit('SET_SONG_LANGUAGES', null)
      // commit('SET_SONG_DURATIONS', null)
      // commit('SET_SONG_PURPOSES', null)
      // commit('SET_SONG_REQUEST', null)
      // commit('SET_SONG', {
      //   first_name: null,
      //   last_name: null,
      //   email: null,
      //   genre_id: null,
      //   song_type_id: null,
      //   language_id: null,
      //   duration_id: null,
      //   purpose_id: null,
      //   sender: null,
      //   receiver: null,
      //   user_story: null,
      //   page_status: null,
      // })
      // commit('SET_SONG_ARTIST', {})

      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/login`, payload)
        .then(response =>
        {

          const { data: { message, status, result } } = response;

          if (status === 200) {

            const { profile, user, token, roles } = result;
            
            commit('SET_AUTH', user || {});
            commit('SET_TOKEN', token || '');
            commit('SET_PROFILE', profile || {});
            commit('SET_ROLE', profile?.role || '');
            commit('SET_ROLES', roles || []);
            localStorage.api_token = token
          }

          resolve(response)

        })
        .catch(err =>
        {
          reject(err)
        });
    })
  },
  signup({ commit }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {
            
      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/register`, payload, {
        Accept: "application/json"
      })
        .then(response =>
        {
          const { status: statusCode, data } = response
          if (statusCode === 200) {
            const { status, result: {user}} = data;

            commit('SET_AUTH', user || user);
            commit('SET_PHONE', user?.phone);

          }
          resolve(response)
        })
        .catch(err =>
        {
          reject(err)
        });

    })
  },

  signout({ commit, state })
  {
    return new Promise(async (resolve, reject) =>
    {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);
      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/logout`)
        .then(response =>
        {

          const { status, data } = response
          if (status === 200 && data.status === 200) {
            commit('SET_AUTH', {})
            commit('SET_TOKEN', '')
            commit('SET_PROFILE', {})
            commit('SET_ROLE', '')
            // Clearing for other modules
            commit('SET_GENRES', null)
            commit('SET_ARTIST_TYPES', null)
            commit('SET_ARTIST_GENRES', null)
            commit('SET_MEMBERS', null)
            commit('SET_ARTIST', {})
            commit('SET_ARTISTS', null)
            commit('SET_PAGINATION', {current_page: 1, last_page: 1, per_page: 10, total: 1, })

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
              page_status: null,
            })
            commit('SET_SONG_ARTIST', {})
          }
          resolve(response)
        })
        .catch(err =>
        {
          console.error('Signout Error ', err)
          const { response } = err
          if (response.status === 401) {

            commit('SET_AUTH', {});
            commit('SET_TOKEN', '');
            commit('SET_PROFILE', {});

            resolve(response);
          }
          reject(err);
        });
    })
  },
  plansOptions({ commit }, payload = 'artists')
  {
    return new Promise(async (resolve, reject) =>
    {

      await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/subscriptions/plan/${payload}`)
        .then(response =>
        {
          const { data, status } = response
          resolve(data)
        })
        .catch(err =>
        {
          reject(err)
        });

    })
  },
  fetchCountry({ commit }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {

      await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/country`)
        .then(response =>
        {
          const { data, status } = response
          commit('SET_COUNTRIES', data.result?.countries || []);

          resolve(data)
        })
        .catch(err =>
        {
          reject(err)
        });

    })
  },
  socialAuth({ commit }, { provider, formData })
  {
    return new Promise(async (resolve, reject) =>
    {

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/auth/${provider}/firebase`, formData)
        .then(response =>
        {
          const { data: { message, status, result: { profile, user, token } } } = response;
          console.log(`Firebase login via ${provider}: `, response);
          if (response.status === 200) {

            commit('SET_AUTH', user)
            commit('SET_TOKEN', token)
            commit('SET_PROFILE', profile)
            commit('SET_ROLE', profile?.role || '');

            localStorage.api_token = token
          }

          resolve(response?.data)

        })
        .catch(err =>
        {
          reject(err)
        });
    })
  },
  syncProfile({ commit }, { user, profile })
  {
    commit('SET_PROFILE', profile)
    commit('SET_AUTH', user)
  },
  switchUserProfile({ commit }, payload)
  {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/users/${payload}/switch`)
        .then(response =>
        {

          const { data, status} = response
          if (status === 200) {

            const { result: { profile, user } } = data;
            commit('SET_PROFILE', profile);
            commit('SET_AUTH', user);
            commit('SET_ROLE', profile?.role);
          }
          resolve(data)
        })
        .catch(err =>
        {
          reject(err)
        });
    })
  },

  resyncProfile({ commit, state }, payload)
  {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/user-details`, {role: state.role})
        .then(response =>
        {

          const { data, status} = response
          if (status === 200) {

            const { result: { profile, user } } = data;
            commit('SET_PROFILE', profile);
            commit('SET_AUTH', user);
          }
          resolve(data)
        })
        .catch(err =>
        {
          reject(err)
        });
    })
  },
  socialMediaAuth({ commit, state }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {
      const auth = useFirebaseAuth();

      var provider = null;
      switch (payload) {
        case 'facebook':
          provider = new FacebookAuthProvider();
          break;
        default:
          provider = new GoogleAuthProvider();
          break;
      }

      signInWithPopup(auth, provider).then(result =>
      { 
        resolve(result);
      })
      .catch(reason =>
      {
        reject(reason);
      });
      
    });
  },
  sendOTPCode({ commit, state }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/phone/send`, payload)
        .then(response =>
        {
          console.log('OTP Response: ', response);
          const { data: { message, status, result } } = response;

          if (status === 200) {

            const { user } = result;
            commit('SET_AUTH', user || {});

          }

          resolve(response);
        })
        .catch(err =>
        {
          reject(err)
        });
    });
  },  
  resendOTPCode({ commit, state }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {
      await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/phone/resend/${payload}`)
        .then(response =>
        {
          resolve(response);
        })
        .catch(err =>
        {
          reject(err)
        });
    });
  },
  verifyOTP({ commit, state }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {
      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/phone/verify/${payload?.id}`, {
        code: payload?.code,
      })
        .then(response =>
        {
          resolve(response);
        })
        .catch(err =>
        {
          reject(err)
        });
    });
  },
  verifyOTPF({ commit, state }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/phone/verify`, {
        code: payload?.code,
      })
        .then(response =>
        {
          resolve(response);
        })
        .catch(err =>
        {
          reject(err)
        });
    });
  },
  forgotPassword({ commit }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/password/email`, payload)
        .then(response =>
        {

          const { data: { message, status, result } } = response;

          if (status === 200) {

          }

          resolve(response)

        })
        .catch(err =>
        {
          console.error('Forgot Password Error ', err)
          reject(err)
        });
    })
  },
  resetPassword({ commit }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/password/reset`, payload)
        .then(response =>
        {

          const { status: statusCode, data: { message, status, result } } = response;

          if (statusCode === 200) {

          }
          console.log('Status: ', response)
          resolve(response)

        })
        .catch(err =>
        {
          reject(err)
        });
    })
  },
  phoneOTP({ commit }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/sms-otp/${payload}`)
        .then(response =>
        {

          const { status: statusCode, data: { message, status, result } } = response;

          if (statusCode === 200) {

          }
          console.log('Status: ', response)
          resolve(response)

        })
        .catch(err =>
        {
          reject(err)
        });
    })
  },
}

export default actions
