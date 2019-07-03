const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const cookieParser = require("cookie-parser");
const debug = require("debug")("app:server");
const axios = require("axios");

const { config } = require("./config");

const app = express();

// body parser
app.use(express.json());
app.use(cookieParser());

// Basic strategy
require("./utils/auth/strategies/basic");

app.post("/auth/sign-in", async function(req, res, next) {
  passport.authenticate("basic", function(error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function(error) {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function(req, res, next) {
  const { body: user } = req;

  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: user
    });

    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
});

app.get("/movies", async function(req, res, next) {
  const { userId } = req.query;
  const { token } = req.cookies;

  try {
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/movies`,
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!data || status !== 200) {
      next(boom.badImplementation());
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.post("/user-movies", async function(req, res, next) {
  const { body: userMovie } = req;
  const { token } = req.cookies;

  // TODO: Implement and call the api

  res.status(200).json({});
});

app.delete("/user-movies/:userMovieId", async function(req, res, next) {
  const { userMovieId } = req.params;
  const { token } = req.cookies;
  
  // TODO: Implement and call the api

  res.status(200).json({});
});

app.listen(config.port, function() {
  debug(`Listening http://localhost:${config.port}`);
});
