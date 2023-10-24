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

export const RESET_EVENT_FILTER = (state) => {
  state.eventFilter = {
    event_type: "",
    city: "",
    cost: false,
    search: "",
    sortBy: "DESC",
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

export const SET_EVENT_ID = (state, payload = "") => {
  state.eventId = payload;
};
