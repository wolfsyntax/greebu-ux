import axios from "axios";

export const fetchEventOptions = ({ commit, rootState }) =>
{
  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/events/create`)
      .then(response =>
      {
        const { status: statusCode, data: { status, message, result } } = response;

        if (statusCode === 200 && status === 200) 
        {
          console.log('Fetch Event Option: ', response);
          const { event_types, event_artist_type, event_service_type, event_pricing } = result;

          commit('SET_EVENT_OPTIONS', event_types || []);
          commit('SET_LOOK_FORM', { event_artist_type, event_service_type });
          resolve({ status: statusCode, message, result: result });

        }
        

        reject({ message, status: statusCode, result });
      })
  });
}

export const fetchEvents = ({ commit, rootState, state }) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    var url = '';
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/events/${state.form.id}/look`, formData)
    .then(response =>
    {
      console.log('Fetch Events: ', response);

      const { status: statusCode, data } = response;

      if (statusCode === 200) {
        const { status, message, result: { event } } = data; 
        console.log('Fetch Event Form: ', event);
        // commit('SET_EVENT_FORM', event);
        resolve(data);
      }

      reject(data)
    })
    .catch(err =>
    {
      const { data } = err;
      reject(data);
    })
  })  
}

export const verifyEvent = ({ commit, rootState, state }) =>
{
  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    console.log('Verify Event [form]: ', state.form)
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/events/verify`, state.form, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then(response =>
    {
      console.log('Event form Validation: ', response);
      const { status: statusCode, data } = response
      if (statusCode === 200) {
        const { status, message, result: { event } } = data; 
        if (status === 201) {
          event.look_for = 'artist';
        }
        
        resolve(data);

      }

      reject(data)
    })
    .catch(err =>
    {
      const { data } = err;
      reject(data);
    })
  });
}

export const createEvent = ({ commit, rootState, state }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    if (payload === 'skip') {
      delete state.form.look_for;
      delete state.form.look_type;
      delete state.form.requirement;
    }
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/events`, state.form, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then(response =>
    {
      console.log('Create Event: ', response);
      const { status: statusCode, data } = response
      if (statusCode === 200) {
        const { status, message, result: { event } } = data; 
       
        commit('SET_EVENT_FORM', event);

        resolve(data);

      }

      reject(data)
    })
    .catch(err =>
    {
      const { data } = err;
      reject(data);
    })
  });
}

export const updateEvent = ({ commit, rootState, state }) =>
{
  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
    
    console.log('Update Form data for step 2: ', state.form);
    const { look_for, look_type, requirement } = state.form;
    var formData = { look_for, look_type, requirement }
    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/events/${state.form.id}/look`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then(response =>
    {
      console.log('Update Event: ', response);

      const { status: statusCode, data } = response;

      if (statusCode === 200) {
        const { status, message, result: { event } } = data; 
        
        commit('SET_EVENT_FORM', event);
        resolve(data);
      }

      reject(data)
    })
    .catch(err =>
    {
      const { data } = err;
      reject(data);
    })
  });
}