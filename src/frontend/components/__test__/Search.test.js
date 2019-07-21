import React from 'react';
import { create } from 'react-test-renderer';
import Search from '../Search';

describe('Layout component', () => {
  test('Matches the snapshot', () => {
    const search = create(<Search />);
    expect(search.toJSON()).toMatchSnapshot();
  });
});
