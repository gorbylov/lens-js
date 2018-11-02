var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  [
    path.resolve(__dirname, './src/index.js')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js'
  },
  stats: {
    colors: true
  }
};