"use strict";

module.exports = function *(next) {
  this.state.isAjax = (this.request.get('X-Requested-With') === 'XMLHttpRequest');

  yield next;
};
