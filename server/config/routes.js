"use strict";

const config = require("./main");
const router = require("koa-router")();

const testController = require(config.path.controllers + '/test');
const authController = require(config.path.controllers + '/auth');
const regionController = require(config.path.controllers + '/region');
const areaController = require(config.path.controllers + '/area');

let secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.redirect('/login');
  }
};

module.exports = function (app, passport) {
    // index
  router.all('/test', testController.index);
  router.get("/user", secured, function *() {
    yield this.render('user/index');
  });
  router.get("/", secured, function *() {
    yield this.render('device/index');
  });
  router.get("/region", secured, function *() {
    yield this.render('region/index');
  });
  router.get("/area", secured, function *() {
    yield this.render('area/index');
  });
  router.get("/area/export", secured, areaController.export);
  router.get("/placing", secured, function *() {
    yield this.render('placing/index');
  });
  router.get("/zone", secured, function *() {
    yield this.render('zone/index');
  });
  router.get("/zone-user", secured, function *() {
    yield this.render('zone-user/index');
  });
  router.get("/vendor", secured, function *() {
    yield this.render('vendor/index');
  });
  router.get("/model", secured, function *() {
    yield this.render('model/index');
  });
  router.get("/type", secured, function *() {
    yield this.render('type/index');
  });
  router.get("/service-type", secured, function *() {
    yield this.render('service-type/index');
  });
  router.get("/service-category", secured, function *() {
    yield this.render('service-category/index');
  });
  router.get("/maintenance", secured, function *() {
    yield this.render('maintenance/index');
  });
  router.get("/login", authController.login);
  router.post('/login', authController.doLogin);
  router.all('/logout', authController.logout);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
