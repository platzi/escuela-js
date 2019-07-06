const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const cookieParser = require("cookie-parser");
const debug = require("debug")("app:server");
const axios = require("axios");
const { get } = require("lodash");

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
    const moviesRequest = axios({
      url: `${config.apiUrl}/api/movies`,
      headers: { Authorization: `Bearer ${token}` }
    });

    const userMoviesRequest = axios({
      url: `${config.apiUrl}/api/user-movies?userId=${userId}`,
      headers: { Authorization: `Bearer ${token}` }
    });

    const [moviesResponse, userMoviesResponse] = await Promise.all([
      moviesRequest,
      userMoviesRequest
    ]);

    const moviesStatus = get(moviesResponse, "status");
    const userMoviesStatus = get(userMoviesResponse, "status");

    if (moviesStatus !== 200 || userMoviesStatus !== 200) {
      return next(boom.badImplementation());
    }

    const moviesData = get(moviesResponse, "data.data", []);
    const userMoviesData = get(userMoviesResponse, "data.data", []);

    const userMoviesDataMapped = userMoviesData.map(userMovie => ({
      ...moviesData.find(movie => movie._id),
      userMovieId: userMovie._id
    }));

    res.status(200).json({
      myList: userMoviesDataMapped,
      movies: moviesData
    });
  } catch (error) {
    next(error);
  }
});

app.post("/user-movies", async function(req, res, next) {
  const { body: userMovie } = req;
  const { token } = req.cookies;

  const { data, status } = await axios({
    url: `${config.apiUrl}/api/user-movies`,
    headers: { Authorization: `Bearer ${token}` },
    method: "post",
    data: userMovie
  });

  if (status !== 201) {
    return next(boom.badImplementation());
  }

  res.status(201).json(data);
});

app.delete("/user-movies/:userMovieId", async function(req, res, next) {
  const { userMovieId } = req.params;
  const { token } = req.cookies;

  const { data, status } = await axios({
    url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
    headers: { Authorization: `Bearer ${token}` },
    method: "delete"
  });

  if (status !== 200) {
    return next(boom.badImplementation());
  }

  res.status(200).json(data);
});

app.listen(config.port, function() {
  debug(`Listening http://localhost:${config.port}`);
});
