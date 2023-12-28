export const setBooking = (state, payload) => {
  state.form = payload || {
    event_type: '',
    event_name: '',
    location: '',
    street_address: '',
    barangay: '',
    city: '',
    province: '',
    audience: false,
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    description: '',
    cover: '',
    venue_name: ''
  }
}

export const resetBooking = (state) => {
  state.form = {
    event_type: '',
    event_name: '',
    location: '',
    street_address: '',
    barangay: '',
    city: '',
    province: '',
    audience: false,
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    description: '',
    cover: '',
    venue_name: ''
  }
  console.log('new Form ', state.init, state.form)
}

export const setSchedules = (state, payload) => {}
