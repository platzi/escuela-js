import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Routes from '../../frontend/routes/serverRoutes';
import thunk from 'redux-thunk';
import render from '../render';
import rootReducer from '../../frontend/reducers/rootReducer';

const main = async (req, res, next) => {
  try {
    const initialState = {
      name: 'Server route',
    };
    const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={{}}
        >
          {renderRoutes(Routes)}
        </StaticRouter>
      </Provider>
    );
    const preloadedState = store.getState();
    res.send(render(html, preloadedState));
  } catch (err) {
    next(err);
  }
}

export default main;
