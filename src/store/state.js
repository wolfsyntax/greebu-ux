/* eslint-disable no-dupe-keys */
const state = {
  profile: {},
  user: {},
  bearerToken: '',
  role: '', // artists, customers, organizer, service-provider
  roles: [],
  artist_types: null,
  genres: null,
  artists: null,
  plans: null,
  base_url: import.meta.env.BASE_URL,
  countries: null,
  cities: null,
  phone: null,
  account_type: '',
  account: null,
  isPhoneModify: false,
  custom_genre: '',
  artist_genre: [],
  proposal: {},
  selectedOption: 'My Account',
  userId: '',
  cancelReasons: [
    'Sudden Scheduling Conflict',
    'Personal Emergency',
    'Health Issues',
    'Technical or Equipment Failure',
    'Conflict to previous commitment',
    'No Transportation',
    'Change of Mind'
  ],
  signupForm: {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone: '',
    password: '',
    password_confirmation: '',
    account_type: 'customers',
    // account_type: '',
    phone: '',
    login_type: 'email',
    verification_code: ''
  },
  socialForm: {
    email: '',
    avatar: '',
    first_name: '',
    last_name: '',
    provider_id: '',
    username: '',
    provider_type: '',
    auth_type: '',
    account_type: ''
  },
  phoneMask: '',
  geocode: {
    lat: '0.000000',
    lng: '0.000000'
  }
}

export default state
