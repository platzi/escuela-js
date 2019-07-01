const express = require('express');
const debug = require('debug')('app:server');
// const cors = require("cors");

const { config } = require('./config');

const moviesApi = require('./routes/movies');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const app = express();

// cors middleware
// app.use(cors({ origin: config.cors }));

// body parser
app.use(express.json());

// routes
moviesApi(app);

// catch 404
app.use(notFoundHandler);

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  debug(`Listening http://localhost:${config.port}`);
});
