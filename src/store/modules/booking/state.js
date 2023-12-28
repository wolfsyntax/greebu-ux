const state = {
  form: {
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
  },
  init: {
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
  },
  schedules: [
    { title: 'event 1', date: '2023-11-01' },
    { title: 'event 2', date: '2023-11-15' }
  ]
}

export default state
