var getters = {
  userInfo: state => state.profile,
  token: state => state.bearerToken,
  userRole: state => state.role,
  isLoggedIn: (state) => state.bearerToken && Object.keys(state.profile).length !== 0, //
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
  }
}

export default getters
