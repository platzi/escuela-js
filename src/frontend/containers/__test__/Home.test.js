import React from 'react';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import Home from '../Home';

describe('Home component', () => {
  test('Matches the snapshot', () => {
    const home = create(
      <ProviderMock>
        <Home />
      </ProviderMock>,
    );
    expect(home.toJSON()).toMatchSnapshot();
  });
});
