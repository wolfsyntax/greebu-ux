export const SET_GENRES = (state, payload) => {
  // state.genres = payload.map(function (g) { return g['title'] })
  state.genres = payload?.map(function (g) {
    return g["title"];
  });
  state.genreList = payload;
  console.log("STATE GENRES", state.genres);
};

export const SET_ARTIST_TYPES = (state, payload) => {
  state.artist_types = payload;
};

export const SET_ARTIST_GENRES = (state, payload) => {
  state.artist_genres = payload;
};

export const SET_MEMBERS = (state, payload) => {
  state.members = payload || [];
};

export const SET_MEMBER = (state, payload) => {
  if (Object.keys(payload).length === 5) {
    state.member = payload;
    state.member.role = payload.role?.toLowerCase();
    state.member.member_avatar = payload.avatar;
  } else {
    state.member = {};
  }
};

export const SET_ARTIST = (state, payload) => {
  state.artist = payload;
};

export const SET_ARTISTS = (state, payload) => {
  state.artists = payload;
};

export const SET_PAGINATION = (
  state,
  { current_page, last_page, per_page, total }
) => {
  state.pagination = {
    current_page: current_page || 1,
    last_page: last_page || 1,
    per_page: per_page || 10,
    total: total || 1,
  };
};

export const SET_ARTIST_PROFILE = (state, payload) => {
  state.artist_profile = payload;
};

export const CLEAR_ARTIST = (state) => {
  state.artist_types = null;

  state.artist_genres = null;

  state.genres = null;

  state.genreList = null;

  state.members = null;
  state.member = {};
  state.memIndex = -1;

  state.artist = {};

  state.pagination = {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 1,
  };

  state.artist_profile = {};
};

export const SET_MEMBER_INDEX = (state, payload = -1) => {
  state.memIndex = payload;
  state.member = {};

  if (payload > -1) {
    state.member = state.members[payload];
  }
};

export const SET_FILTERED_ARTIST = (state, payload = {}) => {
  console.log("Setting Filter artist to play");
  state.filterArtist = payload;
};

export const setArtistProfile = (state, payload = {}) => {
  console.log("Set Artist Info: ", payload);
  state.artistInfo = payload;
};

export const setArtistMembers = (state, payload = []) => {
  state.artistMembers = payload;
};

export const setArtistSchedules = (state, payload = []) => {
  state.artistSongs = payload;
};

export const setArtistSongs = (state, payload = []) => {
  state.artistSongs = payload;
};

export const setArtistOngoingEvents = (state, payload = []) => {
  console.log("Set Ongoing Events [artist]: ", payload);
  state.artistOngoingEvents = payload;
};

export const setArtistUpcomingEvents = (state, payload = []) => {
  console.log("Set Upcoming Events [artist]: ", payload);
  state.artistUpcomingEvents = payload;
};

export const setArtistPastEvents = (state, payload = []) => {
  console.log("Set Past Events [artist]: ", payload);
  state.artistPastEvents = payload;
};

export const setArtistVideos = (state, payload = []) => {
  state.artistVideos = payload;
};

export const setArtistPhotos = (state, payload = []) => {
  state.artistPhotos = payload;
};

export const setArtistReviews = (state, payload = []) => {
  state.artistReviews = payload;
};

export const setArtistBookings = (state, payload = []) => {
  state.artistBookings = payload;
};

export const setArtistPosts = (state, payload = []) => {
  state.artistPosts = payload;
};
