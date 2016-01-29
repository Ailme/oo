"use strict";

const passLib = require('../lib/password');

module.exports.index = index;

function *index() {

  yield this.render('test/index')
}
