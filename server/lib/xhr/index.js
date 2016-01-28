"use strict";

module.exports = function *(next) {
  this.state.xhr = (this.request.get('X-Requested-With') === 'XMLHttpRequest');

  yield next;
};
