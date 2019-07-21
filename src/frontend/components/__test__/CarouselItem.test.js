import React from 'react';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import CarouselItem from '../CarouselItem';

describe('CarouselItem component', () => {
  test('Matches the snapshot', () => {
    const carousel = create(
      <ProviderMock>
        <CarouselItem />
      </ProviderMock>,
    );
    expect(carousel.toJSON()).toMatchSnapshot();
  });
});
