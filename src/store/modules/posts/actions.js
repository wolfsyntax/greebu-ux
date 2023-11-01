import axios from "axios";

export const createPost = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + (rootState.bearerToken || localStorage.api_token);

    setTimeout(async () => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/posts`,
          payload
        )
        .then((response) => {
          const {
            data: { status, message, result },
            status: statusCode,
          } = response;

          console.log("\n\nCreate Post: ", response);

          if (statusCode === 200 && status === 200) {
            resolve({ status, message, data: result });
          }

          reject({ message, data: result, status });
        })
        .catch((err) => {
          const {
            data: { status, message, result },
            status: statusCode,
          } = err;

          var data = result;

          if (status === 422 || status === 500) {
            data = result?.errors || [];
          }

          reject({ msg: message, data, status });
        });
    }, 1000);
  });
};

export const fetchPosts = ({ commit, rootState, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + (rootState.bearerToken || localStorage.api_token);

    setTimeout(async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/posts`
        )
        .then((response) => {
          const {
            data: { status, result, message },
            status: statusCode,
          } = response;

          if (statusCode === 200 && status === 200) {
            console.log("Fetch Posts response[200]: ", response);

            const { posts } = result;

            commit("SET_POSTS", posts);
            resolve({ status, message, data: result });
          }

          var data = result;

          if (status === 422 || status === 500) {
            data = result?.errors || [];
            reject({ message, data, status });
          }
        })
        .catch((err) => {
          console.log("Fetch post error: ", err);
          reject(err);
          // const { data: { status, message, result }, status: statusCode } = err
          // reject({ message, data: result, status });
        });
    }, 1500);
  });
};
