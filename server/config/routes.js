"use strict";

const config = require("./main");
const router = require("koa-router")();

const siteController = require(config.path.controllers + '/site');
const testController = require(config.path.controllers + '/test');
const userController = require(config.path.controllers + '/user');
const authController = require(config.path.controllers + '/auth');
const deviceController = require(config.path.controllers + '/device');

const apiUserControllerV1 = require(config.path.controllers + '/api/v1/user');
const apiAuthControllerV1 = require(config.path.controllers + '/api/v1/auth');
const apiDeviceControllerV1 = require(config.path.controllers + '/api/v1/device');

let secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    //yield next;
    //this.status = 401;
    this.redirect('/login');
  }
};

module.exports = function (app, passport) {
  /** API **/
    // auth
  router.all('/api/v1/getCurrentUser', apiAuthControllerV1.getCurrentUser);
  // user
  router.get("/api/v1/user", secured, apiUserControllerV1.index);
  router.post("/api/v1/user", secured, apiUserControllerV1.create);
  router.get("/api/v1/user/:id", secured, apiUserControllerV1.info);
  router.post("/api/v1/user/:id", secured, apiUserControllerV1.update);
  router.del("/api/v1/user/:id", secured, apiUserControllerV1.delete);
  router.post("/api/v1/user/updateStatus/:id", secured, apiUserControllerV1.updateStatus);
  // device
  router.get("/api/v1/device", secured, apiDeviceControllerV1.index);
  //router.post("/api/v1/device", secured, apiDeviceControllerV1.create);
  //router.get("/api/v1/device/:id", secured, apiDeviceControllerV1.info);
  //router.post("/api/v1/device/:id", secured, apiDeviceControllerV1.update);
  //router.del("/api/v1/device/:id", secured, apiDeviceControllerV1.delete);
  /** END API **/

    // index
  //router.get("/", siteController.index);
  // test
  router.all('/test', testController.index);
  // user
  router.get("/user", secured, userController.index);
  // device
  router.get("/", secured, deviceController.index);
  // auth
  router.get("/login", authController.login);
  router.post('/login', authController.doLogin);
  router.all('/logout', authController.logout);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
