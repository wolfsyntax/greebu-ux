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

export const storeSong = ({ commit, rootState, state}, payload) => {
  return new Promise(async (resolve, reject) =>
  {
    commit('SET_SONG', payload);
  });
}

export const storeArtist = ({ commit, rootState, state}, payload) => {
  return new Promise(async (resolve, reject) =>
  {
    commit('SET_SONG_ARTIST', payload);
  });
}

export const songStepOne = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    var url = ``;

    if (state?.song?.id) {
      url = `api/song-requests/info/${state.song?.id}`
    } else {
      url = `api/song-requests/info`
    }

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/${url}?role=${rootState.role}`, payload)
      .then(response => {        
        
        const { data, status: statusCode } = response

        if (statusCode === 200)
        { 
          const { result, status } = data
          
          if (status === 200)
          {        
            commit('SET_SONG', result?.song_request)
          }
          
        }
        
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export const songStepTwo = ({ commit, rootState, state}) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    var form = new FormData();
    console.log('Saving Step Two')
    console.log('Mood: ',state.song_mood.id)
    console.log('Language: ',state.song_language.id)
    console.log('Duration: ', state.song_duration.id);
    console.log('Artists: ', state.song_artists);

    form.append('song_type_id', state.song_mood.id);
    form.append('language_id', state.song_language.id);
    form.append('duration_id', state.song_duration.id);
    form.append('artists[]', state.song_artists);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/song-requests/song/${state.song?.id}?role=${rootState.role}`, form, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(response => {        
        
        const { data, status: statusCode } = response
        console.log('Response Step Two', response)
        if (statusCode === 200)
        { 
          const { result, status } = data
          
          if (status === 200)
          {
            commit('SET_SONG', result?.song_request)

          }
          
        }
        
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export const songStepThree = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/song-requests/story/${state.song?.id}?role=${rootState.role}`, payload)
      .then(response => {        
        
        const { data, status: statusCode } = response

        if (statusCode === 200)
        { 
          const { result, status } = data
          
          if (status === 200)
          {
            commit('SET_SONG', result?.song_request)
          }
          
        }
        
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export const songStepFinal = ({ commit, rootState, state }, payload) =>
{

  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/song-requests/review/${state.song?.id}?role=${rootState.role}`, payload)
      .then(response =>
      {

        const { data, status: statusCode } = response
        console.log('Song Request form: ', response);

        if (statusCode === 200) {
          const { result, status } = data

          if (status === 200) {
            commit('SET_SONG', result?.song_request)

          }

        }

        resolve(response)
      })
      .catch(err =>
      {
        reject(err)
      });
  })
}

export const storeMood = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async (resolve, reject) =>
  {
    console.log('Store Mood: ', payload);
    commit('SET_SONG_MOOD', payload);
  })
}

export const storeLanguage = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async (resolve, reject) =>
  {
    console.log('Store Language: ', payload);
    commit('SET_SONG_LANGUAGE', payload);
  })
}

export const storeDuration = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async (resolve, reject) =>
  {
    console.log('Store Duration: ', payload);
    commit('SET_SONG_DURATION', payload);
  })
}

export const storePurpose = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async (resolve, reject) =>
  {
    console.log('Store Purpose: ', payload);
    commit('SET_SONG_PURPOSE', payload);
  })
}