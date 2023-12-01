var mutations = {
  SET_AUTH(state, payload) {
    // state.role = payload?.profile?.roles[0].name || 'customers';
    // state.user = payload.user;
    state.user = payload;
  },

  SET_TOKEN(state, payload) {
    state.bearerToken = payload;
  },
  SET_PROFILE(state, payload) {
    state.profile = payload;
  },
  SET_ACCOUNT(state, payload) {
    if (state.role === "organizer") {
      payload.accept_proposal = payload.accept_proposal ? true : false;
      payload.send_proposal = payload.send_proposal ? true : false;
    }
    state.account = payload;
  },
  SET_PLANS(state, payload) {
    state.plans = payload;
  },
  SET_COUNTRIES(state, payload) {
    state.countries = payload;
  },
  SET_ROLE(state, payload) {
    state.role = payload;
  },
  SET_ROLES(state, payload) {
    state.roles = payload;
  },
  SET_PHONE(state, payload) {
    state.phone = payload;
  },
  SET_ACCOUNT_GENRE(state, payload) {
    state.account.genres = payload; //.map(function (g) { return g['title']  })
  },
  SET_CUSTOM_GENRE(state, payload) {
    state.custom_genre = payload;
  },
  CLEAR_STATE(state) {
    state.profile = {};
    state.user = {};
    state.bearerToken = "";
    state.role = "";
    state.roles = [];
    state.phone = null;
    state.account = {};
    state.custom_genre = "";
    state.artist_genre = [];
  },
  SET_CITY(state, payload) {
    state.cities = payload;
  },
  SET_PHONE_ISMODIFIED(state) {
    state.isPhoneModify = state;
  },
  // setShowOnboardingMessage(state, value) {
  //   state.showOnboardingMessage = value;
  // }

  setProposal(state, payload = {}) {
    state.proposal = payload;
  },
  setSettingMenu(state, payload = "My Account") {
    state.selectedOption = payload;
  },
  setCancelReasons(
    state,
    payload = [
      "Sudden Scheduling Conflict",
      "Personal Emergency",
      "Health Issues",
      "Technical or Equipment Failure",
      "Conflict to previous commitment",
      "No Transportation",
      "Change of Mind",
    ]
  ) {
    state.cancelReasons = payload;
  },
  setSignupForm(
    state,
    payload = {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      phone: "",
      password: "",
      password_confirmation: "",
      account_type: "customers",
      // account_type: '',
      phone: "",
      login_type: "email",
    }
  ) {
    state.signupForm = payload;
  },
  clearSignupForm(
    state,
    payload = {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      phone: "",
      password: "",
      password_confirmation: "",
    }
  ) {
    const {
      first_name,
      last_name,
      email,
      username,
      phone,
      password,
      password_confirmation,
    } = payload;

    state.signupForm.first_name = first_name;
    state.signupForm.last_name = last_name;
    state.signupForm.email = email;
    state.signupForm.username = username;
    state.signupForm.phone = phone;
    state.signupForm.password = password;
    state.signupForm.password_confirmation = password_confirmation;
  },
  setPhoneMask(state, payload) {
    state.phoneMask = payload;
  },
  setGeoLocation(state, payload) {
    state.geocode = {
      lat: payload?.latitude || "0.0000000", // i.e. 13.6139099
      lng: payload?.longitude || "0.0000000", // i.e. 123.1615544
    };
  },
};

export default mutations;
