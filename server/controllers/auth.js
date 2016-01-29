"use strict";

const passport = require('koa-passport');

module.exports.login = login;
module.exports.logout = logout;
module.exports.doLogin = doLogin;

function *login() {
  if (this.passport.user) {
    this.redirect('/');
  }

  yield this.render('site/login')
}

function *logout() {
  this.logout();
  this.session = null;
  this.status = 204;

  this.redirect('/login');
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
        success: false,
        message: 'erorr'
      };
    } else {
      yield ctx.login(user);

      ctx.body = {
        success: true,
      };
    }
  }).call(this);
}
