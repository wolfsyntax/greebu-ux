import axios from 'axios';

export const sendArtistProposal = ({ commit, rootState, state }) =>
{
  return new Promise(async (resolve, reject) =>
  {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);

    var url = `${import.meta.env.VITE_BASE_URL || 'http://localhost:8000'}/api/artist-proposal`;
    
    console.log('Proposal post data: ', state.proposal)
    await axios.post(url, state.proposal)
    .then(response =>
    {
      console.log('My Proposal [artist]: ', response);

      const { status: statusCode, data } = response;

      if (statusCode === 200) {
        console.log('[NEW] Proposal: ', data)
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