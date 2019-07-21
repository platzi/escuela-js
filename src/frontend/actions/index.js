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

export const setError = payload => ({
  type: 'SET-ERROR',
  payload,
});

//Thunks
export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-in', {
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => dispatch(loginRequest(data)))
      .then(() => redirectUrl())
      .catch(err => dispatch(setError(err)));
  };
};

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => redirectUrl())
      .catch(err => dispatch(setError(err)));
  };
};

export { setFavorite as default };
