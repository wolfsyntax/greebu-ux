import axios from "axios";

export const fetchOrganizerOptions = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/organizer/forms`, payload)
      .then(response =>
      {        
        
        console.log('\n\nOrganizer Form: ', response)

        const { status: statusCode, data: { message, status, result } } = response;

        if (statusCode === 200 && status === 200)
        {

          const { event_types, staff_roles } = result;

          if (event_types) commit('SET_EVENT_TYPES', event_types);
          if (staff_roles) commit('SET_STAFF_ROLES', staff_roles);
        }
        
        resolve(response)
    })
    .catch(err => {
      reject(err)
    });
  })
}

export const fetchStaff = ({ commit, rootState, state}, payload) => {
  
  return new Promise(async(resolve, reject) => {
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/organizer/staff`, payload)
      .then(response =>
      {        
        
        const { status: statusCode, data: { status, result, message } } = response;

        if (statusCode === 200 && status === 200)
        {
          const { organizer, member, members } = result;
          commit('SET_STAFF', members);

          resolve({ status: statusCode, message, result: result });

        }

        reject({ message, status: statusCode, result });

      })
      .catch(err => {
        reject(err)
      });
  })
}

export const addStaff = ({ commit, rootState, state }, payload) =>
{

  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/organizer/staff`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then(response =>
      {
        const { status: statusCode, data: { status, result, message } } = response;

        if (statusCode === 200 && status === 200)
        {
          const { organizer, member, members } = result;
          commit('SET_STAFF', members);
          resolve({ status: statusCode, message, result: result });
        }

        reject({ message, status: statusCode, result });

      }).catch(err =>
      {
        const { status: statusCode, data: { status, result, message } } = err;

        if (status === 422)
        {
          reject({status, message, result: result?.errors || []});
        } else {
          reject({status, message, result: result});
        }

      });
  });
}

export const editStaff = ({ commit, rootState, state }, payload) =>
{

  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    var url = `${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/organizer/staff/${payload.id}/edit`;
    console.log('Target URL - Staff: ', url);

    await axios.post(url, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then(response =>
      {
        const { status: statusCode, data: { status, result, message } } = response;
        console.log('Edit Staff response: ', response);
        if (statusCode === 200 && status === 200)
        {
          const { organizer, member, members } = result;
          console.log('Success Response: ', members);

          commit('SET_STAFF', members);
          resolve({ status: statusCode, message, result: result });
        }

        reject({ message, status: statusCode, result });

      }).catch(err =>
      {
        const { status: statusCode, data: { status, result, message } } = err;

        if (status === 422)
        {
          reject({status, message, result: result?.errors || []});
        } else {
          reject({status, message, result: result});
        }

      });
  });
}

export const removeStaff = ({ commit, rootState, state}, payload) => {
  
  return new Promise((resolve, reject) => {

    state.staff = state.staff.filter((item) => item.id !== payload); 
    // .filter((item) => item !== index)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    axios.delete(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/organizer/staff/${payload}`)
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
