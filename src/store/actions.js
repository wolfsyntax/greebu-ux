import axios from "axios";

var actions = {
    signin({ commit }, payload) {
    return new Promise(async(resolve, reject) => {
        console.log('Sign me in')
      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/login`, payload)
          .then(response => {
            
            commit('setAuth', response.data)
            commit('setToken', response.data?.token)
            
            localStorage.api_token = response.data?.token
            resolve(response)

        })
        .catch(err => {
          reject(err)
        });
    })
    },
    signup({ commit }, payload) {
        return new Promise(async(resolve, reject) => {

            await axios.post('/api/register', payload)
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
    
    signout({ commit }, payload) {
        return new Promise(async (resolve, reject) => {

            await axios.post('/api/logout')
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
