export const SET_EVENT_OPTIONS = (state, payload) =>
{
  state.event_types = payload;

}

export const SET_EVENT_FORM = (state, payload) =>
{
  state.form = payload;
}

export const SET_LOOK_FORM = (state, {event_artist_type, event_service_type}) =>
{

  if (event_artist_type) state.event_artist_type = event_artist_type;
  if (event_service_type) state.event_service_type = event_service_type;
  
}
export const RESET_EVENT_FORM = state =>
{
  state.form = {
    id: '',
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
    // step two: What are you looking for?
    look_for: '',
    look_type: '',
    requirement: '',
  }
}