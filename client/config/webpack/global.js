'use strict';

const webpack = require("webpack");
const BowerWebpackPlugin = require("bower-webpack-plugin");
const TextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const rimraf = require("rimraf");
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const fs = require('fs');
const path = require('path');

/**
 * Global webpack config
 * @param  string _path
 * @return object
 */
module.exports = function (_path) {
  const PATH = {
    app: _path + "/client",
    output: _path + "/public/assets",
    public: "/assets/",
    bower: _path + "/public/vendor/bower",
    vendor: _path + "/public/vendor",
    node: _path + "/node_modules"
  };

  let entry = {
    app: ['react', 'react-dom', 'react-bootstrap', 'react-router', 'belle', PATH.app],
  };

  // read all models and import them into the "db" object
  fs
    .readdirSync(PATH.app + "/pages")
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.indexOf('_') !== 0);
    })
    .forEach(function (file) {
      entry[file] = PATH.app + "/pages/" + file;//path.join(PATH.app + "/pages", file);
    });

  return {
    cache: true,
    context: PATH.app,
    entry: entry,
    output: {
      path: PATH.output,
      publicPath: PATH.public,
      filename: "[name].[chunkhash].js",
      chunkFilename: "[id].[chunkhash].js",
      library: "[name]"
    },
    plugins: [
      {
        apply: (compiler) => {
          rimraf.sync(compiler.options.output.path)
        }
      },
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true'))
      }),
      new BowerWebpackPlugin({
        modulesDirectories: PATH.bower,
        manifestFiles: 'bower.json',
        includes: /.*/,
        excludes: /.*\.less$/
      }),
      //new webpack.NormalModuleReplacementPlugin(/\/dist\/react-input-autosize\.min\.js$/, 'react-input-autosize/src/AutosizeInput.js'),
      new webpack.optimize.CommonsChunkPlugin({
        name: "common"
      }),
      new webpack.ContextReplacementPlugin(/moment\/locale/, /ru|en-gb/),
      new TextPlugin('[name].[contenthash].css', {allChunks: true}),
      new AssetsPlugin({
        filename: "assets.json",
        path: PATH.output
      })
    ],
    module: {
      loaders: [
        {
          test: /\.jade$/,
          include: PATH.app,
          loader: 'jade-loader'
        },
        {
          test: /\.tsx?$/,
          include: PATH.app,
          loaders: ["babel", 'webpack-typescript']
        },
        {
          test: /\.jsx?$/,
          include: PATH.app,
          loader: 'babel'
        },
        {
          test: /\.styl$/,
          include: PATH.app,
          loader: TextPlugin.extract('css!postcss!stylus?resolv url')
        },
        {
          test: /\.css$/,
          include: PATH.app,
          loader: TextPlugin.extract('css!postcss')
        },
        {
          test: /\.(ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          exclude: [/favicon-/],
          loader: 'url?limit=10000&name=[name].[hash:6].[ext]'
        },
        {
          test: /favicon-\d+\.png$/i,
          include: PATH.app + "/images",
          loader: 'file?name=[path][name].[ext]'
        }
      ],
      noParse: [
        /\/node_modules\/encoding\//
      ]
    },
    postcss: function () {
      return [autoprefixer, precss];
    },
    resolve: {
      root: [PATH.node],
      modulesDirectories: ["node_modules", "app"],
      extensions: ['', '.js', '.jsx'],
      alias: {
        "bower": PATH.bower,
        "node": PATH.node,
        "vendor": PATH.vendor
      }
    }
    ,
    resolveLoader: {
      modulesDirectories: ["node_modules"],
      moduleTemplates: ["*-loader", "*"],
      extensions: ["", ".js"]
    }
  }
};
