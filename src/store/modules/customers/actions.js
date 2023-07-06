import axios from "axios";

export const fetchArtistOptions = ({ commit, rootState, state}, payload) => {
  
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

export const updateUserProfile = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/users`, payload)
      .then(response => {        
        
        const {data} = response
        console.log('Update User profile: ', response)
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}
