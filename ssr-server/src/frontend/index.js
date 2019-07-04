import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './routes/App';

if (typeof window !== 'undefined') {
  let composeEnhancers;

  if (process.env.NODE_ENV === 'production') composeEnhancers = compose;
  else composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const preloadedState = window.__PRELOADED_STATE__;
  const store = createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));
  const history = createBrowserHistory();

  hydrate(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('app'),
  );
}
