import React from 'react';
import { create } from 'react-test-renderer';
import Carousel from '../Carousel';

describe('Carousel component', () => {
  test('Matches the snapshot', () => {
    const carousel = create(<Carousel />);
    expect(carousel.toJSON()).toMatchSnapshot();
  });
});
