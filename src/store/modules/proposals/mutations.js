export const RESET_PROPOSAL = (state) =>
{
  state.proposal = {
    event_id: '',
    artist_id: '',
    artist_name: '',
    genres: [],
    total_members: 0,
    cover_letter: '',
  };
} 

export const SET_PROPOSAL = (state, payload) =>
{
  console.log('Proposal data: ', payload)
  state.proposal = payload;
} 
