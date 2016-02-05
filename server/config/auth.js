"use strict";

const co = require("co");
const db = require('../models');

module.exports = function (passport, app) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function (id, done) {
    let User = db.user;

    co(function *() {
      return yield User.findOne({id: id});
    }).then(function (user) {
      return user.toJSON();
    }).then(function (user) {
      delete user.password;
      done(null, user);
    }).catch(done);
  });

  let LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(function (username, password, done) {
    let User = db.user;

    co(function *() {
      return yield User.matchUser(username, password);
    }).then(function (user) {
      return user.toJSON();
    }).then(function (user) {
      delete user.password;
      done(null, user);
    }).catch(done);
  }));
};
