import axios from 'axios';

export const setFavorite = payload => ({
  type: 'SET_FAVORITE',
  payload,
});

export const loginRequest = payload => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = payload => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const registerRequest = payload => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const deteleFavorite = payload => ({
  type: 'DELETE_FAVORITE',
  payload,
});

export const getVideoSource = payload => ({
  type: 'GET_VIDEO_SOURCE',
  payload,
});

export const login = ({ email, password }) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in/',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(res => dispatch(loginRequest(...res.data)))
      .catch(err => console.error(err));
  };
};

export { setFavorite as default };
