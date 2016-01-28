"use strict";

module.exports = function *(next) {
  this.state.isGuest = !this.isAuthenticated();

  yield next;
};
