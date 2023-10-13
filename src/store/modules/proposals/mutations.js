export const RESET_PROPOSAL = (state) => {
  state.proposal = {
    event_id: "",
    artist_id: "",
    artist_name: "",
    genres: [],
    total_members: 0,
    cover_letter: "",
  };
};

export const SET_PROPOSAL = (state, payload = {}) => {
  console.log("Proposal data: ", payload);
  state.proposal = payload;
};

export const SET_PROPOSALS = (state, payload = []) => {
  state.proposals = payload;
};

export const SET_PENDING_PROPOSALS = (state, payload = []) => {
  state.pendingProposals = payload;
};

export const SET_ACCEPTED_PROPOSALS = (state, payload = []) => {
  state.acceptedProposals = payload;
};

export const SET_DECLINED_PROPOSALS = (state, payload = []) => {
  state.declinedProposals = payload;
};
