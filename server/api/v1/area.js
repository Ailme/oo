"use strict";

const db = require('../../models');
// https://www.npmjs.com/package/log-util
const log = require('log-util');

function *index() {
  let Model = db.area;

  this.type = 'application/json';
  this.body = yield function (done) {
    Model.all().then(function (rows) {
      done(null, rows);
    }).catch(done);
  };
}

function *info() {
  let Model = db.area;
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

  let Model = db.area;
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
  let Model = db.area;
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
  let Model = db.area;
  this.type = 'application/json';

  this.body = yield Model.destroy({where: {id: ctx.params.id}});
}

function *importExcel() {
  // https://github.com/cojs/busboy
  const parse = require('co-busboy');
  const fs = require('fs');
  const path = require('path');
  const config = require('../../../config/path');
  const xlsx = require('xlsx');
  const co = require('co');

  // multipart upload
  let parts = parse(this, {
    checkFile: function (fieldname, file, filename) {
      let ext = path.extname(filename);

      if (ext !== '.xlsx') {
        let err = new Error('Файл должен иметь xlsx расширение');
        err.status = 400;
        return err;
      }
    }
  });

  let part = yield parts;
  let stream = fs.createWriteStream(path.join(config.tmp, Math.random().toString()));
  part.pipe(stream);

  let workBook = yield function (done) {
    stream.on('close', function () {
      try {
        let workBook = xlsx.readFileSync(stream.path);
        done(null, workBook);
      } catch (err) {
        done(err);
      }
    });
  };

  let sheetName = workBook.SheetNames[0];
  let workSheet = workBook.Sheets[sheetName];

  let rows = xlsx.utils.sheet_to_json(workSheet);

  let messages = yield rows.map((item) => {
    return db.area.build({name: item['Название'].trim()})
      .save()
      .then(() => {
        return true;
      })
      .catch((err) => {
        return (err.errors[0].message + ' ' + err.errors[0].value);
      });
  });

  this.body = {
    success: true,
    error: messages.filter((item) => item !== true),
  };

  this.type = 'application/json';
}

module.exports.index = index;
module.exports.info = info;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = remove;
module.exports.import = importExcel;
