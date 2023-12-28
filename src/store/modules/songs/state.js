const state = {
  song_artist_types: null,
  moods: null,
  languages: null,
  durations: null,
  purposes: null,
  song: {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    artists: [],
    // genre: null,
    sender: null,
    receiver: null,
    user_story: null,
    delivery_date: null,
    estimate_date: null,
    song_type_id: null,
    language_id: null,
    duration_id: null,
    purpose_id: null,
    page_status: 'info' // enum('info', 'song', 'story', 'review')
  },
  artist_filter: {
    artist_type: null,
    artist_genre: null,
    rating: null,
    sortBy: null
  },
  song_language: {},
  song_duration: {},
  song_purpose: {},
  song_mood: {},
  song_genre: '',
  // song_artists: [],
  song_artists: {},
  customized_songs: []
}

export default state
