"use strict";

const db = require('../models');

function *index() {
  if (!this.state.isAjax) {
    yield this.render('user/index');
  } else {
    let User = db.user;

    this.type = 'application/json';
    this.body = yield function (done) {
      User.all().then(function (rows) {
        done(null, rows);
      }).catch(done);
    };
  }
}

function *info() {
  let User = db.user;
  let ctx = this;

  this.type = 'application/json';
  this.body = yield function (done) {
    User.findById(ctx.params.id)
      .then(function (user) {
        return user;
      }).then(function (user) {
      delete user.password;

      done(null, user);
    }).catch(done);
  };
}

function *create() {
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

  let User = db.user;
  let ctx = this;

  yield function (done) {
    User.create(ctx.request.body).then(function (user) {
      return user;
    }).then(function (user) {
      done(null, user)
    }).catch(done);
  };

  this.body = {
    success: true,
    message: this.i18n.__('The User is created')
  };
}

/**
 *
 * @returns {*}
 */
function *update() {
  let ctx = this;
  let User = db.user;
  let params = this.request.body;

  if (params.password.trim().length === 0) {
    delete params.password;
  }

  this.type = 'application/json';

  this.body = yield User.update(params, {where: {id: ctx.params.id}});
}

/**
 *
 * @returns {*}
 */
function *remove() {
  let ctx = this;
  let User = db.user;
  this.type = 'application/json';

  this.body = yield User.destroy({where: {id: ctx.params.id}});
}

/**
 *
 * @returns {*}
 */
function *updateStatus() {
  let ctx = this;
  let User = db.user;
  let params = this.request.body;

  this.type = 'application/json';

  this.body = yield function (done) {
    User.update({active: params.value}, {where: {id: ctx.params.id}})
      .then(function (user) {
        let body = {
          success: true,
          message: ctx.i18n.__('The User is updated'),
        };

        done(null, body);
      }).catch(function (err) {
      let body = {
        success: false,
        message: err,
      };

      done(err, body);
    });
  };
}

module.exports.index = index;
module.exports.info = info;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = remove;
module.exports.updateStatus = updateStatus;
