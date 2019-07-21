import { setFavorite } from '../index';
import movieMock from '../../__mocks__/movieMock';

describe('actions', () => {
  it('Shoul create an action to set a Favorite', () => {
    const payload = movieMock;
    const expectedAction = {
      type: 'SET_FAVORITE',
      payload,
    };
    expect(setFavorite(payload)).toEqual(expectedAction);
  });
});

