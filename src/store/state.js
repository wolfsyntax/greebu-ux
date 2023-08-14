var state = {
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
  phone: null,
  account_type: '',
  account: null,
  isPhoneModify: false,
}

export default state
