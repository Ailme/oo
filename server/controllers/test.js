"use strict";

function *index() {
  yield this.render('test/index')
}


module.exports.index = index;
