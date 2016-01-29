"use strict";

const co = require("co");

module.exports = function (passport, app) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function (id, done) {
    let User = app.context.models.user;
    User.findOne({id: id}, done);
  });

  let LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (username, password, done) {
    let User = app.context.models.user;

    co(function *() {
      return yield User.matchUser(username, password);
    }).then(function (user) {
      done(null, user);
    }).catch(function (err) {
      done(err);
    });
  }));
};
