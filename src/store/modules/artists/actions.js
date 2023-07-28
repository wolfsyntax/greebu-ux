import axios from "axios";

export const fetchArtistOptions = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/create`, payload)
      .then(response => {        
        
        const {data, status} = response
        if (status === 200 && data.status === 200)
        { 
          const { result } = data
          
          commit('SET_GENRES', result?.genres)
          commit('SET_ARTIST_TYPES', result?.artist_types)
          commit('SET_ARTIST_GENRES', result?.artist_genre);
          commit('SET_MEMBERS', result?.members)
          commit('SET_ARTIST', result?.profile)
        }
        
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export const updateArtistProfile = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(response => {        
        
        const {data} = response
        // commit('setContracts', data)
        resolve(response.data)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export const addMember = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/member`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(response => {        
        
        const { data } = response
        commit('SET_MEMBERS', data)
        resolve(response.data)
    })
    .catch(err => {
      reject(err)
    });
  })
  
}

export const addSocialMedia = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/social-account`, payload)
      .then(response => {        
        
        const { data: { status, result } } = response
        if (status === 200)
        {
          commit('SET_ARTIST', result.artist_profile)  
        }

        resolve(response.data)
    })
    .catch(err => {
      reject(err)
    });
  })
  
}
export const removeSocialMedia = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.delete(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/social-account/${payload}/destroy`)
      .then(response => {        
        
        const { data: { status, result } } = response
        if (status === 200)
        {
          commit('SET_ARTIST', result.artist_profile)  
        }

        resolve(response.data)
    })
    .catch(err => {
      reject(err)
    });
  })
  
}

export const removeMember = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.delete(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/member/${payload}`)
      .then(response => {        
        
        const { data: {result, status} } = response

        if (status === 200)
        {
          commit('SET_MEMBERS', result.members)
        } 

        resolve(response.data)
    })
    .catch(err => {
      reject(err)
    });
  })
  
}

// Update 
export const updateMember = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.put(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/member`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(response => {        
        
        const { data } = response
        commit('SET_MEMBERS', data)
        resolve(response.data)
    })
    .catch(err => {
      reject(err)
    });
  })
  
}

// Update 
export const fetchArtists = ({ commit, rootState, state }, payload) => {
  
  return new Promise(async(resolve, reject) => {
    var url = `${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artist-filter`
    if (rootState.bearerToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
      url = `${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists-filter`
    }

    await axios.post(url, payload)
      .then(response => {        
        
        const { data: { status, message, result: { data: artistList, current_page, last_page, per_page, total}} } = response
        //commit('SET_MEMBERS', data)
        commit('SET_ARTISTS', artistList)
        commit('SET_PAGINATION', { current_page, last_page, per_page, total })
        
        resolve(response.data)
    })
    .catch(err => {
      reject(err)
    });
  })
  
}
export const artistOptions = ({ commit, rootState, state }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {

    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artist/forms`, payload)
      .then(response =>
      {

        const { status: statusCode, data: { status, message, result } } = response
        if (statusCode === 200) {
          commit('SET_GENRES', result?.genres || []);
          commit('SET_ARTIST_TYPES', result?.artist_types || [])

        }
        
        resolve(response)
      })
      .catch(err =>
      {
        reject(err)
      });

  })
}


export const fetchArtist = ({ commit, rootState, state }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {

    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artist/${payload}`)
      .then(response =>
      {
        const {data: {status, message, result: {artist}}} = response
        commit('SET_ARTIST_PROFILE', artist);
        resolve(response)
      })
      .catch(err =>
      {
        reject(err)
      });

  })
}