var path = require('path');
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');

var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });




module.exports = {
  entry: './src/server',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'backend.js'
  },
  modules: {
    loaders: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      }
    ]
  },
  resolve: ['.js'],
  externals: nodeModules
};

