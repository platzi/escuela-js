import React from 'react';
import { create } from 'react-test-renderer';
import Header from '../Layout';

describe('Header component', () => {
  test('Matches the snapshot', () => {
    const header = create(<Header />);
    expect(header.toJSON()).toMatchSnapshot();
  });
});
