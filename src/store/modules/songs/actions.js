import axios from "axios";

export const fetchSongForm = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/song-requests/create`)
      .then(response => {        
        
        const {data, status} = response
        if (status === 200 && data.status === 200)
        { 
          const { result } = data
          
          commit('SET_SONG_ARTIST_TYPE', result?.artist_types)
          commit('SET_SONG_MOODS', result?.mood)
          commit('SET_SONG_LANGUAGES', result?.languages);
          commit('SET_SONG_DURATIONS', result?.durations)
          commit('SET_SONG_PURPOSES', result?.purposes)
        }
        
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export const createSong = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/song-requests`)
      .then(response => {        
        
        const {data, status: statusCode} = response
        if (statusCode === 200)
        { 
          const { result, status } = data
          
          if (status === 200)
          {
          // commit('SET_SONG_ARTIST_TYPE', result?.artist_types)
          // commit('SET_SONG_MOODS', result?.moods)
          // commit('SET_SONG_LANGUAGES', result?.languages);
          // commit('SET_SONG_DURATIONS', result?.durations)
          // commit('SET_SONG_PURPOSES', result?.purposes)

          }
          
        }
        
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}
