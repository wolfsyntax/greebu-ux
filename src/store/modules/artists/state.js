const state = {
  artists: null,
  filterArtist: {},
  artist_types: null,
  artist_categories: null,
  artist_genres: null,
  genres: null,
  genreList: null,
  members: null,
  artist: {},
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 1
  },
  artist_profile: {},
  member: {},
  memIndex: -1,
  proposal: {
    event_id: '',
    artist_id: '',
    artist_name: '',
    genres: [],
    total_member: 0,
    cover_letter: '',
    sample_song: ''
  },
  artistMembers: [],
  artistInfo: {},
  artistSchedules: [],
  artistSongs: [],
  artistOngoingEvents: [],
  artistUpcomingEvents: [],
  artistPastEvents: [],
  artistVideos: [],
  artistPhotos: [],
  artistReviews: [],
  artistBookings: [],
  artistPosts: [],
  artistId: ''
}

export default state
