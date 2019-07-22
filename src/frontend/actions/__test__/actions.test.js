import { setFavorite, loginRequest, logoutRequest } from '../index';
import movieMock from '../../__mocks__/movieMock';

describe('Actions', () => {
  it('Shoul create an action to set a Favorite', () => {
    const payload = movieMock;
    const expectedAction = {
      type: 'SET_FAVORITE',
      payload,
    };
    expect(setFavorite(payload)).toEqual(expectedAction);
  });

  it('Shoul create an action to logIn', () => {
    const payload = {
      email: 'test@test.com',
      password: 'thisisnotapassword',
    };
    const expectedAction = {
      type: 'LOGIN_REQUEST',
      payload,
    };
    expect(loginRequest(payload)).toEqual(expectedAction);
  });
  it('Shoul create an action to logOut', () => {
    const payload = {};
    const expectedAction = {
      type: 'LOGOUT_REQUEST',
      payload,
    };
    expect(logoutRequest(payload)).toEqual(expectedAction);
  });
});
