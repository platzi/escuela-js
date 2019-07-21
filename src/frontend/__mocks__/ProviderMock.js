import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import initialState from '../initialState';
import reducer from '../reducers';

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));
const history = createBrowserHistory();

const ProviderMock = props => (
  <Provider store={store}>
    <Router history={history}>
      {props.children}
    </Router>
  </Provider>
);

module.exports = ProviderMock;
