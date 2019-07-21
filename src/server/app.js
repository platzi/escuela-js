import fs from 'fs';
import express from 'express';
import axios from 'axios';
import passport from 'passport';
import boom from '@hapi/boom';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import main from './routes/main';

dotenv.config();

const app = express();
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

// Basic strategy
require('./utils/auth/strategies/basic');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

if (ENV === 'development') {
  console.log('Loading Development Config');
  const webPackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webPackConfig);
  const serverConfig = {
    contentBase: `http://localhost:${PORT}`,
    port: PORT,
    quiet: false,
    noInfo: true,
    publicPath: webPackConfig.output.publicPath,
    hot: true,
    inline: true,
    lazy: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    stats: { colors: true },
  };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('Loading production configs');
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-CSRFToken');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/auth/sign-in', async (req, res, next) => {
  passport.authenticate('basic', (error, data) => {
    try {
      if (error || !data) {
        return next(boom.unauthorized());
      }

      req.login(data, { session: false }, async (error) => {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        res.cookie('token', token, {
          httpOnly: !(ENV === 'development'),
          secure: !(ENV === 'development'),
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req;

  try {
    await axios({
      url: `${process.env.API_URL}/api/auth/sign-up`,
      method: 'post',
      data: user,
    });

    res.status(201).json({ message: 'user created' });
  } catch (error) {
    next(error);
  }
});

app.get('*', main);

module.exports = app;
