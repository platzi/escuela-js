import React from 'react';
import { create } from 'react-test-renderer';
import Layout from '../Layout';

describe('Layout component', () => {
  test('Matches the snapshot', () => {
    const layout = create(<Layout />);
    expect(layout.toJSON()).toMatchSnapshot();
  });
});
