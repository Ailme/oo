"use strict";

const db = require('../../../models');

function *index() {
  let Device = db.device;

  this.type = 'application/json';
  this.body = yield function (done) {
    Device.all().then(function (rows) {
      done(null, rows);
    }).catch(done);
  };
}

module.exports.index = index;
