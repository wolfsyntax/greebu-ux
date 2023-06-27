import axios from "axios";

var actions = {
    signin({ commit }, payload) {
    return new Promise(async(resolve, reject) => {

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/login`, payload)
          .then(response => {
            
            commit('SET_AUTH', response.data)
            commit('SET_TOKEN', response.data?.token)
            commit('SET_PROFILE', response.data)
            localStorage.api_token = response.data?.token
            resolve(response)

        })
        .catch(err => {
          reject(err)
        });
    })
    },
    signup({ commit }, payload) {
        return new Promise(async(resolve, reject) => {
          
          await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/register`, payload, {
              Accept: "application/json"
            })
            .then(response => {
              resolve(response)
            })
            .catch(err => { 
              reject(err)
            });

        })
    },
    
  signout({ commit, state })
  {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);
      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/logout`)
        .then(response =>
        {
          commit('SET_AUTH', {})
          commit('SET_TOKEN', '')
          commit('SET_PROFILE', {})
          resolve(response)
        })
        .catch(err => {
            reject(err)
        });
    })
  },
  artistOptions({ commit }, payload) {
        return new Promise(async(resolve, reject) => {

          await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artist/forms`, payload)
            .then(response => {
              resolve(response)
            })
            .catch(err => { 
              reject(err)
            });

        })
    },
    
};

export default actions
