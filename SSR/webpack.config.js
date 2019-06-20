const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const autoprefixer = require("autoprefixer");

module.exports = {
  devtool: 'cheap-source-map',
  entry: ['webpack-hot-middleware/client', './src/frontend/index.js'],
  mode: 'development',
  output: {
    path: '/',
    filename: 'assets/app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: { loader: 'eslint-loader' },
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: { compact: false },
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/png',
            }
          }
        ]
      },
      {
        test: /(\.eot|\.woff|\.woff2|\.ttf|\.svg|\.png|\.jpg|\.gif)$/,
        loader: 'url-loader?limit=10000&name=assets/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    modules: ['node_modules'],
    alias: {
      sass: path.resolve(__dirname, 'src/assets/sass'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: 'assets/vendor.js',
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some(chunk => {
              return chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name);
            });
          },
        },
      },
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ],
      }
    }),
    new TransferWebpackPlugin([
      { from: 'assets' },
    ], path.resolve(__dirname, 'src')),
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
  ],
};
