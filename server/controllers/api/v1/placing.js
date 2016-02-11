"use strict";

const db = require('../../../models');

function *index() {
  let Model = db.placing;

  this.type = 'application/json';
  this.body = yield function (done) {
    Model.all().then(function (rows) {
      done(null, rows);
    }).catch(done);
  };
}

function *info() {
  let Model = db.placing;
  let ctx = this;

  this.type = 'application/json';
  this.body = yield function (done) {
    Model.findById(ctx.params.id)
      .then(function (model) {
        done(null, model);
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

  if (!this.request.body.name) {
    this.body = {
      success: false,
      message: this.i18n.__('Missing %s', 'name')
    };
    return
  }

  let Model = db.placing;
  let ctx = this;

  yield function (done) {
    Model.create(ctx.request.body).then(function (model) {
      return model;
    }).then(function (model) {
      done(null, model)
    }).catch(done);
  };

  this.body = {
    success: true,
    message: this.i18n.__('The Region is created')
  };
}

/**
 *
 * @returns {*}
 */
function *update() {
  let ctx = this;
  let Model = db.placing;
  let params = this.request.body;

  this.type = 'application/json';

  yield function (done) {
    Model.update(params, {where: {id: ctx.params.id}})
      .then(function (model) {
        done(null, model)
      }).catch(done);
  };

  this.body = yield function (done) {
    Model.update(params, {where: {id: ctx.params.id}})
      .then(function (model) {
        let body = {
          success: true,
          message: ctx.i18n.__('The Placing is updated'),
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

/**
 *
 * @returns {*}
 */
function *remove() {
  let ctx = this;
  let Model = db.placing;
  this.type = 'application/json';

  this.body = yield Model.destroy({where: {id: ctx.params.id}});
}

module.exports.index = index;
module.exports.info = info;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = remove;
