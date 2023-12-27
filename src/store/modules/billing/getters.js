// export const stepOne = state => `${state.url}/step-one/`
// export const stepOne = (state,getters, rootState) => {}
// export const artistProfile = state => state.artist

export const emoticonsList = state =>
{
  const chunk = (array) =>
    array.reduce((acc, _, i) =>
    {
      if (i % 2 === 0) acc.push(array.slice(i, i + 2))
      return acc
    },
    []);

  return chunk(state.emoticons);
  
}