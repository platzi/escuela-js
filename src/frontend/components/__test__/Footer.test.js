import React from 'react';
import { create } from 'react-test-renderer';
import { render, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../Footer';

configure({ adapter: new Adapter() });

describe('Footer component', () => {
  test('Matches the snapshot', () => {
    const footer = create(<Footer />);
    expect(footer.toJSON()).toMatchSnapshot();
  });

  test('Footer haves class footer', () => {
    const footer = shallow(<Footer />);
    const footerElm = footer.find('footer');
    expect(footerElm.hasClass('footer')).toBe(true);
  });

  test('Footer haves 3 anchors', () => {
    const footer = render(<Footer />);
    expect(footer.find('a')).toHaveLength(3);
  });
});
