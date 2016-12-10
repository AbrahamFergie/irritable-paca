var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    __dirname+'/client/app.jsx'
  ],
  output: {
    publicPath: '/',
    path: __dirname+'/public',
    filename: 'app.jsx'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.jsx$/,
        include: __dirname+'/client',
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
