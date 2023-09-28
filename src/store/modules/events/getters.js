export const eventLookType = state =>
{
  if (state.form.look_for === 'service') {
    return state.event_service_type
  } else {
    return state.event_artist_type
  }
}