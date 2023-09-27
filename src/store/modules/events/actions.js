import axios from "axios";

export const fetchEventOptions = ({ commit, rootState }) =>
{
  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/event/create`)
      .then(response =>
      {
        const { status: statusCode, data: { status, message, result } } = response;

        if (statusCode === 200 && status === 200) 
        {
          const { event_types } = result;

          commit('SET_EVENT_OPTIONS', event_types || []);

          resolve({ status: statusCode, message, result: result });
        }
        

        reject({ message, status: statusCode, result });
      })
  });
}
export const createEvent = ({ commit, rootState }, payload) =>
{
  return new Promise(async (resolve, reject) =>
  {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artists/create`, payload)
      .then(response =>
      {
        console.log('Create Event: ', response)
      })
  });
}