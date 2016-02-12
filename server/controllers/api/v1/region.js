"use strict";

const db = require('../../../models');

function *index() {
  let Model = db.region;

  this.type = 'application/json';
  this.body = yield function (done) {
    Model.all().then(function (rows) {
      done(null, rows);
    }).catch(done);
  };
}

function *info() {
  let Model = db.region;
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

  let Model = db.region;
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
  let Model = db.region;
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
          message: ctx.i18n.__('The Region is updated'),
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
  let Model = db.region;
  this.type = 'application/json';

  this.body = yield Model.destroy({where: {id: ctx.params.id}});
}

function *importExcel() {
  const parse = require('co-busboy');
  const fs = require('fs');
  const path = require('path');
  const config = require('../../../config/path');

  // multipart upload
  let parts = parse(this);
  let part;

  this.body = false;

  while (part = yield parts) {
    if (part.length) {
      console.log('key: ' + part[0]);
      console.log('value: ' + part[1]);
    } else {
      let stream = fs.createWriteStream(path.join(config.tmp, Math.random().toString()));
      part.pipe(stream);

      console.log('uploading %s -> %s', part.filename, stream.path);

      this.body = {
        success: true,
        fileName: part.filename,
        tmpFileName: path.basename(stream.path),
      };
    }
  }

  this.type = 'application/json';
}

module.exports.index = index;
module.exports.info = info;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = remove;
module.exports.import = importExcel;
