const state = {
  form: {
    cover_photo: '',
    event_type: '',
    event_name: '',
    location: '',
    // venue
    street_address: '',
    barangay: '',
    city: '',
    province: '',
    // audience
    audience: false,
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    description: '',
    look_for: '',
    look_types: [],
    requirement: '',
    cover: '',
    venue_name: '',
    mode: 'store',
    total_participants: 0
  },
  event_types: [],
  event_artist_type: [
    'full band',
    'acoustic band',
    'solo artist',
    'duo artist'
  ],
  event_service_type: [
    'sounds system',
    'emcee',
    'photographer',
    'videographer',
    'venue'
  ],
  look_for: [
    { value: 'artist', text: 'Artist' },
    { value: 'service', text: 'Service' }
  ],
  eventFilter: {
    event_type: '',
    city: '',
    cost: 'both',
    search: '',
    sortBy: 'ASC'
  },
  cancelReason: [
    'change of plan',
    'financial issue',
    'venue not available',
    'change of date'
  ],
  events: [],
  event: {},
  ongoingEvents: [],
  upcomingEvents: [],
  pastEvents: [],
  ongoingListEvents: [],
  upcomingListEvents: [],
  pastListEvents: [],
  ongoingPagination: {
    total: 0,
    last_page: 1,
    per_page: 8,
    offset: 8,
    page: 1
  },
  upcomingPagination: {
    total: 0,
    last_page: 1,
    per_page: 8,
    offset: 8,
    page: 1
  },
  pastPagination: {
    total: 0,
    last_page: 1,
    per_page: 4,
    offset: 4,
    page: 1
  },
  eventId: '',
  viewType: 'ongoing',
  eventCreator: {},
  eventStaff: []
}

export default state
