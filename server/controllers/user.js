"use strict";

module.exports = {
  index: function *() {
    if (!this.state.xhr) {
      yield this.render('user/index');
    } else {
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
    }
  },

  create: function *() {
    this.type = 'application/json';

    console.log(this.request.body);

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
      User.create(ctx.request.body).exec(function (err, model) {
        done(err);
      });
    };

    this.body = {
      success: true,
      message: this.i18n.__('The User is created')
    };
  },

  update: function *() {
    this.type = 'application/json';

    console.log(this.request);

    this.body = {
      success: true,
      message: this.i18n.__('The User is updated')
    };
  },

  delete: function *() {
    this.type = 'application/json';

    console.log(this.request);

    this.body = {
      success: true,
      message: this.i18n.__('The User is updated')
    };
  },
};
