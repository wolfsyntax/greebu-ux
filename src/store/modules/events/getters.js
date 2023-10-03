export const eventLookType = (state,getters, rootState) =>
{
  if (state.form.look_for === 'service') {
    return state.event_service_type.map(function (obj)
    {
      return {
        value: obj,
        text: obj,
      }
    })
  } else {
    return state.event_artist_type
  }
}
