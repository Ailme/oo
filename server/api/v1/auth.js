"use strict";

const passport = require('koa-passport');

function *getCurrentUser() {
  this.type = 'application/json';

  this.body = this.passport.user || false;
}

module.exports.getCurrentUser = getCurrentUser;
