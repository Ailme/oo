"use strict";

const path = require('path');
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const host = 'http://localhost' + (port != 80 ? ':' + port : '');

const DEBUG = env !== 'production';

const Path = {
  root: path.resolve(__dirname, '../'),
  app: path.resolve(__dirname, '../server'),
  public: path.resolve(__dirname, '../public'),
  assets: path.resolve(__dirname, '../public/assets'),
  controllers: path.resolve(__dirname, '../server/controllers'),
  models: path.resolve(__dirname, '../server/models')
};

module.exports = {
  //http://koajs.com/#application
  name: 'Обслуживаемое оборудование',
  env: env,
  port: port,
  host: host,
  keys: ['0637c2a31805b22764f6d0dff613bf41e01d6317'],
  //https://github.com/koajs/body-parser#options
  bodyparser: {},
  //https://github.com/koajs/generic-session#options
  session: {
    cookie: {
      maxAge: 1000 * 60 * 60 * 24//24 hours
    }
  },
  templates: {
    root: Path.app + '/views',
    cache: DEBUG ? "memory" : false,
    locals: {
      appName: 'Обслуживаемое оборудование'
    }
  },
  //https://github.com/balderdashy/waterline
  //https://github.com/balderdashy/waterline-docs#supported-adapters
  database: {
    // Setup Adapters
    // Creates named adapters that have been required
    adapters: {
      disk: require('sails-disk'),
      memory: require('sails-memory'),
      mysql: require('sails-mysql')
    },
    // Build Connections Config
    // Setup connections using the named adapter configs
    connections: {
      default: {
        adapter: 'mysql'
      },
      mysql: {
        adapter: 'mysql',
        host: 'localhost',
        port: 33060,
        user: 'root',
        password: '123456',
        database: 'service',
        charset: 'utf8'
      }
    },
    defaults: {
      migrate: 'alter'
    }
  },
  //https://github.com/koajs/static#options
  static: {
    directory: Path.public
  },
  //https://github.com/rkusa/koa-passport
  auth: {},
  //https://github.com/fundon/koa-locale#usage
  locale: {},
  //https://github.com/fundon/koa-i18n
  i18n: {
    directory: Path.app + '/locales',
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
    template: Path.app + '/views/error/error.html',
  },
  path: Path,
  flash: {}
};
