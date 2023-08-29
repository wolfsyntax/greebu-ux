import axios from "axios";

export const fetchArtistOptions = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/create`, payload)
      .then(response => {        
        
        const { data, status } = response
        
        console.log('\n\nFetch Artist Options Response: ', response)

        if (status === 200 && data.status === 200)
        { 
          const { result } = data

          var genre = result?.genres
          console.log('- Genre: ', genre);

          var exists = genre.filter(function (o) {
            return o.hasOwnProperty('title');
          }).length > 0;

          if (exists) {
            commit('SET_GENRES', genre);
          } else {
            commit('SET_GENRES', genre);
          }
          
          
          commit('SET_ARTIST_TYPES', result?.artist_types)
          commit('SET_ARTIST_GENRES', result?.artist_genre);
          commit('SET_MEMBERS', result?.members)
          commit('SET_ARTIST', result?.profile)
          commit('SET_ACCOUNT', result?.account);

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
        
        console.log('\n\nUpdate Artist Profile Response: ', response)

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

        console.log('\n\nAdd Member Response: ', response)

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

        console.log('\n\nAdd Social Media Response: ', response)

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
        
        console.log('\n\nRemove Social Media Response: ', response)

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
  
  return new Promise((resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    axios.delete(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/member/${payload}`)
      .then(response => {        

        console.log('\n\nRemove Member Response: ', response)
        
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
export const updateMember = ({ commit, rootState, state}, {mem_id, form}) => {
  
  return new Promise((resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    axios.put(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/member/${mem_id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(response => {        

        console.log('\n\nUpdate Member Response: ', response)
        
        const { status: statusCode, data: { status, result } } = response
        if (statusCode === 200 && status === 200) {
          const {members} = result
          commit('SET_MEMBERS', members)
        }
        
        resolve(response.data)
    })
    .catch(err => {
      reject(err)
    });
  })
  
}

// Update 
export const fetchArtists = ({ commit, rootState, state }, payload) => {
  console.log('Fetch Artists payload: ', payload)
  return new Promise(async(resolve, reject) => {
    var url = `${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artist-filter`
    if (rootState.bearerToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
      url = `${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists-filter`
    }

    await axios.post(url, payload)
      .then(response => {        

        console.log('\n\nFetch Artists Response: ', response)

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
  return new Promise((resolve, reject) =>
  {

    axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artist/forms`, payload)
      .then(response =>
      {

        console.log('\n\nArtist Options Response: ', response)

        const { status: statusCode, data: { status, message, result } } = response
        if (statusCode === 200) {
          
          var genre = result?.genres

          var exists = genre.filter(function (o) {
            return o.hasOwnProperty('title');
          }).length > 0;

          if (exists) {
            commit('SET_GENRES', genre);
          } else {
            commit('SET_GENRES', genre || []);
          }

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
        
        console.log('\n\nFetch Artist Response: ', response)

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