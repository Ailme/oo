'use strict';

const webpack = require("webpack");

/**
 * Development config
 * @param  {String} _path Absolute path to application
 * @return {Object}       Object of development settings
 */
module.exports = function (_path) {
  return {
    //entry: {
    //  App: [
    //    'webpack-dev-server/client?http://0.0.0.0:8080',
    //    'webpack/hot/only-dev-server',
    //    "./app"
    //  ],
    //  OperationPage: "./operationPage"
    //},
    debug: true,
    devtool: "source-map",
    devServer: {
      contentBase: _path + "/public/assets",
      noInfo: true,
      quiet: true,
      hot: true,
      inline: true
    },
    //watch: true,
    //watchOptions: {
    //    poll: true
    //}
  }
};
