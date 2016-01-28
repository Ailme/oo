"use strict";

const passport = require('koa-passport');

module.exports = {
  login: function *() {
    let data = {};

    console.log(this.passport.user);

    if (this.passport.user) {
      data = {user: this.passport.user};
    }

    yield this.render('site/login', {
      data: data
    })
  },
  logout: function *() {
    this.flash.success = 'See you soon!';

    this.redirect('/');
  },
  doLogin: function *() {
    let ctx = this;

    yield* passport.authenticate("local", function*(err, user, info) {
      if (err) {
        throw err;
      }
      if (user === false) {
        ctx.status = 401;
      } else {
        yield ctx.login(user);
        ctx.body = {user: user};
      }
    }).call(this);
  },
};
