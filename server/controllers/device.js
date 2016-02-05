"use strict";

module.exports.index = index;

function *index() {
  if (!this.state.xhr) {
    yield this.render('device/index');
  } else {
    let Model = this.models.device;

    this.type = 'application/json';
    this.body = yield function (done) {
      Model.find().exec(done);
    };
  }
}
