"use strict";

const Waterline = require('waterline');
const orm = new Waterline();

module.exports = function (app, config, callback) {
  const user = require(config.path.models + '/user');
  orm.loadCollection(user);

  orm.initialize(config.database, callback);
  return orm
};
