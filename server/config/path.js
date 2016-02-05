'use strict';

const path = require('path');

module.exports = {
  app: path.resolve(__dirname, '../'),
  root: path.resolve(__dirname, '../../'),
  controllers: path.resolve(__dirname, '../controllers'),
  models: path.resolve(__dirname, '../models'),
  views: path.resolve(__dirname, '../views'),
  locales: path.resolve(__dirname, '../locales'),
  lib: path.resolve(__dirname, '../lib'),
  public: path.resolve(__dirname, '../../public'),
  assets: path.resolve(__dirname, '../../public/assets'),
};
