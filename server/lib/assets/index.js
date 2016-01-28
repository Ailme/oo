"use strict";

module.exports = function (assets) {
  return function *(next) {
    this.state.assets = assets;

    yield next;
  };
};
