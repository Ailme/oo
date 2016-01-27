"use strict";

module.exports = {
  index: function *() {
    yield this.render('user/index');
  },

  apiIndex: function *() {
    let User = this.models.user;
    let items;

    yield function (done) {
      User.find().exec(function (err, model) {
        items = model;
        done(err);
      });
    };

    this.type = 'application/json';
    this.body = items;
  },

  create: function *() {
    yield this.render('user/create');
  },

  doCreate: function *() {
    if (!this.request.body) {
      this.flash.danger = this.i18n.__('The body is empty');
      this.redirect('/user/create');
      return
    }

    if (!this.request.body.email) {
      this.flash.danger = this.i18n.__('Missing %s', 'email');
      this.redirect('/user/create');
      return
    }

    if (!this.request.body.password) {
      this.flash.danger = this.i18n.__('Missing %s', 'password');
      this.redirect('/user/create');
      return
    }

    let User = this.models.user;
    let ctx = this;

    yield function (done) {
      User.create(ctx.request.body).exec(function (err, model) {
        ctx.flash.success = ctx.i18n.__('The User is created');
        ctx.redirect('/user');
        done(err);
      });
    };
  },

  apiCreate: function *() {
    this.type = 'application/json';

    console.log(this.request);

    if (!this.request.body) {
      this.body = {
        success: false,
        message: this.i18n.__('The body is empty')
      };
      return
    }

    if (!this.request.body.email) {
      this.body = {
        success: false,
        message: this.i18n.__('Missing %s', 'email')
      };
      return
    }

    if (!this.request.body.password) {
      this.body = {
        success: false,
        message: this.i18n.__('Missing %s', 'password')
      };
      return
    }

    let User = this.models.user;
    let ctx = this;

    yield function (done) {
      console.log('yield');
      User.create(ctx.request.body).exec(function (err, model) {
        done(err);
      });
    };

    console.log('create');

    this.body = {
      success: true,
      message: this.i18n.__('The User is created')
    };
  },

  apiUpdate: function *() {
    this.type = 'application/json';


    this.body = {
      success: true,
      message: this.i18n.__('The User is updated')
    };
  },
};
