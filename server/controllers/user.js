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

  info: function *() {
    let User = this.models.user;
    let ctx = this;
    let user;

    yield function (done) {
      User.findOne()
        .where({id: ctx.params.id})
        .then(function (model) {
          delete model.password;
          user = model;

          done();
        })
        .catch(function (err) {
          done(err);
        });
    };

    this.type = 'application/json';
    this.body = user;
  },

  create: function *() {
    this.type = 'application/json';

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
    let ctx = this;
    let User = this.models.user;
    this.type = 'application/json';

    yield function (done) {
      let params = ctx.request.body;

      if (params.password.trim().length === 0) {
        delete params.password;
      }

      User.update({id: ctx.params.id}, params).exec((err, user) => {
        this.body = {
          success: !!!err,
          message: !!!err ? this.i18n.__('The User is updated') : err,
        };

        done(err);
      });
    };
  },

  delete: function *() {
    let ctx = this;
    let User = this.models.user;

    this.type = 'application/json';

    this.body = {
      success: true,
      message: this.i18n.__('The User is updated')
    };
  },
};
