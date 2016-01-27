"use strict";

module.exports = {
  login: function *() {
    this.state.title = 'login | ' + this.state.name;

    yield this.render('site/login')
  },
  logout: function *() {
    this.flash.success = 'See you soon!';

    this.redirect('/');
  },
  doLogin: function *() {
    this.body = {success: true}
  },
};
