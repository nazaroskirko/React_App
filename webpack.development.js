const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(env) {
  return webpackMerge(commonConfig(env), {
    devtool: 'inline-source-map',
    entry: [
      'babel-polyfill',
      'whatwg-fetch',
      'react-hot-loader/patch',
      './src/index.js',
    ],
    devServer: {
      contentBase: './build',
      port: 8001,
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/api/v1': {
          target: 'http://localhost:3000',
          secure: false,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin(['build']),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
};
