'use strict';

const Store = require('../lib/session-store');
const db = require('../models');

//https://github.com/koajs/generic-session#options
module.exports = {
  store: Store.create(db.session),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24//24 hours
  }
};
