import axios from "axios";

var actions = {
  signin({ commit }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/login`, payload)
        .then(response =>
        {

          const { data: { message, status, result: { profile, user, token } } } = response;

          if (response.status === 200) {

            commit('SET_AUTH', user)
            commit('SET_TOKEN', token)
            commit('SET_PROFILE', profile)
            commit('SET_ROLE', profile?.role || '');
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
          console.log('Signout Response: ', response)
          const { status, data } = response
          if (status === 200 && data.status === 200) {
            commit('SET_AUTH', {})
            commit('SET_TOKEN', '')
            commit('SET_PROFILE', {})
            commit('SET_ROLE', '')
          }
          resolve(response)
        })
        .catch(err =>
        {
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
  artistOptions({ commit }, payload)
  {
    return new Promise(async (resolve, reject) =>
    {

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artist/forms`, payload)
        .then(response =>
        {
          resolve(response)
        })
        .catch(err =>
        {
          reject(err)
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
  updateUserProfile({ commit, state   }, payload) {

    return new Promise(async (resolve, reject) =>
    {

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/users`, payload)
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
  switchUserProfile({ commit }, payload)
  {
    
  }
}

export default actions
