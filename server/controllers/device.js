"use strict";

function *index() {
  yield this.render('device/index');
}

module.exports.index = index;
