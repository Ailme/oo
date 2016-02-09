"use strict";

function *index() {
  yield this.render('user/index');
}

module.exports.index = index;
