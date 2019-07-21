import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Routes from '../../frontend/routes/serverRoutes';
import render from '../render';
import Layout from '../../frontend/components/Layout';
import reducer from '../../frontend/reducers';
import initialState from '../../frontend/initialState';

const main = async (req, res, next) => {
  try {
    const isLogged = (initialState.user.id);
    const store = createStore(reducer, initialState);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={{}}
        >
          <Layout>
            {renderRoutes(Routes(isLogged))}
          </Layout>
        </StaticRouter>
      </Provider>,
    );
    const preloadedState = store.getState();
    res.send(render(html, preloadedState));
  } catch (err) {
    next(err);
  }
};

export default main;
