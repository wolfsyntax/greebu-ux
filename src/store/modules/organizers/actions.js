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
