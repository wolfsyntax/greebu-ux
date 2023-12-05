export const SET_EVENT_OPTIONS = (state, payload) => {
  state.event_types = payload;
};

export const SET_EVENT_FORM = (state, payload) => {
  console.log("SET_EVENT_FORM data: ", payload);
  state.form = payload;
};

export const SET_LOOK_FORM = (
  state,
  { event_artist_type, event_service_type }
) => {
  if (event_artist_type) state.event_artist_type = event_artist_type;
  if (event_service_type) state.event_service_type = event_service_type;
};
export const RESET_EVENT_FORM = (state) => {
  state.form = {
    cover_photo: "",
    event_type: "",
    event_name: "",
    street_address: "",
    barangay: "",
    city: "",
    province: "",
    // audience
    audience: false,
    total_participants: 0,
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    description: "",
    // step two: What are you looking for?
    look_for: "",
    look_types: [],
    requirement: "",
    cover: "",
    venue_name: "",
    mode: "store",
  };

  state.form.event_type = "";
  console.log("[RESET_EVENT_FORM] Event Form: ", state.form);
};

export const SET_EVENT_LIST = (state, payload) => {
  state.events = payload;
};

export const SET_EVENT_FILTER = (state, payload) => {
  state.eventFilter = {
    event_type: payload?.event_type || "",
    city: payload?.city || "",
    cost: payload?.cost || "",
    search: payload?.search || "",
    sortBy: payload?.sortBy || "ASC",
  };
};

export const RESET_EVENT_FILTER = (state) => {
  state.eventFilter = {
    event_type: "",
    city: "",
    cost: "both",
    search: "",
    sortBy: "ASC",
  };
};

export const SET_EVENT = (state, payload) => {
  console.log("SET_EVENT data: ", payload);
  state.event = payload;
};

export const SET_ONGOING_EVENTS = (state, payload = []) => {
  state.ongoingEvents = payload;
  console.log("Ongoing Events [mutation] => ", state.ongoingEvents);
};

export const SET_UPCOMING_EVENTS = (state, payload = []) => {
  state.upcomingEvents = payload;
};

export const SET_PAST_EVENTS = (state, payload = []) => {
  state.pastEvents = payload;
};

export const setOngoingEvents = (state, payload = []) => {
  state.ongoingListEvents = payload;
};

export const setUpcomingEvents = (state, payload = []) => {
  state.upcomingListEvents = payload;
};

export const setPastEvents = (state, payload = []) => {
  state.pastListEvents = payload;
};

export const SET_EVENT_ID = (state, payload = "") => {
  state.eventId = payload;
};

export const setOngoingPagination = (
  state,
  payload = {
    total: 0,
    last_page: 1,
    per_page: 6,
    offset: 6,
    page: 1,
  }
) => {
  state.ongoingPagination = payload;
};

export const setUpcomingPagination = (
  state,
  payload = {
    total: 0,
    last_page: 1,
    per_page: 6,
    offset: 6,
    page: 1,
  }
) => {
  state.upcomingPagination = payload;
};

export const setPastPagination = (
  state,
  payload = {
    total: 1,
    last_page: 1,
    per_page: 6,
    offset: 6,
    page: 1,
  }
) => {
  state.pastPagination = payload;
};

export const setPastPage = (state, payload) => {
  console.log("Past Event [Current Page]: ", payload);
  state.pastPagination.page = payload;
};

export const setUpcomingPage = (state, payload) => {
  console.log("Upcoming Event [Current Page]: ", payload);
  state.upcomingPagination.page = payload;
};

export const setOngoingPage = (state, payload) => {
  console.log("Ongoing Event [Current Page]: ", payload);
  state.ongoingPagination.page = payload;
};

// +++
export const nextPastPage = (state) => {
  if (state.pastPagination.page < state.pastPagination.last_page)
    state.pastPagination.page++;
};

export const nextUpcomingPage = (state) => {
  if (state.upcomingPagination.page < state.upcomingPagination.last_page)
    state.upcomingPagination.page++;
};

export const nextOngoingPage = (state, payload) => {
  if (state.ongoingPagination.page < state.ongoingPagination.last_page)
    state.ongoingPagination.page++;
};

export const prevPastPage = (state) => {
  if (state.pastPagination.page > 1) state.pastPagination.page--;
};

export const prevUpcomingPage = (state) => {
  if (state.upcomingPagination.page > 1) state.upcomingPagination.page--;
};

export const prevOngoingPage = (state, payload) => {
  if (state.ongoingPagination.page > 1) state.ongoingPagination.page--;
};
