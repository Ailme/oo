"use strict";

let passport = require('koa-passport');

module.exports = function (app, config) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function (id, done) {
    let user = {id: 1, email: 'test4@mail.ru'};
    done(null, user)
  });

  let LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(function (email, password, done) {
    let user = {id: 1, email: 'test4@mail.ru'};

    if (email === 'test4@mail.ru' && password === '123456') {
      done(null, user)
    } else {
      done(null, false)
    }
  }));


  return passport
};
