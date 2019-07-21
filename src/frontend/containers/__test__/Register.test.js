import React from 'react';
import { create } from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProviderMock from '../../__mocks__/ProviderMock';
import Register from '../Register';

configure({ adapter: new Adapter() });

describe('Register component', () => {
  test('Matches the snapshot', () => {
    const register = create(
      <ProviderMock>
        <Register />
      </ProviderMock>,
    );
    expect(register.toJSON()).toMatchSnapshot();
  });

  it('Calls and Executes pushFunction function when Register form is submitted', () => {
    const pushFunction = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Register history={{ push: pushFunction }} />
      </ProviderMock>,
    );
    wrapper.find('form').simulate('submit');
    expect(pushFunction).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

});
