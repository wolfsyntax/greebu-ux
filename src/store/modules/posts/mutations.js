export const SET_POSTS = (state, payload) =>
{
  console.log('\n\nSET_POSTS: ', payload)
  state.posts = payload
}

export const SET_POST = (state, payload) =>
{
  state.post = payload
}
