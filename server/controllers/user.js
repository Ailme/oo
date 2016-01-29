"use strict";

module.exports.index = index;
module.exports.info = info;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = remove;
module.exports.updateStatus = updateStatus;


function *index() {
  if (!this.state.xhr) {
    yield this.render('user/index');
  } else {
    let User = this.models.user;

    this.type = 'application/json';
    this.body = yield function (done) {
      User.find().exec(done);
    };
  }
}

function *info() {
  let User = this.models.user;
  let ctx = this;

  this.type = 'application/json';
  this.body = yield function (done) {
    User.findOne()
      .where({id: ctx.params.id})
      .then(function (model) {
        delete model.password;

        done(null, model);
      })
      .catch(done);
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

  let User = this.models.user;
  let ctx = this;

  yield function (done) {
    User.create(ctx.request.body, done);
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
  let User = this.models.user;
  let params = this.request.body;

  if (params.password.trim().length === 0) {
    delete params.password;
  }

  this.type = 'application/json';

  this.body = yield function (done) {
    User.update({id: ctx.params.id}, params).exec((err, user) => {
      let body = {
        success: !!!err,
        message: !!!err ? this.i18n.__('The User is updated') : err,
      };

      done(err, body);
    });
  };
}

/**
 *
 * @returns {*}
 */
function *remove() {
  let ctx = this;
  let User = this.models.user;
  this.type = 'application/json';

  this.body = yield function (done) {
    User.destroy({id: ctx.params.id}, (err) => {
      let body = {
        success: !!!err,
        message: !!!err ? this.i18n.__('The User is deleted') : err,
      };

      done(err, body);
    });
  };
}

/**
 *
 * @returns {*}
 */
function *updateStatus() {
  let ctx = this;
  let User = this.models.user;
  let params = this.request.body;

  this.type = 'application/json';

  this.body = yield function (done) {
    User.update({id: ctx.params.id}, {active: params.value}).exec((err, user) => {
      let body = {
        success: !!!err,
        message: !!!err ? this.i18n.__('The User is updated') : err,
      };

      done(err, body);
    });
  };
}
