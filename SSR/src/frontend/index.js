import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import routes from './routes';

if (typeof window !== 'undefined') {
  const preloadedState = window.__PRELOADED_STATE__;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));
  const history = createBrowserHistory();
  hydrate(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('app')
  );
}
