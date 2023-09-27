export const SET_EVENT_OPTIONS = (state, payload) =>
{
  state.event_types = payload;
}

export const RESET_EVENT_FORM = (state) =>
{
  state.form = {
    cover_photo: '',
    event_type: '',
    event_name: '',
    location: '',
    // audience
    audience: false,
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    description: '',
    look_for: '',
    look_type: '',
    requirement: '',
  }
}