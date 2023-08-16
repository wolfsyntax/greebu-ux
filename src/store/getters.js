var getters = {
  userInfo: state => state.profile,
  info: state => state.user,
  token: state => state.bearerToken,
  userRole: state => state.role,
  isLoggedIn: (state) => state.bearerToken && Object.keys(state.profile).length !== 0, //
  isFreeloader: (state) => state.profile?.is_freeloader ? true : false,
  isPhoneVerified: (state) => (state.user?.phone_verified_at === null && state.isPhoneModify),
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
  myAccount: state => state?.account
}

export default getters
