import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import main from './routes/main';

dotenv.config();

const ENV = process.env.NODE_ENV;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
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

app.get('*.js', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('*.css', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('*', main);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${PORT}`);
});
