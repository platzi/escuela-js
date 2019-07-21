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
    let initialState;
    const { token, email, name, id } = req.cookies;
    try {
      let movieList = await axios({
        url: `${process.env.API_URL}/api/movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });

      let userMovies = await axios({
        url: `${process.env.API_URL}/api/movies?userId=${id}`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });

      movieList = movieList.data.data;
      userMovies = userMovies.data.data;
      initialState = {
        user: {
          id,
          email,
          name,
        },
        myList: userMovies.filter(movie => movie._id === id),
        trends: movieList.filter(movie => movie.contentRating === 'PG' && movie._id),
        originals: movieList.filter(movie => movie.contentRating === 'G' && movie._id),
      };
    } catch (err) {
      initialState = {
        user: {},
        myList: [],
        trends: [],
        originals: [],
      };
    }
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
