import React from 'react';
import { create } from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProviderMock from '../../__mocks__/ProviderMock';
import Login from '../Login';

configure({ adapter: new Adapter() });

describe('Login component', () => {
  test('Matches the snapshot', () => {
    const login = create(
      <ProviderMock>
        <Login />
      </ProviderMock>,
    );
    expect(login.toJSON()).toMatchSnapshot();
  });

  it('Calls and Executes pushFunction function when Login form is submitted', () => {
    const pushFunction = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Login history={{ push: pushFunction }} />
      </ProviderMock>,
    );
    wrapper.find('form').simulate('submit');
    expect(pushFunction).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
