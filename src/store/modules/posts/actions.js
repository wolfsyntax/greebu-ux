import axios from "axios";

export const createPost = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/posts`, payload)
      .then(response => {        
        
        const { data, status } = response

        console.log('\n\nCreate Post: ', data);

        if (status === 200 && data.status === 200)
        { 
          const { result } = data
          
        }
        
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export const fetchPost = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/song-requests/create`)
      .then(response => {        
        
        const {data, status} = response
        if (status === 200 && data.status === 200)
        { 
          const { result } = data
          
        }
        
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

