export const setBooking = (state, payload) => {
  state.form = payload;
};

export const resetBooking = (state, payload) => {
  state.form = state.init;
};

export const setSchedules = (state, payload) => {};
