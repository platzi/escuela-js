import React from 'react';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import NotFound from '../NotFount';

describe('NotFound component', () => {
  test('Matches the snapshot', () => {
    const button = create(
      <ProviderMock>
        <NotFound />
      </ProviderMock>,
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
});
