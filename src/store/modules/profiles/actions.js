import axios from "axios";

export const accountSetting = ({ commit, state, rootState }, payload) => {
    return new Promise(async (resolve, reject) =>
    {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/settings`, payload)
        .then(response =>
        {
          
          console.log('\n\nAccount Setting Response: ', response)

          const { status: statusCode, data: { status, message, result } } = response;

          if (statusCode === 200) {

            if (status === 200) {

              const { user } = result;
              if (rootState.user.phone !== user.phone)
              {
                commit('SET_PHONE_ISMODIFIED', rootState.user?.phone !== user?.phone || false);
              }

              commit('SET_AUTH', user);

            }
          }

          resolve(response);
        })
        .catch(err =>
        {
          reject(err)
        });
    })
};

export const fetchProfile = ({ commit, state, rootState, dispatch }, payload) =>
{
  return new Promise((resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account?role=${rootState.role}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
      .then(response =>
      {
        const { status: statusCode, data: { status, message, result } } = response;

        console.log('\n\nFetch Profile Response (profile): ', response)

        if (statusCode === 200) {
          
          if (status === 200) {
            
            const { account } = result;
            console.log('[vuex] fetchProfile updating state: ', account)
            // commit('SET_AUTH', user);
            commit('SET_ACCOUNT', account);

            if (rootState.role === 'artists') {

              const { genres, members } = result;
              // console.log('Band Members: ', members);
              // commit('SET_ACCOUNT_GENRE', genres);
              commit('SET_ARTIST_GENRES', genres);
              commit('SET_MEMBERS', members || [])
              // commit('SET_CUSTOM_GENRE', custom_genre);

              dispatch('artistOptions');
            }

            // commit('SET_PROFILE', profile);

          }
        }

        resolve(response);
      })
      .catch(err =>
      {
        reject(err)
      });
  })    
};
export const accountProfile = ({ commit, state, rootState }, payload)=>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    if (typeof (payload?.avatar) === 'string') delete payload?.avatar;
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/profile?role=${rootState.role}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
      .then(response =>
      {
        const { status: statusCode, data: { status, message, result } } = response;
        console.log('\n\nAccount Profile Response: ', response)
        if (statusCode === 200) {
          if (status === 200) {
            
            const { account, user, profile } = result;

            commit('SET_AUTH', user);
            commit('SET_ACCOUNT', account);
            commit('SET_PROFILE', profile);
            commit('SET_ARTIST', profile);
            if (rootState.role === 'artists') {
              const { members, genres } = result;
              commit('SET_ARTIST_GENRES', genres || []);
              commit('SET_MEMBERS', members || [])
            }
            
          }
        }
        
        resolve(response);
      })
      .catch(err =>
      {
        reject(err)
      });
  })
}