import axios from "axios";
// import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";

import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// import { GoogleAuthProvider, FacebookAuthProvider } from "@firebase/auth";
import { useCurrentUser, useFirebaseAuth } from "vuefire";

var actions = {
  signin({ commit, dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      commit("SET_AUTH", {});
      commit("SET_ACCOUNT", {});
      commit("SET_TOKEN", "");
      commit("SET_PROFILE", {});
      commit("SET_ROLE", "");
      // Clearing for other modules
      commit("SET_GENRES", null);
      commit("SET_ARTIST_TYPES", null);
      commit("SET_ARTIST_GENRES", null);
      commit("SET_MEMBERS", null);
      commit("SET_ARTIST", {});
      commit("SET_ARTISTS", null);
      commit("SET_PAGINATION", {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 1,
      });

      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/login`,
          payload
        )
        .then((response) => {
          const {
            data: { message, status, result },
            status: statusCode,
          } = response;

          console.log("\n\nSign-In Response: ", response);

          if (statusCode === 200) {
            const { profile, user, token, roles, account } = result;

            commit("SET_AUTH", user || {});
            commit("SET_ACCOUNT", account || {});
            commit("SET_TOKEN", token || "");
            commit("SET_PROFILE", profile || {});
            commit("SET_ROLE", profile?.role || "");
            commit("SET_ROLES", roles || []);

            localStorage.api_token = token;
            dispatch("fetchProfile");
          } else if (statusCode === 203 && status === 403) {
            const { profile, user, token } = result;

            commit("SET_AUTH", user || {});
            commit("SET_PROFILE", profile || {});
            commit("SET_ROLE", profile?.role || "");

            localStorage.api_token = token;
          }

          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  signup({ commit, dispatch }, payload) {
    commit("CLEAR_STATE");
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/register`,
          payload,
          {
            Accept: "application/json",
          }
        )
        .then((response) => {
          const { status: statusCode, data } = response;

          console.log("\n\nSign-Up Response: ", response);

          if (statusCode === 201) {
            const {
              status,
              result: { user, profile, roles, token },
            } = data;

            commit("SET_AUTH", user || {});
            commit("SET_PHONE", user?.phone);
            commit("SET_ROLE", profile?.role || "");
            commit("SET_ROLES", roles || []);

            commit("SET_TOKEN", token || "");
            commit("SET_PROFILE", profile || {});

            if (profile?.role === "customers" && user?.phone_verified_at) {
              commit("SET_TOKEN", token || "");
              commit("SET_PROFILE", profile || {});
            }

            dispatch("fetchProfile");
          }
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  signout({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + (state.bearerToken || localStorage.api_token);
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/logout`
        )
        .then((response) => {
          console.log("\n\nSign-Out Response: ", response);

          const { status, data } = response;
          if (status === 200 && data.status === 200) {
            if (state.role === "organizer") {
              commit("CLEAR_ORGANIZER_STATE");
              commit("RESET_EVENT_FORM");
            }

            commit("SET_NOTIFICATIONS");
            commit("CLEAR_ARTIST");
            commit("SET_AUTH", {});
            commit("SET_TOKEN", "");
            commit("SET_PROFILE", {});
            commit("SET_ROLE", "");
            // Clearing for other modules
            commit("SET_GENRES", null);
            commit("SET_ARTIST_TYPES", null);
            commit("SET_ARTIST_GENRES", null);
            commit("SET_MEMBERS", null);
            commit("SET_ARTIST", {});
            commit("SET_ARTISTS", null);
            commit("SET_ACCOUNT", {});
            commit("SET_PAGINATION", {
              current_page: 1,
              last_page: 1,
              per_page: 10,
              total: 1,
            });

            commit("SET_SONG_ARTIST_TYPE", null);
            commit("SET_SONG_MOODS", null);
            commit("SET_SONG_LANGUAGES", null);
            commit("SET_SONG_DURATIONS", null);
            commit("SET_SONG_PURPOSES", null);
            commit("SET_SONG_MOOD", {});
            commit("SET_SONG_LANGUAGE", {});
            commit("SET_SONG_DURATION", {});
            commit("SET_SONG_PURPOSE", {});
            commit("SET_SONG_REQUEST", null);
            commit("SET_SONG", {
              first_name: null,
              last_name: null,
              email: null,
              genre_id: null,
              song_type_id: null,
              language_id: null,
              duration_id: null,
              purpose_id: null,
              sender: null,
              receiver: null,
              user_story: null,
              page_status: null,
            });
            commit("SET_SONG_ARTIST", {});
          }
          resolve(response);
        })
        .catch((err) => {
          console.error("Signout Error ", err);
          const { response } = err;
          if (response.status === 401) {
            commit("SET_AUTH", {});
            commit("SET_TOKEN", "");
            commit("SET_PROFILE", {});
            commit("CLEAR_ARTIST");

            resolve(response);
          }
          reject(err);
        });
    });
  },
  plansOptions({ commit }, payload = "artists") {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/subscriptions/plan/${payload}`
        )
        .then((response) => {
          console.log("\n\nPlan Options Response: ", response);

          const { data, status } = response;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetchCountry({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/country`
        )
        .then((response) => {
          console.log("\n\nFetch Country Response: ", response);

          const { data, status } = response;
          commit("SET_COUNTRIES", data.result?.countries || []);

          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  socialAuth({ commit }, { provider, formData }) {
    return new Promise(async (resolve, reject) => {
      commit("SET_AUTH", {});
      commit("SET_TOKEN", "");
      commit("SET_PROFILE", {});
      commit("SET_ROLE", "");
      // Clearing for other modules
      commit("SET_GENRES", null);
      commit("SET_ARTIST_TYPES", null);
      commit("SET_ARTIST_GENRES", null);
      commit("SET_MEMBERS", null);
      commit("SET_ARTIST", {});
      commit("SET_ARTISTS", null);
      commit("SET_ACCOUNT", {});
      commit("SET_PAGINATION", {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 1,
      });

      commit("SET_SONG_ARTIST_TYPE", null);
      commit("SET_SONG_MOODS", null);
      commit("SET_SONG_LANGUAGES", null);
      commit("SET_SONG_DURATIONS", null);
      commit("SET_SONG_PURPOSES", null);
      commit("SET_SONG_MOOD", {});
      commit("SET_SONG_LANGUAGE", {});
      commit("SET_SONG_DURATION", {});
      commit("SET_SONG_PURPOSE", {});
      commit("SET_SONG_REQUEST", null);
      commit("SET_SONG", {
        first_name: null,
        last_name: null,
        email: null,
        genre_id: null,
        song_type_id: null,
        language_id: null,
        duration_id: null,
        purpose_id: null,
        sender: null,
        receiver: null,
        user_story: null,
        page_status: null,
      });
      commit("SET_SONG_ARTIST", {});
      commit("CLEAR_ARTIST");

      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/auth/${provider}/firebase`,
          formData
        )
        .then((response) => {
          const {
            status: statusCode,
            data: {
              message,
              status,
              result: { profile, user, token, account },
            },
          } = response;
          console.log(`n\nSocial Auth [${provider}] Response: `, response);

          if (statusCode === 200) {
            commit("SET_AUTH", user);
            commit("SET_TOKEN", token);
            commit("SET_PROFILE", profile);
            commit("SET_ROLE", profile?.role || "");
            commit("SET_ACCOUNT", account);

            localStorage.api_token = token;
          }

          resolve(response?.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  socialMediaAuth({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      const auth = useFirebaseAuth();

      var provider = null;
      switch (payload) {
        case "facebook":
          provider = new FacebookAuthProvider();
          break;
        default:
          provider = new GoogleAuthProvider();
          break;
      }

      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Sign-In With PopUp Response: ", result);

          resolve(result);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  },
  forgotPassword({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/password/email`,
          payload
        )
        .then((response) => {
          console.log("Forgot Password Response: ", response);

          const {
            data: { message, status, result },
          } = response;

          if (status === 200) {
          }

          resolve(response);
        })
        .catch((err) => {
          console.error("Forgot Password Error ", err);
          reject(err);
        });
    });
  },
  resetPassword({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/password/reset`,
          payload
        )
        .then((response) => {
          console.log("Reset Password Response: ", response);

          const {
            status: statusCode,
            data: { message, status, result },
          } = response;

          if (statusCode === 200) {
          }
          console.log("Status: ", response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sendOTPCode({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + (state.bearerToken || localStorage.api_token);

      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/phone/send`,
          payload
        )
        .then((response) => {
          console.log("\n\nSend OTP Response: ", response);

          const {
            data: { message, status, result },
          } = response;

          if (status === 200) {
            const { user } = result;
            commit("SET_AUTH", user || {});
          }

          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  resendOTPCode({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/phone/resend/${payload}`
        )
        .then((response) => {
          console.log("\n\nResend OTP Response: ", response);

          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  verifyOTP({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/phone/verify/${payload?.id}`,
          {
            code: payload?.code,
          }
        )
        .then((response) => {
          console.log("\n\nVerify OTP Response: ", response);

          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  verifyOTPF({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + (state.bearerToken || localStorage.api_token);

      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/phone/verify?role=${state.role}`,
          {
            code: payload?.code,
          }
        )
        .then((response) => {
          console.log("Verify OTP-F Response: ", response);

          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  phoneOTP({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/sms-otp/${payload}`
        )
        .then((response) => {
          console.log("Phone OTP Response: ", response);

          const {
            status: statusCode,
            data: { message, status, result },
          } = response;

          if (statusCode === 200) {
          }
          console.log("Status: ", response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // Version 2
  requestCode({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/user/${state.user?.id}/send-otp`,
          payload
        )
        .then((response) => {
          console.log("\n\nRequest Code Response: ", response);
          const {
            status: statusCode,
            data: { message, status, result },
          } = response;

          if (statusCode === 200) {
            const { user } = result;
            commit("SET_AUTH", user || {});
          }

          resolve(response);
        })
        .catch((err) => {
          console.log("Error response: ", err);
          reject(err);
        });
    });
  },
  resendCode({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/user/${state.user?.id}/resend-otp`
        )
        .then((response) => {
          console.log("\n\nResend Code response: ", response);
          const {
            data: { message, status, result },
          } = response;

          if (status === 200) {
            const { user } = result;
            commit("SET_AUTH", user || {});
          }

          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  validateCode({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/user/${state.user?.id}/verify?role=${state.role}`,
          {
            code: payload?.code,
          }
        )
        .then((response) => {
          console.log("\n\n::Validate Code:: ", response);

          const { status: statusCode, data } = response;

          if (statusCode === 201) {
            const {
              result: { user, profile, roles, token, account },
            } = data;

            commit("SET_AUTH", user || {});
            commit("SET_TOKEN", token || "");
            commit("SET_PROFILE", profile || {});
            commit("SET_ACCOUNT", account || {});
            commit("SET_ROLE", profile?.role || "");
            commit("SET_ROLES", roles || null);
          }

          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Resend Email verification
  resendEmail({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (state.bearerToken || localStorage.api_token);

      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/email/resend/${state.user?.id}`
        )
        .then((response) => {
          console.log("\n\nResend Code Response: ", response);
          const {
            data: { message, status, result },
          } = response;
          console.log("Email Resend: ", response);
          if (status === 200) {
          }

          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  test2({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + (state.bearerToken || localStorage.api_token);
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/test-request`
        )
        .then((response) => {
          const {
            data: { message, status, result },
            status: statusCode,
          } = response;
          console.log("\n\nTest2 Response: ", response);

          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetchCityList({ commit, rootState }, payload = "") {
    return new Promise(async (resolve, reject) => {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (rootState.bearerToken || localStorage.api_token);
      await axios
        .get(
          `${
            import.meta.env.VITE_BASE_URL || "http://localhost:8000"
          }/api/events/create?city=${payload}`
        )
        .then((response) => {
          const {
            status: statusCode,
            data: { status, message, result },
          } = response;

          if (statusCode === 200 && status === 200) {
            const { city } = result;

            if (city) commit("SET_CITY", city);

            resolve({ status: statusCode, message, result: result });
          }

          reject({ message, status: statusCode, result });
        });
    });
  },
  fetchUserInfo({ commit, rootState, dispatch }) {
    return new Promise(async (resolve, reject) => {
      if (rootState.bearerToken !== "" && localStorage.api_token !== "") {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + (rootState.bearerToken || localStorage.api_token);
        await axios
          .get(
            `${
              import.meta.env.VITE_BASE_URL || "http://localhost:8000"
            }/api/user`
          )
          .then((response) => {
            const { status: statusCode, data } = response;

            if (statusCode === 203) {
              commit("CLEAR_ORGANIZER_STATE");
              commit("SET_AUTH", {});
              commit("SET_TOKEN", "");
              commit("SET_PROFILE", {});
              commit("SET_ROLE", "");
              commit("SET_ACCOUNT", {});

              dispatch("signout");
              reject(data);
            }
            resolve(data);
          });
      }
    });
  },
};

export default actions;
