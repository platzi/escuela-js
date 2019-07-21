import React from 'react';
import { create } from 'react-test-renderer';
import Categories from '../Categories';

describe('Categories component', () => {
  test('Matches the snapshot', () => {
    const categories = create(<Categories />);
    expect(categories.toJSON()).toMatchSnapshot();
  });
});
