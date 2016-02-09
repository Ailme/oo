"use strict";

const passport = require('koa-passport');

function *logout() {
  this.logout();
  this.session = null;

  this.type = 'application/json';
  this.body = true;
}

function *login() {
  if (this.passport.user) {
    this.redirect('/');
  }

  yield this.render('site/login')
}

function *doLogin() {
  this.type = 'application/json';

  let ctx = this;

  yield* passport.authenticate("local", function*(err, user, info) {
    if (err) {
      throw err;
    }

    if (user === false) {
      ctx.body = {
        error: 'error'
      };
    } else {
      yield ctx.login(user);
      ctx.body = user;
    }
  }).call(this);
}

module.exports.logout = logout;
module.exports.login = login;
module.exports.doLogin = doLogin;
