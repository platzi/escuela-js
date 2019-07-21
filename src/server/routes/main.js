import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from '../../frontend/routes/serverRoutes';
import render from '../render';
import Layout from '../../frontend/components/Layout';
import reducer from '../../frontend/reducers';

require('dotenv').config();

const main = async (req, res, next) => {
  try {
    let movieList = await axios.get(`${process.env.API_URL2}/api/movies`);
    movieList = movieList.data.data;
    const initialState = {
      user: {
        id: 1,
        name: 'Carlos Sampol',
        email: 'sampol.90@gmail.com',
      },
      playing: {},
      myList: movieList.slice(1, 7),
      trends: movieList.slice(1, movieList.length - 1),
      originals: movieList.slice(1, movieList.length - 1),
    };
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
