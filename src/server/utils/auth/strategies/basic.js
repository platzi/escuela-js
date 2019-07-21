const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const dotenv = require('dotenv');
const axios = require('axios');
require('dotenv').config();

dotenv.config();

passport.use(
  new BasicStrategy(async (username, password, cb) => {
    try {
      const { data, status } = await axios({
        url: `${process.env.API_URL}/api/auth/sign-in`,
        method: 'post',
        auth: {
          username,
          password,
        },
        data: {
          apiKeyToken: process.env.API_KEY_TOKEN,
        },
      });
      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }
      return cb(null, data);
    } catch (error) {
      return cb(error);
    }
  }),
);
