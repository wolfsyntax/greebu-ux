const state = {
  form: {
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
    look_for: '',
    look_type: '',
    requirement: '',
  },
  event_types: [],
  event_artist_type: [
    'full band',
    'acoustic band',
    'solo artist',
    'duo artist',
  ],
  event_service_type: [
    'sounds system',
    'emcee',
    'photographer',
    'videographer',
    'venue',
  ],
  look_for: [
    { value: 'artist', text: 'Artist' },
    { value: 'service', text: 'Service' },
  ],
  filterType: '',
  filterLocation: '',
  filterCost: 'free'
};

export default state;