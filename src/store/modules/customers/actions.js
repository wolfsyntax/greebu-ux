import axios from "axios";

export const fetchCustomerOptions = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artist/forms`, payload)
      .then(response => {        
        
        const {data} = response
        //commit('setContracts', data)
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export const updateUserProfile = ({ commit, rootState   }, payload) => {

  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/users`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(response =>
      {

        const { data, status } = response
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
    });
  }
  
