import axios from "axios";

export const sendArtistProposal = ({ commit, rootState, state }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + (rootState.bearerToken || localStorage.api_token);

    var url = `${
      import.meta.env.VITE_BASE_URL || "http://localhost:8000"
    }/api/artist-proposal`;

    console.log(`Proposal post data ${url}: `, state.proposal);
    axios
      .post(url, state.proposal, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("My Proposal [artist]: ", response);

        const {
          status: statusCode,
          data,
          data: { status },
        } = response;

        if (statusCode === 200 && status === 201) {
          console.log("[NEW] Proposal: ", data);
          resolve(data);
        }

        reject(data);
      })
      .catch((err) => {
        const { data } = err;
        console.log("Send Artist Proposal Error: ", err);
        reject(data);
      });
  });
};

export const getArtistProposal = ({ commit, rootState, state }, payload) => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + (rootState.bearerToken || localStorage.api_token);

    var url = `${
      import.meta.env.VITE_BASE_URL || "http://localhost:8000"
    }/api/artist-proposal/${payload}`;

    await axios
      .get(url, state.proposal)
      .then((response) => {
        console.log("My Proposal [artist]: ", response);

        const { status: statusCode, data } = response;

        if (statusCode === 200) {
          const {
            result: { proposal },
          } = data;

          commit("setProposal", proposal || {});

          resolve(proposal || {});
        }

        reject(data);
      })
      .catch((err) => {
        const { data } = err;

        reject(data);
      });
  });
};
