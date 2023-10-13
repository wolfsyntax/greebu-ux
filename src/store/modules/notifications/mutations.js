export const SET_NOTIFICATIONS = (state, payload = []) => {
  state.notifications = payload;
};

export const SET_NOTIFICATION = (state, payload = {}) => {
  state.notification = payload;
};
