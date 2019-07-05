export const setFavorite = payload => ({
  type: 'SET_FAVORITE',
  payload,
});

export const loginRequest = payload => ({
  type: 'LOGIN_REQUEST',
  payload,
})

export { setFavorite as default }