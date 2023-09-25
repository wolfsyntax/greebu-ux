var getters = {
  userInfo: state => state.profile,
  info: state => state.user,
  token: state => state.bearerToken,
  userRole: state => state.role,
  isLoggedIn: (state) => state.bearerToken && Object.keys(state.profile).length !== 0, //
  isFreeloader: (state) => state.profile?.is_freeloader ? true : false,
  mustPhoneVerified: (state) => (state.user?.phone_verified_at === null && state.isPhoneModify),
  countryList: state => state.countries
    .map(function (country)
    {
      return {
        id: country.id,
        code: country.name,
      }
    }),
  phoneCode: state => state.countries
    .map(function (country)
    {
      return {
        id: country.id,
        code: country.plusIso2,
        label: country.phoneCode, 
      }
    }),
  profileForm: state =>
  {
    return {
      first_name: state?.user.first_name,
      last_name: state?.user.last_name,
      email: state?.user.email,
      username: state?.user.username,
      phone: state?.user.phone,
    }
  },
  // agenre: state => state.account.genre.map(function (g) { return g['title']  })
  myAccount: state => state.account,
  myAvatar: state => state.account?.avatar || state.profile?.avatar || '',
  spotify: state =>
  {
    if (state.profile.spotify !== null && state.profile.spotify !== undefined) {

        const regex = /\/artist\/[^/]+$/;
        const match = state.profile.spotify.match(regex);
        if (match) {
          const artistSlug = match[0].split('/').pop();
          return artistSlug;
        } else {
          return "";
        }
      } else {
        return ""; 
      }
  },
  instagram: state =>
  {
    if (state.profile.instagram !== null && state.profile.instagram !== undefined) {
      return state.profile.instagram.replace(/^https?:\/\/(www\.)?/, "");
    }
    return '';
  },
  threadsNET: state =>
  {
    if (state.profile.threads !== null && state.profile.threads !== undefined) {
      return state.profile.threads.replace(/^https?:\/\/(www\.)?/, "");
    }
    return '';
  },
  youtube: state =>
  {
    if (state.profile?.youtube !== null && state.profile?.youtube !== undefined) {
      return state.profile.youtube.replace(/^https?:\/\/(www\.)?/, "");
    }
    return '';
  },
  twitter: state =>
  {
    if (state.profile?.twitter !== null && state.profile?.twitter !== undefined) {
      return state.profile.twitter.replace(/^https?:\/\/(www\.)?/, "");
    }
    return '';
  },
  isComplete: state =>
  {
    const { artist_name, artist_type_id, artist_type, bio, genres, song, song_title } = state.account
    const { street_address, city, province } = state.profile

    return ((artist_name && artist_type_id && artist_type && bio && genres && song && song_title) && (street_address && city && province)) ? true : false;

  }
}

export default getters
