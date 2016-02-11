"use strict";

const path = require('./path');
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const host = 'http://localhost' + (port != 80 ? ':' + port : '');
const assets = require(path.assets + "/assets.json");

const DEBUG = env !== 'production';

module.exports = {
  //http://koajs.com/#application
  name: 'Обслуживаемое оборудование',
  env: env,
  port: port,
  host: host,
  keys: ['0637c2a31805b22764f6d0dff613bf41e01d6317'],
  //https://github.com/koajs/body-parser#options
  bodyparser: {},
  templates: {
    root: path.views,
    cache: DEBUG ? "memory" : false,
    locals: {
      assets: assets
    }
  },
  //https://github.com/koajs/static#options
  static: {},
  //https://github.com/rkusa/koa-passport
  auth: {},
  //https://github.com/fundon/koa-locale#usage
  locale: {},
  //https://github.com/fundon/koa-i18n
  i18n: {
    directory: path.locales,
    extension: '.json',
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    query: true,
    subdomain: false,
    cookie: false,
    header: false,
    url: true
  },
  //https://github.com/gusnips/koa-error-ejs
  error: {
    template: path.views + '/error/error.html',
  },
  path: path,
  flash: {}
};
