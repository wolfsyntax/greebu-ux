import axios from "axios";

var actions = {
  retrieveArtists({ commit }, payload) {      
    return new Promise(async(resolve, reject) => {

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token)
      console.log('Artist Payload: ', payload)
      await axios.post('/artists', payload)
          .then(response => {
            console.log('Artist response: ', response)
            // commit('setAuth', response.data?.data?.user)
            // commit('setToken', response.data?.data?.token)
            
            resolve(response)

        })
        .catch(err => {
          reject(err)
        });
    })
    },
    signup({ commit }, payload) {
        return new Promise(async(resolve, reject) => {

            await axios.post('/api/auth/register', payload)
                .then(response => {
                    console.log('Response: ', response)

                    commit("setAuth", response.data.data.user);
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },
    forgot({ commit }, payload) {
        return new Promise(async(resolve, reject) => {

            await axios.post('/api/auth/forgot-pass', payload)
                .then(response => {
                    console.log('Response: ', response)
                    const { status, data } = response
                    resolve({data, status})
                })
                .catch(err => {
                    reject(err)
                });
        })
    },
    change({ commit }, payload) {
        return new Promise(async(resolve, reject) => {

            await axios.post('/api/auth/change-pass', payload)
                .then(response => {
                    console.log('Response: ', response)
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },
    reset({ commit }, payload) {
        return new Promise(async(resolve, reject) => {

            await axios.post('/api/auth/reset-pass', payload)
                .then(response => {
                    console.log('Response: ', response)
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },
    signout({ commit }, payload) {
        return new Promise(async (resolve, reject) => {

            await axios.post('/api/auth/logout')
                .then(response => {
                    commit('setAuth', {})
                    commit('setToken', '')
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }
};

export default actions
