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
            } else if (rootState.role === 'organizer') {
              dispatch('fetchOrganizerOptions');
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
export const accountProfile = ({ commit, state, rootState }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    if (typeof (payload?.avatar) === 'string') delete payload?.avatar;
    if (typeof (payload?.song) === 'string') delete payload?.song;

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
};

export const verifyCurrentEmail = ({ rootState }, payload) =>
{
  console.log('Verify Current Email');
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/check-email`, payload)
      .then(response =>
      {

        const { data: { message, status, result }, status: statusCode } = response;

        console.log('\n\nCheck current email: ', response);

        if (statusCode === 200 && status === 200) {
          resolve(response)
        } else {
          reject({ msg: 'Current Email is incorrect', status: statusCode });
        }

      })
      .catch(err =>
      {
        reject(err)
      });
  });
};
export const verifyCurrentPhone = ({ rootState }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/check-phone`, payload)
      .then(response =>
      {

        const { data: { message, status, result }, status: statusCode } = response;

        console.log('\n\nCheck current phone: ', response);

        if (statusCode === 200 && status === 200) {
          resolve(response)
        } else {
          reject({ msg: 'Current Phone is incorrect', status: statusCode });
        }

      })
      .catch(err =>
      {
        reject(err)
      });
  });
};

export const verifyCurrentPassword = ({ rootState }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/check-password`, payload)
      .then(response =>
      {

        const { data: { message, status, result }, status: statusCode } = response;

        console.log('\n\nCheck current password: ', response);

        if (statusCode === 200 && status === 200) {
          resolve(response)
        } else {
          reject({ msg: 'Current Password is incorrect', status: statusCode });
        }

      })
      .catch(err =>
      {
        reject(err)
      });
  });
};
export const updateEmail = ({ commit, rootState }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/update-email`, payload)
      .then(response =>
      {

        const { data: { message, status, result }, status: statusCode } = response;

        console.log('\n\nUpdate Email: ', response);

        if (status == 200 && statusCode === 200) {
          commit('SET_AUTH', result?.user);
          resolve(response);
        } else {
          var msg = message;

          if (statusCode === 203 && status === 422)
          {
            const { errors: { email } } = result;
            msg = email.shift();
          }

          reject({ msg: msg, status: statusCode });
        }

      })
      .catch(err =>
      {
        reject(err)
      });
  });
};

export const updatePhone = ({ commit, rootState }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/update-phone`, payload)
      .then(response =>
      {

        const { data: { message, status, result }, status: statusCode } = response;

        console.log('\n\nUpdate phone: ', response);

        if (status == 200 && statusCode === 200) {
          commit('SET_AUTH', result?.user);
          resolve(response);
        } else {
          reject({ msg: message, status: statusCode });
        }

      })
      .catch(err =>
      {
        reject(err)
      });
  });
};

export const updatePassword = ({ commit, rootState }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/change-password`, payload)
      .then(response =>
      {

        const { data: { message, status, result }, status: statusCode } = response;

        console.log('\n\nUpdate password: ', response);

        if (status == 200 && statusCode === 200) {
          commit('SET_AUTH', result?.user);
          resolve(response);
        } else if (statusCode === 203 && status === 422){
          reject({ msg: message, status: statusCode, data: result?.errors || [] });
        } else {
          reject({ msg: message, status: statusCode });
        }

      })
      .catch(err =>
      {
        reject(err)
      });
  });
};

export const updateAvatar = ({ commit, rootState }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/update/${rootState.profile?.id}/avatar`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(response =>
      {

        const { data: { message, status, result }, status: statusCode } = response;

        console.log('\n\nUpdate Avatar: ', response);

        if (statusCode === 200 && status == 200) {
          commit('SET_PROFILE', result?.profile);
          resolve(response);
        } else {
          reject({ msg: message, status: statusCode });
        }
      })
      .catch(err =>
      {
        reject(err)
      });
  });
};

export const updateBanner = ({ commit, rootState }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    console.log('Banner Form: ', payload)
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/account/update/${rootState.profile?.id}/banner`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(response =>
      {

        const { data: { message, status, result }, status: statusCode } = response;

        console.log('\n\nUpdate Banner Image: ', response);

        if (statusCode === 200 && status === 200) {
          commit('SET_PROFILE', result?.profile)
          resolve(response)
        } else {
          reject({ msg: message, status: statusCode });
        }


      })
      .catch(err =>
      {
        reject(err)
      });
  });
};  